/* Atmo Weather Card 2026.11.11
 * MIT License, https://github.com/whyisthisbroken/atmo-weather-card
 * Copyright (c) 2026 shpongledsummer
 * Copyright (c) 2026 whyisthisbroken
 */
var ue=globalThis,pe=ue.ShadowRoot&&(ue.ShadyCSS===void 0||ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),tt=new WeakMap,ee=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(pe&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=tt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&tt.set(t,e))}return e}toString(){return this.cssText}},it=n=>new ee(typeof n=="string"?n:n+"",void 0,Ee),Ae=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,a,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[r+1],n[0]);return new ee(t,n,Ee)},at=(n,e)=>{if(pe)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),a=ue.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,n.appendChild(i)}},ze=pe?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return it(t)})(n):n;var{is:vi,defineProperty:wi,getOwnPropertyDescriptor:xi,getOwnPropertyNames:$i,getOwnPropertySymbols:ki,getPrototypeOf:Si}=Object,ge=globalThis,rt=ge.trustedTypes,Ci=rt?rt.emptyScript:"",Ei=ge.reactiveElementPolyfillSupport,te=(n,e)=>n,Te={toAttribute(n,e){switch(e){case Boolean:n=n?Ci:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ot=(n,e)=>!vi(n,e),nt={attribute:!0,type:String,converter:Te,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??=Symbol("metadata"),ge.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=nt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&wi(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){let{get:a,set:r}=xi(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:a,set(s){let c=a?.call(this);r?.call(this,s),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nt}static _$Ei(){if(this.hasOwnProperty(te("elementProperties")))return;let e=Si(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(te("properties"))){let t=this.properties,i=[...$i(t),...ki(t)];for(let a of i)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let a of i)t.unshift(ze(a))}else e!==void 0&&t.push(ze(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:Te).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let r=i.getPropertyOptions(a),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Te;this._$Em=a;let c=s.fromAttribute(t,r.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(e!==void 0){let s=this.constructor;if(a===!1&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??ot)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,r]of i){let{wrapped:s}=r,c=this[a];s!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[te("elementProperties")]=new Map,D[te("finalized")]=new Map,Ei?.({ReactiveElement:D}),(ge.reactiveElementVersions??=[]).push("2.1.2");var Ie=globalThis,st=n=>n,me=Ie.trustedTypes,lt=me?me.createPolicy("lit-html",{createHTML:n=>n}):void 0,gt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+M,Ai=`<${mt}>`,G=document,ae=()=>G.createComment(""),re=n=>n===null||typeof n!="object"&&typeof n!="function",De=Array.isArray,zi=n=>De(n)||typeof n?.[Symbol.iterator]=="function",Le=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,dt=/>/g,U=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,ut=/"/g,_t=/^(?:script|style|textarea|title)$/i,Me=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=Me(1),N=Me(2),ma=Me(3),j=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),pt=new WeakMap,V=G.createTreeWalker(G,129);function ft(n,e){if(!De(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(e):e}var Ti=(n,e)=>{let t=n.length-1,i=[],a,r=e===2?"<svg>":e===3?"<math>":"",s=ie;for(let c=0;c<t;c++){let d=n[c],p,g,u=-1,m=0;for(;m<d.length&&(s.lastIndex=m,g=s.exec(d),g!==null);)m=s.lastIndex,s===ie?g[1]==="!--"?s=ct:g[1]!==void 0?s=dt:g[2]!==void 0?(_t.test(g[2])&&(a=RegExp("</"+g[2],"g")),s=U):g[3]!==void 0&&(s=U):s===U?g[0]===">"?(s=a??ie,u=-1):g[1]===void 0?u=-2:(u=s.lastIndex-g[2].length,p=g[1],s=g[3]===void 0?U:g[3]==='"'?ut:ht):s===ut||s===ht?s=U:s===ct||s===dt?s=ie:(s=U,a=void 0);let v=s===U&&n[c+1].startsWith("/>")?" ":"";r+=s===ie?d+Ai:u>=0?(i.push(p),d.slice(0,u)+gt+d.slice(u)+M+v):d+M+(u===-2?c:v)}return[ft(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ne=class n{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0,c=e.length-1,d=this.parts,[p,g]=Ti(e,t);if(this.el=n.createElement(p,i),V.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=V.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(gt)){let m=g[s++],v=a.getAttribute(u).split(M),x=/([.?@])?(.*)/.exec(m);d.push({type:1,index:r,name:x[2],strings:v,ctor:x[1]==="."?Pe:x[1]==="?"?Oe:x[1]==="@"?Fe:Q}),a.removeAttribute(u)}else u.startsWith(M)&&(d.push({type:6,index:r}),a.removeAttribute(u));if(_t.test(a.tagName)){let u=a.textContent.split(M),m=u.length-1;if(m>0){a.textContent=me?me.emptyScript:"";for(let v=0;v<m;v++)a.append(u[v],ae()),V.nextNode(),d.push({type:2,index:++r});a.append(u[m],ae())}}}else if(a.nodeType===8)if(a.data===mt)d.push({type:2,index:r});else{let u=-1;for(;(u=a.data.indexOf(M,u+1))!==-1;)d.push({type:7,index:r}),u+=M.length-1}r++}}static createElement(e,t){let i=G.createElement("template");return i.innerHTML=e,i}};function Z(n,e,t=n,i){if(e===j)return e;let a=i!==void 0?t._$Co?.[i]:t._$Cl,r=re(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(n),a._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=a:t._$Cl=a),a!==void 0&&(e=Z(n,a._$AS(n,e.values),a,i)),e}var We=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??G).importNode(t,!0);V.currentNode=a;let r=V.nextNode(),s=0,c=0,d=i[0];for(;d!==void 0;){if(s===d.index){let p;d.type===2?p=new oe(r,r.nextSibling,this,e):d.type===1?p=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(p=new Ne(r,this,e)),this._$AV.push(p),d=i[++c]}s!==d?.index&&(r=V.nextNode(),s++)}return V.currentNode=G,a}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},oe=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),re(e)?e===W||e==null||e===""?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==j&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):zi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&re(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ne.createElement(ft(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{let r=new We(a,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=pt.get(e.strings);return t===void 0&&pt.set(e.strings,t=new ne(e)),t}k(e){De(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,a=0;for(let r of e)a===t.length?t.push(i=new n(this.O(ae()),this.O(ae()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=st(e).nextSibling;st(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){let r=this.strings,s=!1;if(r===void 0)e=Z(this,e,t,0),s=!re(e)||e!==this._$AH&&e!==j,s&&(this._$AH=e);else{let c=e,d,p;for(e=r[0],d=0;d<r.length-1;d++)p=Z(this,c[i+d],t,d),p===j&&(p=this._$AH[d]),s||=!re(p)||p!==this._$AH[d],p===W?e=W:e!==W&&(e+=(p??"")+r[d+1]),this._$AH[d]=p}s&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Pe=class extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},Oe=class extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},Fe=class extends Q{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??W)===j)return;let i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ne=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}};var Li=Ie.litHtmlPolyfillSupport;Li?.(ne,oe),(Ie.litHtmlVersions??=[]).push("3.3.3");var bt=(n,e,t)=>{let i=t?.renderBefore??e,a=i._$litPart$;if(a===void 0){let r=t?.renderBefore??null;i._$litPart$=a=new oe(e.insertBefore(ae(),r),r,void 0,t??{})}return a._$AI(n),a};var Be=globalThis,B=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};B._$litElement$=!0,B.finalized=!0,Be.litElementHydrateSupport?.({LitElement:B});var Wi=Be.litElementPolyfillSupport;Wi?.({LitElement:B});(Be.litElementVersions??=[]).push("4.2.2");var R=Object.freeze({card_style:"standalone",card_color_mode:"auto",card_filter_clouds:"none",card_filter_sun:"none",image_alignment:"top-right",image_night_source:"sun",image_transition:1,image_folder_type:"webp",card_background_style:"frosted",chip_area_layout:"wrap",chip_style:"inline",chip_area_align:"start",perf_mode:"default",fauna_birds_at_night:!0,fauna_birds:!0,fauna_planes:!0,fauna_plane_speed:1,wind_style:"lines",wind_compass:"off",wind_compass_position:"auto",wind_compass_cardinal:!0,wind_compass_degrees:!1,wind_compass_speed:!1,wind_compass_background:!1,effect_blue_hour:!0,effect_golden_hour:!0,effect_sun_rays:!0,effect_haze:!0,effect_ground_mist:!0,effect_frost:!0,effect_cloud_coverage:!0,effect_shooting_stars:!0,effect_comets:!0,shooting_star_rate:1,comet_rate:1,rain_density:1,snow_density:1,leaf_density:1,effect_rain_splash:!0,effect_snow_edge:!0,effect_spill:!1,effect_text_scrim:!0}),fe=Object.freeze({low:Object.freeze({perf_fps:20,perf_cloud_quality:.5,perf_effects:0,perf_fauna:0,perf_dpr:1,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:.5,fauna_plane_density:.5,fauna_bird_flock_size:4,fauna_birds_at_night:!0}),default:Object.freeze({perf_fps:30,perf_cloud_quality:1.5,perf_effects:1,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1,fauna_plane_density:1,fauna_bird_flock_size:8,fauna_birds_at_night:!0}),ultra:Object.freeze({perf_fps:60,perf_cloud_quality:2,perf_effects:2,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1.5,fauna_plane_density:1.5,fauna_bird_flock_size:12,fauna_birds_at_night:!0})});function be(n){let e=n&&n.perf_mode;return typeof e=="string"&&fe[e]||fe.default}var Pi=Object.freeze(["card_layout","card_color_mode","card_background_style","image_alignment","image_night_source","chip_area_position","chip_style","custom_cards_position","custom_cards_css_class","wind_style","wind_compass","wind_compass_position","css","image_folder","image_folder_type","forecast_curve"]);function Oi(n,e,t){n[e]!==void 0&&n[t]===void 0&&(n[t]=n[e]),delete n[e]}function $t(n){let e={...n},t=String(e.card_color_mode??"").trim().toLowerCase();t==="force_dark"?e.card_color_mode="dark":t==="force_light"?e.card_color_mode="light":t==="entity"&&delete e.card_color_mode,e.card_filter!==void 0&&(e.card_filter_clouds===void 0&&(e.card_filter_clouds=e.card_filter),e.card_filter_sun===void 0&&(e.card_filter_sun=e.card_filter),delete e.card_filter),delete e.celestial_moon_style,e.chip_area_layout==="scroll"&&(e.chip_area_layout="horizontal-scroll");let i=Number(e.perf_fps);i===24?e.perf_fps=20:i===45&&(e.perf_fps=30),Array.isArray(e.chips)&&(e.chips=e.chips.map(a=>{if(!a||typeof a!="object")return a;let r={...a};return r.overflow==="marquee"&&r.label_overflow===void 0&&(r.label_overflow="marquee"),Oi(r,"card_tap_action","tap_action"),r.forecast_show_min&&r.forecast&&r.attribute==="temperature"&&(r.sub_value_attribute||(r.sub_value_attribute="templow"),r.forecast_low_position!=="below"&&(r.sub_value_position="beside")),delete r.forecast_show_min,delete r.forecast_low_position,r}));for(let a of Pi)a in e&&typeof e[a]!="string"&&delete e[a];return e}var se="top-left";function ye(n){return n&&Number(n.area)===2?2:1}var Aa=Object.freeze(["standard","compact","wide","home","panel"]),Re=(n,e,t,i)=>({entity:n,attribute:"temperature",position:"custom",position_anchor:"top-left",position_x:`${t}px`,position_y:`${i}px`,text_size:`${e}px`,hide_icon:!0,hide_label:!0,background:!1,fancy_unit:!0,value_weight:"300"}),He=(n,e,t,i)=>({entity:n,position:"custom",position_anchor:"top-left",position_x:`${t}px`,position_y:`${i}px`,hide_icon:!0,hide_label:!0,background:!1,text_size:`${e}px`,value_weight:"600"}),O=(n,e,t,i)=>({entity:n,attribute:e,...t?{_layoutLabel:t}:{},_layoutOptional:!0,icon:i}),yt=n=>({entity:n,forecast:"daily",forecast_offset:1,attribute:"temperature",icon:"weather",forecast_precision:0,sub_value_attribute:"templow",sub_value_position:"beside"}),J=(n,e,t,i)=>({position:"custom",position_anchor:n,position_x:`${e}px`,position_y:`${t}px`,hide_icon:!0,hide_label:!0,background:!1,...i}),vt=(n,e,t,i)=>J("top-right",i,58,{entity:n,forecast:"daily",forecast_offset:0,attribute:e,icon:t,hide_icon:!1,unit_format:"\xB0",forecast_precision:0,text_size:"16px",style:"inline"});function ve(n,e="",t="sun.sun"){return n==="standard"?{card_height:200,celestial_size:56,celestial_position:"dynamic_both",celestial_alignment:"right",celestial_x:45,chip_area_position:"bottom-left",chip_area_padding:"0px 0px 2px clamp(4px, 2.5cqw, 10px)",chip_area_gap:"clamp(4px, 3cqw, 14px)",chip_style:"vertical",chip_padding:"4px clamp(4px, 2cqw, 8px)",chip_text_size:"clamp(13px, 4.6cqw, 15px)",chip_label_size:"10px",chip_icon_size:"14px",chips:[Re(e,62,18,8),He(e,16,21,86),O(e,"humidity","Humidity","mdi:water-percent"),O(e,"wind_speed","Wind","mdi:weather-windy"),yt(e)]}:n==="compact"?{card_height:96,celestial_size:40,celestial_position:"fixed",celestial_alignment:"right",celestial_x:40,chip_area_position:"bottom-left",chip_area_padding:"0px 0px 2px 134px",chip_area_gap:"10px",chip_padding:"0px",chip_text_size:"13px",chip_icon_size:"14px",chips:[{...Re(e,40,14,16),unit_format:"\xB0",fancy_unit:!1},He(e,15,136,18),O(e,"humidity",null,"mdi:water-percent"),O(e,"wind_speed",null,"mdi:weather-windy")]}:n==="wide"?{card_height:260,celestial_size:64,celestial_position:"dynamic_both",celestial_alignment:"center",celestial_x:0,chip_area_position:"right",chip_area_layout:"grid",chip_area_columns:2,chip_area_width:"38%",chip_area_padding:"0px 20px 0px 0px",chip_area_gap:"16px",chip_style:"vertical",chip_padding:"4px 8px",chip_text_size:"20px",chip_label_size:"11px",chip_icon_size:"16px",chips:[Re(e,96,24,14),He(e,18,28,132),O(e,"humidity","Humidity","mdi:water-percent"),O(e,"wind_speed","Wind","mdi:weather-windy"),O(e,"pressure","Pressure","mdi:gauge"),{...yt(e),unit_format:"\xB0",sub_value_format:"\xB0",sub_value_position:"below"}]}:n==="home"?{card_height:300,celestial_size:44,celestial_position:"fixed",celestial_alignment:"top-center",celestial_x:0,celestial_y:22,image_alignment:"top-right",image_scale:70,image_x:"16",image_y:"11%",image_max_width:58,wind_compass:"ticks",wind_compass_position:"top-right",wind_compass_speed:!0,wind_compass_cardinal:!1,chip_area_position:"bottom-right",chip_area_grouped:!0,chip_area_background:!0,card_background_style:"frosted",chip_style:"inline",chip_area_gap:"clamp(6px, 3.2cqw, 16px)",chip_area_padding:"2px clamp(4px, 2cqw, 10px)",chip_padding:"8px 6px",chip_text_size:"clamp(13px, 4.2cqw, 17px)",chip_icon_size:"clamp(14px, 4.2cqw, 17px)",chips:[J("top-left",20,18,{entity:t,attribute:"next_setting",icon:"mdi:weather-sunset-down",hide_icon:!1,date_format:"%H:%M",text_size:"15px",value_weight:"700",style:"inline"}),J("bottom-left",18,84,{entity:e,attribute:"temperature",unit_format:"\xB0",text_size:"72px",value_weight:"700"}),J("bottom-left",21,62,{entity:e,text_size:"16px",value_weight:"500"}),{...O(e,"humidity",null,"mdi:water-percent"),hide_label:!0},{...O(e,"wind_speed",null,"mdi:weather-windy"),hide_label:!0},{...O(e,"pressure",null,"mdi:gauge"),hide_label:!0}]}:n==="panel"?{card_height:440,celestial_size:40,celestial_position:"fixed",celestial_alignment:"top-center",celestial_x:0,celestial_y:22,chip_area_position:"top-left",chip_area_padding:"96px 0px 0px 0px",chip_area_layout:"grid",chip_area_columns:2,chip_area_width:"100%",chip_area_gap:"10px",chip_area_background:!0,card_background_style:"frosted",chip_style:"stacked",chip_padding:"10px",chip_text_size:"17px",chip_label_size:"12px",chip_icon_size:"16px",chip_area_2:{position:"bottom-left",layout:"grid",columns:5,width:"100%",gap:"4px",style:"vertical"},forecast_curve:"soft",forecast_curve_height:40,chips:[J("top-left",16,2,{entity:e,attribute:"temperature",unit_format:"\xB0",text_size:"68px",value_weight:"300"}),J("top-right",20,20,{entity:e,text_size:"22px",value_weight:"700"}),vt(e,"templow","mdi:arrow-down-thin",20),vt(e,"temperature","mdi:arrow-up-thin",76),...[{...O(e,"wind_bearing","Wind","mdi:weather-windy"),bearing_icon:"arrow",bearing_format:"cardinal",sub_value_entity:e,sub_value_attribute:"wind_speed"},{...O(e,"humidity","Humidity","mdi:water-percent"),type:"bar",bar_min:0,bar_max:100,bar_height:"4px",bar_color:"#7fc8ff"},{...O(e,"uv_index","UV index","mdi:weather-sunny-alert"),type:"bar",bar_min:0,bar_max:11,bar_height:"4px",bar_threshold_mode:"segments",bar_thresholds:[{value:0,color:"#7bd88f"},{value:3,color:"#ffd166"},{value:6,color:"#ff9f43"},{value:8,color:"#ff5e57"}]},{entity:e,forecast:"daily",forecast_offset:0,attribute:"precipitation_probability",_layoutLabel:"Rain",_layoutOptional:!0,icon:"mdi:umbrella-outline",forecast_precision:0},O(e,"pressure","Pressure","mdi:gauge"),{entity:t,attribute:"next_setting",_layoutLabel:"Sunset",icon:"mdi:weather-sunset-down",date_format:"%H:%M"}].map(i=>({...i,_layoutGroup:"tiles",_layoutMax:4})),...[1,2,3,4,5].map(i=>({entity:e,forecast:"hourly",forecast_offset:i,attribute:"temperature",icon:"weather",unit_format:"\xB0",forecast_precision:0,value_weight:"700",label_size:"11px",padding:"4px 2px",area:2}))]}:null}var X=Object.freeze({day:"house-day.webp",night:"house-night.webp",rainDay:"house-rain-day.webp",rainNight:"house-rain-night.webp",snowDay:"house-snow-day.webp",snowNight:"house-snow-night.webp"}),kt=Object.freeze({image_alignment:"bottom-right",image_scale:55,image_y:"19%"});function St(n,e){if(!String(e&&e.image_alignment||"").trim()||!n||!("image_x"in n||"image_y"in n))return n;let{image_x:i,image_y:a,...r}=n;return r}var Fi=Object.freeze(["rainy","pouring","lightning-rainy","lightning","hail"]),Ni=Object.freeze(["snowy","snowy-rainy"]),wt=n=>typeof n=="string"&&n.trim().toLowerCase()==="none",_e=n=>typeof n=="string"&&n.trim()!=="";function Ue(n){return n?_e(n.image_day)||_e(n.image_night)||_e(n.image_folder)||_e(n.status_entity)||Array.isArray(n.image_conditions)&&n.image_conditions.length>0:!1}function Ct(n,e=import.meta.url){let t=a=>new URL(`./${a}`,e).href,i=n?[{entity:n,state:[...Ni],image_day:t(X.snowDay),image_night:t(X.snowNight)},{entity:n,state:[...Fi],image_day:t(X.rainDay),image_night:t(X.rainNight)}]:[];return{image_day:t(X.day),image_night:t(X.night),image_conditions:i}}function Ve(n){return n?String(n.card_layout??"").trim().toLowerCase()==="home"&&!wt(n.image_day)&&!wt(n.image_night)&&!Ue(n):!1}var Et=Object.freeze(["card_height","card_square","image_alignment","image_scale","image_x","image_y","image_max_width","chip_area_position","chip_area_layout","chip_area_columns","chip_area_align","chip_area_width","chip_area_height","chip_area_padding","chip_area_gap","chip_area_scroll_count","chip_area_grouped","chip_area_full_width","chip_area_background","chip_area_separator","chip_area_background_color","chip_style","chip_padding","chip_gap","chip_text_gap","chip_text_size","chip_label_size","chip_icon_size","chip_icon_padding","chip_icon_background","chip_icon_background_color","chip_background_color","card_background_style"]),xt=n=>[n.type||"",n.entity||"",n.attribute||"",n.forecast||"",Number(n.forecast_offset)||0].join("|"),Ii=Object.freeze(["position","position_anchor","position_x","position_y","area","style","align","background","icon_background","background_color","icon_background_color","padding","text_size","label_size","inner_gap","text_gap","icon_size","icon_padding","width","height","value_weight","label_weight","chip_round","sub_value_size","sub_value_weight"]);function At(n,e){let t=new Set((e||[]).map(xt));return(Array.isArray(n)?n:[]).filter(i=>i&&typeof i=="object"&&!t.has(xt(i))).map(i=>{let a={...i};for(let r of Ii)delete a[r];return a})}var Di=[["Free","Frei"],["Standard","Standard"],["Compact","Kompakt"],["Wide","Breit"],["The card shows the chips of its layout. Add a chip to use your own instead.","Die Card zeigt die Chips ihres Layouts. F\xFCge einen Chip hinzu, um stattdessen eigene zu verwenden."],["Fall out of the card","Aus der Card fallen"],["Veil behind the text","Schleier hinter dem Text"],["Rain and snow fall out of the bottom of the card onto the dashboard and fade there.","Regen und Schnee fallen unten aus der Card auf das Dashboard und verblassen dort."],["A soft veil behind the chip row keeps the text readable on any sky.","Ein weicher Schleier hinter der Chip-Reihe h\xE4lt den Text auf jedem Himmel lesbar."],["Leaves","Bl\xE4tter"],["Amount of leaves","Menge der Bl\xE4tter"],["Amount of rain","Regenmenge"],["Amount of snow","Schneemenge"],["Splashes","Spritzer"],["Snow edge","Schneekante"],["Snow has no sensor of its own. A precipitation sensor that measures melted snow, like a weather service's or a heated gauge, sets it too; this slider scales it on top.","F\xFCr Schnee gibt es keinen eigenen Sensor. Ein Niederschlagssensor, der geschmolzenen Schnee misst, etwa von einem Wetterdienst oder ein beheizter Regenmesser, bestimmt ihn mit; dieser Regler skaliert ihn zus\xE4tzlich."],["Rain & snow","Regen & Schnee"],["1\xD7 is the usual amount for the weather. The rain sensor, if you have one, still sets how hard it rains.","1\xD7 ist die \xFCbliche Menge f\xFCr das Wetter. Ein Regensensor bestimmt weiterhin, wie stark es regnet."],["Part of the drops splash on the bottom edge of the card.","Ein Teil der Tropfen spritzt an der Unterkante der Card auf."],["A thin edge of snow builds up along the bottom of the card.","Am unteren Rand der Card bildet sich eine d\xFCnne Schneekante."],["Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h. Leaves are green in spring and summer and turn to autumn colours in autumn and winter.","Zeigt Windrichtung und -st\xE4rke bei windigem Wetter und bei Regen, Hagel oder Schnee ab 40 km/h. Bl\xE4tter sind im Fr\xFChling und Sommer gr\xFCn und im Herbst und Winter herbstlich gef\xE4rbt."],["(choose an entity)","(Entit\xE4t w\xE4hlen)"],["(no entity)","(keine Entit\xE4t)"],["+{n} days","+{n} Tage"],["0 = today/now, 1 = tomorrow/next hour, etc.","0 = heute/jetzt, 1 = morgen/n\xE4chste Stunde usw."],["1\xD7 is about one shooting star every 12 s and a comet about once a minute (Ultra, clear night).","1\xD7 hei\xDFt etwa eine Sternschnuppe alle 12 s und ein Komet etwa pro Minute (Ultra, klare Nacht)."],["A chip shows one value, for example the temperature, the wind or tomorrow's forecast. All chips share one area whose position and layout you set below. Single chips can be placed freely.","Ein Chip zeigt einen Wert, zum Beispiel die Temperatur, den Wind oder die Vorhersage f\xFCr morgen. Alle Chips liegen in einem gemeinsamen Bereich, dessen Position und Anordnung du unten festlegst. Einzelne Chips lassen sich frei platzieren."],["A color filter applied to clouds.","Ein Farbfilter f\xFCr die Wolken."],["A color filter applied to the sun.","Ein Farbfilter f\xFCr die Sonne."],["A veil with poor visibility or high humidity.","Ein Schleier bei schlechter Sicht oder hoher Luftfeuchte."],["Add any Home Assistant card, for example an entities or history card. The cards are shown on top of the sky. Grids and stacks work too.","F\xFCge beliebige Home-Assistant-Karten ein, zum Beispiel eine Entit\xE4ten- oder Verlaufskarte. Die Karten liegen \xFCber dem Himmel. Raster und Stapel funktionieren auch."],["Add card","Karte hinzuf\xFCgen"],["Add chip","Chip hinzuf\xFCgen"],["Add threshold","Schwelle hinzuf\xFCgen"],["Adds a CSS class to the embedded cards container (useful with card_mod).","F\xFCgt dem Bereich der eingebetteten Karten eine CSS-Klasse hinzu (n\xFCtzlich mit card_mod)."],["Adds a soft fade to the left and right edges.","Blendet den linken und rechten Rand weich aus."],["Adds a soft fade to the top and bottom edges.","Blendet den oberen und unteren Rand weich aus."],["Advanced options","Erweiterte Optionen"],["Align content","Inhalt ausrichten"],["Alignment","Ausrichtung"],["An entity whose state switches between light and dark mode.","Eine Entit\xE4t, deren Zustand zwischen hellem und dunklem Modus wechselt."],["Animation","Animation"],["Animation Speed","Animationstempo"],["Arrangement","Anordnung"],["Attribute","Attribut"],["Auto","Auto"],["Auto (Home Assistant)","Automatisch (Home Assistant)"],["Background","Hintergrund"],["Background Style","Hintergrundstil"],["Background color","Hintergrundfarbe"],["Background color (all chips)","Hintergrundfarbe (alle Chips)"],["Background color based on the weather.","Hintergrundfarbe passend zum Wetter."],["Balanced","Ausgewogen"],["Bar","Balken"],["Bar color","Balkenfarbe"],["Bar entity","Balken-Entit\xE4t"],["Battery saver","Akku schonen"],["Beams of light through broken clouds.","Lichtstrahlen durch aufgelockerte Wolken."],["Behind animations","Hinter den Animationen"],["Below","Darunter"],["Beside value","Neben dem Wert"],["Bird Animation Speed","Vogeltempo"],["Bird-only speed multiplier applied on top of animation speed.","Tempo nur f\xFCr V\xF6gel, zus\xE4tzlich zum Animationstempo."],["Birds","V\xF6gel"],["Birds & planes","V\xF6gel & Flugzeuge"],["Birds at night","V\xF6gel auch nachts"],["Birds per flock","V\xF6gel pro Schwarm"],["Blue hour","Blaue Stunde"],["Golden hour","Goldene Stunde"],["Bold","Fett"],["Bottom","Unten"],["Cancel","Abbrechen"],["Card Height","Kartenh\xF6he"],["Card Offset","Kartenversatz"],["Card Padding","Innenabstand"],["Card Style","Kartenstil"],["Card style","Kartenstil"],["Center","Mitte"],["Chip Layout","Chip-Aufbau"],["Chip area","Chip-Bereich"],["Chip background","Chip-Hintergrund"],["Chip layout","Chip-Aufbau"],["Chip padding","Chip-Innenabstand"],["Chip style","Chip-Stil"],["Chip type","Chip-Art"],["Chips","Chips"],["Chips gap","Abstand zwischen Chips"],["Choose a preset or fine-tune each setting below.","W\xE4hle eine Voreinstellung oder passe jeden Wert darunter an."],["Clear","Leeren"],["Clear color","Farbe entfernen"],["Clip","Abschneiden"],["Cloud Detail","Wolken-Detail"],["Cloud Filter","Wolken-Filter"],["Cloud amount from data","Wolkenmenge aus Messwert"],["Cloud coverage","Bew\xF6lkung"],["Color Mode","Farbmodus"],["Color mode","Farbmodus"],["Color thresholds","Farbschwellen"],["Colors","Farben"],["Columns","Spalten"],["Comets","Kometen"],["Condition","Wetterlage"],["Container Background Color","Hintergrundfarbe des Bereichs"],["Container background color","Hintergrundfarbe des Bereichs"],["Container padding","Innenabstand des Bereichs"],["Content alignment","Ausrichtung des Inhalts"],["Contrast","Kontrast"],["Custom unit","Eigene Einheit"],["Custom: you changed values of the preset.","Eigene: Du hast Werte der Voreinstellung ge\xE4ndert."],["Daily","T\xE4glich"],["Dark","Dunkel"],["Darken","Dunkler"],["Data","Daten"],["Day Image URL","Bild-URL Tag"],["Day image shown while the status entity is active.","Tagbild, solange die Status-Entit\xE4t aktiv ist."],["Days ahead","Tage voraus"],["Decimal places","Nachkommastellen"],["Deep blue sky after sunset and before sunrise.","Tiefblauer Himmel nach Sonnenuntergang und vor Sonnenaufgang."],["Warm light on the sky and clouds when the sun is low, orange to violet at sunset.","Warmes Licht auf Himmel und Wolken bei tiefer Sonne, orange bis violett zum Sonnenuntergang."],["Default","Standard"],["Delete","L\xF6schen"],["Detailed clouds","Detaillierte Wolken"],["Disable Chips","Chips ausschalten"],["Divider between chips","Trennlinie zwischen Chips"],["Duplicate","Duplizieren"],["Effect Quality","Effekt-Qualit\xE4t"],["Effect Quality is Off, so there are no shooting stars or comets.","Die Effekt-Qualit\xE4t steht auf Aus, deshalb gibt es keine Sternschnuppen und Kometen."],["Effect Quality is Off, so these effects are not drawn.","Die Effekt-Qualit\xE4t steht auf Aus, deshalb werden diese Effekte nicht gezeichnet."],["Effect Quality is Off: sun rays, haze, ground mist and frost are not drawn. Blue hour, golden hour and cloud amount still work.","Die Effekt-Qualit\xE4t steht auf Aus: Sonnenstrahlen, Dunst, Bodennebel und Frost werden nicht gezeichnet. Blaue Stunde, goldene Stunde und Wolkenmenge wirken weiter."],["Ellipsis (\u2026)","Auslassung (\u2026)"],["Embedded Cards CSS Class","CSS-Klasse der eingebetteten Karten"],["Embedded Cards Position","Position der eingebetteten Karten"],["Embedded cards","Eingebettete Karten"],["Entity","Entit\xE4t"],["Entity not found","Entit\xE4t nicht gefunden"],["Plus more comets, clouds lit by the sun and more wind lines","Dazu mehr Kometen, von der Sonne beleuchtete Wolken und mehr Windlinien"],["Fade Left & Right Edges","Links & rechts ausblenden"],["Fade Top & Bottom Edges","Oben & unten ausblenden"],["Fancy unit","Sch\xF6ne Einheit"],["Fauna","Tiere"],["Fine tuning (gaps, sizes, colors)","Feineinstellungen (Abst\xE4nde, Gr\xF6\xDFen, Farben)"],["Moves the image sideways from its spot, positive to the right. Pixels or CSS, e.g. -20 or 10% (of the card width).","Verschiebt das Bild seitlich von seinem Platz, positiv nach rechts. Pixel oder CSS, z. B. -20 oder 10% (der Kartenbreite)."],["Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.","Feinjustierung des Bildes. Pixel oder CSS-Werte, z. B. -20 oder 10%."],["Moves the image away from the edge it sits at (up from the bottom). Pixels or CSS, e.g. 10 or -5% (of the card height).","Verschiebt das Bild weg von seinem Rand (unten: nach oben). Pixel oder CSS, z. B. 10 oder -5% (der Kartenh\xF6he)."],["Fixed","Fest"],["Flow field","Str\xF6mung"],["Follow another entity (e.g. the sun)","Einer anderen Entit\xE4t folgen (z. B. der Sonne)"],["Follow my Home Assistant theme","Meinem Home-Assistant-Theme folgen"],["Following Home Assistant display precision","Folgt der Anzeigegenauigkeit von Home Assistant"],["Force dark mode","Immer dunkel"],["Force light mode","Immer hell"],["Forecast","Vorhersage"],["Forecast attribute","Vorhersage-Attribut"],["Forecast requires a weather entity.","Die Vorhersage braucht eine Wetter-Entit\xE4t."],["Forecast type","Vorhersageart"],["Frame Rate","Bildrate"],["Free positioning","Frei platzieren"],["Frequency","H\xE4ufigkeit"],["Frosted","Milchglas"],["Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.","Milchglas: durchscheinender Glaseffekt. Kontrast: deckend und gut lesbar. Theme: folgt den Farben deines HA-Themes."],["Full","Voll"],["Full Width","Volle Breite"],["Full width chips","Chips in voller Breite"],["Gap","Abstand"],["Gaps","Abst\xE4nde"],["Global animation speed multiplier for all motion.","Gesamttempo f\xFCr jede Bewegung auf der Karte."],["Gradient","Verlauf"],["Graphics","Grafik"],["Grid","Raster"],["Ground mist","Bodennebel"],["Frost","Frost"],["Weather data","Wetterdaten"],["HA theme","HA-Theme"],["Haze","Dunst"],["Height","H\xF6he"],["Help","Hilfe"],["Hide","Ausblenden"],["Hide All Text","Alle Texte ausblenden"],["Hide icon","Symbol ausblenden"],["Hides all text overlays in one toggle.","Blendet alle Texte und Einblendungen auf einmal aus."],["High","Hoch"],["Higher values sit in front of other cards.","H\xF6here Werte liegen vor anderen Karten."],["Horizontal Offset","Versatz waagerecht"],["Horizontal alignment of chips within the container.","Waagerechte Ausrichtung der Chips im Bereich."],["Horizontal offset from the alignment edge, in pixels.","Waagerechter Abstand vom Ausrichtungsrand, in Pixeln."],["Hourly","St\xFCndlich"],["Hours ahead","Stunden voraus"],["How label text behaves when it is too long.","Was passiert, wenn die Beschriftung zu lang ist."],["How to add them","So f\xFCgst du sie hinzu"],["Humidity","Luftfeuchte"],["Icon","Symbol"],["Icon background","Symbol-Hintergrund"],["Icon background color","Hintergrundfarbe des Symbols"],["Icon background color (all chips)","Hintergrundfarbe der Symbole (alle Chips)"],["Icon folder","Symbol-Ordner"],["Icon size","Symbolgr\xF6\xDFe"],["Icon/text gap","Abstand Symbol/Text"],["Image Offset","Bildversatz"],["Image Position","Bildposition"],["Image Scale (%)","Bildgr\xF6\xDFe (%)"],["Fade time (s)","\xDCberblendzeit (s)"],["How long one image blends into the next when it changes, for example at sunset. 0 switches at once.","Wie lange ein Bild beim Wechsel in das n\xE4chste \xFCberblendet, zum Beispiel bei Sonnenuntergang. 0 wechselt sofort."],["Image height as a percentage of the card height.","Bildh\xF6he in Prozent der Kartenh\xF6he."],["Immersive","Immersive"],["In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.","In Pixeln, z. B. 220. \u201Eauto\u201C f\xFCr Raster-Layouts im Dashboard."],["In the \u201CImmersive\u201D style the card has no sky or background of its own and works as a dashboard header. Full width and edge fades are only available there.","Im Stil \u201EImmersive\u201C hat die Karte keinen eigenen Himmel und keinen Hintergrund und eignet sich als Kopfbereich eines Dashboards. Volle Breite und weiche R\xE4nder gibt es nur dort."],["Inline","Nebeneinander"],["Inner padding, e.g. 16px or 12px 20px.","Innenabstand, z. B. 16px oder 12px 20px."],["Invalid height. Use auto, 160, 160px, 40vh, or 80%.","Ung\xFCltige H\xF6he. Erlaubt sind auto, 160, 160px, 40vh oder 80%."],["Label","Beschriftung"],["Label Attribute","Attribut der Beschriftung"],["Label Entity","Entit\xE4t der Beschriftung"],["Label overflow","\xDCberlauf der Beschriftung"],["Label text size","Schriftgr\xF6\xDFe Beschriftung"],["Label/value gap","Abstand Beschriftung/Wert"],["Layer Order","Ebenen-Reihenfolge"],["Layout","Anordnung"],["Left","Links"],["Light","Hell"],["Live entity value","Aktueller Entit\xE4tswert"],["Look","Darstellung"],["Low","Niedrig"],["Low resolution","Niedrige Aufl\xF6sung"],["MDI icon, or type 'weather' for a dynamic icon.","MDI-Symbol oder \u201Eweather\u201C f\xFCr ein Wettersymbol."],["Manual override","Manuell festgelegt"],["Matches forecast","Passt zur Vorhersage"],["Matches weather","Passt zum Wetter"],["Max","Max"],["Maximum detail","H\xF6chstes Detail"],["Maximum smoothness","Maximal fl\xFCssig"],["Medium","Mittel"],["Min","Min"],["Mist near the dew point, at night and in the morning.","Bodennebel nahe dem Taupunkt, nachts und morgens."],["Rime on the card below 0 \xB0C, or just above it in very humid air. Colder air lets it reach further in.","Reif auf der Karte unter 0 \xB0C, oder knapp dar\xFCber bei sehr feuchter Luft. Je k\xE4lter, desto weiter w\xE4chst er herein."],["Moderate detail","Mittleres Detail"],["Moon Phase Entity","Mondphasen-Entit\xE4t"],["More in the docs","Mehr in der Doku"],["Move down","Nach unten"],["Move up","Nach oben"],["Moving sun","Sonne wandert"],["Moving sun & moon","Sonne & Mond wandern"],["Muted","Ged\xE4mpft"],["Native resolution","Volle Aufl\xF6sung"],["Near planes fly faster than distant ones; the slider scales all of them.","Nahe Flugzeuge fliegen schneller als ferne; der Regler \xE4ndert alle gleich."],["Night Image URL","Bild-URL Nacht"],["Night image shows","Nachtbild erscheint"],["From sunset to sunrise","Von Sonnenuntergang bis Sonnenaufgang"],["While the card is dark (Color mode)","Solange die Card dunkel ist (Farbmodus)"],["Applies to every image of the card, the state images too. Without a sun entity the color mode decides.","Gilt f\xFCr alle Bilder der Card, auch f\xFCr die Zustandsbilder. Ohne Sonnen-Entit\xE4t entscheidet der Farbmodus."],["Night image shown while the status entity is active.","Nachtbild, solange die Status-Entit\xE4t aktiv ist."],["Night sky","Nachthimmel"],["No cards yet.","Noch keine Karten."],["No image","Kein Bild"],["The weather only, without extra effects","Nur das Wetter, ohne Zusatzeffekte"],["None","Keiner"],["Normal","Normal"],["Now","Jetzt"],["Number of equal-width columns in grid layout.","Anzahl gleich breiter Spalten im Raster."],["Off","Aus"],["Offset","Versatz"],["Offset from edge","Abstand vom Rand"],["On","An"],["One shared background","Ein gemeinsamer Hintergrund"],["Opacity","Deckkraft"],["Optional. Current rain intensity in mm/h or in/h, so rain and snow follow the measured amount. Only sensors with these units are listed.","Optional. Aktuelle Regenst\xE4rke in mm/h oder in/h, damit Regen und Schnee der gemessenen Menge folgen. Es erscheinen nur Sensoren mit diesen Einheiten."],["Other Home Assistant cards inside this card","Andere Home-Assistant-Karten in dieser Karte"],["Padding","Innenabstand"],["Padding around icon","Abstand um das Symbol"],["Performance Preset","Voreinstellung"],["Pick an entity for this chip.","W\xE4hle eine Entit\xE4t f\xFCr diesen Chip."],["Placement","Platzierung"],["Plane speed","Flugzeugtempo"],["Planes","Flugzeuge"],["Position","Position"],["Position & size","Position & Gr\xF6\xDFe"],["Position Mode","Positionsmodus"],["Precipitation","Niederschlag"],["Precipitation Sensor","Niederschlagssensor"],["Pressure","Luftdruck"],["Put your images in /config/www/ and enter them as /local/house-day.png. Transparent PNGs look best. Without a night image the day image is used.","Lege deine Bilder unter /config/www/ ab und trage sie als /local/haus-tag.png ein. Transparente PNGs sehen am besten aus. Ohne Nachtbild wird das Tagbild verwendet."],["Quick add:","Schnell hinzuf\xFCgen:"],["Rain chance","Regenwahrscheinlichkeit"],["Rain probability","Regenwahrscheinlichkeit"],["Haze, ground mist, sun rays, fog banks, shooting stars and comets","Dunst, Bodennebel, Sonnenstrahlen, Nebelb\xE4nke, Sternschnuppen und Kometen"],["Remove","Entfernen"],["Removes side margins so the card fills edge to edge.","Entfernt die seitlichen Abst\xE4nde, damit die Karte von Rand zu Rand reicht."],["Reset all styles","Alle Stile zur\xFCcksetzen"],["Right","Rechts"],["Right-to-left","Von rechts nach links"],["Ring","Ring"],["Ring color","Ringfarbe"],["Ring entity","Ring-Entit\xE4t"],["Round shape","Runde Form"],["SVG icons:","SVG-Symbole:"],["Scroll X","Scrollen \u2190\u2192"],["Scroll Y","Scrollen \u2191\u2193"],["Scroll speed","Lauftempo"],["Scrolling","Lauftext"],["Scrolling text","Lauftext"],["Segments","Abschnitte"],["Sensor","Sensor"],["Sharp rendering","Scharfe Darstellung"],["Sharpness","Sch\xE4rfe"],["Shooting stars","Sternschnuppen"],["Show","Anzeigen"],["Show again","Wieder anzeigen"],["Show at once","Gleichzeitig sichtbar"],["Shown at night. Falls back to the day image if left empty.","Wird nachts gezeigt. Leer lassen, um das Tagbild zu nutzen."],["Shows a different image when this entity is active, open, or home.","Zeigt ein anderes Bild, wenn diese Entit\xE4t aktiv, offen oder zuhause ist."],["Simple clouds","Einfache Wolken"],["Size","Gr\xF6\xDFe"],["Size (px)","Gr\xF6\xDFe (px)"],["Sizes","Gr\xF6\xDFen"],["Small info tiles with sensor values or the forecast","Kleine Info-Felder mit Sensorwerten oder der Vorhersage"],["Solid","Einfarbig"],["Speed","Geschwindigkeit"],["Spread","Verteilt"],["Square Mode","Quadratisch"],["Stacked","Gestapelt"],["Standalone","Standalone"],["Standard resolution","Normale Aufl\xF6sung"],["Star Twinkle Speed","Funkeltempo der Sterne"],["Status Entity","Status-Entit\xE4t"],["Status Image (Day)","Statusbild (Tag)"],["Status Image (Night)","Statusbild (Nacht)"],["Sub Value Attribute","Attribut des Zusatzwerts"],["Sub Value Entity","Entit\xE4t des Zusatzwerts"],["Sub value","Zusatzwert"],["Sub value overflow","\xDCberlauf des Zusatzwerts"],["Sun Entity","Sonnen-Entit\xE4t"],["Sun Filter","Sonnen-Filter"],["Sun rays","Sonnenstrahlen"],["Images by state","Bilder je nach Zustand"],["Other pictures for snow, rain or an open door","Andere Bilder bei Schnee, Regen oder offener T\xFCr"],["Show another picture while an entity has a certain state, for example snow on the roof, a wet house in the rain or the open garage door. The first entry that matches wins; without a match the normal images stay.","Zeigt ein anderes Bild, solange eine Entit\xE4t einen bestimmten Zustand hat, zum Beispiel Schnee auf dem Dach, ein nasses Haus im Regen oder das offene Garagentor. Der erste passende Eintrag gewinnt; passt keiner, bleiben die normalen Bilder."],["Status entity","Status-Entit\xE4t"],["Checked before the list below.","Wird vor der Liste unten gepr\xFCft."],["No images by state yet.","Noch keine Bilder je nach Zustand."],["Add image","Bild hinzuf\xFCgen"],["New image","Neues Bild"],["Pick an entity","Entit\xE4t w\xE4hlen"],["on, open, home or active","an, offen, zuhause oder aktiv"],["Attribute (optional)","Attribut (optional)"],["States","Zust\xE4nde"],["Day image","Tagbild"],["Night image","Nachtbild"],["Leave empty to show the image while the entity is on, open, home, unlocked or active.","Leer lassen, dann erscheint das Bild, solange die Entit\xE4t an, offen, zuhause, entriegelt oder aktiv ist."],["Compares this attribute instead of the state.","Vergleicht dieses Attribut statt des Zustands."],["Tap","Tippen"],["Tap Action","Tippen-Aktion"],["Tap action","Tippen-Aktion"],["Temperature","Temperatur"],["Temperature (high)","Temperatur (H\xF6chstwert)"],["Temperature (low)","Temperatur (Tiefstwert)"],["Text","Text"],["The card uses no background at all.","Die Karte hat keinen eigenen Hintergrund."],["The cloud cover of the weather entity sets the amount of clouds. Off: a fixed amount per weather state.","Der Bedeckungsgrad der Wetter-Entit\xE4t bestimmt die Wolkenmenge. Aus: feste Menge je Wetterlage."],["The sun entity (sun.sun) decides between day and night and provides the elevation for twilight, blue hour and sun rays. With \u201CFixed\u201D the sun or moon stays where you put it.","Die Sonnen-Entit\xE4t (sun.sun) entscheidet \xFCber Tag und Nacht und liefert den Sonnenstand f\xFCr D\xE4mmerung, Blaue Stunde und Sonnenstrahlen. Bei \u201EFest\u201C bleiben Sonne und Mond dort, wo du sie platzierst."],["Theme","Theme"],["Theme Entity","Theme-Entit\xE4t"],["Thickness","St\xE4rke"],["Threshold mode","Schwellenmodus"],["Today","Heute"],["Tomorrow","Morgen"],["Top","Oben"],["Turn off to let birds fly only during the day.","Ausschalten, damit V\xF6gel nur tags\xFCber fliegen."],["Twinkle speed multiplier for night stars.","Funkeltempo der Sterne in der Nacht."],["Type","Art"],["UV index","UV-Index"],["Ultra","Ultra"],["Unit","Einheit"],["Use a different entity for the bar value instead of the chip's main entity.","Eine andere Entit\xE4t f\xFCr den Balkenwert statt der Haupt-Entit\xE4t des Chips."],["Use a different entity for the ring value instead of the chip's main entity.","Eine andere Entit\xE4t f\xFCr den Ringwert statt der Haupt-Entit\xE4t des Chips."],["Use a sensor value as the label instead.","Stattdessen einen Sensorwert als Beschriftung verwenden."],["Use dynamic weather icon","Dynamisches Wettersymbol verwenden"],["Used for the day/night cycle.","F\xFCr den Wechsel von Tag und Nacht."],["Value","Wert"],["Value Attribute","Attribut des Werts"],["Value Entity","Entit\xE4t des Werts"],["Value overflow","\xDCberlauf des Werts"],["Value text size","Schriftgr\xF6\xDFe Wert"],["Vertical","Senkrecht"],["Vertical Offset","Versatz senkrecht"],["Vertical offset from the alignment edge, in pixels.","Senkrechter Abstand vom Ausrichtungsrand, in Pixeln."],["Vivid","Kr\xE4ftig"],["Warm","Warm"],["Weather Entity","Wetter-Entit\xE4t"],["Weather forecast","Wettervorhersage"],["Weather icon","Wettersymbol"],["Weight","Schriftst\xE4rke"],["What happens when the card is tapped.","Was beim Tippen auf die Karte passiert."],["When this entity is on, open or home, the card shows other images:","Wenn diese Entit\xE4t an, offen oder zuhause ist, zeigt die Karte andere Bilder:"],["Width","Breite"],["Wind","Wind"],["Wind Display","Wind-Anzeige"],["Wind bearing","Windrichtung"],["Wind direction as","Windrichtung als"],["Wind direction icon","Symbol der Windrichtung"],["Chip icon","Chip-Symbol"],["Arrow, where the wind blows","Pfeil, wohin der Wind weht"],["Filled arrow, where the wind blows","Gef\xFCllter Pfeil, wohin der Wind weht"],["Compass needle, where the wind comes from","Kompassnadel, woher der Wind kommt"],["Wind direction chips can show the compass point too: open the chip under Chips, then Text \u25B8 Value \u25B8 Wind direction as.","Windrichtungs-Chips k\xF6nnen auch die Himmelsrichtung zeigen: den Chip unter Chips \xF6ffnen, dann Text \u25B8 Wert \u25B8 Windrichtung als."],["Degrees (250)","Grad (250)"],["Compass point (WSW)","Himmelsrichtung (WSW)"],["Compass point and degrees (WSW 250\xB0)","Himmelsrichtung und Grad (WSW 250\xB0)"],["Wind lines","Windlinien"],["Wind speed","Windgeschwindigkeit"],["Wrap","Umbrechen"],["X Offset","Versatz X"],["Y Offset","Versatz Y"],["e.g. /local/weather-icons/","z. B. /local/weather-icons/"],["e.g. 110px","z. B. 110px"],["e.g. 140px or 60%","z. B. 140px oder 60%"],["e.g. 16px","z. B. 16px"],["e.g. 200px","z. B. 200px"],["e.g. 200px or 60%. Constrains the chip width.","z. B. 200px oder 60%. Begrenzt die Breite des Chips."],["e.g. 220 or auto","z. B. 220 oder auto"],["e.g. 40px","z. B. 40px"],["now","jetzt"],["today","heute"],["tomorrow","morgen"],["value","Wert"],["{value} (not supported here)","{value} (hier nicht m\xF6glich)"],["\u201CMoving\u201D follows the real position of the sun throughout the day.","\u201EWandern\u201C folgt dem echten Sonnenstand im Laufe des Tages."],["Wind compass","Windkompass"],["Compass position","Position des Kompasses"],["Show compass point","Himmelsrichtung anzeigen"],["Show degrees","Grad anzeigen"],["Show wind speed","Windgeschwindigkeit anzeigen"],["Frosted background","Milchglas-Hintergrund"],["A frosted box behind the compass, readable on any sky.","Ein Milchglas-Feld hinter dem Kompass, auf jedem Himmel lesbar."],["Shows where the wind comes from, read from wind_bearing of the weather entity. The arrow points where it blows to.","Zeigt, woher der Wind kommt, gelesen aus wind_bearing der Wetter-Entit\xE4t. Der Pfeil zeigt, wohin er weht."],["Automatic follows your Home Assistant theme, or the theme entity if you pick one: with sun.sun the card turns dark at sunset. Light and dark lock the colors. The filters tint the clouds and the sun glow.","Automatisch folgt dem Theme von Home Assistant oder der Theme-Entit\xE4t, wenn du eine w\xE4hlst: mit sun.sun wird die Karte bei Sonnenuntergang dunkel. Hell und Dunkel legen die Farben fest. Die Filter t\xF6nen die Wolken und das Sonnenlicht."],["Matters when cards overlap: a higher layer puts the card in front of others, the offset moves it like a CSS margin, for example to tuck it under a header.","Wichtig, wenn sich Karten \xFCberlappen: Eine h\xF6here Ebene legt die Karte vor andere, der Versatz verschiebt sie wie ein CSS-Margin, zum Beispiel unter einen Header."],["What a tap on the card does, for example open the weather details or another dashboard. Without an action nothing happens. Every chip has a tap action of its own.","Was ein Tippen auf die Karte tut, zum Beispiel die Wetterdetails oder ein anderes Dashboard \xF6ffnen. Ohne Aktion passiert nichts. Jeder Chip hat eine eigene Tipp-Aktion."],["Golden and blue hour follow the height of the sun, sun rays shine through a partly cloudy sky, haze and ground mist come from the visibility, humidity and dew point of your weather, frost from the temperature and humidity. All of it works on its own.","Goldene und blaue Stunde folgen dem Sonnenstand, Sonnenstrahlen scheinen durch einen teils bew\xF6lkten Himmel, Dunst und Bodennebel kommen aus Sichtweite, Luftfeuchte und Taupunkt deines Wetters, Frost aus Temperatur und Luftfeuchte. Das alles l\xE4uft von selbst."],["Wind lines and leaves follow the wind speed and direction of the weather entity and show in windy weather, and in rain, hail or snow from 40 km/h. The compass shows where the wind comes from.","Windlinien und Bl\xE4tter folgen Windst\xE4rke und -richtung der Wetter-Entit\xE4t und erscheinen bei windigem Wetter sowie bei Regen, Hagel oder Schnee ab 40 km/h. Der Kompass zeigt, woher der Wind kommt."],["The amount follows the weather state, or your rain sensor under Your own sensors, and grows with the size of the card. The sliders turn it up or down.","Die Menge folgt der Wetterlage oder deinem Regensensor unter Eigene Sensoren und w\xE4chst mit der Gr\xF6\xDFe der Karte. Die Regler drehen sie hoch oder runter."],["Shooting stars and comets appear on clear nights only; rain, snow, storms and fog hide them. They need Effect Quality 1 or higher under Performance.","Sternschnuppen und Kometen erscheinen nur in klaren N\xE4chten; Regen, Schnee, Gewitter und Nebel verdecken sie. Sie brauchen Effekt-Qualit\xE4t 1 oder h\xF6her unter Leistung."],["Under Performance you set whether birds and planes may fly at all; here how often and how fast.","Unter Leistung legst du fest, ob V\xF6gel und Flugzeuge \xFCberhaupt fliegen; hier, wie oft und wie schnell."],["The night image comes with the sun, like the moon, or with the dark theme. The fade sets how many seconds one image takes to blend into the next; 0 switches at once.","Das Nachtbild kommt mit der Sonne, wie der Mond, oder mit dem dunklen Theme. Die \xDCberblendung legt fest, wie viele Sekunden ein Bild in das n\xE4chste \xFCbergeht; 0 wechselt sofort."],["The alignment picks the corner, the size scales the image and the offsets move it, in pixels or percent.","Die Ausrichtung w\xE4hlt die Ecke, die Gr\xF6\xDFe skaliert das Bild und der Versatz verschiebt es, in Pixeln oder Prozent."],["Pick an entity and, if you like, one of its attributes. With a weather entity the chip can also show the forecast for a later hour or day.","W\xE4hle eine Entit\xE4t und, wenn du willst, eines ihrer Attribute. Mit einer Wetter-Entit\xE4t zeigt der Chip auch die Vorhersage f\xFCr eine sp\xE4tere Stunde oder einen sp\xE4teren Tag."],["Name, value and unit as the chip writes them. Dates and times take codes like %a or %H:%M, wind directions can show as WSW.","Name, Wert und Einheit, wie der Chip sie schreibt. Datum und Uhrzeit nehmen Codes wie %a oder %H:%M, Windrichtungen k\xF6nnen als WSW erscheinen."],["An icon like mdi:thermometer, the icon of the entity, or the weather icon of a forecast. Your own SVG icons work too.","Ein Symbol wie mdi:thermometer, das Symbol der Entit\xE4t oder das Wettersymbol einer Vorhersage. Eigene SVG-Symbole gehen auch."],["Ring and bar show the value as a gauge. Sun path draws the arc of the sun and is offered for sun entities. The layout sets how icon, label and value sit.","Ring und Balken zeigen den Wert als Anzeige. Sonnenbogen zeichnet den Bogen der Sonne und steht bei Sonnen-Entit\xE4ten zur Wahl. Das Layout legt fest, wie Symbol, Name und Wert sitzen."],["A chip sits in a chip area. Free positioning takes it out and puts it anywhere on the card.","Ein Chip sitzt in einem Chip-Bereich. Frei platzieren nimmt ihn heraus und setzt ihn an eine beliebige Stelle der Karte."],["Without an action a tap opens the details of the entity.","Ohne Aktion \xF6ffnet ein Tippen die Details der Entit\xE4t."],["Shows the chip only while all conditions hold, like the visibility of Home Assistant cards.","Zeigt den Chip nur, solange alle Bedingungen erf\xFCllt sind, wie die Sichtbarkeit von Home-Assistant-Karten."],["Each layout is a finished look for one kind of spot: Standard for a normal column, Compact as a slim strip, Wide for a broad spot, Home with a house, the bundled one or yours, Panel as a tall wall panel with the next hours.","Jedes Layout ist ein fertiger Look f\xFCr eine Art Platz: Standard f\xFCr eine normale Spalte, Compact als schmaler Streifen, Wide f\xFCr einen breiten Platz, Home mit einem Haus, dem mitgelieferten oder deinem, Panel als hohes Wandpanel mit den n\xE4chsten Stunden."],["Each sensor replaces one value of the weather entity: rain sets the amount of rain and snow, wind moves the sky and the compass, temperature, humidity and dew point bring mist, cloud cover and visibility shape the clouds and the haze.","Jeder Sensor ersetzt einen Wert der Wetter-Entit\xE4t: Regen bestimmt die Menge von Regen und Schnee, Wind bewegt Himmel und Kompass, Temperatur, Luftfeuchte und Taupunkt bringen Nebel, Bew\xF6lkung und Sichtweite formen Wolken und Dunst."],["Where the chips sit and how they line up: in a row, in a grid with columns or as a strip that scrolls. Style, size and background apply to all chips; single chips can change them under Look.","Wo die Chips sitzen und wie sie sich reihen: in einer Reihe, in einem Raster mit Spalten oder als Streifen zum Scrollen. Stil, Gr\xF6\xDFe und Hintergrund gelten f\xFCr alle Chips; einzelne Chips \xE4ndern sie unter Darstellung."],["A second place for chips with its own position and layout, for example the values at the top and the forecast at the bottom. A chip moves here under Position.","Ein zweiter Platz f\xFCr Chips mit eigener Position und eigenem Layout, zum Beispiel die Werte oben und die Vorhersage unten. Ein Chip wechselt unter Position hierher."],["Draws the temperature as a curve over the forecast chips of a chip area that show the temperature, at least two of them.","Zeichnet die Temperatur als Kurve \xFCber die Vorhersage-Chips eines Chip-Bereichs, die die Temperatur zeigen, mindestens zwei."],["Day and night","Tag und Nacht"],["Blending between images","\xDCberblenden zwischen Bildern"],["All chip options","Alle Chip-Optionen"],["Ring & bar gauges","Ring- und Balkenanzeigen"],["Per-chip styling","Stil pro Chip"],["Two chip areas","Zwei Chip-Bereiche"],["Daylight","Tageslicht"],["Night","Nacht"],["Sun path","Sonnenbogen"],["Automatic puts each style in its usual corner and moves it to a free place. With no free place, as in the Panel layout, the compass stays hidden: pick a position to show it anyway.","Automatisch setzt jeden Stil in seine \xFCbliche Ecke und weicht auf einen freien Platz aus. Ohne freien Platz, wie im Layout Panel, bleibt der Kompass aus: w\xE4hle eine Position, um ihn trotzdem zu zeigen."],["Wind arrow","Windpfeil"],["Compass rose","Kompassrose"],["Compass chip","Kompass-Chip"],["Compass band","Kompassband"],["Wind vane","Windfahne"],["Automatic","Automatisch"],["Top left","Oben links"],["Top center","Oben Mitte"],["Top right","Oben rechts"],["Bottom left","Unten links"],["Bottom center","Unten Mitte"],["Bottom right","Unten rechts"],["Your own sensors (optional)","Eigene Sensoren (optional)"],["Empty fields and unavailable sensors use the weather entity. The weather itself (sunny, rain, storm) always comes from it.","Leere Felder und nicht verf\xFCgbare Sensoren nehmen die Wetter-Entit\xE4t. Das Wetter selbst (Sonne, Regen, Gewitter) kommt immer von ihr."],["Wind direction","Windrichtung"],["Dew point","Taupunkt"],["Cloud cover","Bew\xF6lkung"],["Visibility","Sichtweite"],["Moves the sky, the wind lines and the compass. Sensors in km/h, mph, m/s, kn, ft/s or Beaufort.","Bewegt Himmel, Windlinien und Kompass. Sensoren in km/h, mph, m/s, kn, ft/s oder Beaufort."],["Where the wind comes from, in degrees or as a compass point like NW.","Woher der Wind kommt, in Grad oder als Himmelsrichtung wie NW."],["With the humidity it decides on ground mist.","Entscheidet zusammen mit der Luftfeuchte \xFCber Bodennebel."],["Humid air makes haze and, near the dew point, ground mist.","Feuchte Luft macht Dunst und nahe am Taupunkt Bodennebel."],["Empty: worked out from your temperature and humidity.","Leer: wird aus deiner Temperatur und Luftfeuchte berechnet."],["Sets the amount of clouds. A sensor in %.","Bestimmt die Menge der Wolken. Ein Sensor in %."],["Low visibility makes haze. Sensors in km, mi, m, ft or yd.","Geringe Sichtweite macht Dunst. Sensoren in km, mi, m, ft oder yd."],["Optional. Without a sensor the card works out the moon phase from the date.","Optional. Ohne Sensor berechnet die Karte die Mondphase aus dem Datum."],["Date format","Datumsformat"],["Codes like %a (day), %d.%m. (date) or %H:%M (time). Empty shows the usual text.","Codes wie %a (Tag), %d.%m. (Datum) oder %H:%M (Uhrzeit). Leer zeigt den \xFCblichen Text."],["Layouts","Layouts"],["A finished look with one tap","Ein fertiger Look mit einem Tipp"],["A big temperature, the condition and a quiet row with humidity, wind and tomorrow","Gro\xDFe Temperatur, das Wetter darunter und eine ruhige Reihe mit Feuchte, Wind und morgen"],["One slim strip with the temperature, the condition and two values","Ein schmaler Streifen mit Temperatur, Wetter und zwei Werten"],["The weather now on the left, values and tomorrow in two columns on the right. Needs a wide spot","Links das Wetter jetzt, rechts Werte und morgen in zwei Spalten. Braucht einen breiten Platz"],["No finished look: you choose chips, sizes and positions yourself","Kein fertiger Look: Chips, Gr\xF6\xDFen und Positionen w\xE4hlst du selbst"],["Picking a layout resets your own values for its look: size, image placement and the chip row. Your chips stay. Values you change afterwards win over the layout.","Beim W\xE4hlen eines Layouts werden deine eigenen Werte f\xFCr seinen Look zur\xFCckgesetzt: Gr\xF6\xDFe, Bildplatzierung und Chip-Leiste. Deine Chips bleiben. Werte, die du danach \xE4nderst, gewinnen gegen das Layout."],["One own value was reset so the layout looks as intended.","Ein eigener Wert wurde zur\xFCckgesetzt, damit das Layout wie gedacht aussieht."],["{n} own values were reset so the layout looks as intended.","{n} eigene Werte wurden zur\xFCckgesetzt, damit das Layout wie gedacht aussieht."],["Undo","R\xFCckg\xE4ngig"],["Your own chips replace the chips of this layout.","Deine eigenen Chips ersetzen die Chips dieses Layouts."],["Use the layout's chips","Chips des Layouts verwenden"],["The card now shows the chips of the layout.","Die Karte zeigt jetzt die Chips des Layouts."],["Keep your own chips? Without them the card shows the chips of the layout.","Deine eigenen Chips behalten? Ohne sie zeigt die Karte die Chips des Layouts."],["Keep","Behalten"],["Arrange them for the layout? Your chips join the chips of the layout and take the look of its chip row.","F\xFCr das Layout anordnen? Deine Chips kommen zu den Chips des Layouts und \xFCbernehmen das Aussehen seiner Chip-Leiste."],["Arrange","Anordnen"],["Keep positions","Positionen behalten"],["Your chips were arranged for the layout.","Deine Chips wurden f\xFCr das Layout angeordnet."],["Change","\xC4ndern"],["The card also shows the chips of its layout, before your own.","Die Karte zeigt auch die Chips ihres Layouts, vor deinen eigenen."],["Card","Karte"],["Style, size, colors, position and tap action","Stil, Gr\xF6\xDFe, Farben, Position und Tippen-Aktion"],["Style & size","Stil & Gr\xF6\xDFe"],["With its own sky or as a header, height and padding","Mit eigenem Himmel oder als Kopfzeile, H\xF6he und Innenabstand"],["Light or dark look and color filters","Heller oder dunkler Look und Farbfilter"],["Position & layers","Position & Ebenen"],["Full width, edge fades, stacking and offset","Volle Breite, Randverl\xE4ufe, Reihenfolge und Versatz"],["Stacking order and offset","Ebenen-Reihenfolge und Versatz"],["What happens when the card is tapped","Was beim Tippen auf die Karte passiert"],["Chips are hidden by Hide all text under Card, Style & size. Your settings are kept.","Chips sind durch \u201EAlle Texte ausblenden\u201C unter Karte, Stil & Gr\xF6\xDFe versteckt. Deine Einstellungen bleiben erhalten."],["Sky & weather","Himmel & Wetter"],["Sun and moon, light, wind, rain and snow, night sky, birds","Sonne und Mond, Licht, Wind, Regen und Schnee, Nachthimmel, V\xF6gel"],["Sun & moon","Sonne & Mond"],["Day and night, moon phase, position and size","Tag und Nacht, Mondphase, Position und Gr\xF6\xDFe"],["Light & clouds","Licht & Wolken"],["Blue and golden hour, sun rays, haze, mist and frost","Blaue und goldene Stunde, Sonnenstrahlen, Dunst, Nebel und Frost"],["Wind lines, leaves and the compass","Windlinien, Bl\xE4tter und der Kompass"],["How much falls, splashes and snow on the edge","Wie viel f\xE4llt, Spritzer und Schnee am Rand"],["Stars, shooting stars and comets","Sterne, Sternschnuppen und Kometen"],["How often they fly and how fast","Wie oft sie fliegen und wie schnell"],["Images","Bilder"],["Your own picture for day and night, also by state","Eigenes Bild f\xFCr Tag und Nacht, auch je nach Zustand"],["Sunset","Sonnenuntergang"],["Rain","Regen"],["Max width (%)","Maximale Breite (%)"],["The most of the card width the image may take; on a narrower card it shrinks. 0 = no limit.","So viel der Kartenbreite darf das Bild h\xF6chstens einnehmen; auf einer schmaleren Karte wird es kleiner. 0 = keine Grenze."],["Home shows the house that comes with the card, wet in the rain and snowy in the snow, until you enter your own picture. Enter none as the day image for no picture.","Home zeigt das mitgelieferte Haus, nass bei Regen und verschneit bei Schnee, bis du ein eigenes Bild eintr\xE4gst. Trage none als Tagbild ein, wenn du kein Bild willst."],["Day & night","Tag & Nacht"],["When the night image shows, and the fade between images","Wann das Nachtbild kommt, und die \xDCberblendung"],["Where the image sits and how big it is","Wo das Bild sitzt und wie gro\xDF es ist"],["Performance","Leistung"],["Preset, frame rate, detail and speed","Voreinstellung, Bildrate, Detail und Tempo"],["\u201CLow\u201D saves battery and helps older tablets, \u201CUltra\u201D shows everything at full quality. Every effect can be switched off on its own under Sky & weather; anything that is off costs nothing.","\u201ENiedrig\u201C schont den Akku und hilft \xE4lteren Tablets, \u201EUltra\u201C zeigt alles in voller Qualit\xE4t. Jeder Effekt l\xE4sst sich unter Himmel & Wetter einzeln abschalten; was aus ist, kostet keine Leistung."],["Entity state","Zustand einer Entit\xE4t"],["Entity value","Wert einer Entit\xE4t"],["Screen size","Bildschirmgr\xF6\xDFe"],["Time and weekday","Uhrzeit und Wochentag"],["User","Benutzer"],["Phone","Handy"],["Tablet","Tablet"],["Desktop","Desktop"],["Wide screen","Breiter Bildschirm"],["Monday","Montag"],["Tuesday","Dienstag"],["Wednesday","Mittwoch"],["Thursday","Donnerstag"],["Friday","Freitag"],["Saturday","Samstag"],["Sunday","Sonntag"],["Match","Vergleich"],["Screen sizes","Bildschirmgr\xF6\xDFen"],["Media query","Media Query"],["From","Von"],["Until","Bis"],["Weekdays","Wochentage"],["Users","Benutzer"],["Is","Ist"],["Is not","Ist nicht"],["Add condition","Bedingung hinzuf\xFCgen"],["Filled in from the sizes above, or write your own CSS media query.","Wird aus den Gr\xF6\xDFen oben gef\xFCllt, oder schreib eine eigene CSS Media Query."],["Group of conditions","Gruppe von Bedingungen"],["Hidden right now","Gerade ausgeblendet"],["Shown right now","Gerade sichtbar"],["Pick one or more states, or type any value.","W\xE4hle einen oder mehrere Zust\xE4nde oder tippe einen beliebigen Wert ein."],["Show this chip only when all conditions are met.","Diesen Chip nur zeigen, wenn alle Bedingungen erf\xFCllt sind."],["This group (and, or, not) can be changed in the YAML editor.","Diese Gruppe (and, or, not) l\xE4sst sich im YAML-Editor \xE4ndern."],["Own CSS","Eigenes CSS"],["Styles inside the card, without card_mod. Classes and variables are listed in the docs.","Styles direkt in der Karte, ohne card_mod. Klassen und Variablen stehen in der Doku."],["Works like card_mod, but built in: the styles go straight into the card. Use :host for the whole card, CSS variables such as --awc-bottom-font-size, or the parts like .chip and #chips-row.","Wie card_mod, nur eingebaut: Die Styles landen direkt in der Karte. Nimm :host f\xFCr die ganze Karte, CSS-Variablen wie --awc-bottom-font-size oder Teile wie .chip und #chips-row."],["Your own styles inside the card","Deine eigenen Styles in der Karte"],[".jpg",".jpg"],[".png",".png"],[".svg",".svg"],[".webp",".webp"],["A folder like /local/house/ with one picture per weather: sunny.webp, rainy.webp, rainy-night.webp and so on.","Ein Ordner wie /local/house/ mit einem Bild pro Wetter: sunny.webp, rainy.webp, rainy-night.webp und so weiter."],["A folder with one picture per weather state","Ein Ordner mit einem Bild pro Wetterlage"],["File type","Dateityp"],["Name the pictures after the weather state: sunny, partlycloudy, cloudy, fog, rainy, pouring, lightning, lightning-rainy, snowy, snowy-rainy, hail, windy, clear-night, exceptional. Add -night for the night picture, like rainy-night. A missing picture falls back to a close one (pouring to rainy) and then to the images above. Every missing file shows once as a 404 in the browser console.","Benenne die Bilder nach der Wetterlage: sunny, partlycloudy, cloudy, fog, rainy, pouring, lightning, lightning-rainy, snowy, snowy-rainy, hail, windy, clear-night, exceptional. F\xFCr das Nachtbild h\xE4ngst du -night an, etwa rainy-night. Fehlt ein Bild, nimmt die Karte ein \xE4hnliches (pouring wird rainy) und sonst die Bilder oben. Jede fehlende Datei erscheint einmal als 404 in der Browser-Konsole."],["Picture folder","Bilderordner"],["Pictures by weather","Bilder nach Wetter"],["The file ending of all pictures in the folder.","Die Dateiendung aller Bilder im Ordner."],["Type of condition","Art der Bedingung"],["Visibility condition","Bedingung"],["Greater than","Gr\xF6\xDFer als"],["Less than","Kleiner als"],["Conditions","Bedingungen"],["Band from low to high","Band von Tief bis Hoch"],["Colored by temperature","Farbig nach Temperatur"],["Curve height (px)","H\xF6he der Kurve (px)"],["Drawn over the forecast chips in the chip area that show the temperature, at least two.","Liegt \xFCber den Vorhersage-Chips im Chip-Bereich, die die Temperatur zeigen, mindestens zwei."],["Line","Linie"],["Room the curve takes above the chips.","Platz, den die Kurve \xFCber den Chips einnimmt."],["Temperature curve","Temperaturkurve"],["Tick ring","Strichkranz"],["Wind badge","Wind-Kachel"],["Soft line","Zarte Linie"],["Add second chip area","Zweiten Chip-Bereich hinzuf\xFCgen"],["Chip area 1","Chip-Bereich 1"],["Chip area 2","Chip-Bereich 2"],["Chip area {n}","Chip-Bereich {n}"],["Chips with Chip area 2 in their Position tab sit here, with this place and look.","Chips, die im Tab Position \u201EChip-Bereich 2\u201C haben, sitzen hier, mit diesem Platz und Aussehen."],["Remove second chip area","Zweiten Chip-Bereich entfernen"],["Visible chips","Sichtbare Chips"],["Where the chip sits","Wo der Chip sitzt"],["A tall card: the weather on top, tiles with values and the next hours under a soft curve. Needs a tall spot","Eine hohe Karte: oben das Wetter, darunter Kacheln mit Werten und die n\xE4chsten Stunden unter einer zarten Kurve. Braucht einen hohen Platz"],["Home","Zuhause"],["Panel","Panel"],["A house with the weather beside it, the bundled one or yours, a wind ring and a frosted bar for values like your rooms","Ein Haus mit dem Wetter daneben, das mitgelieferte oder deins, einem Windkranz und einer Milchglas-Leiste f\xFCr Werte wie deine R\xE4ume"],["From the layout","Vom Layout"],["From the layout. Pick a value to set your own.","Vom Layout. W\xE4hle einen Wert, um einen eigenen zu setzen."],["Grey values come from the layout.","Graue Werte kommen vom Layout."]],zt=Object.freeze({de:Object.freeze(Object.fromEntries(Di.map(([n,e])=>[n,e])))});var Mi=Object.freeze(["en","de"]);function Lt(n){let e=n&&(n.locale&&n.locale.language||n.language)||"en",t=String(e).toLowerCase().split(/[-_]/)[0];return Mi.includes(t)?t:"en"}var Tt={texts:null};function Ge(n){let e=zt[n]||null;return(t,i)=>{Tt.texts&&t&&Tt.texts.add(t);let a=e&&e[t]||t;if(i)for(let[r,s]of Object.entries(i))a=a.split(`{${r}}`).join(String(s));return a}}var Pa=Object.freeze(["off","arrow","rose","pill","band","vane","ticks","badge"]),Oa=Object.freeze(["auto","top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"]),Fa=Object.freeze({arrow:1}),Na=Object.freeze({arrow:"bottom-left",rose:"bottom-right",pill:"top-right",band:"bottom-center",vane:"bottom-right",ticks:"top-right",badge:"top-right"}),Ia=Object.freeze({en:["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],de:["N","NNO","NO","ONO","O","OSO","SO","SSO","S","SSW","SW","WSW","W","WNW","NW","NNW"]});var Da=Object.freeze(["degrees","cardinal","both"]);function we(n,e){if(!n||!n.entity)return!1;if(n.attribute)return n.attribute==="wind_bearing";if(n.forecast)return!1;let t=e&&e.states&&e.states[n.entity];return!!(t&&t.attributes&&t.attributes.device_class==="wind_direction")}var Ma=Object.freeze(["arrow","filled","needle"]);var Bi=/^[a-z0-9_]+\.[a-z0-9_]+$/,Ri=["sun","mon","tue","wed","thu","fri","sat"],xe=n=>n==null?[]:Array.isArray(n)?n:[n],Hi=n=>typeof n=="string"&&Bi.test(n);function Ot(n,e){if(!Hi(e))return;let t=n.states&&n.states[e];return t?t.state:void 0}function Ft(n){return typeof n.entity_id=="string"&&n.entity_id||n.entity||""}function Wt(n,e){let t=Ft(n),i=t&&e.states?e.states[t]:void 0,a;if(!i)a="unknown";else if(n.attribute){let c=i.attributes?i.attributes[n.attribute]:void 0;a=c==null?"unknown":String(c)}else a=i.state;let r=n.state??n.state_not;if(r==null)return!1;let s=xe(r).map(String);for(let c of xe(r)){let d=Ot(e,c);d!==void 0&&s.push(d)}return n.state!=null?s.includes(a):!s.includes(a)}function Ui(n,e){let t=Ft(n),i=t&&e.states?e.states[t]:void 0,a=i?n.attribute?(i.attributes||{})[n.attribute]:i.state:void 0;if(a==null||a==="")return!1;let r=Number(a);if(Number.isNaN(r))return!1;let s=p=>Number(typeof p=="string"?Ot(e,p)??p:p),c=s(n.above),d=s(n.below);return(n.above==null||Number.isNaN(c)||c<r)&&(n.below==null||Number.isNaN(d)||d>r)}function Vi(n){if(!n.media_query||typeof matchMedia!="function")return!1;try{return matchMedia(String(n.media_query)).matches}catch{return!1}}function Gi(n,e){let t=e.user&&e.user.id;return Array.isArray(n.users)&&t?n.users.includes(t):!1}function Pt(n){let e=/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(String(n||"").trim());if(!e)return null;let t=Number(e[1]),i=Number(e[2]),a=Number(e[3]||0);return t>23||i>59||a>59?null:t*3600+i*60+a}function ji(n,e){try{let t=new Intl.DateTimeFormat("en-US",{timeZone:e||void 0,hourCycle:"h23",weekday:"short",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(n),i=a=>(t.find(r=>r.type===a)||{}).value;return{seconds:Number(i("hour"))*3600+Number(i("minute"))*60+Number(i("second")),weekday:String(i("weekday")||"").slice(0,3).toLowerCase()}}catch{return{seconds:n.getHours()*3600+n.getMinutes()*60+n.getSeconds(),weekday:Ri[n.getDay()]}}}function qi(n){if((n.locale||{}).time_zone==="server"&&n.config&&n.config.time_zone)return n.config.time_zone}function Ki(n,e,t){let i=ji(t,qi(e)),a=xe(n.weekdays).map(d=>String(d).toLowerCase());if(a.length&&!a.includes(i.weekday))return!1;let r=n.after?Pt(n.after):null,s=n.before?Pt(n.before):null,c=i.seconds;return r!==null&&s!==null?s<r?c>=r||c<=s:c>=r&&c<=s:r!==null?c>=r:s!==null?c<=s:!0}function Nt(n,e,t){if(!n||typeof n!="object")return!0;if(!("condition"in n))return Wt(n,e);let i=Array.isArray(n.conditions)?n.conditions:null;switch(n.condition){case"numeric_state":return Ui(n,e);case"screen":return Vi(n);case"user":return Gi(n,e);case"time":return Ki(n,e,t);case"and":return i?$e(i,e,t):!0;case"or":return i?i.some(a=>Nt(a,e,t)):!0;case"not":return i?!$e(i,e,t):!0;default:return Wt(n,e)}}function $e(n,e,t=new Date){return e?xe(n).every(a=>Nt(a,e,t)):!0}var Yi=n=>typeof n=="string"?n.trim():"",Zi={pouring:["rainy"],"lightning-rainy":["lightning","rainy"],"snowy-rainy":["snowy","rainy"],hail:["rainy"],lightning:["rainy"],"windy-variant":["windy"],"clear-night":["sunny"]},Qi="\0base";function Xi(n){let e=String(n||"").trim().toLowerCase().replace(/^\./,"");return/^[a-z0-9]{2,5}$/.test(e)?e:"webp"}function It(n,e,t,i){let a=Yi(n),r=String(t||"").trim().toLowerCase();if(!a||!/^[a-z-]+$/.test(r))return[];let s=a.endsWith("/")?a:`${a}/`,c=Xi(e),d=[r,...Zi[r]||[]],p=m=>`${s}${m}.${c}`;if(!i)return d.filter(m=>m!=="clear-night").map(p);let g=d.map(m=>p(m==="clear-night"?m:`${m}-night`)),u=d.filter(m=>m!=="clear-night").map(p);return[...new Set([...g,Qi,...u])]}var o=Ge("en"),Dt="en";function Ji(n){let e=Lt(n);e!==Dt&&(Dt=e,o=Ge(e))}var z=n=>n.map(e=>({...e,label:o(e.label)})),ea=[{value:"state",label:"Entity state"},{value:"numeric_state",label:"Entity value"},{value:"screen",label:"Screen size"},{value:"time",label:"Time and weekday"},{value:"user",label:"User"}],je=[{value:"mobile",label:"Phone",query:"(max-width: 767px)"},{value:"tablet",label:"Tablet",query:"(min-width: 768px) and (max-width: 1023px)"},{value:"desktop",label:"Desktop",query:"(min-width: 1024px) and (max-width: 1279px)"},{value:"wide",label:"Wide screen",query:"(min-width: 1280px)"}],Mt=[{value:"mon",label:"Monday"},{value:"tue",label:"Tuesday"},{value:"wed",label:"Wednesday"},{value:"thu",label:"Thursday"},{value:"fri",label:"Friday"},{value:"sat",label:"Saturday"},{value:"sun",label:"Sunday"}],ta={condition:"Type of condition",entity:"Entity",attribute:"Attribute (optional)",match:"Match",state:"States",above:"Greater than",below:"Less than",screens:"Screen sizes",media_query:"Media query",after:"From",before:"Until",weekdays:"Weekdays",users:"Users"},Bt="https://whyisthisbroken.github.io/atmo-weather-card/",Rt={colors:["Automatic follows your Home Assistant theme, or the theme entity if you pick one: with sun.sun the card turns dark at sunset. Light and dark lock the colors. The filters tint the clouds and the sun glow.","appearance.html#theme--filters"],position:["Matters when cards overlap: a higher layer puts the card in front of others, the offset moves it like a CSS margin, for example to tuck it under a header.","guides.html#layout--layering"],tap:["What a tap on the card does, for example open the weather details or another dashboard. Without an action nothing happens. Every chip has a tap action of its own.","appearance.html#card-style--layout"],light:["Golden and blue hour follow the height of the sun, sun rays shine through a partly cloudy sky, haze and ground mist come from the visibility, humidity and dew point of your weather, frost from the temperature and humidity. All of it works on its own.",[["weather-data.html#weather-data","Weather data"],["weather-data.html#frost","Frost"]]],wind:["Wind lines and leaves follow the wind speed and direction of the weather entity and show in windy weather, and in rain, hail or snow from 40 km/h. The compass shows where the wind comes from.",[["effects.html#wind","Wind"],["effects.html#wind-compass","Wind compass"]]],precip:["The amount follows the weather state, or your rain sensor under Your own sensors, and grows with the size of the card. The sliders turn it up or down.","effects.html#rain--snow"],night:["Shooting stars and comets appear on clear nights only; rain, snow, storms and fog hide them. They need Effect Quality 1 or higher under Performance.","effects.html#night-sky"],fauna:["Under Performance you set whether birds and planes may fly at all; here how often and how fast.","effects.html#birds--planes"],image_time:["The night image comes with the sun, like the moon, or with the dark theme. The fade sets how many seconds one image takes to blend into the next; 0 switches at once.",[["images.html#custom-images","Day and night"],["images.html#image-transition","Blending between images"]]],image_place:["The alignment picks the corner, the size scales the image and the offsets move it, in pixels or percent.","images.html#custom-images"]},Ht={data:["Pick an entity and, if you like, one of its attributes. With a weather entity the chip can also show the forecast for a later hour or day.","chips.html#forecast-chips"],text:["Name, value and unit as the chip writes them. Dates and times take codes like %a or %H:%M, wind directions can show as WSW.",[["chips.html#date-format","Date format"],["chips.html#per-chip-options","All chip options"]]],icon:["An icon like mdi:thermometer, the icon of the entity, or the weather icon of a forecast. Your own SVG icons work too.","guides.html#weather-icons"],look:["Ring and bar show the value as a gauge. Sun path draws the arc of the sun and is offered for sun entities. The layout sets how icon, label and value sit.",[["chips.html#ring--bar-gauges","Ring & bar gauges"],["chips.html#sun-path","Sun path"],["chips.html#per-chip-styling","Per-chip styling"]]],position:["A chip sits in a chip area. Free positioning takes it out and puts it anywhere on the card.",[["chips.html#chip-area-2","Two chip areas"],["chips.html#free-positioning","Free positioning"]]],tap:["Without an action a tap opens the details of the entity.","chips.html#per-chip-options"],visibility:["Shows the chip only while all conditions hold, like the visibility of Home Assistant cards.","chips.html#chip-visibility"]};function Ut(n){let e=ve(String(n.card_layout||"").trim().toLowerCase(),n.weather_entity||"",n.sun_entity||"sun.sun")||{},{chips:t,...i}=e;return St(Ve(n)?{...i,...kt}:i,n)}var le=n=>JSON.parse(JSON.stringify(n||{}));function Se(n){return Array.isArray(n)?`[${n.map(Se).join(",")}]`:n&&typeof n=="object"?`{${Object.keys(n).filter(e=>n[e]!==void 0).sort().map(e=>`${JSON.stringify(e)}:${Se(n[e])}`).join(",")}}`:JSON.stringify(n===void 0?null:n)}function ia(n){let e=String(n||"").replace(/\s+/g,"").toLowerCase();return e==="mm/h"||e==="in/h"}var aa=["km/h","mph","m/s","kn","kt","knots","ft/s","beaufort","bft"],ra=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],Vt=Object.freeze({wind_speed_entity:(n,e)=>e==="wind_speed"||aa.includes(n.toLowerCase()),wind_bearing_entity:(n,e,t)=>e==="wind_direction"||n==="\xB0"||ra.includes(String(t||"").trim().toUpperCase()),temperature_entity:(n,e)=>e==="temperature"||n==="\xB0C"||n==="\xB0F",humidity_entity:(n,e)=>e==="humidity",dew_point_entity:(n,e)=>e==="temperature"||n==="\xB0C"||n==="\xB0F",cloud_coverage_entity:(n,e)=>n==="%"&&!e,visibility_entity:(n,e)=>e==="distance"||["km","mi","m","ft","yd"].includes(n)});function ke(n){return String(n||"").replace(/["\\\n\r]/g,"")}var b=Object.freeze({weather_entity:"Weather Entity",sun_entity:"Sun Entity",moon_phase_entity:"Moon Phase Entity",precipitation_entity:"Precipitation Sensor",wind_speed_entity:"Wind speed",wind_bearing_entity:"Wind direction",temperature_entity:"Temperature",humidity_entity:"Humidity",dew_point_entity:"Dew point",cloud_coverage_entity:"Cloud cover",visibility_entity:"Visibility",theme_entity:"Theme Entity",_color_mode:"Color Mode",card_style:"Card Style",card_layout:"Layout",card_square:"Square Mode",card_height:"Card Height",card_padding:"Card Padding",card_offset:"Card Offset",card_stack_order:"Layer Order",card_tap_action:"Tap Action",css:"Own CSS",card_filter_clouds:"Cloud Filter",card_filter_sun:"Sun Filter",card_full_width:"Full Width",card_mask_vertical:"Fade Top & Bottom Edges",card_mask_horizontal:"Fade Left & Right Edges",card_hide_text:"Hide All Text",card_background_style:"Background Style",celestial_size:"Size (px)",celestial_position:"Position Mode",celestial_alignment:"Alignment",celestial_x:"X Offset",celestial_y:"Y Offset",image_day:"Day Image URL",image_night:"Night Image URL",image_night_source:"Night image shows",image_transition:"Fade time (s)",image_folder:"Picture folder",forecast_curve:"Temperature curve",forecast_curve_height:"Curve height (px)",image_folder_type:"File type",image_scale:"Image Scale (%)",image_max_width:"Max width (%)",image_alignment:"Image Position",image_x:"Horizontal Offset",image_y:"Vertical Offset",status_entity:"Status Entity",status_day:"Status Image (Day)",status_night:"Status Image (Night)",chip_area_hide:"Disable Chips",chip_area_position:"Position",chip_text_size:"Value text size",chip_label_size:"Label text size",chip_area_layout:"Layout",chip_style:"Chip style",chip_area_columns:"Columns",chip_area_scroll_count:"Show at once",chip_area_align:"Align content",chip_area_width:"Width",chip_area_height:"Height",chip_area_full_width:"Full width chips",chip_padding:"Chip padding",chip_area_padding:"Container padding",chip_area_gap:"Chips gap",chip_gap:"Icon/text gap",chip_text_gap:"Label/value gap",chip_icon_size:"Icon size",chip_area_background:"Background",chip_area_grouped:"One shared background",chip_area_separator:"Divider between chips",chip_icon_background:"Icon background",chip_icon_padding:"Padding around icon",custom_cards_position:"Embedded Cards Position",custom_cards_css_class:"Embedded Cards CSS Class",chip_area_background_color:"Container Background Color",perf_mode:"Performance Preset",perf_fps:"Frame Rate",perf_cloud_quality:"Cloud Detail",perf_effects:"Effect Quality",perf_fauna:"Fauna",perf_dpr:"Sharpness",animation_speed:"Animation Speed",bird_animation_speed:"Bird Animation Speed",star_animation_speed:"Star Twinkle Speed",fauna_birds_at_night:"Birds at night",fauna_plane_speed:"Plane speed",effect_blue_hour:"Blue hour",effect_golden_hour:"Golden hour",effect_sun_rays:"Sun rays",effect_haze:"Haze",effect_ground_mist:"Ground mist",effect_frost:"Frost",effect_cloud_coverage:"Cloud amount from data",effect_shooting_stars:"Shooting stars",effect_comets:"Comets",shooting_star_rate:"Frequency",comet_rate:"Frequency",wind_style:"Wind Display",leaf_density:"Amount of leaves",rain_density:"Amount of rain",snow_density:"Amount of snow",effect_rain_splash:"Splashes",effect_snow_edge:"Snow edge",effect_spill:"Fall out of the card",effect_text_scrim:"Veil behind the text",wind_compass:"Wind compass",wind_compass_position:"Compass position",wind_compass_cardinal:"Show compass point",wind_compass_degrees:"Show degrees",wind_compass_speed:"Show wind speed",wind_compass_background:"Frosted background"}),S=Object.freeze({weather_entity:"",sun_entity:"Used for the day/night cycle.",moon_phase_entity:"Optional. Without a sensor the card works out the moon phase from the date.",precipitation_entity:"Optional. Current rain intensity in mm/h or in/h, so rain and snow follow the measured amount. Only sensors with these units are listed.",wind_speed_entity:"Moves the sky, the wind lines and the compass. Sensors in km/h, mph, m/s, kn, ft/s or Beaufort.",wind_bearing_entity:"Where the wind comes from, in degrees or as a compass point like NW.",temperature_entity:"With the humidity it decides on ground mist.",humidity_entity:"Humid air makes haze and, near the dew point, ground mist.",dew_point_entity:"Empty: worked out from your temperature and humidity.",cloud_coverage_entity:"Sets the amount of clouds. A sensor in %.",visibility_entity:"Low visibility makes haze. Sensors in km, mi, m, ft or yd.",theme_entity:"An entity whose state switches between light and dark mode.",card_height:"In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.",card_padding:"Inner padding, e.g. 16px or 12px 20px.",card_offset:"",card_tap_action:"What happens when the card is tapped.",css:"Styles inside the card, without card_mod. Classes and variables are listed in the docs.",card_full_width:"Removes side margins so the card fills edge to edge.",card_mask_vertical:"Adds a soft fade to the top and bottom edges.",card_mask_horizontal:"Adds a soft fade to the left and right edges.",card_hide_text:"Hides all text overlays in one toggle.",card_filter_clouds:"A color filter applied to clouds.",card_filter_sun:"A color filter applied to the sun.",celestial_x:"Horizontal offset from the alignment edge, in pixels.",celestial_y:"Vertical offset from the alignment edge, in pixels.",celestial_position:"",image_night:"Shown at night. Falls back to the day image if left empty.",image_night_source:"Applies to every image of the card, the state images too. Without a sun entity the color mode decides.",image_transition:"How long one image blends into the next when it changes, for example at sunset. 0 switches at once.",image_folder:"A folder like /local/house/ with one picture per weather: sunny.webp, rainy.webp, rainy-night.webp and so on.",image_folder_type:"The file ending of all pictures in the folder.",forecast_curve:"Drawn over the forecast chips in the chip area that show the temperature, at least two.",forecast_curve_height:"Room the curve takes above the chips.",image_scale:"Image height as a percentage of the card height.",image_max_width:"The most of the card width the image may take; on a narrower card it shrinks. 0 = no limit.",image_alignment:"",image_x:"Moves the image sideways from its spot, positive to the right. Pixels or CSS, e.g. -20 or 10% (of the card width).",image_y:"Moves the image away from the edge it sits at (up from the bottom). Pixels or CSS, e.g. 10 or -5% (of the card height).",status_entity:"Shows a different image when this entity is active, open, or home.",status_day:"Day image shown while the status entity is active.",status_night:"Night image shown while the status entity is active.",chip_area_columns:"Number of equal-width columns in grid layout.",chip_area_align:"Horizontal alignment of chips within the container.",card_background_style:"Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.",custom_cards_css_class:"Adds a CSS class to the embedded cards container (useful with card_mod).",perf_mode:"Choose a preset or fine-tune each setting below.",animation_speed:"Global animation speed multiplier for all motion.",bird_animation_speed:"Bird-only speed multiplier applied on top of animation speed.",star_animation_speed:"Twinkle speed multiplier for night stars.",fauna_birds_at_night:"Turn off to let birds fly only during the day.",fauna_plane_speed:"Near planes fly faster than distant ones; the slider scales all of them.",effect_blue_hour:"Deep blue sky after sunset and before sunrise.",effect_golden_hour:"Warm light on the sky and clouds when the sun is low, orange to violet at sunset.",effect_sun_rays:"Beams of light through broken clouds.",effect_haze:"A veil with poor visibility or high humidity.",effect_ground_mist:"Mist near the dew point, at night and in the morning.",effect_frost:"Rime on the card below 0 \xB0C, or just above it in very humid air. Colder air lets it reach further in.",effect_cloud_coverage:"The cloud cover of the weather entity sets the amount of clouds. Off: a fixed amount per weather state.",comet_rate:"1\xD7 is about one shooting star every 12 s and a comet about once a minute (Ultra, clear night).",card_stack_order:"Higher values sit in front of other cards.",wind_style:"Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h. Leaves are green in spring and summer and turn to autumn colours in autumn and winter.",rain_density:"1\xD7 is the usual amount for the weather. The rain sensor, if you have one, still sets how hard it rains.",effect_rain_splash:"Part of the drops splash on the bottom edge of the card.",snow_density:"Snow has no sensor of its own. A precipitation sensor that measures melted snow, like a weather service's or a heated gauge, sets it too; this slider scales it on top.",effect_snow_edge:"A thin edge of snow builds up along the bottom of the card.",effect_spill:"Rain and snow fall out of the bottom of the card onto the dashboard and fade there.",effect_text_scrim:"A soft veil behind the chip row keeps the text readable on any sky.",wind_compass:"Shows where the wind comes from, read from wind_bearing of the weather entity. The arrow points where it blows to.",wind_compass_position:"Automatic puts each style in its usual corner and moves it to a free place. With no free place, as in the Panel layout, the compass stays hidden: pick a position to show it anyway.",wind_compass_background:"A frosted box behind the compass, readable on any sky."}),Kt=Object.freeze({entity:"Entity",attribute:"Attribute",name:"Label",name_sensor:"Label Entity",name_attribute:"Label Attribute",sub_value_entity:"Sub Value Entity",sub_value_attribute:"Sub Value Attribute",gauge_entity:"Value Entity",gauge_attribute:"Value Attribute",width:"Width",overflow:"Value overflow",label_overflow:"Label overflow",sub_value_overflow:"Sub value overflow",marquee_speed:"Scroll speed",marquee_rtl:"Right-to-left",icon:"Icon",icon_path:"Icon folder",tap_action:"Tap Action",unit_format:"Custom unit",date_format:"Date format",bearing_format:"Wind direction as",bearing_icon:"Wind direction icon",text_size:"Value text size",label_size:"Label text size",inner_gap:"Icon/text gap",text_gap:"Label/value gap",padding:"Chip padding"}),qe=Object.freeze({name_sensor:"Use a sensor value as the label instead.",width:"e.g. 200px or 60%. Constrains the chip width.",label_overflow:"How label text behaves when it is too long.",icon:"MDI icon, or type 'weather' for a dynamic icon.",icon_path:"e.g. /local/weather-icons/",forecast_offset:"0 = today/now, 1 = tomorrow/next hour, etc.",date_format:"Codes like %a (day), %d.%m. (date) or %H:%M (time). Empty shows the usual text."}),na=Object.freeze(["type","name","entity","weather_entity","precipitation_entity","wind_speed_entity","wind_bearing_entity","temperature_entity","humidity_entity","dew_point_entity","cloud_coverage_entity","visibility_entity","sun_entity","moon_phase_entity","color_mode","card_color_mode","theme_entity","card_layout","layout_chips","card_style","card_height","card_padding","card_square","celestial_size","celestial_position","celestial_alignment","celestial_x","celestial_y","image_day","image_night","image_night_source","image_transition","image_folder","image_folder_type","image_scale","image_max_width","image_alignment","status_entity","status_day","status_night","chip_area_position","card_hide_text","chip_area_hide","chip_text_size","chip_label_size","chip_area_layout","chip_area_columns","chip_area_scroll_count","chip_area_align","chip_area_width","chip_area_height","chip_area_full_width","chip_padding","chip_area_padding","chip_area_gap","chip_gap","chip_text_gap","chip_icon_size","chip_style","chip_area_background","chip_area_grouped","chip_area_separator","chip_background_color","chip_icon_background_color","chip_area_background_color","card_background_style","card_tap_action","hold_action","double_tap_action","card_offset","card_full_width","card_mask_vertical","card_mask_horizontal","card_stack_order","card_filter_clouds","card_filter_sun","chip_icon_background","custom_cards_position","custom_cards_css_class","perf_mode","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night","fauna_birds","fauna_planes","fauna_plane_speed","wind_style","leaf_density","wind_compass","wind_compass_position","wind_compass_cardinal","wind_compass_degrees","wind_compass_speed","wind_compass_background","effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_frost","effect_cloud_coverage","effect_shooting_stars","shooting_star_rate","effect_comets","comet_rate","rain_density","effect_rain_splash","snow_density","effect_snow_edge","effect_spill","effect_text_scrim","forecast_curve","forecast_curve_height","chip_area_2","chips","css","custom_cards"]),Gt=Object.freeze(["style","align","background","icon_background","background_color","icon_background_color","padding","text_size","label_size","inner_gap","text_gap","icon_size","icon_padding","width","height","value_weight","label_weight","chip_round","sub_value_size","sub_value_weight"]),oa=Object.freeze(["card_stack_order","celestial_size","celestial_x","celestial_y","image_scale","image_max_width","image_transition","forecast_curve_height","chip_area_columns","chip_area_scroll_count","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_plane_speed","shooting_star_rate","comet_rate","rain_density","snow_density","leaf_density"]),sa=Object.freeze(["layout_chips","card_square","card_hide_text","chip_area_hide","chip_area_full_width","chip_area_background","chip_area_grouped","chip_area_separator","card_full_width","card_mask_vertical","card_mask_horizontal","chip_icon_background","fauna_birds_at_night","fauna_birds","fauna_planes","effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_frost","effect_cloud_coverage","effect_shooting_stars","effect_comets","effect_rain_splash","effect_snow_edge","effect_spill","effect_text_scrim"]),la=Object.freeze(["forecast_offset","forecast_precision","value_precision","marquee_speed","ring_min","ring_max","ring_width","ring_gap","bar_min","bar_max","bar_height","bar_gap"]),ca=Object.freeze(["hide_icon","hide_label","hide_value","hide_sub_value","marquee_rtl","background","icon_background","fancy_unit","chip_round","behind_effects","bearing_speed"]),da=Object.freeze(["width","height"]),T=Object.freeze({color_mode:[{value:"ha_theme",short:"HA theme",label:"Follow my Home Assistant theme"},{value:"entity",short:"Entity",label:"Follow another entity (e.g. the sun)"},{value:"force_light",short:"Light",label:"Force light mode"},{value:"force_dark",short:"Dark",label:"Force dark mode"}],wind_compass:[{value:"off",label:"Off"},{value:"arrow",label:"Wind arrow"},{value:"rose",label:"Compass rose"},{value:"pill",label:"Compass chip"},{value:"band",label:"Compass band"},{value:"vane",label:"Wind vane"},{value:"ticks",label:"Tick ring"},{value:"badge",label:"Wind badge"}],wind_compass_position:[{value:"auto",label:"Automatic"},{value:"top-left",label:"Top left"},{value:"top-center",label:"Top center"},{value:"top-right",label:"Top right"},{value:"bottom-left",label:"Bottom left"},{value:"bottom-center",label:"Bottom center"},{value:"bottom-right",label:"Bottom right"}],image_night_source:[{value:"sun",label:"From sunset to sunrise"},{value:"theme",label:"While the card is dark (Color mode)"}],image_folder_type:["webp","png","jpg","svg"].map(n=>({value:n,label:`.${n}`})),forecast_curve:[{value:"off",label:"Off"},{value:"line",label:"Line"},{value:"soft",label:"Soft line"},{value:"band",label:"Band from low to high"},{value:"color",label:"Colored by temperature"}],card_filter_clouds:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],card_filter_sun:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],bearing_format:[{value:"degrees",label:"Degrees (250)"},{value:"cardinal",label:"Compass point (WSW)"},{value:"both",label:"Compass point and degrees (WSW 250\xB0)"}],bearing_icon:[{value:"icon",label:"Chip icon"},{value:"arrow",label:"Arrow, where the wind blows"},{value:"filled",label:"Filled arrow, where the wind blows"},{value:"needle",label:"Compass needle, where the wind comes from"}],chip_overflow:[{value:"ellipsis",label:"Ellipsis (\u2026)"},{value:"marquee",label:"Scrolling text"},{value:"clip",label:"Clip"},{value:"wrap",label:"Wrap"}],chip_area_layout:[{value:"wrap",label:"Wrap"},{value:"grid",label:"Grid"},{value:"horizontal-scroll",label:"Scroll X"},{value:"vertical-scroll",label:"Scroll Y"}],chip_area_align:[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}]}),ce=Object.freeze([{value:"condition",label:"Condition"},{value:"temperature",label:"Temperature (high)"},{value:"templow",label:"Temperature (low)"},{value:"precipitation_probability",label:"Rain probability"},{value:"precipitation",label:"Precipitation"},{value:"humidity",label:"Humidity"},{value:"wind_speed",label:"Wind speed"},{value:"wind_bearing",label:"Wind bearing"},{value:"pressure",label:"Pressure"},{value:"cloud_coverage",label:"Cloud coverage"},{value:"uv_index",label:"UV index"}]),de=Object.freeze({image_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},custom_cards_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},celestial_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]},chip_area_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]}}),jt=Object.freeze(Object.fromEntries(Object.entries(de).map(([n,e])=>{let t=e.valueMap||{},i=Object.fromEntries(Object.entries(t).map(([a,r])=>[r,a]));return[n,Object.freeze({...e,valueMap:t,reverseMap:i,cellsFlat:e.cells.flat(),disabledSet:new Set(e.disabled||[])})]}))),qt=Object.freeze({image_scale:100,image_max_width:0,image_transition:R.image_transition,forecast_curve_height:46,card_stack_order:1,celestial_size:62}),F=Object.freeze({TRUE_DELETE:"true-delete",FALSE_DELETE:"false-delete",TRUE_FALSE_IF_DEFINED:"true-false-if-defined"}),I=Object.freeze({SET_OR_DELETE_EMPTY:"set-or-delete-empty",TOGGLE_DELETE_IF_SAME:"toggle-delete-if-same",BESIDE_OR_DELETE:"beside-or-delete",SOLID_OR_DELETE:"solid-or-delete"}),Ke=class extends B{static get properties(){return{_config:{type:Object,state:!0},_colorModeState:{type:String,state:!0},_expandedCard:{type:Number,state:!0},_expandedImageRule:{type:Number,state:!0},_expandedChip:{type:Number,state:!0},_openPanel:{type:String,state:!0},_openSection:{type:String,state:!0},_cardHeightError:{type:String,state:!0},_layoutSwitch:{type:Object,state:!0}}}set hass(e){let t=this._hass;this._hass=e,!t&&e?this.requestUpdate():t&&e&&(this._hassThrottle||(this._hassThrottle=!0,this._hassThrottleTimer=setTimeout(()=>{this._hassThrottle=!1,this._hassThrottleTimer=null,this.requestUpdate()},2e3)))}get hass(){return this._hass}disconnectedCallback(){super.disconnectedCallback(),this._hassThrottleTimer&&(clearTimeout(this._hassThrottleTimer),this._hassThrottleTimer=null)}static get styles(){return Ae`
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
        &.secondary {
          background: transparent;
          color: var(--primary-color);
          box-shadow: inset 0 0 0 1px var(--primary-color);
        }
      }
      .inline-action-btns {
        display: flex;
        flex-wrap: wrap;
        gap: var(--awc-e-s2);
        flex-shrink: 0;
      }
      .info.layout-ask {
        flex-wrap: wrap;
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
        color: var(--primary-text-color);
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
      .chip-badge-area {
        font-size: 11px;
        font-weight: 700;
        &.a1 {
          background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
          color: var(--primary-color, #03a9f4);
        }
        &.a2 {
          background: color-mix(in srgb, var(--warning-color, #ff9800) 22%, transparent);
          color: var(--warning-color, #ff9800);
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
      /* ── Values a layout brings ── */
      .from-layout,
      .from-layout-area {
        opacity: 0.55;
        transition: opacity 0.15s;
      }
      .from-layout:hover,
      .from-layout-area:hover,
      .from-layout:focus-within {
        opacity: 0.9;
      }
      /* ── Chip visibility ── */
      .vis-status {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin: var(--awc-e-s2) 0;
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        --mdc-icon-size: 18px;
        &.on {
          color: var(--success-color, #43a047);
        }
        &.off {
          color: var(--secondary-text-color);
        }
      }
      .vis-cond {
        margin: var(--awc-e-s2) 0;
        padding: var(--awc-e-s2) var(--awc-e-s3) var(--awc-e-s3);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
      }
      .vis-cond-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--awc-e-f-meta);
        font-weight: 600;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: var(--awc-e-s1);
        & .clear-btn {
          display: inline-flex;
          border: 0;
          background: none;
          padding: 4px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--secondary-text-color);
          --mdc-icon-size: 18px;
          &:hover {
            color: var(--error-color);
          }
        }
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
      /* ── Sections inside a panel ── */
      details.section {
        border-radius: var(--awc-e-r-box);
        & + details.section {
          margin-top: 2px;
        }
        & > summary {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s3);
          padding: var(--awc-e-s2);
          border-radius: var(--awc-e-r-box);
          cursor: pointer;
          list-style: none;
          user-select: none;
          &::-webkit-details-marker {
            display: none;
          }
          &:hover {
            background: var(--awc-e-field-fill);
          }
        }
        & > summary .chevron {
          margin-left: auto;
          flex-shrink: 0;
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
          transition: transform var(--awc-e-t);
        }
        &[open] {
          background: var(--awc-e-field-fill);
          & > summary .chevron {
            transform: rotate(180deg);
          }
        }
      }
      .section-icon,
      .layout-art {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: var(--awc-e-r-ctrl);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
        color: var(--primary-color);
      }
      .section-icon {
        width: 36px;
        height: 36px;
        & ha-icon {
          --mdc-icon-size: 20px;
        }
      }
      .section-text,
      .layout-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.3;
        text-align: start;
      }
      .section-name,
      .layout-name {
        font-size: var(--awc-e-f-body);
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .section-sub,
      .layout-desc {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
      }
      .section-body {
        padding: var(--awc-e-s1) var(--awc-e-s3) var(--awc-e-s3);
        & > * + * {
          margin-top: var(--awc-e-s2);
        }
        & > .help-row:first-child {
          margin-top: 0;
        }
        & .editor-group:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }
      }
      /* ── Layout tiles ── */
      .layout-tiles {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-top: var(--awc-e-s2);
      }
      .layout-tile {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s3);
        width: 100%;
        padding: var(--awc-e-s2);
        border: 1px solid transparent;
        border-radius: var(--awc-e-r-box);
        background: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
        &:hover {
          background: var(--awc-e-field-fill);
        }
        &.active {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        }
      }
      .layout-art {
        width: 56px;
        height: 42px;
        & svg {
          width: 44px;
          height: 33px;
          fill: currentColor;
        }
        & .lt-card {
          fill: currentColor;
          fill-opacity: 0.14;
          stroke: currentColor;
          stroke-opacity: 0.5;
          stroke-width: 1;
        }
        & .lt-dashed {
          fill-opacity: 0;
          stroke-dasharray: 3 2;
        }
        & .lt-sun {
          fill: #f5b000;
        }
      }
      .layout-tiles + .tip-box {
        margin-bottom: var(--awc-e-s2);
      }
      .layout-check {
        margin-left: auto;
        flex-shrink: 0;
        --mdc-icon-size: 20px;
        color: var(--primary-color);
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
      .rule-thumb {
        flex: none;
        width: 36px;
        height: 28px;
        border-radius: 6px;
        border: 1px dashed var(--divider-color);
        background: center / contain no-repeat
          color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        &.has {
          border-style: solid;
        }
      }
      .rule-images {
        margin-top: var(--awc-e-s3);
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
        /* All tabs stay in sight: on a narrow editor they wrap to a second
           line instead of scrolling behind the edge. */
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: var(--awc-e-s3);
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
    `}setConfig(e){e=$t(e);let t={...e};this._normalizeConfigTypes(t);let i=!1;if(!t.weather_entity&&this.hass&&this.hass.states){let r=Object.keys(this.hass.states).find(s=>s.startsWith("weather."));r&&(t.weather_entity=r,i=!0)}!t.sun_entity&&this.hass&&this.hass.states&&this.hass.states["sun.sun"]&&(t.sun_entity="sun.sun",i=!0);let a=this._cleanConfig(t);this._layoutSwitch&&Se(a)!==Se(this._config)&&(this._layoutSwitch=null),this._config=a,t.card_color_mode==="light"?this._colorModeState="force_light":t.card_color_mode==="dark"?this._colorModeState="force_dark":t.theme_entity?this._colorModeState="entity":this._colorModeState="ha_theme",i&&Promise.resolve().then(()=>this._emit())}get _formData(){if(this._cachedFormData&&this._cachedFormConfig===this._config&&this._cachedFormColorMode===this._colorModeState)return this._cachedFormData;let e={...R,...this._layoutValues(),...this._config||{}};return e._color_mode=this._colorModeState||(e.card_color_mode==="light"?"force_light":e.card_color_mode==="dark"?"force_dark":e.theme_entity?"entity":"ha_theme"),this._cachedFormData=e,this._cachedFormConfig=this._config,this._cachedFormColorMode=this._colorModeState,e}_layoutValues(){let e=this._config||{};if(this._layoutValuesFor===e)return this._layoutValuesCache;let t=Ut(e);return this._layoutValuesFor=e,this._layoutValuesCache=t,t}_fromLayout(e){return!!e&&Object.prototype.hasOwnProperty.call(this._layoutValues(),e)&&!Object.prototype.hasOwnProperty.call(this._config||{},e)}_colorModeSchema(){let e=this._formData,t=e._color_mode==="entity";return[{name:"_color_mode",selector:{select:{mode:"dropdown",options:T.color_mode}}},...t?[{name:"theme_entity",selector:{entity:{}}}]:[]]}_renderToggleGroup(e){return l`<div class="toggle-group">
      ${e.map(t=>l`<label class="toggle-row">
            <span>${o(t.label)}</span>
            <ha-switch
              data-key=${t.key}
              .checked=${this._formData[t.key]===!0}
              @change=${this._onToggleGroupChange}
            ></ha-switch
          ></label> `)}
    </div>`}_onToggleGroupChange(e){let t=e.target&&e.target.dataset&&e.target.dataset.key;t&&this._updateField(t,e.target.checked===!0)}_getChips(){let e=(this._config||{}).chips;return!Array.isArray(e)||e.length===0?[]:e.every(t=>t&&typeof t=="object")?e:e.map(t=>t&&typeof t=="object"?t:{})}_getCustomCards(){let e=this._config&&this._config.custom_cards;return Array.isArray(e)?[...e]:[]}_getImageConditions(){let e=this._config&&this._config.image_conditions;return Array.isArray(e)?e.map(t=>t&&typeof t=="object"?{...t}:{}):[]}_imageRuleStates(e){let t=e.state;return t==null||t===""?[]:(Array.isArray(t)?t:[t]).map(i=>String(i))}_imageRuleStateOptions(e){let t=String(e.entity||""),i=this.hass&&this.hass.states&&this.hass.states[t],a=t.split(".")[0],r={weather:["sunny","clear-night","partlycloudy","cloudy","fog","rainy","pouring","lightning","lightning-rainy","snowy","snowy-rainy","hail","windy","windy-variant","exceptional"],binary_sensor:["on","off"],input_boolean:["on","off"],switch:["on","off"],light:["on","off"],fan:["on","off"],cover:["open","closed","opening","closing"],lock:["locked","unlocked"],person:["home","not_home"],device_tracker:["home","not_home"],sun:["above_horizon","below_horizon"]},s=e.attribute?[]:[...r[a]||[]];!e.attribute&&i&&Array.isArray(i.attributes&&i.attributes.options)&&(s=[...i.attributes.options]);let c=i?e.attribute?i.attributes&&i.attributes[e.attribute]:i.state:void 0;c!=null&&!["unavailable","unknown"].includes(String(c))&&s.push(String(c));for(let p of this._imageRuleStates(e))s.push(p);let d=p=>{if(e.attribute||!i||!this.hass.formatEntityState)return p;try{return this.hass.formatEntityState(i,p)||p}catch{return p}};return[...new Set(s)].map(p=>({value:p,label:d(p)}))}_imageRuleSchema(e){return[{name:"entity",selector:{entity:{}}},...e.entity?[{name:"attribute",selector:{attribute:{}},context:{filter_entity:"entity"}},{name:"state",selector:{select:{multiple:!0,custom_value:!0,mode:"dropdown",options:this._imageRuleStateOptions(e)}}}]:[]]}static _imageRuleImageSchema=[{type:"grid",name:"",schema:[{name:"image_day",selector:{text:{}}},{name:"image_night",selector:{text:{}}}]}];_imageRuleLabel=e=>e&&e.name?o({entity:"Entity",attribute:"Attribute (optional)",state:"States",image_day:"Day image",image_night:"Night image"}[e.name]||e.name):"";_imageRuleHelper=e=>e&&e.name==="state"?o("Leave empty to show the image while the entity is on, open, home, unlocked or active."):e&&e.name==="attribute"?o("Compares this attribute instead of the state."):void 0;_renderImageConditions(){let e=this._getImageConditions();return l`${e.length===0?l`<div class="cards-empty">${o("No images by state yet.")}</div>`:""}
      ${e.map((t,i)=>this._renderImageRuleRow(t,i,e.length))}
      <button type="button" class="add-card-btn" @click=${this._addImageRule}>
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>${o("Add image")}</span>
      </button>`}_renderImageRuleRow(e,t,i){let a=e.entity&&this.hass&&this.hass.states[e.entity],r=a&&a.attributes&&a.attributes.friendly_name||e.entity||o("New image"),s=this._imageRuleStates(e),c=this._imageRuleStateOptions(e),d=s.map(C=>(c.find(f=>f.value===C)||{label:C}).label),p=e.entity?(e.attribute?e.attribute+": ":"")+(d.length?d.join(", "):o("on, open, home or active")):o("Pick an entity"),g=e.image_day||e.image_night,u=l`<span
      class="rule-thumb ${g?"has":""}"
      style=${g?`background-image:url("${ke(g)}")`:""}
    ></span>`,m={...e,state:s},v=C=>l`<div class="image-thumb-pic ${e[C]?"has":""}"
        style=${e[C]?`background-image:url("${ke(e[C])}")`:""}
      >${e[C]?"":o("No image")}</div>`,x=l`<ha-form
        .hass=${this.hass}
        .data=${m}
        .schema=${this._imageRuleSchema(e)}
        .computeLabel=${this._imageRuleLabel}
        .computeHelper=${this._imageRuleHelper}
        @value-changed=${C=>this._onImageRuleChanged(t,C)}
      ></ha-form>
      <div class="image-thumbs rule-images">${v("image_day")} ${v("image_night")}</div>
      <ha-form
        .hass=${this.hass}
        .data=${m}
        .schema=${this.constructor._imageRuleImageSchema}
        .computeLabel=${this._imageRuleLabel}
        @value-changed=${C=>this._onImageRuleChanged(t,C)}
      ></ha-form>`;return this._renderListRow({idx:t,total:i,expanded:this._expandedImageRule===t,title:r,subtitle:p,badge:u,body:x,onToggle:()=>this._expandedImageRule=this._expandedImageRule===t?null:t,onMoveUp:()=>this._moveImageRule(t,-1),onMoveDown:()=>this._moveImageRule(t,1),onRemove:()=>this._removeImageRule(t)})}_onImageRuleChanged(e,t){t.stopPropagation();let i=this._getImageConditions(),a=i[e]||{},r={...a,state:this._imageRuleStates(a),...t.detail&&t.detail.value||{}},s={},c=g=>typeof g=="string"?g.trim():"";c(r.entity)&&(s.entity=c(r.entity));let d=s.entity===a.entity;d&&c(r.attribute)&&(s.attribute=c(r.attribute));let p=d?[].concat(r.state??[]).map(g=>String(g).trim()).filter(Boolean):[];p.length===1?s.state=p[0]:p.length>1&&(s.state=[...new Set(p)]);for(let g of["image_day","image_night"])c(r[g])&&(s[g]=c(r[g]));i[e]=s,this._updateField("image_conditions",i)}_addImageRule(){let e=this._getImageConditions();e.push({}),this._expandedImageRule=e.length-1,this._updateField("image_conditions",e)}_moveImageRule(e,t){let i=this._getImageConditions(),a=e+t;a<0||a>=i.length||([i[e],i[a]]=[i[a],i[e]],this._expandedImageRule===e?this._expandedImageRule=a:this._expandedImageRule===a&&(this._expandedImageRule=e),this._updateField("image_conditions",i))}_removeImageRule(e){let t=this._getImageConditions();t.splice(e,1),this._expandedImageRule=null,this._updateField("image_conditions",t.length?t:void 0)}_imageStatusSchema(){let e=this._formData,t=!!e.status_entity;return[{name:"status_entity",selector:{entity:{}}},...t?[{type:"grid",name:"",schema:[{name:"status_day",selector:{text:{}}},{name:"status_night",selector:{text:{}}}]}]:[]]}_computeLabel=e=>!e||!e.name?"":o(b[e.name]||e.name);_computeHelper=e=>{if(!e||!e.name)return;let t=S[e.name]?o(S[e.name]):void 0;if(!this._fromLayout(e.name))return t;let i=o("From the layout. Pick a value to set your own.");return t?`${i} ${t}`:i};_isValidCardHeight(e){if(e==null)return!0;let t=String(e).trim();return!t||t.toLowerCase()==="auto"||/^-?\d+(?:\.\d+)?$/.test(t)?!0:/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)}_normalizeCardHeight(e){if(e==null)return e;let t=String(e).trim();if(!t)return"";if(t.toLowerCase()==="auto")return"auto";if(/^-?\d+(?:\.\d+)?$/.test(t)){let i=Number(t);return Number.isFinite(i)?i:""}return/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)?t:this._config&&this._config.card_height?this._config.card_height:""}_normalizeCssSizeValue(e){if(e==null)return e;if(typeof e=="number"&&Number.isFinite(e))return`${e}px`;let t=String(e).trim();if(!t)return"";let i=t.match(/^-?\d+(?:\.\d+)?/);return i?`${i[0]}px`:""}_coerceNumberLike(e){if(typeof e!="string")return e;let t=e.trim();if(!/^-?\d+(?:\.\d+)?$/.test(t))return e;let i=Number(t);return Number.isFinite(i)?i:e}_coerceBooleanLike(e){if(typeof e=="boolean"||typeof e!="string")return e;let t=e.trim().toLowerCase();return t==="true"?!0:t==="false"?!1:e}_normalizeChipTypes(e){if(!e||typeof e!="object"||Array.isArray(e))return e;let t={...e};for(let i of la)i in t&&(t[i]=this._coerceNumberLike(t[i]));for(let i of da)i in t&&(t[i]=this._normalizeCssSizeValue(t[i]));for(let i of ca)i in t&&(t[i]=this._coerceBooleanLike(t[i]));for(let i of["ring_thresholds","bar_thresholds"])Array.isArray(t[i])&&(t[i]=t[i].map(a=>{if(!a||typeof a!="object"||Array.isArray(a))return a;let r={...a};return"value"in r&&(r.value=this._coerceNumberLike(r.value)),r}));return t}_normalizeConfigTypes(e){if(!e||typeof e!="object")return e;for(let t of oa)t in e&&(e[t]=this._coerceNumberLike(e[t]));for(let t of sa)t in e&&(e[t]=this._coerceBooleanLike(e[t]));return"card_height"in e&&(e.card_height=this._normalizeCardHeight(e.card_height)),Array.isArray(e.chips)&&(e.chips=e.chips.map(t=>this._normalizeChipTypes(t))),e}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let t=this._config,i={...e.detail&&e.detail.value||{}},a=[];if(Object.prototype.hasOwnProperty.call(i,"card_height")&&(this._cardHeightError=this._isValidCardHeight(i.card_height)?"":o("Invalid height. Use auto, 160, 160px, 40vh, or 80%."),i.card_height=this._normalizeCardHeight(i.card_height)),i._color_mode!==void 0)switch(this._colorModeState=i._color_mode,i._color_mode){case"ha_theme":a.push("theme_entity","card_color_mode");break;case"entity":a.push("card_color_mode"),i.theme_entity||(i.theme_entity=i.sun_entity||(this.hass&&this.hass.states&&this.hass.states["sun.sun"]?"sun.sun":""));break;case"force_light":a.push("theme_entity"),i.card_color_mode="light";break;case"force_dark":a.push("theme_entity"),i.card_color_mode="dark";break}delete i._color_mode;let r=this._layoutValues();for(let[s,c]of Object.entries(r))!Object.prototype.hasOwnProperty.call(t,s)&&i[s]===c&&delete i[s];i.status_entity&&!t.status_entity&&(!i.status_day&&i.image_day&&(i.status_day=i.image_day),!i.status_night&&i.image_night&&(i.status_night=i.image_night)),i.card_square===!0&&t.card_square!==!0&&a.push("card_height"),this._patch(i,{replace:!0,strip:a})}_patch(e,t){let i=t||{},r={...i.replace?{}:{...this._config||{}},...e};if(Array.isArray(i.strip))for(let s of i.strip)delete r[s];i.layoutStep||(this._layoutSwitch=null),this._config=this._cleanConfig(r),this._emit()}_computeInactiveKeys(e){let t=new Set;(e.card_color_mode==="light"||e.card_color_mode==="dark")&&t.add("theme_entity");let i=e.chip_area_layout||"wrap";return i!=="grid"&&t.add("chip_area_columns"),(!e.forecast_curve||e.forecast_curve==="off")&&t.add("forecast_curve_height"),i!=="horizontal-scroll"&&i!=="vertical-scroll"&&t.add("chip_area_scroll_count"),i==="horizontal-scroll"||i==="vertical-scroll"||(t.add("chip_area_height"),t.add("chip_area_full_width")),e.chip_area_grouped||t.add("chip_area_separator"),(!e.wind_compass||e.wind_compass==="off")&&(t.add("wind_compass_position"),t.add("wind_compass_cardinal"),t.add("wind_compass_degrees"),t.add("wind_compass_speed")),(!e.wind_compass||e.wind_compass==="off"||e.wind_compass==="pill")&&t.add("wind_compass_background"),e.wind_style!=="leaves"&&t.add("leaf_density"),(!e.card_layout||!Array.isArray(e.chips)||e.chips.length===0)&&t.add("layout_chips"),t}_cleanConfig(e){let t={...e};this._normalizeConfigTypes(t);for(let s of Object.keys(t)){let c=t[s];if(c===""||c===null||c===void 0){delete t[s];continue}if(Array.isArray(c)&&c.length===0){delete t[s];continue}typeof c=="object"&&!Array.isArray(c)&&Object.keys(c).length===0&&delete t[s]}let i=Ut(t);for(let[s,c]of Object.entries(R)){let d=Object.prototype.hasOwnProperty.call(i,s)&&i[s]!==c;t[s]===c&&!d&&delete t[s]}let a=this._computeInactiveKeys({...i,...t});for(let s of a)delete t[s];delete t._color_mode;let r={};for(let s of na)s!=="custom_cards"&&s in t&&(r[s]=t[s]);for(let s of Object.keys(t))s!=="custom_cards"&&(s in r||(r[s]=t[s]));return"custom_cards"in t&&(r.custom_cards=t.custom_cards),r}_emit(){let e={...this._config||{}};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_renderForm(e){return!e||e.length===0?"":l`<ha-form
      .hass=${this.hass}
      .data=${this._formData}
      .schema=${e}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`}_renderClearableText(e){let t=(this._formData||{})[e];return l`<div class="clearable-field">
      ${this._renderForm([{name:e,selector:{text:{}}}])}
      ${t?l`<button
            type="button"
            class="clear-btn"
            title=${o("Clear")}
            data-field=${e}
            @click=${this._onClearFieldClick}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`:""}
    </div>`}_onClearFieldClick(e){let t=this._ds(e,"field");t&&this._updateField(t,"")}_ds(e,t){return e.currentTarget&&e.currentTarget.dataset?e.currentTarget.dataset[t]:""}_renderDisclosure(e,t){let i=e==="Advanced options";return l`<details class="disclosure" @toggle=${this._onDisclosureToggle}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${i?l`<ha-icon icon="mdi:cog-outline"></ha-icon>`:""}
        <span>${o(e)}</span>
      </summary>
      <div class="disclosure-body">${t}</div>
    </details>`}_onDisclosureToggle(e){let t=e.currentTarget;if(!t.open)return;let i=t.parentElement;i&&i.querySelectorAll(":scope > details.disclosure[open]").forEach(a=>{a!==t&&(a.open=!1)})}_renderPositionGrid(e,t){let i=jt[e],{valueMap:a,reverseMap:r,cellsFlat:s,disabledSet:c}=i,d=this._formData[e]||"",p=r[d]||d,g=S[e]?o(S[e]):"",u=o(b[e]||e);return l`<div class="grid-picker">
      <div class="grid-picker-label">${u}</div>
      <div class="grid-3x3" role="radiogroup" aria-label=${u}>
        ${s.map(m=>{if(m===null)return l`<div class="grid-cell empty"></div>`;let v=c.has(m),x=a[m]||m;return l`<button
            type="button"
            role="radio"
            class="grid-cell ${p===m?"active":""} ${v?"disabled":""}"
            ?disabled=${v}
            data-field=${e}
            data-value=${x}
            title=${v?o("{value} (not supported here)",{value:m}):m}
            aria-label=${m}
            @click=${this._onPositionGridSelect}
          ></button>`})}
      </div>
      ${t.extras?l`<div class="grid-extras">
            ${t.extras.map(m=>l`<button
                  type="button"
                  class="grid-extra ${p===m.value?"active":""}"
                  aria-pressed=${p===m.value?"true":"false"}
                  data-field=${e}
                  data-value=${m.value}
                  @click=${this._onPositionGridSelect}
                >
                  ${o(m.label)}
                </button>`)}
          </div>`:""}
      ${g?l`<div class="grid-helper">${g}</div>`:""}
    </div>`}_onPositionGridSelect(e){let t=e.currentTarget;if(!t||t.disabled)return;let i=t.dataset&&t.dataset.field,a=t.dataset&&t.dataset.value;!i||a===void 0||this._setField(i,a)}_setField(e,t){if((this._config||{})[e]===t){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_updateField(e,t){if(e==="card_height"&&(this._cardHeightError=this._isValidCardHeight(t)?"":o("Invalid height. Use auto, 160, 160px, 40vh, or 80%."),t=this._normalizeCardHeight(t)),t==null||t===""){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_setCardStyle(e){if(e==="standalone"){this._patch({card_style:e},{strip:["card_full_width","card_mask_vertical","card_mask_horizontal"]});return}this._patch({card_style:e})}_onPanelToggle(e,t){t?this._openPanel=e:this._openPanel===e&&(this._openPanel=null)}_onPanelExpandedChanged(e){let t=this._ds(e,"panel");t&&this._onPanelToggle(t,!!(e.detail&&e.detail.expanded))}_onTrimmedFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,(e.target.value||"").trim())}_onRawFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,e.target.value||"")}_onOffsetPartChange(e){let t=this._ds(e,"offsetIndex"),i=Number(t);Number.isInteger(i)&&this._setOffsetPart(i,e.target.value)}_onSegmentedFieldSelect(e){let t=this._ds(e,"field");if(!t)return;let i=this._ds(e,"value"),a=this._ds(e,"valueType")||"string";if(a==="number"){let r=Number(i);if(!Number.isFinite(r))return;this._updateField(t,r);return}if(a==="boolean"){this._updateField(t,i==="true");return}if(t==="card_layout"){this._pickLayout(a==="empty"?"":i);return}if(a==="empty"){this._updateField(t,"");return}this._updateField(t,i)}_pickLayout(e){let t=this._config||{},i=String(e||"").trim().toLowerCase();if(i===String(t.card_layout||"").trim().toLowerCase())return;let a=ve(i,t.weather_entity||"",t.sun_entity||"sun.sun"),r=a?[...new Set([...Object.keys(a),...Et])].filter(m=>m!=="chips"&&Object.prototype.hasOwnProperty.call(t,m)):[],s=this._layoutSwitch,c=s?s.before:le(t),d=(s?s.reset:0)+r.length,p=s&&Array.isArray(s.before.chips)&&s.before.chips.length?s.before.chips:null,g=p?{chips:le(p)}:{},u=s&&s.before.layout_chips===!0;this._layoutSwitch={layout:i,before:c,reset:d,ask:i&&Array.isArray(c.chips)&&c.chips.length?"keep":null,chips:null},this._patch({card_layout:i,...g,...u?{layout_chips:!0}:{}},{strip:[...i?r:["card_layout"],...s&&!u?["layout_chips"]:[]],layoutStep:!0})}_undoLayoutSwitch(){let e=this._layoutSwitch;e&&(this._layoutSwitch=null,this._patch(le(e.before),{replace:!0}))}_dropOwnChips(){let e=this._layoutSwitch;e&&(this._layoutSwitch={...e,ask:null,chips:"layout"},this._patch({},{strip:["chips","layout_chips"],layoutStep:!0}))}_keepOwnChips(){let e=this._layoutSwitch;e&&(this._layoutSwitch={...e,ask:"arrange"})}_keepChipPositions(){let e=this._layoutSwitch;e&&(this._layoutSwitch={...e,ask:null,chips:"kept"})}_arrangeOwnChips(){let e=this._layoutSwitch,t=this._config||{},i=ve(String(t.card_layout||"").trim().toLowerCase(),t.weather_entity||"",t.sun_entity||"sun.sun");if(!e||!i)return;this._layoutSwitch={...e,ask:null,chips:"arranged"};let a=At(this._getChips(),i.chips||[]);this._patch(a.length?{chips:a,layout_chips:!0}:{},{strip:a.length?[]:["chips","layout_chips"],layoutStep:!0})}_askAboutChips(){let e=this._config||{},t=String(e.card_layout||"");if(!t)return;let i=this._layoutSwitch;if(!i){this._layoutSwitch={layout:t,before:le(e),reset:0,ask:"keep",chips:null};return}let a=i.before,r=Array.isArray(a.chips)&&a.chips.length?le(a.chips):null;this._layoutSwitch={...i,ask:r?"keep":null,chips:null},this._patch({...r?{chips:r}:{},...a.layout_chips===!0?{layout_chips:!0}:{}},{strip:[...r?[]:["chips"],...a.layout_chips===!0?[]:["layout_chips"]],layoutStep:!0})}_onChipAreaBackgroundModeSelect(e){let t=this._ds(e,"bgMode");if(t){if(t==="off"){this._updateField("chip_area_background",!1);return}this._updateField("chip_area_background",!0),this._updateField("card_background_style",t)}}_renderCardStyleSegmented(){let e=this._formData,t=e.card_square===!0,i=e.card_style||"standalone",a=[{value:"immersive",label:"Immersive"},{value:"standalone",label:"Standalone"}];return l`<div class="grid-picker">
      <div class="segmented" role="radiogroup" aria-label=${o(b.card_style)}>
        ${a.map(r=>l`<button
              type="button"
              role="radio"
              data-value=${r.value}
              class=${i===r.value?"active":""}
              @click=${this._onCardStyleSelect}
            >
              ${o(r.label)}
            </button>`)}
      </div>
      <div class="composite-helper">
        ${o(i==="immersive"?"The card uses no background at all.":"Background color based on the weather.")}
      </div>
      <div class="compact-fields">
        ${t?"":this._renderCompactField("card_height","e.g. 220 or auto")}
        ${this._renderCompactField("card_padding","e.g. 16px")}
      </div>
      ${i==="standalone"?l`<div class="toggle-group">${this._renderSwitch("effect_text_scrim",!0)}</div>`:""}
    </div>`}_onCardStyleSelect(e){let t=this._ds(e,"value");t&&this._setCardStyle(t)}_renderCelestialOffsetPicker(){return l`<div class="composite">
      <div class="composite-label">${o("Offset from edge")}</div>
      ${this._renderOffsetXYRow("celestial_x","celestial_y",(e,t)=>l`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${e}
            .value=${String(t||"")}
            @change=${this._onTrimmedFieldChange}
          />`)}
    </div>`}_renderOffsetXYRow(e,t,i){let a=this._formData;return l`<div class="composite-row" style="flex-wrap:nowrap">
      <span class="composite-unit">X</span>
      ${i(e,a[e])}
      <span class="composite-unit">Y</span>
      ${i(t,a[t])}
    </div>`}_parseOffset(e){if(!e||typeof e!="string")return[0,0,0,0];let t=e.trim().split(/\s+/).map(i=>parseInt(i,10)||0);switch(t.length){case 0:return[0,0,0,0];case 1:return[t[0],t[0],t[0],t[0]];case 2:return[t[0],t[1],t[0],t[1]];case 3:return[t[0],t[1],t[2],t[1]];default:return[t[0],t[1],t[2],t[3]]}}_serializeOffset(e){return e.every(t=>t===0)?"":e.map(t=>`${t}px`).join(" ")}_setOffsetPart(e,t){let i=this._parseOffset(this._formData.card_offset);i[e]=parseInt(t,10)||0,this._updateField("card_offset",this._serializeOffset(i))}_renderImageOffsetPicker(){let e=this._formData;return!e.image_day&&!e.image_night?"":l`<div class="composite">
      <div class="composite-label">${o("Image Offset")}</div>
      ${this._renderOffsetXYRow("image_x","image_y",(t,i)=>l`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${t}
            .value=${String(i||"")}
            @change=${this._onTrimmedFieldChange}
          />`)}
      <div class="composite-helper">
        ${o("Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.")}
      </div>
    </div>`}_renderOffsetPicker(){let e=this._parseOffset(this._formData.card_offset),t=["Top","Right","Bottom","Left"].map(i=>o(i));return l`<div class="composite">
      <div class="composite-label">${o(b.card_offset)}</div>
      <div class="composite-grid-4">
        ${t.map((i,a)=>l`<label>
              <span>${i}</span>
              <input
                type="number"
                step="1"
                data-offset-index=${String(a)}
                .value=${String(e[a])}
                @change=${this._onOffsetPartChange}
            /></label>`)}
      </div>
      ${S.card_offset?l`<div class="composite-helper">${S.card_offset}</div>`:""}
    </div>`}_renderCustomCardsEditor(){let e=this._getCustomCards();this._openPanel==="cards"&&this._cardEditorsReady===void 0&&this._loadCardEditors();let t=this._cardPickerOpen&&this._cardEditorsReady?l`<div class="card-picker-box">
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this._lovelace()}
              @config-changed=${this._onCardPicked}
            ></hui-card-picker>
          </div>`:"";return l`${e.length===0?l`<div class="cards-empty">${o("No cards yet.")}</div>`:e.map((i,a)=>this._renderCardRow(i,a,e.length))}
      <button type="button" class="add-card-btn" @click=${this._addBlankCard}>
        <ha-icon icon=${this._cardPickerOpen?"mdi:close":"mdi:plus"}></ha-icon>
        <span>${this._cardPickerOpen?o("Cancel"):o("Add card")}</span>
      </button>
      ${t}`}async _loadCardEditors(){return this._cardEditorsLoading?this._cardEditorsLoading:(this._cardEditorsLoading=(async()=>{try{if(!customElements.get("hui-card-element-editor")){let e=typeof window.loadCardHelpers=="function"?await window.loadCardHelpers():null,t=e&&await e.createCardElement({type:"vertical-stack",cards:[]}),i=t&&t.constructor;i&&typeof i.getConfigElement=="function"&&await i.getConfigElement()}return!!customElements.get("hui-card-element-editor")&&!!customElements.get("hui-card-picker")}catch{return!1}})(),this._cardEditorsReady=await this._cardEditorsLoading,this.requestUpdate(),this._cardEditorsReady)}_lovelace(){if(this.lovelace)return this.lovelace;if(this._foundLovelace)return this._foundLovelace;let e=(a,r)=>{if(!a||r>12)return null;for(let s of a.querySelectorAll("*")){if(s.localName==="hui-root")return s;if(s.shadowRoot){let c=e(s.shadowRoot,r+1);if(c)return c}}return null},t=typeof document<"u"?e(document,0):null,i=t&&t.lovelace&&t.lovelace.config;return i?(this._foundLovelace=i,i):{views:[]}}_onCardPicked(e){e.stopPropagation();let t=e.detail&&e.detail.config;if(!t||typeof t!="object")return;let i=[...this._getCustomCards(),t];this._cardPickerOpen=!1,this._expandedCard=i.length-1,this._updateField("custom_cards",i)}_renderListRow({idx:e,total:t,expanded:i,title:a,subtitle:r,badge:s,onToggle:c,onMoveUp:d,onMoveDown:p,onRemove:g,onDuplicate:u,body:m}){return l`<div class="card-row ${i?"expanded":""}">
      <div class="card-row-head" @click=${c}>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${s||""}
        <span class="card-row-text"
          ><span class="card-row-title">${a}</span>${r?l`<span class="card-row-sub">${r}</span>`:""}</span
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
            @click=${p}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          ${u?l`<button
                type="button"
                title=${o("Duplicate")}
                @click=${u}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>`:""}
          <button type="button" title=${o("Delete")} @click=${g}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </div>
      ${i?l`<div class="card-row-body">${m}</div>`:""}
    </div>`}_onStopPropagation(e){e.stopPropagation()}_onCustomCardSizeChange(e){let t=Number(this._ds(e,"cardIdx")||NaN),i=this._ds(e,"cardKey");if(this._badIdx(t)||!i)return;let a=this._getCustomCards(),s={...a[t]&&typeof a[t]=="object"?a[t]:{}},c=(e.target.value||"").trim();c?s[i]=c:delete s[i],this._updateCardAt(t,s)}_onCustomCardFormValueChanged(e){e.stopPropagation();let t=Number(this._ds(e,"cardIdx")||NaN);this._badIdx(t)||this._updateCardAt(t,e.detail&&e.detail.value&&e.detail.value._card||{})}_innerCard(e){let t=this._innerCardCache||(this._innerCardCache=new WeakMap);if(t.has(e))return t.get(e);let i={...e};return delete i.custom_width,delete i.custom_height,t.set(e,i),i}_onCustomCardEditorChanged(e){e.stopPropagation();let t=Number(this._ds(e,"cardIdx")||NaN),i=e.detail&&e.detail.config;if(this._badIdx(t)||!i||typeof i!="object")return;let a=this._getCustomCards()[t]||{},r={...i};a.custom_width&&(r.custom_width=a.custom_width),a.custom_height&&(r.custom_height=a.custom_height),this._updateCardAt(t,r)}_renderCardRow(e,t,i){let a=this._expandedCard===t,r=e&&e.type?String(e.type).replace(/^custom:/,""):"card",s=l`<div class="card-size-row">
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
      ${this._cardEditorsReady?l`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this._lovelace()}
            .value=${this._innerCard(e)}
            data-card-idx=${String(t)}
            @config-changed=${this._onCustomCardEditorChanged}
          ></hui-card-element-editor>`:l`<ha-form
            .hass=${this.hass}
            .data=${{_card:e}}
            .schema=${[{name:"_card",selector:{object:{}}}]}
            data-card-idx=${String(t)}
            .computeLabel=${()=>""}
            @value-changed=${this._onCustomCardFormValueChanged}
          ></ha-form>`}`;return this._renderListRow({idx:t,total:i,expanded:a,title:r,body:s,onToggle:()=>this._toggleCardExpanded(t),onMoveUp:()=>this._moveCard(t,-1),onMoveDown:()=>this._moveCard(t,1),onRemove:()=>this._removeCard(t)})}_toggleCardExpanded(e){this._expandedCard=this._expandedCard===e?null:e}_moveCard(e,t){let i=this._getCustomCards(),a=e+t;a<0||a>=i.length||([i[e],i[a]]=[i[a],i[e]],this._expandedCard===e?this._expandedCard=a:this._expandedCard===a&&(this._expandedCard=e),this._updateField("custom_cards",i))}_removeCard(e){let t=this._getCustomCards();t.splice(e,1),this._expandedCard===e?this._expandedCard=null:typeof this._expandedCard=="number"&&this._expandedCard>e&&(this._expandedCard=this._expandedCard-1),this._updateField("custom_cards",t)}_updateCardAt(e,t){let i=this._getCustomCards();i[e]=t,this._updateField("custom_cards",i)}_addBlankCard=()=>{if(this._cardEditorsReady){this._cardPickerOpen=!this._cardPickerOpen,this._foundLovelace=null,this.requestUpdate();return}let e=[...this._getCustomCards(),{type:"entity",entity:"",custom_width:"100%"}];this._expandedCard=e.length-1,this._updateField("custom_cards",e)};_chipTitle(e){let t=(e&&e.name||"").toString().trim(),i=(e&&e.entity||"").toString().trim(),a=(e&&e.attribute||"").toString().trim();if(!i)return t?`${t} \u2014 ${o("(no entity)")}`:o("(choose an entity)");let r=this.hass&&this.hass.states&&this.hass.states[i],c=r&&r.attributes&&r.attributes.friendly_name||i;if(e.forecast){let p=e.forecast==="hourly"?o("Hourly"):o("Daily"),g=parseInt(e.forecast_offset,10)||0,u=e.forecast==="hourly"?g===0?o("now"):`+${g}h`:g===0?o("today"):g===1?o("tomorrow"):`+${g}d`,v=`${c} \xB7 ${p} ${u} [${a||"condition"}]`;return t?`${t} \u2014 ${v}`:v}let d=a?`${c} [${a}]`:c;return t?`${t} \u2014 ${d}`:d}_chipValuePreview(e){if(!e||!e.entity)return"";if(e.forecast)return o("Forecast");let t=this.hass&&this.hass.states&&this.hass.states[e.entity];if(!t)return o("Entity not found");if(e.attribute){let a=t.attributes?t.attributes[e.attribute]:void 0;return a==null||typeof a=="object"?"":String(a)}let i=t.attributes&&t.attributes.unit_of_measurement||"";return i?`${t.state} ${i}`:String(t.state)}_cleanChip(e){let t={...e};t.entity||(delete t.attribute,delete t.forecast,delete t.forecast_offset),t.forecast||(delete t.forecast_offset,delete t.forecast_precision),t.forecast_offset===0&&delete t.forecast_offset,(Number(t.area)!==2||String(t.position||"").toLowerCase()==="custom")&&delete t.area;let i=!!t.attribute||!t.entity||!!(this.hass&&this.hass.states&&this.hass.states[t.entity]);(t.bearing_format==="degrees"||i&&!we(t,this.hass))&&delete t.bearing_format,i&&!we(t,this.hass)&&(delete t.bearing_icon,delete t.bearing_speed),t.attribute!=="wind_bearing"&&delete t.bearing_speed,!t.sub_value_entity&&!t.sub_value_attribute&&(delete t.sub_value_format,delete t.sub_value_position,delete t.sub_value_size,delete t.sub_value_weight,delete t.hide_sub_value),t.type!=="ring"&&t.type!=="bar"&&(delete t.gauge_entity,delete t.gauge_attribute),t.type!=="ring"&&(delete t.ring_min,delete t.ring_max,delete t.ring_color,delete t.ring_width,delete t.ring_gap,delete t.ring_thresholds,delete t.ring_threshold_mode),t.type!=="bar"&&(delete t.bar_min,delete t.bar_max,delete t.bar_color,delete t.bar_height,delete t.bar_gap,delete t.bar_thresholds,delete t.bar_threshold_mode);for(let a of Object.keys(t)){let r=t[a];if(a==="unit_format"||a==="ring_min"||a==="bar_min"){r==null&&delete t[a];continue}a==="background"&&r===!1||a==="icon_background"&&r===!1||(r===""||r===null||r===void 0||r===!1)&&delete t[a]}return t}_updateChipAt(e,t){let i=this._getChips().map((a,r)=>r===e?this._cleanChip(t):a);this._commitChips(i)}_addChip=()=>{let t=[...this._getChips(),{}];this._expandedChip=t.length-1,this._commitChips(t)};_moveChip(e,t){let i=[...this._getChips()],a=e+t;a<0||a>=i.length||([i[e],i[a]]=[i[a],i[e]],this._expandedChip===e?this._expandedChip=a:this._expandedChip===a&&(this._expandedChip=e),this._commitChips(i))}_removeChip(e){let t=[...this._getChips()];t.splice(e,1),delete this[`_acc_open_${e}`],delete this[`_text_acc_${e}`];for(let i=e;i<t.length;i++)this[`_acc_open_${i}`]=this[`_acc_open_${i+1}`]||null,this[`_text_acc_${i}`]=this[`_text_acc_${i+1}`]||null;delete this[`_acc_open_${t.length}`],delete this[`_text_acc_${t.length}`],this._expandedChip===e?this._expandedChip=null:typeof this._expandedChip=="number"&&this._expandedChip>e&&(this._expandedChip=this._expandedChip-1),this._commitChips(t)}_duplicateChip(e){let t=[...this._getChips()];t.splice(e+1,0,{...t[e]}),this._expandedChip=e+1,this._commitChips(t)}_toggleChipExpanded(e){this._expandedChip=this._expandedChip===e?null:e}_getChipByIndex(e){let t=Number(e);if(this._badIdx(t))return null;let i=this._getChips();return i[t]&&typeof i[t]=="object"?i[t]:null}_badIdx(e){return!Number.isInteger(e)||e<0}_onChipAccordionToggle(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"accKey"),a=this._ds(e,"accKind")||"main";if(this._badIdx(t)||!i)return;let r=a==="text"?`_text_acc_${t}`:`_acc_open_${t}`;a==="main"?this[r]=i:this[r]=this[r]===i?null:i,this.requestUpdate()}_onChipTypeModeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"mode");if(this._badIdx(t)||!i)return;let a=this._getChipByIndex(t);if(a){if(i==="sensor"){let r={...a};delete r.forecast,delete r.forecast_offset,delete r.forecast_precision,this._updateChipAt(t,r);return}if(i==="forecast"){let r=(a.entity||"").toString().trim(),s=this._config&&this._config.weather_entity||"",c=r&&r.startsWith("weather.")?r:s||r,d={...a,forecast:"daily",attribute:"temperature",forecast_offset:1};c&&(d.entity=c),this._updateChipAt(t,d)}}}_onChipForecastTypeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"forecastType");if(this._badIdx(t)||!i)return;let a=this._getChipByIndex(t);a&&this._updateChipAt(t,{...a,forecast:i,forecast_offset:0})}_onChipAnchorSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"anchor");if(this._badIdx(t)||!i)return;let a=this._getChipByIndex(t);a&&this._updateChipAt(t,{...a,position_anchor:i})}_onChipToggleChange(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"key"),a=this._ds(e,"mode")||F.TRUE_DELETE;if(this._badIdx(t)||!i)return;let r=this._getChipByIndex(t);if(!r)return;let s={...r},c=e.target&&e.target.checked===!0;a===F.TRUE_DELETE?c?s[i]=!0:delete s[i]:a===F.FALSE_DELETE?c?delete s[i]:s[i]=!1:a===F.TRUE_FALSE_IF_DEFINED&&(c?s[i]=!0:r[i]!==void 0?s[i]=!1:delete s[i]),this._updateChipAt(t,s)}_onChipActionClick(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"action");if(this._badIdx(t)||!i)return;let a=this._getChipByIndex(t);if(!a)return;let r={...a};if(i==="remove-icon")delete r.icon;else if(i==="set-weather-icon")r.icon="weather";else if(i==="clear-icon-path")delete r.icon_path;else if(i==="reset-styles")for(let s of Gt)delete r[s];else return;this._updateChipAt(t,r)}_onChipSegmentedSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),i=this._ds(e,"key"),a=this._ds(e,"mode")||"set",r=this._ds(e,"valueType")||"string",s=this._ds(e,"value");if(this._badIdx(t)||!i)return;let c=this._getChipByIndex(t);if(!c)return;let d={...c},p=s;if(r==="number"){let g=Number(s);if(!Number.isFinite(g))return;p=g}else r==="boolean"&&(p=s==="true");a===I.SET_OR_DELETE_EMPTY?p===""?delete d[i]:d[i]=p:a===I.TOGGLE_DELETE_IF_SAME?c[i]===p?delete d[i]:d[i]=p:a===I.BESIDE_OR_DELETE?p==="beside"?d[i]="beside":delete d[i]:a===I.SOLID_OR_DELETE&&p==="solid"?delete d[i]:d[i]=p,this._updateChipAt(t,d)}_commitChips(e){if(!Array.isArray(e)||e.length===0){this._patch({},{strip:["chips"]});return}this._patch({chips:e})}_chipShowsTimestamp(e){let t=this.hass&&this.hass.states&&this.hass.states[e.entity];if(!t)return!1;let i=e.attribute?(t.attributes||{})[e.attribute]:t.state;return typeof i=="string"&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(i)}_chipLabel=e=>!e||!e.name?"":o(Kt[e.name]||e.name);_chipHelper=e=>{if(!(!e||!e.name))return qe[e.name]?o(qe[e.name]):void 0};_visScreens(e){let i=String(e||"").split(",").map(a=>a.trim()).filter(Boolean).map(a=>je.find(r=>r.query===a));return i.every(Boolean)?i.map(a=>a.value):null}_visFormData(e){let t=i=>i==null||i===""?[]:[].concat(i).map(String);return e.condition==="state"||!("condition"in e)?{condition:"state",entity:e.entity||e.entity_id||"",attribute:e.attribute||"",match:e.state_not!=null&&e.state==null?"not":"is",state:t(e.state!=null?e.state:e.state_not)}:e.condition==="screen"?{...e,screens:this._visScreens(e.media_query)||[]}:{...e,weekdays:t(e.weekdays),users:t(e.users)}}_visSchema(e){let t={name:"condition",selector:{select:{mode:"dropdown",options:z(ea)}}},i=r=>[{name:"entity",selector:{entity:{}}},...r.entity?[{name:"attribute",selector:{attribute:{}},context:{filter_entity:"entity"}}]:[]],a=this._visFormData(e);switch(a.condition){case"state":return[t,...i(a),...a.entity?[{name:"match",selector:{select:{mode:"box",options:z([{value:"is",label:"Is"},{value:"not",label:"Is not"}])}}},{name:"state",selector:{select:{multiple:!0,custom_value:!0,mode:"dropdown",options:this._imageRuleStateOptions({entity:a.entity,attribute:a.attribute,state:a.state})}}}]:[]];case"numeric_state":return[t,...i(a),{type:"grid",name:"",schema:[{name:"above",selector:{number:{mode:"box",step:"any"}}},{name:"below",selector:{number:{mode:"box",step:"any"}}}]}];case"screen":return[t,{name:"screens",selector:{select:{multiple:!0,mode:"list",options:z(je)}}},{name:"media_query",selector:{text:{}}}];case"time":return[t,{type:"grid",name:"",schema:[{name:"after",selector:{time:{}}},{name:"before",selector:{time:{}}}]},{name:"weekdays",selector:{select:{multiple:!0,mode:"list",options:z(Mt)}}}];case"user":return[t,{name:"users",selector:{select:{multiple:!0,mode:"list",options:this._visUserOptions()}}}];default:return[t]}}_visUserOptions(){this._haUsers===void 0&&this.hass&&this.hass.callWS&&(this._haUsers=null,this.hass.callWS({type:"config/auth/list"}).then(i=>{this._haUsers=(Array.isArray(i)?i:[]).filter(a=>a&&!a.system_generated&&a.is_active!==!1).map(a=>({value:a.id,label:a.name||a.username||a.id})),this.requestUpdate()}).catch(()=>{this._haUsers=[],this.requestUpdate()}));let e=[...this._haUsers||[]],t=this.hass&&this.hass.user;return t&&t.id&&!e.some(i=>i.value===t.id)&&e.unshift({value:t.id,label:t.name||t.id}),e}_visFromForm(e,t){let i=c=>typeof c=="string"?c.trim():"",a=t.condition||"state",r=e.condition||"state";if(a!==r)return{condition:a};let s={condition:a};if(a==="state"||a==="numeric_state"){i(t.entity)&&(s.entity=i(t.entity));let c=s.entity===(e.entity||e.entity_id||void 0);if(c&&i(t.attribute)&&(s.attribute=i(t.attribute)),a==="state"){let d=c?[].concat(t.state??[]).map(g=>String(g).trim()).filter(Boolean):[],p=t.match==="not"?"state_not":"state";d.length&&(s[p]=d.length===1?d[0]:[...new Set(d)])}else for(let d of["above","below"])t[d]!==void 0&&t[d]!==null&&t[d]!==""&&Number.isFinite(Number(t[d]))&&(s[d]=Number(t[d]))}else if(a==="screen"){let c=this._visScreens(e.media_query)||[],d=[].concat(t.screens||[]),g=d.length!==c.length||d.some(u=>!c.includes(u))?je.filter(u=>d.includes(u.value)).map(u=>u.query).join(", "):i(t.media_query);g&&(s.media_query=g)}else if(a==="time"){let c=p=>i(p).replace(/^(\d{1,2}:\d{2}):00$/,"$1");c(t.after)&&(s.after=c(t.after)),c(t.before)&&(s.before=c(t.before));let d=Mt.map(p=>p.value).filter(p=>[].concat(t.weekdays||[]).includes(p));d.length&&(s.weekdays=d)}else if(a==="user"){let c=[].concat(t.users||[]).filter(Boolean);c.length&&(s.users=c)}else return{...e};return s}_renderChipVisibility(e,t){let i=Array.isArray(e.visibility)?e.visibility:[],a=s=>{let c={...e};s.length?c.visibility=s:delete c.visibility,t(c)},r=$e(i,this.hass);return l`<div class="chip-nudge info">
        <ha-icon icon="mdi:eye-outline" style="--mdc-icon-size:14px;flex-shrink:0"></ha-icon>
        ${o("Show this chip only when all conditions are met.")}
      </div>
      ${i.length?l`<div class="vis-status ${r?"on":"off"}">
            <ha-icon icon=${r?"mdi:eye":"mdi:eye-off"}></ha-icon>
            <span>${o(r?"Shown right now":"Hidden right now")}</span>
          </div>`:""}
      ${i.map((s,c)=>{let d=s&&typeof s=="object"?s:{},p=["and","or","not"].includes(d.condition);return l`<div class="vis-cond">
          <div class="vis-cond-head">
            <span>${o(p?"Group of conditions":"Visibility condition")} ${c+1}</span>
            <button
              type="button"
              class="clear-btn"
              title=${o("Remove")}
              @click=${()=>a(i.filter((g,u)=>u!==c))}
            >
              <ha-icon icon="mdi:delete-outline"></ha-icon>
            </button>
          </div>
          ${p?l`<div class="chip-nudge info">
                ${o("This group (and, or, not) can be changed in the YAML editor.")}
              </div>`:l`<ha-form
                .hass=${this.hass}
                .data=${this._visFormData(d)}
                .schema=${this._visSchema(d)}
                .computeLabel=${g=>g&&g.name?o(ta[g.name]||g.name):""}
                .computeHelper=${g=>g&&g.name==="media_query"?o("Filled in from the sizes above, or write your own CSS media query."):g&&g.name==="state"?o("Pick one or more states, or type any value."):void 0}
                @value-changed=${g=>{g.stopPropagation();let u=g.detail&&g.detail.value||{};a(i.map((m,v)=>v===c?this._visFromForm(d,u):m))}}
              ></ha-form>`}
        </div>`})}
      <button
        type="button"
        class="add-card-btn"
        @click=${()=>{let s={condition:"state"};e.entity&&!e.forecast&&(s.entity=e.entity),a([...i,s])}}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>${o("Add condition")}</span>
      </button>`}_renderChipRow(e,t,i){let a=this._expandedChip===t,r=(e.position||"").toString().toLowerCase()==="custom",s=!!e.forecast,c=e.type||"",d=ye(e),g=r?l`<span class="chip-badge-free"
          ><ha-icon icon="mdi:cursor-move"></ha-icon
        ></span>`:this._hasAreaTwo()?l`<span class="chip-badge-row chip-badge-area a${d}" title=${o("Chip area {n}",{n:d})}
            >${d}</span
          >`:l`<span class="chip-badge-row"
            ><ha-icon icon="mdi:view-grid-outline"></ha-icon
          ></span>`;if(!a)return this._renderListRow({idx:t,total:i,expanded:a,body:"",badge:g,title:this._chipTitle(e),subtitle:this._chipValuePreview(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)});let u=!!(e.entity||"").toString().trim(),m=(e.entity||"").toString().trim(),v=(e.name_sensor||"").toString().trim(),x=s&&m&&!m.startsWith("weather."),C=this[`_acc_open_${t}`]||null,f=h=>this._updateChipAt(t,h),k=h=>l`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${h}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${_=>{_.stopPropagation(),f(_.detail&&_.detail.value||{})}}
      ></ha-form>`,q=(h,_,y)=>l`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${[{name:h,selector:y}]}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${$=>{$.stopPropagation();let w={...$.detail&&$.detail.value||{}};w[h]!==e[h]&&delete w[_],f(w)}}
      ></ha-form>`,P=(h,_,y)=>l`<div class="css-field">
        <span class="css-field-label">${o(_)}</span>
        <input
          type="text"
          placeholder=${o(y)}
          .value=${e[h]!==void 0?String(e[h]):""}
          @change=${$=>{let A=$.target.value,w={...e};h==="unit_format"||h==="sub_value_format"?w[h]=A:A.trim()?w[h]=A.trim():delete w[h],f(w)}}
        />
      </div>`,Yt=l`<div class="chip-type-picker">
      <button
        type="button"
        class="chip-type-btn ${s?"":"active"}"
        data-chip-idx=${t}
        data-mode="sensor"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${s?"":"active-icon"}"
          icon="mdi:gauge"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${o("Sensor")}</span
          ><span class="chip-type-desc">${o("Live entity value")}</span>
        </div>
      </button>
      <button
        type="button"
        class="chip-type-btn ${s?"active":""}"
        data-chip-idx=${t}
        data-mode="forecast"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${s?"active-icon":""}"
          icon="mdi:calendar-clock"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${o("Forecast")}</span
          ><span class="chip-type-desc">${o("Weather forecast")}</span>
        </div>
      </button>
    </div>`,Zt=s?k([{name:"entity",selector:{entity:{domain:"weather"}}}]):l`${q("entity","attribute",{entity:{}})}
        ${m?k([{name:"attribute",selector:{attribute:{entity_id:m}}}]):""}`,Qt=u?"":l`<div class="chip-nudge info">
          <ha-icon
            icon="mdi:information-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${o("Pick an entity for this chip.")}
        </div>`,Xt=x?l`<div class="chip-nudge warning">
          <ha-icon
            icon="mdi:alert-circle-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${o("Forecast requires a weather entity.")}
        </div>`:"",Ye=e.attribute||"condition",K=parseInt(e.forecast_offset,10)||0,Jt=(e.icon||"").toString().trim().toLowerCase()==="weather",ei=l`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide icon")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_icon"
            data-mode=${F.TRUE_DELETE}
            .checked=${e.hide_icon===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_icon?"":l`${Jt?l`<div class="weather-icon-active">
                  <ha-icon
                    icon="mdi:weather-partly-cloudy"
                    style="--mdc-icon-size:20px;color:var(--primary-color)"
                  ></ha-icon>
                  <div class="weather-icon-active-text">
                    <span>${o("Weather icon")}</span>
                    <span class="weather-icon-active-sub"
                      >${o(s?"Matches forecast":"Matches weather")}</span
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
                </div>`:l`<div class="icon-combo">
                  <ha-form
                    style="flex:1;min-width:0"
                    .hass=${this.hass}
                    .data=${{icon:e.icon||""}}
                    .schema=${[{name:"icon",selector:{icon:{}}}]}
                    .computeLabel=${()=>""}
                    @value-changed=${h=>{h.stopPropagation(),f({...e,icon:h.detail&&h.detail.value&&h.detail.value.icon||""})}}
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
              ${k([{name:"icon_path",selector:{text:{}}}])}
              ${e.icon_path?l`<button
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
              ${P("icon_size","Size","auto")}
              ${P("icon_padding","Padding","auto")}
            </div>
            <div class="toggle-group">
              <label class="toggle-row">
                <span>${o("Icon background")}</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="icon_background"
                  data-mode=${F.TRUE_FALSE_IF_DEFINED}
                  .checked=${e.icon_background===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${e.icon_background===!0?this._renderColorPicker("Icon background color",e.icon_background_color||"",(h,_)=>{let y={...e};h?y.icon_background_color=this._serializeColor(h,_):delete y.icon_background_color,f(y)}):""}`}`,ti=(e.overflow||"").toLowerCase()==="marquee",ii=(e.label_overflow||"").toLowerCase()==="marquee",Ze=!!(e.sub_value_entity||e.sub_value_attribute),Qe=(e.sub_value_entity||"").toString().trim(),ai=this[`_text_acc_${t}`]||null,he=(h,_,y)=>{let $=ai===h;return l`<div class="chip-accordion">
        <div
          class="chip-accordion-head ${$?"open":""}"
          data-chip-idx=${t}
          data-acc-kind="text"
          data-acc-key=${h}
          @click=${this._onChipAccordionToggle}
        >
          <span class="chip-accordion-title">${o(_)}</span>
          <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        ${$?l`<div class="chip-accordion-body">${y}</div>`:""}
      </div>`},ri=l`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_label"
            data-mode=${F.TRUE_DELETE}
            .checked=${e.hide_label===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_label!==!0?l`${k([{name:"name",selector:{text:{}}}])}
            ${q("name_sensor","name_attribute",{entity:{}})}
            ${v?k([{name:"name_attribute",selector:{attribute:{entity_id:v}}}]):s&&!e.name?l`<ha-form
                    .hass=${this.hass}
                    .data=${{name_attribute:e.name_attribute||""}}
                    .schema=${[{name:"name_attribute",selector:{select:{mode:"dropdown",options:z(ce)}}}]}
                    .computeLabel=${()=>o("Forecast attribute")}
                    @value-changed=${h=>{h.stopPropagation();let _=h.detail&&h.detail.value&&h.detail.value.name_attribute,y={...e};_?y.name_attribute=_:delete y.name_attribute,f(y)}}
                  ></ha-form>`:""}
            ${s&&!e.name&&!v&&!e.name_attribute?k([{name:"date_format",selector:{text:{}}}]):""}
            <div class="css-field-row cols-2">
              ${P("label_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${o("Weight")}
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(h=>l`<button
                    type="button"
                    role="radio"
                    class=${(e.label_weight||"")===h.value?"active":""}
                    data-chip-idx=${t}
                    data-key="label_weight"
                    data-mode=${I.SET_OR_DELETE_EMPTY}
                    data-value=${h.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(h.label)}
                  </button>`)}
            </div>
            ${k([{name:"label_overflow",selector:{select:{mode:"dropdown",options:z(T.chip_overflow)}}}])}`:""}`,ni=l`<div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Hide")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_value"
            data-mode=${F.TRUE_DELETE}
            .checked=${e.hide_value===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        ${!e.hide_value&&!s&&this.hass&&this.hass.states[m]&&this.hass.states[m].attributes&&(this.hass.states[m].attributes.temperature_unit||(this.hass.states[m].attributes.unit_of_measurement||"").match(/^°/))?l`<label class="toggle-row">
              <span>${o("Fancy unit")}</span>
              <ha-switch
                data-chip-idx=${t}
                data-key="fancy_unit"
                data-mode=${F.TRUE_DELETE}
                .checked=${e.fancy_unit===!0}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>`:""}
      </div>
      ${e.hide_value!==!0?l`${we(e,this.hass)?l`<ha-form
                  .hass=${this.hass}
                  .data=${{bearing_format:e.bearing_format||"degrees",bearing_icon:e.bearing_icon||"icon"}}
                  .schema=${[{name:"bearing_format",selector:{select:{mode:"dropdown",options:z(T.bearing_format)}}},{name:"bearing_icon",selector:{select:{mode:"dropdown",options:z(T.bearing_icon)}}}]}
                  .computeLabel=${this._chipLabel}
                  @value-changed=${h=>{h.stopPropagation();let _=h.detail&&h.detail.value||{},y={...e,bearing_format:_.bearing_format||"degrees"};_.bearing_icon&&_.bearing_icon!=="icon"?y.bearing_icon=_.bearing_icon:delete y.bearing_icon,f(y)}}
                ></ha-form>
                ${e.attribute==="wind_bearing"?l`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${o("Show wind speed")}</span>
                        <ha-switch
                          data-chip-idx=${t}
                          data-key="bearing_speed"
                          data-mode=${F.TRUE_DELETE}
                          .checked=${e.bearing_speed===!0}
                          @change=${this._onChipToggleChange}
                        ></ha-switch>
                      </label>
                    </div>`:""}`:""}
            ${!s&&this._chipShowsTimestamp(e)?k([{name:"date_format",selector:{text:{}}}]):k([{name:"unit_format",selector:{text:{}}}])}
            ${!s&&m?l`${(()=>{let h=e.value_precision!==void 0&&e.value_precision!==null,_=h?Math.min(2,Math.max(0,parseInt(e.value_precision,10)||0)):1,y=Math.round(_/2*100);return l`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${o("Auto (Home Assistant)")}</span>
                        <ha-switch
                          .checked=${!h}
                          @change=${$=>{if($.target.checked){let A={...e};delete A.value_precision,f(A)}else f({...e,value_precision:_})}}
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
                          placeholder=${h?"":o("Auto")}
                          .value=${h?String(_):""}
                          @change=${$=>{let A=$.target.value.trim();if(A===""){let L={...e};delete L.value_precision,f(L);return}let w=Math.min(2,Math.max(0,parseInt(A,10)||0)),E=$.target.closest(".awc-slider").querySelector(".awc-slider-range");E&&(E.value=w,E.style.setProperty("--awc-slider-pct",Math.round(w/2*100)+"%")),f({...e,value_precision:w})}}
                        />
                      </div>
                      <input
                        type="range"
                        class="awc-slider-range"
                        min="0"
                        max="2"
                        step="1"
                        .value=${String(_)}
                        style="--awc-slider-pct:${y}%"
                        @input=${$=>{let A=parseInt($.target.value,10),w=Math.round(A/2*100);$.target.style.setProperty("--awc-slider-pct",w+"%");let E=$.target.closest(".awc-slider").querySelector(".awc-slider-num");E&&(E.value=A)}}
                        @change=${$=>f({...e,value_precision:parseInt($.target.value,10)})}
                      />
                      <div class="awc-slider-helper">
                        ${o(h?"Manual override":"Following Home Assistant display precision")}
                      </div>
                    </div>`})()}`:""}
            <div class="css-field-row cols-2">
              ${P("text_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${o("Weight")}
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(h=>l`<button
                    type="button"
                    role="radio"
                    class=${(e.value_weight||"")===h.value?"active":""}
                    data-chip-idx=${t}
                    data-key="value_weight"
                    data-mode=${I.SET_OR_DELETE_EMPTY}
                    data-value=${h.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(h.label)}
                  </button>`)}
            </div>
            ${k([{name:"overflow",selector:{select:{mode:"dropdown",options:z(T.chip_overflow)}}}])}`:""}`,oi=l`${Ze?l`<div class="toggle-group">
            <label class="toggle-row">
              <span>${o("Hide")}</span>
              <ha-switch
                data-chip-idx=${t}
                data-key="hide_sub_value"
                data-mode=${F.TRUE_DELETE}
                .checked=${e.hide_sub_value===!0}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>
          </div>`:""}
      ${e.hide_sub_value!==!0?l`${q("sub_value_entity","sub_value_attribute",{entity:{}})}
          ${Qe?k([{name:"sub_value_attribute",selector:{attribute:{entity_id:Qe}}}]):s?l`<ha-form
                  .hass=${this.hass}
                  .data=${{sub_value_attribute:e.sub_value_attribute||""}}
                  .schema=${[{name:"sub_value_attribute",selector:{select:{mode:"dropdown",options:z(ce)}}}]}
                  .computeLabel=${()=>o("Forecast attribute")}
                  @value-changed=${h=>{h.stopPropagation();let _=h.detail&&h.detail.value&&h.detail.value.sub_value_attribute,y={...e};_?y.sub_value_attribute=_:delete y.sub_value_attribute,f(y)}}
                ></ha-form>`:""}
          ${Ze?l`<div class="css-field-row cols-2">
                  ${P("sub_value_format","Unit","")}
                  ${P("sub_value_size","Size","auto")}
                </div>
                <div
                  class="segmented segmented-compact"
                  role="radiogroup"
                  aria-label=${o("Weight")}
                >
                  ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(h=>l`<button
                        type="button"
                        role="radio"
                        class=${(e.sub_value_weight||"")===h.value?"active":""}
                        data-chip-idx=${t}
                        data-key="sub_value_weight"
                        data-mode=${I.SET_OR_DELETE_EMPTY}
                        data-value=${h.value}
                        @click=${this._onChipSegmentedSelect}
                      >
                        ${o(h.label)}
                      </button>`)}
                </div>
                <div class="segmented" role="radiogroup" aria-label="Position">
                  ${[{value:"below",label:"Below"},{value:"beside",label:"Beside value"}].map(h=>{let _=e.sub_value_position==="beside"?"beside":"below";return l`<button
                      type="button"
                      role="radio"
                      class=${_===h.value?"active":""}
                      data-chip-idx=${t}
                      data-key="sub_value_position"
                      data-mode=${I.BESIDE_OR_DELETE}
                      data-value=${h.value}
                      @click=${this._onChipSegmentedSelect}
                    >
                      ${o(h.label)}
                    </button>`})}
                </div>
                ${k([{name:"sub_value_overflow",selector:{select:{mode:"dropdown",options:z(T.chip_overflow)}}}])}`:""}`:""}`,si=(e.sub_value_overflow||"").toLowerCase()==="marquee",Xe=ti||ii||si?l`<div class="toggle-group">
              <label class="toggle-row">
                <span>${o("Right-to-left")}</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="marquee_rtl"
                  data-mode=${F.TRUE_DELETE}
                  .checked=${e.marquee_rtl===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${(()=>{let h=parseFloat(e.marquee_speed)||30;return this._renderChipSlider(e,f,"marquee_speed","Scroll speed",5,100,5,h,30)})()}`:null,li=l`${he("text_label","Label",ri)}
    ${he("text_value","Value",ni)}
    ${he("text_sub","Sub value",oi)}
    ${Xe?he("text_marquee","Scrolling",Xe):""}`,ci=l`<div
        class="segmented"
        role="radiogroup"
        aria-label=${o("Chip layout")}
      >
        ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(h=>l`<button
              type="button"
              role="radio"
              class=${e.style===h.value?"active":""}
              data-chip-idx=${t}
              data-key="style"
              data-mode=${I.TOGGLE_DELETE_IF_SAME}
              data-value=${h.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${o(h.label)}
            </button>`)}
      </div>
      <div class="segmented" role="radiogroup" aria-label="Alignment">
        ${[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}].map(h=>l`<button
              type="button"
              role="radio"
              class=${e.align===h.value?"active":""}
              data-chip-idx=${t}
              data-key="align"
              data-mode=${I.TOGGLE_DELETE_IF_SAME}
              data-value=${h.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${o(h.label)}
            </button>`)}
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Round shape")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="chip_round"
            data-mode=${F.TRUE_DELETE}
            .checked=${e.chip_round===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>${o("Background")}</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="background"
            data-mode=${F.FALSE_DELETE}
            .checked=${e.background!==!1}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.background!==!1?this._renderColorPicker("Background color",e.background_color||"",(h,_)=>{let y={...e};h?y.background_color=this._serializeColor(h,_):delete y.background_color,f(y)}):""}
      <div class="settings-group">
        <div class="settings-group-label">${o("Chip Layout")}</div>
        <div class="css-field-row cols-2">
          ${P("width","Width","e.g. 200px")}
          ${P("height","Height","e.g. 40px")}
        </div>
        <div class="css-field-row cols-2">
          ${P("padding","Padding","auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${P("inner_gap","Icon/text gap","auto")}
          ${P("text_gap","Label/value gap","auto")}
        </div>
      </div>`,Je=h=>{let _=h+"_",y=Array.isArray(e[_+"thresholds"])?e[_+"thresholds"]:[],$=h==="ring"?l`<div class="css-field-row cols-2">
              ${P("ring_width","Thickness","4")}
              ${P("ring_gap","Gap","3")}
            </div>`:l`<div class="css-field-row cols-2">
              ${P("bar_height","Thickness","4")}
              ${P("bar_gap","Gap","4")}
            </div>`,A=(e.gauge_entity||"").toString().trim();return l`<div class="css-field-row cols-2">
          ${P(_+"min","Min","0")}
          ${P(_+"max","Max","100")}
        </div>
        ${$}
        ${this._renderColorPicker(h==="ring"?"Ring color":"Bar color",e[_+"color"]||"",(w,E)=>{let L={...e};w?L[_+"color"]=this._serializeColor(w,E):delete L[_+"color"],f(L)})}
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${o(h==="ring"?"Ring entity":"Bar entity")}</span>
          </summary>
          <div class="disclosure-body">
            <div
              style="font-size:var(--awc-e-f-meta);color:var(--secondary-text-color);line-height:1.4"
            >
              ${o(h==="ring"?"Use a different entity for the ring value instead of the chip's main entity.":"Use a different entity for the bar value instead of the chip's main entity.")}
            </div>
            ${q("gauge_entity","gauge_attribute",{entity:{}})}
            ${A?k([{name:"gauge_attribute",selector:{attribute:{entity_id:A}}}]):s?l`<ha-form
                    .hass=${this.hass}
                    .data=${{gauge_attribute:e.gauge_attribute||""}}
                    .schema=${[{name:"gauge_attribute",selector:{select:{mode:"dropdown",options:z(ce)}}}]}
                    .computeLabel=${()=>o("Forecast attribute")}
                    @value-changed=${w=>{w.stopPropagation();let E=w.detail&&w.detail.value&&w.detail.value.gauge_attribute,L={...e};E?L.gauge_attribute=E:delete L.gauge_attribute,f(L)}}
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
              ${[{value:"solid",label:"Solid"},{value:"segments",label:"Segments"},{value:"gradient",label:"Gradient"}].map(w=>l`<button
                    type="button"
                    role="radio"
                    class=${(e[_+"threshold_mode"]||"solid")===w.value?"active":""}
                    data-chip-idx=${t}
                    data-key=${_+"threshold_mode"}
                    data-mode=${I.SOLID_OR_DELETE}
                    data-value=${w.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${o(w.label)}
                  </button>`)}
            </div>
            ${y.map((w,E)=>l`<div class="ring-threshold-row">
                  <span class="threshold-label">≥</span>
                  <input
                    type="text"
                    placeholder=${o("value")}
                    .value=${String(w.value!=null?w.value:"")}
                    @change=${L=>{let H=[...y];H[E]={...H[E],value:L.target.value.trim()},f({...e,[_+"thresholds"]:H})}}
                  />
                  <input
                    type="color"
                    class="chip-color-swatch"
                    .value=${w.color||"#ff0000"}
                    @input=${L=>{let H=[...y];H[E]={...H[E],color:L.target.value},f({...e,[_+"thresholds"]:H})}}
                  />
                  <button
                    type="button"
                    class="ring-threshold-del"
                    title="Remove"
                    @click=${()=>{let L=[...y];L.splice(E,1),f({...e,[_+"thresholds"]:L.length?L:void 0})}}
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
              @click=${()=>{let w=[...y,{value:"",color:"#ff9800"}];f({...e,[_+"thresholds"]:w})}}
            >
              <ha-icon icon="mdi:plus" style="--mdc-icon-size:14px"></ha-icon>
              ${o("Add threshold")}
            </button>
          </div>
        </details>`},di=["min","max","color","thresholds","threshold_mode"],hi=l`<div
        class="segmented"
        role="radiogroup"
        aria-label=${o("Chip type")}
      >
        ${[{value:"",label:"Default"},{value:"ring",label:"Ring"},{value:"bar",label:"Bar"},...String(e.entity||"").startsWith("sun.")||c==="sun_path"?[{value:"sun_path",label:"Sun path"}]:[]].map(h=>l`<button
              type="button"
              role="radio"
              class=${c===h.value?"active":""}
              @click=${()=>{let _={...e},y=c;h.value?_.type=h.value:delete _.type;let $=["ring","bar"];if($.includes(y)&&$.includes(h.value)&&y!==h.value)for(let A of di){let w=y+"_"+A,E=h.value+"_"+A;_[w]!==void 0&&_[E]===void 0&&(_[E]=_[w])}f(_)}}
            >
              ${o(h.label)}
            </button>`)}
      </div>
      ${c==="ring"?Je("ring"):""}
      ${c==="bar"?Je("bar"):""}`,ui=["top-left","top-center","top-right","left","center","right","bottom-left","bottom-center","bottom-right"],pi=e.position_anchor||"top-left",et=r?"free":String(ye(e)),gi=h=>{let _={...e};h==="free"?(_.position="custom",_.position_anchor||(_.position_anchor="top-left"),delete _.area):(["position","position_anchor","position_x","position_y"].forEach(y=>delete _[y]),h==="2"?_.area=2:delete _.area),f(_)},mi=l`<div class="settings-group">
        <div class="settings-group-label">${o("Where the chip sits")}</div>
        <div class="segmented" role="radiogroup" aria-label=${o("Where the chip sits")}>
          ${[["1","Chip area 1"],["2","Chip area 2"],["free","Free positioning"]].map(([h,_])=>l`<button
                type="button"
                role="radio"
                aria-checked=${et===h?"true":"false"}
                class=${et===h?"active":""}
                data-place=${h}
                @click=${()=>gi(h)}
              >
                ${o(_)}
              </button>`)}
        </div>
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>${o("Behind animations")}</span>
          <ha-switch
            .checked=${e.behind_effects===!0}
            @change=${h=>{let _={...e};h.target.checked?_.behind_effects=!0:delete _.behind_effects,f(_)}}
          ></ha-switch
        ></label>
      </div>
      ${r?l`<div>
            <div class="free-pos-layout">
              <div>
                <div class="settings-group-label">${o("Position")}</div>
                <div
                  class="anchor-grid"
                  role="radiogroup"
                  aria-label="Position"
                >
                  ${ui.map(h=>l`<button
                        type="button"
                        role="radio"
                        class="anchor-cell ${pi===h?"active":""}"
                        title=${h}
                        aria-label=${h}
                        data-chip-idx=${t}
                        data-anchor=${h}
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
                      @change=${h=>{let _={...e},y=h.target.value.trim();y?_.position_x=y:delete _.position_x,f(_)}}
                    />
                  </div>
                  <div class="offset-field">
                    <span class="offset-field-label">Y</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(e.position_y||"")}
                      @change=${h=>{let _={...e},y=h.target.value.trim();y?_.position_y=y:delete _.position_y,f(_)}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> `:""}`,_i=l`${k([{name:"tap_action",selector:{ui_action:{}}}])}`,fi=s&&!x?l`<div class="chip-forecast-box">
            <div class="chip-forecast-header">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon> ${o("Forecast")}
            </div>
            <div class="chip-forecast-body">
              <div
                class="segmented"
                role="radiogroup"
                aria-label=${o("Forecast type")}
              >
                ${[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"}].map(h=>l`<button
                      type="button"
                      role="radio"
                      class=${e.forecast===h.value?"active":""}
                      data-chip-idx=${t}
                      data-forecast-type=${h.value}
                      @click=${this._onChipForecastTypeSelect}
                    >
                      ${o(h.label)}
                    </button>`)}
              </div>
              ${(()=>{let h=e.forecast==="hourly"?23:6,_=e.forecast==="hourly"?o("Hours ahead"):o("Days ahead"),y=e.forecast==="hourly"?K===0?o("Now"):`+${K}h`:K===0?o("Today"):K===1?o("Tomorrow"):o("+{n} days",{n:K});return this._renderChipSlider(e,f,"forecast_offset",_,0,h,1,K,0,y)})()}
              <ha-form
                .hass=${this.hass}
                .data=${{attribute:Ye}}
                .schema=${[{name:"attribute",selector:{select:{mode:"dropdown",options:z(ce)}}}]}
                .computeLabel=${()=>o("Show")}
                @value-changed=${h=>{h.stopPropagation();let _=h.detail&&h.detail.value&&h.detail.value.attribute;_!==void 0&&f({...e,attribute:_})}}
              ></ha-form>
              ${Ye!=="condition"&&!e.hide_value?l`${(()=>{let h=e.forecast_precision!==void 0?e.forecast_precision:1;return this._renderChipSlider(e,f,"forecast_precision","Decimal places",0,2,1,h,0)})()}`:""}
            </div>
          </div>`:null,bi=Gt.some(h=>e[h]!==void 0&&e[h]!==""),Ce=[{key:"data",title:"Data",body:l`${Yt} ${Zt} ${Qt} ${Xt}
        ${fi||""}`},{key:"text",title:"Text",body:li},{key:"icon",title:"Icon",body:ei},{key:"look",title:"Look",body:l`<div class="settings-group-label">${o("Type")}</div>
          ${hi}
          <div class="settings-group-label">${o("Layout")}</div>
          ${ci}`},{key:"position",title:"Position",body:mi},{key:"tap",title:"Tap",body:_i},{key:"visibility",title:"Conditions",body:this._renderChipVisibility(e,f)}],Y=Ce.find(h=>h.key===C)||Ce[0],yi=l`<div class="chip-tabs" role="tablist">
        ${Ce.map(h=>l`<button
              type="button"
              role="tab"
              class="chip-tab ${h===Y?"active":""}"
              aria-selected=${h===Y?"true":"false"}
              data-chip-idx=${t}
              data-acc-kind="main"
              data-acc-key=${h.key}
              @click=${this._onChipAccordionToggle}
            >
              ${o(h.title)}
            </button>`)}
      </div>
      <div class="chip-tab-body">
        ${Ht[Y.key]?this._renderIntro(`chip_${Y.key}`,...Ht[Y.key]):""}${Y.body}
      </div>
    ${bi?l`<button
          type="button"
          class="add-card-btn"
          style="border-style:solid;border-color:rgba(var(--rgb-error-color,211,47,47),0.35);color:var(--error-color);margin-top:var(--awc-e-s3)"
          data-chip-idx=${t}
          data-action="reset-styles"
          @click=${this._onChipActionClick}
        >
          <ha-icon icon="mdi:restore"></ha-icon><span>${o("Reset all styles")}</span>
        </button>`:""}`;return this._renderListRow({idx:t,total:i,expanded:a,body:yi,badge:g,title:this._chipTitle(e),subtitle:this._chipValuePreview(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)})}_parseColor(e){let t=(e||"").toString().trim(),i=t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);return i?{hex:`#${parseInt(i[1]).toString(16).padStart(2,"0")}${parseInt(i[2]).toString(16).padStart(2,"0")}${parseInt(i[3]).toString(16).padStart(2,"0")}`,opacity:i[4]!==void 0?parseFloat(i[4]):1,hasColor:!0}:/^#[0-9a-f]{3,8}$/i.test(t)?{hex:t.slice(0,7),opacity:1,hasColor:!0}:{hex:"#ffffff",opacity:0,hasColor:!1}}_serializeColor(e,t){if(t>=1)return e;let i=parseInt(e.slice(1,3),16),a=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return`rgba(${i},${a},${r},${parseFloat(t.toFixed(2))})`}_renderColorPicker(e,t,i){let{hex:a,opacity:r,hasColor:s}=this._parseColor(t);return l`<div class="chip-color-box">
      <div class="chip-color-row">
        <ha-icon
          icon="mdi:palette-outline"
          style="--mdc-icon-size:15px;color:var(--secondary-text-color);flex-shrink:0"
        ></ha-icon>
        <span class="chip-color-label">${o(e)}</span>
        <input
          type="color"
          class="chip-color-swatch"
          .value=${a}
          @input=${c=>i(c.target.value,r||1)}
        />
        ${s?l`<button
              type="button"
              class="chip-color-clear"
              title=${o("Clear color")}
              @click=${()=>i("",1)}
            >
              <ha-icon icon="mdi:close" style="--mdc-icon-size:14px"></ha-icon>
            </button>`:""}
      </div>
      ${s?l`<div class="chip-color-opacity-row">
            <span class="chip-color-opacity-label">${o("Opacity")}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              class="chip-color-opacity"
              .value=${String(r)}
              @input=${c=>i(a,parseFloat(c.target.value))}
            />
            <span class="chip-color-opacity-val"
              >${Math.round(r*100)}%</span
            >
          </div> `:""}
    </div>`}_renderGlobalColorPicker(e,t){let i=(this._config[e]||"").toString().trim();return this._renderColorPicker(t,i,(a,r)=>{this._updateField(e,a?this._serializeColor(a,r):"")})}_renderSlider(e,t,i,a,r,s){let c=this._renderSliderInner(e,t,i,a,r,s);return this._fromLayout(e)?l`<div class="from-layout" title=${o("From the layout")}>${c}</div>`:c}_renderSliderInner(e,t,i,a,r,s){let c=be(this._config),d=this._formData[e]!=null?this._formData[e]:c[e]!=null?c[e]:qt[e]!=null?qt[e]:i,p=parseFloat(d),g=Number.isFinite(p)?p:i,u=Math.round((g-i)/(a-i)*100);return this._renderSliderMarkup({label:t,min:i,max:a,step:r,val:g,pct:u,helper:s,onNumChange:m=>{let v=Math.min(a,Math.max(i,parseFloat(m.target.value)||i));this._syncSliderRange(m,v,i,a),this._updateField(e,v)},onRangeInput:m=>{this._syncSliderNum(m,parseFloat(m.target.value),i,a)},onRangeChange:m=>this._updateField(e,parseFloat(m.target.value))})}_renderChipSlider(e,t,i,a,r,s,c,d,p,g){let u=Math.round((d-r)/(s-r)*100);return this._renderSliderMarkup({label:a,min:r,max:s,step:c,val:d,pct:u,helper:g,onNumChange:m=>{let v=Math.min(s,Math.max(r,parseInt(m.target.value,10)||p));this._syncSliderRange(m,v,r,s),t({...e,[i]:v})},onRangeInput:m=>{this._syncSliderNum(m,parseInt(m.target.value,10),r,s)},onRangeChange:m=>t({...e,[i]:parseInt(m.target.value,10)})})}_syncSliderRange(e,t,i,a){let r=e.target.closest(".awc-slider").querySelector(".awc-slider-range");r&&(r.value=t,r.style.setProperty("--awc-slider-pct",Math.round((t-i)/(a-i)*100)+"%"))}_syncSliderNum(e,t,i,a){e.target.style.setProperty("--awc-slider-pct",Math.round((t-i)/(a-i)*100)+"%");let r=e.target.closest(".awc-slider").querySelector(".awc-slider-num");r&&(r.value=t)}_renderSliderMarkup({label:e,min:t,max:i,step:a,val:r,pct:s,onNumChange:c,onRangeInput:d,onRangeChange:p,helper:g}){return l`<div class="awc-slider">
      <div class="awc-slider-head">
        <span class="awc-slider-label">${o(e)}</span>
        <input
          type="number"
          class="awc-slider-num"
          min=${t}
          max=${i}
          step=${a}
          .value=${String(r)}
          @change=${c}
        />
      </div>
      <input
        type="range"
        class="awc-slider-range"
        min=${t}
        max=${i}
        step=${a}
        .value=${String(r)}
        style="--awc-slider-pct:${s}%"
        @input=${d}
        @change=${p}
      />
      ${g?l`<div class="awc-slider-helper">${o(g)}</div>`:""}
    </div>`}_renderCompactField(e,t){let i=String(this._formData[e]||""),a=o(b[e]||e),s=e==="card_height"&&!!this._cardHeightError;return l`<div class="compact-field ${s?"invalid":""}">
      <span class="compact-field-label">${a}</span>
      <input
        type="text"
        placeholder=${o(t)}
        data-field=${e}
        .value=${i}
        @change=${this._onRawFieldChange}
      />
      ${s?l`<div class="compact-field-hint error">
            ${this._cardHeightError}
          </div>`:""}
    </div>`}_renderChipsEditor(){let e=this._formData,t=this._getChips(),i=(e.chip_area_layout||"wrap").toString().toLowerCase(),a=i==="grid",r=i==="horizontal-scroll"||i==="vertical-scroll",s=(e.chip_area_align||"start").toString().toLowerCase(),c=(e.chip_style||"inline").toString().toLowerCase(),d=e.card_background_style||"frosted",p=!!e.chip_area_background,g=(f,k,q)=>l`<div class="css-field">
        <span class="css-field-label">${o(k)}</span>
        <input
          type="text"
          placeholder=${o(q)}
          data-field=${f}
          .value=${String(e[f]||"")}
          @change=${this._onRawFieldChange}
        />
      </div>`,u={wrap:N`<rect x="2" y="4" width="10" height="6" rx="2"/><rect x="15" y="4" width="10" height="6" rx="2"/><rect x="28" y="4" width="10" height="6" rx="2"/><rect x="2" y="14" width="10" height="6" rx="2"/>`,grid:N`<rect x="2" y="4" width="12" height="6" rx="2"/><rect x="16" y="4" width="12" height="6" rx="2"/><rect x="30" y="4" width="12" height="6" rx="2"/><rect x="2" y="14" width="12" height="6" rx="2"/><rect x="16" y="14" width="12" height="6" rx="2"/>`,"horizontal-scroll":N`<rect x="2" y="10" width="10" height="6" rx="2"/><rect x="15" y="10" width="10" height="6" rx="2"/><rect x="28" y="10" width="10" height="6" rx="2"/><rect x="41" y="10" width="3" height="6" rx="1"/>`,"vertical-scroll":N`<rect x="16" y="2" width="12" height="6" rx="2"/><rect x="16" y="10" width="12" height="6" rx="2"/><rect x="16" y="18" width="12" height="3" rx="1"/>`},m=l`<div class="chip-area-top">
        ${this._renderPositionGrid("chip_area_position",de.chip_area_position)}
        <div class="chip-area-layout">
          <div class="grid-picker-label">${o(b.chip_area_layout)}</div>
          <div class="layout-picker" role="radiogroup">
            ${T.chip_area_layout.map(f=>l`<button
                  type="button"
                  role="radio"
                  class=${i===f.value?"active":""}
                  data-field="chip_area_layout"
                  data-value=${f.value}
                  @click=${this._onSegmentedFieldSelect}
                >
                  <svg viewBox="0 0 44 24" aria-hidden="true">
                    ${u[f.value]}
                  </svg>
                  <span>${o(f.label)}</span>
                </button>`)}
          </div>
        </div>
      </div>
      ${a?this._renderSlider("chip_area_columns",b.chip_area_columns,1,12,1):""}
      ${r?this._renderSlider("chip_area_scroll_count",b.chip_area_scroll_count,1,10,1):""}
      <div class="settings-group">
        <div class="settings-group-label">${o(b.chip_style)}</div>
        <div class="segmented" role="radiogroup" aria-label=${o("Chip style")}>
          ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(f=>l`<button
                type="button"
                role="radio"
                class=${c===f.value?"active":""}
                data-field="chip_style"
                data-value=${f.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(f.label)}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o("Chip background")}</div>
        <div class="segmented" role="radiogroup" aria-label=${o("Background")}>
          <button
            type="button"
            role="radio"
            class=${p?"":"active"}
            data-bg-mode="off"
            @click=${this._onChipAreaBackgroundModeSelect}
          >
            ${o("Off")}
          </button>
          ${[{value:"frosted",label:"Frosted"},{value:"contrast",label:"Contrast"},{value:"theme",label:"Theme"}].map(f=>l`<button
                type="button"
                role="radio"
                class=${p&&d===f.value?"active":""}
                data-bg-mode=${f.value}
                @click=${this._onChipAreaBackgroundModeSelect}
              >
                ${o(f.label)}
              </button>`)}
        </div>
        <div class="composite-helper">${o(S.card_background_style)}</div>
      </div>`,v=l`<div class="settings-group">
        <div class="section-title">${o("Size")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_area_width",b.chip_area_width,"auto")}
          ${r?g("chip_area_height",b.chip_area_height,"auto"):""}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Arrangement")}</div>
        <div class="field-group">
          ${this._renderToggleGroup([{key:"chip_area_grouped",label:b.chip_area_grouped},...r?[{key:"chip_area_full_width",label:b.chip_area_full_width}]:[]])}
          ${e.chip_area_grouped===!0?this._renderToggleGroup([{key:"chip_area_separator",label:b.chip_area_separator}]):""}
        </div>
        <div class="settings-group-label">${o("Content alignment")}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${o("Content alignment")}
          style="flex-wrap:nowrap"
        >
          ${T.chip_area_align.map(f=>l`<button
                type="button"
                role="radio"
                class=${s===f.value?"active":""}
                data-field="chip_area_align"
                data-value=${f.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(f.label)}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_area_gap",b.chip_area_gap,"8px")}
          ${g("chip_area_padding",b.chip_area_padding,"0")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_gap",b.chip_gap,"6px")}
          ${g("chip_text_gap",b.chip_text_gap,"0.35em")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Sizes")}</div>
        <div class="css-field-row cols-2">
          ${g("chip_text_size",b.chip_text_size,"auto")}
          ${g("chip_label_size",b.chip_label_size,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_icon_size",b.chip_icon_size,"auto")}
          ${g("chip_icon_padding",b.chip_icon_padding,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_padding",b.chip_padding,"auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${o("Colors")}</div>
        <div class="settings-group-label">${o(b.chip_icon_background)}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${o(b.chip_icon_background)}
        >
          ${[{value:void 0,label:"Default"},{value:!0,label:"On"},{value:!1,label:"Off"}].map(f=>l`<button
                type="button"
                role="radio"
                class=${e.chip_icon_background===f.value||f.value===void 0&&e.chip_icon_background===void 0?"active":""}
                data-field="chip_icon_background"
                data-value=${f.value===void 0?"":String(f.value)}
                data-value-type=${f.value===void 0?"empty":"boolean"}
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(f.label)}
              </button>`)}
        </div>
        ${this._renderGlobalColorPicker("chip_background_color","Background color (all chips)")}
        ${this._renderGlobalColorPicker("chip_icon_background_color","Icon background color (all chips)")}
        ${e.chip_area_grouped===!0&&e.chip_area_background===!0?this._renderGlobalColorPicker("chip_area_background_color","Container background color"):""}
      </div>`,x=this._config&&this._config.weather_entity||"",C=[{label:"Temperature",chip:{entity:x,attribute:"temperature",icon:"mdi:thermometer"}},{label:"Humidity",chip:{entity:x,attribute:"humidity",icon:"mdi:water-percent"}},{label:"Wind",chip:{entity:x,attribute:"wind_speed",icon:"mdi:weather-windy"}},{label:"Rain chance",chip:{entity:x,forecast:"daily",attribute:"precipitation_probability",icon:"mdi:umbrella-outline"}},{label:"Tomorrow",chip:{entity:x,forecast:"daily",forecast_offset:1,attribute:"temperature",sub_value_attribute:"templow",icon:"weather"}}];return l`${this._formData.card_layout&&!t.length?l`<div class="info">${o("The card shows the chips of its layout. Add a chip to use your own instead.")}</div>`:this._formData.card_layout&&this._formData.layout_chips===!0?l`<div class="info">${o("The card also shows the chips of its layout, before your own.")}</div>`:""}
      <div class="sensor-list">
        ${t.map((f,k)=>this._renderChipRow(f,k,t.length))}
      </div>
      <button type="button" class="add-chip-btn" @click=${this._addChip}>
        <ha-icon icon="mdi:plus"></ha-icon> <span>${o("Add chip")}</span>
      </button>
      ${x?l`<div class="quick-add">
            <span class="quick-add-label">${o("Quick add:")}</span>
            ${C.map(f=>l`<button
                  type="button"
                  class="quick-add-btn"
                  @click=${()=>this._addQuickChip({name:o(f.label),...f.chip})}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>${o(f.label)}
                </button>`)}
          </div>`:""}
      ${this._renderGroup(this._hasAreaTwo()?"Chip area 1":"Chip area",l`${this._renderIntro("chip_area","Where the chips sit and how they line up: in a row, in a grid with columns or as a strip that scrolls. Style, size and background apply to all chips; single chips can change them under Look.","chips.html#row-options")}${m}`)}
      ${this._hasAreaTwo()?this._renderGroup("Chip area 2",l`${this._renderIntro("chip_area_2","A second place for chips with its own position and layout, for example the values at the top and the forecast at the bottom. A chip moves here under Position.","chips.html#chip-area-2")}${this._renderAreaTwo(u)}`):l`<button type="button" class="add-card-btn add-area-two" @click=${this._addAreaTwo}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>${o("Add second chip area")}</span>
          </button>`}
      ${this._renderGroup("Temperature curve",l`${this._renderIntro("forecast_curve","Draws the temperature as a curve over the forecast chips of a chip area that show the temperature, at least two of them.","chips.html#forecast-curve")}${this._renderForm([{name:"forecast_curve",selector:{select:{mode:"dropdown",options:z(T.forecast_curve)}}}])}
          ${this._formData.forecast_curve?this._renderSlider("forecast_curve_height",o(b.forecast_curve_height),24,120,2,o(S.forecast_curve_height)):""}`)}
      ${this._renderDisclosure("Fine tuning (gaps, sizes, colors)",v)}
      <div class="tip-box">
        <ha-icon icon="mdi:lightbulb-outline"></ha-icon>
        <span
          >${o("SVG icons:")}
          <a
            href="${Bt}docs/guides.html#weather-icons"
            target="_blank"
            rel="noopener"
            >${o("How to add them")}</a
          ></span
        >
      </div>`}_addQuickChip(e){let t=[...this._getChips(),e];this._expandedChip=null,this._commitChips(t)}_renderPerformancePanel(){let e=fe,t=this._config||{},i=["perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night"],a=typeof t.perf_mode=="string"&&e[t.perf_mode]?t.perf_mode:"default",r=e[a],s=u=>{let m=t[u]!==void 0?t[u]:r[u],v=typeof m=="number"?m:parseFloat(m);return Number.isFinite(v)?v:r[u]},c=["low","default","ultra"].find(u=>i.every(m=>s(m)===e[u][m]))||"custom",d=u=>{this._patch({perf_mode:u},{strip:[...i,"fauna_birds","fauna_planes"]})},p={perf_fps:{20:"Battery saver",30:"Balanced",60:"Maximum smoothness"},perf_cloud_quality:{.5:"Simple clouds",1:"Moderate detail",1.5:"Detailed clouds",2:"Maximum detail"},perf_effects:{0:"The weather only, without extra effects",1:"Haze, ground mist, sun rays, fog banks, shooting stars and comets",2:"Plus more comets, clouds lit by the sun and more wind lines"},perf_dpr:{.5:"Low resolution",1:"Standard resolution",1.5:"Sharp rendering",2:"Native resolution"}},g=(u,m,v)=>{let x=s(u),C=p[u]&&p[u][x]||"";return l`<div class="settings-group">
        <div class="settings-group-label">${o(m)}</div>
        <div class="segmented" role="radiogroup" aria-label=${o(m)}>
          ${v.map(f=>l`<button
                type="button"
                role="radio"
                class=${x===f.value?"active":""}
                data-field=${u}
                data-value=${String(f.value)}
                data-value-type="number"
                @click=${this._onSegmentedFieldSelect}
              >
                ${o(f.label)}
              </button>`)}
        </div>
        ${C?l`<div class="composite-helper">${o(C)}</div>`:""}
      </div>`};return l`${this._renderIntro("performance","\u201CLow\u201D saves battery and helps older tablets, \u201CUltra\u201D shows everything at full quality. Every effect can be switched off on its own under Sky & weather; anything that is off costs nothing.","effects.html#performance")}
      <div class="grid-picker">
        <div class="grid-picker-label">${o(b.perf_mode)}</div>
        <div class="segmented">
          ${[{v:"low",l:"Low"},{v:"default",l:"Default"},{v:"ultra",l:"Ultra"}].map(u=>l`<button
                type="button"
                class=${c===u.v?"active":""}
                @click=${()=>d(u.v)}
              >
                ${o(u.l)}
              </button>`)}
        </div>
        <div class="composite-helper">
          ${o(c==="custom"?"Custom: you changed values of the preset.":S.perf_mode)}
        </div>
      </div>
      ${this._renderGroup("Graphics",l`${g("perf_fps",b.perf_fps,[{value:20,label:"20"},{value:30,label:"30"},{value:60,label:"60"}])}
        ${g("perf_cloud_quality",b.perf_cloud_quality,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Ultra"}])}
        ${g("perf_effects",b.perf_effects,[{value:0,label:"Off"},{value:1,label:"Default"},{value:2,label:"Ultra"}])}
        ${g("perf_dpr",b.perf_dpr,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Full"}])}`)}
      ${this._renderGroup("Animation",this._renderSlider("animation_speed",o(b.animation_speed),0,3,.1,o(S.animation_speed)))}`}_onFaunaToggle(e){let t=this._ds(e,"fauna"),i=e.target.checked===!0,a=this._config||{},r=parseInt(a.perf_fauna,10),s=Number.isFinite(r)?r:be(a).perf_fauna,c=s>=1&&a.fauna_birds!==!1,d={},p=[];if(t==="birds")i?(p.push("fauna_birds"),s<1&&(d.perf_fauna=1)):d.fauna_birds=!1;else if(t==="planes")i?(p.push("fauna_planes"),s<2&&(d.perf_fauna=2,c||(d.fauna_birds=!1))):d.fauna_planes=!1;else return;this._patch(d,{strip:p})}_renderSwitch(e,t){let i=this._formData[e],a=t?i!==!1:i===!0,r=S[e];return l`<label class="toggle-row">
      <span class="toggle-text"
        ><span>${o(b[e]||e)}</span>${r?l`<span class="toggle-helper">${o(r)}</span>`:""}</span
      >
      <ha-switch
        data-key=${e}
        .checked=${a}
        @change=${this._onToggleGroupChange}
      ></ha-switch>
    </label>`}_areaTwo(){let e=this._config&&this._config.chip_area_2;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}_hasAreaTwo(){return this._config&&this._config.chip_area_2||this._layoutValues().chip_area_2&&this._getChips().length===0?!0:this._getChips().some(e=>ye(e)===2&&String(e.position||"").toLowerCase()!=="custom")}_setAreaTwo(e,t){let i=this._config&&this._config.chip_area_2?this._areaTwo():{...this._layoutValues().chip_area_2||{}};t==null||t===""||t===!1?delete i[e]:i[e]=t,this._patch({chip_area_2:Object.keys(i).length?i:{position:se}})}_addAreaTwo=()=>{this._patch({chip_area_2:{position:se}})};_removeAreaTwo=()=>{let e=this._getChips().map(t=>{if(t.area===void 0)return t;let i={...t};return delete i.area,i});this._patch(e.length?{chips:e}:{},{strip:["chip_area_2"]})};_renderAreaTwo(e){let t=!(this._config&&this._config.chip_area_2)&&!!this._layoutValues().chip_area_2,i=t?{...this._layoutValues().chip_area_2}:this._areaTwo(),a=jt.chip_area_position,r=String(i.position||se),s=a.reverseMap[r]||r,c=String(i.layout||R.chip_area_layout),d=String(i.style||this._formData.chip_style||R.chip_style),p=i.background===!0?String(i.background_style||this._formData.card_background_style||R.card_background_style):"off",g=(u,m,v,x="text")=>l`<div class="css-field">
        <span class="css-field-label">${o(m)}</span>
        <input
          type=${x}
          min="1"
          placeholder=${v}
          data-area-key=${u}
          .value=${i[u]!==void 0?String(i[u]):""}
          @change=${C=>{let f=C.target.value.trim(),k=x==="number"?parseInt(f,10):f;this._setAreaTwo(u,x==="number"?Number.isFinite(k)&&k>0?k:void 0:f)}}
        />
      </div>`;return l`<div class="composite-helper">
        ${o("Chips with Chip area 2 in their Position tab sit here, with this place and look.")}
        ${t?l` ${o("Grey values come from the layout.")}`:""}
      </div>
      <div class=${t?"from-layout-area":""}>
      <div class="chip-area-top">
        <div class="grid-picker">
          <div class="grid-picker-label">${o(b.chip_area_position)}</div>
          <div class="grid-3x3 area-two-grid" role="radiogroup" aria-label=${o(b.chip_area_position)}>
            ${a.cellsFlat.map(u=>u===null?l`<div class="grid-cell empty"></div>`:l`<button
                    type="button"
                    role="radio"
                    class="grid-cell ${s===u?"active":""}"
                    ?disabled=${a.disabledSet.has(u)}
                    title=${u}
                    aria-label=${u}
                    data-value=${a.valueMap[u]||u}
                    @click=${()=>this._setAreaTwo("position",a.valueMap[u]||u)}
                  ></button>`)}
          </div>
        </div>
        <div class="chip-area-layout">
          <div class="grid-picker-label">${o(b.chip_area_layout)}</div>
          <div class="layout-picker area-two-layout" role="radiogroup">
            ${T.chip_area_layout.map(u=>l`<button
                  type="button"
                  role="radio"
                  class=${c===u.value?"active":""}
                  data-value=${u.value}
                  @click=${()=>this._setAreaTwo("layout",u.value===R.chip_area_layout?void 0:u.value)}
                >
                  <svg viewBox="0 0 44 24" aria-hidden="true">${e[u.value]}</svg>
                  <span>${o(u.label)}</span>
                </button>`)}
          </div>
        </div>
      </div>
      <div class="css-field-row cols-2">
        ${c==="grid"?g("columns","Columns","1","number"):""}
        ${c.endsWith("scroll")?g("scroll_count","Visible chips","auto","number"):""}
        ${g("gap","Gap","8px")}
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o(b.chip_style)}</div>
        <div class="segmented area-two-style" role="radiogroup" aria-label=${o("Chip style")}>
          ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(u=>l`<button
                type="button"
                role="radio"
                class=${d===u.value?"active":""}
                data-value=${u.value}
                @click=${()=>this._setAreaTwo("style",u.value)}
              >
                ${o(u.label)}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${o("Chip background")}</div>
        <div class="segmented area-two-bg" role="radiogroup" aria-label=${o("Background")}>
          ${[{value:"off",label:"Off"},{value:"frosted",label:"Frosted"},{value:"contrast",label:"Contrast"},{value:"theme",label:"Theme"}].map(u=>l`<button
                type="button"
                role="radio"
                class=${p===u.value?"active":""}
                data-value=${u.value}
                @click=${()=>{let m=this._config&&this._config.chip_area_2?this._areaTwo():{...this._layoutValues().chip_area_2||{}};u.value==="off"?(delete m.background,delete m.background_style):(m.background=!0,m.background_style=u.value),this._patch({chip_area_2:Object.keys(m).length?m:{position:se}})}}
              >
                ${o(u.label)}
              </button>`)}
        </div>
      </div>
      </div>
      <button type="button" class="add-card-btn remove-area-two" @click=${this._removeAreaTwo}>
        <ha-icon icon="mdi:minus"></ha-icon>
        <span>${o("Remove second chip area")}</span>
      </button>`}_renderGroup(e,t){return l`<div class="editor-group">
      <div class="editor-group-title">${o(e)}</div>
      ${t}
    </div>`}_renderIntro(e,t,i){let a=!!(this._helpOpen&&this._helpOpen[e]);return l`<div class="help-row">
        <button
          type="button"
          class="help-btn ${a?"active":""}"
          data-help=${e}
          aria-expanded=${a?"true":"false"}
          @click=${this._onHelpToggle}
        >
          <ha-icon icon="mdi:information-outline"></ha-icon>
          <span>${o("Help")}</span>
        </button>
      </div>
      ${a?l`<div class="help-box">
            ${o(t)}
            ${(Array.isArray(i)?i:i?[[i,"More in the docs"]]:[]).map(([r,s])=>l` <a href="${Bt}docs/${r}" target="_blank" rel="noopener"
                    >${o(s)} →</a
                  >`)}
          </div>`:""}`}_onHelpToggle(e){let t=this._ds(e,"help");t&&(this._helpOpen={...this._helpOpen||{},[t]:!this._helpOpen?.[t]},this.requestUpdate())}_section(e,t,i,a,r){return l`<details
      class="section"
      data-section=${e}
      ?open=${this._openSection===e}
      @toggle=${this._onSectionToggle}
    >
      <summary>
        <span class="section-icon"><ha-icon icon=${t}></ha-icon></span>
        <span class="section-text">
          <span class="section-name">${o(i)}</span>
          <span class="section-sub">${o(a)}</span>
        </span>
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="section-body">
        ${Rt[e]?this._renderIntro(e,...Rt[e]):""}${r}
      </div>
    </details>`}_onSectionToggle(e){let t=this._ds(e,"section");t&&(e.currentTarget.open?this._openSection=t:this._openSection===t&&(this._openSection=null))}_renderLayoutsPanel(){let e=this._formData.card_layout||"",t=[{value:"standard",title:"Standard",desc:"A big temperature, the condition and a quiet row with humidity, wind and tomorrow",art:N`<rect class="lt-card" x="2" y="4" width="44" height="28" rx="4"/><circle class="lt-sun" cx="37" cy="11" r="3.5"/><rect x="7" y="9" width="14" height="6" rx="1.5"/><rect x="7" y="17" width="10" height="2.5" rx="1"/><rect x="7" y="25" width="9" height="3" rx="1.5"/><rect x="18" y="25" width="9" height="3" rx="1.5"/><rect x="29" y="25" width="9" height="3" rx="1.5"/>`},{value:"compact",title:"Compact",desc:"One slim strip with the temperature, the condition and two values",art:N`<rect class="lt-card" x="2" y="11" width="44" height="14" rx="4"/><circle class="lt-sun" cx="9" cy="18" r="3"/><rect x="15" y="15" width="10" height="6" rx="1.5"/><rect x="29" y="16.5" width="6" height="3" rx="1.5"/><rect x="37" y="16.5" width="6" height="3" rx="1.5"/>`},{value:"wide",title:"Wide",desc:"The weather now on the left, values and tomorrow in two columns on the right. Needs a wide spot",art:N`<rect class="lt-card" x="1" y="7" width="46" height="22" rx="4"/><circle class="lt-sun" cx="8" cy="13" r="2.5"/><rect x="5" y="18" width="11" height="5" rx="1.5"/><rect x="22" y="12" width="4" height="12" rx="1.5"/><rect x="28" y="12" width="4" height="12" rx="1.5"/><rect x="34" y="12" width="4" height="12" rx="1.5"/><rect x="40" y="12" width="4" height="12" rx="1.5"/>`},{value:"home",title:"Home",desc:"A house with the weather beside it, the bundled one or yours, a wind ring and a frosted bar for values like your rooms",art:N`<rect class="lt-card" x="2" y="4" width="44" height="28" rx="4"/><path class="lt-sun" d="M26 21 L33 14 L40 21 L40 27 L26 27 Z"/><circle cx="40" cy="9" r="3.2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/><rect x="6" y="18" width="10" height="6" rx="1.5"/><rect x="6" y="26" width="7" height="2" rx="1"/><rect x="24" y="28.5" width="18" height="2.5" rx="1.25"/>`},{value:"panel",title:"Panel",desc:"A tall card: the weather on top, tiles with values and the next hours under a soft curve. Needs a tall spot",art:N`<rect class="lt-card" x="11" y="1" width="26" height="34" rx="3.5"/><rect x="14" y="4" width="7" height="4" rx="1"/><rect x="28" y="4" width="6" height="2" rx="1"/><rect x="14" y="11" width="9.5" height="5" rx="1.2"/><rect x="24.5" y="11" width="9.5" height="5" rx="1.2"/><rect x="14" y="17.5" width="9.5" height="5" rx="1.2"/><rect x="24.5" y="17.5" width="9.5" height="5" rx="1.2"/><path d="M15 27 Q20 25 24 27 T33 27" fill="none" stroke="currentColor" stroke-width="0.9"/><rect x="14" y="29.5" width="3" height="3" rx="1"/><rect x="19.5" y="29.5" width="3" height="3" rx="1"/><rect x="25" y="29.5" width="3" height="3" rx="1"/><rect x="30.5" y="29.5" width="3" height="3" rx="1"/>`},{value:"",title:"Free",desc:"No finished look: you choose chips, sizes and positions yourself",art:N`<rect class="lt-card lt-dashed" x="2" y="4" width="44" height="28" rx="4"/><rect x="10" y="11" width="28" height="2" rx="1"/><circle cx="17" cy="12" r="2.5"/><rect x="10" y="17" width="28" height="2" rx="1"/><circle cx="30" cy="18" r="2.5"/><rect x="10" y="23" width="28" height="2" rx="1"/><circle cx="22" cy="24" r="2.5"/>`}];return l`${this._renderIntro("layouts","Each layout is a finished look for one kind of spot: Standard for a normal column, Compact as a slim strip, Wide for a broad spot, Home with a house, the bundled one or yours, Panel as a tall wall panel with the next hours.","appearance.html#card-layouts")}
      <div class="layout-tiles" role="radiogroup" aria-label=${o(b.card_layout)}>
        ${t.map(i=>l`<button
              type="button"
              role="radio"
              aria-checked=${e===i.value?"true":"false"}
              class="layout-tile ${e===i.value?"active":""}"
              data-field="card_layout"
              data-value=${i.value}
              data-value-type=${i.value?"string":"empty"}
              @click=${this._onSegmentedFieldSelect}
            >
              <span class="layout-art"
                ><svg viewBox="0 0 48 36" aria-hidden="true">${i.art}</svg></span
              >
              <span class="layout-text">
                <span class="layout-name">${o(i.title)}</span>
                <span class="layout-desc">${o(i.desc)}</span>
              </span>
              ${e===i.value?l`<ha-icon class="layout-check" icon="mdi:check-circle"></ha-icon>`:""}
            </button>`)}
      </div>
      ${this._renderLayoutNotices(e)}
      <div class="tip-box">
        <ha-icon icon="mdi:lightbulb-outline"></ha-icon>
        <span
          >${o("Picking a layout resets your own values for its look: size, image placement and the chip row. Your chips stay. Values you change afterwards win over the layout.")}</span
        >
      </div>`}_renderLayoutNotices(e){let t=this._layoutSwitch,i=t&&t.layout===e?t:null,a=this._config||{},r=e&&!i&&this._getChips().length>0&&a.layout_chips!==!0,s=(p,g,u)=>l`<button type="button" class="inline-action-btn ${u?"secondary":""}" @click=${g}>
        ${o(p)}
      </button>`,c={arranged:"Your chips were arranged for the layout.",layout:"The card now shows the chips of the layout.",kept:"Your own chips replace the chips of this layout."},d=[];return i&&i.reset===1?d.push(o("One own value was reset so the layout looks as intended.")):i&&i.reset>1&&d.push(o("{n} own values were reset so the layout looks as intended.",{n:i.reset})),i&&i.chips&&d.push(o(c[i.chips])),l`${d.length?l`<div class="info inline-action layout-reset">
            <span>${d.map((p,g)=>l`${g?l`<br />`:""}${p}`)}</span>
            <span class="inline-action-btns">
              ${s("Undo",this._undoLayoutSwitch)} ${i.chips?s("Change",this._askAboutChips,!0):""}
            </span>
          </div>`:""}
      ${i&&i.ask==="keep"?l`<div class="info inline-action layout-ask" data-step="keep">
            <span>${o("Keep your own chips? Without them the card shows the chips of the layout.")}</span>
            <span class="inline-action-btns">
              ${s("Keep",this._keepOwnChips)} ${s("Use the layout's chips",this._dropOwnChips,!0)}
            </span>
          </div>`:""}
      ${i&&i.ask==="arrange"?l`<div class="info inline-action layout-ask" data-step="arrange">
            <span
              >${o("Arrange them for the layout? Your chips join the chips of the layout and take the look of its chip row.")}</span
            >
            <span class="inline-action-btns">
              ${s("Arrange",this._arrangeOwnChips)} ${s("Keep positions",this._keepChipPositions,!0)}
            </span>
          </div>`:""}
      ${r?l`<div class="info inline-action layout-chips">
            <span>${o("Your own chips replace the chips of this layout.")}</span>
            ${s("Change",this._askAboutChips)}
          </div>`:""}`}_panel(e,t,i,a,r){return l`<ha-expansion-panel
      outlined
      data-panel=${e}
      .expanded=${this._openPanel===e}
      @expanded-changed=${this._onPanelExpandedChanged}
    >
      <div slot="header" class="panel-header">
        <ha-icon icon=${t}></ha-icon>
        <div class="panel-title">
          <span>${o(i)}</span>
          <span class="panel-sub">${o(a)}</span>
        </div>
      </div>
      ${r}
    </ha-expansion-panel>`}_precipitationSensors(){let e=this.hass&&this.hass.states||{},t=this._config&&this._config.precipitation_entity||"",i=this._precipCache;if(i&&i.states===e&&i.current===t)return i.list;let a=Object.keys(e).filter(r=>r.startsWith("sensor.")&&ia(e[r]&&e[r].attributes&&e[r].attributes.unit_of_measurement));return t&&!a.includes(t)&&a.push(t),this._precipCache={states:e,current:t,list:a},a}_ownSensors(e){let t=this.hass&&this.hass.states||{},i=this._config&&this._config[e]||"";this._ownSensorCache=this._ownSensorCache||{};let a=this._ownSensorCache[e];if(a&&a.states===t&&a.current===i)return a.list;let r=Vt[e],s=Object.keys(t).filter(c=>{if(!c.startsWith("sensor."))return!1;let d=t[c]&&t[c].attributes||{};return r(String(d.unit_of_measurement||"").trim(),d.device_class||"",t[c]&&t[c].state)});return i&&!s.includes(i)&&s.push(i),this._ownSensorCache[e]={states:t,current:i,list:s},s}_renderOwnSensors(){let e=["precipitation_entity",...Object.keys(Vt)],t=e.some(a=>this._config&&this._config[a]),i=(a,r)=>({name:a,selector:{entity:{domain:"sensor",include_entities:r}}});return l`<details class="disclosure own-sensors" ?open=${t}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        <ha-icon icon="mdi:weather-cloudy-arrow-right"></ha-icon>
        <span>${o("Your own sensors (optional)")}</span>
      </summary>
      <div class="disclosure-body">
        ${this._renderIntro("own_sensors","Each sensor replaces one value of the weather entity: rain sets the amount of rain and snow, wind moves the sky and the compass, temperature, humidity and dew point bring mist, cloud cover and visibility shape the clouds and the haze.","weather-data.html#your-own-sensors")}
        <div class="info">
          ${o("Empty fields and unavailable sensors use the weather entity. The weather itself (sunny, rain, storm) always comes from it.")}
        </div>
        ${this._renderForm(e.map(a=>i(a,a==="precipitation_entity"?this._precipitationSensors():this._ownSensors(a))))}
      </div>
    </details>`}_setColorMode(e){this._valueChanged({stopPropagation(){},detail:{value:{...this._formData,_color_mode:e}}})}_renderSunMoonPanel(){let e=this._formData.celestial_position||"fixed";return l`${this._renderIntro("sun_moon","The sun entity (sun.sun) decides between day and night and provides the elevation for twilight, blue hour and sun rays. With \u201CFixed\u201D the sun or moon stays where you put it.","appearance.html#sun--moon")}
      ${this._renderForm([{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"moon_phase_entity",selector:{entity:{domain:"sensor"}}}])}
      ${this._renderGroup("Position & size",l`<div class="settings-group">
            <div class="segmented" role="radiogroup">
              ${[{v:"fixed",l:"Fixed"},{v:"dynamic_sun",l:"Moving sun"},{v:"dynamic_both",l:"Moving sun & moon"}].map(t=>l`<button
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
          ${e==="fixed"||e==="dynamic_sun"?l`<div class="field-group">
                ${this._renderPositionGrid("celestial_alignment",de.celestial_alignment)}
                ${this._renderCelestialOffsetPicker()}
              </div>`:""}
          ${this._renderSlider("celestial_size",o(b.celestial_size),20,200,1)}`)}`}_renderCardPanel(){let e=this._formData,t=(e.card_style||"standalone")!=="standalone";return l`${this._section("style","mdi:card-outline","Style & size","With its own sky or as a header, height and padding",l`${this._renderIntro("appearance","In the \u201CImmersive\u201D style the card has no sky or background of its own and works as a dashboard header. Full width and edge fades are only available there.","appearance.html#appearance")}
          ${this._renderCardStyleSegmented()}
          ${this._renderToggleGroup([{key:"card_square",label:b.card_square},{key:"card_hide_text",label:b.card_hide_text}])}`)}
      ${this._section("colors","mdi:palette-outline","Colors","Light or dark look and color filters",l`<div class="settings-group">
            <div class="settings-group-label">${o("Color mode")}</div>
            <div class="segmented" role="radiogroup" aria-label=${o("Color mode")}>
              ${T.color_mode.map(i=>l`<button
                    type="button"
                    role="radio"
                    class=${e._color_mode===i.value?"active":""}
                    @click=${()=>this._setColorMode(i.value)}
                  >
                    ${o(i.short)}
                  </button>`)}
            </div>
            <div class="composite-helper">
              ${o((T.color_mode.find(i=>i.value===e._color_mode)||{}).label||"")}
            </div>
          </div>
          ${e._color_mode==="entity"?this._renderForm([{name:"theme_entity",selector:{entity:{}}}]):""}
          ${this._renderForm([{name:"card_filter_clouds",selector:{select:{mode:"dropdown",options:z(T.card_filter_clouds)}}},{name:"card_filter_sun",selector:{select:{mode:"dropdown",options:z(T.card_filter_sun)}}}])}`)}
      ${this._section("position","mdi:arrange-bring-forward","Position & layers",t?"Full width, edge fades, stacking and offset":"Stacking order and offset",l`${t?this._renderToggleGroup([{key:"card_full_width",label:b.card_full_width},{key:"card_mask_vertical",label:b.card_mask_vertical},{key:"card_mask_horizontal",label:b.card_mask_horizontal}]):""}
          ${this._renderSlider("card_stack_order",o(b.card_stack_order),-10,10,1,o(S.card_stack_order))}
          ${this._renderOffsetPicker()}`)}
      ${this._section("tap","mdi:gesture-tap","Tap action","What happens when the card is tapped",this._renderForm([{name:"card_tap_action",selector:{ui_action:{}}}]))}
      ${this._section("css","mdi:language-css3","Own CSS","Your own styles inside the card",l`${this._renderIntro("css","Works like card_mod, but built in: the styles go straight into the card. Use :host for the whole card, CSS variables such as --awc-bottom-font-size, or the parts like .chip and #chips-row.","appearance.html#own-css")}
          ${this._renderForm([{name:"css",selector:{text:{multiline:!0}}}])}`)}`}_renderSkyPanel(){let e=this._config||{},t=this._formData,i=be(e),a=p=>{let g=typeof e[p]=="number"?e[p]:parseFloat(e[p]);return Number.isFinite(g)?g:i[p]},r=a("perf_effects")<1,s=a("perf_fauna"),c=s>=1&&e.fauna_birds!==!1,d=s>=2&&e.fauna_planes!==!1;return l`${this._section("sun_moon","mdi:theme-light-dark","Sun & moon","Day and night, moon phase, position and size",this._renderSunMoonPanel())}
      ${this._section("light","mdi:weather-sunset-up","Light & clouds","Blue and golden hour, sun rays, haze, mist and frost",l`${r?l`<div class="info">
                ${o("Effect Quality is Off: sun rays, haze, ground mist and frost are not drawn. Blue hour, golden hour and cloud amount still work.")}
              </div>`:""}
          <div class="toggle-group">
            ${["effect_blue_hour","effect_golden_hour","effect_sun_rays","effect_haze","effect_ground_mist","effect_frost","effect_cloud_coverage"].map(p=>this._renderSwitch(p,!0))}
          </div>`)}
      ${this._section("wind","mdi:weather-windy","Wind","Wind lines, leaves and the compass",l`<div class="settings-group">
            <div class="settings-group-label">${o(b.wind_style)}</div>
            <div
              class="segmented"
              role="radiogroup"
              aria-label=${o(b.wind_style)}
            >
              ${[{v:"lines",l:"Wind lines"},{v:"flow",l:"Flow field"},{v:"leaves",l:"Leaves"},{v:"off",l:"Off"}].map(p=>l`<button
                    type="button"
                    role="radio"
                    class=${(e.wind_style||"lines")===p.v?"active":""}
                    data-field="wind_style"
                    data-value=${p.v}
                    @click=${this._onSegmentedFieldSelect}
                  >
                    ${o(p.l)}
                  </button>`)}
            </div>
            <div class="composite-helper">${o(S.wind_style)}</div>
          </div>
          ${e.wind_style==="leaves"?l`<div class="indent">
                ${this._renderSlider("leaf_density",o(b.leaf_density),.25,3,.25)}
              </div>`:""}
          ${this._renderForm([{name:"wind_compass",selector:{select:{mode:"dropdown",options:z(T.wind_compass)}}},...e.wind_compass&&e.wind_compass!=="off"?[{name:"wind_compass_position",selector:{select:{mode:"dropdown",options:z(T.wind_compass_position)}}}]:[]])}
          ${e.wind_compass&&e.wind_compass!=="off"?l`<div class="toggle-group indent">
                ${this._renderSwitch("wind_compass_cardinal",!0)}
                ${this._renderSwitch("wind_compass_degrees",!1)}
                ${this._renderSwitch("wind_compass_speed",!1)}
                ${e.wind_compass!=="pill"?this._renderSwitch("wind_compass_background",!1):""}
              </div>`:""}
          <div class="composite-helper">
            ${o("Wind direction chips can show the compass point too: open the chip under Chips, then Text \u25B8 Value \u25B8 Wind direction as.")}
          </div>`)}
      ${this._section("precip","mdi:weather-snowy-rainy","Rain & snow","How much falls, splashes and snow on the edge",l`${this._renderSlider("rain_density",o(b.rain_density),.25,3,.25,o(S.rain_density))}
          <div class="toggle-group">
            ${this._renderSwitch("effect_rain_splash",!0)}
          </div>
          ${this._renderSlider("snow_density",o(b.snow_density),.25,3,.25,o(S.snow_density))}
          <div class="toggle-group">
            ${this._renderSwitch("effect_snow_edge",!0)}
            ${this._renderSwitch("effect_spill",!1)}
          </div>`)}
      ${this._section("night","mdi:weather-night","Night sky","Stars, shooting stars and comets",l`${r?l`<div class="info">
                ${o("Effect Quality is Off, so there are no shooting stars or comets.")}
              </div>`:""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_shooting_stars",!0)}
          </div>
          ${t.effect_shooting_stars!==!1?l`<div class="indent">
                ${this._renderSlider("shooting_star_rate",o(b.shooting_star_rate),.25,3,.25)}
              </div>`:""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_comets",!0)}
          </div>
          ${t.effect_comets!==!1?l`<div class="indent">
                ${this._renderSlider("comet_rate",o(b.comet_rate),.25,3,.25,o(S.comet_rate))}
              </div>`:""}
          ${this._renderSlider("star_animation_speed",o(b.star_animation_speed),0,2,.1)}`)}
      ${this._section("fauna","mdi:bird","Birds & planes","How often they fly and how fast",l`<div class="sub-box">
            <label class="toggle-row sub-box-head">
              <span
                ><ha-icon icon="mdi:bird"></ha-icon> ${o("Birds")}</span
              >
              <ha-switch
                data-fauna="birds"
                .checked=${c}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${c?l`${this._renderSlider("fauna_bird_density",o("Frequency"),.5,2,.1)}
                ${this._renderSlider("bird_animation_speed",o("Speed"),0,3,.1,o(S.bird_animation_speed))}
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
                .checked=${d}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${d?l`${this._renderSlider("fauna_plane_density",o("Frequency"),.5,2,.1)}
                ${this._renderSlider("fauna_plane_speed",o("Speed"),.25,3,.05,o(S.fauna_plane_speed))}`:""}
          </div>`)}
`}_renderImagePanel(){let e=this._formData,t=u=>u&&String(u).trim().toLowerCase()!=="none"?u:"",i=u=>l`<div class="image-thumb">
        <div
          class="image-thumb-pic ${t(e[u])?"has":""}"
          style=${t(e[u])?`background-image:url("${ke(e[u])}")`:""}
        >
          ${t(e[u])?"":o("No image")}
        </div>
        ${this._renderClearableText(u)}
      </div>`,[a,r]=(e.image_alignment||"top-right").split("-"),s=a==="top"?"top":a==="bottom"?"bottom":"middle",c=(r||a)==="left"?"left":(r||a)==="right"?"right":"center",d=parseFloat(e.image_scale),p=Math.max(0,Math.min(200,Number.isFinite(d)?d:100)),g=t(e.image_day)||t(e.image_night)||(e.image_folder?It(e.image_folder,e.image_folder_type,"sunny",!1)[0]:"")||(Ve(this._config)?Ct("").image_day:"");return l`${this._renderIntro("image","Put your images in /config/www/ and enter them as /local/house-day.png. Transparent PNGs look best. Without a night image the day image is used.","images.html#custom-images")}
      ${String(e.card_layout||"").toLowerCase()==="home"&&!Ue(e)&&String(e.image_day||"").trim().toLowerCase()!=="none"?l`<div class="info">${o("Home shows the house that comes with the card, wet in the rain and snowy in the snow, until you enter your own picture. Enter none as the day image for no picture.")}</div>`:""}
      <div class="image-thumbs">
        ${i("image_day")} ${i("image_night")}
      </div>
      ${g?this._section("image_time","mdi:theme-light-dark","Day & night","When the night image shows, and the fade between images",l`${this._renderForm([{name:"image_night_source",selector:{select:{mode:"dropdown",options:z(T.image_night_source)}}}])}
              ${this._renderSlider("image_transition",o(b.image_transition),0,5,.1,o(S.image_transition))}`):""}
      ${g?this._section("image_place","mdi:image-move","Placement","Where the image sits and how big it is",l`<div class="image-place">
                ${this._renderPositionGrid("image_alignment",de.image_alignment)}
                <div class="image-preview" aria-hidden="true">
                  <div
                    class="image-preview-img v-${s} h-${c}"
                    style="height:${p}%;background-image:url(&quot;${ke(g)}&quot;)"
                  ></div>
                </div>
              </div>
              ${this._renderSlider("image_scale",o(b.image_scale),0,200,1,o(S.image_scale))}
              ${this._renderSlider("image_max_width",o(b.image_max_width),0,100,1,o(S.image_max_width))}
              ${this._renderImageOffsetPicker()}`):""}
      ${this._section("image_folder","mdi:folder-image","Pictures by weather","A folder with one picture per weather state",l`${this._renderIntro("image_folder","Name the pictures after the weather state: sunny, partlycloudy, cloudy, fog, rainy, pouring, lightning, lightning-rainy, snowy, snowy-rainy, hail, windy, clear-night, exceptional. Add -night for the night picture, like rainy-night. A missing picture falls back to a close one (pouring to rainy) and then to the images above. Every missing file shows once as a 404 in the browser console.","images.html#image-folder")}
          ${this._renderForm([{name:"image_folder",selector:{text:{}}},...e.image_folder?[{name:"image_folder_type",selector:{select:{mode:"dropdown",options:T.image_folder_type}}}]:[]])}`)}
      ${this._section("image_states","mdi:image-multiple-outline","Images by state","Other pictures for snow, rain or an open door",this._renderImageStatesPanel())}
`}_renderImageStatesPanel(){let t=this._formData.status_entity?this._renderGroup("Status entity",l`<div class="status-sentence">
              ${o("When this entity is on, open or home, the card shows other images:")}
            </div>
            ${this._renderForm(this._imageStatusSchema())}
            <div class="composite-helper">
              ${o("Checked before the list below.")}
            </div>`):"";return l`${this._renderIntro("image_states","Show another picture while an entity has a certain state, for example snow on the roof, a wet house in the rain or the open garage door. The first entry that matches wins; without a match the normal images stay.","images.html#image-conditions")}
      ${t}
      ${this._renderImageConditions()}`}_renderCardsPanel(){return l`${this._renderIntro("cards","Add any Home Assistant card, for example an entities or history card. The cards are shown on top of the sky. Grids and stacks work too.","appearance.html#embedded-cards")}
      ${this._renderPositionGrid("custom_cards_position",de.custom_cards_position)}
      ${this._renderCustomCardsEditor()}
      ${this._renderDisclosure("Advanced options",this._renderClearableText("custom_cards_css_class"))}`}_renderChipsPanel(){return this._formData.card_hide_text===!0?l`<div class="info inline-action">
        <span
          >${o("Chips are hidden by Hide all text under Card, Style & size. Your settings are kept.")}</span
        >
        <button
          type="button"
          class="inline-action-btn"
          data-field="card_hide_text"
          @click=${this._onClearFieldClick}
        >
          ${o("Show again")}
        </button>
      </div>`:l`${this._renderIntro("chips","A chip shows one value, for example the temperature, the wind or tomorrow's forecast. All chips share one area whose position and layout you set below. Single chips can be placed freely.","chips.html#chips-in-the-editor")}
      ${this._renderChipsEditor()}`}updated(){for(let e of this.renderRoot.querySelectorAll("[data-field]")){let t=this._fromLayout(e.dataset.field);e.classList.contains("from-layout")!==t&&e.classList.toggle("from-layout",t),t&&(e.title=e.title||o("From the layout"))}}render(){return!this.hass||!this._config?l``:(Ji(this.hass),l`${this._renderForm([{name:"weather_entity",selector:{entity:{domain:"weather"}}}])}
      ${this._renderOwnSensors()}
      ${this._panel("layouts","mdi:view-dashboard-outline","Layouts","A finished look with one tap",this._renderLayoutsPanel())}
      ${this._panel("card","mdi:card-outline","Card","Style, size, colors, position and tap action",this._renderCardPanel())}
      ${this._panel("chips","mdi:label-multiple-outline","Chips","Small info tiles with sensor values or the forecast",this._renderChipsPanel())}
      ${this._panel("sky","mdi:weather-partly-cloudy","Sky & weather","Sun and moon, light, wind, rain and snow, night sky, birds",this._renderSkyPanel())}
      ${this._panel("image","mdi:image-outline","Images","Your own picture for day and night, also by state",this._renderImagePanel())}
      ${this._panel("cards","mdi:card-multiple-outline","Embedded cards","Other Home Assistant cards inside this card",this._renderCardsPanel())}
      ${this._panel("performance","mdi:speedometer","Performance","Preset, frame rate, detail and speed",this._renderPerformancePanel())}`)}},Ya=Object.freeze({LABELS:b,HELPERS:S,CHIP_LABELS:Kt,CHIP_HELPERS:qe,OPT:T,FC_ATTRIBUTES:ce});customElements.get("atmo-weather-card-editor")||customElements.define("atmo-weather-card-editor",Ke);export{Ya as EDITOR_TEXT_TABLES};
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
