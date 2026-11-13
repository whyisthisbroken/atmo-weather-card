/* Atmo Weather Card 2026.11.6
 * MIT License, https://github.com/whyisthisbroken/atmo-weather-card
 * Copyright (c) 2026 shpongledsummer
 * Copyright (c) 2026 whyisthisbroken
 */
var ne=globalThis,le=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),De=new WeakMap,K=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(le&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=De.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&De.set(t,e))}return e}toString(){return this.cssText}},Be=c=>new K(typeof c=="string"?c:c+"",void 0,_e),me=(c,...e)=>{let t=c.length===1?c[0]:e.reduce((a,r,i)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+c[i+1],c[0]);return new K(t,c,_e)},Re=(c,e)=>{if(le)c.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),r=ne.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=t.cssText,c.appendChild(a)}},fe=le?c=>c:c=>c instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return Be(t)})(c):c;var{is:Ot,defineProperty:Mt,getOwnPropertyDescriptor:It,getOwnPropertyNames:Nt,getOwnPropertySymbols:Dt,getPrototypeOf:Bt}=Object,ce=globalThis,He=ce.trustedTypes,Rt=He?He.emptyScript:"",Ht=ce.reactiveElementPolyfillSupport,Y=(c,e)=>c,be={toAttribute(c,e){switch(e){case Boolean:c=c?Rt:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,e){let t=c;switch(e){case Boolean:t=c!==null;break;case Number:t=c===null?null:Number(c);break;case Object:case Array:try{t=JSON.parse(c)}catch{t=null}}return t}},Ue=(c,e)=>!Ot(c,e),We={attribute:!0,type:String,converter:be,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??=Symbol("metadata"),ce.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=We){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),r=this.getPropertyDescriptor(e,a,t);r!==void 0&&Mt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,a){let{get:r,set:i}=It(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let p=r?.call(this);i?.call(this,n),this.requestUpdate(e,p,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??We}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let e=Bt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let t=this.properties,a=[...Nt(t),...Dt(t)];for(let r of a)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,r]of t)this.elementProperties.set(a,r)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let r=this._$Eu(t,a);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let r of a)t.unshift(fe(r))}else e!==void 0&&t.push(fe(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,a);if(r!==void 0&&a.reflect===!0){let i=(a.converter?.toAttribute!==void 0?a.converter:be).toAttribute(t,a.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let a=this.constructor,r=a._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let i=a.getPropertyOptions(r),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:be;this._$Em=r;let p=n.fromAttribute(t,i.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(e,t,a,r=!1,i){if(e!==void 0){let n=this.constructor;if(r===!1&&(i=this[e]),a??=n.getPropertyOptions(e),!((a.hasChanged??Ue)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:r,wrapped:i},n){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[r,i]of a){let{wrapped:n}=i,p=this[r];n!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,i,p)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[Y("elementProperties")]=new Map,I[Y("finalized")]=new Map,Ht?.({ReactiveElement:I}),(ce.reactiveElementVersions??=[]).push("2.1.2");var Se=globalThis,Ge=c=>c,de=Se.trustedTypes,Ve=de?de.createPolicy("lit-html",{createHTML:c=>c}):void 0,Qe="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Xe="?"+N,Wt=`<${Xe}>`,W=document,Q=()=>W.createComment(""),X=c=>c===null||typeof c!="object"&&typeof c!="function",Ce=Array.isArray,Ut=c=>Ce(c)||typeof c?.[Symbol.iterator]=="function",ve=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,qe=/>/g,R=RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ke=/'/g,Ye=/"/g,Je=/^(?:script|style|textarea|title)$/i,Ee=c=>(e,...t)=>({_$litType$:c,strings:e,values:t}),s=Ee(1),te=Ee(2),da=Ee(3),U=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Ze=new WeakMap,H=W.createTreeWalker(W,129);function et(c,e){if(!Ce(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ve!==void 0?Ve.createHTML(e):e}var Gt=(c,e)=>{let t=c.length-1,a=[],r,i=e===2?"<svg>":e===3?"<math>":"",n=Z;for(let p=0;p<t;p++){let d=c[p],_,g,m=-1,f=0;for(;f<d.length&&(n.lastIndex=f,g=n.exec(d),g!==null);)f=n.lastIndex,n===Z?g[1]==="!--"?n=je:g[1]!==void 0?n=qe:g[2]!==void 0?(Je.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=R):g[3]!==void 0&&(n=R):n===R?g[0]===">"?(n=r??Z,m=-1):g[1]===void 0?m=-2:(m=n.lastIndex-g[2].length,_=g[1],n=g[3]===void 0?R:g[3]==='"'?Ye:Ke):n===Ye||n===Ke?n=R:n===je||n===qe?n=Z:(n=R,r=void 0);let $=n===R&&c[p+1].startsWith("/>")?" ":"";i+=n===Z?d+Wt:m>=0?(a.push(_),d.slice(0,m)+Qe+d.slice(m)+N+$):d+N+(m===-2?p:$)}return[et(c,i+(c[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},J=class c{constructor({strings:e,_$litType$:t},a){let r;this.parts=[];let i=0,n=0,p=e.length-1,d=this.parts,[_,g]=Gt(e,t);if(this.el=c.createElement(_,a),H.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=H.nextNode())!==null&&d.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(let m of r.getAttributeNames())if(m.endsWith(Qe)){let f=g[n++],$=r.getAttribute(m).split(N),C=/([.?@])?(.*)/.exec(f);d.push({type:1,index:i,name:C[2],strings:$,ctor:C[1]==="."?we:C[1]==="?"?$e:C[1]==="@"?xe:j}),r.removeAttribute(m)}else m.startsWith(N)&&(d.push({type:6,index:i}),r.removeAttribute(m));if(Je.test(r.tagName)){let m=r.textContent.split(N),f=m.length-1;if(f>0){r.textContent=de?de.emptyScript:"";for(let $=0;$<f;$++)r.append(m[$],Q()),H.nextNode(),d.push({type:2,index:++i});r.append(m[f],Q())}}}else if(r.nodeType===8)if(r.data===Xe)d.push({type:2,index:i});else{let m=-1;for(;(m=r.data.indexOf(N,m+1))!==-1;)d.push({type:7,index:i}),m+=N.length-1}i++}}static createElement(e,t){let a=W.createElement("template");return a.innerHTML=e,a}};function V(c,e,t=c,a){if(e===U)return e;let r=a!==void 0?t._$Co?.[a]:t._$Cl,i=X(e)?void 0:e._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(c),r._$AT(c,t,a)),a!==void 0?(t._$Co??=[])[a]=r:t._$Cl=r),r!==void 0&&(e=V(c,r._$AS(c,e.values),r,a)),e}var ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,r=(e?.creationScope??W).importNode(t,!0);H.currentNode=r;let i=H.nextNode(),n=0,p=0,d=a[0];for(;d!==void 0;){if(n===d.index){let _;d.type===2?_=new ee(i,i.nextSibling,this,e):d.type===1?_=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(_=new ke(i,this,e)),this._$AV.push(_),d=a[++p]}n!==d?.index&&(i=H.nextNode(),n++)}return H.currentNode=W,r}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},ee=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,r){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),X(e)?e===z||e==null||e===""?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ut(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,r=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=J.createElement(et(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(t);else{let i=new ye(r,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new J(e)),t}k(e){Ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,r=0;for(let i of e)r===t.length?t.push(a=new c(this.O(Q()),this.O(Q()),this,this.options)):a=t[r],a._$AI(i),r++;r<t.length&&(this._$AR(a&&a._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Ge(e).nextSibling;Ge(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,r,i){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=z}_$AI(e,t=this,a,r){let i=this.strings,n=!1;if(i===void 0)e=V(this,e,t,0),n=!X(e)||e!==this._$AH&&e!==U,n&&(this._$AH=e);else{let p=e,d,_;for(e=i[0],d=0;d<i.length-1;d++)_=V(this,p[a+d],t,d),_===U&&(_=this._$AH[d]),n||=!X(_)||_!==this._$AH[d],_===z?e=z:e!==z&&(e+=(_??"")+i[d+1]),this._$AH[d]=_}n&&!r&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},we=class extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}},$e=class extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}},xe=class extends j{constructor(e,t,a,r,i){super(e,t,a,r,i),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??z)===U)return;let a=this._$AH,r=e===z&&a!==z||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==z&&(a===z||r);r&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}};var Vt=Se.litHtmlPolyfillSupport;Vt?.(J,ee),(Se.litHtmlVersions??=[]).push("3.3.3");var tt=(c,e,t)=>{let a=t?.renderBefore??e,r=a._$litPart$;if(r===void 0){let i=t?.renderBefore??null;a._$litPart$=r=new ee(e.insertBefore(Q(),i),i,void 0,t??{})}return r._$AI(c),r};var Ae=globalThis,D=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};D._$litElement$=!0,D.finalized=!0,Ae.litElementHydrateSupport?.({LitElement:D});var jt=Ae.litElementPolyfillSupport;jt?.({LitElement:D});(Ae.litElementVersions??=[]).push("4.2.2");var ze=Object.freeze({card_style:"standalone",card_color_mode:"auto",card_filter_clouds:"none",card_filter_sun:"none",image_alignment:"top-right",card_background_style:"frosted",chip_area_layout:"wrap",chip_style:"inline",chip_area_align:"start",perf_mode:"default",fauna_birds_at_night:!0,fauna_birds:!0,fauna_planes:!0,fauna_plane_speed:1,wind_style:"lines",wind_compass:"off",wind_compass_position:"auto",wind_compass_cardinal:!0,wind_compass_degrees:!1,wind_compass_speed:!1,wind_compass_background:!1,effect_blue_hour:!0,effect_golden_hour:!0,effect_sun_rays:!0,effect_haze:!0,effect_ground_mist:!0,effect_cloud_coverage:!0,effect_shooting_stars:!0,effect_comets:!0,shooting_star_rate:1,comet_rate:1}),he=Object.freeze({low:Object.freeze({perf_fps:24,perf_cloud_quality:.5,perf_effects:0,perf_fauna:0,perf_dpr:1,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:.5,fauna_plane_density:.5,fauna_bird_flock_size:4,fauna_birds_at_night:!0}),default:Object.freeze({perf_fps:30,perf_cloud_quality:1.5,perf_effects:1,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1,fauna_plane_density:1,fauna_bird_flock_size:8,fauna_birds_at_night:!0}),ultra:Object.freeze({perf_fps:60,perf_cloud_quality:2,perf_effects:2,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1.5,fauna_plane_density:1.5,fauna_bird_flock_size:12,fauna_birds_at_night:!0})});function Te(c){let e=c&&c.perf_mode;return typeof e=="string"&&he[e]||he.default}var qt=Object.freeze(["card_color_mode","card_background_style","image_alignment","chip_area_position","chip_style","custom_cards_position","custom_cards_css_class","wind_style","wind_compass","wind_compass_position"]);function Kt(c,e,t){c[e]!==void 0&&c[t]===void 0&&(c[t]=c[e]),delete c[e]}function at(c){let e={...c},t=String(e.card_color_mode??"").trim().toLowerCase();t==="force_dark"?e.card_color_mode="dark":t==="force_light"?e.card_color_mode="light":t==="entity"&&delete e.card_color_mode,e.card_filter!==void 0&&(e.card_filter_clouds===void 0&&(e.card_filter_clouds=e.card_filter),e.card_filter_sun===void 0&&(e.card_filter_sun=e.card_filter),delete e.card_filter),delete e.celestial_moon_style,e.chip_area_layout==="scroll"&&(e.chip_area_layout="horizontal-scroll"),Array.isArray(e.chips)&&(e.chips=e.chips.map(a=>{if(!a||typeof a!="object")return a;let r={...a};return r.overflow==="marquee"&&r.label_overflow===void 0&&(r.label_overflow="marquee"),Kt(r,"card_tap_action","tap_action"),r.forecast_show_min&&r.forecast&&r.attribute==="temperature"&&(r.sub_value_attribute||(r.sub_value_attribute="templow"),r.forecast_low_position!=="below"&&(r.sub_value_position="beside")),delete r.forecast_show_min,delete r.forecast_low_position,r}));for(let a of qt)a in e&&typeof e[a]!="string"&&delete e[a];return e}var Yt=[["(choose an entity)","(Entit\xE4t w\xE4hlen)"],["(no entity)","(keine Entit\xE4t)"],["+{n} days","+{n} Tage"],["0 = today/now, 1 = tomorrow/next hour, etc.","0 = heute/jetzt, 1 = morgen/n\xE4chste Stunde usw."],["1\xD7 is about one shooting star every 12 s and a comet about once a minute (Ultra, clear night).","1\xD7 hei\xDFt etwa eine Sternschnuppe alle 12 s und ein Komet etwa pro Minute (Ultra, klare Nacht)."],["A chip shows one value, for example the temperature, the wind or tomorrow's forecast. All chips share one area whose position and layout you set below. Single chips can be placed freely.","Ein Chip zeigt einen Wert, zum Beispiel die Temperatur, den Wind oder die Vorhersage f\xFCr morgen. Alle Chips liegen in einem gemeinsamen Bereich, dessen Position und Anordnung du unten festlegst. Einzelne Chips lassen sich frei platzieren."],["A color filter applied to clouds.","Ein Farbfilter f\xFCr die Wolken."],["A color filter applied to the sun.","Ein Farbfilter f\xFCr die Sonne."],["A veil with poor visibility or high humidity.","Ein Schleier bei schlechter Sicht oder hoher Luftfeuchte."],["Add any Home Assistant card, for example an entities or history card. The cards are shown on top of the sky. Grids and stacks work too.","F\xFCge beliebige Home-Assistant-Karten ein, zum Beispiel eine Entit\xE4ten- oder Verlaufskarte. Die Karten liegen \xFCber dem Himmel. Raster und Stapel funktionieren auch."],["Add card","Karte hinzuf\xFCgen"],["Add chip","Chip hinzuf\xFCgen"],["Add threshold","Schwelle hinzuf\xFCgen"],["Adds a CSS class to the embedded cards container (useful with card_mod).","F\xFCgt dem Bereich der eingebetteten Karten eine CSS-Klasse hinzu (n\xFCtzlich mit card_mod)."],["Adds a soft fade to the left and right edges.","Blendet den linken und rechten Rand weich aus."],["Adds a soft fade to the top and bottom edges.","Blendet den oberen und unteren Rand weich aus."],["Advanced options","Erweiterte Optionen"],["Align content","Inhalt ausrichten"],["Alignment","Ausrichtung"],["An entity whose state switches between light and dark mode.","Eine Entit\xE4t, deren Zustand zwischen hellem und dunklem Modus wechselt."],["Animation","Animation"],["Animation Speed","Animationstempo"],["Appearance","Aussehen"],["Arrangement","Anordnung"],["Attribute","Attribut"],["Auto","Auto"],["Auto (Home Assistant)","Automatisch (Home Assistant)"],["Background","Hintergrund"],["Background Style","Hintergrundstil"],["Background color","Hintergrundfarbe"],["Background color (all chips)","Hintergrundfarbe (alle Chips)"],["Background color based on the weather.","Hintergrundfarbe passend zum Wetter."],["Balanced","Ausgewogen"],["Bar","Balken"],["Bar color","Balkenfarbe"],["Bar entity","Balken-Entit\xE4t"],["Battery saver","Akku schonen"],["Beams of light through broken clouds.","Lichtstrahlen durch aufgelockerte Wolken."],["Behind animations","Hinter den Animationen"],["Below","Darunter"],["Beside value","Neben dem Wert"],["Bird Animation Speed","Vogeltempo"],["Bird-only speed multiplier applied on top of animation speed.","Tempo nur f\xFCr V\xF6gel, zus\xE4tzlich zum Animationstempo."],["Birds","V\xF6gel"],["Birds & planes","V\xF6gel & Flugzeuge"],["Birds at night","V\xF6gel auch nachts"],["Birds per flock","V\xF6gel pro Schwarm"],["Blue hour","Blaue Stunde"],["Golden hour","Goldene Stunde"],["Bold","Fett"],["Bottom","Unten"],["Cancel","Abbrechen"],["Card Height","Kartenh\xF6he"],["Card Offset","Kartenversatz"],["Card Padding","Innenabstand"],["Card Style","Kartenstil"],["Card style","Kartenstil"],["Center","Mitte"],["Chip Layout","Chip-Aufbau"],["Chip area","Chip-Bereich"],["Chip background","Chip-Hintergrund"],["Chip layout","Chip-Aufbau"],["Chip padding","Chip-Innenabstand"],["Chip style","Chip-Stil"],["Chip type","Chip-Art"],["Chips","Chips"],["Chips are hidden by Hide all text in Appearance. Your settings are kept.","Chips sind durch \u201EAlle Texte ausblenden\u201C unter Aussehen versteckt. Deine Einstellungen bleiben erhalten."],["Chips gap","Abstand zwischen Chips"],["Choose a preset or fine-tune each setting below.","W\xE4hle eine Voreinstellung oder passe jeden Wert darunter an."],["Clear","Leeren"],["Clear color","Farbe entfernen"],["Clip","Abschneiden"],["Cloud Detail","Wolken-Detail"],["Cloud Filter","Wolken-Filter"],["Cloud amount from data","Wolkenmenge aus Messwert"],["Cloud coverage","Bew\xF6lkung"],["Color Mode","Farbmodus"],["Color filters","Farbfilter"],["Color mode","Farbmodus"],["Color mode, card style, edges and filters","Farbmodus, Kartenstil, R\xE4nder und Filter"],["Color thresholds","Farbschwellen"],["Colors","Farben"],["Columns","Spalten"],["Comets","Kometen"],["Condition","Wetterlage"],["Container Background Color","Hintergrundfarbe des Bereichs"],["Container background color","Hintergrundfarbe des Bereichs"],["Container padding","Innenabstand des Bereichs"],["Content alignment","Ausrichtung des Inhalts"],["Contrast","Kontrast"],["Custom unit","Eigene Einheit"],["Custom: you changed values of the preset.","Eigene: Du hast Werte der Voreinstellung ge\xE4ndert."],["Daily","T\xE4glich"],["Dark","Dunkel"],["Darken","Dunkler"],["Data","Daten"],["Day Image URL","Bild-URL Tag"],["Day and night, moon phase, position and size","Tag und Nacht, Mondphase, Position und Gr\xF6\xDFe"],["Day image shown while the status entity is active.","Tagbild, solange die Status-Entit\xE4t aktiv ist."],["Days ahead","Tage voraus"],["Decimal places","Nachkommastellen"],["Deep blue sky after sunset and before sunrise.","Tiefblauer Himmel nach Sonnenuntergang und vor Sonnenaufgang."],["Warm light on the sky and clouds when the sun is low, orange to violet at sunset.","Warmes Licht auf Himmel und Wolken bei tiefer Sonne, orange bis violett zum Sonnenuntergang."],["Default","Standard"],["Delete","L\xF6schen"],["Detailed clouds","Detaillierte Wolken"],["Disable Chips","Chips ausschalten"],["Divider between chips","Trennlinie zwischen Chips"],["Duplicate","Duplizieren"],["Effect Quality","Effekt-Qualit\xE4t"],["Effect Quality is Off, so there are no shooting stars or comets.","Die Effekt-Qualit\xE4t steht auf Aus, deshalb gibt es keine Sternschnuppen und Kometen."],["Effect Quality is Off, so these effects are not drawn.","Die Effekt-Qualit\xE4t steht auf Aus, deshalb werden diese Effekte nicht gezeichnet."],["Effect Quality is Off: sun rays, haze and ground mist are not drawn. Blue hour, golden hour and cloud amount still work.","Die Effekt-Qualit\xE4t steht auf Aus: Sonnenstrahlen, Dunst und Bodennebel werden nicht gezeichnet. Blaue Stunde, goldene Stunde und Wolkenmenge wirken weiter."],["Ellipsis (\u2026)","Auslassung (\u2026)"],["Embedded Cards CSS Class","CSS-Klasse der eingebetteten Karten"],["Embedded Cards Position","Position der eingebetteten Karten"],["Embedded cards","Eingebettete Karten"],["Entity","Entit\xE4t"],["Entity not found","Entit\xE4t nicht gefunden"],["Extra shooting stars and comets","Mehr Sternschnuppen und Kometen"],["Fade Left & Right Edges","Links & rechts ausblenden"],["Fade Top & Bottom Edges","Oben & unten ausblenden"],["Fancy unit","Sch\xF6ne Einheit"],["Fauna","Tiere"],["Fine tuning (gaps, sizes, colors)","Feineinstellungen (Abst\xE4nde, Gr\xF6\xDFen, Farben)"],["Fine-tune horizontal position. Pixels or CSS, e.g. -20 or 10%.","Feinjustierung waagerecht. Pixel oder CSS, z. B. -20 oder 10%."],["Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.","Feinjustierung des Bildes. Pixel oder CSS-Werte, z. B. -20 oder 10%."],["Fine-tune vertical position. Pixels or CSS, e.g. 10 or -5%.","Feinjustierung senkrecht. Pixel oder CSS, z. B. 10 oder -5%."],["Fixed","Fest"],["Flow field","Str\xF6mung"],["Follow another entity (e.g. the sun)","Einer anderen Entit\xE4t folgen (z. B. der Sonne)"],["Follow my Home Assistant theme","Meinem Home-Assistant-Theme folgen"],["Following Home Assistant display precision","Folgt der Anzeigegenauigkeit von Home Assistant"],["For example a picture with the garage door open while the door is open.","Zum Beispiel ein Bild mit offenem Garagentor, solange das Tor offen ist."],["Force dark mode","Immer dunkel"],["Force light mode","Immer hell"],["Forecast","Vorhersage"],["Forecast attribute","Vorhersage-Attribut"],["Forecast requires a weather entity.","Die Vorhersage braucht eine Wetter-Entit\xE4t."],["Forecast type","Vorhersageart"],["Frame & layers","Rahmen & Ebenen"],["Frame Rate","Bildrate"],["Free positioning","Frei platzieren"],["Frequency","H\xE4ufigkeit"],["Frosted","Milchglas"],["Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.","Milchglas: durchscheinender Glaseffekt. Kontrast: deckend und gut lesbar. Theme: folgt den Farben deines HA-Themes."],["Full","Voll"],["Full Width","Volle Breite"],["Full width chips","Chips in voller Breite"],["Gap","Abstand"],["Gaps","Abst\xE4nde"],["Global animation speed multiplier for all motion.","Gesamttempo f\xFCr jede Bewegung auf der Karte."],["Gradient","Verlauf"],["Graphics","Grafik"],["Grid","Raster"],["Ground mist","Bodennebel"],["HA theme","HA-Theme"],["Haze","Dunst"],["Height","H\xF6he"],["Help","Hilfe"],["Hide","Ausblenden"],["Hide All Text","Alle Texte ausblenden"],["Hide icon","Symbol ausblenden"],["Hides all text overlays in one toggle.","Blendet alle Texte und Einblendungen auf einmal aus."],["High","Hoch"],["Higher values sit in front of other cards.","H\xF6here Werte liegen vor anderen Karten."],["Horizontal Offset","Versatz waagerecht"],["Horizontal alignment of chips within the container.","Waagerechte Ausrichtung der Chips im Bereich."],["Horizontal offset from the alignment edge, in pixels.","Waagerechter Abstand vom Ausrichtungsrand, in Pixeln."],["Hourly","St\xFCndlich"],["Hours ahead","Stunden voraus"],["How label text behaves when it is too long.","Was passiert, wenn die Beschriftung zu lang ist."],["How to add them","So f\xFCgst du sie hinzu"],["Humidity","Luftfeuchte"],["Icon","Symbol"],["Icon background","Symbol-Hintergrund"],["Icon background color","Hintergrundfarbe des Symbols"],["Icon background color (all chips)","Hintergrundfarbe der Symbole (alle Chips)"],["Icon folder","Symbol-Ordner"],["Icon size","Symbolgr\xF6\xDFe"],["Icon/text gap","Abstand Symbol/Text"],["Image","Bild"],["Image Offset","Bildversatz"],["Image Position","Bildposition"],["Image Scale (%)","Bildgr\xF6\xDFe (%)"],["Image height as a percentage of the card height.","Bildh\xF6he in Prozent der Kartenh\xF6he."],["Immersive","Immersive"],["In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.","In Pixeln, z. B. 220. \u201Eauto\u201C f\xFCr Raster-Layouts im Dashboard."],["In the \u201CImmersive\u201D style the card has no sky or background of its own and works as a dashboard header. Full width and edge fades are only available there.","Im Stil \u201EImmersive\u201C hat die Karte keinen eigenen Himmel und keinen Hintergrund und eignet sich als Kopfbereich eines Dashboards. Volle Breite und weiche R\xE4nder gibt es nur dort."],["Inline","Nebeneinander"],["Inner padding, e.g. 16px or 12px 20px.","Innenabstand, z. B. 16px oder 12px 20px."],["Invalid height. Use auto, 160, 160px, 40vh, or 80%.","Ung\xFCltige H\xF6he. Erlaubt sind auto, 160, 160px, 40vh oder 80%."],["Label","Beschriftung"],["Label Attribute","Attribut der Beschriftung"],["Label Entity","Entit\xE4t der Beschriftung"],["Label overflow","\xDCberlauf der Beschriftung"],["Label text size","Schriftgr\xF6\xDFe Beschriftung"],["Label/value gap","Abstand Beschriftung/Wert"],["Layer Order","Ebenen-Reihenfolge"],["Layout","Anordnung"],["Left","Links"],["Light","Hell"],["Live entity value","Aktueller Entit\xE4tswert"],["Look","Darstellung"],["Low","Niedrig"],["Low resolution","Niedrige Aufl\xF6sung"],["MDI icon, or type 'weather' for a dynamic icon.","MDI-Symbol oder \u201Eweather\u201C f\xFCr ein Wettersymbol."],["Manual override","Manuell festgelegt"],["Matches forecast","Passt zur Vorhersage"],["Matches weather","Passt zum Wetter"],["Max","Max"],["Maximum detail","H\xF6chstes Detail"],["Maximum smoothness","Maximal fl\xFCssig"],["Medium","Mittel"],["Min","Min"],["Mist near the dew point, at night and in the morning.","Bodennebel nahe dem Taupunkt, nachts und morgens."],["Moderate detail","Mittleres Detail"],["Moon Phase Entity","Mondphasen-Entit\xE4t"],["More in the docs","Mehr in der Doku"],["Move down","Nach unten"],["Move up","Nach oben"],["Moving sun","Sonne wandert"],["Moving sun & moon","Sonne & Mond wandern"],["Muted","Ged\xE4mpft"],["Native resolution","Volle Aufl\xF6sung"],["Near planes fly faster than distant ones; the slider scales all of them.","Nahe Flugzeuge fliegen schneller als ferne; der Regler \xE4ndert alle gleich."],["Night Image URL","Bild-URL Nacht"],["Night image shown while the status entity is active.","Nachtbild, solange die Status-Entit\xE4t aktiv ist."],["Night sky","Nachthimmel"],["No cards yet.","Noch keine Karten."],["No image","Kein Bild"],["No weather effects","Keine Wettereffekte"],["None","Keiner"],["Normal","Normal"],["Now","Jetzt"],["Number of equal-width columns in grid layout.","Anzahl gleich breiter Spalten im Raster."],["Off","Aus"],["Offset","Versatz"],["Offset from edge","Abstand vom Rand"],["On","An"],["One shared background","Ein gemeinsamer Hintergrund"],["Opacity","Deckkraft"],["Optional. Current rain intensity in mm/h or in/h, so rain and snow follow the measured amount. Only sensors with these units are listed.","Optional. Aktuelle Regenst\xE4rke in mm/h oder in/h, damit Regen und Schnee der gemessenen Menge folgen. Es erscheinen nur Sensoren mit diesen Einheiten."],["Other Home Assistant cards inside this card","Andere Home-Assistant-Karten in dieser Karte"],["Padding","Innenabstand"],["Padding around icon","Abstand um das Symbol"],["Performance & effects","Leistung & Effekte"],["Performance Preset","Voreinstellung"],["Pick an entity for this chip.","W\xE4hle eine Entit\xE4t f\xFCr diesen Chip."],["Placement","Platzierung"],["Plane speed","Flugzeugtempo"],["Planes","Flugzeuge"],["Position","Position"],["Position & size","Position & Gr\xF6\xDFe"],["Position Mode","Positionsmodus"],["Precipitation","Niederschlag"],["Precipitation Sensor","Niederschlagssensor"],["Preset, frame rate, effects, birds and planes","Voreinstellung, Bildrate, Effekte, V\xF6gel und Flugzeuge"],["Pressure","Luftdruck"],["Put your images in /config/www/ and enter them as /local/house-day.png. Transparent PNGs look best. Without a night image the day image is used.","Lege deine Bilder unter /config/www/ ab und trage sie als /local/haus-tag.png ein. Transparente PNGs sehen am besten aus. Ohne Nachtbild wird das Tagbild verwendet."],["Quick add:","Schnell hinzuf\xFCgen:"],["Rain chance","Regenwahrscheinlichkeit"],["Rain probability","Regenwahrscheinlichkeit"],["Rain, snow, lightning, stars","Regen, Schnee, Blitze, Sterne"],["Remove","Entfernen"],["Removes side margins so the card fills edge to edge.","Entfernt die seitlichen Abst\xE4nde, damit die Karte von Rand zu Rand reicht."],["Reset all styles","Alle Stile zur\xFCcksetzen"],["Right","Rechts"],["Right-to-left","Von rechts nach links"],["Ring","Ring"],["Ring color","Ringfarbe"],["Ring entity","Ring-Entit\xE4t"],["Round shape","Runde Form"],["SVG icons:","SVG-Symbole:"],["Scroll X","Scrollen \u2190\u2192"],["Scroll Y","Scrollen \u2191\u2193"],["Scroll speed","Lauftempo"],["Scrolling","Lauftext"],["Scrolling text","Lauftext"],["Segments","Abschnitte"],["Sensor","Sensor"],["Sharp rendering","Scharfe Darstellung"],["Sharpness","Sch\xE4rfe"],["Shooting stars","Sternschnuppen"],["Show","Anzeigen"],["Show again","Wieder anzeigen"],["Show at once","Gleichzeitig sichtbar"],["Shown at night. Falls back to the day image if left empty.","Wird nachts gezeigt. Leer lassen, um das Tagbild zu nutzen."],["Shows a different image when this entity is active, open, or home.","Zeigt ein anderes Bild, wenn diese Entit\xE4t aktiv, offen oder zuhause ist."],["Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h.","Zeigt Windrichtung und -st\xE4rke bei windigem Wetter und bei Regen, Hagel oder Schnee ab 40 km/h."],["Simple clouds","Einfache Wolken"],["Size","Gr\xF6\xDFe"],["Size (px)","Gr\xF6\xDFe (px)"],["Sizes","Gr\xF6\xDFen"],["Sky & light","Himmel & Licht"],["Small info tiles with sensor values or the forecast","Kleine Info-Felder mit Sensorwerten oder der Vorhersage"],["Smoother","Fl\xFCssiger"],["Solid","Einfarbig"],["Speed","Geschwindigkeit"],["Spread","Verteilt"],["Square Mode","Quadratisch"],["Stacked","Gestapelt"],["Standalone","Standalone"],["Standard resolution","Normale Aufl\xF6sung"],["Star Twinkle Speed","Funkeltempo der Sterne"],["Status Entity","Status-Entit\xE4t"],["Status Image (Day)","Statusbild (Tag)"],["Status Image (Night)","Statusbild (Nacht)"],["Sub Value Attribute","Attribut des Zusatzwerts"],["Sub Value Entity","Entit\xE4t des Zusatzwerts"],["Sub value","Zusatzwert"],["Sub value overflow","\xDCberlauf des Zusatzwerts"],["Sun & Moon","Sonne & Mond"],["Sun Entity","Sonnen-Entit\xE4t"],["Sun Filter","Sonnen-Filter"],["Sun rays","Sonnenstrahlen"],["Switch image by state","Bild je nach Zustand wechseln"],["Tap","Tippen"],["Tap Action","Tippen-Aktion"],["Tap action","Tippen-Aktion"],["Temperature","Temperatur"],["Temperature (high)","Temperatur (H\xF6chstwert)"],["Temperature (low)","Temperatur (Tiefstwert)"],["Text","Text"],["The card uses no background at all.","Die Karte hat keinen eigenen Hintergrund."],["The cloud cover of the weather entity sets the amount of clouds. Off: a fixed amount per weather state.","Der Bedeckungsgrad der Wetter-Entit\xE4t bestimmt die Wolkenmenge. Aus: feste Menge je Wetterlage."],["The sun entity (sun.sun) decides between day and night and provides the elevation for twilight, blue hour and sun rays. With \u201CFixed\u201D the sun or moon stays where you put it.","Die Sonnen-Entit\xE4t (sun.sun) entscheidet \xFCber Tag und Nacht und liefert den Sonnenstand f\xFCr D\xE4mmerung, Blaue Stunde und Sonnenstrahlen. Bei \u201EFest\u201C bleiben Sonne und Mond dort, wo du sie platzierst."],["Theme","Theme"],["Theme Entity","Theme-Entit\xE4t"],["Thickness","St\xE4rke"],["Threshold mode","Schwellenmodus"],["Today","Heute"],["Tomorrow","Morgen"],["Top","Oben"],["Turn off to let birds fly only during the day.","Ausschalten, damit V\xF6gel nur tags\xFCber fliegen."],["Twinkle speed multiplier for night stars.","Funkeltempo der Sterne in der Nacht."],["Type","Art"],["UV index","UV-Index"],["Ultra","Ultra"],["Unit","Einheit"],["Use a different entity for the bar value instead of the chip's main entity.","Eine andere Entit\xE4t f\xFCr den Balkenwert statt der Haupt-Entit\xE4t des Chips."],["Use a different entity for the ring value instead of the chip's main entity.","Eine andere Entit\xE4t f\xFCr den Ringwert statt der Haupt-Entit\xE4t des Chips."],["Use a sensor value as the label instead.","Stattdessen einen Sensorwert als Beschriftung verwenden."],["Use dynamic weather icon","Dynamisches Wettersymbol verwenden"],["Used for the day/night cycle.","F\xFCr den Wechsel von Tag und Nacht."],["Value","Wert"],["Value Attribute","Attribut des Werts"],["Value Entity","Entit\xE4t des Werts"],["Value overflow","\xDCberlauf des Werts"],["Value text size","Schriftgr\xF6\xDFe Wert"],["Vertical","Senkrecht"],["Vertical Offset","Versatz senkrecht"],["Vertical offset from the alignment edge, in pixels.","Senkrechter Abstand vom Ausrichtungsrand, in Pixeln."],["Vivid","Kr\xE4ftig"],["Warm","Warm"],["Weather Entity","Wetter-Entit\xE4t"],["Weather forecast","Wettervorhersage"],["Weather icon","Wettersymbol"],["Weight","Schriftst\xE4rke"],["What happens when the card is tapped","Was beim Tippen auf die Karte passiert"],["What happens when the card is tapped.","Was beim Tippen auf die Karte passiert."],["When this entity is on, open or home, the card shows other images:","Wenn diese Entit\xE4t an, offen oder zuhause ist, zeigt die Karte andere Bilder:"],["Width","Breite"],["Wind","Wind"],["Wind Display","Wind-Anzeige"],["Wind bearing","Windrichtung"],["Wind direction as","Windrichtung als"],["Wind direction icon","Symbol der Windrichtung"],["Chip icon","Chip-Symbol"],["Arrow, where the wind blows","Pfeil, wohin der Wind weht"],["Filled arrow, where the wind blows","Gef\xFCllter Pfeil, wohin der Wind weht"],["Compass needle, where the wind comes from","Kompassnadel, woher der Wind kommt"],["Wind direction chips can show the compass point too: open the chip under Chips, then Text \u25B8 Value \u25B8 Wind direction as.","Windrichtungs-Chips k\xF6nnen auch die Himmelsrichtung zeigen: den Chip unter Chips \xF6ffnen, dann Text \u25B8 Wert \u25B8 Windrichtung als."],["Degrees (250)","Grad (250)"],["Compass point (WSW)","Himmelsrichtung (WSW)"],["Compass point and degrees (WSW 250\xB0)","Himmelsrichtung und Grad (WSW 250\xB0)"],["Wind lines","Windlinien"],["Wind speed","Windgeschwindigkeit"],["Wrap","Umbrechen"],["X Offset","Versatz X"],["Y Offset","Versatz Y"],["Your moon phase sensor.","Dein Mondphasen-Sensor."],["Your own picture for day and night, e.g. your house","Eigenes Bild f\xFCr Tag und Nacht, z. B. dein Haus"],["e.g. /local/weather-icons/","z. B. /local/weather-icons/"],["e.g. 110px","z. B. 110px"],["e.g. 140px or 60%","z. B. 140px oder 60%"],["e.g. 16px","z. B. 16px"],["e.g. 200px","z. B. 200px"],["e.g. 200px or 60%. Constrains the chip width.","z. B. 200px oder 60%. Begrenzt die Breite des Chips."],["e.g. 220 or auto","z. B. 220 oder auto"],["e.g. 40px","z. B. 40px"],["now","jetzt"],["today","heute"],["tomorrow","morgen"],["value","Wert"],["{value} (not supported here)","{value} (hier nicht m\xF6glich)"],["\u201CLow\u201D saves battery and helps older tablets, \u201CUltra\u201D shows everything at full quality. Every effect can be switched off on its own; anything that is off costs nothing.","\u201ENiedrig\u201C schont den Akku und hilft \xE4lteren Tablets, \u201EUltra\u201C zeigt alles in voller Qualit\xE4t. Jeder Effekt l\xE4sst sich einzeln abschalten; was aus ist, kostet keine Leistung."],["\u201CMoving\u201D follows the real position of the sun throughout the day.","\u201EWandern\u201C folgt dem echten Sonnenstand im Laufe des Tages."],["Wind compass","Windkompass"],["Compass position","Position des Kompasses"],["Show compass point","Himmelsrichtung anzeigen"],["Show degrees","Grad anzeigen"],["Show wind speed","Windgeschwindigkeit anzeigen"],["Frosted background","Milchglas-Hintergrund"],["A frosted box behind the compass, readable on any sky.","Ein Milchglas-Feld hinter dem Kompass, auf jedem Himmel lesbar."],["Shows where the wind comes from, read from wind_bearing of the weather entity. The arrow points where it blows to.","Zeigt, woher der Wind kommt, gelesen aus wind_bearing der Wetter-Entit\xE4t. Der Pfeil zeigt, wohin er weht."],["Automatic puts each style in its usual corner and moves it away from chips.","Automatisch setzt jeden Stil in seine \xFCbliche Ecke und weicht Chips aus."],["Wind arrow","Windpfeil"],["Compass rose","Kompassrose"],["Compass chip","Kompass-Chip"],["Compass band","Kompassband"],["Wind vane","Windfahne"],["Automatic","Automatisch"],["Top left","Oben links"],["Top center","Oben Mitte"],["Top right","Oben rechts"],["Bottom left","Unten links"],["Bottom center","Unten Mitte"],["Bottom right","Unten rechts"]],rt=Object.freeze({de:Object.freeze(Object.fromEntries(Yt.map(([c,e])=>[c,e])))});var Zt=Object.freeze(["en","de"]);function ot(c){let e=c&&(c.locale&&c.locale.language||c.language)||"en",t=String(e).toLowerCase().split(/[-_]/)[0];return Zt.includes(t)?t:"en"}var it={texts:null};function Fe(c){let e=rt[c]||null;return(t,a)=>{it.texts&&t&&it.texts.add(t);let r=e&&e[t]||t;if(a)for(let[i,n]of Object.entries(a))r=r.split(`{${i}}`).join(String(n));return r}}var Ea=Object.freeze(["off","arrow","rose","pill","band","vane"]),Aa=Object.freeze(["auto","top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"]),za=Object.freeze({arrow:1}),Ta=Object.freeze({arrow:"bottom-left",rose:"bottom-right",pill:"top-right",band:"bottom-center",vane:"bottom-right"}),Fa=Object.freeze({en:["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],de:["N","NNO","NO","ONO","O","OSO","SO","SSO","S","SSW","SW","WSW","W","WNW","NW","NNW"]});var Pa=Object.freeze(["degrees","cardinal","both"]);function pe(c,e){if(!c||!c.entity)return!1;if(c.attribute)return c.attribute==="wind_bearing";if(c.forecast)return!1;let t=e&&e.states&&e.states[c.entity];return!!(t&&t.attributes&&t.attributes.device_class==="wind_direction")}var La=Object.freeze(["arrow","filled","needle"]);var o=Fe("en"),st="en";function Qt(c){let e=ot(c);e!==st&&(st=e,o=Fe(e))}var O=c=>c.map(e=>({...e,label:o(e.label)})),nt="https://whyisthisbroken.github.io/atmo-weather-card/";function Xt(c){let e=String(c||"").replace(/\s+/g,"").toLowerCase();return e==="mm/h"||e==="in/h"}function lt(c){return String(c||"").replace(/["\\\n\r]/g,"")}var v=Object.freeze({weather_entity:"Weather Entity",sun_entity:"Sun Entity",moon_phase_entity:"Moon Phase Entity",precipitation_entity:"Precipitation Sensor",theme_entity:"Theme Entity",_color_mode:"Color Mode",card_style:"Card Style",card_square:"Square Mode",card_height:"Card Height",card_padding:"Card Padding",card_offset:"Card Offset",card_stack_order:"Layer Order",card_tap_action:"Tap Action",card_filter_clouds:"Cloud Filter",card_filter_sun:"Sun Filter",card_full_width:"Full Width",card_mask_vertical:"Fade Top & Bottom Edges",card_mask_horizontal:"Fade Left & Right Edges",card_hide_text:"Hide All Text",card_background_style:"Background Style",celestial_size:"Size (px)",celestial_position:"Position Mode",celestial_alignment:"Alignment",celestial_x:"X Offset",celestial_y:"Y Offset",image_day:"Day Image URL",image_night:"Night Image URL",image_scale:"Image Scale (%)",image_alignment:"Image Position",image_x:"Horizontal Offset",image_y:"Vertical Offset",status_entity:"Status Entity",status_day:"Status Image (Day)",status_night:"Status Image (Night)",chip_area_hide:"Disable Chips",chip_area_position:"Position",chip_text_size:"Value text size",chip_label_size:"Label text size",chip_area_layout:"Layout",chip_style:"Chip style",chip_area_columns:"Columns",chip_area_scroll_count:"Show at once",chip_area_align:"Align content",chip_area_width:"Width",chip_area_height:"Height",chip_area_full_width:"Full width chips",chip_padding:"Chip padding",chip_area_padding:"Container padding",chip_area_gap:"Chips gap",chip_gap:"Icon/text gap",chip_text_gap:"Label/value gap",chip_icon_size:"Icon size",chip_area_background:"Background",chip_area_grouped:"One shared background",chip_area_separator:"Divider between chips",chip_icon_background:"Icon background",chip_icon_padding:"Padding around icon",custom_cards_position:"Embedded Cards Position",custom_cards_css_class:"Embedded Cards CSS Class",chip_area_background_color:"Container Background Color",perf_mode:"Performance Preset",perf_fps:"Frame Rate",perf_cloud_quality:"Cloud Detail",perf_effects:"Effect Quality",perf_fauna:"Fauna",perf_dpr:"Sharpness",animation_speed:"Animation Speed",bird_animation_speed:"Bird Animation Speed",star_animation_speed:"Star Twinkle Speed",fauna_birds_at_night:"Birds at night",fauna_plane_speed:"Plane speed",effect_blue_hour:"Blue hour",effect_golden_hour:"Golden hour",effect_sun_rays:"Sun rays",effect_haze:"Haze",effect_ground_mist:"Ground mist",effect_cloud_coverage:"Cloud amount from data",effect_shooting_stars:"Shooting stars",effect_comets:"Comets",shooting_star_rate:"Frequency",comet_rate:"Frequency",wind_style:"Wind Display",wind_compass:"Wind compass",wind_compass_position:"Compass position",wind_compass_cardinal:"Show compass point",wind_compass_degrees:"Show degrees",wind_compass_speed:"Show wind speed",wind_compass_background:"Frosted background"}),F=Object.freeze({weather_entity:"",sun_entity:"Used for the day/night cycle.",moon_phase_entity:"Your moon phase sensor.",precipitation_entity:"Optional. Current rain intensity in mm/h or in/h, so rain and snow follow the measured amount. Only sensors with these units are listed.",theme_entity:"An entity whose state switches between light and dark mode.",card_height:"In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.",card_padding:"Inner padding, e.g. 16px or 12px 20px.",card_offset:"",card_tap_action:"What happens when the card is tapped.",card_full_width:"Removes side margins so the card fills edge to edge.",card_mask_vertical:"Adds a soft fade to the top and bottom edges.",card_mask_horizontal:"Adds a soft fade to the left and right edges.",card_hide_text:"Hides all text overlays in one toggle.",card_filter_clouds:"A color filter applied to clouds.",card_filter_sun:"A color filter applied to the sun.",celestial_x:"Horizontal offset from the alignment edge, in pixels.",celestial_y:"Vertical offset from the alignment edge, in pixels.",celestial_position:"",image_night:"Shown at night. Falls back to the day image if left empty.",image_scale:"Image height as a percentage of the card height.",image_alignment:"",image_x:"Fine-tune horizontal position. Pixels or CSS, e.g. -20 or 10%.",image_y:"Fine-tune vertical position. Pixels or CSS, e.g. 10 or -5%.",status_entity:"Shows a different image when this entity is active, open, or home.",status_day:"Day image shown while the status entity is active.",status_night:"Night image shown while the status entity is active.",chip_area_columns:"Number of equal-width columns in grid layout.",chip_area_align:"Horizontal alignment of chips within the container.",card_background_style:"Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.",custom_cards_css_class:"Adds a CSS class to the embedded cards container (useful with card_mod).",perf_mode:"Choose a preset or fine-tune each setting below.",animation_speed:"Global animation speed multiplier for all motion.",bird_animation_speed:"Bird-only speed multiplier applied on top of animation speed.",star_animation_speed:"Twinkle speed multiplier for night stars.",fauna_birds_at_night:"Turn off to let birds fly only during the day.",fauna_plane_speed:"Near planes fly faster than distant ones; the slider scales all of them.",effect_blue_hour:"Deep blue sky after sunset and before sunrise.",effect_golden_hour:"Warm light on the sky and clouds when the sun is low, orange to violet at sunset.",effect_sun_rays:"Beams of light through broken clouds.",effect_haze:"A veil with poor visibility or high humidity.",effect_ground_mist:"Mist near the dew point, at night and in the morning.",effect_cloud_coverage:"The cloud cover of the weather entity sets the amount of clouds. Off: a fixed amount per weather state.",comet_rate:"1\xD7 is about one shooting star every 12 s and a comet about once a minute (Ultra, clear night).",card_stack_order:"Higher values sit in front of other cards.",wind_style:"Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h.",wind_compass:"Shows where the wind comes from, read from wind_bearing of the weather entity. The arrow points where it blows to.",wind_compass_position:"Automatic puts each style in its usual corner and moves it away from chips.",wind_compass_background:"A frosted box behind the compass, readable on any sky."}),ht=Object.freeze({entity:"Entity",attribute:"Attribute",name:"Label",name_sensor:"Label Entity",name_attribute:"Label Attribute",sub_value_entity:"Sub Value Entity",sub_value_attribute:"Sub Value Attribute",gauge_entity:"Value Entity",gauge_attribute:"Value Attribute",width:"Width",overflow:"Value overflow",label_overflow:"Label overflow",sub_value_overflow:"Sub value overflow",marquee_speed:"Scroll speed",marquee_rtl:"Right-to-left",icon:"Icon",icon_path:"Icon folder",tap_action:"Tap Action",unit_format:"Custom unit",bearing_format:"Wind direction as",bearing_icon:"Wind direction icon",text_size:"Value text size",label_size:"Label text size",inner_gap:"Icon/text gap",text_gap:"Label/value gap",padding:"Chip padding"}),Pe=Object.freeze({name_sensor:"Use a sensor value as the label instead.",width:"e.g. 200px or 60%. Constrains the chip width.",label_overflow:"How label text behaves when it is too long.",icon:"MDI icon, or type 'weather' for a dynamic icon.",icon_path:"e.g. /local/weather-icons/",forecast_offset:"0 = today/now, 1 = tomorrow/next hour, etc."}),Jt=Object.freeze(["type","name","entity","weather_entity","precipitation_entity","sun_entity","moon_phase_entity","color_mode","card_color_mode","theme_entity","card_style","card_height","card_padding","card_square","celestial_size","celestial_position","celestial_alignment","celestial_x","celestial_y","image_day","image_night","image_scale","image_alignment","status_entity","status_day","status_night","chip_area_position","card_hide_text","chip_area_hide","chip_text_size","chip_label_size","chip_area_layout","chip_area_columns","chip_area_scroll_count","chip_area_align","chip_area_width","chip_area_height","chip_area_full_width","chip_padding","chip_area_padding","chip_area_gap","chip_gap","chip_text_gap","chip_icon_size","chip_style","chip_area_background","chip_area_grouped","chip_area_separator","chip_background_color","chip_icon_background_color","chip_area_background_color","card_background_style","card_tap_action","hold_action","double_tap_action","card_offset","card_full_width","card_mask_vertical","card_mask_horizontal","card_stack_order","card_filter_clouds","card_filter_sun","chip_icon_background","custom_cards_position","custom_cards_css_class","perf_mode","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night","fauna_birds","fauna_planes","fauna_plane_speed","wind_style","wind_compass","wind_compass_position","wind_compass_cardinal","wind_compass_degrees","wind_compass_speed","wind_compass_background","effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_cloud_coverage","effect_shooting_stars","shooting_star_rate","effect_comets","comet_rate","chips","custom_cards"]),ct=Object.freeze(["style","align","background","icon_background","background_color","icon_background_color","padding","text_size","label_size","inner_gap","text_gap","icon_size","icon_padding","width","height","value_weight","label_weight","chip_round","sub_value_size","sub_value_weight"]),ea=Object.freeze(["card_stack_order","celestial_size","celestial_x","celestial_y","image_scale","chip_area_columns","chip_area_scroll_count","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_plane_speed","shooting_star_rate","comet_rate"]),ta=Object.freeze(["card_square","card_hide_text","chip_area_hide","chip_area_full_width","chip_area_background","chip_area_grouped","chip_area_separator","card_full_width","card_mask_vertical","card_mask_horizontal","chip_icon_background","fauna_birds_at_night","fauna_birds","fauna_planes","effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_cloud_coverage","effect_shooting_stars","effect_comets"]),aa=Object.freeze(["forecast_offset","forecast_precision","value_precision","marquee_speed","ring_min","ring_max","ring_width","ring_gap","bar_min","bar_max","bar_height","bar_gap"]),ra=Object.freeze(["hide_icon","hide_label","hide_value","hide_sub_value","marquee_rtl","background","icon_background","fancy_unit","chip_round","behind_effects","bearing_speed"]),ia=Object.freeze(["width","height"]),P=Object.freeze({color_mode:[{value:"ha_theme",short:"HA theme",label:"Follow my Home Assistant theme"},{value:"entity",short:"Entity",label:"Follow another entity (e.g. the sun)"},{value:"force_light",short:"Light",label:"Force light mode"},{value:"force_dark",short:"Dark",label:"Force dark mode"}],wind_compass:[{value:"off",label:"Off"},{value:"arrow",label:"Wind arrow"},{value:"rose",label:"Compass rose"},{value:"pill",label:"Compass chip"},{value:"band",label:"Compass band"},{value:"vane",label:"Wind vane"}],wind_compass_position:[{value:"auto",label:"Automatic"},{value:"top-left",label:"Top left"},{value:"top-center",label:"Top center"},{value:"top-right",label:"Top right"},{value:"bottom-left",label:"Bottom left"},{value:"bottom-center",label:"Bottom center"},{value:"bottom-right",label:"Bottom right"}],card_filter_clouds:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],card_filter_sun:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],bearing_format:[{value:"degrees",label:"Degrees (250)"},{value:"cardinal",label:"Compass point (WSW)"},{value:"both",label:"Compass point and degrees (WSW 250\xB0)"}],bearing_icon:[{value:"icon",label:"Chip icon"},{value:"arrow",label:"Arrow, where the wind blows"},{value:"filled",label:"Filled arrow, where the wind blows"},{value:"needle",label:"Compass needle, where the wind comes from"}],chip_overflow:[{value:"ellipsis",label:"Ellipsis (\u2026)"},{value:"marquee",label:"Scrolling text"},{value:"clip",label:"Clip"},{value:"wrap",label:"Wrap"}],chip_area_layout:[{value:"wrap",label:"Wrap"},{value:"grid",label:"Grid"},{value:"horizontal-scroll",label:"Scroll X"},{value:"vertical-scroll",label:"Scroll Y"}],chip_area_align:[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}]}),ae=Object.freeze([{value:"condition",label:"Condition"},{value:"temperature",label:"Temperature (high)"},{value:"templow",label:"Temperature (low)"},{value:"precipitation_probability",label:"Rain probability"},{value:"precipitation",label:"Precipitation"},{value:"humidity",label:"Humidity"},{value:"wind_speed",label:"Wind speed"},{value:"wind_bearing",label:"Wind bearing"},{value:"pressure",label:"Pressure"},{value:"cloud_coverage",label:"Cloud coverage"},{value:"uv_index",label:"UV index"}]),re=Object.freeze({image_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},custom_cards_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},celestial_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]},chip_area_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]}}),oa=Object.freeze(Object.fromEntries(Object.entries(re).map(([c,e])=>{let t=e.valueMap||{},a=Object.fromEntries(Object.entries(t).map(([r,i])=>[i,r]));return[c,Object.freeze({...e,valueMap:t,reverseMap:a,cellsFlat:e.cells.flat(),disabledSet:new Set(e.disabled||[])})]}))),dt=Object.freeze({image_scale:100,card_stack_order:1,celestial_size:62}),L=Object.freeze({TRUE_DELETE:"true-delete",FALSE_DELETE:"false-delete",TRUE_FALSE_IF_DEFINED:"true-false-if-defined"}),M=Object.freeze({SET_OR_DELETE_EMPTY:"set-or-delete-empty",TOGGLE_DELETE_IF_SAME:"toggle-delete-if-same",BESIDE_OR_DELETE:"beside-or-delete",SOLID_OR_DELETE:"solid-or-delete"}),Le=class extends D{static get properties(){return{_config:{type:Object,state:!0},_colorModeState:{type:String,state:!0},_expandedCard:{type:Number,state:!0},_expandedChip:{type:Number,state:!0},_openPanel:{type:String,state:!0},_cardHeightError:{type:String,state:!0}}}set hass(e){let t=this._hass;this._hass=e,!t&&e?this.requestUpdate():t&&e&&(this._hassThrottle||(this._hassThrottle=!0,this._hassThrottleTimer=setTimeout(()=>{this._hassThrottle=!1,this._hassThrottleTimer=null,this.requestUpdate()},2e3)))}get hass(){return this._hass}disconnectedCallback(){super.disconnectedCallback(),this._hassThrottleTimer&&(clearTimeout(this._hassThrottleTimer),this._hassThrottleTimer=null)}static get styles(){return me`
      :host {
        --awc-e-s1: 4px;
        --awc-e-s2: 8px;
        --awc-e-s3: 12px;
        --awc-e-s4: 16px;
        --awc-e-r-box: 10px;
        --awc-e-r-ctrl: 8px;
        --awc-e-r-inline: 6px;
        --awc-e-f-meta: 12px;
        --awc-e-f-label: 13px;
        --awc-e-f-body: 14px;
        --awc-e-f-header: 15px;
        --awc-e-t: 150ms ease;
        --awc-e-field-fill: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        display: block;
      }
      /* ── Spacing ── */
      ha-form {
        display: block;
      }
      ha-expansion-panel {
        display: block;
        margin-top: var(--awc-e-s3);
        --ha-card-border-radius: var(--awc-e-r-box);
        & ha-form {
          margin-top: var(--awc-e-s2);
        }
      }
      ha-form + ha-form {
        margin-top: var(--awc-e-s1);
      }
      .chip-accordion-body > * + *,
      .settings-group > * + *,
      .disclosure-body > * + * {
        margin-top: var(--awc-e-s2);
      }
      .chip-accordion-body > :first-child,
      .settings-group > :first-child,
      .disclosure-body > :first-child {
        margin-top: 0;
      }
      .settings-group > .settings-group-label + *,
      .settings-group > .section-title + * {
        margin-top: 0;
      }
      /* ── Panel headers ── */
      .panel-header {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        font-size: var(--awc-e-f-header);
        font-weight: 500;
        color: var(--primary-text-color);
        & ha-icon {
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
        }
      }
      /* ── Shared backgrounds ── */
      .info,
      .cards-empty,
      .card-row,
      details.disclosure {
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-box);
      }
      details.disclosure details.disclosure,
      details.disclosure .card-row {
        background:
          linear-gradient(
            color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent),
            color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent)
          ),
          var(--secondary-background-color);
      }
      .composite,
      .grid-picker {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
      }
      .composite:last-child,
      .grid-picker:last-child,
      .section-box:last-child {
        margin-bottom: 0;
      }
      .disclosure-body > :last-child {
        margin-bottom: 0;
      }
      /* ── Info blocks ── */
      .info {
        padding: var(--awc-e-s3) var(--awc-e-s4);
        margin: 0 0 var(--awc-e-s3) 0;
        font-size: var(--awc-e-f-label);
        line-height: 1.5;
        color: var(--secondary-text-color);
        & b {
          color: var(--primary-text-color);
          font-weight: 500;
        }
        & code {
          background: var(--primary-background-color);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: var(--awc-e-f-meta);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        &.inline-action {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s3);
          justify-content: space-between;
          & > span {
            flex: 1;
          }
        }
      }
      .inline-action-btn {
        flex-shrink: 0;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 0;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: opacity var(--awc-e-t);
        &:hover {
          opacity: 0.85;
        }
      }
      /* ── Labels & helpers ── */
      .grid-picker-label,
      .composite-label {
        display: block;
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        margin-bottom: var(--awc-e-s2);
        color: var(--primary-text-color);
      }
      .grid-helper,
      .composite-helper {
        margin-top: var(--awc-e-s2);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.5;
      }
      .scope-note {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        & ha-icon {
          --mdc-icon-size: 14px;
        }
      }
      /* ── Grid layouts ── */
      .card-size-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--awc-e-s2);
      }
      .grid-picker {
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .section-box .grid-picker {
        margin: var(--awc-e-s2) 0 0 0;
        background: transparent;
        padding: 0;
      }
      .field-group .grid-picker {
        margin: 0;
        background: transparent;
        padding: 0;
      }
      .chips-pos-align-row .grid-picker {
        margin: 0;
        padding: 0;
        background: transparent;
        flex-shrink: 0;
      }
      .grid-3x3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--awc-e-s1);
        width: 144px;
        aspect-ratio: 1;
      }
      .grid-cell {
        border: 0;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
        border-radius: var(--awc-e-r-inline);
        cursor: pointer;
        padding: 0;
        transition: background var(--awc-e-t);
        &:hover:not(.disabled):not(.active) {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 28%, transparent);
        }
        &.active {
          background: var(--primary-color);
        }
        &.empty {
          visibility: hidden;
          pointer-events: none;
        }
        &.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: repeating-linear-gradient(
            45deg,
            color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent) 0 6px,
            var(--divider-color) 6px 7px
          );
        }
      }
      .grid-extras {
        display: flex;
        gap: var(--awc-e-s1);
        margin-top: var(--awc-e-s2);
        flex-wrap: wrap;
      }
      .grid-extra {
        flex: 1;
        min-width: 100px;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 0;
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-inline);
        color: var(--primary-text-color);
        font-size: var(--awc-e-f-label);
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          color var(--awc-e-t);
        &:hover:not(.active) {
          background: var(--divider-color);
        }
        &.active {
          background: var(--primary-color);
          color: var(--text-primary-color, white);
        }
      }
      /* ── Composite field groups ── */
      .composite {
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .composite-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        flex-wrap: wrap;
      }
      .composite-unit {
        font-size: var(--awc-e-f-label);
        color: var(--secondary-text-color);
      }
      .composite-number,
      .composite-grid-4 input {
        flex: 1;
        min-width: 120px;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1px solid transparent;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        color: var(--primary-text-color);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-body);
        box-sizing: border-box;
        transition: border-color var(--awc-e-t);
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
      .composite-number:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .composite-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--awc-e-s2);
        & label {
          display: flex;
          flex-direction: column;
          gap: var(--awc-e-s1);
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
        }
        & input {
          flex: none;
          min-width: 0;
          width: 100%;
        }
      }
      /* ── Segmented controls ── */
      .segmented {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        padding: 0;
        gap: 1px;
        box-sizing: border-box;
        & button {
          flex: 1 1 auto;
          min-width: 52px;
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 0;
          background: transparent;
          color: var(--primary-text-color);
          font-size: var(--awc-e-f-body);
          cursor: pointer;
          transition:
            background var(--awc-e-t),
            color var(--awc-e-t);
          text-align: center;
          border-radius: var(--awc-e-r-ctrl);
          &:hover:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
          }
          &.active {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
          }
        }
        &.segmented-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
      .composite-row .segmented {
        flex: 1;
        min-width: 0;
      }
      .segmented.segmented-compact {
        & button {
          min-width: 0;
          padding: var(--awc-e-s2) var(--awc-e-s1);
          font-size: var(--awc-e-f-meta);
        }
      }
      /* ── Disclosure / details ── */
      details.disclosure {
        margin-top: var(--awc-e-s3);
        overflow: hidden;
        & > summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--awc-e-s2);
          padding: var(--awc-e-s3) var(--awc-e-s4);
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
          user-select: none;
          transition: background var(--awc-e-t);
          &::-webkit-details-marker {
            display: none;
          }
          &:hover {
            background: var(--divider-color);
          }
          & ha-icon {
            --mdc-icon-size: 18px;
            color: var(--secondary-text-color);
          }
          & .chevron {
            transition: transform var(--awc-e-t);
          }
        }
        &[open] > summary .chevron {
          transform: rotate(90deg);
        }
        & > .disclosure-body {
          padding: var(--awc-e-s4) var(--awc-e-s4) var(--awc-e-s3)
            var(--awc-e-s4);
        }
      }
      /* ── Card rows (cards editor) ── */
      .cards-empty {
        padding: var(--awc-e-s4);
        text-align: center;
        font-size: var(--awc-e-f-label);
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s3);
      }
      .card-row {
        margin-bottom: var(--awc-e-s2);
        overflow: hidden;
        & .card-row-head {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s2);
          padding: var(--awc-e-s3) var(--awc-e-s4);
          cursor: pointer;
          user-select: none;
          transition: background var(--awc-e-t);
          &:hover {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
          }
          & > .chevron {
            --mdc-icon-size: 20px;
            color: var(--secondary-text-color);
            transition: transform var(--awc-e-t);
          }
        }
        &.expanded .card-row-head > .chevron {
          transform: rotate(90deg);
        }
        & .card-row-title {
          flex: 1;
          font-size: var(--awc-e-f-body);
          font-weight: 500;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & .card-row-actions {
          display: flex;
          gap: 2px;
          & button {
            width: 32px;
            height: 32px;
            border: 0;
            background: transparent;
            color: var(--secondary-text-color);
            border-radius: var(--awc-e-r-inline);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition:
              background var(--awc-e-t),
              color var(--awc-e-t);
            &:hover:not(:disabled) {
              background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
              color: var(--primary-text-color);
            }
            &:disabled {
              opacity: 0.3;
              cursor: not-allowed;
            }
          }
          & ha-icon {
            --mdc-icon-size: 18px;
          }
        }
        & .card-row-body {
          padding: var(--awc-e-s3) var(--awc-e-s4) var(--awc-e-s4);
          background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
        }
      }
      /* ── Add buttons ── */
      .add-card-btn,
      .add-chip-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--awc-e-s2);
        width: 100%;
        padding: var(--awc-e-s3);
        border: 1.5px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.4);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.06);
        color: var(--primary-color);
        border-radius: var(--awc-e-r-box);
        font-size: var(--awc-e-f-body);
        font-weight: 500;
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          border-color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
          border-color: var(--primary-color);
        }
        & ha-icon {
          --mdc-icon-size: 20px;
        }
      }
      .sensor-list {
        margin-top: 0;
        &:empty {
          display: none;
        }
      }
      /* ── Compact fields ── */
      .compact-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
        margin: var(--awc-e-s3) 0;
      }
      .compact-field {
        display: flex;
        flex-direction: column;
        gap: 2px;
        & .compact-field-label {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          padding-left: 2px;
        }
        & input {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        & input {
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 1px solid transparent;
          background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          transition: border-color var(--awc-e-t);
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }
      .compact-field.invalid input {
        border-color: var(--error-color);
      }
      .compact-field-hint {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        padding-left: 2px;
        line-height: 1.3;
      }
      .compact-field-hint.error {
        color: var(--error-color);
      }
      /* ── Toggle groups ── */
      .toggle-group {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin: var(--awc-e-s2) 0;
      }
      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--awc-e-s3);
        padding: 10px var(--awc-e-s2) 10px var(--awc-e-s3);
        cursor: pointer;
        box-sizing: border-box;
        & + .toggle-row {
          border-top: 1px solid
            color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        }
        & > span {
          font-size: var(--awc-e-f-body);
          color: var(--primary-text-color);
        }
        & ha-switch {
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          --ha-switch-background-color: color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
          --ha-switch-thumb-background-color: color-mix(in srgb, var(--primary-text-color, #212121) 60%, transparent);
          /* A visible edge when off, also on themes with dark panels. */
          --ha-switch-border-color: color-mix(
            in srgb,
            var(--primary-text-color, #212121) 45%,
            transparent
          );
          --ha-switch-thumb-border-color: transparent;
          --ha-switch-checked-border-color: transparent;
          --ha-switch-checked-thumb-border-color: transparent;
          --ha-switch-checked-background-color: var(--primary-color);
          --ha-switch-checked-thumb-background-color: var(
            --text-primary-color,
            #fff
          );
          --switch-unchecked-track-color: color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
          --switch-unchecked-button-color: color-mix(in srgb, var(--primary-text-color, #212121) 60%, transparent);
          --switch-checked-track-color: var(--primary-color);
          --switch-checked-button-color: var(--text-primary-color, #fff);
        }
      }
      /* ── Section boxes ── */
      .section-box {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .section-box.no-pad {
        padding: var(--awc-e-s4);
      }
      .section-box.no-pad > .sensor-list {
        margin-top: 0;
      }
      .section-box .compact-fields {
        margin: 0;
      }
      .fc-box {
        margin: var(--awc-e-s3) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-box);
      }
      .fc-box ha-form {
        margin-top: var(--awc-e-s2);
      }
      /* ── Icon combo & weather icon ── */
      .icon-combo {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        & ha-icon-picker {
          flex: 1;
          min-width: 0;
        }
        & .icon-weather-btn {
          flex-shrink: 0;
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 0;
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-meta);
          cursor: pointer;
          transition:
            background var(--awc-e-t),
            color var(--awc-e-t);
          &.active {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
          }
          &:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
            color: var(--primary-text-color);
          }
          &:hover:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
          }
        }
      }
      .weather-icon-active {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.07);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-ctrl);
      }
      .weather-icon-active-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1px;
        & span:first-child {
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
        }
      }
      .weather-icon-active-sub {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
      }
      .weather-icon-active .icon-weather-btn {
        flex-shrink: 0;
        padding: var(--awc-e-s1) var(--awc-e-s2);
        border: 0;
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-meta);
        cursor: pointer;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        color: var(--primary-text-color);
        transition: background var(--awc-e-t);
        &:hover {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
        }
      }
      /* ── Chip type picker ── */
      .chip-type-picker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
        margin: 0 0 var(--awc-e-s3) 0;
      }
      .chip-type-btn {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1.5px solid color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
        border-radius: var(--awc-e-r-box);
        background: transparent;
        color: var(--primary-text-color);
        text-align: left;
        cursor: pointer;
        transition:
          border-color var(--awc-e-t),
          background var(--awc-e-t);
        &:hover {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.05);
        }
        &.active {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        }
        & .chip-type-icon {
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }
        & .chip-type-icon.active-icon {
          color: var(--primary-color);
        }
        & .chip-type-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        & .chip-type-name {
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          line-height: 1.2;
        }
        & .chip-type-desc {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          line-height: 1.2;
        }
      }
      /* ── Chip header badges ── */
      .chip-badge-row {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        color: var(--secondary-text-color);
        flex-shrink: 0;
        & ha-icon {
          --mdc-icon-size: 13px;
        }
      }
      .chip-badge-free {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: var(--primary-color, rgba(76, 140, 110, 0.85));
        color: #fff;
        flex-shrink: 0;
        & ha-icon {
          --mdc-icon-size: 13px;
        }
      }
      /* ── Position grid + align ── */
      .chips-pos-align-row {
        display: flex;
        gap: var(--awc-e-s3);
        align-items: flex-start;
      }
      /* ── CSS value fields ── */
      .css-field-row {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
      }
      .css-field-row.cols-2 {
        grid-template-columns: 1fr 1fr;
      }
      .css-field {
        display: flex;
        flex-direction: column;
        gap: 3px;
        & .css-field-label {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          font-weight: 500;
          padding-left: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & input {
          width: 100%;
          box-sizing: border-box;
          height: 36px;
          padding: 0 10px;
          border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
          background: var(--awc-e-field-fill);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          font-family: inherit;
          transition: border-color var(--awc-e-t);
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
          &::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
          }
        }
      }
      /* ── Section headings ── */
      .settings-group {
        margin-top: 16px;
      }
      .settings-group:first-child {
        margin-top: 0;
      }
      .settings-group-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .section-title {
        font-size: var(--awc-e-f-label);
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: var(--awc-e-s2);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .field-group {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
        border-radius: var(--awc-e-r-box);
        padding: var(--awc-e-s3);
        margin-top: var(--awc-e-s2);
      }
      .field-group > .toggle-group:first-child {
        margin-top: 0;
      }
      .field-group > .toggle-group:last-child {
        margin-bottom: 0;
      }
      .field-group-label {
        font-size: var(--awc-e-f-meta);
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
      }
      /* ── Chip accordions ── */
      .chip-accordion {
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin-top: var(--awc-e-s2);
        background: var(--secondary-background-color);
      }
      .chip-accordion + .chip-accordion {
        margin-top: var(--awc-e-s1);
      }
      .chip-accordion-head {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        cursor: pointer;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
        user-select: none;
        -webkit-user-select: none;
        & .chip-accordion-title {
          flex: 1;
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
        }
        & .chip-accordion-icon {
          --mdc-icon-size: 15px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }
        & ha-icon.chevron {
          --mdc-icon-size: 16px;
          color: var(--secondary-text-color);
          transition: transform var(--awc-e-t);
          flex-shrink: 0;
        }
        &.open ha-icon.chevron {
          transform: rotate(90deg);
        }
        &:hover {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        }
      }
      .chip-accordion-body {
        padding: var(--awc-e-s3);
        border-top: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      }
      .chip-accordion-body > .settings-group:first-child {
        margin-top: 0;
      }
      .chip-accordion-body .settings-group + .settings-group {
        margin-top: var(--awc-e-s3);
      }
      /* ── Chip nudge strips ── */
      .chip-nudge {
        display: flex;
        align-items: flex-start;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        margin: var(--awc-e-s1) 0;
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.5;
        & code {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
          padding: 0 4px;
          border-radius: 3px;
        }
      }
      .chip-nudge.warning {
        background: rgba(var(--rgb-warning-color, 255, 152, 0), 0.1);
        border: 1px solid rgba(var(--rgb-warning-color, 255, 152, 0), 0.25);
      }
      .chip-nudge.info {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      }
      /* ── Chip color picker ── */
      .chip-color-box {
        margin-top: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
      }
      .chip-color-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
      }
      .chip-color-label {
        flex: 1;
        font-size: var(--awc-e-f-label);
        color: var(--primary-text-color);
      }
      .chip-color-swatch {
        width: 36px;
        height: 28px;
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
        border-radius: var(--awc-e-r-inline);
        padding: 1px 2px;
        background: none;
        cursor: pointer;
        flex-shrink: 0;
      }
      .chip-color-clear {
        width: 24px;
        height: 24px;
        border: 0;
        border-radius: 50%;
        padding: 0;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
        color: var(--secondary-text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-error-color, 211, 47, 47), 0.15);
          color: var(--error-color);
        }
      }
      .chip-color-opacity-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
      }
      .chip-color-opacity-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .chip-color-opacity {
        flex: 1;
        height: 4px;
        accent-color: var(--primary-color);
        cursor: pointer;
      }
      .chip-color-opacity-val {
        font-size: 11px;
        color: var(--secondary-text-color);
        width: 32px;
        text-align: right;
        flex-shrink: 0;
      }
      /* ── Sliders ── */
      .awc-slider {
        display: flex;
        flex-direction: column;
        gap: var(--awc-e-s1);
        padding: var(--awc-e-s3);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
        border-radius: var(--awc-e-r-box);
      }
      .awc-slider-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--awc-e-s2);
        margin-bottom: var(--awc-e-s1);
      }
      .awc-slider-label {
        font-size: var(--awc-e-f-label);
        color: var(--primary-text-color);
        font-weight: 400;
        flex: 1;
      }
      .awc-slider-num {
        width: 48px;
        flex-shrink: 0;
        text-align: right;
        border: none;
        background: none;
        color: var(--primary-color);
        font-size: var(--awc-e-f-label);
        font-weight: 600;
        font-family: inherit;
        padding: 0;
        outline: none;
        -moz-appearance: textfield;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
      .awc-slider-range {
        width: 100%;
        height: 4px;
        accent-color: var(--primary-color);
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        display: block;
        background: linear-gradient(
          to right,
          var(--primary-color) 0%,
          var(--primary-color) var(--awc-slider-pct, 50%),
          color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent)
            var(--awc-slider-pct, 50%)
        );
        border-radius: 2px;
        border: none;
        outline: none;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
        &::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
      }
      .awc-slider-helper {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-top: var(--awc-e-s1);
        line-height: 1.4;
      }
      /* ── Free chip positioning ── */
      .free-pos-layout {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--awc-e-s3);
        align-items: start;
      }
      .offset-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
      }
      .offset-field {
        display: flex;
        flex-direction: column;
        gap: 3px;
        & .offset-field-label {
          font-size: 11px;
          color: var(--secondary-text-color);
          font-weight: 500;
          padding-left: 2px;
        }
        & input {
          width: 100%;
          box-sizing: border-box;
          height: 36px;
          padding: 0 10px;
          border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
          background: var(--awc-e-field-fill);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          font-family: inherit;
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
          &::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
          }
        }
      }
      .free-mode-box {
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.05);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.14);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
      }
      .free-mode-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--awc-e-s2) var(--awc-e-s3);
      }
      .free-mode-label {
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .free-pos-subpanel {
        padding: 0 var(--awc-e-s3) var(--awc-e-s3);
      }
      .free-pos-subpanel::before {
        content: "";
        display: block;
        height: 10px;
      }
      .anchor-grid {
        display: grid;
        grid-template-columns: repeat(3, 30px);
        grid-template-rows: repeat(3, 30px);
        gap: 4px;
      }
      .anchor-cell {
        width: 30px;
        height: 30px;
        border: 1.5px solid color-mix(in srgb, var(--primary-text-color, #212121) 15%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: transparent;
        cursor: pointer;
        transition:
          border-color var(--awc-e-t),
          background var(--awc-e-t);
        &:hover:not(.active) {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.07);
        }
        &.active {
          border-color: var(--primary-color);
          background: var(--primary-color);
        }
      }
      .clearable-field {
        position: relative;
        & ha-form {
          padding-right: 0;
        }
        & .clear-btn {
          position: absolute;
          top: 8px;
          right: 4px;
          width: 24px;
          height: 24px;
          padding: 0;
          margin: 0;
          border: none;
          background: transparent;
          color: var(--secondary-text-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          opacity: 0.6;
          transition:
            opacity var(--awc-e-t),
            color var(--awc-e-t);
          z-index: 1;
          &:hover {
            opacity: 1;
            color: var(--error-color);
          }
          & ha-icon {
            --mdc-icon-size: 16px;
          }
        }
      }
      /* ── Forecast special box ── */
      .chip-forecast-box {
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin-top: var(--awc-e-s3);
      }
      .chip-forecast-header {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        padding: var(--awc-e-s1) var(--awc-e-s3) 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .chip-forecast-header ha-icon {
        --mdc-icon-size: 13px;
      }
      .chip-forecast-body {
        padding: var(--awc-e-s2) var(--awc-e-s3) var(--awc-e-s3);
      }
      .chip-forecast-body > * + * {
        margin-top: var(--awc-e-s2);
      }
      /* ── Ring threshold rows ── */
      .ring-threshold-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) 0;
        & + .ring-threshold-row {
          border-top: 1px solid
            color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
          padding-top: var(--awc-e-s2);
        }
      }
      .ring-threshold-row .chip-color-swatch {
        width: 28px;
        height: 22px;
        flex-shrink: 0;
      }
      .ring-threshold-row input[type="text"] {
        flex: 1;
        min-width: 0;
        height: 30px;
        padding: 0 8px;
        border: 1px solid transparent;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        color: var(--primary-text-color);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-body);
        font-family: inherit;
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
      .ring-threshold-row .threshold-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .ring-threshold-del {
        width: 22px;
        height: 22px;
        border: 0;
        border-radius: 50%;
        padding: 0;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition:
          background var(--awc-e-t),
          color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-error-color, 211, 47, 47), 0.12);
          color: var(--error-color);
        }
      }
      .ring-threshold-add {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--awc-e-s2);
        width: 100%;
        padding: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
        border: 1.5px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.4);
        border-radius: var(--awc-e-r-ctrl);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.06);
        color: var(--primary-color);
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          border-color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
          border-color: var(--primary-color);
        }
        & ha-icon {
          --mdc-icon-size: 16px;
        }
      }
      /* ── Panel titles with a subtitle ── */
      .panel-title {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.25;
      }
      .panel-sub {
        font-size: var(--awc-e-f-meta);
        font-weight: 400;
        color: var(--secondary-text-color);
      }
      /* ── Help ── */
      .help-row {
        display: flex;
        justify-content: flex-end;
        margin: 0 0 var(--awc-e-s2);
      }
      .help-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 0;
        background: none;
        color: var(--primary-color);
        font-size: var(--awc-e-f-meta);
        cursor: pointer;
        padding: 2px 4px;
        border-radius: var(--awc-e-r-inline);
        & ha-icon {
          --mdc-icon-size: 16px;
        }
        &.active,
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.1);
        }
      }
      .help-box {
        margin: 0 0 var(--awc-e-s3);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border-left: 3px solid var(--primary-color);
        border-radius: var(--awc-e-r-inline);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        font-size: var(--awc-e-f-label);
        line-height: 1.5;
        color: var(--primary-text-color);
        & a {
          color: var(--primary-color);
        }
      }
      /* ── Groups inside a panel ── */
      .editor-group {
        margin-top: var(--awc-e-s4);
        padding-top: var(--awc-e-s3);
        border-top: 1px solid var(--divider-color);
      }
      .editor-group-title {
        font-size: var(--awc-e-f-meta);
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
      }
      .toggle-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .toggle-helper {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.35;
        margin-top: 2px;
      }
      .indent {
        margin: 0 0 var(--awc-e-s2) var(--awc-e-s3);
        padding-left: var(--awc-e-s3);
        border-left: 2px solid var(--divider-color);
      }
      .sub-box {
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-box);
        padding: 0 var(--awc-e-s3) var(--awc-e-s2);
        margin-bottom: var(--awc-e-s2);
      }
      .sub-box-head {
        padding-left: 0;
        padding-right: 0;
        & > span {
          display: inline-flex;
          align-items: center;
          gap: var(--awc-e-s2);
          font-weight: 500;
        }
        & ha-icon {
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
        }
      }
      /* ── Image ── */
      .image-thumbs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
      }
      .image-thumb {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .image-thumb-pic {
        height: 72px;
        border-radius: var(--awc-e-r-ctrl);
        border: 1px dashed var(--divider-color);
        display: grid;
        place-items: center;
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        background: center / contain no-repeat
          color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        margin-bottom: var(--awc-e-s1);
        &.has {
          border-style: solid;
        }
      }
      .image-thumb-label {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .image-place {
        display: flex;
        gap: var(--awc-e-s3);
        align-items: stretch;
        flex-wrap: wrap;
        & .grid-picker {
          margin: 0;
        }
      }
      .image-preview {
        position: relative;
        flex: 1;
        min-width: 160px;
        min-height: 96px;
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        background: linear-gradient(#5b9fd6, #a9d2ef);
      }
      .image-preview-img {
        position: absolute;
        aspect-ratio: 1;
        background: center / contain no-repeat;
        &.v-top {
          top: 6%;
        }
        &.v-middle {
          top: 50%;
          transform: translateY(-50%);
        }
        &.v-bottom {
          bottom: 0;
        }
        &.h-left {
          left: 4%;
        }
        &.h-center {
          left: 50%;
          translate: -50% 0;
        }
        &.h-right {
          right: 4%;
        }
      }
      .status-sentence {
        font-size: var(--awc-e-f-body);
        line-height: 1.5;
        margin-bottom: var(--awc-e-s2);
      }
      /* ── Chips ── */
      .chip-area-top {
        display: flex;
        gap: var(--awc-e-s3);
        flex-wrap: wrap;
        align-items: flex-start;
        & .grid-picker {
          margin: 0;
        }
      }
      .chip-area-layout {
        flex: 1;
        min-width: 180px;
      }
      .layout-picker {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--awc-e-s1);
        & button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: var(--awc-e-s2) 2px;
          border: 1px solid var(--divider-color);
          border-radius: var(--awc-e-r-ctrl);
          background: none;
          color: var(--primary-text-color);
          font-size: var(--awc-e-f-meta);
          cursor: pointer;
          &.active {
            border-color: var(--primary-color);
            background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.1);
          }
        }
        & svg {
          width: 44px;
          height: 24px;
          fill: currentColor;
          opacity: 0.7;
        }
      }
      .quick-add {
        display: flex;
        flex-wrap: wrap;
        gap: var(--awc-e-s1);
        align-items: center;
        margin-top: var(--awc-e-s2);
      }
      .quick-add-label {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-right: 2px;
      }
      .quick-add-btn {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: var(--awc-e-f-meta);
        padding: 4px 10px 4px 6px;
        cursor: pointer;
        & ha-icon {
          --mdc-icon-size: 14px;
          color: var(--primary-color);
        }
        &:hover {
          border-color: var(--primary-color);
        }
      }
      .chip-tabs {
        display: flex;
        gap: 2px;
        overflow-x: auto;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: var(--awc-e-s3);
        scrollbar-width: none;
      }
      .chip-tab {
        flex-shrink: 0;
        border: 0;
        border-bottom: 2px solid transparent;
        background: none;
        color: var(--secondary-text-color);
        font-size: var(--awc-e-f-label);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        cursor: pointer;
        &.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
      }
      .card-row-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex: 1;
      }
      .card-row-sub {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tip-box {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s3);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        & ha-icon {
          --mdc-icon-size: 16px;
          flex-shrink: 0;
        }
        & a {
          color: var(--primary-color);
        }
      }
      .card-picker-box {
        margin-top: var(--awc-e-s2);
        max-height: 520px;
        overflow: auto;
        border: 1px solid var(--divider-color);
        border-radius: var(--awc-e-r-box);
        padding: var(--awc-e-s2);
      }
    `}setConfig(e){e=at(e);let t={...e};this._normalizeConfigTypes(t);let a=!1;if(!t.weather_entity&&this.hass&&this.hass.states){let r=Object.keys(this.hass.states).find(i=>i.startsWith("weather."));r&&(t.weather_entity=r,a=!0)}!t.sun_entity&&this.hass&&this.hass.states&&this.hass.states["sun.sun"]&&(t.sun_entity="sun.sun",a=!0),this._config=this._cleanConfig(t),t.card_color_mode==="light"?this._colorModeState="force_light":t.card_color_mode==="dark"?this._colorModeState="force_dark":t.theme_entity?this._colorModeState="entity":this._colorModeState="ha_theme",a&&Promise.resolve().then(()=>this._emit())}get _formData(){if(this._cachedFormData&&this._cachedFormConfig===this._config&&this._cachedFormColorMode===this._colorModeState)return this._cachedFormData;let e={...ze,...this._config||{}};return e._color_mode=this._colorModeState||(e.card_color_mode==="light"?"force_light":e.card_color_mode==="dark"?"force_dark":e.theme_entity?"entity":"ha_theme"),this._cachedFormData=e,this._cachedFormConfig=this._config,this._cachedFormColorMode=this._colorModeState,e}_colorModeSchema(){let e=this._formData,t=e._color_mode==="entity";return[{name:"_color_mode",selector:{select:{mode:"dropdown",options:P.color_mode}}},...t?[{name:"theme_entity",selector:{entity:{}}}]:[]]}_renderToggleGroup(e){return s`<div class="toggle-group">
      ${e.map(t=>s`<label class="toggle-row">
            <span>${o(t.label)}</span>
            <ha-switch
              data-key=${t.key}
              .checked=${this._formData[t.key]===!0}
              @change=${this._onToggleGroupChange}
            ></ha-switch
          ></label> `)}
    </div>`}_onToggleGroupChange(e){let t=e.target&&e.target.dataset&&e.target.dataset.key;t&&this._updateField(t,e.target.checked===!0)}_getChips(){let e=(this._config||{}).chips;return!Array.isArray(e)||e.length===0?[]:e.every(t=>t&&typeof t=="object")?e:e.map(t=>t&&typeof t=="object"?t:{})}_getCustomCards(){let e=this._config&&this._config.custom_cards;return Array.isArray(e)?[...e]:[]}_imageStatusSchema(){let e=this._formData,t=!!e.status_entity;return[{name:"status_entity",selector:{entity:{}}},...t?[{type:"grid",name:"",schema:[{name:"status_day",selector:{text:{}}},{name:"status_night",selector:{text:{}}}]}]:[]]}_computeLabel=e=>!e||!e.name?"":o(v[e.name]||e.name);_computeHelper=e=>{if(!(!e||!e.name))return F[e.name]?o(F[e.name]):void 0};_isValidCardHeight(e){if(e==null)return!0;let t=String(e).trim();return!t||t.toLowerCase()==="auto"||/^-?\d+(?:\.\d+)?$/.test(t)?!0:/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)}_normalizeCardHeight(e){if(e==null)return e;let t=String(e).trim();if(!t)return"";if(t.toLowerCase()==="auto")return"auto";if(/^-?\d+(?:\.\d+)?$/.test(t)){let a=Number(t);return Number.isFinite(a)?a:""}return/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)?t:this._config&&this._config.card_height?this._config.card_height:""}_normalizeCssSizeValue(e){if(e==null)return e;if(typeof e=="number"&&Number.isFinite(e))return`${e}px`;let t=String(e).trim();if(!t)return"";let a=t.match(/^-?\d+(?:\.\d+)?/);return a?`${a[0]}px`:""}_coerceNumberLike(e){if(typeof e!="string")return e;let t=e.trim();if(!/^-?\d+(?:\.\d+)?$/.test(t))return e;let a=Number(t);return Number.isFinite(a)?a:e}_coerceBooleanLike(e){if(typeof e=="boolean"||typeof e!="string")return e;let t=e.trim().toLowerCase();return t==="true"?!0:t==="false"?!1:e}_normalizeChipTypes(e){if(!e||typeof e!="object"||Array.isArray(e))return e;let t={...e};for(let a of aa)a in t&&(t[a]=this._coerceNumberLike(t[a]));for(let a of ia)a in t&&(t[a]=this._normalizeCssSizeValue(t[a]));for(let a of ra)a in t&&(t[a]=this._coerceBooleanLike(t[a]));for(let a of["ring_thresholds","bar_thresholds"])Array.isArray(t[a])&&(t[a]=t[a].map(r=>{if(!r||typeof r!="object"||Array.isArray(r))return r;let i={...r};return"value"in i&&(i.value=this._coerceNumberLike(i.value)),i}));return t}_normalizeConfigTypes(e){if(!e||typeof e!="object")return e;for(let t of ea)t in e&&(e[t]=this._coerceNumberLike(e[t]));for(let t of ta)t in e&&(e[t]=this._coerceBooleanLike(e[t]));return"card_height"in e&&(e.card_height=this._normalizeCardHeight(e.card_height)),Array.isArray(e.chips)&&(e.chips=e.chips.map(t=>this._normalizeChipTypes(t))),e}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let t=this._config,a={...e.detail&&e.detail.value||{}},r=[];if(Object.prototype.hasOwnProperty.call(a,"card_height")&&(this._cardHeightError=this._isValidCardHeight(a.card_height)?"":o("Invalid height. Use auto, 160, 160px, 40vh, or 80%."),a.card_height=this._normalizeCardHeight(a.card_height)),a._color_mode!==void 0)switch(this._colorModeState=a._color_mode,a._color_mode){case"ha_theme":r.push("theme_entity","card_color_mode");break;case"entity":r.push("card_color_mode"),a.theme_entity||(a.theme_entity=a.sun_entity||(this.hass&&this.hass.states&&this.hass.states["sun.sun"]?"sun.sun":""));break;case"force_light":r.push("theme_entity"),a.card_color_mode="light";break;case"force_dark":r.push("theme_entity"),a.card_color_mode="dark";break}delete a._color_mode,a.status_entity&&!t.status_entity&&(!a.status_day&&a.image_day&&(a.status_day=a.image_day),!a.status_night&&a.image_night&&(a.status_night=a.image_night)),a.card_square===!0&&t.card_square!==!0&&r.push("card_height"),this._patch(a,{replace:!0,strip:r})}_patch(e,t){let a=t||{},i={...a.replace?{}:{...this._config||{}},...e};if(Array.isArray(a.strip))for(let n of a.strip)delete i[n];this._config=this._cleanConfig(i),this._emit()}_computeInactiveKeys(e){let t=new Set;(e.card_color_mode==="light"||e.card_color_mode==="dark")&&t.add("theme_entity");let a=e.chip_area_layout||"wrap";return a!=="grid"&&t.add("chip_area_columns"),a!=="horizontal-scroll"&&a!=="vertical-scroll"&&t.add("chip_area_scroll_count"),a==="horizontal-scroll"||a==="vertical-scroll"||(t.add("chip_area_height"),t.add("chip_area_full_width")),e.chip_area_grouped||t.add("chip_area_separator"),(!e.wind_compass||e.wind_compass==="off")&&(t.add("wind_compass_position"),t.add("wind_compass_cardinal"),t.add("wind_compass_degrees"),t.add("wind_compass_speed")),(!e.wind_compass||e.wind_compass==="off"||e.wind_compass==="pill")&&t.add("wind_compass_background"),t}_cleanConfig(e){let t={...e};this._normalizeConfigTypes(t);for(let i of Object.keys(t)){let n=t[i];if(n===""||n===null||n===void 0){delete t[i];continue}if(Array.isArray(n)&&n.length===0){delete t[i];continue}typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length===0&&delete t[i]}for(let[i,n]of Object.entries(ze))t[i]===n&&delete t[i];let a=this._computeInactiveKeys(t);for(let i of a)delete t[i];delete t._color_mode;let r={};for(let i of Jt)i!=="custom_cards"&&i in t&&(r[i]=t[i]);for(let i of Object.keys(t))i!=="custom_cards"&&(i in r||(r[i]=t[i]));return"custom_cards"in t&&(r.custom_cards=t.custom_cards),r}_emit(){let e={...this._config||{}};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_renderForm(e){return!e||e.length===0?"":s`<ha-form
      .hass=${this.hass}
      .data=${this._formData}
      .schema=${e}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`}_renderClearableText(e){let t=(this._formData||{})[e];return s`<div class="clearable-field">
      ${this._renderForm([{name:e,selector:{text:{}}}])}
      ${t?s`<button
            type="button"
            class="clear-btn"
            title=${o("Clear")}
            data-field=${e}
            @click=${this._onClearFieldClick}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`:""}
    </div>`}_onClearFieldClick(e){let t=this._ds(e,"field");t&&this._updateField(t,"")}_ds(e,t){return e.currentTarget&&e.currentTarget.dataset?e.currentTarget.dataset[t]:""}_renderDisclosure(e,t){let a=e==="Advanced options";return s`<details class="disclosure" @toggle=${this._onDisclosureToggle}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${a?s`<ha-icon icon="mdi:cog-outline"></ha-icon>`:""}
        <span>${o(e)}</span>
      </summary>
      <div class="disclosure-body">${t}</div>
    </details>`}_onDisclosureToggle(e){let t=e.currentTarget;if(!t.open)return;let a=t.parentElement;a&&a.querySelectorAll(":scope > details.disclosure[open]").forEach(r=>{r!==t&&(r.open=!1)})}_renderPositionGrid(e,t){let a=oa[e],{valueMap:r,reverseMap:i,cellsFlat:n,disabledSet:p}=a,d=this._formData[e]||"",_=i[d]||d,g=F[e]?o(F[e]):"",m=o(v[e]||e);return s`<div class="grid-picker">
      <div class="grid-picker-label">${m}</div>
      <div class="grid-3x3" role="radiogroup" aria-label=${m}>
        ${n.map(f=>{if(f===null)return s`<div class="grid-cell empty"></div>`;let $=p.has(f),C=r[f]||f;return s`<button
            type="button"
            role="radio"
            class="grid-cell ${_===f?"active":""} ${$?"disabled":""}"
            ?disabled=${$}
            data-field=${e}
            data-value=${C}
            title=${$?o("{value} (not supported here)",{value:f}):f}
            aria-label=${f}
            @click=${this._onPositionGridSelect}
          ></button>`})}
      </div>
      ${t.extras?s`<div class="grid-extras">
            ${t.extras.map(f=>s`<button
                  type="button"
                  class="grid-extra ${_===f.value?"active":""}"
                  aria-pressed=${_===f.value?"true":"false"}
                  data-field=${e}
                  data-value=${f.value}
                  @click=${this._onPositionGridSelect}
                >
                  ${o(f.label)}
                </button>`)}
          </div>`:""}
      ${g?s`<div class="grid-helper">${g}</div>`:""}
    </div>`}_onPositionGridSelect(e){let t=e.currentTarget;if(!t||t.disabled)return;let a=t.dataset&&t.dataset.field,r=t.dataset&&t.dataset.value;!a||r===void 0||this._setField(a,r)}_setField(e,t){if((this._config||{})[e]===t){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_updateField(e,t){if(e==="card_height"&&(this._cardHeightError=this._isValidCardHeight(t)?"":o("Invalid height. Use auto, 160, 160px, 40vh, or 80%."),t=this._normalizeCardHeight(t)),t==null||t===""){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_setCardStyle(e){if(e==="standalone"){this._patch({card_style:e},{strip:["card_full_width","card_mask_vertical","card_mask_horizontal"]});return}this._patch({card_style:e})}_onPanelToggle(e,t){t?this._openPanel=e:this._openPanel===e&&(this._openPanel=null)}_onPanelExpandedChanged(e){let t=this._ds(e,"panel");t&&this._onPanelToggle(t,!!(e.detail&&e.detail.expanded))}_onTrimmedFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,(e.target.value||"").trim())}_onRawFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,e.target.value||"")}_onOffsetPartChange(e){let t=this._ds(e,"offsetIndex"),a=Number(t);Number.isInteger(a)&&this._setOffsetPart(a,e.target.value)}_onSegmentedFieldSelect(e){let t=this._ds(e,"field");if(!t)return;let a=this._ds(e,"value"),r=this._ds(e,"valueType")||"string";if(r==="number"){let i=Number(a);if(!Number.isFinite(i))return;this._updateField(t,i);return}if(r==="boolean"){this._updateField(t,a==="true");return}if(r==="empty"){this._updateField(t,"");return}this._updateField(t,a)}_onChipAreaBackgroundModeSelect(e){let t=this._ds(e,"bgMode");if(t){if(t==="off"){this._updateField("chip_area_background",!1);return}this._updateField("chip_area_background",!0),this._updateField("card_background_style",t)}}_renderCardStyleSegmented(){let e=this._formData,t=e.card_square===!0,a=e.card_style||"standalone",r=[{value:"immersive",label:"Immersive"},{value:"standalone",label:"Standalone"}];return s`<div class="grid-picker">
      <div class="segmented" role="radiogroup" aria-label=${o(v.card_style)}>
        ${r.map(i=>s`<button
              type="button"
              role="radio"
              data-value=${i.value}
              class=${a===i.value?"active":""}
              @click=${this._onCardStyleSelect}
            >
              ${o(i.label)}
            </button>`)}
      </div>
      <div class="composite-helper">
        ${o(a==="immersive"?"The card uses no background at all.":"Background color based on the weather.")}
      </div>
      <div class="compact-fields">
        ${t?"":this._renderCompactField("card_height","e.g. 220 or auto")}
        ${this._renderCompactField("card_padding","e.g. 16px")}
      </div>
    </div>`}_onCardStyleSelect(e){let t=this._ds(e,"value");t&&this._setCardStyle(t)}_renderCelestialOffsetPicker(){return s`<div class="composite">
      <div class="composite-label">${o("Offset from edge")}</div>
      ${this._renderOffsetXYRow("celestial_x","celestial_y",(e,t)=>s`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${e}
            .value=${String(t||"")}
            @change=${this._onTrimmedFieldChange}
          />`)}
    </div>`}_renderOffsetXYRow(e,t,a){let r=this._formData;return s`<div class="composite-row" style="flex-wrap:nowrap">
      <span class="composite-unit">X</span>
      ${a(e,r[e])}
      <span class="composite-unit">Y</span>
      ${a(t,r[t])}
    </div>`}_parseOffset(e){if(!e||typeof e!="string")return[0,0,0,0];let t=e.trim().split(/\s+/).map(a=>parseInt(a,10)||0);switch(t.length){case 0:return[0,0,0,0];case 1:return[t[0],t[0],t[0],t[0]];case 2:return[t[0],t[1],t[0],t[1]];case 3:return[t[0],t[1],t[2],t[1]];default:return[t[0],t[1],t[2],t[3]]}}_serializeOffset(e){return e.every(t=>t===0)?"":e.map(t=>`${t}px`).join(" ")}_setOffsetPart(e,t){let a=this._parseOffset(this._formData.card_offset);a[e]=parseInt(t,10)||0,this._updateField("card_offset",this._serializeOffset(a))}_renderImageOffsetPicker(){let e=this._formData;return!e.image_day&&!e.image_night?"":s`<div class="composite">
      <div class="composite-label">${o("Image Offset")}</div>
      ${this._renderOffsetXYRow("image_x","image_y",(t,a)=>s`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${t}
            .value=${String(a||"")}
            @change=${this._onTrimmedFieldChange}
          />`)}
      <div class="composite-helper">
        ${o("Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.")}
      </div>
    </div>`}_renderOffsetPicker(){let e=this._parseOffset(this._formData.card_offset),t=["Top","Right","Bottom","Left"].map(a=>o(a));return s`<div class="composite">
      <div class="composite-label">${o(v.card_offset)}</div>
      <div class="composite-grid-4">
        ${t.map((a,r)=>s`<label>
              <span>${a}</span>
              <input
                type="number"
                step="1"
                data-offset-index=${String(r)}
                .value=${String(e[r])}
                @change=${this._onOffsetPartChange}
            /></label>`)}
      </div>
      ${F.card_offset?s`<div class="composite-helper">${F.card_offset}</div>`:""}
    </div>`}_renderCustomCardsEditor(){let e=this._getCustomCards();this._openPanel==="cards"&&this._cardEditorsReady===void 0&&this._loadCardEditors();let t=this._cardPickerOpen&&this._cardEditorsReady?s`<div class="card-picker-box">
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this._lovelace()}
              @config-changed=${this._onCardPicked}
            ></hui-card-picker>
          </div>`:"";return s`${e.length===0?s`<div class="cards-empty">${o("No cards yet.")}</div>`:e.map((a,r)=>this._renderCardRow(a,r,e.length))}
      <button type="button" class="add-card-btn" @click=${this._addBlankCard}>
        <ha-icon icon=${this._cardPickerOpen?"mdi:close":"mdi:plus"}></ha-icon>
        <span>${this._cardPickerOpen?o("Cancel"):o("Add card")}</span>
      </button>
      ${t}`}async _loadCardEditors(){return this._cardEditorsLoading?this._cardEditorsLoading:(this._cardEditorsLoading=(async()=>{try{if(!customElements.get("hui-card-element-editor")){let e=typeof window.loadCardHelpers=="function"?await window.loadCardHelpers():null,t=e&&await e.createCardElement({type:"vertical-stack",cards:[]}),a=t&&t.constructor;a&&typeof a.getConfigElement=="function"&&await a.getConfigElement()}return!!customElements.get("hui-card-element-editor")&&!!customElements.get("hui-card-picker")}catch{return!1}})(),this._cardEditorsReady=await this._cardEditorsLoading,this.requestUpdate(),this._cardEditorsReady)}_lovelace(){if(this.lovelace)return this.lovelace;if(this._foundLovelace)return this._foundLovelace;let e=(r,i)=>{if(!r||i>12)return null;for(let n of r.querySelectorAll("*")){if(n.localName==="hui-root")return n;if(n.shadowRoot){let p=e(n.shadowRoot,i+1);if(p)return p}}return null},t=typeof document<"u"?e(document,0):null,a=t&&t.lovelace&&t.lovelace.config;return a?(this._foundLovelace=a,a):{views:[]}}_onCardPicked(e){e.stopPropagation();let t=e.detail&&e.detail.config;if(!t||typeof t!="object")return;let a=[...this._getCustomCards(),t];this._cardPickerOpen=!1,this._expandedCard=a.length-1,this._updateField("custom_cards",a)}_renderListRow({idx:e,total:t,expanded:a,title:r,subtitle:i,badge:n,onToggle:p,onMoveUp:d,onMoveDown:_,onRemove:g,onDuplicate:m,body:f}){return s`<div class="card-row ${a?"expanded":""}">
      <div class="card-row-head" @click=${p}>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${n||""}
        <span class="card-row-text"
          ><span class="card-row-title">${r}</span>${i?s`<span class="card-row-sub">${i}</span>`:""}</span
        >
        <div class="card-row-actions" @click=${this._onStopPropagation}>
          <button
            type="button"
            title=${o("Move up")}
            ?disabled=${e===0}
            @click=${d}
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button
            type="button"
            title=${o("Move down")}
            ?disabled=${e===t-1}
            @click=${_}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          ${m?s`<button
                type="button"
                title=${o("Duplicate")}
                @click=${m}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>`:""}
          <button type="button" title=${o("Delete")} @click=${g}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </div>
      ${a?s`<div class="card-row-body">${f}</div>`:""}
    </div>`}_onStopPropagation(e){e.stopPropagation()}_onCustomCardSizeChange(e){let t=Number(this._ds(e,"cardIdx")||NaN),a=this._ds(e,"cardKey");if(this._badIdx(t)||!a)return;let r=this._getCustomCards(),n={...r[t]&&typeof r[t]=="object"?r[t]:{}},p=(e.target.value||"").trim();p?n[a]=p:delete n[a],this._updateCardAt(t,n)}_onCustomCardFormValueChanged(e){e.stopPropagation();let t=Number(this._ds(e,"cardIdx")||NaN);this._badIdx(t)||this._updateCardAt(t,e.detail&&e.detail.value&&e.detail.value._card||{})}_innerCard(e){let t=this._innerCardCache||(this._innerCardCache=new WeakMap);if(t.has(e))return t.get(e);let a={...e};return delete a.custom_width,delete a.custom_height,t.set(e,a),a}_onCustomCardEditorChanged(e){e.stopPropagation();let t=Number(this._ds(e,"cardIdx")||NaN),a=e.detail&&e.detail.config;if(this._badIdx(t)||!a||typeof a!="object")return;let r=this._getCustomCards()[t]||{},i={...a};r.custom_width&&(i.custom_width=r.custom_width),r.custom_height&&(i.custom_height=r.custom_height),this._updateCardAt(t,i)}_renderCardRow(e,t,a){let r=this._expandedCard===t,i=e&&e.type?String(e.type).replace(/^custom:/,""):"card",n=s`<div class="card-size-row">
        <div class="offset-field">
          <span class="offset-field-label">${o("Width")}</span>
          <input
            type="text"
            placeholder=${o("e.g. 140px or 60%")}
            data-card-idx=${String(t)}
            data-card-key="custom_width"
            .value=${e.custom_width||""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
        <div class="offset-field">
          <span class="offset-field-label">${o("Height")}</span>
          <input
            type="text"
            placeholder=${o("e.g. 110px")}
            data-card-idx=${String(t)}
            data-card-key="custom_height"
            .value=${e.custom_height||""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
      </div>
      ${this._cardEditorsReady?s`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this._lovelace()}
            .value=${this._innerCard(e)}
            data-card-idx=${String(t)}
            @config-changed=${this._onCustomCardEditorChanged}
          ></hui-card-element-editor>`:s`<ha-form
            .hass=${this.hass}
            .data=${{_card:e}}
            .schema=${[{name:"_card",selector:{object:{}}}]}
            data-card-idx=${String(t)}
            .computeLabel=${()=>""}
            @value-changed=${this._onCustomCardFormValueChanged}
          ></ha-form>`}`;return this._renderListRow({idx:t,total:a,expanded:r,title:i,body:n,onToggle:()=>this._toggleCardExpanded(t),onMoveUp:()=>this._moveCard(t,-1),onMoveDown:()=>this._moveCard(t,1),onRemove:()=>this._removeCard(t)})}_toggleCardExpanded(e){this._expandedCard=this._expandedCard===e?null:e}_moveCard(e,t){let a=this._getCustomCards(),r=e+t;r<0||r>=a.length||([a[e],a[r]]=[a[r],a[e]],this._expandedCard===e?this._expandedCard=r:this._expandedCard===r&&(this._expandedCard=e),this._updateField("custom_cards",a))}_removeCard(e){let t=this._getCustomCards();t.splice(e,1),this._expandedCard===e?this._expandedCard=null:typeof this._expandedCard=="number"&&this._expandedCard>e&&(this._expandedCard=this._expandedCard-1),this._updateField("custom_cards",t)}_updateCardAt(e,t){let a=this._getCustomCards();a[e]=t,this._updateField("custom_cards",a)}_addBlankCard=()=>{if(this._cardEditorsReady){this._cardPickerOpen=!this._cardPickerOpen,this._foundLovelace=null,this.requestUpdate();return}let e=[...this._getCustomCards(),{type:"entity",entity:"",custom_width:"100%"}];this._expandedCard=e.length-1,this._updateField("custom_cards",e)};_chipTitle(e){let t=(e&&e.name||"").toString().trim(),a=(e&&e.entity||"").toString().trim(),r=(e&&e.attribute||"").toString().trim();if(!a)return t?`${t} \u2014 ${o("(no entity)")}`:o("(choose an entity)");let i=this.hass&&this.hass.states&&this.hass.states[a],p=i&&i.attributes&&i.attributes.friendly_name||a;if(e.forecast){let _=e.forecast==="hourly"?o("Hourly"):o("Daily"),g=parseInt(e.forecast_offset,10)||0,m=e.forecast==="hourly"?g===0?o("now"):`+${g}h`:g===0?o("today"):g===1?o("tomorrow"):`+${g}d`,$=`${p} \xB7 ${_} ${m} [${r||"condition"}]`;return t?`${t} \u2014 ${$}`:$}let d=r?`${p} [${r}]`:p;return t?`${t} \u2014 ${d}`:d}_chipValuePreview(e){if(!e||!e.entity)return"";if(e.forecast)return o("Forecast");let t=this.hass&&this.hass.states&&this.hass.states[e.entity];if(!t)return o("Entity not found");if(e.attribute){let r=t.attributes?t.attributes[e.attribute]:void 0;return r==null||typeof r=="object"?"":String(r)}let a=t.attributes&&t.attributes.unit_of_measurement||"";return a?`${t.state} ${a}`:String(t.state)}_cleanChip(e){let t={...e};t.entity||(delete t.attribute,delete t.forecast,delete t.forecast_offset),t.forecast||(delete t.forecast_offset,delete t.forecast_precision),t.forecast_offset===0&&delete t.forecast_offset;let a=!!t.attribute||!t.entity||!!(this.hass&&this.hass.states&&this.hass.states[t.entity]);(t.bearing_format==="degrees"||a&&!pe(t,this.hass))&&delete t.bearing_format,a&&!pe(t,this.hass)&&(delete t.bearing_icon,delete t.bearing_speed),t.attribute!=="wind_bearing"&&delete t.bearing_speed,!t.sub_value_entity&&!t.sub_value_attribute&&(delete t.sub_value_format,delete t.sub_value_position,delete t.sub_value_size,delete t.sub_value_weight,delete t.hide_sub_value),t.type!=="ring"&&t.type!=="bar"&&(delete t.gauge_entity,delete t.gauge_attribute),t.type!=="ring"&&(delete t.ring_min,delete t.ring_max,delete t.ring_color,delete t.ring_width,delete t.ring_gap,delete t.ring_thresholds,delete t.ring_threshold_mode),t.type!=="bar"&&(delete t.bar_min,delete t.bar_max,delete t.bar_color,delete t.bar_height,delete t.bar_gap,delete t.bar_thresholds,delete t.bar_threshold_mode);for(let r of Object.keys(t)){let i=t[r];if(r==="unit_format"||r==="ring_min"||r==="bar_min"){i==null&&delete t[r];continue}r==="background"&&i===!1||r==="icon_background"&&i===!1||(i===""||i===null||i===void 0||i===!1)&&delete t[r]}return t}_updateChipAt(e,t){let a=this._getChips().map((r,i)=>i===e?this._cleanChip(t):r);this._commitChips(a)}_addChip=()=>{let t=[...this._getChips(),{}];this._expandedChip=t.length-1,this._commitChips(t)};_moveChip(e,t){let a=[...this._getChips()],r=e+t;r<0||r>=a.length||([a[e],a[r]]=[a[r],a[e]],this._expandedChip===e?this._expandedChip=r:this._expandedChip===r&&(this._expandedChip=e),this._commitChips(a))}_removeChip(e){let t=[...this._getChips()];t.splice(e,1),delete this[`_acc_open_${e}`],delete this[`_text_acc_${e}`];for(let a=e;a<t.length;a++)this[`_acc_open_${a}`]=this[`_acc_open_${a+1}`]||null,this[`_text_acc_${a}`]=this[`_text_acc_${a+1}`]||null;delete this[`_acc_open_${t.length}`],delete this[`_text_acc_${t.length}`],this._expandedChip===e?this._expandedChip=null:typeof this._expandedChip=="number"&&this._expandedChip>e&&(this._expandedChip=this._expandedChip-1),this._commitChips(t)}_duplicateChip(e){let t=[...this._getChips()];t.splice(e+1,0,{...t[e]}),this._expandedChip=e+1,this._commitChips(t)}_toggleChipExpanded(e){this._expandedChip=this._expandedChip===e?null:e}_getChipByIndex(e){let t=Number(e);if(this._badIdx(t))return null;let a=this._getChips();return a[t]&&typeof a[t]=="object"?a[t]:null}_badIdx(e){return!Number.isInteger(e)||e<0}_onChipAccordionToggle(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"accKey"),r=this._ds(e,"accKind")||"main";if(this._badIdx(t)||!a)return;let i=r==="text"?`_text_acc_${t}`:`_acc_open_${t}`;r==="main"?this[i]=a:this[i]=this[i]===a?null:a,this.requestUpdate()}_onChipTypeModeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"mode");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);if(r){if(a==="sensor"){let i={...r};delete i.forecast,delete i.forecast_offset,delete i.forecast_precision,this._updateChipAt(t,i);return}if(a==="forecast"){let i=(r.entity||"").toString().trim(),n=this._config&&this._config.weather_entity||"",p=i&&i.startsWith("weather.")?i:n||i,d={...r,forecast:"daily",attribute:"temperature",forecast_offset:1};p&&(d.entity=p),this._updateChipAt(t,d)}}}_onChipForecastTypeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"forecastType");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);r&&this._updateChipAt(t,{...r,forecast:a,forecast_offset:0})}_onChipAnchorSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"anchor");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);r&&this._updateChipAt(t,{...r,position_anchor:a})}_onChipToggleChange(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"key"),r=this._ds(e,"mode")||L.TRUE_DELETE;if(this._badIdx(t)||!a)return;let i=this._getChipByIndex(t);if(!i)return;let n={...i},p=e.target&&e.target.checked===!0;r===L.TRUE_DELETE?p?n[a]=!0:delete n[a]:r===L.FALSE_DELETE?p?delete n[a]:n[a]=!1:r===L.TRUE_FALSE_IF_DEFINED&&(p?n[a]=!0:i[a]!==void 0?n[a]=!1:delete n[a]),this._updateChipAt(t,n)}_onChipActionClick(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"action");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);if(!r)return;let i={...r};if(a==="remove-icon")delete i.icon;else if(a==="set-weather-icon")i.icon="weather";else if(a==="clear-icon-path")delete i.icon_path;else if(a==="reset-styles")for(let n of ct)delete i[n];else return;this._updateChipAt(t,i)}_onChipSegmentedSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"key"),r=this._ds(e,"mode")||"set",i=this._ds(e,"valueType")||"string",n=this._ds(e,"value");if(this._badIdx(t)||!a)return;let p=this._getChipByIndex(t);if(!p)return;let d={...p},_=n;if(i==="number"){let g=Number(n);if(!Number.isFinite(g))return;_=g}else i==="boolean"&&(_=n==="true");r===M.SET_OR_DELETE_EMPTY?_===""?delete d[a]:d[a]=_:r===M.TOGGLE_DELETE_IF_SAME?p[a]===_?delete d[a]:d[a]=_:r===M.BESIDE_OR_DELETE?_==="beside"?d[a]="beside":delete d[a]:r===M.SOLID_OR_DELETE&&_==="solid"?delete d[a]:d[a]=_,this._updateChipAt(t,d)}_commitChips(e){if(!Array.isArray(e)||e.length===0){this._patch({},{strip:["chips"]});return}this._patch({chips:e})}_chipLabel=e=>!e||!e.name?"":o(ht[e.name]||e.name);_chipHelper=e=>{if(!(!e||!e.name))return Pe[e.name]?o(Pe[e.name]):void 0};_renderChipRow(e,t,a){let r=this._expandedChip===t,i=(e.position||"").toString().toLowerCase()==="custom",n=!!e.forecast,p=e.type||"",_=i?s`<span class="chip-badge-free"
          ><ha-icon icon="mdi:cursor-move"></ha-icon
        ></span>`:s`<span class="chip-badge-row"
          ><ha-icon icon="mdi:view-grid-outline"></ha-icon
        ></span>`;if(!r)return this._renderListRow({idx:t,total:a,expanded:r,body:"",badge:_,title:this._chipTitle(e),subtitle:this._chipValuePreview(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)});let g=!!(e.entity||"").toString().trim(),m=(e.entity||"").toString().trim(),f=(e.name_sensor||"").toString().trim(),$=n&&m&&!m.startsWith("weather."),C=this[`_acc_open_${t}`]||null,w=l=>this._updateChipAt(t,l),u=l=>s`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${l}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${h=>{h.stopPropagation(),w(h.detail&&h.detail.value||{})}}
      ></ha-form>`,E=(l,h,b)=>s`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${[{name:l,selector:b}]}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${k=>{k.stopPropagation();let y={...k.detail&&k.detail.value||{}};y[l]!==e[l]&&delete y[h],w(y)}}
      ></ha-form>`,x=(l,h,b)=>s`<div class="css-field">
        <span class="css-field-label">${o(h)}</span>
        <input
          type="text"
          placeholder=${o(b)}
          .value=${e[l]!==void 0?String(e[l]):""}
          @change=${k=>{let S=k.target.value,y={...e};l==="unit_format"||l==="sub_value_format"?y[l]=S:S.trim()?y[l]=S.trim():delete y[l],w(y)}}
        />
      </div>`,ie=s`<div class="chip-type-picker">
      <button
        type="button"
        class="chip-type-btn ${n?"":"active"}"
        data-chip-idx=${t}
        data-mode="sensor"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${n?"":"active-icon"}"
          icon="mdi:gauge"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${o("Sensor")}</span
          ><span class="chip-type-desc">${o("Live entity value")}</span>
        </div>
      </button>
      <button
        type="button"
        class="chip-type-btn ${n?"active":""}"
        data-chip-idx=${t}
        data-mode="forecast"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${n?"active-icon":""}"
          icon="mdi:calendar-clock"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${o("Forecast")}</span
          ><span class="chip-type-desc">${o("Weather forecast")}</span>
        </div>
      </button>
    </div>`,oe=n?u([{name:"entity",selector:{entity:{domain:"weather"}}}]):s`${E("entity","attribute",{entity:{}})}
        ${m?u([{name:"attribute",selector:{attribute:{entity_id:m}}}]):""}`,q=g?"":s`<div class="chip-nudge info">
          <ha-icon
            icon="mdi:information-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${o("Pick an entity for this chip.")}
        </div>`,pt=$?s`<div class="chip-nudge warning">
          <ha-icon
            icon="mdi:alert-circle-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${o("Forecast requires a weather entity.")}
        </div>`:"",Oe=e.attribute||"condition",G=parseInt(e.forecast_offset,10)||0,ut=(e.icon||"").toString().trim().toLowerCase()==="weather",gt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide icon")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_icon"
            data-mode=${L.TRUE_DELETE}
            .checked=${e.hide_icon===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_icon?"":s`${ut?s`<div class="weather-icon-active">
                  <ha-icon
                    icon="mdi:weather-partly-cloudy"
                    style="--mdc-icon-size:20px;color:var(--primary-color)"
                  ></ha-icon>
                  <div class="weather-icon-active-text">
                    <span>${o("Weather icon")}</span>
                    <span class="weather-icon-active-sub"
                      >${o(n?"Matches forecast":"Matches weather")}</span
                    >
                  </div>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    data-chip-idx=${t}
                    data-action="remove-icon"
                    @click=${this._onChipActionClick}
                  >
                    ${o("Remove")}
                  </button>
                </div>`:s`<div class="icon-combo">
                  <ha-form
                    style="flex:1;min-width:0"
                    .hass=${this.hass}
                    .data=${{icon:e.icon||""}}
                    .schema=${[{name:"icon",selector:{icon:{}}}]}
                    .computeLabel=${()=>""}
                    @value-changed=${l=>{l.stopPropagation(),w({...e,icon:l.detail&&l.detail.value&&l.detail.value.icon||""})}}
                  ></ha-form>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    title=${o("Use dynamic weather icon")}
                    data-chip-idx=${t}
                    data-action="set-weather-icon"
                    @click=${this._onChipActionClick}
                  >
                    <ha-icon
                      icon="mdi:weather-partly-cloudy"
                      style="--mdc-icon-size:18px"
                    ></ha-icon>
                  </button>
                </div>`}
            <div class="clearable-field">
              ${u([{name:"icon_path",selector:{text:{}}}])}
              ${e.icon_path?s`<button
                    type="button"
                    class="clear-btn"
                    title=${o("Clear")}
                    data-chip-idx=${t}
                    data-action="clear-icon-path"
                    @click=${this._onChipActionClick}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>`:""}
            </div>
            <div class="css-field-row cols-2">
              ${x("icon_size","Size","auto")}
              ${x("icon_padding","Padding","auto")}
            </div>
            <div class="toggle-group">
              <label class="toggle-row">
                <span>${o("Icon background")}</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="icon_background"
                  data-mode=${L.TRUE_FALSE_IF_DEFINED}
                  .checked=${e.icon_background===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${e.icon_background===!0?this._renderColorPicker("Icon background color",e.icon_background_color||"",(l,h)=>{let b={...e};l?b.icon_background_color=this._serializeColor(l,h):delete b.icon_background_color,w(b)}):""}`}`,_t=(e.overflow||"").toLowerCase()==="marquee",mt=(e.label_overflow||"").toLowerCase()==="marquee",ft=!!(e.sub_value_entity||e.sub_value_attribute),Me=(e.sub_value_entity||"").toString().trim(),bt=this[`_text_acc_${t}`]||null,se=(l,h,b)=>{let k=bt===l;return s`<div class="chip-accordion">
        <div
          class="chip-accordion-head ${k?"open":""}"
          data-chip-idx=${t}
          data-acc-kind="text"
          data-acc-key=${l}
          @click=${this._onChipAccordionToggle}
        >
          <span class="chip-accordion-title">${o(h)}</span>
          <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        ${k?s`<div class="chip-accordion-body">${b}</div>`:""}
      </div>`},vt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_label"
            data-mode=${L.TRUE_DELETE}
            .checked=${e.hide_label===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_label!==!0?s`${u([{name:"name",selector:{text:{}}}])}
            ${E("name_sensor","name_attribute",{entity:{}})}
            ${f?u([{name:"name_attribute",selector:{attribute:{entity_id:f}}}]):n&&!e.name?s`<ha-form
                    .hass=${this.hass}
                    .data=${{name_attribute:e.name_attribute||""}}
                    .schema=${[{name:"name_attribute",selector:{select:{mode:"dropdown",options:O(ae)}}}]}
                    .computeLabel=${()=>o("Forecast attribute")}
                    @value-changed=${l=>{l.stopPropagation();let h=l.detail&&l.detail.value&&l.detail.value.name_attribute,b={...e};h?b.name_attribute=h:delete b.name_attribute,w(b)}}
                  ></ha-form>`:""}
            <div class="css-field-row cols-2">
              ${x("label_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${o("Weight")}
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(l=>s`<button
                    type="button"
                    role="radio"
                    class=${(e.label_weight||"")===l.value?"active":""}
                    data-chip-idx=${t}
                    data-key="label_weight"
                    data-mode=${M.SET_OR_DELETE_EMPTY}
                    data-value=${l.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(l.label)}
                  </button>`)}
            </div>
            ${u([{name:"label_overflow",selector:{select:{mode:"dropdown",options:O(P.chip_overflow)}}}])}`:""}`,yt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_value"
            data-mode=${L.TRUE_DELETE}
            .checked=${e.hide_value===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        ${!e.hide_value&&!n&&this.hass&&this.hass.states[m]&&this.hass.states[m].attributes&&(this.hass.states[m].attributes.temperature_unit||(this.hass.states[m].attributes.unit_of_measurement||"").match(/^°/))?s`<label class="toggle-row">
              <span>${o("Fancy unit")}</span>
              <ha-switch
                data-chip-idx=${t}
                data-key="fancy_unit"
                data-mode=${L.TRUE_DELETE}
                .checked=${e.fancy_unit===!0}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>`:""}
      </div>
      ${e.hide_value!==!0?s`${pe(e,this.hass)?s`<ha-form
                  .hass=${this.hass}
                  .data=${{bearing_format:e.bearing_format||"degrees",bearing_icon:e.bearing_icon||"icon"}}
                  .schema=${[{name:"bearing_format",selector:{select:{mode:"dropdown",options:O(P.bearing_format)}}},{name:"bearing_icon",selector:{select:{mode:"dropdown",options:O(P.bearing_icon)}}}]}
                  .computeLabel=${this._chipLabel}
                  @value-changed=${l=>{l.stopPropagation();let h=l.detail&&l.detail.value||{},b={...e,bearing_format:h.bearing_format||"degrees"};h.bearing_icon&&h.bearing_icon!=="icon"?b.bearing_icon=h.bearing_icon:delete b.bearing_icon,w(b)}}
                ></ha-form>
                ${e.attribute==="wind_bearing"?s`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${o("Show wind speed")}</span>
                        <ha-switch
                          data-chip-idx=${t}
                          data-key="bearing_speed"
                          data-mode=${L.TRUE_DELETE}
                          .checked=${e.bearing_speed===!0}
                          @change=${this._onChipToggleChange}
                        ></ha-switch>
                      </label>
                    </div>`:""}`:""}
            ${u([{name:"unit_format",selector:{text:{}}}])}
            ${!n&&m?s`${(()=>{let l=e.value_precision!==void 0&&e.value_precision!==null,h=l?Math.min(2,Math.max(0,parseInt(e.value_precision,10)||0)):1,b=Math.round(h/2*100);return s`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${o("Auto (Home Assistant)")}</span>
                        <ha-switch
                          .checked=${!l}
                          @change=${k=>{if(k.target.checked){let S={...e};delete S.value_precision,w(S)}else w({...e,value_precision:h})}}
                        ></ha-switch>
                      </label>
                    </div>
                    <div class="awc-slider">
                      <div class="awc-slider-head">
                        <span class="awc-slider-label">${o("Decimal places")}</span>
                        <input
                          type="number"
                          class="awc-slider-num"
                          min="0"
                          max="2"
                          step="1"
                          placeholder=${l?"":o("Auto")}
                          .value=${l?String(h):""}
                          @change=${k=>{let S=k.target.value.trim();if(S===""){let A={...e};delete A.value_precision,w(A);return}let y=Math.min(2,Math.max(0,parseInt(S,10)||0)),T=k.target.closest(".awc-slider").querySelector(".awc-slider-range");T&&(T.value=y,T.style.setProperty("--awc-slider-pct",Math.round(y/2*100)+"%")),w({...e,value_precision:y})}}
                        />
                      </div>
                      <input
                        type="range"
                        class="awc-slider-range"
                        min="0"
                        max="2"
                        step="1"
                        .value=${String(h)}
                        style="--awc-slider-pct:${b}%"
                        @input=${k=>{let S=parseInt(k.target.value,10),y=Math.round(S/2*100);k.target.style.setProperty("--awc-slider-pct",y+"%");let T=k.target.closest(".awc-slider").querySelector(".awc-slider-num");T&&(T.value=S)}}
                        @change=${k=>w({...e,value_precision:parseInt(k.target.value,10)})}
                      />
                      <div class="awc-slider-helper">
                        ${o(l?"Manual override":"Following Home Assistant display precision")}
                      </div>
                    </div>`})()}`:""}
            <div class="css-field-row cols-2">
              ${x("text_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${o("Weight")}
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(l=>s`<button
                    type="button"
                    role="radio"
                    class=${(e.value_weight||"")===l.value?"active":""}
                    data-chip-idx=${t}
                    data-key="value_weight"
                    data-mode=${M.SET_OR_DELETE_EMPTY}
                    data-value=${l.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(l.label)}
                  </button>`)}
            </div>
            ${u([{name:"overflow",selector:{select:{mode:"dropdown",options:O(P.chip_overflow)}}}])}`:""}`,wt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_sub_value"
            data-mode=${L.TRUE_DELETE}
            .checked=${e.hide_sub_value===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_sub_value!==!0?s`${E("sub_value_entity","sub_value_attribute",{entity:{}})}
          ${Me?u([{name:"sub_value_attribute",selector:{attribute:{entity_id:Me}}}]):n?s`<ha-form
                  .hass=${this.hass}
                  .data=${{sub_value_attribute:e.sub_value_attribute||""}}
                  .schema=${[{name:"sub_value_attribute",selector:{select:{mode:"dropdown",options:O(ae)}}}]}
                  .computeLabel=${()=>o("Forecast attribute")}
                  @value-changed=${l=>{l.stopPropagation();let h=l.detail&&l.detail.value&&l.detail.value.sub_value_attribute,b={...e};h?b.sub_value_attribute=h:delete b.sub_value_attribute,w(b)}}
                ></ha-form>`:""}
          ${ft?s`<div class="css-field-row cols-2">
                  ${x("sub_value_format","Unit","")}
                  ${x("sub_value_size","Size","auto")}
                </div>
                <div
                  class="segmented segmented-compact"
                  role="radiogroup"
                  aria-label=${o("Weight")}
                >
                  ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(l=>s`<button
                        type="button"
                        role="radio"
                        class=${(e.sub_value_weight||"")===l.value?"active":""}
                        data-chip-idx=${t}
                        data-key="sub_value_weight"
                        data-mode=${M.SET_OR_DELETE_EMPTY}
                        data-value=${l.value}
                        @click=${this._onChipSegmentedSelect}
                      >
                        ${o(l.label)}
                      </button>`)}
                </div>
                <div class="segmented" role="radiogroup" aria-label="Position">
                  ${[{value:"below",label:"Below"},{value:"beside",label:"Beside value"}].map(l=>{let h=e.sub_value_position==="beside"?"beside":"below";return s`<button
                      type="button"
                      role="radio"
                      class=${h===l.value?"active":""}
                      data-chip-idx=${t}
                      data-key="sub_value_position"
                      data-mode=${M.BESIDE_OR_DELETE}
                      data-value=${l.value}
                      @click=${this._onChipSegmentedSelect}
                    >
                      ${o(l.label)}
                    </button>`})}
                </div>
                ${u([{name:"sub_value_overflow",selector:{select:{mode:"dropdown",options:O(P.chip_overflow)}}}])}`:""}`:""}`,$t=(e.sub_value_overflow||"").toLowerCase()==="marquee",Ie=_t||mt||$t?s`<div class="toggle-group">
              <label class="toggle-row">
                <span>${o("Right-to-left")}</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="marquee_rtl"
                  data-mode=${L.TRUE_DELETE}
                  .checked=${e.marquee_rtl===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${(()=>{let l=parseFloat(e.marquee_speed)||30;return this._renderChipSlider(e,w,"marquee_speed","Scroll speed",5,100,5,l,30)})()}`:null,xt=s`${se("text_label","Label",vt)}
    ${se("text_value","Value",yt)}
    ${se("text_sub","Sub value",wt)}
    ${Ie?se("text_marquee","Scrolling",Ie):""}`,kt=s`<div
        class="segmented"
        role="radiogroup"
        aria-label=${o("Chip layout")}
      >
        ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(l=>s`<button
              type="button"
              role="radio"
              class=${e.style===l.value?"active":""}
              data-chip-idx=${t}
              data-key="style"
              data-mode=${M.TOGGLE_DELETE_IF_SAME}
              data-value=${l.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${o(l.label)}
            </button>`)}
      </div>
      <div class="segmented" role="radiogroup" aria-label="Alignment">
        ${[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}].map(l=>s`<button
              type="button"
              role="radio"
              class=${e.align===l.value?"active":""}
              data-chip-idx=${t}
              data-key="align"
              data-mode=${M.TOGGLE_DELETE_IF_SAME}
              data-value=${l.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${o(l.label)}
            </button>`)}
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Round shape")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="chip_round"
            data-mode=${L.TRUE_DELETE}
            .checked=${e.chip_round===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>${o("Background")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="background"
            data-mode=${L.FALSE_DELETE}
            .checked=${e.background!==!1}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.background!==!1?this._renderColorPicker("Background color",e.background_color||"",(l,h)=>{let b={...e};l?b.background_color=this._serializeColor(l,h):delete b.background_color,w(b)}):""}
      <div class="settings-group">
        <div class="settings-group-label">${o("Chip Layout")}</div>
        <div class="css-field-row cols-2">
          ${x("width","Width","e.g. 200px")}
          ${x("height","Height","e.g. 40px")}
        </div>
        <div class="css-field-row cols-2">
          ${x("padding","Padding","auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${x("inner_gap","Icon/text gap","auto")}
          ${x("text_gap","Label/value gap","auto")}
        </div>
      </div>`,Ne=l=>{let h=l+"_",b=Array.isArray(e[h+"thresholds"])?e[h+"thresholds"]:[],k=l==="ring"?s`<div class="css-field-row cols-2">
              ${x("ring_width","Thickness","4")}
              ${x("ring_gap","Gap","3")}
            </div>`:s`<div class="css-field-row cols-2">
              ${x("bar_height","Thickness","4")}
              ${x("bar_gap","Gap","4")}
            </div>`,S=(e.gauge_entity||"").toString().trim();return s`<div class="css-field-row cols-2">
          ${x(h+"min","Min","0")}
          ${x(h+"max","Max","100")}
        </div>
        ${k}
        ${this._renderColorPicker(l==="ring"?"Ring color":"Bar color",e[h+"color"]||"",(y,T)=>{let A={...e};y?A[h+"color"]=this._serializeColor(y,T):delete A[h+"color"],w(A)})}
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${o(l==="ring"?"Ring entity":"Bar entity")}</span>
          </summary>
          <div class="disclosure-body">
            <div
              style="font-size:var(--awc-e-f-meta);color:var(--secondary-text-color);line-height:1.4"
            >
              ${o(l==="ring"?"Use a different entity for the ring value instead of the chip's main entity.":"Use a different entity for the bar value instead of the chip's main entity.")}
            </div>
            ${E("gauge_entity","gauge_attribute",{entity:{}})}
            ${S?u([{name:"gauge_attribute",selector:{attribute:{entity_id:S}}}]):n?s`<ha-form
                    .hass=${this.hass}
                    .data=${{gauge_attribute:e.gauge_attribute||""}}
                    .schema=${[{name:"gauge_attribute",selector:{select:{mode:"dropdown",options:O(ae)}}}]}
                    .computeLabel=${()=>o("Forecast attribute")}
                    @value-changed=${y=>{y.stopPropagation();let T=y.detail&&y.detail.value&&y.detail.value.gauge_attribute,A={...e};T?A.gauge_attribute=T:delete A.gauge_attribute,w(A)}}
                  ></ha-form>`:""}
          </div>
        </details>
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${o("Color thresholds")}</span>
          </summary>
          <div class="disclosure-body">
            <div
              class="segmented"
              role="radiogroup"
              aria-label=${o("Threshold mode")}
            >
              ${[{value:"solid",label:"Solid"},{value:"segments",label:"Segments"},{value:"gradient",label:"Gradient"}].map(y=>s`<button
                    type="button"
                    role="radio"
                    class=${(e[h+"threshold_mode"]||"solid")===y.value?"active":""}
                    data-chip-idx=${t}
                    data-key=${h+"threshold_mode"}
                    data-mode=${M.SOLID_OR_DELETE}
                    data-value=${y.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(y.label)}
                  </button>`)}
            </div>
            ${b.map((y,T)=>s`<div class="ring-threshold-row">
                  <span class="threshold-label">≥</span>
                  <input
                    type="text"
                    placeholder=${o("value")}
                    .value=${String(y.value!=null?y.value:"")}
                    @change=${A=>{let B=[...b];B[T]={...B[T],value:A.target.value.trim()},w({...e,[h+"thresholds"]:B})}}
                  />
                  <input
                    type="color"
                    class="chip-color-swatch"
                    .value=${y.color||"#ff0000"}
                    @input=${A=>{let B=[...b];B[T]={...B[T],color:A.target.value},w({...e,[h+"thresholds"]:B})}}
                  />
                  <button
                    type="button"
                    class="ring-threshold-del"
                    title="Remove"
                    @click=${()=>{let A=[...b];A.splice(T,1),w({...e,[h+"thresholds"]:A.length?A:void 0})}}
                  >
                    <ha-icon
                      icon="mdi:close"
                      style="--mdc-icon-size:14px"
                    ></ha-icon>
                  </button>
                </div>`)}
            <button
              type="button"
              class="ring-threshold-add"
              @click=${()=>{let y=[...b,{value:"",color:"#ff9800"}];w({...e,[h+"thresholds"]:y})}}
            >
              <ha-icon icon="mdi:plus" style="--mdc-icon-size:14px"></ha-icon>
              ${o("Add threshold")}
            </button>
          </div>
        </details>`},St=["min","max","color","thresholds","threshold_mode"],Ct=s`<div
        class="segmented"
        role="radiogroup"
        aria-label=${o("Chip type")}
      >
        ${[{value:"",label:"Default"},{value:"ring",label:"Ring"},{value:"bar",label:"Bar"}].map(l=>s`<button
              type="button"
              role="radio"
              class=${p===l.value?"active":""}
              @click=${()=>{let h={...e},b=p;if(l.value?h.type=l.value:delete h.type,b&&l.value&&b!==l.value)for(let k of St){let S=b+"_"+k,y=l.value+"_"+k;h[S]!==void 0&&h[y]===void 0&&(h[y]=h[S])}w(h)}}
            >
              ${o(l.label)}
            </button>`)}
      </div>
      ${p==="ring"?Ne("ring"):""}
      ${p==="bar"?Ne("bar"):""}`,Et=["top-left","top-center","top-right","left","center","right","bottom-left","bottom-center","bottom-right"],At=e.position_anchor||"top-left",zt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Free positioning")}</span>
          <ha-switch
            .checked=${i}
            @change=${l=>{let h={...e};l.target.checked?(h.position="custom",h.position_anchor||(h.position_anchor="top-left")):["position","position_anchor","position_x","position_y"].forEach(b=>delete h[b]),w(h)}}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>${o("Behind animations")}</span>
          <ha-switch
            .checked=${e.behind_effects===!0}
            @change=${l=>{let h={...e};l.target.checked?h.behind_effects=!0:delete h.behind_effects,w(h)}}
          ></ha-switch
        ></label>
      </div>
      ${i?s`<div>
            <div class="free-pos-layout">
              <div>
                <div class="settings-group-label">${o("Position")}</div>
                <div
                  class="anchor-grid"
                  role="radiogroup"
                  aria-label="Position"
                >
                  ${Et.map(l=>s`<button
                        type="button"
                        role="radio"
                        class="anchor-cell ${At===l?"active":""}"
                        title=${l}
                        aria-label=${l}
                        data-chip-idx=${t}
                        data-anchor=${l}
                        @click=${this._onChipAnchorSelect}
                      ></button>`)}
                </div>
              </div>
              <div>
                <div class="settings-group-label">${o("Offset")}</div>
                <div class="offset-fields">
                  <div class="offset-field">
                    <span class="offset-field-label">X</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(e.position_x||"")}
                      @change=${l=>{let h={...e},b=l.target.value.trim();b?h.position_x=b:delete h.position_x,w(h)}}
                    />
                  </div>
                  <div class="offset-field">
                    <span class="offset-field-label">Y</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(e.position_y||"")}
                      @change=${l=>{let h={...e},b=l.target.value.trim();b?h.position_y=b:delete h.position_y,w(h)}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> `:""}`,Tt=s`${u([{name:"tap_action",selector:{ui_action:{}}}])}`,Ft=n&&!$?s`<div class="chip-forecast-box">
            <div class="chip-forecast-header">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon> ${o("Forecast")}
            </div>
            <div class="chip-forecast-body">
              <div
                class="segmented"
                role="radiogroup"
                aria-label=${o("Forecast type")}
              >
                ${[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"}].map(l=>s`<button
                      type="button"
                      role="radio"
                      class=${e.forecast===l.value?"active":""}
                      data-chip-idx=${t}
                      data-forecast-type=${l.value}
                      @click=${this._onChipForecastTypeSelect}
                    >
                      ${o(l.label)}
                    </button>`)}
              </div>
              ${(()=>{let l=e.forecast==="hourly"?23:6,h=e.forecast==="hourly"?o("Hours ahead"):o("Days ahead"),b=e.forecast==="hourly"?G===0?o("Now"):`+${G}h`:G===0?o("Today"):G===1?o("Tomorrow"):o("+{n} days",{n:G});return this._renderChipSlider(e,w,"forecast_offset",h,0,l,1,G,0,b)})()}
              <ha-form
                .hass=${this.hass}
                .data=${{attribute:Oe}}
                .schema=${[{name:"attribute",selector:{select:{mode:"dropdown",options:O(ae)}}}]}
                .computeLabel=${()=>o("Show")}
                @value-changed=${l=>{l.stopPropagation();let h=l.detail&&l.detail.value&&l.detail.value.attribute;h!==void 0&&w({...e,attribute:h})}}
              ></ha-form>
              ${Oe!=="condition"&&!e.hide_value?s`${(()=>{let l=e.forecast_precision!==void 0?e.forecast_precision:1;return this._renderChipSlider(e,w,"forecast_precision","Decimal places",0,2,1,l,0)})()}`:""}
            </div>
          </div>`:null,Pt=ct.some(l=>e[l]!==void 0&&e[l]!==""),ue=[{key:"data",title:"Data",body:s`${ie} ${oe} ${q} ${pt}
        ${Ft||""}`},{key:"text",title:"Text",body:xt},{key:"icon",title:"Icon",body:gt},{key:"look",title:"Look",body:s`<div class="settings-group-label">${o("Type")}</div>
          ${Ct}
          <div class="settings-group-label">${o("Layout")}</div>
          ${kt}`},{key:"position",title:"Position",body:zt},{key:"tap",title:"Tap",body:Tt}],ge=ue.find(l=>l.key===C)||ue[0],Lt=s`<div class="chip-tabs" role="tablist">
        ${ue.map(l=>s`<button
              type="button"
              role="tab"
              class="chip-tab ${l===ge?"active":""}"
              aria-selected=${l===ge?"true":"false"}
              data-chip-idx=${t}
              data-acc-kind="main"
              data-acc-key=${l.key}
              @click=${this._onChipAccordionToggle}
            >
              ${o(l.title)}
            </button>`)}
      </div>
      <div class="chip-tab-body">${ge.body}</div>
    ${Pt?s`<button
          type="button"
          class="add-card-btn"
          style="border-style:solid;border-color:rgba(var(--rgb-error-color,211,47,47),0.35);color:var(--error-color);margin-top:var(--awc-e-s3)"
          data-chip-idx=${t}
          data-action="reset-styles"
          @click=${this._onChipActionClick}
        >
          <ha-icon icon="mdi:restore"></ha-icon><span>${o("Reset all styles")}</span>
        </button>`:""}`;return this._renderListRow({idx:t,total:a,expanded:r,body:Lt,badge:_,title:this._chipTitle(e),subtitle:this._chipValuePreview(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)})}_parseColor(e){let t=(e||"").toString().trim(),a=t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);return a?{hex:`#${parseInt(a[1]).toString(16).padStart(2,"0")}${parseInt(a[2]).toString(16).padStart(2,"0")}${parseInt(a[3]).toString(16).padStart(2,"0")}`,opacity:a[4]!==void 0?parseFloat(a[4]):1,hasColor:!0}:/^#[0-9a-f]{3,8}$/i.test(t)?{hex:t.slice(0,7),opacity:1,hasColor:!0}:{hex:"#ffffff",opacity:0,hasColor:!1}}_serializeColor(e,t){if(t>=1)return e;let a=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16);return`rgba(${a},${r},${i},${parseFloat(t.toFixed(2))})`}_renderColorPicker(e,t,a){let{hex:r,opacity:i,hasColor:n}=this._parseColor(t);return s`<div class="chip-color-box">
      <div class="chip-color-row">
        <ha-icon
          icon="mdi:palette-outline"
          style="--mdc-icon-size:15px;color:var(--secondary-text-color);flex-shrink:0"
        ></ha-icon>
        <span class="chip-color-label">${o(e)}</span>
        <input
          type="color"
          class="chip-color-swatch"
          .value=${r}
          @input=${p=>a(p.target.value,i||1)}
        />
        ${n?s`<button
              type="button"
              class="chip-color-clear"
              title=${o("Clear color")}
              @click=${()=>a("",1)}
            >
              <ha-icon icon="mdi:close" style="--mdc-icon-size:14px"></ha-icon>
            </button>`:""}
      </div>
      ${n?s`<div class="chip-color-opacity-row">
            <span class="chip-color-opacity-label">${o("Opacity")}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              class="chip-color-opacity"
              .value=${String(i)}
              @input=${p=>a(r,parseFloat(p.target.value))}
            />
            <span class="chip-color-opacity-val"
              >${Math.round(i*100)}%</span
            >
          </div> `:""}
    </div>`}_renderGlobalColorPicker(e,t){let a=(this._config[e]||"").toString().trim();return this._renderColorPicker(t,a,(r,i)=>{this._updateField(e,r?this._serializeColor(r,i):"")})}_renderSlider(e,t,a,r,i,n){let p=Te(this._config),d=this._formData[e]!=null?this._formData[e]:p[e]!=null?p[e]:dt[e]!=null?dt[e]:a,_=parseFloat(d),g=Number.isFinite(_)?_:a,m=Math.round((g-a)/(r-a)*100);return this._renderSliderMarkup({label:t,min:a,max:r,step:i,val:g,pct:m,helper:n,onNumChange:f=>{let $=Math.min(r,Math.max(a,parseFloat(f.target.value)||a));this._syncSliderRange(f,$,a,r),this._updateField(e,$)},onRangeInput:f=>{this._syncSliderNum(f,parseFloat(f.target.value),a,r)},onRangeChange:f=>this._updateField(e,parseFloat(f.target.value))})}_renderChipSlider(e,t,a,r,i,n,p,d,_,g){let m=Math.round((d-i)/(n-i)*100);return this._renderSliderMarkup({label:r,min:i,max:n,step:p,val:d,pct:m,helper:g,onNumChange:f=>{let $=Math.min(n,Math.max(i,parseInt(f.target.value,10)||_));this._syncSliderRange(f,$,i,n),t({...e,[a]:$})},onRangeInput:f=>{this._syncSliderNum(f,parseInt(f.target.value,10),i,n)},onRangeChange:f=>t({...e,[a]:parseInt(f.target.value,10)})})}_syncSliderRange(e,t,a,r){let i=e.target.closest(".awc-slider").querySelector(".awc-slider-range");i&&(i.value=t,i.style.setProperty("--awc-slider-pct",Math.round((t-a)/(r-a)*100)+"%"))}_syncSliderNum(e,t,a,r){e.target.style.setProperty("--awc-slider-pct",Math.round((t-a)/(r-a)*100)+"%");let i=e.target.closest(".awc-slider").querySelector(".awc-slider-num");i&&(i.value=t)}_renderSliderMarkup({label:e,min:t,max:a,step:r,val:i,pct:n,onNumChange:p,onRangeInput:d,onRangeChange:_,helper:g}){return s`<div class="awc-slider">
      <div class="awc-slider-head">
        <span class="awc-slider-label">${o(e)}</span>
        <input
          type="number"
          class="awc-slider-num"
          min=${t}
          max=${a}
          step=${r}
          .value=${String(i)}
          @change=${p}
        />
      </div>
      <input
        type="range"
        class="awc-slider-range"
        min=${t}
        max=${a}
        step=${r}
        .value=${String(i)}
        style="--awc-slider-pct:${n}%"
        @input=${d}
        @change=${_}
      />
      ${g?s`<div class="awc-slider-helper">${o(g)}</div>`:""}
    </div>`}_renderCompactField(e,t){let a=String(this._formData[e]||""),r=o(v[e]||e),n=e==="card_height"&&!!this._cardHeightError;return s`<div class="compact-field ${n?"invalid":""}">
      <span class="compact-field-label">${r}</span>
      <input
        type="text"
        placeholder=${o(t)}
        data-field=${e}
        .value=${a}
        @change=${this._onRawFieldChange}
      />
      ${n?s`<div class="compact-field-hint error">
            ${this._cardHeightError}
          </div>`:""}
    </div>`}_renderChipsEditor(){let e=this._formData,t=this._getChips(),a=(e.chip_area_layout||"wrap").toString().toLowerCase(),r=a==="grid",i=a==="horizontal-scroll"||a==="vertical-scroll",n=(e.chip_area_align||"start").toString().toLowerCase(),p=(e.chip_style||"inline").toString().toLowerCase(),d=e.card_background_style||"frosted",_=!!e.chip_area_background,g=(u,E,x)=>s`<div class="css-field">
        <span class="css-field-label">${o(E)}</span>
        <input
          type="text"
          placeholder=${o(x)}
          data-field=${u}
          .value=${String(e[u]||"")}
          @change=${this._onRawFieldChange}
        />
      </div>`,m={wrap:te`<rect x="2" y="4" width="10" height="6" rx="2"/><rect x="15" y="4" width="10" height="6" rx="2"/><rect x="28" y="4" width="10" height="6" rx="2"/><rect x="2" y="14" width="10" height="6" rx="2"/>`,grid:te`<rect x="2" y="4" width="12" height="6" rx="2"/><rect x="16" y="4" width="12" height="6" rx="2"/><rect x="30" y="4" width="12" height="6" rx="2"/><rect x="2" y="14" width="12" height="6" rx="2"/><rect x="16" y="14" width="12" height="6" rx="2"/>`,"horizontal-scroll":te`<rect x="2" y="10" width="10" height="6" rx="2"/><rect x="15" y="10" width="10" height="6" rx="2"/><rect x="28" y="10" width="10" height="6" rx="2"/><rect x="41" y="10" width="3" height="6" rx="1"/>`,"vertical-scroll":te`<rect x="16" y="2" width="12" height="6" rx="2"/><rect x="16" y="10" width="12" height="6" rx="2"/><rect x="16" y="18" width="12" height="3" rx="1"/>`},f=s`<div class="chip-area-top">
        ${this._renderPositionGrid("chip_area_position",re.chip_area_position)}
        <div class="chip-area-layout">
          <div class="grid-picker-label">${o(v.chip_area_layout)}</div>
          <div class="layout-picker" role="radiogroup">
            ${P.chip_area_layout.map(u=>s`<button
                  type="button"
                  role="radio"
                  class=${a===u.value?"active":""}
                  data-field="chip_area_layout"
                  data-value=${u.value}
                  @click=${this._onSegmentedFieldSelect}
                >
                  <svg viewBox="0 0 44 24" aria-hidden="true">
                    ${m[u.value]}
                  </svg>
                  <span>${o(u.label)}</span>
                </button>`)}
          </div>
        </div>
      </div>
      ${r?this._renderSlider("chip_area_columns",v.chip_area_columns,1,12,1):""}
      ${i?this._renderSlider("chip_area_scroll_count",v.chip_area_scroll_count,1,10,1):""}
      <div class="settings-group">
        <div class="settings-group-label">${o(v.chip_style)}</div>
        <div class="segmented" role="radiogroup" aria-label=${o("Chip style")}>
          ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(u=>s`<button
                type="button"
                role="radio"
                class=${p===u.value?"active":""}
                data-field="chip_style"
                data-value=${u.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(u.label)}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o("Chip background")}</div>
        <div class="segmented" role="radiogroup" aria-label=${o("Background")}>
          <button
            type="button"
            role="radio"
            class=${_?"":"active"}
            data-bg-mode="off"
            @click=${this._onChipAreaBackgroundModeSelect}
          >
            ${o("Off")}
          </button>
          ${[{value:"frosted",label:"Frosted"},{value:"contrast",label:"Contrast"},{value:"theme",label:"Theme"}].map(u=>s`<button
                type="button"
                role="radio"
                class=${_&&d===u.value?"active":""}
                data-bg-mode=${u.value}
                @click=${this._onChipAreaBackgroundModeSelect}
              >
                ${o(u.label)}
              </button>`)}
        </div>
        <div class="composite-helper">${o(F.card_background_style)}</div>
      </div>`,$=s`<div class="settings-group">
        <div class="section-title">${o("Size")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_area_width",v.chip_area_width,"auto")}
          ${i?g("chip_area_height",v.chip_area_height,"auto"):""}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Arrangement")}</div>
        <div class="field-group">
          ${this._renderToggleGroup([{key:"chip_area_grouped",label:v.chip_area_grouped},...i?[{key:"chip_area_full_width",label:v.chip_area_full_width}]:[]])}
          ${e.chip_area_grouped===!0?this._renderToggleGroup([{key:"chip_area_separator",label:v.chip_area_separator}]):""}
        </div>
        <div class="settings-group-label">${o("Content alignment")}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${o("Content alignment")}
          style="flex-wrap:nowrap"
        >
          ${P.chip_area_align.map(u=>s`<button
                type="button"
                role="radio"
                class=${n===u.value?"active":""}
                data-field="chip_area_align"
                data-value=${u.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(u.label)}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_area_gap",v.chip_area_gap,"8px")}
          ${g("chip_area_padding",v.chip_area_padding,"0")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_gap",v.chip_gap,"6px")}
          ${g("chip_text_gap",v.chip_text_gap,"0.35em")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Sizes")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_text_size",v.chip_text_size,"auto")}
          ${g("chip_label_size",v.chip_label_size,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_icon_size",v.chip_icon_size,"auto")}
          ${g("chip_icon_padding",v.chip_icon_padding,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_padding",v.chip_padding,"auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Colors")}</div>
        <div class="settings-group-label">${o(v.chip_icon_background)}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${o(v.chip_icon_background)}
        >
          ${[{value:void 0,label:"Default"},{value:!0,label:"On"},{value:!1,label:"Off"}].map(u=>s`<button
                type="button"
                role="radio"
                class=${e.chip_icon_background===u.value||u.value===void 0&&e.chip_icon_background===void 0?"active":""}
                data-field="chip_icon_background"
                data-value=${u.value===void 0?"":String(u.value)}
                data-value-type=${u.value===void 0?"empty":"boolean"}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(u.label)}
              </button>`)}
        </div>
        ${this._renderGlobalColorPicker("chip_background_color","Background color (all chips)")}
        ${this._renderGlobalColorPicker("chip_icon_background_color","Icon background color (all chips)")}
        ${e.chip_area_grouped===!0&&e.chip_area_background===!0?this._renderGlobalColorPicker("chip_area_background_color","Container background color"):""}
      </div>`,C=this._config&&this._config.weather_entity||"",w=[{label:"Temperature",chip:{entity:C,attribute:"temperature",icon:"mdi:thermometer"}},{label:"Humidity",chip:{entity:C,attribute:"humidity",icon:"mdi:water-percent"}},{label:"Wind",chip:{entity:C,attribute:"wind_speed",icon:"mdi:weather-windy"}},{label:"Rain chance",chip:{entity:C,forecast:"daily",attribute:"precipitation_probability",icon:"mdi:umbrella-outline"}},{label:"Tomorrow",chip:{entity:C,forecast:"daily",forecast_offset:1,attribute:"temperature",sub_value_attribute:"templow",icon:"weather"}}];return s` <div class="sensor-list">
        ${t.map((u,E)=>this._renderChipRow(u,E,t.length))}
      </div>
      <button type="button" class="add-chip-btn" @click=${this._addChip}>
        <ha-icon icon="mdi:plus"></ha-icon> <span>${o("Add chip")}</span>
      </button>
      ${C?s`<div class="quick-add">
            <span class="quick-add-label">${o("Quick add:")}</span>
            ${w.map(u=>s`<button
                  type="button"
                  class="quick-add-btn"
                  @click=${()=>this._addQuickChip({name:o(u.label),...u.chip})}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>${o(u.label)}
                </button>`)}
          </div>`:""}
      ${this._renderGroup("Chip area",f)}
      ${this._renderDisclosure("Fine tuning (gaps, sizes, colors)",$)}
      <div class="tip-box">
        <ha-icon icon="mdi:lightbulb-outline"></ha-icon>
        <span
          >${o("SVG icons:")}
          <a
            href="${nt}docs/guides.html#weather-icons"
            target="_blank"
            rel="noopener"
            >${o("How to add them")}</a
          ></span
        >
      </div>`}_addQuickChip(e){let t=[...this._getChips(),e];this._expandedChip=null,this._commitChips(t)}_renderPerformancePanel(){let e=he,t=this._config||{},a=["perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night"],r=typeof t.perf_mode=="string"&&e[t.perf_mode]?t.perf_mode:"default",i=e[r],n=u=>{let E=t[u]!==void 0?t[u]:i[u],x=typeof E=="number"?E:parseFloat(E);return Number.isFinite(x)?x:i[u]},p=["low","default","ultra"].find(u=>a.every(E=>n(E)===e[u][E]))||"custom",d=u=>{this._patch({perf_mode:u},{strip:[...a,"fauna_birds","fauna_planes"]})},_={perf_fps:{24:"Battery saver",30:"Balanced",45:"Smoother",60:"Maximum smoothness"},perf_cloud_quality:{.5:"Simple clouds",1:"Moderate detail",1.5:"Detailed clouds",2:"Maximum detail"},perf_effects:{0:"No weather effects",1:"Rain, snow, lightning, stars",2:"Extra shooting stars and comets"},perf_dpr:{.5:"Low resolution",1:"Standard resolution",1.5:"Sharp rendering",2:"Native resolution"}},g=(u,E,x)=>{let ie=n(u),oe=_[u]&&_[u][ie]||"";return s`<div class="settings-group">
        <div class="settings-group-label">${o(E)}</div>
        <div class="segmented" role="radiogroup" aria-label=${o(E)}>
          ${x.map(q=>s`<button
                type="button"
                role="radio"
                class=${ie===q.value?"active":""}
                data-field=${u}
                data-value=${String(q.value)}
                data-value-type="number"
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(q.label)}
              </button>`)}
        </div>
        ${oe?s`<div class="composite-helper">${o(oe)}</div>`:""}
      </div>`},m=n("perf_effects")<1,f=n("perf_fauna"),$=f>=1&&t.fauna_birds!==!1,C=f>=2&&t.fauna_planes!==!1,w=this._formData;return s`${this._renderIntro("performance","\u201CLow\u201D saves battery and helps older tablets, \u201CUltra\u201D shows everything at full quality. Every effect can be switched off on its own; anything that is off costs nothing.","effects.html#performance")}
      <div class="grid-picker">
        <div class="grid-picker-label">${o(v.perf_mode)}</div>
        <div class="segmented">
          ${[{v:"low",l:"Low"},{v:"default",l:"Default"},{v:"ultra",l:"Ultra"}].map(u=>s`<button
                type="button"
                class=${p===u.v?"active":""}
                @click=${()=>d(u.v)}
              >
                ${o(u.l)}
              </button>`)}
        </div>
        <div class="composite-helper">
          ${o(p==="custom"?"Custom: you changed values of the preset.":F.perf_mode)}
        </div>
      </div>
      ${this._renderGroup("Graphics",s`${g("perf_fps",v.perf_fps,[{value:24,label:"24"},{value:30,label:"30"},{value:45,label:"45"},{value:60,label:"60"}])}
        ${g("perf_cloud_quality",v.perf_cloud_quality,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Ultra"}])}
        ${g("perf_effects",v.perf_effects,[{value:0,label:"Off"},{value:1,label:"Default"},{value:2,label:"Ultra"}])}
        ${g("perf_dpr",v.perf_dpr,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Full"}])}`)}
      ${this._renderGroup("Sky & light",s`${m?s`<div class="info">
                ${o("Effect Quality is Off: sun rays, haze and ground mist are not drawn. Blue hour, golden hour and cloud amount still work.")}
              </div>`:""}
          <div class="toggle-group">
            ${["effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_cloud_coverage"].map(u=>this._renderSwitch(u,!0))}
          </div>`)}
      ${this._renderGroup("Wind",s`<div class="settings-group">
            <div class="settings-group-label">${o(v.wind_style)}</div>
            <div
              class="segmented"
              role="radiogroup"
              aria-label=${o(v.wind_style)}
            >
              ${[{v:"lines",l:"Wind lines"},{v:"flow",l:"Flow field"},{v:"off",l:"Off"}].map(u=>s`<button
                    type="button"
                    role="radio"
                    class=${(t.wind_style||"lines")===u.v?"active":""}
                    data-field="wind_style"
                    data-value=${u.v}
                    @click=${this._onSegmentedFieldSelect}
                  >
                    ${o(u.l)}
                  </button>`)}
            </div>
            <div class="composite-helper">${o(F.wind_style)}</div>
          </div>
          ${this._renderForm([{name:"wind_compass",selector:{select:{mode:"dropdown",options:O(P.wind_compass)}}},...t.wind_compass&&t.wind_compass!=="off"?[{name:"wind_compass_position",selector:{select:{mode:"dropdown",options:O(P.wind_compass_position)}}}]:[]])}
          ${t.wind_compass&&t.wind_compass!=="off"?s`<div class="toggle-group indent">
                ${this._renderSwitch("wind_compass_cardinal",!0)}
                ${this._renderSwitch("wind_compass_degrees",!1)}
                ${this._renderSwitch("wind_compass_speed",!1)}
                ${t.wind_compass!=="pill"?this._renderSwitch("wind_compass_background",!1):""}
              </div>`:""}
          <div class="composite-helper">
            ${o("Wind direction chips can show the compass point too: open the chip under Chips, then Text \u25B8 Value \u25B8 Wind direction as.")}
          </div>`)}
      ${this._renderGroup("Night sky",s`${m?s`<div class="info">
                ${o("Effect Quality is Off, so there are no shooting stars or comets.")}
              </div>`:""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_shooting_stars",!0)}
          </div>
          ${w.effect_shooting_stars!==!1?s`<div class="indent">
                ${this._renderSlider("shooting_star_rate",o(v.shooting_star_rate),.25,3,.25)}
              </div>`:""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_comets",!0)}
          </div>
          ${w.effect_comets!==!1?s`<div class="indent">
                ${this._renderSlider("comet_rate",o(v.comet_rate),.25,3,.25,o(F.comet_rate))}
              </div>`:""}
          ${this._renderSlider("star_animation_speed",o(v.star_animation_speed),0,2,.1)}`)}
      ${this._renderGroup("Birds & planes",s`<div class="sub-box">
            <label class="toggle-row sub-box-head">
              <span
                ><ha-icon icon="mdi:bird"></ha-icon> ${o("Birds")}</span
              >
              <ha-switch
                data-fauna="birds"
                .checked=${$}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${$?s`${this._renderSlider("fauna_bird_density",o("Frequency"),.5,2,.1)}
                ${this._renderSlider("bird_animation_speed",o("Speed"),0,3,.1,o(F.bird_animation_speed))}
                ${this._renderSlider("fauna_bird_flock_size",o("Birds per flock"),1,20,1)}
                <div class="toggle-group">
                  ${this._renderSwitch("fauna_birds_at_night",!0)}
                </div>`:""}
          </div>
          <div class="sub-box">
            <label class="toggle-row sub-box-head">
              <span
                ><ha-icon icon="mdi:airplane"></ha-icon> ${o("Planes")}</span
              >
              <ha-switch
                data-fauna="planes"
                .checked=${C}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${C?s`${this._renderSlider("fauna_plane_density",o("Frequency"),.5,2,.1)}
                ${this._renderSlider("fauna_plane_speed",o("Speed"),.25,3,.05,o(F.fauna_plane_speed))}`:""}
          </div>`)}
      ${this._renderGroup("Animation",this._renderSlider("animation_speed",o(v.animation_speed),0,3,.1,o(F.animation_speed)))}`}_onFaunaToggle(e){let t=this._ds(e,"fauna"),a=e.target.checked===!0,r=this._config||{},i=parseInt(r.perf_fauna,10),n=Number.isFinite(i)?i:Te(r).perf_fauna,p=n>=1&&r.fauna_birds!==!1,d={},_=[];if(t==="birds")a?(_.push("fauna_birds"),n<1&&(d.perf_fauna=1)):d.fauna_birds=!1;else if(t==="planes")a?(_.push("fauna_planes"),n<2&&(d.perf_fauna=2,p||(d.fauna_birds=!1))):d.fauna_planes=!1;else return;this._patch(d,{strip:_})}_renderSwitch(e,t){let a=this._formData[e],r=t?a!==!1:a===!0,i=F[e];return s`<label class="toggle-row">
      <span class="toggle-text"
        ><span>${o(v[e]||e)}</span>${i?s`<span class="toggle-helper">${o(i)}</span>`:""}</span
      >
      <ha-switch
        data-key=${e}
        .checked=${r}
        @change=${this._onToggleGroupChange}
      ></ha-switch>
    </label>`}_renderGroup(e,t){return s`<div class="editor-group">
      <div class="editor-group-title">${o(e)}</div>
      ${t}
    </div>`}_renderIntro(e,t,a){let r=!!(this._helpOpen&&this._helpOpen[e]);return s`<div class="help-row">
        <button
          type="button"
          class="help-btn ${r?"active":""}"
          data-help=${e}
          aria-expanded=${r?"true":"false"}
          @click=${this._onHelpToggle}
        >
          <ha-icon icon="mdi:information-outline"></ha-icon>
          <span>${o("Help")}</span>
        </button>
      </div>
      ${r?s`<div class="help-box">
            ${o(t)}
            ${a?s` <a
                  href="${nt}docs/${a}"
                  target="_blank"
                  rel="noopener"
                  >${o("More in the docs")} →</a
                >`:""}
          </div>`:""}`}_onHelpToggle(e){let t=this._ds(e,"help");t&&(this._helpOpen={...this._helpOpen||{},[t]:!this._helpOpen?.[t]},this.requestUpdate())}_panel(e,t,a,r,i){return s`<ha-expansion-panel
      outlined
      data-panel=${e}
      .expanded=${this._openPanel===e}
      @expanded-changed=${this._onPanelExpandedChanged}
    >
      <div slot="header" class="panel-header">
        <ha-icon icon=${t}></ha-icon>
        <div class="panel-title">
          <span>${o(a)}</span>
          <span class="panel-sub">${o(r)}</span>
        </div>
      </div>
      ${i}
    </ha-expansion-panel>`}_precipitationSensors(){let e=this.hass&&this.hass.states||{},t=this._config&&this._config.precipitation_entity||"",a=this._precipCache;if(a&&a.states===e&&a.current===t)return a.list;let r=Object.keys(e).filter(i=>i.startsWith("sensor.")&&Xt(e[i]&&e[i].attributes&&e[i].attributes.unit_of_measurement));return t&&!r.includes(t)&&r.push(t),this._precipCache={states:e,current:t,list:r},r}_setColorMode(e){this._valueChanged({stopPropagation(){},detail:{value:{...this._formData,_color_mode:e}}})}_renderSunMoonPanel(){let e=this._formData.celestial_position||"fixed";return s`${this._renderIntro("sun_moon","The sun entity (sun.sun) decides between day and night and provides the elevation for twilight, blue hour and sun rays. With \u201CFixed\u201D the sun or moon stays where you put it.","appearance.html#sun--moon")}
      ${this._renderForm([{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"moon_phase_entity",selector:{entity:{domain:"sensor"}}}])}
      ${this._renderGroup("Position & size",s`<div class="settings-group">
            <div class="segmented" role="radiogroup">
              ${[{v:"fixed",l:"Fixed"},{v:"dynamic_sun",l:"Moving sun"},{v:"dynamic_both",l:"Moving sun & moon"}].map(t=>s`<button
                    type="button"
                    role="radio"
                    class=${e===t.v?"active":""}
                    data-field="celestial_position"
                    data-value=${t.v}
                    @click=${this._onSegmentedFieldSelect}
                  >
                    ${o(t.l)}
                  </button>`)}
            </div>
            <div class="composite-helper">
              ${o("\u201CMoving\u201D follows the real position of the sun throughout the day.")}
            </div>
          </div>
          ${e==="fixed"||e==="dynamic_sun"?s`<div class="field-group">
                ${this._renderPositionGrid("celestial_alignment",re.celestial_alignment)}
                ${this._renderCelestialOffsetPicker()}
              </div>`:""}
          ${this._renderSlider("celestial_size",o(v.celestial_size),20,200,1)}`)}`}_renderAppearancePanel(){let e=this._formData,t=(e.card_style||"standalone")!=="standalone";return s`${this._renderIntro("appearance","In the \u201CImmersive\u201D style the card has no sky or background of its own and works as a dashboard header. Full width and edge fades are only available there.","appearance.html#appearance")}
      ${this._renderGroup("Color mode",s`<div class="segmented" role="radiogroup">
            ${P.color_mode.map(a=>s`<button
                  type="button"
                  role="radio"
                  class=${e._color_mode===a.value?"active":""}
                  @click=${()=>this._setColorMode(a.value)}
                >
                  ${o(a.short)}
                </button>`)}
          </div>
          <div class="composite-helper">
            ${o((P.color_mode.find(a=>a.value===e._color_mode)||{}).label||"")}
          </div>
          ${e._color_mode==="entity"?this._renderForm([{name:"theme_entity",selector:{entity:{}}}]):""}`)}
      ${this._renderGroup("Card style",this._renderCardStyleSegmented())}
      ${this._renderGroup("Frame & layers",s`${this._renderToggleGroup([{key:"card_hide_text",label:v.card_hide_text},{key:"card_square",label:v.card_square},...t?[{key:"card_full_width",label:v.card_full_width},{key:"card_mask_vertical",label:v.card_mask_vertical},{key:"card_mask_horizontal",label:v.card_mask_horizontal}]:[]])}
        ${this._renderSlider("card_stack_order",o(v.card_stack_order),-10,10,1,o(F.card_stack_order))}
        ${this._renderOffsetPicker()}`)}
      ${this._renderGroup("Color filters",this._renderForm([{name:"card_filter_clouds",selector:{select:{mode:"dropdown",options:O(P.card_filter_clouds)}}},{name:"card_filter_sun",selector:{select:{mode:"dropdown",options:O(P.card_filter_sun)}}}]))}`}_renderImagePanel(){let e=this._formData,t=g=>s`<div class="image-thumb">
        <div
          class="image-thumb-pic ${e[g]?"has":""}"
          style=${e[g]?`background-image:url("${lt(e[g])}")`:""}
        >
          ${e[g]?"":o("No image")}
        </div>
        ${this._renderClearableText(g)}
      </div>`,[a,r]=(e.image_alignment||"top-right").split("-"),i=a==="top"?"top":a==="bottom"?"bottom":"middle",n=(r||a)==="left"?"left":(r||a)==="right"?"right":"center",p=parseFloat(e.image_scale),d=Math.max(0,Math.min(200,Number.isFinite(p)?p:100)),_=e.image_day||e.image_night;return s`${this._renderIntro("image","Put your images in /config/www/ and enter them as /local/house-day.png. Transparent PNGs look best. Without a night image the day image is used.","appearance.html#custom-images")}
      <div class="image-thumbs">
        ${t("image_day")} ${t("image_night")}
      </div>
      ${_?this._renderGroup("Placement",s`<div class="image-place">
                ${this._renderPositionGrid("image_alignment",re.image_alignment)}
                <div class="image-preview" aria-hidden="true">
                  <div
                    class="image-preview-img v-${i} h-${n}"
                    style="height:${d}%;background-image:url(&quot;${lt(_)}&quot;)"
                  ></div>
                </div>
              </div>
              ${this._renderSlider("image_scale",o(v.image_scale),0,200,1,o(F.image_scale))}
              ${this._renderImageOffsetPicker()}`):""}
      ${this._renderGroup("Switch image by state",s`<div class="status-sentence">
            ${o("When this entity is on, open or home, the card shows other images:")}
          </div>
          ${this._renderForm(this._imageStatusSchema())}
          <div class="composite-helper">
            ${o("For example a picture with the garage door open while the door is open.")}
          </div>`)}`}_renderCardsPanel(){return s`${this._renderIntro("cards","Add any Home Assistant card, for example an entities or history card. The cards are shown on top of the sky. Grids and stacks work too.","appearance.html#embedded-cards")}
      ${this._renderPositionGrid("custom_cards_position",re.custom_cards_position)}
      ${this._renderCustomCardsEditor()}
      ${this._renderDisclosure("Advanced options",this._renderClearableText("custom_cards_css_class"))}`}_renderChipsPanel(){return this._formData.card_hide_text===!0?s`<div class="info inline-action">
        <span
          >${o("Chips are hidden by Hide all text in Appearance. Your settings are kept.")}</span
        >
        <button
          type="button"
          class="inline-action-btn"
          data-field="card_hide_text"
          @click=${this._onClearFieldClick}
        >
          ${o("Show again")}
        </button>
      </div>`:s`${this._renderIntro("chips","A chip shows one value, for example the temperature, the wind or tomorrow's forecast. All chips share one area whose position and layout you set below. Single chips can be placed freely.","chips.html#chips-in-the-editor")}
      ${this._renderChipsEditor()}`}render(){return!this.hass||!this._config?s``:(Qt(this.hass),s`${this._renderForm([{name:"weather_entity",selector:{entity:{domain:"weather"}}},{name:"precipitation_entity",selector:{entity:{domain:"sensor",include_entities:this._precipitationSensors()}}}])}
      ${this._panel("sun_moon","mdi:theme-light-dark","Sun & Moon","Day and night, moon phase, position and size",this._renderSunMoonPanel())}
      ${this._panel("appearance","mdi:palette-outline","Appearance","Color mode, card style, edges and filters",this._renderAppearancePanel())}
      ${this._panel("chips","mdi:label-multiple-outline","Chips","Small info tiles with sensor values or the forecast",this._renderChipsPanel())}
      ${this._panel("image","mdi:image-outline","Image","Your own picture for day and night, e.g. your house",this._renderImagePanel())}
      ${this._panel("cards","mdi:card-multiple-outline","Embedded cards","Other Home Assistant cards inside this card",this._renderCardsPanel())}
      ${this._panel("performance","mdi:speedometer","Performance & effects","Preset, frame rate, effects, birds and planes",this._renderPerformancePanel())}
      ${this._panel("card_tap_action","mdi:gesture-tap","Tap action","What happens when the card is tapped",this._renderForm([{name:"card_tap_action",selector:{ui_action:{}}}]))}`)}},Ba=Object.freeze({LABELS:v,HELPERS:F,CHIP_LABELS:ht,CHIP_HELPERS:Pe,OPT:P,FC_ATTRIBUTES:ae});customElements.get("atmo-weather-card-editor")||customElements.define("atmo-weather-card-editor",Le);export{Ba as EDITOR_TEXT_TABLES};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
