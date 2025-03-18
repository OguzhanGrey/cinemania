import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as k}from"./assets/vendor-Cv0FVZ7t.js";const L="8a0658d1a6872272a1ed1ab9af543174",I="https://api.themoviedb.org/3",a={upcomingMovieLink:document.querySelector(".upcoming-movie-link"),weeklyMovieList:document.querySelector(".weekly-movie-list"),hero:document.querySelector(".hero"),defaultHero:document.querySelector(".default-hero"),movieHero:document.querySelector(".movie-hero"),prevButton:document.querySelector(".slider-button.prev"),nextButton:document.querySelector(".slider-button.next"),themeSwitch:document.getElementById("theme-switch"),upcomingMovieList:document.querySelector(".upcoming-movies-list"),modal:document.getElementById("movieDetailsModal"),modalCloseBtn:document.querySelector(".modal-close-btn"),videoModal:document.getElementById("videoModal"),videoFrame:document.getElementById("videoFrame"),videoModalCloseBtn:document.querySelector("#videoModal .modal-close-btn"),errorModal:document.getElementById("errorModal"),errorModalCloseBtn:document.querySelector("#errorModal .modal-close-btn"),errorMessage:document.querySelector(".error-message")},E=k.create({baseURL:I,headers:{"Content-Type":"application/json"},params:{api_key:L}}),u=async(e,o={})=>{try{return(await E.get(e,{params:o})).data}catch(i){return console.error("Error fetching data:",i),null}},b=e=>Array(5).fill().map((o,i)=>`
      <i class="fas fa-star ${i<Math.round(e/2)?"filled":""}"></i>
    `).join(""),w=e=>new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),h=(e,o=2)=>(e||[]).slice(0,o).map(i=>i.name).join(", "),_=()=>{localStorage.getItem("theme")==="light"?(document.documentElement.setAttribute("data-theme","light"),a.themeSwitch.checked=!1):(document.documentElement.removeAttribute("data-theme"),a.themeSwitch.checked=!0),a.themeSwitch.addEventListener("change",()=>{a.themeSwitch.checked?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})},D=e=>{let o=0;const i=4,s=e.results.length,c=a.weeklyMovieList.querySelector(".weekly-movie-item").offsetWidth,t=16;a.prevButton.style.display="none";const r=()=>{const l=o*(c+t);a.weeklyMovieList.style.transform=`translateX(-${l}px)`,a.prevButton.style.display=o===0?"none":"flex",a.nextButton.style.display=o>=s-i?"none":"flex"};a.prevButton.addEventListener("click",()=>{o>0&&(o--,r())}),a.nextButton.addEventListener("click",()=>{o<s-i&&(o++,r())})},B=e=>{a.videoFrame.src=`https://www.youtube.com/embed/${e}?autoplay=1`,a.videoModal.classList.add("active"),document.body.style.overflow="hidden"},M=()=>{a.videoFrame.src="",a.videoModal.classList.remove("active"),document.body.style.overflow=""};a.videoModalCloseBtn.addEventListener("click",M);a.videoModal.addEventListener("click",e=>{e.target===a.videoModal&&M()});const g=e=>{a.errorMessage.textContent=e,a.errorModal.classList.add("active"),document.body.style.overflow="hidden"},S=()=>{a.errorModal.classList.remove("active"),document.body.style.overflow=""};a.errorModalCloseBtn.addEventListener("click",S);a.errorModal.addEventListener("click",e=>{e.target===a.errorModal&&S()});const $=async(e,o)=>{const i=await u(`/movie/${e}`);a.hero.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${i.backdrop_path})`;const s=[`<h1>${i.title}</h1>`,`<div class="movie-rating-stars">
      <div class="stars">${b(i.vote_average)}</div>
      <span class="rating-number">${i.vote_average.toFixed(1)}</span>
    </div>`,`<p>${i.overview.slice(0,150)}...</p>`,`<div class="hero-buttons">
      <button class="watch-trailer-btn" data-movie-id="${e}">
        <span>Watch Trailer</span>
      </button>
      <button class="more-details-btn" data-movie-id="${e}">
        <span>More Details</span>
      </button>
    </div>`];a.movieHero.innerHTML=s.join(""),a.defaultHero.style.display="none",a.movieHero.style.display="block",a.hero.scrollIntoView({behavior:"smooth"});const n=a.movieHero.querySelector(".watch-trailer-btn"),c=a.movieHero.querySelector(".more-details-btn");n&&n.addEventListener("click",async()=>{try{const r=(await u(`/movie/${e}/videos`)).results.find(l=>l.type==="Trailer"&&l.site==="YouTube");r?B(r.key):g("Sorry, trailer is not available for this movie at the moment. Please check back later.")}catch(t){console.error("Error fetching video:",t),g("Sorry, we encountered an error while loading the trailer. Please try again later.")}}),c&&c.addEventListener("click",()=>T(e))},f=e=>e?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(e):"N/A",T=async e=>{try{const o=await u(`/movie/${e}`),s=(await u(`/movie/${e}/credits`)).cast.slice(0,6),n=`
      <div class="modal-header">
        <h2 class="modal-title">${o.title}</h2>
        <div class="modal-rating">
          <div class="stars">${b(o.vote_average)}</div>
          <span>${o.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div class="modal-info">
        <div>
          <h4>Genre</h4>
          <p>${h(o.genres)}</p>
        </div>
        <div>
          <h4>Release Date</h4>
          <p>${w(o.release_date)}</p>
        </div>
        <div>
          <h4>Runtime</h4>
          <p>${o.runtime} min</p>
        </div>
        <div>
          <h4>Budget</h4>
          <p>${f(o.budget)}</p>
        </div>
        <div>
          <h4>Revenue</h4>
          <p>${f(o.revenue)}</p>
        </div>
      </div>
      <div class="modal-overview">
        <h3>Overview</h3>
        <p>${o.overview}</p>
      </div>
      <div class="modal-cast">
        <h3>Cast</h3>
        <div class="cast-list">
          ${s.map(t=>`
            <div class="cast-member">
              <img src="https://image.tmdb.org/t/p/w185${t.profile_path}" alt="${t.name}" onerror="this.src='https://via.placeholder.com/185x185?text=No+Image'">
              <div class="name">${t.name}</div>
              <div class="character">${t.character}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;a.modal.querySelector(".modal-content").innerHTML=n,a.modal.classList.add("active"),document.body.style.overflow="hidden";const c=a.modal.querySelector(".modal-close-btn");c&&c.addEventListener("click",()=>{a.modal.classList.remove("active"),document.body.style.overflow=""}),a.modal.addEventListener("click",t=>{t.target===a.modal&&(a.modal.classList.remove("active"),document.body.style.overflow="")})}catch(o){console.error("Error showing movie details:",o),g("Failed to load movie details. Please try again later.")}},q=async()=>{try{const e=await u("/trending/movie/week");if(!(e!=null&&e.results))return;const o=e.results.map(async s=>{const n=await u(`/movie/${s.id}`),c=h(n==null?void 0:n.genres),t=new Date(s.release_date).getFullYear(),l=JSON.parse(localStorage.getItem("library")||"[]").some(v=>v.id===s.id);return`
          <li class="weekly-movie-item" data-movie-id="${s.id}">
            <a class="weekly-movie-link" href="#">
              <img class="weekly-movie-image" src="https://image.tmdb.org/t/p/w500${s.poster_path}" alt="${s.title}">
              <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${s.vote_average.toFixed(1)}</span>
              </div>
              <div class="weekly-movie-info">
                <h3 class="movie-title">${s.title}</h3>
                <div class="movie-meta">
                  ${c} <span class="movie-meta-divider">|</span> ${t}
                </div>
              </div>
            </a>
            <button class="add-to-library ${l?"added":""}" data-movie-id="${s.id}">
              <i class="fas ${l?"fa-check":"fa-plus"}"></i>
              ${l?"Added to library":"Add to library"}
            </button>
          </li>
        `}),i=await Promise.all(o);a.weeklyMovieList.innerHTML=i.join(""),D(e),a.weeklyMovieList.addEventListener("click",async s=>{const n=s.target.closest(".add-to-library");if(n){s.preventDefault(),s.stopPropagation();const t=parseInt(n.dataset.movieId),r=e.results.find(m=>m.id===t);if(!r)return;const l=await u(`/movie/${t}`),v={id:t,title:r.title,poster_path:r.poster_path,release_date:r.release_date,vote_average:r.vote_average,genres:l.genres.map(m=>m.name).join(", "),overview:r.overview};let d=JSON.parse(localStorage.getItem("library")||"[]");d.some(m=>m.id===t)?(d=d.filter(m=>m.id!==t),localStorage.setItem("library",JSON.stringify(d)),n.innerHTML='<i class="fas fa-plus"></i> Add to library',n.style.background="#ff6b01",n.disabled=!1):(d.push(v),localStorage.setItem("library",JSON.stringify(d)),n.innerHTML='<i class="fas fa-check"></i> Added to library',n.style.background="#2ecc71",n.disabled=!0);return}const c=s.target.closest(".weekly-movie-item");if(c){s.preventDefault();const t=parseInt(c.dataset.movieId);if(!e.results.find(l=>l.id===t))return;await $(t,e)}})}catch(e){console.error("Error rendering weekly movies:",e)}},A=async()=>{try{const e=new Date,o=new Date(e.getFullYear(),e.getMonth()+1,0),i=await u("/movie/upcoming",{region:"US",language:"en-US"});if(!(i!=null&&i.results))return;const s=i.results.filter(t=>{const r=new Date(t.release_date);return r<=o&&r>=e&&t.backdrop_path&&t.title&&t.vote_average>0}).sort((t,r)=>r.popularity-t.popularity).slice(0,5);if(s.length===0){a.upcomingMovieList.innerHTML="<p>No upcoming movies available for this month.</p>";return}const n=s.map(async t=>{const r=await u(`/movie/${t.id}`),l=h(r==null?void 0:r.genres,3),d=JSON.parse(localStorage.getItem("library")||"[]").some(p=>p.id===t.id);return`
        <li class="upcoming-movie-item">
          <a class="upcoming-movie-link" href="#">
            <div class="upcoming-movie-image-container">
              <img class="upcoming-movie-image" src="https://image.tmdb.org/t/p/w1280${t.backdrop_path}" alt="${t.title}">
            </div>
            <div class="upcoming-movie-info">
              <h3 class="movie-title">${t.title}</h3>
              <div class="info-section">
                <div class="info-row">
                  <span class="info-label">Release Date</span>
                  <span class="info-value-date">${w(t.release_date)}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Vote / Votes</span>
                  <span class="info-value-rating">
                    ${t.vote_average.toFixed(1)} / ${t.vote_count.toLocaleString()} votes
                  </span>
                </div>
                <div class="info-row">
                  <span class="info-label">Popularity</span>
                  <span class="info-value-popularity">${Math.round(t.popularity).toLocaleString()}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Genre</span>
                  <span class="info-value-genre">${l}</span>
                </div>
              </div>
              <div class="movie-about">
                <h4 class="about-label">ABOUT</h4>
                <p class="about-text">${t.overview}</p>
              </div>
              <button class="add-to-library ${d?"added":""}" data-movie-id="${t.id}">
                <i class="fas ${d?"fa-check":"fa-plus"}"></i>
                ${d?"Added to library":"Add to my library"}
              </button>
            </div>
          </a>
        </li>
      `}),c=await Promise.all(n);a.upcomingMovieList.innerHTML=c.join(""),a.upcomingMovieList.addEventListener("click",t=>{const r=t.target.closest(".add-to-library");if(r){t.preventDefault();const v=parseInt(r.dataset.movieId),d=s.find(y=>y.id===v);if(!d)return;const p={id:v,title:d.title,poster_path:d.poster_path,release_date:d.release_date,vote_average:d.vote_average};r.innerHTML='<i class="fas fa-check"></i> Added to library',r.style.background="#2ecc71",r.disabled=!0;let m=JSON.parse(localStorage.getItem("library")||"[]");m.some(y=>y.id===v)||(m.push(p),localStorage.setItem("library",JSON.stringify(m)));return}const l=t.target.closest(".upcoming-movie-item");if(l){t.preventDefault();const v=parseInt(l.querySelector(".add-to-library").dataset.movieId);$(v,i)}})}catch(e){console.error("Error rendering upcoming movies:",e),a.upcomingMovieList.innerHTML="<p>Error loading upcoming movies.</p>"}};window.addEventListener("message",e=>{if(e.data.type==="removeFromLibrary"){const o=document.querySelector(`.weekly-movie-item [data-movie-id="${e.data.movieId}"]`);o&&(o.innerHTML='<i class="fas fa-plus"></i> Add to library',o.style.background="#ff6b01",o.disabled=!1);const i=document.querySelector(`#movieDetailsModal [data-movie-id="${e.data.movieId}"]`);i&&(i.innerHTML='<i class="fas fa-plus"></i> Add to library',i.style.background="#ff6b01",i.disabled=!1)}});document.addEventListener("DOMContentLoaded",()=>{_(),q(),A()});
//# sourceMappingURL=index.js.map
