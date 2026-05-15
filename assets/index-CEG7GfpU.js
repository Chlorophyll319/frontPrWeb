import{s as M}from"./index-DhsRrvCL.js";import{M as K,N,a6 as D,o as t,c as d,K as u,a7 as R,W as F,f as X,P as L,G as f,w as b,a as i,O as S,v as $,Q as V,e as y,D as W,a8 as Q,l as G,j as U,t as j,b as _,F as P,r as C,s as H,y as z}from"./index-FUk7HDyd.js";import{p as J}from"./projects-DCrH5Bia.js";import{m as Y}from"./modules-BfefCy_0.js";import{b as Z}from"./blogs-DYJ3M-UE.js";import{f as ee}from"./faqs-DYnbyJEx.js";import{b as O}from"./route-block-B_A1xBdJ.js";var ne=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`,se={root:{position:"relative"}},oe={root:function(n){var s=n.props;return["p-skeleton p-component",{"p-skeleton-circle":s.shape==="circle","p-skeleton-animation-none":s.animation==="none"}]}},te=K.extend({name:"skeleton",style:ne,classes:oe,inlineStyles:se}),re={name:"BaseSkeleton",extends:N,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},style:te,provide:function(){return{$pcSkeleton:this,$parentInstance:this}}};function h(e){"@babel/helpers - typeof";return h=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},h(e)}function ae(e,n,s){return(n=ie(n))in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}function ie(e){var n=le(e,"string");return h(n)=="symbol"?n:n+""}function le(e,n){if(h(e)!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var o=s.call(e,n);if(h(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var T={name:"Skeleton",extends:re,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}},dataP:function(){return D(ae({},this.shape,this.shape))}}},ce=["data-p"];function de(e,n,s,o,m,a){return t(),d("div",u({class:e.cx("root"),style:[e.sx("root"),a.containerStyle],"aria-hidden":"true"},e.ptmi("root"),{"data-p":a.dataP}),null,16,ce)}T.render=de;var me=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`,ue={root:function(n){var s=n.props;return["p-message p-component p-message-"+s.severity,{"p-message-outlined":s.variant==="outlined","p-message-simple":s.variant==="simple","p-message-sm":s.size==="small","p-message-lg":s.size==="large"}]},contentWrapper:"p-message-content-wrapper",content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},pe=K.extend({name:"message",style:me,classes:ue}),ge={name:"BaseMessage",extends:N,props:{severity:{type:String,default:"info"},closable:{type:Boolean,default:!1},life:{type:Number,default:null},icon:{type:String,default:void 0},closeIcon:{type:String,default:void 0},closeButtonProps:{type:null,default:null},size:{type:String,default:null},variant:{type:String,default:null}},style:pe,provide:function(){return{$pcMessage:this,$parentInstance:this}}};function v(e){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},v(e)}function A(e,n,s){return(n=fe(n))in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}function fe(e){var n=be(e,"string");return v(n)=="symbol"?n:n+""}function be(e,n){if(v(e)!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var o=s.call(e,n);if(v(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var E={name:"Message",extends:ge,inheritAttrs:!1,emits:["close","life-end"],timeout:null,data:function(){return{visible:!0}},mounted:function(){var n=this;this.life&&setTimeout(function(){n.visible=!1,n.$emit("life-end")},this.life)},methods:{close:function(n){this.visible=!1,this.$emit("close",n)}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return D(A(A({outlined:this.variant==="outlined",simple:this.variant==="simple"},this.severity,this.severity),this.size,this.size))}},directives:{ripple:F},components:{TimesIcon:R}};function w(e){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},w(e)}function B(e,n){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(m){return Object.getOwnPropertyDescriptor(e,m).enumerable})),s.push.apply(s,o)}return s}function I(e){for(var n=1;n<arguments.length;n++){var s=arguments[n]!=null?arguments[n]:{};n%2?B(Object(s),!0).forEach(function(o){ye(e,o,s[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):B(Object(s)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(s,o))})}return e}function ye(e,n,s){return(n=he(n))in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}function he(e){var n=ve(e,"string");return w(n)=="symbol"?n:n+""}function ve(e,n){if(w(e)!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var o=s.call(e,n);if(w(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var we=["data-p"],ke=["data-p"],xe=["data-p"],Se=["aria-label","data-p"],Pe=["data-p"];function ze(e,n,s,o,m,a){var g=X("TimesIcon"),l=L("ripple");return t(),f(Q,u({name:"p-message",appear:""},e.ptmi("transition")),{default:b(function(){return[m.visible?(t(),d("div",u({key:0,class:e.cx("root"),role:"alert","aria-live":"assertive","aria-atomic":"true","data-p":a.dataP},e.ptm("root")),[i("div",u({class:e.cx("contentWrapper")},e.ptm("contentWrapper")),[e.$slots.container?S(e.$slots,"container",{key:0,closeCallback:a.close}):(t(),d("div",u({key:1,class:e.cx("content"),"data-p":a.dataP},e.ptm("content")),[S(e.$slots,"icon",{class:$(e.cx("icon"))},function(){return[(t(),f(V(e.icon?"span":null),u({class:[e.cx("icon"),e.icon],"data-p":a.dataP},e.ptm("icon")),null,16,["class","data-p"]))]}),e.$slots.default?(t(),d("div",u({key:0,class:e.cx("text"),"data-p":a.dataP},e.ptm("text")),[S(e.$slots,"default")],16,xe)):y("",!0),e.closable?W((t(),d("button",u({key:1,class:e.cx("closeButton"),"aria-label":a.closeAriaLabel,type:"button",onClick:n[0]||(n[0]=function(c){return a.close(c)}),"data-p":a.dataP},I(I({},e.closeButtonProps),e.ptm("closeButton"))),[S(e.$slots,"closeicon",{},function(){return[e.closeIcon?(t(),d("i",u({key:0,class:[e.cx("closeIcon"),e.closeIcon],"data-p":a.dataP},e.ptm("closeIcon")),null,16,Pe)):(t(),f(g,u({key:1,class:[e.cx("closeIcon"),e.closeIcon],"data-p":a.dataP},e.ptm("closeIcon")),null,16,["class","data-p"]))]})],16,Se)),[[l]]):y("",!0)],16,ke))],16)],16,we)):y("",!0)]}),_:3},16)}E.render=ze;const $e={class:"space-y-6"},je={class:"grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3"},Ce={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"},_e={class:"flex align-items-center justify-content-between"},Oe={class:"text-sm text-gray-600"},Ae={key:1,class:"text-center w-full"},Be={__name:"index",setup(e){const n=z([{label:"學員成果管理",icon:"pi-briefcase",class:"bg-green-600 hover:bg-green-900 border-green-950",to:"/admin/projects"},{label:"課程模組管理",icon:"pi-box",class:"bg-amber-600 hover:bg-amber-900 border-amber-950",to:"/admin/modules"},{label:"部落格文章管理",icon:"pi-file",class:"bg-green-600 hover:bg-green-900 border-green-950",to:"/admin/blog"},{label:"FAQ管理",icon:"pi-question-circle",class:"bg-purple-600 hover:bg-purple-900 border-purple-950",to:"/admin/faq"}]),s=z([{title:"學員成果總數",count:0,icon:"pi-briefcase",textColor:"text-green-600",iconColor:"text-green-200",to:"/admin/projects",error:!1,service:J.getAll,responseKey:"projects"},{title:"課程模組總數",count:0,icon:"pi-box",textColor:"text-amber-600",iconColor:"text-amber-200",to:"/admin/modules",error:!1,service:Y.getAll,responseKey:"modules"},{title:"部落格文章總數",count:0,icon:"pi-file",textColor:"text-green-600",iconColor:"text-green-200",to:"/admin/blog",error:!1,service:Z.getAll,responseKey:"blogs"},{title:"FAQ 項目總數",count:0,icon:"pi-question-circle",textColor:"text-purple-600",iconColor:"text-purple-200",to:"/admin/faq",error:!1,service:ee.getAll,responseKey:"faqs"}]),o=z(!0),m=z(null);return G(async()=>{o.value=!0,m.value=null;try{const g=s.value.map(c=>c.service()),l=await Promise.all(g);s.value.forEach((c,k)=>{const x=l[k],p=x.data;p&&typeof p.total=="number"?c.count=p.total:p&&Array.isArray(p[c.responseKey])?c.count=p[c.responseKey].length:(console.warn(`Unexpected response structure for ${c.title}`,x),c.error=!0)})}catch(g){console.error("Failed to fetch stats:",g),m.value="無法載入儀表板統計數據，請稍後再試。",s.value.forEach(l=>{l.error=!0})}finally{o.value=!1}}),(g,l)=>{const c=E,k=T,x=H,p=M;return t(),d("div",$e,[m.value?(t(),f(c,{key:0,severity:"error",closable:!1},{default:b(()=>[U(j(m.value),1)]),_:1})):y("",!0),o.value?(t(),f(k,{key:1,height:"10rem",class:"mb-4"})):y("",!0),_(p,{class:"shadow-sm"},{title:b(()=>[...l[0]||(l[0]=[i("div",{class:"flex align-items-center gap-3"},[i("i",{class:"pi pi-home text-2xl text-green-900"}),i("span",{class:"text-xl font-semibold"},"歡迎來到後台管理系統")],-1)])]),content:b(()=>[l[1]||(l[1]=i("p",{class:"text-gray-700 mb-4"}," 您可以從上方的導覽列開始，或點擊下方的快速按鈕來管理網站內容。 ",-1)),i("div",je,[(t(!0),d(P,null,C(n.value,r=>(t(),f(x,{key:r.label,label:r.label,icon:`pi ${r.icon}`,class:$([r.class,"text-sm"]),onClick:q=>g.$router.push(r.to)},null,8,["label","icon","class","onClick"]))),128))])]),_:1}),i("div",Ce,[o.value?(t(),d(P,{key:0},C(4,r=>_(k,{key:r,height:"6rem"})),64)):(t(!0),d(P,{key:1},C(s.value,(r,q)=>(t(),f(p,{key:r.title,class:"shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",onClick:Ie=>g.$router.push(r.to)},{content:b(()=>[i("div",_e,[m.value?(t(),d("div",Ae,[...l[2]||(l[2]=[i("i",{class:"pi pi-exclamation-triangle text-2xl text-orange-500"},null,-1),i("p",{class:"text-sm text-gray-600 mt-2"},"無法載入",-1)])])):(t(),d(P,{key:0},[i("div",null,[i("div",{class:$(["text-2xl font-bold",r.textColor])},j(r.count),3),i("div",Oe,j(r.title),1)]),i("i",{class:$(["pi",r.icon,"text-3xl",r.iconColor])},null,2)],64))])]),_:2},1032,["onClick"]))),128))])])}}};typeof O=="function"&&O(Be);export{Be as default};
