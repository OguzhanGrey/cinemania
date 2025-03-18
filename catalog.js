import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as j}from"./assets/vendor-Cv0FVZ7t.js";const R="8a0658d1a6872272a1ed1ab9af543174",V="https://api.themoviedb.org/3",T="https://image.tmdb.org/t/p",o={weeklyMovieList:document.querySelector(".weekly-movie-list"),hero:document.querySelector(".hero"),defaultHero:document.querySelector(".default-hero"),movieHero:document.querySelector(".movie-hero"),prevButton:document.querySelector(".slider-button.prev"),nextButton:document.querySelector(".slider-button.next"),themeSwitch:document.getElementById("theme-switch"),upcomingMovieList:document.querySelector(".upcoming-movies-list"),modal:document.getElementById("movieDetailsModal"),modalCloseBtn:document.querySelector(".modal-close-btn"),videoModal:document.getElementById("videoModal"),videoFrame:document.getElementById("videoFrame"),videoModalCloseBtn:document.querySelector("#videoModal .modal-close-btn"),errorModal:document.getElementById("errorModal"),errorModalCloseBtn:document.querySelector("#errorModal .modal-close-btn"),errorMessage:document.querySelector(".error-message")},Y=j.create({baseURL:V,headers:{"Content-Type":"application/json"},params:{api_key:R}}),g=async(e,t={})=>{try{return(await Y.get(e,{params:t})).data}catch(a){return console.error("Error fetching data:",a),null}},N=e=>Array(5).fill().map((t,a)=>`
      <i class="fas fa-star ${a<Math.round(e/2)?"filled":""}"></i>
    `).join(""),x=e=>new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),G=(e,t=2)=>(e||[]).slice(0,t).map(a=>a.name).join(", "),W=()=>{localStorage.getItem("theme")==="light"?(document.documentElement.setAttribute("data-theme","light"),o.themeSwitch.checked=!1):(document.documentElement.removeAttribute("data-theme"),o.themeSwitch.checked=!0),o.themeSwitch.addEventListener("change",()=>{o.themeSwitch.checked?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})},K=e=>{o.videoFrame.src=`https://www.youtube.com/embed/${e}?autoplay=1`,o.videoModal.classList.add("active"),document.body.style.overflow="hidden"},P=()=>{o.videoFrame.src="",o.videoModal.classList.remove("active"),document.body.style.overflow=""};o.videoModalCloseBtn.addEventListener("click",P);o.videoModal.addEventListener("click",e=>{e.target===o.videoModal&&P()});const _=e=>{o.errorMessage.textContent=e,o.errorModal.classList.add("active"),document.body.style.overflow="hidden"},F=()=>{o.errorModal.classList.remove("active"),document.body.style.overflow=""};o.errorModalCloseBtn.addEventListener("click",F);o.errorModal.addEventListener("click",e=>{e.target===o.errorModal&&F()});const B=e=>e?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(e):"N/A",z=e=>{if(!e)return"N/A";const t=Math.floor(e/60),a=e%60;return`${t}h ${a}m`},Q=async e=>{try{const[t,a]=await Promise.all([g(`/movie/${e}`),g(`/movie/${e}/credits`)]);o.modal.querySelector(".modal-title").textContent=t.title,o.modal.querySelector(".modal-rating").innerHTML=`
      <div class="stars">${N(t.vote_average)}</div>
      <span>${t.vote_average.toFixed(1)}</span>
    `,o.modal.querySelector(".modal-genres").innerHTML=`
      <h4>Genres</h4>
      <p>${t.genres.map(s=>s.name).join(", ")}</p>
    `,o.modal.querySelector(".modal-release-date").innerHTML=`
      <h4>Release Date</h4>
      <p>${x(t.release_date)}</p>
    `,o.modal.querySelector(".modal-runtime").innerHTML=`
      <h4>Runtime</h4>
      <p>${z(t.runtime)}</p>
    `,o.modal.querySelector(".modal-budget").innerHTML=`
      <h4>Budget</h4>
      <p>${B(t.budget)}</p>
    `,o.modal.querySelector(".modal-revenue").innerHTML=`
      <h4>Revenue</h4>
      <p>${B(t.revenue)}</p>
    `,o.modal.querySelector(".modal-overview p").textContent=t.overview;const n=o.modal.querySelector(".cast-list");n.innerHTML=a.cast.slice(0,6).map(s=>`
        <div class="cast-member">
          <img src="https://image.tmdb.org/t/p/w185${s.profile_path}" alt="${s.name}">
          <div class="name">${s.name}</div>
          <div class="character">${s.character}</div>
        </div>
      `).join(""),o.modal.classList.add("active"),document.body.style.overflow="hidden"}catch(t){console.error("Error fetching movie details:",t)}},C=()=>{o.modal.classList.remove("active"),document.body.style.overflow=""};o.modalCloseBtn.addEventListener("click",C);o.modal.addEventListener("click",e=>{e.target===o.modal&&C()});const X=async()=>{try{const e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0),a=await g("/movie/upcoming",{region:"US",language:"en-US"});if(!(a!=null&&a.results))return;const n=a.results.filter(i=>{const r=new Date(i.release_date);return r<=t&&r>=e&&i.backdrop_path&&i.title&&i.vote_average>0}).sort((i,r)=>r.popularity-i.popularity).slice(0,3);if(n.length===0){o.upcomingMovieList.innerHTML="<p>No upcoming movies available for this month.</p>";return}const s=n.map(async i=>{const r=await g(`/movie/${i.id}`),c=G(r==null?void 0:r.genres,3),m=JSON.parse(localStorage.getItem("library")||"[]").some(v=>v.id===i.id);return`
        <li class="upcoming-movie-item">
          <a class="upcoming-movie-link" href="#">
            <div class="upcoming-movie-image-container">
              <img class="upcoming-movie-image" src="https://image.tmdb.org/t/p/w1280${i.backdrop_path}" alt="${i.title}">
            </div>
            <div class="upcoming-movie-info">
              <h3 class="movie-title">${i.title}</h3>
              <div class="info-section">
                <div class="info-row">
                  <span class="info-label">Release Date</span>
                  <span class="info-value-date">${x(i.release_date)}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Vote / Votes</span>
                  <span class="info-value-rating">
                    ${i.vote_average.toFixed(1)} / ${i.vote_count.toLocaleString()} votes
                  </span>
                </div>
                <div class="info-row">
                  <span class="info-label">Popularity</span>
                  <span class="info-value-popularity">${Math.round(i.popularity).toLocaleString()}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Genre</span>
                  <span class="info-value-genre">${c}</span>
                </div>
              </div>
              <div class="movie-about">
                <h4 class="about-label">ABOUT</h4>
                <p class="about-text">${i.overview}</p>
              </div>
              <button class="add-to-library ${m?"added":""}" data-movie-id="${i.id}">
                <i class="fas ${m?"fa-check":"fa-plus"}"></i>
                ${m?"Added to library":"Add to my library"}
              </button>
            </div>
          </a>
        </li>
      `}),d=await Promise.all(s);o.upcomingMovieList.innerHTML=d.join(""),o.upcomingMovieList.addEventListener("click",i=>{const r=i.target.closest(".add-to-library");if(!r)return;i.preventDefault();const c=parseInt(r.dataset.movieId),b=n.find(u=>u.id===c);if(!b)return;const m={id:c,title:b.title,poster_path:b.poster_path,release_date:b.release_date,vote_average:b.vote_average};r.innerHTML='<i class="fas fa-check"></i> Added to library',r.style.background="#2ecc71",r.disabled=!0;let v=JSON.parse(localStorage.getItem("library")||"[]");v.some(u=>u.id===c)||(v.push(m),localStorage.setItem("library",JSON.stringify(v)))})}catch(e){console.error("Error rendering upcoming movies:",e),o.upcomingMovieList.innerHTML="<p>Error loading upcoming movies.</p>"}};async function L(e){const t=document.querySelector(".hero-content.movie-hero"),a=document.querySelector(".hero");a.style.backgroundImage=`url(${T}/original${e.backdrop_path})`,t.innerHTML=`
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
  `,t.style.display="block";const n=t.querySelector(".watch-trailer-btn"),s=t.querySelector(".more-details-btn");n.addEventListener("click",async()=>{try{const i=(await g(`/movie/${e.id}/videos`)).results.find(r=>r.type==="Trailer"&&r.site==="YouTube");i?K(i.key):_("Sorry, trailer is not available for this movie at the moment. Please check back later.")}catch(d){console.error("Error fetching video:",d),_("Sorry, we encountered an error while loading the trailer. Please try again later.")}}),s.addEventListener("click",()=>Q(e.id))}let l=0,p=[],I;function Z(e){p=e,l=Math.floor(Math.random()*e.length),L(p[l]);const t=document.querySelector(".hero-nav-btn.prev-movie"),a=document.querySelector(".hero-nav-btn.next-movie");t.addEventListener("click",()=>{clearInterval(I),l=(l-1+p.length)%p.length,L(p[l]),I=setInterval(()=>{l=(l+1)%p.length,L(p[l])},5e3)}),a.addEventListener("click",()=>{clearInterval(I),l=(l+1)%p.length,L(p[l]),I=setInterval(()=>{l=(l+1)%p.length,L(p[l])},5e3)}),I=setInterval(()=>{l=(l+1)%p.length,L(p[l])},5e3)}async function D(e){const t=document.querySelector(".weekly-movie-list");t.innerHTML="";for(const a of e)try{const s=(await g(`/movie/${a.id}`)).genres.map(m=>m.name).join(", "),i=JSON.parse(localStorage.getItem("library")||"[]").some(m=>m.id===a.id),r=document.createElement("li");r.className="weekly-movie-item",r.innerHTML=`
        <a href="#" class="weekly-movie-link" data-movie-id="${a.id}">
          <img
            src="${T}/w500${a.poster_path}"
            alt="${a.title}"
            class="weekly-movie-image"
          />
          <div class="movie-rating">
            <i class="fas fa-star"></i>
            <span>${a.vote_average.toFixed(1)}</span>
          </div>
          <div class="movie-year">${a.release_date.split("-")[0]}</div>
          <div class="weekly-movie-info">
            <h3 class="movie-title">${a.title}</h3>
            <div class="movie-meta">
              <span>${s}</span>
              <span class="movie-meta-divider">|</span>
              <span>${a.release_date.split("-")[0]}</span>
            </div>
          </div>
        </a>
        <button class="add-to-library ${i?"added":""}" data-movie-id="${a.id}">
          <i class="fas ${i?"fa-check":"fa-plus"}"></i>
          ${i?"Added to library":"Add to library"}
        </button>
      `;const c=r.querySelector(".add-to-library");c.addEventListener("click",async m=>{m.preventDefault(),m.stopPropagation();const v=parseInt(c.dataset.movieId),u=e.find(S=>S.id===v);if(!u)return;const f=await g(`/movie/${v}`),w={id:v,title:u.title,poster_path:u.poster_path,release_date:u.release_date,vote_average:u.vote_average,genres:f.genres.map(S=>S.name).join(", "),overview:u.overview};let h=JSON.parse(localStorage.getItem("library")||"[]");h.some(S=>S.id===v)?(h=h.filter(S=>S.id!==v),localStorage.setItem("library",JSON.stringify(h)),c.innerHTML='<i class="fas fa-plus"></i> Add to library',c.style.background="#ff6b01",c.disabled=!1):(h.push(w),localStorage.setItem("library",JSON.stringify(h)),c.innerHTML='<i class="fas fa-check"></i> Added to library',c.style.background="#2ecc71",c.disabled=!0)}),r.querySelector(".weekly-movie-link").addEventListener("click",async m=>{m.preventDefault(),clearInterval(I),L(a),document.querySelector(".hero").scrollIntoView({behavior:"smooth"}),I=setInterval(()=>{l=(l+1)%p.length,L(p[l])},5e3)}),t.appendChild(r)}catch(n){console.error(`Error fetching details for movie ${a.id}:`,n)}}async function O(){try{const e=await g("/trending/movie/week");if(!(e!=null&&e.results))return;D(e.results),Z(e.results)}catch(e){console.error("Error fetching trending movies:",e),_("Failed to load trending movies. Please try again later.")}}let y=1,k=27,q=!1;async function A(e){if(!(q||e===y))try{q=!0;const t=await g("/movie/popular",{page:e,language:"en-US"});if(!(t!=null&&t.results))return;D(t.results),y=e,U(),window.scrollTo({top:0,behavior:"smooth"})}catch(t){console.error("Error fetching page:",t),_("Failed to load movies. Please try again later.")}finally{q=!1}}function U(){const e=document.querySelector(".page-numbers"),t=document.querySelector(".pagination-btn.prev-page"),a=document.querySelector(".pagination-btn.next-page");t.disabled=y===1,a.disabled=y===k;let n="";n+=`
    <button class="pagination-btn ${y===1?"active":""}" data-page="1">1</button>
  `,y>4&&(n+='<span class="page-dots">...</span>');for(let s=Math.max(2,y-2);s<=Math.min(k-1,y+2);s++)n+=`
      <button class="pagination-btn ${y===s?"active":""}" data-page="${s}">${s}</button>
    `;y<k-3&&(n+='<span class="page-dots">...</span>'),n+=`
      <button class="pagination-btn ${y===k?"active":""}" data-page="${k}">${k}</button>
    `,e.innerHTML=n,e.querySelectorAll(".pagination-btn").forEach(s=>{s.addEventListener("click",()=>{const d=parseInt(s.dataset.page);A(d)})})}document.querySelector(".pagination-btn.prev-page").addEventListener("click",()=>{y>1&&A(y-1)});document.querySelector(".pagination-btn.next-page").addEventListener("click",()=>{y<k&&A(y+1)});async function H(e){var n,s;e.preventDefault();const a=document.querySelector(".search-input").value.trim();if(!a){O();return}try{const d=await g("/search/movie",{query:a,language:"en-US"});if(!(d!=null&&d.results))return;const i=document.querySelector(".weekly-movie-list");i.innerHTML="";for(const r of d.results)try{const b=(await g(`/movie/${r.id}`)).genres.map(w=>w.name).join(", "),v=JSON.parse(localStorage.getItem("library")||"[]").some(w=>w.id===r.id),u=document.createElement("li");u.className="weekly-movie-item",u.innerHTML=`
          <a href="#" class="weekly-movie-link" data-movie-id="${r.id}">
            <img
              src="${T}/w500${r.poster_path}"
              alt="${r.title}"
              class="weekly-movie-image"
            />
            <div class="movie-rating">
              <i class="fas fa-star"></i>
              <span>${r.vote_average.toFixed(1)}</span>
            </div>
            <div class="movie-year">${((n=r.release_date)==null?void 0:n.split("-")[0])||"N/A"}</div>
            <div class="weekly-movie-info">
              <h3 class="movie-title">${r.title}</h3>
              <div class="movie-meta">
                <span>${b}</span>
                <span class="movie-meta-divider">|</span>
                <span>${((s=r.release_date)==null?void 0:s.split("-")[0])||"N/A"}</span>
              </div>
            </div>
          </a>
          <button class="add-to-library ${v?"added":""}" data-movie-id="${r.id}">
            <i class="fas ${v?"fa-check":"fa-plus"}"></i>
            ${v?"Added to library":"Add to library"}
          </button>
        `;const f=u.querySelector(".add-to-library");f.addEventListener("click",async w=>{w.preventDefault(),w.stopPropagation();const h=parseInt(f.dataset.movieId),$=d.results.find(M=>M.id===h);if(!$)return;const S=await g(`/movie/${h}`),J={id:h,title:$.title,poster_path:$.poster_path,release_date:$.release_date,vote_average:$.vote_average,genres:S.genres.map(M=>M.name).join(", "),overview:$.overview};let E=JSON.parse(localStorage.getItem("library")||"[]");E.some(M=>M.id===h)?(E=E.filter(M=>M.id!==h),localStorage.setItem("library",JSON.stringify(E)),f.innerHTML='<i class="fas fa-plus"></i> Add to library',f.style.background="#ff6b01",f.disabled=!1):(E.push(J),localStorage.setItem("library",JSON.stringify(E)),f.innerHTML='<i class="fas fa-check"></i> Added to library',f.style.background="#2ecc71",f.disabled=!0)}),i.appendChild(u)}catch(c){console.error(`Error fetching details for movie ${r.id}:`,c)}document.querySelector(".pagination").style.display="none"}catch(d){console.error("Error searching movies:",d),_("Failed to search movies. Please try again later.")}}async function ee(e){try{let t;if(e==="all"?t=await g("/trending/movie/week"):t=await g("/discover/movie",{primary_release_year:e,sort_by:"popularity.desc",language:"en-US"}),!(t!=null&&t.results))return;D(t.results),document.querySelector(".pagination").style.display="none"}catch(t){console.error("Error fetching movies by year:",t),_("Failed to load movies. Please try again later.")}}const te=()=>{const e=JSON.parse(localStorage.getItem("library")||"[]");document.querySelectorAll(".add-to-library").forEach(t=>{const a=parseInt(t.dataset.movieId);e.some(n=>n.id===a)&&(t.innerHTML='<i class="fas fa-check"></i> Added to library',t.style.background="#2ecc71",t.disabled=!0)})};document.addEventListener("DOMContentLoaded",()=>{W(),O(),X(),U(),te(),document.querySelector(".search-button").addEventListener("click",H),document.querySelector(".search-input").addEventListener("keypress",n=>{n.key==="Enter"&&H(n)}),document.querySelector(".year-select").addEventListener("change",n=>{const s=n.target.value;ee(s)})});
//# sourceMappingURL=catalog.js.map
