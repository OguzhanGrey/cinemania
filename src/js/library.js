// DOM Elements
const domElements = {
  themeSwitch: document.getElementById('theme-switch'),
  libraryList: document.querySelector('.added-library-list'),
  hero: document.querySelector('.hero'),
  defaultHero: document.querySelector('.default-hero'),
  movieHero: document.querySelector('.movie-hero'),
  videoModal: document.getElementById('videoModal'),
  videoFrame: document.getElementById('videoFrame'),
  videoModalCloseBtn: document.querySelector('#videoModal .modal-close-btn'),
  errorModal: document.getElementById('errorModal'),
  errorModalCloseBtn: document.querySelector('#errorModal .modal-close-btn'),
  errorMessage: document.querySelector('.error-message'),
  movieDetailsModal: document.getElementById('movieDetailsModal'),
  movieDetailsModalCloseBtn: document.querySelector(
    '#movieDetailsModal .modal-close-btn'
  ),
  genreSelect: document.querySelector('.genre-select'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

// API configuration
const API_KEY = '8a0658d1a6872272a1ed1ab9af543174';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const apiBaseUrl = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: API_KEY,
  },
});

// Utility functions
const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiBaseUrl.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const createStarRating = rating => {
  return Array(5)
    .fill()
    .map(
      (_, index) => `
      <i class="fas fa-star ${
        index < Math.round(rating / 2) ? 'filled' : ''
      }"></i>
    `
    )
    .join('');
};

