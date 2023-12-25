/*!
 * image-process version 4.3.2
 * Author: Xing Zhong <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2023-11-29 14:17:18 (GMT+0900)
 */
(function(l,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(l=typeof globalThis<"u"?globalThis:l||self,s(l.imageProcess={}))})(this,function(l){"use strict";/*!
 * zx-sml version 0.7.5
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2023-05-17 20:41:58 (GMT+0900)
 */var s=Object.defineProperty,R=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,x=(t,e,i)=>e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,P=(t,e)=>{for(var i in e||(e={}))$.call(e,i)&&x(t,i,e[i]);if(R)for(var i of R(e))C.call(e,i)&&x(t,i,e[i]);return t};function M(t){return Array.isArray(t)}function T(t){return typeof t=="object"&&t!==null&&!M(t)}function E(t="",e="-"){return t.replace(/[A-Z]/g,(i,n)=>`${n>0?e:""}${i.toLowerCase()}`)}function z(t="",e=!1){const i=t.replace(/[-_\s](\w)/g,(n,h)=>h.toUpperCase());return e?i.replace(/^\w/,n=>n.toUpperCase()):i}function N(t){return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/,e=>e.replace(/,/g,""))}function B(t,e=!1){if(typeof t=="number")return t;if(typeof t=="string"){if(!e&&/^(-?\d+(?:\.\d+)?)\D*/.test(N(t)))return B(RegExp.$1,!0);const i=Number(t);return isNaN(i)?0:i}return 0}function _(t={},e=!1){const i=e?z:E,n={};for(const[h,d]of Object.entries(t))n[i(h)]=T(d)?_(d,e):d;return n}function f(t,e=!1,i=2){const n=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],h=e?1e3:1024;let d=String(t),a="Byte";for(let r=0,c=t/h;c>1;c/=h,r++)d=c.toFixed(i),a=n[r];return e&&(a=a.replace("i","")),{text:d.replace(/\.0+$/,"")+a,value:+d,unit:a,bytes:t}}function u(t,e={},i){const n=document.createElement(t);for(const[h,d]of Object.entries(e))n.setAttribute(E(h),h==="style"&&T(d)?H(d):String(d));return i&&(Array.isArray(i)||(i=[i]),i.forEach(h=>{if(typeof h=="string"){const d=u("div");d.innerHTML=h,n.append(...d.childNodes)}else n.append(h)})),n}function H(...t){const e=t.reduce((n,h)=>P(P({},n),_(h)),{}),i=[];for(const[n,h]of Object.entries(e))h===""||typeof h>"u"||h===null||i.push(`${n}:${h}`);return i.join(";")}function O(t){return new Promise((e,i)=>{const n=new FileReader;n.onload=h=>{var d;const a=(d=h.target)==null?void 0:d.result;a?e(a):i(new Error(`FileReader's result is null, ${h.target}`))},n.onerror=i,n.readAsDataURL(t)})}function g(t){return(window.URL||window.webkitURL).createObjectURL(t)}function y(t){const e=t.split(",");let i="";return/data:(\w+\/\w+);base64/.test(e[0])&&(i=RegExp.$1),{type:i,data:e[1]}}function m(t,e){const i=y(t),n=window.atob(i.data);e=e||i.type;const h=new Uint8Array(n.length);for(let d=0;d<n.length;d++)h[d]=n.charCodeAt(d);return new Blob([h],{type:e})}const F={enableDevicePixelRatio:!1,isForce:!1,mimeType:"image/jpeg",perResize:500,quality:.9,width:0,height:0,longEdge:0},W=/^data:(.+?);base64/,k=/^image\/.+/;function b(t,e){return new Promise((i,n)=>{var d;const h={...F,...e,longEdge:(d=e==null?void 0:e.longEdge)!=null?d:e==null?void 0:e.longestSide};typeof t=="string"&&W.test(t)?U(t,h,i,n):(t instanceof File||t instanceof Blob)&&k.test(t.type)?O(t).then(a=>{U(a,h,i,n)}).catch(n):n(new Error(`Invalid file, ${t}`))})}function U(t,e,i,n){const{type:h}=y(t),d=m(t,h),a=new Image;a.onload=()=>{const r={element:a,blob:d,data:t,url:g(d),width:a.naturalWidth||a.width,height:a.naturalHeight||a.height,type:h,size:f(d.size)};e.cropInfo&&e.cropInfo.sw&&e.cropInfo.sh?D(r,e,i,n,{...e.cropInfo,dx:0,dy:0,dw:e.cropInfo.sw,dh:e.cropInfo.sh}):e.width&&e.height?D(r,e,i,n,j(r,e)):e.width||e.height||e.longEdge?V(r,e,i,n):v({...r,raw:r},e,i)},a.onerror=n,a.src=t}function D(t,e,i,n,h){try{Object.prototype.hasOwnProperty.call(h,"enableDevicePixelRatio")||(h.enableDevicePixelRatio=e.enableDevicePixelRatio);const d=o(t.element,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:h.sx,sy:h.sy,sw:h.sw,sh:h.sh,dx:0,dy:0,dw:h.sw,dh:h.sh});!e.width&&!e.height?e.longEdge?h.sw>h.sh?(e.width=e.longEdge,e.height=h.sh*e.width/h.sw):(e.height=e.longEdge,e.width=h.sw*e.height/h.sh):(e.width=h.sw,e.height=h.sh):e.width?e.height=h.sh*e.width/h.sw:e.width=h.sw*e.height/h.sh,L(d,t,e,{...h,sx:0,sy:0,sw:d.width,sh:d.height},i)}catch(d){n(d)}}function V(t,e,i,n){try{e.longEdge&&!e.width&&!e.height&&(t.width>=t.height?e.width=e.longEdge:e.height=e.longEdge);const h={enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:t.width,sh:t.height,dx:0,dy:0,dw:e.width,dh:e.height};if(e.width){if(t.width<e.width&&!e.isForce){v({...t,raw:t},e,i);return}h.dh=t.height*e.width/t.width,e.height=h.dh}else{if(t.height<e.height&&!e.isForce){v({...t,raw:t},e,i);return}h.dw=t.width*e.height/t.height,e.width=h.dw}L(t.element,t,e,h,i)}catch(h){n(h)}}function v(t,e,i){t.type!==e.mimeType?(t.type=e.mimeType,S(t.element,t.raw,e,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:t.width,sh:t.height,dx:0,dy:0,dw:t.width,dh:t.height},i)):i(t)}function L(t,e,i,n,h){let d=e.width>e.height?e.width-n.dw:e.height-n.dh;if(d>i.perResize){const a=e.height/e.width;for(;d>i.perResize;)d-=i.perResize,n.sw=t.width,n.sh=t.height,n.dw=i.width+d,n.dh=n.dw*a,t=o(t,n)}n.sw=t.width,n.sh=t.height,n.dw=i.width,n.dh=i.height,S(t,e,i,n,h)}function S(t,e,i,n,h){const d=o(t,n),a=/^\w+\/\*$/.test(i.mimeType)||!i.mimeType?e.type:i.mimeType,r=d.toDataURL(a,i.quality),c=m(r,a);h({element:d,type:a,width:d.width,height:d.height,blob:c,data:r,url:g(c),size:f(c.size),raw:e})}function j(t,e){const{width:i,height:n}=t,{width:h,height:d}=e;let a;const r=n*h/d;if(i>r)a={sx:(i-r)/2,sy:0,sw:r,sh:n};else{const c=i*d/h;a={sx:0,sy:(n-c)/2,sw:i,sh:c}}return{...a,dx:0,dy:0,dw:h,dh:d}}function o(t,e){const i=e.enableDevicePixelRatio&&window.devicePixelRatio||1,n=u("canvas");n.width=e.dw*i,n.height=e.dh*i;const h=n.getContext("2d");return h.scale(i,i),h.drawImage(t,e.sx,e.sy,e.sw,e.sh,e.dx,e.dy,e.dw,e.dh),n}function A(t,e){return new Promise((i,n)=>{const h={...F,...e},d=g(t);let a=u("video",{src:d,autoplay:!0}),r=!1;a.onerror=n,a.oncanplay=()=>{if(r)return;r=!0;const c=a.duration,K=typeof h.currentTime>"u"?c*Math.random():B(h.currentTime),w={url:d,videoFile:t,videoWidth:a.videoWidth,videoHeight:a.videoHeight,duration:c,currentTime:Math.min(K,c)};Z(a,w).then(G=>{!h.width&&!h.height&&(h.width=w.videoWidth,h.height=w.videoHeight),b(G,e).then(Y=>{i({videoInfo:w,...Y}),a=null}).catch(n)}).catch(n)}})}function Z(t,{currentTime:e,videoWidth:i,videoHeight:n}){return new Promise(h=>{t.currentTime=e,t.pause();const d="image/jpeg",a=u("canvas"),r=a.getContext("2d");a.width=i,a.height=n,setTimeout(()=>{r.drawImage(t,0,0,a.width,a.height),h(a.toDataURL(d))},500)})}function q(t,e){return new Promise((i,n)=>{const h=t.type;/^(image|video)/.test(h)?RegExp.$1==="image"?b(t,e).then(i).catch(n):A(t,e).then(i).catch(n):n(new Error(`File type[${h}] not supported`))})}l.base64ToBlob=m,l.createBlobURL=g,l.createElement=u,l.fileToBase64=O,l.formatBytes=f,l.handleImageFile=b,l.handleMediaFile=q,l.handleVideoFile=A,l.splitBase64=y,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});