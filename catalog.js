import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as O}from"./assets/vendor-Cv0FVZ7t.js";const J="8a0658d1a6872272a1ed1ab9af543174",j="https://api.themoviedb.org/3",_="https://image.tmdb.org/t/p",r={weeklyMovieList:document.querySelector(".weekly-movie-list"),hero:document.querySelector(".hero"),defaultHero:document.querySelector(".default-hero"),movieHero:document.querySelector(".movie-hero"),prevButton:document.querySelector(".slider-button.prev"),nextButton:document.querySelector(".slider-button.next"),themeSwitch:document.getElementById("theme-switch"),modal:document.getElementById("movieDetailsModal"),modalCloseBtn:document.querySelector(".modal-close-btn"),videoModal:document.getElementById("videoModal"),videoFrame:document.getElementById("videoFrame"),videoModalCloseBtn:document.querySelector("#videoModal .modal-close-btn"),errorModal:document.getElementById("errorModal"),errorModalCloseBtn:document.querySelector("#errorModal .modal-close-btn"),errorMessage:document.querySelector(".error-message")},R=O.create({baseURL:j,headers:{"Content-Type":"application/json"},params:{api_key:J}}),v=async(e,t={})=>{try{return(await R.get(e,{params:t})).data}catch(a){return console.error("Error fetching data:",a),null}},x=e=>Array(5).fill().map((t,a)=>`
      <i class="fas fa-star ${a<Math.round(e/2)?"filled":""}"></i>
    `).join(""),Y=e=>new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),W=()=>{localStorage.getItem("theme")==="light"?(document.documentElement.setAttribute("data-theme","light"),r.themeSwitch.checked=!1):(document.documentElement.removeAttribute("data-theme"),r.themeSwitch.checked=!0),r.themeSwitch.addEventListener("change",()=>{r.themeSwitch.checked?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})},V=e=>{r.videoFrame.src=`https://www.youtube.com/embed/${e}?autoplay=1`,r.videoModal.classList.add("active"),document.body.style.overflow="hidden"},C=()=>{r.videoFrame.src="",r.videoModal.classList.remove("active"),document.body.style.overflow=""};r.videoModalCloseBtn.addEventListener("click",C);r.videoModal.addEventListener("click",e=>{e.target===r.videoModal&&C()});const E=e=>{r.errorMessage.textContent=e,r.errorModal.classList.add("active"),document.body.style.overflow="hidden"},N=()=>{r.errorModal.classList.remove("active"),document.body.style.overflow=""};r.errorModalCloseBtn.addEventListener("click",N);r.errorModal.addEventListener("click",e=>{e.target===r.errorModal&&N()});const D=e=>e?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(e):"N/A",G=e=>{if(!e)return"N/A";const t=Math.floor(e/60),a=e%60;return`${t}h ${a}m`},K=async e=>{try{const[t,a]=await Promise.all([v(`/movie/${e}`),v(`/movie/${e}/credits`)]);r.modal.querySelector(".modal-title").textContent=t.title,r.modal.querySelector(".modal-rating").innerHTML=`
      <div class="stars">${x(t.vote_average)}</div>
      <span>${t.vote_average.toFixed(1)}</span>
    `,r.modal.querySelector(".modal-genres").innerHTML=`
      <h4>Genres</h4>
      <p>${t.genres.map(o=>o.name).join(", ")}</p>
    `,r.modal.querySelector(".modal-release-date").innerHTML=`
      <h4>Release Date</h4>
      <p>${Y(t.release_date)}</p>
    `,r.modal.querySelector(".modal-runtime").innerHTML=`
      <h4>Runtime</h4>
      <p>${G(t.runtime)}</p>
    `,r.modal.querySelector(".modal-budget").innerHTML=`
      <h4>Budget</h4>
      <p>${D(t.budget)}</p>
    `,r.modal.querySelector(".modal-revenue").innerHTML=`
      <h4>Revenue</h4>
      <p>${D(t.revenue)}</p>
    `,r.modal.querySelector(".modal-overview p").textContent=t.overview;const i=r.modal.querySelector(".cast-list");i.innerHTML=a.cast.slice(0,6).map(o=>`
        <div class="cast-member">
          <img src="https://image.tmdb.org/t/p/w185${o.profile_path}" alt="${o.name}">
          <div class="name">${o.name}</div>
          <div class="character">${o.character}</div>
        </div>
      `).join(""),r.modal.classList.add("active"),document.body.style.overflow="hidden"}catch(t){console.error("Error fetching movie details:",t)}},F=()=>{r.modal.classList.remove("active"),document.body.style.overflow=""};r.modalCloseBtn.addEventListener("click",F);r.modal.addEventListener("click",e=>{e.target===r.modal&&F()});async function w(e){const t=document.querySelector(".hero-content.movie-hero"),a=document.querySelector(".hero");a.style.backgroundImage=`url(${_}/original${e.backdrop_path})`,t.innerHTML=`
    <h1>${e.title}</h1>
    <div class="movie-rating-stars">
      <div class="stars">${x(e.vote_average)}</div>
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
  `,t.style.display="block";const i=t.querySelector(".watch-trailer-btn"),o=t.querySelector(".more-details-btn");i.addEventListener("click",async()=>{try{const h=(await v(`/movie/${e.id}/videos`)).results.find(n=>n.type==="Trailer"&&n.site==="YouTube");h?V(h.key):E("Sorry, trailer is not available for this movie at the moment. Please check back later.")}catch(d){console.error("Error fetching video:",d),E("Sorry, we encountered an error while loading the trailer. Please try again later.")}}),o.addEventListener("click",()=>K(e.id))}let s=0,l=[],M;function z(e){l=e,s=Math.floor(Math.random()*e.length),w(l[s]);const t=document.querySelector(".hero-nav-btn.prev-movie"),a=document.querySelector(".hero-nav-btn.next-movie");t.addEventListener("click",()=>{clearInterval(M),s=(s-1+l.length)%l.length,w(l[s]),M=setInterval(()=>{s=(s+1)%l.length,w(l[s])},5e3)}),a.addEventListener("click",()=>{clearInterval(M),s=(s+1)%l.length,w(l[s]),M=setInterval(()=>{s=(s+1)%l.length,w(l[s])},5e3)}),M=setInterval(()=>{s=(s+1)%l.length,w(l[s])},5e3)}async function T(e){const t=document.querySelector(".weekly-movie-list");t.innerHTML="";for(const a of e)try{const o=(await v(`/movie/${a.id}`)).genres.map(g=>g.name).join(", "),h=JSON.parse(localStorage.getItem("library")||"[]").some(g=>g.id===a.id),n=document.createElement("li");n.className="weekly-movie-item",n.innerHTML=`
        <a href="#" class="weekly-movie-link" data-movie-id="${a.id}">
          <img
            src="${_}/w500${a.poster_path}"
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
              <span>${o}</span>
              <span class="movie-meta-divider">|</span>
              <span>${a.release_date.split("-")[0]}</span>
            </div>
          </div>
        </a>
        <button class="add-to-library ${h?"added":""}" data-movie-id="${a.id}">
          <i class="fas ${h?"fa-check":"fa-plus"}"></i>
          ${h?"Added to library":"Add to library"}
        </button>
      `;const u=n.querySelector(".add-to-library");u.addEventListener("click",async g=>{g.preventDefault(),g.stopPropagation();const f=parseInt(u.dataset.movieId),y=e.find(b=>b.id===f);if(!y)return;const p=await v(`/movie/${f}`),S={id:f,title:y.title,poster_path:y.poster_path,release_date:y.release_date,vote_average:y.vote_average,genres:p.genres.map(b=>b.name).join(", "),overview:y.overview};let m=JSON.parse(localStorage.getItem("library")||"[]");m.some(b=>b.id===f)?(m=m.filter(b=>b.id!==f),localStorage.setItem("library",JSON.stringify(m)),u.innerHTML='<i class="fas fa-plus"></i> Add to library',u.style.background="#ff6b01",u.disabled=!1):(m.push(S),localStorage.setItem("library",JSON.stringify(m)),u.innerHTML='<i class="fas fa-check"></i> Added to library',u.style.background="#2ecc71",u.disabled=!0)}),n.querySelector(".weekly-movie-link").addEventListener("click",async g=>{g.preventDefault(),clearInterval(M),w(a),document.querySelector(".hero").scrollIntoView({behavior:"smooth"}),M=setInterval(()=>{s=(s+1)%l.length,w(l[s])},5e3)}),t.appendChild(n)}catch(i){console.error(`Error fetching details for movie ${a.id}:`,i)}}async function P(){try{const e=await v("/trending/movie/week");if(!(e!=null&&e.results))return;T(e.results),z(e.results)}catch(e){console.error("Error fetching trending movies:",e),E("Failed to load trending movies. Please try again later.")}}let c=1,$=27,q=!1;async function B(e){if(!(q||e===c))try{q=!0;const t=await v("/movie/popular",{page:e,language:"en-US"});if(!(t!=null&&t.results))return;T(t.results),c=e,Q(),window.scrollTo({top:0,behavior:"smooth"})}catch(t){console.error("Error fetching page:",t),E("Failed to load movies. Please try again later.")}finally{q=!1}}function Q(){const e=document.querySelector(".page-numbers"),t=document.querySelector(".pagination-btn.prev-page"),a=document.querySelector(".pagination-btn.next-page");t.disabled=c===1,a.disabled=c===$;let i="";i+=`
    <button class="pagination-btn ${c===1?"active":""}" data-page="1">1</button>
  `,c>4&&(i+='<span class="page-dots">...</span>');for(let o=Math.max(2,c-2);o<=Math.min($-1,c+2);o++)i+=`
      <button class="pagination-btn ${c===o?"active":""}" data-page="${o}">${o}</button>
    `;c<$-3&&(i+='<span class="page-dots">...</span>'),i+=`
      <button class="pagination-btn ${c===$?"active":""}" data-page="${$}">${$}</button>
    `,e.innerHTML=i,e.querySelectorAll(".pagination-btn").forEach(o=>{o.addEventListener("click",()=>{const d=parseInt(o.dataset.page);B(d)})})}document.querySelector(".pagination-btn.prev-page").addEventListener("click",()=>{c>1&&B(c-1)});document.querySelector(".pagination-btn.next-page").addEventListener("click",()=>{c<$&&B(c+1)});async function H(e){var i,o;e.preventDefault();const a=document.querySelector(".search-input").value.trim();if(!a){P();return}try{const d=await v("/search/movie",{query:a,language:"en-US"});if(!(d!=null&&d.results))return;const h=document.querySelector(".weekly-movie-list");h.innerHTML="";for(const n of d.results)try{const A=(await v(`/movie/${n.id}`)).genres.map(S=>S.name).join(", "),f=JSON.parse(localStorage.getItem("library")||"[]").some(S=>S.id===n.id),y=document.createElement("li");y.className="weekly-movie-item",y.innerHTML=`
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
            <div class="movie-year">${((i=n.release_date)==null?void 0:i.split("-")[0])||"N/A"}</div>
            <div class="weekly-movie-info">
              <h3 class="movie-title">${n.title}</h3>
              <div class="movie-meta">
                <span>${A}</span>
                <span class="movie-meta-divider">|</span>
                <span>${((o=n.release_date)==null?void 0:o.split("-")[0])||"N/A"}</span>
              </div>
            </div>
          </a>
          <button class="add-to-library ${f?"added":""}" data-movie-id="${n.id}">
            <i class="fas ${f?"fa-check":"fa-plus"}"></i>
            ${f?"Added to library":"Add to library"}
          </button>
        `;const p=y.querySelector(".add-to-library");p.addEventListener("click",async S=>{S.preventDefault(),S.stopPropagation();const m=parseInt(p.dataset.movieId),L=d.results.find(k=>k.id===m);if(!L)return;const b=await v(`/movie/${m}`),U={id:m,title:L.title,poster_path:L.poster_path,release_date:L.release_date,vote_average:L.vote_average,genres:b.genres.map(k=>k.name).join(", "),overview:L.overview};let I=JSON.parse(localStorage.getItem("library")||"[]");I.some(k=>k.id===m)?(I=I.filter(k=>k.id!==m),localStorage.setItem("library",JSON.stringify(I)),p.innerHTML='<i class="fas fa-plus"></i> Add to library',p.style.background="#ff6b01",p.disabled=!1):(I.push(U),localStorage.setItem("library",JSON.stringify(I)),p.innerHTML='<i class="fas fa-check"></i> Added to library',p.style.background="#2ecc71",p.disabled=!0)}),h.appendChild(y)}catch(u){console.error(`Error fetching details for movie ${n.id}:`,u)}document.querySelector(".pagination").style.display="none"}catch(d){console.error("Error searching movies:",d),E("Failed to search movies. Please try again later.")}}async function X(e){try{let t;if(e==="all"?t=await v("/trending/movie/week"):t=await v("/discover/movie",{primary_release_year:e,sort_by:"popularity.desc",language:"en-US"}),!(t!=null&&t.results))return;T(t.results),document.querySelector(".pagination").style.display="none"}catch(t){console.error("Error fetching movies by year:",t),E("Failed to load movies. Please try again later.")}}const Z=()=>{const e=JSON.parse(localStorage.getItem("library")||"[]");document.querySelectorAll(".add-to-library").forEach(t=>{const a=parseInt(t.dataset.movieId);e.some(i=>i.id===a)&&(t.innerHTML='<i class="fas fa-check"></i> Added to library',t.style.background="#2ecc71",t.disabled=!0)})},ee=()=>{W(),P(),initSearch(),initYearFilter(),initPagination()};document.addEventListener("DOMContentLoaded",async()=>{ee(),Z(),document.querySelector(".search-button").addEventListener("click",H),document.querySelector(".search-input").addEventListener("keypress",i=>{i.key==="Enter"&&H(i)}),document.querySelector(".year-select").addEventListener("change",i=>{const o=i.target.value;X(o)})});
//# sourceMappingURL=catalog.js.map
