"use strict";!function e(i,t,s){function n(c,l){if(!t[c]){if(!i[c]){var a="function"==typeof require&&require;if(!l&&a)return a(c,!0);if(r)return r(c,!0);throw new Error("Cannot find module '"+c+"'")}var o=t[c]={exports:{}};i[c][0].call(o.exports,function(e){var t=i[c][1][e];return n(t?t:e)},o,o.exports,e,i,t,s)}return t[c].exports}for(var r="function"==typeof require&&require,c=0;c<s.length;c++)n(s[c]);return n}({1:[function(e,i,t){function s(){alert("game over"),a.removeAttribute("disabled");for(var e=0;e<l.length;e++)l[e].classList.contains("disable")&&l[e].classList.remove("disable"),l[e].classList.contains("active")&&l[e].classList.remove("active")}function n(e){for(var i=0;i<c.length;i++)if(10===c[i].querySelectorAll(".disable").length){o.innerHTML=e+=100;for(var t=0;t<c[i].children.length;t++)c[i].children[t].classList.remove("disable");for(var s=i;s>0;s--)for(var n=0;n<c[s].children.length;n++)c[s].children[n].classList.contains("disable")&&(c[s].children[n].classList.remove("disable"),c[s+1].children[n].classList.add("disable"))}}function r(e,i){function t(){window.addEventListener("keydown",function(e){37===e.keyCode&&0!=d&&!c[o].children[d-1].classList.contains("disable")&&c[o].children[d].classList.contains("active")&&(c[o].children[d].classList.remove("active"),d--,console.log(d),c[o].children[d].classList.add("active")),39===e.keyCode&&d!=c[0].children.length-1&&!c[o].children[d+1].classList.contains("disable")&&c[o].children[d].classList.contains("active")&&(c[o].children[d].classList.remove("active"),d++,console.log(d),c[o].children[d].classList.add("active"))})}function l(){return o<c.length-1&&!c[o+1].children[d].classList.contains("disable")?(c[o].children[d].classList.remove("active"),o++,c[o].children[d].classList.add("active"),void(a===!0&&setTimeout(l,i))):(c[o].children[d].classList.remove("active"),c[o].children[d].classList.add("disable"),n(e),c[0].querySelector(".disable")?s():(a=!1,r(e,i/1.01)))}var a=!0,o=0,d=Math.round(c[0].children.length/2);c[o].children[d].classList.add("active"),t(),l()}var c=document.querySelectorAll(".row"),l=document.querySelectorAll(".block"),a=document.querySelector("#start"),o=document.querySelector(".coins");a.addEventListener("click",function(){o.innerHTML="0";new r(0,200);a.setAttribute("disabled","disabled")})},{}]},{},[1]);