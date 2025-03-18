import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as w}from"./assets/vendor-Cv0FVZ7t.js";const L="8a0658d1a6872272a1ed1ab9af543174",S="https://api.themoviedb.org/3",k=w.create({baseURL:S,headers:{"Content-Type":"application/json"},params:{api_key:L}}),t={themeSwitch:document.getElementById("theme-switch"),libraryList:document.querySelector(".added-library-list"),hero:document.querySelector(".hero"),defaultHero:document.querySelector(".default-hero"),movieHero:document.querySelector(".movie-hero"),videoModal:document.getElementById("videoModal"),videoFrame:document.getElementById("videoFrame"),videoModalCloseBtn:document.querySelector("#videoModal .modal-close-btn"),errorModal:document.getElementById("errorModal"),errorModalCloseBtn:document.querySelector("#errorModal .modal-close-btn"),errorMessage:document.querySelector(".error-message"),movieDetailsModal:document.getElementById("movieDetailsModal"),movieDetailsModalCloseBtn:document.querySelector("#movieDetailsModal .modal-close-btn"),genreSelect:document.querySelector(".genre-select"),loadMoreBtn:document.querySelector(".load-more-btn")},m=async(e,o={})=>{try{return(await k.get(e,{params:o})).data}catch(a){return console.error("Error fetching data:",a),null}},E=e=>Array(5).fill().map((o,a)=>`
      <i class="fas fa-star ${a<Math.round(e/2)?"filled":""}"></i>
    `).join(""),$=()=>{try{localStorage.getItem("theme")==="light"?(document.documentElement.setAttribute("data-theme","light"),t.themeSwitch.checked=!1):(document.documentElement.removeAttribute("data-theme"),t.themeSwitch.checked=!0),t.themeSwitch.addEventListener("change",()=>{t.themeSwitch.checked?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})}catch(e){console.error("Error initializing theme:",e)}};let c=1;const g=15;let p=[],y=[];const u=(e="")=>{const o=JSON.parse(localStorage.getItem("library")||"[]");if(o.length===0){t.libraryList.innerHTML=`
      <li class="empty-library">
        <p>Kütüphaneniz boş. Başlamak için bazı filmler ekleyin!</p>
      </li>
    `,t.loadMoreBtn.style.display="none";return}if(e!==t.genreSelect.dataset.currentGenre&&(c=1,t.genreSelect.dataset.currentGenre=e,t.libraryList.innerHTML=""),y=e?o.filter(i=>i.genres&&i.genres.includes(e)):o,y.length===0){t.libraryList.innerHTML=`
      <li class="empty-library">
        <p>Bu türde film bulunamadı.</p>
      </li>
    `,t.loadMoreBtn.style.display="none";return}const a=(c-1)*g,r=a+g;p=y.slice(a,r),t.loadMoreBtn.style.display=r>=y.length?"none":"block";const s=p.map(i=>{var n,d;return`
    <li class="weekly-movie-item">
      <a href="#" class="weekly-movie-link" data-movie-id="${i.id}">
        <img
          src="https://image.tmdb.org/t/p/w500${i.poster_path}"
          alt="${i.title}"
          class="weekly-movie-image"
          onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'"
        />
        <div class="movie-rating">
          <i class="fas fa-star"></i>
          <span>${i.vote_average.toFixed(1)}</span>
        </div>
        <div class="movie-year">${((n=i.release_date)==null?void 0:n.split("-")[0])||"N/A"}</div>
        <div class="weekly-movie-info">
          <h3 class="movie-title">${i.title}</h3>
          <div class="movie-meta">
            <span>${((d=i.release_date)==null?void 0:d.split("-")[0])||"N/A"}</span>
            <span class="movie-meta-divider">•</span>
            <span>${i.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </a>
      <button class="remove-from-library" data-movie-id="${i.id}">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `}).join("");c===1?t.libraryList.innerHTML=s:t.libraryList.insertAdjacentHTML("beforeend",s),B()},B=()=>{document.querySelectorAll(".weekly-movie-link").forEach(e=>{e.addEventListener("click",async o=>{o.preventDefault();const a=e.dataset.movieId,r=await m(`/movie/${a}`);t.hero.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${r.backdrop_path})`;const s=[`<h1>${r.title}</h1>`,`<div class="movie-rating-stars">
          <div class="stars">${E(r.vote_average)}</div>
          <span class="rating-number">${r.vote_average.toFixed(1)}</span>
        </div>`,`<p>${r.overview.slice(0,150)}...</p>`,`<div class="hero-buttons">
          <button class="watch-trailer-btn" data-movie-id="${a}">
            <span>Watch Trailer</span>
          </button>
          <button class="more-details-btn" data-movie-id="${a}">
            <span>More Details</span>
          </button>
        </div>`];t.movieHero.innerHTML=s.join(""),t.defaultHero.style.display="none",t.movieHero.style.display="block",t.hero.scrollIntoView({behavior:"smooth"});const i=t.movieHero.querySelector(".watch-trailer-btn"),n=t.movieHero.querySelector(".more-details-btn");i&&i.addEventListener("click",async()=>{try{const v=(await m(`/movie/${a}/videos`)).results.find(l=>l.type==="Trailer"&&l.site==="YouTube");v?q(v.key):h("Sorry, trailer is not available for this movie at the moment. Please check back later.")}catch(d){console.error("Error fetching video:",d),h("Sorry, we encountered an error while loading the trailer. Please try again later.")}}),n&&n.addEventListener("click",()=>H(a))})}),document.querySelectorAll(".remove-from-library").forEach(e=>{e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const a=e.dataset.movieId;D(a)})})},I=()=>{c++;const e=t.genreSelect.value;u(e)},D=e=>{let o=JSON.parse(localStorage.getItem("library")||"[]");o=o.filter(s=>s.id!==parseInt(e)),localStorage.setItem("library",JSON.stringify(o));const a=document.querySelector(`.weekly-movie-item:has([data-movie-id="${e}"])`);a&&a.remove(),o.length===0&&(t.libraryList.innerHTML=`
      <li class="empty-library">
        <p>Kütüphaneniz boş. Başlamak için bazı filmler ekleyin!</p>
      </li>
    `,t.loadMoreBtn.style.display="none"),window.postMessage({type:"removeFromLibrary",movieId:parseInt(e)},"*");const r=document.querySelector(`[data-movie-id="${e}"]`);r&&(r.innerHTML='<i class="fas fa-plus"></i> Add to library',r.style.background="#ff6b01",r.disabled=!1)},T=async()=>{const e=JSON.parse(localStorage.getItem("library")||"[]");let o=!1;for(let a of e)if(!a.genres){const r=await m(`/movie/${a.id}`);r&&r.genres&&(a.genres=r.genres.map(s=>s.name),o=!0)}o&&localStorage.setItem("library",JSON.stringify(e))},q=e=>{t.videoFrame.src=`https://www.youtube.com/embed/${e}?autoplay=1`,t.videoModal.classList.add("active"),document.body.style.overflow="hidden"},b=()=>{t.videoFrame.src="",t.videoModal.classList.remove("active"),document.body.style.overflow=""},h=e=>{t.errorMessage.textContent=e,t.errorModal.classList.add("active"),document.body.style.overflow="hidden"},f=()=>{t.errorModal.classList.remove("active"),document.body.style.overflow=""},H=async e=>{var o,a;try{const r=await m(`/movie/${e}`),s=await m(`/movie/${e}/credits`),i=r.genres.map(l=>l.name).join(", "),n=((o=s.crew.find(l=>l.job==="Director"))==null?void 0:o.name)||"N/A",d=s.cast.slice(0,5).map(l=>l.name).join(", "),v=`
      <div class="movie-details-content">
        <div class="movie-details-header">
          <img src="https://image.tmdb.org/t/p/w500${r.poster_path}" alt="${r.title}" class="movie-details-poster">
          <div class="movie-details-info">
            <h2>${r.title}</h2>
            <div class="movie-details-meta">
              <span>${((a=r.release_date)==null?void 0:a.split("-")[0])||"N/A"}</span>
              <span class="movie-meta-divider">•</span>
              <span>${r.vote_average.toFixed(1)}</span>
            </div>
            <div class="movie-details-genres">${i}</div>
            <div class="movie-details-overview">${r.overview}</div>
            <div class="movie-details-cast">
              <strong>Director:</strong> ${n}
              <br>
              <strong>Cast:</strong> ${d}
            </div>
          </div>
        </div>
      </div>
    `;t.movieDetailsModal.querySelector(".modal-content").innerHTML=v,t.movieDetailsModal.classList.add("active"),document.body.style.overflow="hidden"}catch(r){console.error("Error fetching movie details:",r),h("Sorry, we encountered an error while loading the movie details. Please try again later.")}},M=()=>{t.movieDetailsModal.classList.remove("active"),document.body.style.overflow=""};document.addEventListener("DOMContentLoaded",async()=>{$(),await T(),u(),t.genreSelect.addEventListener("change",e=>{c=1,u(e.target.value)}),t.loadMoreBtn.addEventListener("click",I),t.videoModalCloseBtn.addEventListener("click",b),t.videoModal.addEventListener("click",e=>{e.target===t.videoModal&&b()}),t.errorModalCloseBtn.addEventListener("click",f),t.errorModal.addEventListener("click",e=>{e.target===t.errorModal&&f()}),t.movieDetailsModalCloseBtn.addEventListener("click",M),t.movieDetailsModal.addEventListener("click",e=>{e.target===t.movieDetailsModal&&M()})});window.addEventListener("message",e=>{if(e.data.type==="removeFromLibrary"){const o=document.querySelector(`.weekly-movie-item [data-movie-id="${e.data.movieId}"]`);o&&(o.innerHTML='<i class="fas fa-plus"></i> Add to library',o.style.background="#ff6b01",o.disabled=!1);const a=document.querySelector(`#movieDetailsModal [data-movie-id="${e.data.movieId}"]`);a&&(a.innerHTML='<i class="fas fa-plus"></i> Add to library',a.style.background="#ff6b01",a.disabled=!1)}});
//# sourceMappingURL=library.js.map
