(this["webpackJsonpultimate-tic-tac-toe"]=this["webpackJsonpultimate-tic-tac-toe"]||[]).push([[0],{21:function(e,t,r){},32:function(e,t,r){"use strict";r.r(t);var n=r(0),c=r.n(n),a=r(7),l=r.n(a),i=(r(21),r(2)),s=(r(22),r(16)),o=r(3),u=r(8),d=r(4);function f(e){return j(Array(9).fill().map((function(t,r){return b(e,r)})))}function b(e,t){return j(function(e,t){return Array(9).fill().map((function(r,n){var c=O(t,n),a=e.indexOf(c);return-1===a?null:a%2===0?"X":"O"}))}(e,t))}function j(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<t.length;r++){var n=Object(i.a)(t[r],3),c=n[0],a=n[1],l=n[2];if(e[c]&&e[c]===e[a]&&e[c]===e[l])return e[c]}return null}function O(e,t){return"".concat(e,",").concat(t)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function h(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var v=n.createElement("path",{d:"M 2,2 l 20,20 M 22,2 l -20,20",stroke:"currentcolor",strokeWidth:4,strokeLinecap:"round"});function g(e,t){var r=e.title,c=e.titleId,a=h(e,["title","titleId"]);return n.createElement("svg",m({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",ref:t,"aria-labelledby":c},a),r?n.createElement("title",{id:c},r):null,v)}var p=n.forwardRef(g);r.p;function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function x(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var y=n.createElement("circle",{cx:12,cy:12,r:10,stroke:"currentcolor",strokeWidth:4,fill:"none"});function k(e,t){var r=e.title,c=e.titleId,a=x(e,["title","titleId"]);return n.createElement("svg",w({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",ref:t,"aria-labelledby":c},a),r?n.createElement("title",{id:c},r):null,y)}var N=n.forwardRef(k),E=(r.p,r(1));function S(e){var t=e.type,r=e.className,n=Object(u.a)(e,["type","className"]);switch(t){case"X":return Object(E.jsx)(p,Object(o.a)({className:Object(d.a)("text-red-500",r)},n));case"O":return Object(E.jsx)(N,Object(o.a)({className:Object(d.a)("text-blue-500",r)},n));default:return Object(E.jsx)("div",Object(o.a)({},n))}}function I(e){var t=e.turns,r=e.cellClick,n=e.allowedBoard;return Object(E.jsx)("div",{style:{gap:"4%"},className:"h-full relative grid grid-cols-3 rounded",children:Array(9).fill().map((function(e,c){return Object(E.jsx)(B,{turns:t,cellClick:r,allowedBoard:n,boardIndex:c},c)}))})}function B(e){var t=e.turns,r=e.cellClick,n=e.allowedBoard,c=e.boardIndex,a=b(t,c),l=!a&&[!0,c].includes(n);return Object(E.jsx)("div",{style:{gap:"4%",filter:!l&&"blur(1px) sepia(10%) grayscale(30%)"},className:"grid grid-cols-3 rounded",children:Array(9).fill().map((function(e,n){var i=O(c,n),s=function(e,t){var r=e.indexOf(t);return-1===r?null:r%2===0?"X":"O"}(t,i);return Object(E.jsx)(C,{onClick:function(){return r(i)},isValid:l,className:Object(d.a)("X"===a&&"bg-red-300","O"===a&&"bg-blue-300"),children:Object(E.jsx)(S,{type:s,className:"absolute w-1/2 h-1/2 text-gray-900"})},n)}))})}function C(e){var t=e.isValid,r=e.className,n=e.children,c=Object(u.a)(e,["isValid","className","children"]);return Object(E.jsx)("div",Object(o.a)(Object(o.a)({className:Object(d.a)("relative flex items-center justify-center rounded w-full h-full bg-gray-200 m-px",t&&"cursor-pointer",r)},c),{},{children:n}))}function A(){var e=function(e,t){var r=Object(n.useState)((function(){var r=window.localStorage.getItem(e);return r?JSON.parse(r):t})),c=Object(i.a)(r,2),a=c[0],l=c[1];return[a,function(t){var r=t instanceof Function?t(a):t;l(r),window.localStorage.setItem(e,JSON.stringify(r))}]}("dark-mode"),t=Object(i.a)(e,2),r=t[0],c=t[1],a=function(){var e=Object(n.useState)(window.matchMedia("(prefers-color-scheme: dark)").matches),t=Object(i.a)(e,2),r=t[0],c=t[1];return Object(n.useEffect)((function(){var e=function(e){var t=e.matches;return c(t)};return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e),window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",e)}),[]),r}(),l=void 0===r?a:r;return Object(n.useEffect)((function(){var e="dark",t=window.document.body;l?t.classList.add(e):t.classList.remove(e)}),[l]),[l,c]}function R(e){var t=e.dark,r=e.setDark;return Object(E.jsx)("div",{children:Object(E.jsx)("button",{onClick:function(){return r(!t)},children:t?"\u2600\ufe0f":"\ud83c\udf19"})})}function L(e){var t=e.gameRef,r=e.turnsSlice,n=e.cellClick,c=e.allowedBoard;return Object(E.jsx)(s.ResizableBox,{height:300,width:300,minConstraints:[200,200],lockAspectRatio:!0,draggableOpts:{nodeRef:t},className:"p-2",children:Object(E.jsx)("div",{ref:t,className:"w-full h-full",children:Object(E.jsx)(I,{turns:r,cellClick:n,allowedBoard:c})})})}function M(e){var t=e.p1Turn;return Object(E.jsxs)("div",{className:"flex flex-col items-center space-y-1",children:[Object(E.jsx)("span",{className:"text-sm font-bold tracking-wider text-gray-700 dark:text-gray-100 uppercase",children:"Current turn"}),Object(E.jsx)("div",{className:"flex items-center justify-center rounded w-8 h-8 bg-gray-300",children:Object(E.jsx)(S,{className:"w-1/2 h-1/2 text-gray-900",type:t?"X":"O"})})]})}var P=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),r=t[0],c=t[1],a=Object(n.useState)(0),l=Object(i.a)(a,2),s=l[0],o=l[1],u=r.slice(0,s),d=r.length%2===0,j=function(e){if(!e.length)return!0;var t=e[e.length-1],r=Number(t[2]);return!!b(e,r)||r}(u),O=f(u);!function(e,t){Object(n.useEffect)((function(){function r(r){switch(r.key){case"ArrowLeft":return t((function(e){return Math.max(e-1,0)}));case"ArrowRight":return t((function(t){return Math.min(t+1,e.length)}));case"ArrowUp":return t(0);case"ArrowDown":return t(e.length);default:return}}return window.addEventListener("keydown",r),function(){return window.removeEventListener("keydown",r)}}),[t,e.length])}(r,o);var m=A(),h=Object(i.a)(m,2),v=h[0],g=h[1],p=Object(n.useRef)(null);return Object(E.jsxs)("div",{className:"min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center space-y-2",children:[Object(E.jsx)("h1",{className:"text-xl font-medium mt-4 text-gray-900 dark:text-white",children:"Ultimate Tic-Tac-Toe"}),Object(E.jsx)("div",{className:"absolute top-2 right-4",children:Object(E.jsx)(R,{dark:v,setDark:g})}),Object(E.jsx)(L,{gameRef:p,turnsSlice:u,cellClick:function(e){if(function(e,t,r,n){if(e!==t.length)return!1;if(t.includes(r))return!1;var c=Number(r[0]);return!![!0,c].includes(n)&&!b(t,c)&&!f(t)}(s,r,e,j)){var t=r.concat(e);c(t),o(t.length)}},allowedBoard:j}),Object(E.jsx)(M,{winner:O,p1Turn:d})]})};l.a.render(Object(E.jsx)(c.a.StrictMode,{children:Object(E.jsx)(P,{})}),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.80a4238f.chunk.js.map