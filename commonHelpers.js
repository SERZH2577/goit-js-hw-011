import{S as v,i as d}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const b="25810966-6fb22a4db6c9a757ebd742847",L="https://pixabay.com/api/";function g(n,t){return fetch(`${L}?key=${b}&q=${t}&page=${n}&per_page=40&image_type=photo&orientation=horizontal`).then(o=>o.json())}function h(n){return n.map(({largeImageURL:t,webformatURL:o,tags:c,likes:e,views:i,comments:l,downloads:y})=>`<li class="gallery-item">
			<a href="${t}"
				class="link-img">
				<img
					src="${o}"
					alt="${c}">
			</a>
			<ul class="list-info">
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-like-svgrepo-com"></use>
					</svg>
					<!-- <p class="list-info-name">Likes:</p> -->
					<p class="list-info-value">${e}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-eye"></use>
					</svg>
					<!-- <p class="list-info-name">Views:</p> -->
					<p class="list-info-value">${i}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-bubble2"></use>
					</svg>
					<!-- <p class="list-info-name">Comments:</p> -->
					<p class="list-info-value">${l}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-cloud-download"></use>
					</svg>
					<!-- <p class="list-info-name">Downloads:</p> -->
					<p class="list-info-value">${y}</p>
				</li>
			</ul>
		</li>`).join("")}const f=document.querySelector(".gallery"),s=document.querySelector(".more"),m=document.querySelector(".form"),r=document.querySelector(".loader");m.addEventListener("submit",$);s.addEventListener("click",S);r.hidden=!0;const p=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});let u="",a=0;function $(n){if(n.preventDefault(),n.currentTarget.elements.query.value.trim()===""){d.error({position:"topRight",messageColor:"brown",message:"Enter anything in the search field!",timeout:3e3});return}u=n.currentTarget.elements.query.value,a=1,s.disabled=!1,s.textContent="More",s.hidden=!0,r.hidden=!1,f.innerHTML="",g(a,u).then(t=>{if(t.hits.length===0){d.error({position:"topRight",messageColor:"brown",message:"Sorry, there are no images matching your search query. Please try again!",timeout:3e3}),r.hidden=!0;return}a+=1,f.insertAdjacentHTML("beforeend",h(t.hits)),p.refresh(),t.hits.length===40&&(s.hidden=!1),(s.hidden===!1||t.hits.length<40)&&(r.hidden=!0)}),m.reset()}function S(n){n.preventDefault(),s.hidden=!0,r.hidden=!1,g(a,u).then(t=>{a+=1,f.insertAdjacentHTML("beforeend",h(t.hits)),p.refresh(),t.hits.length===40&&(s.hidden=!1),s.hidden===!1&&(r.hidden=!0),t.hits.length<40&&(s.hidden=!1,s.disabled=!0,r.hidden=!0,s.textContent="Images are over")})}
//# sourceMappingURL=commonHelpers.js.map
