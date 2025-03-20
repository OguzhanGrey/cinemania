import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as P}from"./assets/vendor-Cv0FVZ7t.js";const R="8a0658d1a6872272a1ed1ab9af543174",G="https://api.themoviedb.org/3",_="https://image.tmdb.org/t/p",Y=P.create({baseURL:G,headers:{"Content-Type":"application/json"},params:{api_key:R}}),a={weeklyMovieList:document.querySelector(".weekly-movie-list"),hero:document.querySelector(".hero"),defaultHero:document.querySelector(".default-hero"),movieHero:document.querySelector(".movie-hero"),prevButton:document.querySelector(".slider-button.prev"),nextButton:document.querySelector(".slider-button.next"),themeSwitch:document.getElementById("theme-switch"),modal:document.getElementById("movieDetailsModal"),modalCloseBtn:document.querySelector(".modal-close-btn"),videoModal:document.getElementById("videoModal"),videoFrame:document.getElementById("videoFrame"),videoModalCloseBtn:document.querySelector("#videoModal .modal-close-btn"),errorModal:document.getElementById("errorModal"),errorModalCloseBtn:document.querySelector("#errorModal .modal-close-btn"),errorMessage:document.querySelector(".error-message"),movieGrid:document.querySelector(".movie-grid"),catalogList:document.querySelector(".catalog-list"),genreSelect:document.querySelector(".genre-select"),loadMoreBtn:document.querySelector(".load-more-btn"),hamburgerMenu:document.querySelector(".hamburger-menu"),navLinks:document.querySelector(".nav-links")},u=async(e,t={})=>{try{return(await Y.get(e,{params:t})).data}catch(r){return console.error("Error fetching data:",r),null}},N=e=>Array(5).fill().map((t,r)=>`
      <i class="fas fa-star ${r<Math.round(e/2)?"filled":""}"></i>
    `).join(""),W=e=>new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),V=()=>{localStorage.getItem("theme")==="light"?(document.documentElement.setAttribute("data-theme","light"),a.themeSwitch.checked=!1):(document.documentElement.removeAttribute("data-theme"),a.themeSwitch.checked=!0),a.themeSwitch.addEventListener("change",()=>{a.themeSwitch.checked?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})},K=e=>{a.videoFrame.src=`https://www.youtube.com/embed/${e}?autoplay=1`,a.videoModal.classList.add("active"),document.body.style.overflow="hidden"},x=()=>{a.videoFrame.src="",a.videoModal.classList.remove("active"),document.body.style.overflow=""};a.videoModalCloseBtn.addEventListener("click",x);a.videoModal.addEventListener("click",e=>{e.target===a.videoModal&&x()});const I=e=>{a.errorMessage.textContent=e,a.errorModal.classList.add("active"),document.body.style.overflow="hidden"},C=()=>{a.errorModal.classList.remove("active"),document.body.style.overflow=""};a.errorModalCloseBtn.addEventListener("click",C);a.errorModal.addEventListener("click",e=>{e.target===a.errorModal&&C()});const H=e=>e?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(e):"N/A",Q=e=>{if(!e)return"N/A";const t=Math.floor(e/60),r=e%60;return`${t}h ${r}m`},F=async e=>{try{const[t,r]=await Promise.all([u(`/movie/${e}`),u(`/movie/${e}/credits`)]);a.modal.querySelector(".modal-title").textContent=t.title,a.modal.querySelector(".modal-rating").innerHTML=`
      <div class="stars">${N(t.vote_average)}</div>
      <span>${t.vote_average.toFixed(1)}</span>
    `,a.modal.querySelector(".modal-genres").innerHTML=`
      <h4>Genres</h4>
      <p>${t.genres.map(i=>i.name).join(", ")}</p>
    `,a.modal.querySelector(".modal-release-date").innerHTML=`
      <h4>Release Date</h4>
      <p>${W(t.release_date)}</p>
    `,a.modal.querySelector(".modal-runtime").innerHTML=`
      <h4>Runtime</h4>
      <p>${Q(t.runtime)}</p>
    `,a.modal.querySelector(".modal-budget").innerHTML=`
      <h4>Budget</h4>
      <p>${H(t.budget)}</p>
    `,a.modal.querySelector(".modal-revenue").innerHTML=`
      <h4>Revenue</h4>
      <p>${H(t.revenue)}</p>
    `,a.modal.querySelector(".modal-overview p").textContent=t.overview;const o=a.modal.querySelector(".cast-list");o.innerHTML=r.cast.slice(0,6).map(i=>`
        <div class="cast-member">
          <img src="https://image.tmdb.org/t/p/w185${i.profile_path}" alt="${i.name}">
          <div class="name">${i.name}</div>
          <div class="character">${i.character}</div>
        </div>
      `).join(""),a.modal.classList.add("active"),document.body.style.overflow="hidden"}catch(t){console.error("Error fetching movie details:",t)}},O=()=>{a.modal.classList.remove("active"),document.body.style.overflow=""};a.modalCloseBtn.addEventListener("click",O);a.modal.addEventListener("click",e=>{e.target===a.modal&&O()});async function L(e){const t=document.querySelector(".hero-content.movie-hero"),r=document.querySelector(".hero");r.style.backgroundImage=`url(${_}/original${e.backdrop_path})`,t.innerHTML=`
    <h1>${e.title}</h1>
    <div class="movie-rating-stars">
      <div class="stars">${N(e.vote_average)}</div>
      <span class="rating-number">${e.vote_average.toFixed(1)}</span>
    </div>
    <p>${e.overview.slice(0,150)}...</p>
    <div class="hero-buttons">
      <button class="watch-trailer-btn" data-movie-id="${e.id}">
        <span>Watch Trailer</span>
      </button>
      <button class="more-details-btn" data-movie-id="${e.id}">
        <span>More Details</span>
      </button>
    </div>
  `,t.style.display="block";const o=t.querySelector(".watch-trailer-btn"),i=t.querySelector(".more-details-btn");o.addEventListener("click",async()=>{try{const s=(await u(`/movie/${e.id}/videos`)).results.find(n=>n.type==="Trailer"&&n.site==="YouTube");s?K(s.key):I("Sorry, trailer is not available for this movie at the moment. Please check back later.")}catch(v){console.error("Error fetching video:",v),I("Sorry, we encountered an error while loading the trailer. Please try again later.")}}),i.addEventListener("click",()=>F(e.id))}let l=0,d=[],w;function z(e){d=e,l=Math.floor(Math.random()*e.length),L(d[l]);const t=document.querySelector(".hero-nav-btn.prev-movie"),r=document.querySelector(".hero-nav-btn.next-movie");t.addEventListener("click",()=>{clearInterval(w),l=(l-1+d.length)%d.length,L(d[l]),w=setInterval(()=>{l=(l+1)%d.length,L(d[l])},5e3)}),r.addEventListener("click",()=>{clearInterval(w),l=(l+1)%d.length,L(d[l]),w=setInterval(()=>{l=(l+1)%d.length,L(d[l])},5e3)}),w=setInterval(()=>{l=(l+1)%d.length,L(d[l])},5e3)}async function T(e){const t=document.querySelector(".weekly-movie-list");t.innerHTML="";for(const r of e)try{const i=(await u(`/movie/${r.id}`)).genres.map(h=>h.name).join(", "),s=JSON.parse(localStorage.getItem("library")||"[]").some(h=>h.id===r.id),n=document.createElement("li");n.className="weekly-movie-item",n.innerHTML=`
        <a href="#" class="weekly-movie-link" data-movie-id="${r.id}">
          <img
            src="${_}/w500${r.poster_path}"
            alt="${r.title}"
            class="weekly-movie-image"
          />
          <div class="movie-rating">
            <i class="fas fa-star"></i>
            <span>${r.vote_average.toFixed(1)}</span>
          </div>
          <div class="movie-year">${r.release_date.split("-")[0]}</div>
          <div class="weekly-movie-info">
            <h3 class="movie-title">${r.title}</h3>
            <div class="movie-meta">
              <span>${i}</span>
              <span class="movie-meta-divider">|</span>
              <span>${r.release_date.split("-")[0]}</span>
            </div>
          </div>
        </a>
        <button class="add-to-library ${s?"added":""}" data-movie-id="${r.id}">
          <i class="fas ${s?"fa-check":"fa-plus"}"></i>
          ${s?"Added to library":"Add to library"}
        </button>
      `;const c=n.querySelector(".add-to-library");c.addEventListener("click",async h=>{h.preventDefault(),h.stopPropagation();const f=parseInt(c.dataset.movieId),p=e.find(b=>b.id===f);if(!p)return;const g=await u(`/movie/${f}`),S={id:f,title:p.title,poster_path:p.poster_path,release_date:p.release_date,vote_average:p.vote_average,genres:g.genres.map(b=>b.name).join(", "),overview:p.overview};let y=JSON.parse(localStorage.getItem("library")||"[]");y.some(b=>b.id===f)?(y=y.filter(b=>b.id!==f),localStorage.setItem("library",JSON.stringify(y)),c.innerHTML='<i class="fas fa-plus"></i> Add to library',c.style.background="#ff6b01",c.disabled=!1):(y.push(S),localStorage.setItem("library",JSON.stringify(y)),c.innerHTML='<i class="fas fa-check"></i> Added to library',c.style.background="#2ecc71",c.disabled=!0)}),n.querySelector(".weekly-movie-link").addEventListener("click",async h=>{h.preventDefault(),clearInterval(w),L(r),document.querySelector(".hero").scrollIntoView({behavior:"smooth"}),w=setInterval(()=>{l=(l+1)%d.length,L(d[l])},5e3)}),t.appendChild(n)}catch(o){console.error(`Error fetching details for movie ${r.id}:`,o)}}async function U(){try{const e=await u("/trending/movie/week");if(!(e!=null&&e.results))return;T(e.results),z(e.results)}catch(e){console.error("Error fetching trending movies:",e),I("Failed to load trending movies. Please try again later.")}}let m=1,$=27,q=!1;async function B(e){if(!(q||e===m))try{q=!0;const t=await u("/trending/movie/week",{page:e,language:"en-US"});if(!(t!=null&&t.results))return;T(t.results),m=e,X(),window.scrollTo({top:0,behavior:"smooth"})}catch(t){console.error("Error fetching page:",t),I("Failed to load movies. Please try again later.")}finally{q=!1}}function X(){const e=document.querySelector(".page-numbers"),t=document.querySelector(".pagination-btn.prev-page"),r=document.querySelector(".pagination-btn.next-page");t.disabled=m===1,r.disabled=m===$;let o="";o+=`
    <button class="pagination-btn ${m===1?"active":""}" data-page="1">1</button>
  `,m>4&&(o+='<span class="page-dots">...</span>');for(let i=Math.max(2,m-2);i<=Math.min($-1,m+2);i++)o+=`
      <button class="pagination-btn ${m===i?"active":""}" data-page="${i}">${i}</button>
    `;m<$-3&&(o+='<span class="page-dots">...</span>'),o+=`
      <button class="pagination-btn ${m===$?"active":""}" data-page="${$}">${$}</button>
    `,e.innerHTML=o,e.querySelectorAll(".pagination-btn").forEach(i=>{i.addEventListener("click",()=>{const v=parseInt(i.dataset.page);B(v)})})}document.querySelector(".pagination-btn.prev-page").addEventListener("click",()=>{m>1&&B(m-1)});document.querySelector(".pagination-btn.next-page").addEventListener("click",()=>{m<$&&B(m+1)});async function D(e){var o,i;e.preventDefault();const r=document.querySelector(".search-input").value.trim();if(!r){U();return}try{const v=await u("/search/movie",{query:r,language:"en-US"});if(!(v!=null&&v.results))return;const s=document.querySelector(".weekly-movie-list");s.innerHTML="";for(const n of v.results)try{const A=(await u(`/movie/${n.id}`)).genres.map(S=>S.name).join(", "),f=JSON.parse(localStorage.getItem("library")||"[]").some(S=>S.id===n.id),p=document.createElement("li");p.className="weekly-movie-item",p.innerHTML=`
          <a href="#" class="weekly-movie-link" data-movie-id="${n.id}">
            <img
              src="${_}/w500${n.poster_path}"
              alt="${n.title}"
              class="weekly-movie-image"
            />
            <div class="movie-rating">
              <i class="fas fa-star"></i>
              <span>${n.vote_average.toFixed(1)}</span>
            </div>
            <div class="movie-year">${((o=n.release_date)==null?void 0:o.split("-")[0])||"N/A"}</div>
            <div class="weekly-movie-info">
              <h3 class="movie-title">${n.title}</h3>
              <div class="movie-meta">
                <span>${A}</span>
                <span class="movie-meta-divider">|</span>
                <span>${((i=n.release_date)==null?void 0:i.split("-")[0])||"N/A"}</span>
              </div>
            </div>
          </a>
          <button class="add-to-library ${f?"added":""}" data-movie-id="${n.id}">
            <i class="fas ${f?"fa-check":"fa-plus"}"></i>
            ${f?"Added to library":"Add to library"}
          </button>
        `;const g=p.querySelector(".add-to-library");g.addEventListener("click",async S=>{S.preventDefault(),S.stopPropagation();const y=parseInt(g.dataset.movieId),k=v.results.find(M=>M.id===y);if(!k)return;const b=await u(`/movie/${y}`),J={id:y,title:k.title,poster_path:k.poster_path,release_date:k.release_date,vote_average:k.vote_average,genres:b.genres.map(M=>M.name).join(", "),overview:k.overview};let E=JSON.parse(localStorage.getItem("library")||"[]");E.some(M=>M.id===y)?(E=E.filter(M=>M.id!==y),localStorage.setItem("library",JSON.stringify(E)),g.innerHTML='<i class="fas fa-plus"></i> Add to library',g.style.background="#ff6b01",g.disabled=!1):(E.push(J),localStorage.setItem("library",JSON.stringify(E)),g.innerHTML='<i class="fas fa-check"></i> Added to library',g.style.background="#2ecc71",g.disabled=!0)}),s.appendChild(p)}catch(c){console.error(`Error fetching details for movie ${n.id}:`,c)}document.querySelector(".pagination").style.display="none"}catch(v){console.error("Error searching movies:",v),I("Failed to search movies. Please try again later.")}}async function Z(e){try{let t;if(e==="all"?t=await u("/trending/movie/week"):t=await u("/discover/movie",{primary_release_year:e,sort_by:"popularity.desc",language:"en-US"}),!(t!=null&&t.results))return;T(t.results),document.querySelector(".pagination").style.display="none"}catch(t){console.error("Error fetching movies by year:",t),I("Failed to load movies. Please try again later.")}}const ee=()=>{const e=JSON.parse(localStorage.getItem("library")||"[]");document.querySelectorAll(".add-to-library").forEach(t=>{const r=parseInt(t.dataset.movieId);e.some(o=>o.id===r)&&(t.innerHTML='<i class="fas fa-check"></i> Added to library',t.style.background="#2ecc71",t.disabled=!0)})},te=()=>{V(),U(),initSearch(),initYearFilter(),initPagination()};document.addEventListener("DOMContentLoaded",async()=>{te(),ee(),document.querySelector(".search-button").addEventListener("click",D),document.querySelector(".search-input").addEventListener("keypress",o=>{o.key==="Enter"&&D(o)}),document.querySelector(".year-select").addEventListener("change",o=>{const i=o.target.value;Z(i)})});function ae(e,t){const r=document.querySelector(".pagination");if(!r)return;let o="";o+=`
    <button class="pagination-btn" data-page="${e-1}" ${e===1?"disabled":""}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;for(let i=1;i<=t;i++)i===1||i===t||i>=e-1&&i<=e+1?o+=`
        <button class="pagination-btn ${i===e?"active":""}" data-page="${i}">
          ${i}
        </button>
      `:(i===e-2||i===e+2)&&(o+='<span class="page-dots">...</span>');o+=`
    <button class="pagination-btn" data-page="${e+1}" ${e===t?"disabled":""}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `,r.innerHTML=o}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".pagination");e&&e.addEventListener("click",t=>{const r=t.target.closest(".pagination-btn");if(!r||r.disabled)return;const o=parseInt(r.dataset.page);isNaN(o)||j(o)})});const j=async(e=1)=>{try{const t=document.getElementById("year-select").value,r=document.getElementById("search-input").value,o=await u("/discover/movie",{page:e,year:t,query:r,language:"en-US",include_adult:!0});if(!(o!=null&&o.results)){a.movieGrid.innerHTML="<p>No movies found.</p>";return}const i=o.results.map(s=>{const n=s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",c=s.release_date?s.release_date.split("-")[0]:"N/A";return`
          <div class="movie-item">
            <a href="#" class="movie-link" data-id="${s.id}">
              <div class="movie-image-container">
                <img src="${n}" alt="${s.title}" class="movie-image" />
                <div class="movie-info">
                  <h3 class="movie-title">${s.title}</h3>
                  <div class="movie-meta">
                    <span class="movie-year">${c}</span>
                    <span class="movie-meta-divider">•</span>
                    <span class="movie-rating">
                      <i class="fas fa-star"></i>
                      ${s.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `}).join("");a.movieGrid.innerHTML=i,ae(e,Math.min(o.total_pages,500)),a.movieGrid.querySelectorAll(".movie-link").forEach(s=>{s.addEventListener("click",async n=>{n.preventDefault();const c=s.dataset.id;await F(c)})})}catch(t){console.error("Error fetching movies:",t),a.movieGrid.innerHTML="<p>Error loading movies. Please try again.</p>"}};document.addEventListener("DOMContentLoaded",()=>{j()});const re=()=>{a.hamburgerMenu.addEventListener("click",()=>{a.hamburgerMenu.classList.toggle("active"),a.navLinks.classList.toggle("active")}),document.addEventListener("click",e=>{!a.hamburgerMenu.contains(e.target)&&!a.navLinks.contains(e.target)&&(a.hamburgerMenu.classList.remove("active"),a.navLinks.classList.remove("active"))}),a.navLinks.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{a.hamburgerMenu.classList.remove("active"),a.navLinks.classList.remove("active")})})};re();
//# sourceMappingURL=catalog.js.map
