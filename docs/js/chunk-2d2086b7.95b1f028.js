(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=Object(o["h"])("h1",{class:"text-h4"},"Авторизация",-1);function u(e,t,n,u,c,a){var i=Object(o["z"])("q-btn"),s=Object(o["z"])("q-input"),f=Object(o["z"])("q-form"),l=Object(o["z"])("q-page");return Object(o["u"])(),Object(o["e"])(l,{class:"q-px-md"},{default:Object(o["F"])((function(){return[r,Object(o["h"])(f,{onSubmit:e.submit},{default:Object(o["F"])((function(){return[Object(o["h"])(s,{modelValue:e.username,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.username=t}),onKeyup:Object(o["H"])(e.submit,["enter"]),placeholder:"Как вас зовут?",autofocus:"",outlined:"",counter:"",maxlength:e.maxLength},{after:Object(o["F"])((function(){return[Object(o["h"])(i,{round:"",dense:"",flat:"",icon:"fas fa-check",onClick:e.submit},null,8,["onClick"])]})),_:1},8,["modelValue","onKeyup","maxlength"])]})),_:1},8,["onSubmit"])]})),_:1})}var c=n("1da1"),a=(n("96cf"),n("498a"),n("afbc")),i=n("0613"),s=Object(o["i"])({name:"Room",setup:function(){var e=Object(o["x"])(""),t=Object(o["c"])((function(){var e;return null===(e=i["c"].getters.settings)||void 0===e?void 0:e.maxUsernameLength}));function n(){return r.apply(this,arguments)}function r(){return r=Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.value.trim(),!n){t.next=7;break}return t.next=4,i["c"].dispatch(i["a"].ChangeUsername,n);case 4:a["a"].push("/"),t.next=8;break;case 7:alert("Нужен хотя бы один символ!");case 8:case"end":return t.stop()}}),t)}))),r.apply(this,arguments)}return{username:e,maxLength:t,submit:n}}}),f=n("9989"),l=n("53ca"),b=(n("d3b7"),n("3ca3"),n("ddb0"),n("4de4"),n("7db0"),n("a434"),n("d882")),d=n("cdf5"),m=n("e22d"),p=Object(o["i"])({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validation-success","validation-error"],setup:function(e,t){var n=t.slots,r=t.emit,u=Object(o["j"])(),c=Object(o["x"])(null),a=0,i=[];function s(t){var n=[],o="boolean"===typeof t?t:!0!==e.noErrorFocus;a++;for(var u=function(e,t){r("validation-"+(!0===e?"success":"error"),t)},c=function(t){var r=i[t],c=r.validate();if("function"===typeof c.then)n.push(c.then((function(e){return{valid:e,comp:r}}),(function(e){return{valid:!1,comp:r,error:e}})));else if(!0!==c){if(!1===e.greedy)return u(!1,r),!0===o&&"function"===typeof r.focus&&r.focus(),{v:Promise.resolve(!1)};n.push({valid:!1,comp:r})}},s=0;s<i.length;s++){var f=c(s);if("object"===Object(l["a"])(f))return f.v}if(0===n.length)return u(!0),Promise.resolve(!0);var b=a;return Promise.all(n).then((function(e){if(b===a){var t=e.filter((function(e){return!0!==e.valid}));if(0===t.length)return u(!0),!0;var n=t[0],r=n.valid,c=n.comp;return u(!1,c),!0===o&&!0!==r&&"function"===typeof c.focus&&c.focus(),!1}}))}function f(){a++,i.forEach((function(e){"function"===typeof e.resetValidation&&e.resetValidation()}))}function p(t){void 0!==t&&Object(b["k"])(t),s().then((function(n){!0===n&&(void 0!==e.onSubmit?r("submit",t):void 0!==t&&void 0!==t.target&&"function"===typeof t.target.submit&&t.target.submit())}))}function v(t){void 0!==t&&Object(b["k"])(t),r("reset"),Object(o["n"])((function(){f(),!0===e.autofocus&&!0!==e.noResetFocus&&h()}))}function h(){var e=c.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(c.value.querySelectorAll("[tabindex]"),(function(e){return e.tabIndex>-1}));null!==e&&void 0!==e&&e.focus()}return Object(o["v"])(m["a"],{bindComponent:function(e){i.push(e)},unbindComponent:function(e){var t=i.indexOf(e);t>-1&&i.splice(t,1)}}),Object(o["s"])((function(){!0===e.autofocus&&h()})),Object.assign(u.proxy,{validate:s,resetValidation:f,submit:p,reset:v,focus:h,getValidationComponents:function(){return i}}),function(){return Object(o["k"])("form",{class:"q-form",ref:c,onSubmit:p,onReset:v},Object(d["c"])(n.default))}}}),v=n("27f9"),h=n("9c40"),j=n("93dc"),O=n.n(j);s.render=u;t["default"]=s;O()(s,"components",{QPage:f["a"],QForm:p,QInput:v["a"],QBtn:h["a"]})}}]);
//# sourceMappingURL=chunk-2d2086b7.95b1f028.js.map