(()=>{"use strict";function t(t){t.classList.remove("popup_is-opened"),t.removeEventListener("click",e),document.removeEventListener("keydown",n)}function e(e){e.currentTarget===e.target&&t(e.currentTarget)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}const o=document.querySelector(".form-add-task"),s=document.querySelector(".todo__add-task-input"),c=document.getElementById("clearButton"),u=document.querySelector(".todo__tasks-list"),i=document.querySelectorAll(".popup__close-btn"),a=document.querySelector(".popup"),d=document.getElementById("removeBtn"),l=a.querySelector(".popup__input"),r=a.querySelector(".popup__btn-apply"),m=document.querySelectorAll(".popup__status-button");o.addEventListener("submit",(function(t){t.preventDefault();const e=s.value,n={id:Date.now(),text:e,status:"Открыт"};p.push(n),g(),y(),k(n),s.value="",s.focus(),_()}));let p=[];localStorage.getItem("tasks")&&(p=JSON.parse(localStorage.getItem("tasks")),p.forEach((function(t){k(t)})),_(),g());let f=null;function g(){u.addEventListener("click",(function(t){if("LI"===t.target.tagName||"BUTTON"===t.target.tagName||"H4"===t.target.tagName){f=t.target.closest("li").id;const o=t.target.closest("li").querySelector(".todo__tasks-items-title").textContent.trim();l.value=o,l.focus(),function(t){t.classList.add("popup_is-animated"),setTimeout((()=>{t.classList.add("popup_is-opened")}),1),t.addEventListener("click",e),document.addEventListener("keydown",n)}(a),_(),y()}})),d.addEventListener("click",(function(){if(f){const e=document.getElementById(f);e&&(e.parentNode.removeChild(e),p=p.filter((t=>t.id!==parseInt(f))),t(a),_(),y())}})),r.addEventListener("click",(function(){const e=l.value,n=document.getElementById(f);n&&(n.querySelector(".todo__tasks-items-title").textContent=e,t(a),y())}))}function _(){const t=p.filter((t=>"Открыт"===t.status)).length,e=p.filter((t=>"В работе"===t.status)).length,n=p.filter((t=>"Закрыт"===t.status)).length;document.getElementById("openCount").textContent=t,document.getElementById("closeCount").textContent=n,document.getElementById("inProgressCount").textContent=e,y()}function y(){localStorage.setItem("tasks",JSON.stringify(p))}function k(t){const e=`\n  <li class="todo__tasks-item" id="${t.id}" >\n      <h4 class="todo__tasks-items-title">\n          ${t.text}\n      </h4>\n      <button class="todo__tasks-items-button">${t.status}</button>\n  </li>`;u.insertAdjacentHTML("beforeend",e)}c.addEventListener("click",(function(t){t.preventDefault(),s.value=""})),i.forEach((e=>{e.addEventListener("click",(function(){t(e.closest(".popup_is-opened"))}))})),m.forEach((e=>{e.addEventListener("click",(function(){const n=e.getAttribute("data-status");!function(t,e){const n=p.find((e=>e.id===parseInt(t)));if(n){n.status=e;const o=document.getElementById(t);o&&(o.querySelector(".todo__tasks-items-button").textContent=e),_(),y()}}(f,n),t(a),y()}))}))})();