// Theme Functions
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    domElements.themeSwitch.checked = false;
  } else {
    document.documentElement.removeAttribute('data-theme');
    domElements.themeSwitch.checked = true;
  }

  domElements.themeSwitch.addEventListener('change', () => {
    if (domElements.themeSwitch.checked) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
};

// Library Functions
const addToLibrary = async movie => {
  // Get existing library from localStorage
  let library = JSON.parse(localStorage.getItem('library') || '[]');

  // Check if movie already exists
  if (!library.some(m => m.id === movie.id)) {
    // Fetch movie details to get genres
    const movieDetails = await fetchData(`/movie/${movie.id}`);

    // Add movie with genres to library
    library.push({
      ...movie,
      genres: movieDetails.genres.map(genre => genre.name),
    });

    localStorage.setItem('library', JSON.stringify(library));

    // Update button state
    const button = document.querySelector(`[data-movie-id="${movie.id}"]`);
    if (button) {
      button.innerHTML = '<i class="fas fa-check"></i> Added to library';
      button.style.background = '#2ecc71';
      button.disabled = true;
    }
  }
};

const formatDate = dateString => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Pagination state
let currentPage = 1;
const moviesPerPage = 15;
let currentMovies = [];
let filteredMovies = [];

const displayLibraryMovies = (selectedGenre = '') => {
  const library = JSON.parse(localStorage.getItem('library') || '[]');

  if (library.length === 0) {
    domElements.libraryList.innerHTML = `
      <li class="empty-library">
        <p>Kütüphaneniz boş. Başlamak için bazı filmler ekleyin!</p>
      </li>
    `;
    domElements.loadMoreBtn.style.display = 'none';
    return;
  }

  // Reset pagination when genre changes
  if (selectedGenre !== domElements.genreSelect.dataset.currentGenre) {
    currentPage = 1;
    domElements.genreSelect.dataset.currentGenre = selectedGenre;
    domElements.libraryList.innerHTML = ''; // Clear the list when genre changes
  }

  // Filter movies by genre if selected
  filteredMovies = selectedGenre
    ? library.filter(
        movie => movie.genres && movie.genres.includes(selectedGenre)
      )
    : library;

  if (filteredMovies.length === 0) {
    domElements.libraryList.innerHTML = `
      <li class="empty-library">
        <p>Bu türde film bulunamadı.</p>
      </li>
    `;
    domElements.loadMoreBtn.style.display = 'none';
    return;
  }

  // Get current page movies
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  currentMovies = filteredMovies.slice(startIndex, endIndex);

  // Update load more button visibility
  domElements.loadMoreBtn.style.display =
    endIndex >= filteredMovies.length ? 'none' : 'block';

  // Create HTML for new movies
  const newMoviesHTML = currentMovies
    .map(
      movie => `
    <li class="weekly-movie-item">
      <a href="#" class="weekly-movie-link" data-movie-id="${movie.id}">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title}"
          class="weekly-movie-image"
          onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'"
        />
        <div class="movie-rating">
          <i class="fas fa-star"></i>
          <span>${movie.vote_average.toFixed(1)}</span>
        </div>
        <div class="movie-year">${
          movie.release_date?.split('-')[0] || 'N/A'
        }</div>
        <div class="weekly-movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-meta">
            <span>${movie.release_date?.split('-')[0] || 'N/A'}</span>
            <span class="movie-meta-divider">•</span>
            <span>${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </a>
      <button class="remove-from-library" data-movie-id="${movie.id}">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `
    )
    .join('');

  // If it's the first page, replace the content
  if (currentPage === 1) {
    domElements.libraryList.innerHTML = newMoviesHTML;
  } else {
    // Otherwise, append new movies
    domElements.libraryList.insertAdjacentHTML('beforeend', newMoviesHTML);
  }

  // Add event listeners for the new movies
  addMovieEventListeners();
};

// Add event listeners for movies
const addMovieEventListeners = () => {
  // Add event listeners to movie links
  document.querySelectorAll('.weekly-movie-link').forEach(link => {
    link.addEventListener('click', async e => {
      e.preventDefault();
      const movieId = link.dataset.movieId;
      const movieDetails = await fetchData(`/movie/${movieId}`);

      domElements.hero.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`;

      const contentElements = [
        `<h1>${movieDetails.title}</h1>`,
        `<div class="movie-rating-stars">
          <div class="stars">${createStarRating(
            movieDetails.vote_average
          )}</div>
          <span class="rating-number">${movieDetails.vote_average.toFixed(
            1
          )}</span>
        </div>`,
        `<p>${movieDetails.overview.slice(0, 150)}...</p>`,
        `<div class="hero-buttons">
          <button class="watch-trailer-btn" data-movie-id="${movieId}">
            <span>Watch Trailer</span>
          </button>
          <button class="more-details-btn" data-movie-id="${movieId}">
            <span>More Details</span>
          </button>
        </div>`,
      ];

      domElements.movieHero.innerHTML = contentElements.join('');
      domElements.defaultHero.style.display = 'none';
      domElements.movieHero.style.display = 'block';
      domElements.hero.scrollIntoView({ behavior: 'smooth' });

      // Add click event listeners for buttons
      const watchTrailerBtn =
        domElements.movieHero.querySelector('.watch-trailer-btn');
      const moreDetailsBtn =
        domElements.movieHero.querySelector('.more-details-btn');

      if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', async () => {
          try {
            const videos = await fetchData(`/movie/${movieId}/videos`);
            const trailer = videos.results.find(
              video => video.type === 'Trailer' && video.site === 'YouTube'
            );

            if (trailer) {
              showVideoModal(trailer.key);
            } else {
              showErrorModal(
                'Sorry, trailer is not available for this movie at the moment. Please check back later.'
              );
            }
          } catch (error) {
            console.error('Error fetching video:', error);
            showErrorModal(
              'Sorry, we encountered an error while loading the trailer. Please try again later.'
            );
          }
        });
      }

      if (moreDetailsBtn) {
        moreDetailsBtn.addEventListener('click', () =>
          showMovieDetails(movieId)
        );
      }
    });
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.remove-from-library').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const movieId = button.dataset.movieId;
      removeFromLibrary(movieId);
    });
  });
};

// Add load more functionality
const loadMoreMovies = () => {
  currentPage++;
  const selectedGenre = domElements.genreSelect.value;
  displayLibraryMovies(selectedGenre);
};

const removeFromLibrary = movieId => {
  let library = JSON.parse(localStorage.getItem('library') || '[]');
  library = library.filter(movie => movie.id !== parseInt(movieId));
  localStorage.setItem('library', JSON.stringify(library));

  // Kartı DOM'dan kaldır
  const movieCard = document.querySelector(
    `.weekly-movie-item:has([data-movie-id="${movieId}"])`
  );
  if (movieCard) {
    movieCard.remove();
  }

  // Eğer kütüphane boşsa, boş kütüphane mesajını göster
  if (library.length === 0) {
    domElements.libraryList.innerHTML = `
      <li class="empty-library">
        <p>Kütüphaneniz boş. Başlamak için bazı filmler ekleyin!</p>
      </li>
    `;
    domElements.loadMoreBtn.style.display = 'none';
  }

  // Diğer sayfalara silme işlemini bildir
  window.postMessage(
    {
      type: 'removeFromLibrary',
      movieId: parseInt(movieId),
    },
    '*'
  );

  // Update button state in index.html if it exists
  const button = document.querySelector(`[data-movie-id="${movieId}"]`);
  if (button) {
    button.innerHTML = '<i class="fas fa-plus"></i> Add to library';
    button.style.background = '#ff6b01';
    button.disabled = false;
  }
};

// Update existing library movies with genres
const updateLibraryGenres = async () => {
  const library = JSON.parse(localStorage.getItem('library') || '[]');
  let updated = false;

  for (let movie of library) {
    if (!movie.genres) {
      const movieDetails = await fetchData(`/movie/${movie.id}`);
      if (movieDetails && movieDetails.genres) {
        movie.genres = movieDetails.genres.map(genre => genre.name);
        updated = true;
      }
    }
  }

  if (updated) {
    localStorage.setItem('library', JSON.stringify(library));
  }
};

// Show video modal
const showVideoModal = videoId => {
  domElements.videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  domElements.videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Close video modal
const closeVideoModal = () => {
  domElements.videoFrame.src = '';
  domElements.videoModal.classList.remove('active');
  document.body.style.overflow = '';
};

// Show error modal
const showErrorModal = message => {
  domElements.errorMessage.textContent = message;
  domElements.errorModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Close error modal
const closeErrorModal = () => {
  domElements.errorModal.classList.remove('active');
  document.body.style.overflow = '';
};

// Show movie details modal
const showMovieDetails = async movieId => {
  try {
    const movieDetails = await fetchData(`/movie/${movieId}`);
    const credits = await fetchData(`/movie/${movieId}/credits`);
    const genres = movieDetails.genres.map(genre => genre.name).join(', ');
    const director =
      credits.crew.find(person => person.job === 'Director')?.name || 'N/A';
    const cast = credits.cast
      .slice(0, 5)
      .map(person => person.name)
      .join(', ');

    const content = `
      <div class="movie-details-content">
        <div class="movie-details-header">
          <img src="https://image.tmdb.org/t/p/w500${
            movieDetails.poster_path
          }" alt="${movieDetails.title}" class="movie-details-poster">
          <div class="movie-details-info">
            <h2>${movieDetails.title}</h2>
            <div class="movie-details-meta">
              <span>${movieDetails.release_date?.split('-')[0] || 'N/A'}</span>
              <span class="movie-meta-divider">•</span>
              <span>${movieDetails.vote_average.toFixed(1)}</span>
            </div>
            <div class="movie-details-genres">${genres}</div>
            <div class="movie-details-overview">${movieDetails.overview}</div>
            <div class="movie-details-cast">
              <strong>Director:</strong> ${director}
              <br>
              <strong>Cast:</strong> ${cast}
            </div>
          </div>
        </div>
      </div>
    `;

    domElements.movieDetailsModal.querySelector('.modal-content').innerHTML =
      content;
    domElements.movieDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Error fetching movie details:', error);
    showErrorModal(
      'Sorry, we encountered an error while loading the movie details. Please try again later.'
    );
  }
};

// Close movie details modal
const closeMovieDetailsModal = () => {
  domElements.movieDetailsModal.classList.remove('active');
  document.body.style.overflow = '';
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await updateLibraryGenres();
  displayLibraryMovies();

  // Add genre filter event listener
  domElements.genreSelect.addEventListener('change', e => {
    currentPage = 1; // Reset page when genre changes
    displayLibraryMovies(e.target.value);
  });

  // Add load more button event listener
  domElements.loadMoreBtn.addEventListener('click', loadMoreMovies);

  // Add modal close event listeners
  domElements.videoModalCloseBtn.addEventListener('click', closeVideoModal);
  domElements.videoModal.addEventListener('click', e => {
    if (e.target === domElements.videoModal) {
      closeVideoModal();
    }
  });

  domElements.errorModalCloseBtn.addEventListener('click', closeErrorModal);
  domElements.errorModal.addEventListener('click', e => {
    if (e.target === domElements.errorModal) {
      closeErrorModal();
    }
  });

  domElements.movieDetailsModalCloseBtn.addEventListener(
    'click',
    closeMovieDetailsModal
  );
  domElements.movieDetailsModal.addEventListener('click', e => {
    if (e.target === domElements.movieDetailsModal) {
      closeMovieDetailsModal();
    }
  });
});

// Listen for messages from other pages
window.addEventListener('message', event => {
  if (event.data.type === 'removeFromLibrary') {
    // Update button state in weekly trends
    const weeklyButton = document.querySelector(
      `.weekly-movie-item [data-movie-id="${event.data.movieId}"]`
    );
    if (weeklyButton) {
      weeklyButton.innerHTML = '<i class="fas fa-plus"></i> Add to library';
      weeklyButton.style.background = '#ff6b01';
      weeklyButton.disabled = false;
    }

    // Update button state in movie details modal
    const modalButton = document.querySelector(
      `#movieDetailsModal [data-movie-id="${event.data.movieId}"]`
    );
    if (modalButton) {
      modalButton.innerHTML = '<i class="fas fa-plus"></i> Add to library';
      modalButton.style.background = '#ff6b01';
      modalButton.disabled = false;
    }
  }
});
