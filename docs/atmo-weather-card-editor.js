/* Atmo Weather Card 2026.11.1 */
var ae=globalThis,re=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),Ee=new WeakMap,V=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(re&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=Ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Ee.set(t,e))}return e}toString(){return this.cssText}},Ae=c=>new V(typeof c=="string"?c:c+"",void 0,ne),ce=(c,...e)=>{let t=c.length===1?c[0]:e.reduce((a,r,i)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+c[i+1],c[0]);return new V(t,c,ne)},Te=(c,e)=>{if(re)c.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),r=ae.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=t.cssText,c.appendChild(a)}},le=re?c=>c:c=>c instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return Ae(t)})(c):c;var{is:vt,defineProperty:bt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:wt,getOwnPropertySymbols:$t,getPrototypeOf:xt}=Object,ie=globalThis,ze=ie.trustedTypes,kt=ze?ze.emptyScript:"",Ct=ie.reactiveElementPolyfillSupport,W=(c,e)=>c,de={toAttribute(c,e){switch(e){case Boolean:c=c?kt:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,e){let t=c;switch(e){case Boolean:t=c!==null;break;case Number:t=c===null?null:Number(c);break;case Object:case Array:try{t=JSON.parse(c)}catch{t=null}}return t}},Le=(c,e)=>!vt(c,e),Pe={attribute:!0,type:String,converter:de,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),ie.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),r=this.getPropertyDescriptor(e,a,t);r!==void 0&&bt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,a){let{get:r,set:i}=yt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let h=r?.call(this);i?.call(this,o),this.requestUpdate(e,h,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pe}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let e=xt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let t=this.properties,a=[...wt(t),...$t(t)];for(let r of a)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,r]of t)this.elementProperties.set(a,r)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let r=this._$Eu(t,a);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let r of a)t.unshift(le(r))}else e!==void 0&&t.push(le(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,a);if(r!==void 0&&a.reflect===!0){let i=(a.converter?.toAttribute!==void 0?a.converter:de).toAttribute(t,a.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let a=this.constructor,r=a._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let i=a.getPropertyOptions(r),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:de;this._$Em=r;let h=o.fromAttribute(t,i.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(e,t,a,r=!1,i){if(e!==void 0){let o=this.constructor;if(r===!1&&(i=this[e]),a??=o.getPropertyOptions(e),!((a.hasChanged??Le)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:r,wrapped:i},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[r,i]of a){let{wrapped:o}=i,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,i,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[W("elementProperties")]=new Map,L[W("finalized")]=new Map,Ct?.({ReactiveElement:L}),(ie.reactiveElementVersions??=[]).push("2.1.2");var me=globalThis,Fe=c=>c,oe=me.trustedTypes,Oe=oe?oe.createPolicy("lit-html",{createHTML:c=>c}):void 0,He="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+F,St=`<${Ue}>`,N=document,K=()=>N.createComment(""),X=c=>c===null||typeof c!="object"&&typeof c!="function",ve=Array.isArray,Et=c=>ve(c)||typeof c?.[Symbol.iterator]=="function",pe=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,Ie=/>/g,M=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Re=/"/g,Be=/^(?:script|style|textarea|title)$/i,be=c=>(e,...t)=>({_$litType$:c,strings:e,values:t}),s=be(1),Vt=be(2),Wt=be(3),H=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Ne=new WeakMap,R=N.createTreeWalker(N,129);function qe(c,e){if(!ve(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oe!==void 0?Oe.createHTML(e):e}var At=(c,e)=>{let t=c.length-1,a=[],r,i=e===2?"<svg>":e===3?"<math>":"",o=Y;for(let h=0;h<t;h++){let d=c[h],u,g,p=-1,f=0;for(;f<d.length&&(o.lastIndex=f,g=o.exec(d),g!==null);)f=o.lastIndex,o===Y?g[1]==="!--"?o=De:g[1]!==void 0?o=Ie:g[2]!==void 0?(Be.test(g[2])&&(r=RegExp("</"+g[2],"g")),o=M):g[3]!==void 0&&(o=M):o===M?g[0]===">"?(o=r??Y,p=-1):g[1]===void 0?p=-2:(p=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?M:g[3]==='"'?Re:Me):o===Re||o===Me?o=M:o===De||o===Ie?o=Y:(o=M,r=void 0);let _=o===M&&c[h+1].startsWith("/>")?" ":"";i+=o===Y?d+St:p>=0?(a.push(u),d.slice(0,p)+He+d.slice(p)+F+_):d+F+(p===-2?h:_)}return[qe(c,i+(c[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},J=class c{constructor({strings:e,_$litType$:t},a){let r;this.parts=[];let i=0,o=0,h=e.length-1,d=this.parts,[u,g]=At(e,t);if(this.el=c.createElement(u,a),R.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=R.nextNode())!==null&&d.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(He)){let f=g[o++],_=r.getAttribute(p).split(F),k=/([.?@])?(.*)/.exec(f);d.push({type:1,index:i,name:k[2],strings:_,ctor:k[1]==="."?ue:k[1]==="?"?_e:k[1]==="@"?ge:G}),r.removeAttribute(p)}else p.startsWith(F)&&(d.push({type:6,index:i}),r.removeAttribute(p));if(Be.test(r.tagName)){let p=r.textContent.split(F),f=p.length-1;if(f>0){r.textContent=oe?oe.emptyScript:"";for(let _=0;_<f;_++)r.append(p[_],K()),R.nextNode(),d.push({type:2,index:++i});r.append(p[f],K())}}}else if(r.nodeType===8)if(r.data===Ue)d.push({type:2,index:i});else{let p=-1;for(;(p=r.data.indexOf(F,p+1))!==-1;)d.push({type:7,index:i}),p+=F.length-1}i++}}static createElement(e,t){let a=N.createElement("template");return a.innerHTML=e,a}};function j(c,e,t=c,a){if(e===H)return e;let r=a!==void 0?t._$Co?.[a]:t._$Cl,i=X(e)?void 0:e._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(c),r._$AT(c,t,a)),a!==void 0?(t._$Co??=[])[a]=r:t._$Cl=r),r!==void 0&&(e=j(c,r._$AS(c,e.values),r,a)),e}var he=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,r=(e?.creationScope??N).importNode(t,!0);R.currentNode=r;let i=R.nextNode(),o=0,h=0,d=a[0];for(;d!==void 0;){if(o===d.index){let u;d.type===2?u=new Z(i,i.nextSibling,this,e):d.type===1?u=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(u=new fe(i,this,e)),this._$AV.push(u),d=a[++h]}o!==d?.index&&(i=R.nextNode(),o++)}return R.currentNode=N,r}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},Z=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,r){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),X(e)?e===C||e==null||e===""?(this._$AH!==C&&this._$AR(),this._$AH=C):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==C&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,r=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=J.createElement(qe(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(t);else{let i=new he(r,this),o=i.u(this.options);i.p(t),this.T(o),this._$AH=i}}_$AC(e){let t=Ne.get(e.strings);return t===void 0&&Ne.set(e.strings,t=new J(e)),t}k(e){ve(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,r=0;for(let i of e)r===t.length?t.push(a=new c(this.O(K()),this.O(K()),this,this.options)):a=t[r],a._$AI(i),r++;r<t.length&&(this._$AR(a&&a._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Fe(e).nextSibling;Fe(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,r,i){this.type=1,this._$AH=C,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=C}_$AI(e,t=this,a,r){let i=this.strings,o=!1;if(i===void 0)e=j(this,e,t,0),o=!X(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{let h=e,d,u;for(e=i[0],d=0;d<i.length-1;d++)u=j(this,h[a+d],t,d),u===H&&(u=this._$AH[d]),o||=!X(u)||u!==this._$AH[d],u===C?e=C:e!==C&&(e+=(u??"")+i[d+1]),this._$AH[d]=u}o&&!r&&this.j(e)}j(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ue=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===C?void 0:e}},_e=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==C)}},ge=class extends G{constructor(e,t,a,r,i){super(e,t,a,r,i),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??C)===H)return;let a=this._$AH,r=e===C&&a!==C||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==C&&(a===C||r);r&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},fe=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}};var Tt=me.litHtmlPolyfillSupport;Tt?.(J,Z),(me.litHtmlVersions??=[]).push("3.3.3");var je=(c,e,t)=>{let a=t?.renderBefore??e,r=a._$litPart$;if(r===void 0){let i=t?.renderBefore??null;a._$litPart$=r=new Z(e.insertBefore(K(),i),i,void 0,t??{})}return r._$AI(c),r};var ye=globalThis,O=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=je(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};O._$litElement$=!0,O.finalized=!0,ye.litElementHydrateSupport?.({LitElement:O});var zt=ye.litElementPolyfillSupport;zt?.({LitElement:O});(ye.litElementVersions??=[]).push("4.2.2");var we=Object.freeze({card_style:"standalone",card_color_mode:"auto",card_filter_clouds:"none",card_filter_sun:"none",image_alignment:"top-right",card_background_style:"frosted",chip_area_layout:"wrap",chip_style:"inline",chip_area_align:"start",perf_mode:"default",fauna_birds_at_night:!0,wind_style:"lines"}),Pt=Object.freeze(["card_color_mode","card_background_style","image_alignment","chip_area_position","chip_style","custom_cards_position","custom_cards_css_class","wind_style"]);function Lt(c,e,t){c[e]!==void 0&&c[t]===void 0&&(c[t]=c[e]),delete c[e]}function Ge(c){let e={...c},t=String(e.card_color_mode??"").trim().toLowerCase();t==="force_dark"?e.card_color_mode="dark":t==="force_light"?e.card_color_mode="light":t==="entity"&&delete e.card_color_mode,e.card_filter!==void 0&&(e.card_filter_clouds===void 0&&(e.card_filter_clouds=e.card_filter),e.card_filter_sun===void 0&&(e.card_filter_sun=e.card_filter),delete e.card_filter),delete e.celestial_moon_style,e.chip_area_layout==="scroll"&&(e.chip_area_layout="horizontal-scroll"),Array.isArray(e.chips)&&(e.chips=e.chips.map(a=>{if(!a||typeof a!="object")return a;let r={...a};return r.overflow==="marquee"&&r.label_overflow===void 0&&(r.label_overflow="marquee"),Lt(r,"card_tap_action","tap_action"),r.forecast_show_min&&r.forecast&&r.attribute==="temperature"&&(r.sub_value_attribute||(r.sub_value_attribute="templow"),r.forecast_low_position!=="below"&&(r.sub_value_position="beside")),delete r.forecast_show_min,delete r.forecast_low_position,r}));for(let a of Pt)a in e&&typeof e[a]!="string"&&delete e[a];return e}var v=Object.freeze({weather_entity:"Weather Entity",sun_entity:"Sun Entity",moon_phase_entity:"Moon Phase Entity",theme_entity:"Theme Entity",_color_mode:"Color Mode",card_style:"Card Style",card_square:"Square Mode",card_height:"Card Height",card_padding:"Card Padding",card_offset:"Card Offset",card_stack_order:"Layer Order",card_tap_action:"Tap Action",card_filter_clouds:"Cloud Filter",card_filter_sun:"Sun Filter",card_full_width:"Full Width",card_mask_vertical:"Fade Top & Bottom Edges",card_mask_horizontal:"Fade Left & Right Edges",card_hide_text:"Hide All Text",card_background_style:"Background Style",celestial_size:"Size (px)",celestial_position:"Position Mode",celestial_alignment:"Alignment",celestial_x:"X Offset",celestial_y:"Y Offset",image_day:"Day Image URL",image_night:"Night Image URL",image_scale:"Image Scale (%)",image_alignment:"Image Position",image_x:"Horizontal Offset",image_y:"Vertical Offset",status_entity:"Status Entity",status_day:"Status Image (Day)",status_night:"Status Image (Night)",chip_area_hide:"Disable Chips",chip_area_position:"Position",chip_text_size:"Value text size",chip_label_size:"Label text size",chip_area_layout:"Layout",chip_style:"Chip style",chip_area_columns:"Columns",chip_area_scroll_count:"Show at once",chip_area_align:"Align content",chip_area_width:"Width",chip_area_height:"Height",chip_area_full_width:"Full width chips",chip_padding:"Chip padding",chip_area_padding:"Container padding",chip_area_gap:"Chips gap",chip_gap:"Icon/text gap",chip_text_gap:"Label/value gap",chip_icon_size:"Icon size",chip_area_background:"Background",chip_area_grouped:"One shared background",chip_area_separator:"Divider between chips",chip_icon_background:"Icon background",chip_icon_padding:"Padding around icon",custom_cards_position:"Embedded Cards Position",custom_cards_css_class:"Embedded Cards CSS Class",chip_area_background_color:"Container Background Color",perf_mode:"Performance Preset",perf_fps:"Frame Rate",perf_cloud_quality:"Cloud Detail",perf_effects:"Effect Quality",perf_fauna:"Fauna",perf_dpr:"Sharpness",animation_speed:"Animation Speed",bird_animation_speed:"Bird Animation Speed",star_animation_speed:"Star Twinkle Speed",fauna_birds_at_night:"Birds At Night",wind_style:"Wind Display"}),U=Object.freeze({weather_entity:"",sun_entity:"Used for the day/night cycle.",moon_phase_entity:"Your moon phase sensor.",theme_entity:"An entity whose state switches between light and dark mode.",card_height:"In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.",card_padding:"Inner padding, e.g. 16px or 12px 20px.",card_offset:"",card_stack_order:"",card_tap_action:"What happens when the card is tapped.",card_full_width:"Removes side margins so the card fills edge to edge.",card_mask_vertical:"Adds a soft fade to the top and bottom edges.",card_mask_horizontal:"Adds a soft fade to the left and right edges.",card_hide_text:"Hides all text overlays in one toggle.",card_filter_clouds:"A color filter applied to clouds.",card_filter_sun:"A color filter applied to the sun.",celestial_x:"Horizontal offset from the alignment edge, in pixels.",celestial_y:"Vertical offset from the alignment edge, in pixels.",celestial_position:"",image_night:"Shown at night. Falls back to the day image if left empty.",image_scale:"Image height as a percentage of the card height.",image_alignment:"",image_x:"Fine-tune horizontal position. Pixels or CSS, e.g. -20 or 10%.",image_y:"Fine-tune vertical position. Pixels or CSS, e.g. 10 or -5%.",status_entity:"Shows a different image when this entity is active, open, or home.",status_day:"Day image shown while the status entity is active.",status_night:"Night image shown while the status entity is active.",chip_area_columns:"Number of equal-width columns in grid layout.",chip_area_align:"Horizontal alignment of chips within the container.",card_background_style:"Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.",custom_cards_css_class:"Adds a CSS class to the embedded cards container (useful with card_mod).",perf_mode:"Choose a preset or fine-tune each setting below.",animation_speed:"Global animation speed multiplier for all motion.",bird_animation_speed:"Bird-only speed multiplier applied on top of animation speed.",star_animation_speed:"Twinkle speed multiplier for night stars.",fauna_birds_at_night:"Disable this to let birds fly only during daytime.",wind_style:"Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h."}),Ft=Object.freeze({entity:"Entity",attribute:"Attribute",name:"Label",name_sensor:"Label Entity",name_attribute:"Label Attribute",sub_value_entity:"Sub Value Entity",sub_value_attribute:"Sub Value Attribute",gauge_entity:"Value Entity",gauge_attribute:"Value Attribute",width:"Width",overflow:"Value overflow",label_overflow:"Label overflow",sub_value_overflow:"Sub value overflow",marquee_speed:"Scroll speed",marquee_rtl:"Right-to-left",icon:"Icon",icon_path:"Icon folder",tap_action:"Tap Action",unit_format:"Custom unit",text_size:"Value text size",label_size:"Label text size",inner_gap:"Icon/text gap",text_gap:"Label/value gap",padding:"Chip padding"}),Ot=Object.freeze({name_sensor:"Use a sensor value as the label instead.",width:"e.g. 200px or 60%. Constrains the chip width.",label_overflow:"How label text behaves when it is too long.",icon:"MDI icon, or type 'weather' for a dynamic icon.",icon_path:"e.g. /local/weather-icons/",forecast_offset:"0 = today/now, 1 = tomorrow/next hour, etc."}),Dt=Object.freeze(["type","name","entity","weather_entity","sun_entity","moon_phase_entity","color_mode","card_color_mode","theme_entity","card_style","card_height","card_padding","card_square","celestial_size","celestial_position","celestial_alignment","celestial_x","celestial_y","image_day","image_night","image_scale","image_alignment","status_entity","status_day","status_night","chip_area_position","card_hide_text","chip_area_hide","chip_text_size","chip_label_size","chip_area_layout","chip_area_columns","chip_area_scroll_count","chip_area_align","chip_area_width","chip_area_height","chip_area_full_width","chip_padding","chip_area_padding","chip_area_gap","chip_gap","chip_text_gap","chip_icon_size","chip_style","chip_area_background","chip_area_grouped","chip_area_separator","chip_background_color","chip_icon_background_color","chip_area_background_color","card_background_style","card_tap_action","hold_action","double_tap_action","card_offset","card_full_width","card_mask_vertical","card_mask_horizontal","card_stack_order","card_filter_clouds","card_filter_sun","chip_icon_background","custom_cards_position","custom_cards_css_class","perf_mode","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night","wind_style","chips","custom_cards"]),Ve=Object.freeze(["style","align","background","icon_background","background_color","icon_background_color","padding","text_size","label_size","inner_gap","text_gap","icon_size","icon_padding","width","height","value_weight","label_weight","chip_round","sub_value_size","sub_value_weight"]),It=Object.freeze(["card_stack_order","celestial_size","celestial_x","celestial_y","image_scale","chip_area_columns","chip_area_scroll_count","perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size"]),Mt=Object.freeze(["card_square","card_hide_text","chip_area_hide","chip_area_full_width","chip_area_background","chip_area_grouped","chip_area_separator","card_full_width","card_mask_vertical","card_mask_horizontal","chip_icon_background","fauna_birds_at_night"]),Rt=Object.freeze(["forecast_offset","forecast_precision","value_precision","marquee_speed","ring_min","ring_max","ring_width","ring_gap","bar_min","bar_max","bar_height","bar_gap"]),Nt=Object.freeze(["hide_icon","hide_label","hide_value","hide_sub_value","marquee_rtl","background","icon_background","fancy_unit","chip_round","behind_effects"]),Ht=Object.freeze(["width","height"]),D=Object.freeze({color_mode:[{value:"ha_theme",label:"Follow my Home Assistant theme"},{value:"entity",label:"Follow another entity (e.g. the sun)"},{value:"force_light",label:"Force light mode"},{value:"force_dark",label:"Force dark mode"}],card_filter_clouds:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],card_filter_sun:[{value:"none",label:"None"},{value:"darken",label:"Darken"},{value:"vivid",label:"Vivid"},{value:"muted",label:"Muted"},{value:"warm",label:"Warm"}],chip_overflow:[{value:"ellipsis",label:"Ellipsis (\u2026)"},{value:"marquee",label:"Scrolling text"},{value:"clip",label:"Clip"},{value:"wrap",label:"Wrap"}],chip_area_layout:[{value:"wrap",label:"Wrap"},{value:"grid",label:"Grid"},{value:"horizontal-scroll",label:"Scroll X"},{value:"vertical-scroll",label:"Scroll Y"}],chip_area_align:[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}]}),se=Object.freeze([{value:"condition",label:"Condition"},{value:"temperature",label:"Temperature (high)"},{value:"templow",label:"Temperature (low)"},{value:"precipitation_probability",label:"Rain probability"},{value:"precipitation",label:"Precipitation"},{value:"humidity",label:"Humidity"},{value:"wind_speed",label:"Wind speed"},{value:"wind_bearing",label:"Wind bearing"},{value:"pressure",label:"Pressure"},{value:"cloud_coverage",label:"Cloud coverage"},{value:"uv_index",label:"UV index"}]),Q=Object.freeze({image_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},custom_cards_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]],valueMap:{left:"center-left",right:"center-right"}},celestial_alignment:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]},chip_area_position:{cells:[["top-left","top-center","top-right"],["left","center","right"],["bottom-left","bottom-center","bottom-right"]]}}),Ut=Object.freeze(Object.fromEntries(Object.entries(Q).map(([c,e])=>{let t=e.valueMap||{},a=Object.fromEntries(Object.entries(t).map(([r,i])=>[i,r]));return[c,Object.freeze({...e,valueMap:t,reverseMap:a,cellsFlat:e.cells.flat(),disabledSet:new Set(e.disabled||[])})]}))),z=Object.freeze({TRUE_DELETE:"true-delete",FALSE_DELETE:"false-delete",TRUE_FALSE_IF_DEFINED:"true-false-if-defined"}),P=Object.freeze({SET_OR_DELETE_EMPTY:"set-or-delete-empty",TOGGLE_DELETE_IF_SAME:"toggle-delete-if-same",BESIDE_OR_DELETE:"beside-or-delete",SOLID_OR_DELETE:"solid-or-delete"}),$e=class extends O{static get properties(){return{_config:{type:Object,state:!0},_colorModeState:{type:String,state:!0},_expandedCard:{type:Number,state:!0},_expandedChip:{type:Number,state:!0},_openPanel:{type:String,state:!0},_cardHeightError:{type:String,state:!0}}}set hass(e){let t=this._hass;this._hass=e,!t&&e?this.requestUpdate():t&&e&&(this._hassThrottle||(this._hassThrottle=!0,this._hassThrottleTimer=setTimeout(()=>{this._hassThrottle=!1,this._hassThrottleTimer=null,this.requestUpdate()},2e3)))}get hass(){return this._hass}disconnectedCallback(){super.disconnectedCallback(),this._hassThrottleTimer&&(clearTimeout(this._hassThrottleTimer),this._hassThrottleTimer=null)}static get styles(){return ce`
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
        --awc-e-field-fill: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
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
            rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05),
            rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05)
          ),
          var(--secondary-background-color);
      }
      .composite,
      .grid-picker {
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.16);
        border-radius: var(--awc-e-r-inline);
        cursor: pointer;
        padding: 0;
        transition: background var(--awc-e-t);
        &:hover:not(.disabled):not(.active) {
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.28);
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
            rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.16) 0 6px,
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05);
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
              background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.03);
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
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
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
            rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
        }
        & > span {
          font-size: var(--awc-e-f-body);
          color: var(--primary-text-color);
        }
        & ha-switch {
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          --ha-switch-background-color: rgba(
            var(--rgb-primary-text-color, 0, 0, 0),
            0.12
          );
          --ha-switch-thumb-background-color: rgba(
            var(--rgb-primary-text-color, 0, 0, 0),
            0.35
          );
          --ha-switch-border-color: transparent;
          --ha-switch-thumb-border-color: transparent;
          --ha-switch-checked-border-color: transparent;
          --ha-switch-checked-thumb-border-color: transparent;
          --ha-switch-checked-background-color: var(--primary-color);
          --ha-switch-checked-thumb-background-color: var(
            --text-primary-color,
            #fff
          );
          --switch-unchecked-track-color: rgba(
            var(--rgb-primary-text-color, 0, 0, 0),
            0.12
          );
          --switch-unchecked-button-color: rgba(
            var(--rgb-primary-text-color, 0, 0, 0),
            0.35
          );
          --switch-checked-track-color: var(--primary-color);
          --switch-checked-button-color: var(--text-primary-color, #fff);
        }
      }
      /* ── Section boxes ── */
      .section-box {
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
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
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
            color: var(--primary-text-color);
          }
          &:hover:not(.active) {
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.16);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
        color: var(--primary-text-color);
        transition: background var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.16);
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
        border: 1.5px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.12);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.1);
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
          border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.18);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05);
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
        border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.03);
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
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
        }
      }
      .chip-accordion-body {
        padding: var(--awc-e-s3);
        border-top: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
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
          background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
          padding: 0 4px;
          border-radius: 3px;
        }
      }
      .chip-nudge.warning {
        background: rgba(var(--rgb-warning-color, 255, 152, 0), 0.1);
        border: 1px solid rgba(var(--rgb-warning-color, 255, 152, 0), 0.25);
      }
      .chip-nudge.info {
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.04);
        border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.09);
      }
      /* ── Chip color picker ── */
      .chip-color-box {
        margin-top: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.1);
        border-radius: var(--awc-e-r-ctrl);
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.03);
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
        border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.18);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05);
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
          rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.18)
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
          border: 1px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.18);
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
        border: 1.5px solid rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.15);
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
            rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
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
        background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.07);
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
    `}setConfig(e){e=Ge(e);let t={...e};this._normalizeConfigTypes(t);let a=!1;if(!t.weather_entity&&this.hass&&this.hass.states){let r=Object.keys(this.hass.states).find(i=>i.startsWith("weather."));r&&(t.weather_entity=r,a=!0)}!t.sun_entity&&this.hass&&this.hass.states&&this.hass.states["sun.sun"]&&(t.sun_entity="sun.sun",a=!0),this._config=this._cleanConfig(t),t.card_color_mode==="light"?this._colorModeState="force_light":t.card_color_mode==="dark"?this._colorModeState="force_dark":t.theme_entity?this._colorModeState="entity":this._colorModeState="ha_theme",a&&Promise.resolve().then(()=>this._emit())}get _formData(){if(this._cachedFormData&&this._cachedFormConfig===this._config&&this._cachedFormColorMode===this._colorModeState)return this._cachedFormData;let e={...we,...this._config||{}};return e._color_mode=this._colorModeState||(e.card_color_mode==="light"?"force_light":e.card_color_mode==="dark"?"force_dark":e.theme_entity?"entity":"ha_theme"),this._cachedFormData=e,this._cachedFormConfig=this._config,this._cachedFormColorMode=this._colorModeState,e}_colorModeSchema(){let e=this._formData,t=e._color_mode==="entity";return[{name:"_color_mode",selector:{select:{mode:"dropdown",options:D.color_mode}}},...t?[{name:"theme_entity",selector:{entity:{}}}]:[]]}_renderToggleGroup(e){return s`<div class="toggle-group">
      ${e.map(t=>s`<label class="toggle-row">
            <span>${t.label}</span>
            <ha-switch
              data-key=${t.key}
              .checked=${this._formData[t.key]===!0}
              @change=${this._onToggleGroupChange}
            ></ha-switch
          ></label> `)}
    </div>`}_onToggleGroupChange(e){let t=e.target&&e.target.dataset&&e.target.dataset.key;t&&this._updateField(t,e.target.checked===!0)}_getChips(){let e=(this._config||{}).chips;return!Array.isArray(e)||e.length===0?[]:e.every(t=>t&&typeof t=="object")?e:e.map(t=>t&&typeof t=="object"?t:{})}_getCustomCards(){let e=this._config&&this._config.custom_cards;return Array.isArray(e)?e:[]}_imageStatusSchema(){let e=this._formData,t=!!e.status_entity;return[{name:"status_entity",selector:{entity:{}}},...t?[{type:"grid",name:"",schema:[{name:"status_day",selector:{text:{}}},{name:"status_night",selector:{text:{}}}]}]:[]]}_computeLabel=e=>!e||!e.name?"":v[e.name]||e.name;_computeHelper=e=>{if(!(!e||!e.name))return U[e.name]||void 0};_isValidCardHeight(e){if(e==null)return!0;let t=String(e).trim();return!t||t.toLowerCase()==="auto"||/^-?\d+(?:\.\d+)?$/.test(t)?!0:/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)}_normalizeCardHeight(e){if(e==null)return e;let t=String(e).trim();if(!t)return"";if(t.toLowerCase()==="auto")return"auto";if(/^-?\d+(?:\.\d+)?$/.test(t)){let a=Number(t);return Number.isFinite(a)?a:""}return/^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(t)?t:this._config&&this._config.card_height?this._config.card_height:""}_normalizeCssSizeValue(e){if(e==null)return e;if(typeof e=="number"&&Number.isFinite(e))return`${e}px`;let t=String(e).trim();if(!t)return"";let a=t.match(/^-?\d+(?:\.\d+)?/);return a?`${a[0]}px`:""}_coerceNumberLike(e){if(typeof e!="string")return e;let t=e.trim();if(!/^-?\d+(?:\.\d+)?$/.test(t))return e;let a=Number(t);return Number.isFinite(a)?a:e}_coerceBooleanLike(e){if(typeof e=="boolean"||typeof e!="string")return e;let t=e.trim().toLowerCase();return t==="true"?!0:t==="false"?!1:e}_normalizeChipTypes(e){if(!e||typeof e!="object"||Array.isArray(e))return e;let t={...e};for(let a of Rt)a in t&&(t[a]=this._coerceNumberLike(t[a]));for(let a of Ht)a in t&&(t[a]=this._normalizeCssSizeValue(t[a]));for(let a of Nt)a in t&&(t[a]=this._coerceBooleanLike(t[a]));for(let a of["ring_thresholds","bar_thresholds"])Array.isArray(t[a])&&(t[a]=t[a].map(r=>{if(!r||typeof r!="object"||Array.isArray(r))return r;let i={...r};return"value"in i&&(i.value=this._coerceNumberLike(i.value)),i}));return t}_normalizeConfigTypes(e){if(!e||typeof e!="object")return e;for(let t of It)t in e&&(e[t]=this._coerceNumberLike(e[t]));for(let t of Mt)t in e&&(e[t]=this._coerceBooleanLike(e[t]));return"card_height"in e&&(e.card_height=this._normalizeCardHeight(e.card_height)),Array.isArray(e.chips)&&(e.chips=e.chips.map(t=>this._normalizeChipTypes(t))),e}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let t=this._config,a={...e.detail&&e.detail.value||{}},r=[];if(Object.prototype.hasOwnProperty.call(a,"card_height")&&(this._cardHeightError=this._isValidCardHeight(a.card_height)?"":"Invalid height. Use auto, 160, 160px, 40vh, or 80%.",a.card_height=this._normalizeCardHeight(a.card_height)),a._color_mode!==void 0)switch(this._colorModeState=a._color_mode,a._color_mode){case"ha_theme":r.push("theme_entity","card_color_mode");break;case"entity":r.push("card_color_mode"),a.theme_entity||(a.theme_entity=a.sun_entity||(this.hass&&this.hass.states&&this.hass.states["sun.sun"]?"sun.sun":""));break;case"force_light":r.push("theme_entity"),a.card_color_mode="light";break;case"force_dark":r.push("theme_entity"),a.card_color_mode="dark";break}delete a._color_mode,a.status_entity&&!t.status_entity&&(!a.status_day&&a.image_day&&(a.status_day=a.image_day),!a.status_night&&a.image_night&&(a.status_night=a.image_night)),a.card_square===!0&&t.card_square!==!0&&r.push("card_height"),this._patch(a,{replace:!0,strip:r})}_patch(e,t){let a=t||{},i={...a.replace?{}:{...this._config||{}},...e};if(Array.isArray(a.strip))for(let o of a.strip)delete i[o];this._config=this._cleanConfig(i),this._emit()}_computeInactiveKeys(e){let t=new Set;(e.card_color_mode==="light"||e.card_color_mode==="dark")&&t.add("theme_entity");let a=e.chip_area_layout||"wrap";return a!=="grid"&&t.add("chip_area_columns"),a!=="horizontal-scroll"&&a!=="vertical-scroll"&&t.add("chip_area_scroll_count"),a==="horizontal-scroll"||a==="vertical-scroll"||(t.add("chip_area_height"),t.add("chip_area_full_width")),e.chip_area_grouped||t.add("chip_area_separator"),t}_cleanConfig(e){let t={...e};this._normalizeConfigTypes(t);for(let i of Object.keys(t)){let o=t[i];if(o===""||o===null||o===void 0){delete t[i];continue}if(Array.isArray(o)&&o.length===0){delete t[i];continue}typeof o=="object"&&!Array.isArray(o)&&Object.keys(o).length===0&&delete t[i]}for(let[i,o]of Object.entries(we))t[i]===o&&delete t[i];let a=this._computeInactiveKeys(t);for(let i of a)delete t[i];delete t._color_mode;let r={};for(let i of Dt)i!=="custom_cards"&&i in t&&(r[i]=t[i]);for(let i of Object.keys(t))i!=="custom_cards"&&(i in r||(r[i]=t[i]));return"custom_cards"in t&&(r.custom_cards=t.custom_cards),r}_emit(){let e={...this._config||{}};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_renderForm(e){return!e||e.length===0?"":s`<ha-form
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
            title="Clear"
            data-field=${e}
            @click=${this._onClearFieldClick}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`:""}
    </div>`}_onClearFieldClick(e){let t=this._ds(e,"field");t&&this._updateField(t,"")}_ds(e,t){return e.currentTarget&&e.currentTarget.dataset?e.currentTarget.dataset[t]:""}_renderDisclosure(e,t){let a=e==="Advanced options";return s`<details class="disclosure" @toggle=${this._onDisclosureToggle}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${a?s`<ha-icon icon="mdi:cog-outline"></ha-icon>`:""}
        <span>${e}</span>
      </summary>
      <div class="disclosure-body">${t}</div>
    </details>`}_onDisclosureToggle(e){let t=e.currentTarget;if(!t.open)return;let a=t.parentElement;a&&a.querySelectorAll(":scope > details.disclosure[open]").forEach(r=>{r!==t&&(r.open=!1)})}_renderPositionGrid(e,t){let a=Ut[e],{valueMap:r,reverseMap:i,cellsFlat:o,disabledSet:h}=a,d=this._formData[e]||"",u=i[d]||d,g=U[e],p=v[e]||e;return s`<div class="grid-picker">
      <div class="grid-picker-label">${p}</div>
      <div class="grid-3x3" role="radiogroup" aria-label=${p}>
        ${o.map(f=>{if(f===null)return s`<div class="grid-cell empty"></div>`;let _=h.has(f),k=r[f]||f;return s`<button
            type="button"
            role="radio"
            class="grid-cell ${u===f?"active":""} ${_?"disabled":""}"
            ?disabled=${_}
            data-field=${e}
            data-value=${k}
            title=${_?`${f} (not supported here)`:f}
            aria-label=${f}
            @click=${this._onPositionGridSelect}
          ></button>`})}
      </div>
      ${t.extras?s`<div class="grid-extras">
            ${t.extras.map(f=>s`<button
                  type="button"
                  class="grid-extra ${u===f.value?"active":""}"
                  aria-pressed=${u===f.value?"true":"false"}
                  data-field=${e}
                  data-value=${f.value}
                  @click=${this._onPositionGridSelect}
                >
                  ${f.label}
                </button>`)}
          </div>`:""}
      ${g?s`<div class="grid-helper">${g}</div>`:""}
    </div>`}_onPositionGridSelect(e){let t=e.currentTarget;if(!t||t.disabled)return;let a=t.dataset&&t.dataset.field,r=t.dataset&&t.dataset.value;!a||r===void 0||this._setField(a,r)}_setField(e,t){if((this._config||{})[e]===t){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_updateField(e,t){if(e==="card_height"&&(this._cardHeightError=this._isValidCardHeight(t)?"":"Invalid height. Use auto, 160, 160px, 40vh, or 80%.",t=this._normalizeCardHeight(t)),t==null||t===""){this._patch({},{strip:[e]});return}this._patch({[e]:t})}_setCardStyle(e){if(e==="standalone"){this._patch({card_style:e},{strip:["card_full_width","card_mask_vertical","card_mask_horizontal"]});return}this._patch({card_style:e})}_onPanelToggle(e,t){t?this._openPanel=e:this._openPanel===e&&(this._openPanel=null)}_onPanelExpandedChanged(e){let t=this._ds(e,"panel");t&&this._onPanelToggle(t,!!(e.detail&&e.detail.expanded))}_onTrimmedFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,(e.target.value||"").trim())}_onRawFieldChange(e){let t=this._ds(e,"field");t&&this._updateField(t,e.target.value||"")}_onOffsetPartChange(e){let t=this._ds(e,"offsetIndex"),a=Number(t);Number.isInteger(a)&&this._setOffsetPart(a,e.target.value)}_onSegmentedFieldSelect(e){let t=this._ds(e,"field");if(!t)return;let a=this._ds(e,"value"),r=this._ds(e,"valueType")||"string";if(r==="number"){let i=Number(a);if(!Number.isFinite(i))return;this._updateField(t,i);return}if(r==="boolean"){this._updateField(t,a==="true");return}if(r==="empty"){this._updateField(t,"");return}this._updateField(t,a)}_onChipAreaBackgroundModeSelect(e){let t=this._ds(e,"bgMode");if(t){if(t==="off"){this._updateField("chip_area_background",!1);return}this._updateField("chip_area_background",!0),this._updateField("card_background_style",t)}}_renderCardStyleSegmented(){let e=this._formData,t=e.card_square===!0,a=e.card_style||"standalone",r=[{value:"immersive",label:"Immersive"},{value:"standalone",label:"Standalone"}];return s`<div class="grid-picker">
      <div class="segmented" role="radiogroup" aria-label=${v.card_style}>
        ${r.map(i=>s`<button
              type="button"
              role="radio"
              data-value=${i.value}
              class=${a===i.value?"active":""}
              @click=${this._onCardStyleSelect}
            >
              ${i.label}
            </button>`)}
      </div>
      <div class="composite-helper">
        ${a==="immersive"?"The card uses no background at all.":"Background color based on the weather."}
      </div>
      <div class="compact-fields">
        ${t?"":this._renderCompactField("card_height","e.g. 220 or auto")}
        ${this._renderCompactField("card_padding","e.g. 16px")}
      </div>
    </div>`}_onCardStyleSelect(e){let t=this._ds(e,"value");t&&this._setCardStyle(t)}_renderCelestialOffsetPicker(){return s`<div class="composite">
      <div class="composite-label">Offset from edge</div>
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
      <div class="composite-label">Image Offset</div>
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
        Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.
      </div>
    </div>`}_renderOffsetPicker(){let e=this._parseOffset(this._formData.card_offset),t=["Top","Right","Bottom","Left"];return s`<div class="composite">
      <div class="composite-label">${v.card_offset}</div>
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
      ${U.card_offset?s`<div class="composite-helper">${U.card_offset}</div>`:""}
    </div>`}_renderCustomCardsEditor(){let e=this._getCustomCards();return s`${e.length===0?s`<div class="cards-empty">No cards yet.</div>`:e.map((t,a)=>this._renderCardRow(t,a,e.length))}
      <button type="button" class="add-card-btn" @click=${this._addBlankCard}>
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>Add card</span>
      </button>`}_renderListRow({idx:e,total:t,expanded:a,title:r,badge:i,onToggle:o,onMoveUp:h,onMoveDown:d,onRemove:u,onDuplicate:g,body:p}){return s`<div class="card-row ${a?"expanded":""}">
      <div class="card-row-head" @click=${o}>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${i||""}
        <span class="card-row-title">${r}</span>
        <div class="card-row-actions" @click=${this._onStopPropagation}>
          <button
            type="button"
            title="Move up"
            ?disabled=${e===0}
            @click=${h}
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button
            type="button"
            title="Move down"
            ?disabled=${e===t-1}
            @click=${d}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          ${g?s`<button
                type="button"
                title="Duplicate"
                @click=${g}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>`:""}
          <button type="button" title="Delete" @click=${u}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </div>
      ${a?s`<div class="card-row-body">${p}</div>`:""}
    </div>`}_onStopPropagation(e){e.stopPropagation()}_onCustomCardSizeChange(e){let t=Number(this._ds(e,"cardIdx")||NaN),a=this._ds(e,"cardKey");if(this._badIdx(t)||!a)return;let r=this._getCustomCards(),o={...r[t]&&typeof r[t]=="object"?r[t]:{}},h=(e.target.value||"").trim();h?o[a]=h:delete o[a],this._updateCardAt(t,o)}_onCustomCardFormValueChanged(e){e.stopPropagation();let t=Number(this._ds(e,"cardIdx")||NaN);this._badIdx(t)||this._updateCardAt(t,e.detail&&e.detail.value&&e.detail.value._card||{})}_renderCardRow(e,t,a){let r=this._expandedCard===t,i=e&&e.type?String(e.type).replace(/^custom:/,""):"card",o=s`<div class="card-size-row">
        <div class="offset-field">
          <span class="offset-field-label">Custom Width</span>
          <input
            type="text"
            placeholder="e.g. 140px or 60%"
            data-card-idx=${String(t)}
            data-card-key="custom_width"
            .value=${e.custom_width||""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
        <div class="offset-field">
          <span class="offset-field-label">Custom Height</span>
          <input
            type="text"
            placeholder="e.g. 110px"
            data-card-idx=${String(t)}
            data-card-key="custom_height"
            .value=${e.custom_height||""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{_card:e}}
        .schema=${[{name:"_card",selector:{object:{}}}]}
        data-card-idx=${String(t)}
        .computeLabel=${()=>""}
        @value-changed=${this._onCustomCardFormValueChanged}
      ></ha-form>`;return this._renderListRow({idx:t,total:a,expanded:r,title:i,body:o,onToggle:()=>this._toggleCardExpanded(t),onMoveUp:()=>this._moveCard(t,-1),onMoveDown:()=>this._moveCard(t,1),onRemove:()=>this._removeCard(t)})}_toggleCardExpanded(e){this._expandedCard=this._expandedCard===e?null:e}_moveCard(e,t){let a=this._getCustomCards(),r=e+t;r<0||r>=a.length||([a[e],a[r]]=[a[r],a[e]],this._expandedCard===e?this._expandedCard=r:this._expandedCard===r&&(this._expandedCard=e),this._updateField("custom_cards",a))}_removeCard(e){let t=this._getCustomCards();t.splice(e,1),this._expandedCard===e?this._expandedCard=null:typeof this._expandedCard=="number"&&this._expandedCard>e&&(this._expandedCard=this._expandedCard-1),this._updateField("custom_cards",t)}_updateCardAt(e,t){let a=this._getCustomCards();a[e]=t,this._updateField("custom_cards",a)}_addBlankCard=()=>{let e=[...this._getCustomCards(),{type:"entity",entity:"",custom_width:"100%"}];this._expandedCard=e.length-1,this._updateField("custom_cards",e)};_chipTitle(e){let t=(e&&e.name||"").toString().trim(),a=(e&&e.entity||"").toString().trim(),r=(e&&e.attribute||"").toString().trim();if(!a)return t?`${t} \u2014 (no entity)`:"(choose an entity)";let i=this.hass&&this.hass.states&&this.hass.states[a],h=i&&i.attributes&&i.attributes.friendly_name||a;if(e.forecast){let u=e.forecast==="hourly"?"Hourly":"Daily",g=parseInt(e.forecast_offset,10)||0,p=e.forecast==="hourly"?g===0?"now":`+${g}h`:g===0?"today":g===1?"tomorrow":`+${g}d`,_=`${h} \xB7 ${u} ${p} [${r||"condition"}]`;return t?`${t} \u2014 ${_}`:_}let d=r?`${h} [${r}]`:h;return t?`${t} \u2014 ${d}`:d}_cleanChip(e){let t={...e};t.entity||(delete t.attribute,delete t.forecast,delete t.forecast_offset),t.forecast||(delete t.forecast_offset,delete t.forecast_precision),t.forecast_offset===0&&delete t.forecast_offset,!t.sub_value_entity&&!t.sub_value_attribute&&(delete t.sub_value_format,delete t.sub_value_position,delete t.sub_value_size,delete t.sub_value_weight,delete t.hide_sub_value),t.type!=="ring"&&t.type!=="bar"&&(delete t.gauge_entity,delete t.gauge_attribute),t.type!=="ring"&&(delete t.ring_min,delete t.ring_max,delete t.ring_color,delete t.ring_width,delete t.ring_gap,delete t.ring_thresholds,delete t.ring_threshold_mode),t.type!=="bar"&&(delete t.bar_min,delete t.bar_max,delete t.bar_color,delete t.bar_height,delete t.bar_gap,delete t.bar_thresholds,delete t.bar_threshold_mode);for(let a of Object.keys(t)){let r=t[a];if(a==="unit_format"||a==="ring_min"||a==="bar_min"){r==null&&delete t[a];continue}a==="background"&&r===!1||a==="icon_background"&&r===!1||(r===""||r===null||r===void 0||r===!1)&&delete t[a]}return t}_updateChipAt(e,t){let a=this._getChips().map((r,i)=>i===e?this._cleanChip(t):r);this._commitChips(a)}_addChip=()=>{let t=[...this._getChips(),{}];this._expandedChip=t.length-1,this._commitChips(t)};_moveChip(e,t){let a=[...this._getChips()],r=e+t;r<0||r>=a.length||([a[e],a[r]]=[a[r],a[e]],this._expandedChip===e?this._expandedChip=r:this._expandedChip===r&&(this._expandedChip=e),this._commitChips(a))}_removeChip(e){let t=[...this._getChips()];t.splice(e,1),delete this[`_acc_open_${e}`],delete this[`_text_acc_${e}`];for(let a=e;a<t.length;a++)this[`_acc_open_${a}`]=this[`_acc_open_${a+1}`]||null,this[`_text_acc_${a}`]=this[`_text_acc_${a+1}`]||null;delete this[`_acc_open_${t.length}`],delete this[`_text_acc_${t.length}`],this._expandedChip===e?this._expandedChip=null:typeof this._expandedChip=="number"&&this._expandedChip>e&&(this._expandedChip=this._expandedChip-1),this._commitChips(t)}_duplicateChip(e){let t=[...this._getChips()];t.splice(e+1,0,{...t[e]}),this._expandedChip=e+1,this._commitChips(t)}_toggleChipExpanded(e){this._expandedChip=this._expandedChip===e?null:e}_getChipByIndex(e){let t=Number(e);if(this._badIdx(t))return null;let a=this._getChips();return a[t]&&typeof a[t]=="object"?a[t]:null}_badIdx(e){return!Number.isInteger(e)||e<0}_onChipAccordionToggle(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"accKey"),r=this._ds(e,"accKind")||"main";if(this._badIdx(t)||!a)return;let i=r==="text"?`_text_acc_${t}`:`_acc_open_${t}`;this[i]=this[i]===a?null:a,this.requestUpdate()}_onChipTypeModeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"mode");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);if(r){if(a==="sensor"){let i={...r};delete i.forecast,delete i.forecast_offset,delete i.forecast_precision,this._updateChipAt(t,i);return}if(a==="forecast"){let i=(r.entity||"").toString().trim(),o=this._config&&this._config.weather_entity||"",h=i&&i.startsWith("weather.")?i:o||i,d={...r,forecast:"daily",attribute:"temperature",forecast_offset:1};h&&(d.entity=h),this._updateChipAt(t,d)}}}_onChipForecastTypeSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"forecastType");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);r&&this._updateChipAt(t,{...r,forecast:a,forecast_offset:0})}_onChipAnchorSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"anchor");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);r&&this._updateChipAt(t,{...r,position_anchor:a})}_onChipToggleChange(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"key"),r=this._ds(e,"mode")||z.TRUE_DELETE;if(this._badIdx(t)||!a)return;let i=this._getChipByIndex(t);if(!i)return;let o={...i},h=e.target&&e.target.checked===!0;r===z.TRUE_DELETE?h?o[a]=!0:delete o[a]:r===z.FALSE_DELETE?h?delete o[a]:o[a]=!1:r===z.TRUE_FALSE_IF_DEFINED&&(h?o[a]=!0:i[a]!==void 0?o[a]=!1:delete o[a]),this._updateChipAt(t,o)}_onChipActionClick(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"action");if(this._badIdx(t)||!a)return;let r=this._getChipByIndex(t);if(!r)return;let i={...r};if(a==="remove-icon")delete i.icon;else if(a==="set-weather-icon")i.icon="weather";else if(a==="clear-icon-path")delete i.icon_path;else if(a==="reset-styles")for(let o of Ve)delete i[o];else return;this._updateChipAt(t,i)}_onChipSegmentedSelect(e){let t=Number(this._ds(e,"chipIdx")||NaN),a=this._ds(e,"key"),r=this._ds(e,"mode")||"set",i=this._ds(e,"valueType")||"string",o=this._ds(e,"value");if(this._badIdx(t)||!a)return;let h=this._getChipByIndex(t);if(!h)return;let d={...h},u=o;if(i==="number"){let g=Number(o);if(!Number.isFinite(g))return;u=g}else i==="boolean"&&(u=o==="true");r===P.SET_OR_DELETE_EMPTY?u===""?delete d[a]:d[a]=u:r===P.TOGGLE_DELETE_IF_SAME?h[a]===u?delete d[a]:d[a]=u:r===P.BESIDE_OR_DELETE?u==="beside"?d[a]="beside":delete d[a]:r===P.SOLID_OR_DELETE&&u==="solid"?delete d[a]:d[a]=u,this._updateChipAt(t,d)}_commitChips(e){if(!Array.isArray(e)||e.length===0){this._patch({},{strip:["chips"]});return}this._patch({chips:e})}_chipLabel=e=>!e||!e.name?"":Ft[e.name]||e.name;_chipHelper=e=>{if(!(!e||!e.name))return Ot[e.name]||void 0};_renderChipRow(e,t,a){let r=this._expandedChip===t,i=(e.position||"").toString().toLowerCase()==="custom",o=!!e.forecast,h=e.type||"",u=i?s`<span class="chip-badge-free"
          ><ha-icon icon="mdi:cursor-move"></ha-icon
        ></span>`:s`<span class="chip-badge-row"
          ><ha-icon icon="mdi:view-grid-outline"></ha-icon
        ></span>`;if(!r)return this._renderListRow({idx:t,total:a,expanded:r,body:"",badge:u,title:this._chipTitle(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)});let g=!!(e.entity||"").toString().trim(),p=(e.entity||"").toString().trim(),f=(e.name_sensor||"").toString().trim(),_=o&&p&&!p.startsWith("weather."),k=this[`_acc_open_${t}`]||null,b=n=>this._updateChipAt(t,n),E=n=>s`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${n}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${l=>{l.stopPropagation(),b(l.detail&&l.detail.value||{})}}
      ></ha-form>`,ee=(n,l,m)=>s`<ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${[{name:n,selector:m}]}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${y=>{y.stopPropagation();let x={...y.detail&&y.detail.value||{}};x[n]!==e[n]&&delete x[l],b(x)}}
      ></ha-form>`,S=(n,l,m)=>s`<div class="css-field">
        <span class="css-field-label">${l}</span>
        <input
          type="text"
          placeholder=${m}
          .value=${e[n]!==void 0?String(e[n]):""}
          @change=${y=>{let $=y.target.value,x={...e};n==="unit_format"||n==="sub_value_format"?x[n]=$:$.trim()?x[n]=$.trim():delete x[n],b(x)}}
        />
      </div>`,B=(n,l,m,y)=>{let $=k===n;return s`<div class="chip-accordion">
        <div
          class="chip-accordion-head ${$?"open":""}"
          data-chip-idx=${t}
          data-acc-kind="main"
          data-acc-key=${n}
          @click=${this._onChipAccordionToggle}
        >
          <ha-icon class="chip-accordion-icon" icon="${l}"></ha-icon>
          <span class="chip-accordion-title">${m}</span>
          <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        ${$?s`<div class="chip-accordion-body">${y}</div>`:""}
      </div>`},We=s`<div class="chip-type-picker">
      <button
        type="button"
        class="chip-type-btn ${o?"":"active"}"
        data-chip-idx=${t}
        data-mode="sensor"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${o?"":"active-icon"}"
          icon="mdi:gauge"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">Sensor</span
          ><span class="chip-type-desc">Live entity value</span>
        </div>
      </button>
      <button
        type="button"
        class="chip-type-btn ${o?"active":""}"
        data-chip-idx=${t}
        data-mode="forecast"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${o?"active-icon":""}"
          icon="mdi:calendar-clock"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">Forecast</span
          ><span class="chip-type-desc">Weather forecast</span>
        </div>
      </button>
    </div>`,Ye=o?E([{name:"entity",selector:{entity:{domain:"weather"}}}]):s`${ee("entity","attribute",{entity:{}})}
        ${p?E([{name:"attribute",selector:{attribute:{entity_id:p}}}]):""}`,Ke=g?"":s`<div class="chip-nudge info">
          <ha-icon
            icon="mdi:information-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          Pick an entity for this chip.
        </div>`,Xe=_?s`<div class="chip-nudge warning">
          <ha-icon
            icon="mdi:alert-circle-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          Forecast requires a weather entity.
        </div>`:"",xe=e.attribute||"condition",q=parseInt(e.forecast_offset,10)||0,Je=(e.icon||"").toString().trim().toLowerCase()==="weather",Ze=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>Hide icon</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_icon"
            data-mode=${z.TRUE_DELETE}
            .checked=${e.hide_icon===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_icon?"":s`${Je?s`<div class="weather-icon-active">
                  <ha-icon
                    icon="mdi:weather-partly-cloudy"
                    style="--mdc-icon-size:20px;color:var(--primary-color)"
                  ></ha-icon>
                  <div class="weather-icon-active-text">
                    <span>Weather icon</span>
                    <span class="weather-icon-active-sub"
                      >${o?"Matches forecast":"Matches weather"}</span
                    >
                  </div>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    data-chip-idx=${t}
                    data-action="remove-icon"
                    @click=${this._onChipActionClick}
                  >
                    Remove
                  </button>
                </div>`:s`<div class="icon-combo">
                  <ha-form
                    style="flex:1;min-width:0"
                    .hass=${this.hass}
                    .data=${{icon:e.icon||""}}
                    .schema=${[{name:"icon",selector:{icon:{}}}]}
                    .computeLabel=${()=>""}
                    @value-changed=${n=>{n.stopPropagation(),b({...e,icon:n.detail&&n.detail.value&&n.detail.value.icon||""})}}
                  ></ha-form>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    title="Use dynamic weather icon"
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
              ${E([{name:"icon_path",selector:{text:{}}}])}
              ${e.icon_path?s`<button
                    type="button"
                    class="clear-btn"
                    title="Clear"
                    data-chip-idx=${t}
                    data-action="clear-icon-path"
                    @click=${this._onChipActionClick}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>`:""}
            </div>
            <div class="css-field-row cols-2">
              ${S("icon_size","Size","auto")}
              ${S("icon_padding","Padding","auto")}
            </div>
            <div class="toggle-group">
              <label class="toggle-row">
                <span>Icon background</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="icon_background"
                  data-mode=${z.TRUE_FALSE_IF_DEFINED}
                  .checked=${e.icon_background===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${e.icon_background===!0?this._renderColorPicker("Icon background color",e.icon_background_color||"",(n,l)=>{let m={...e};n?m.icon_background_color=this._serializeColor(n,l):delete m.icon_background_color,b(m)}):""}`}`,Qe=(e.overflow||"").toLowerCase()==="marquee",et=(e.label_overflow||"").toLowerCase()==="marquee",tt=!!(e.sub_value_entity||e.sub_value_attribute),ke=(e.sub_value_entity||"").toString().trim(),at=this[`_text_acc_${t}`]||null,te=(n,l,m)=>{let y=at===n;return s`<div class="chip-accordion">
        <div
          class="chip-accordion-head ${y?"open":""}"
          data-chip-idx=${t}
          data-acc-kind="text"
          data-acc-key=${n}
          @click=${this._onChipAccordionToggle}
        >
          <span class="chip-accordion-title">${l}</span>
          <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        ${y?s`<div class="chip-accordion-body">${m}</div>`:""}
      </div>`},rt=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>Hide</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_label"
            data-mode=${z.TRUE_DELETE}
            .checked=${e.hide_label===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_label!==!0?s`${E([{name:"name",selector:{text:{}}}])}
            ${ee("name_sensor","name_attribute",{entity:{}})}
            ${f?E([{name:"name_attribute",selector:{attribute:{entity_id:f}}}]):o&&!e.name?s`<ha-form
                    .hass=${this.hass}
                    .data=${{name_attribute:e.name_attribute||""}}
                    .schema=${[{name:"name_attribute",selector:{select:{mode:"dropdown",options:se}}}]}
                    .computeLabel=${()=>"Forecast attribute"}
                    @value-changed=${n=>{n.stopPropagation();let l=n.detail&&n.detail.value&&n.detail.value.name_attribute,m={...e};l?m.name_attribute=l:delete m.name_attribute,b(m)}}
                  ></ha-form>`:""}
            <div class="css-field-row cols-2">
              ${S("label_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label="Weight"
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(n=>s`<button
                    type="button"
                    role="radio"
                    class=${(e.label_weight||"")===n.value?"active":""}
                    data-chip-idx=${t}
                    data-key="label_weight"
                    data-mode=${P.SET_OR_DELETE_EMPTY}
                    data-value=${n.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${n.label}
                  </button>`)}
            </div>
            ${E([{name:"label_overflow",selector:{select:{mode:"dropdown",options:D.chip_overflow}}}])}`:""}`,it=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>Hide</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_value"
            data-mode=${z.TRUE_DELETE}
            .checked=${e.hide_value===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        ${!e.hide_value&&!o&&this.hass&&this.hass.states[p]&&this.hass.states[p].attributes&&(this.hass.states[p].attributes.temperature_unit||(this.hass.states[p].attributes.unit_of_measurement||"").match(/^°/))?s`<label class="toggle-row">
              <span>Fancy unit</span>
              <ha-switch
                data-chip-idx=${t}
                data-key="fancy_unit"
                data-mode=${z.TRUE_DELETE}
                .checked=${e.fancy_unit===!0}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>`:""}
      </div>
      ${e.hide_value!==!0?s`${E([{name:"unit_format",selector:{text:{}}}])}
            ${!o&&p?s`${(()=>{let n=e.value_precision!==void 0&&e.value_precision!==null,l=n?Math.min(2,Math.max(0,parseInt(e.value_precision,10)||0)):1,m=Math.round(l/2*100);return s`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>Auto (Home Assistant)</span>
                        <ha-switch
                          .checked=${!n}
                          @change=${y=>{if(y.target.checked){let $={...e};delete $.value_precision,b($)}else b({...e,value_precision:l})}}
                        ></ha-switch>
                      </label>
                    </div>
                    <div class="awc-slider">
                      <div class="awc-slider-head">
                        <span class="awc-slider-label">Decimal places</span>
                        <input
                          type="number"
                          class="awc-slider-num"
                          min="0"
                          max="2"
                          step="1"
                          placeholder=${n?"":"Auto"}
                          .value=${n?String(l):""}
                          @change=${y=>{let $=y.target.value.trim();if($===""){let T={...e};delete T.value_precision,b(T);return}let x=Math.min(2,Math.max(0,parseInt($,10)||0)),w=y.target.closest(".awc-slider").querySelector(".awc-slider-range");w&&(w.value=x,w.style.setProperty("--awc-slider-pct",Math.round(x/2*100)+"%")),b({...e,value_precision:x})}}
                        />
                      </div>
                      <input
                        type="range"
                        class="awc-slider-range"
                        min="0"
                        max="2"
                        step="1"
                        .value=${String(l)}
                        style="--awc-slider-pct:${m}%"
                        @input=${y=>{let $=parseInt(y.target.value,10),x=Math.round($/2*100);y.target.style.setProperty("--awc-slider-pct",x+"%");let w=y.target.closest(".awc-slider").querySelector(".awc-slider-num");w&&(w.value=$)}}
                        @change=${y=>b({...e,value_precision:parseInt(y.target.value,10)})}
                      />
                      <div class="awc-slider-helper">
                        ${n?"Manual override":"Following Home Assistant display precision"}
                      </div>
                    </div>`})()}`:""}
            <div class="css-field-row cols-2">
              ${S("text_size","Size","auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label="Weight"
            >
              ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(n=>s`<button
                    type="button"
                    role="radio"
                    class=${(e.value_weight||"")===n.value?"active":""}
                    data-chip-idx=${t}
                    data-key="value_weight"
                    data-mode=${P.SET_OR_DELETE_EMPTY}
                    data-value=${n.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${n.label}
                  </button>`)}
            </div>
            ${E([{name:"overflow",selector:{select:{mode:"dropdown",options:D.chip_overflow}}}])}`:""}`,ot=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>Hide</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="hide_sub_value"
            data-mode=${z.TRUE_DELETE}
            .checked=${e.hide_sub_value===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.hide_sub_value!==!0?s`${ee("sub_value_entity","sub_value_attribute",{entity:{}})}
          ${ke?E([{name:"sub_value_attribute",selector:{attribute:{entity_id:ke}}}]):o?s`<ha-form
                  .hass=${this.hass}
                  .data=${{sub_value_attribute:e.sub_value_attribute||""}}
                  .schema=${[{name:"sub_value_attribute",selector:{select:{mode:"dropdown",options:se}}}]}
                  .computeLabel=${()=>"Forecast attribute"}
                  @value-changed=${n=>{n.stopPropagation();let l=n.detail&&n.detail.value&&n.detail.value.sub_value_attribute,m={...e};l?m.sub_value_attribute=l:delete m.sub_value_attribute,b(m)}}
                ></ha-form>`:""}
          ${tt?s`<div class="css-field-row cols-2">
                  ${S("sub_value_format","Unit","")}
                  ${S("sub_value_size","Size","auto")}
                </div>
                <div
                  class="segmented segmented-compact"
                  role="radiogroup"
                  aria-label="Weight"
                >
                  ${[{value:"",label:"Normal"},{value:"500",label:"Light"},{value:"600",label:"Medium"},{value:"700",label:"Bold"}].map(n=>s`<button
                        type="button"
                        role="radio"
                        class=${(e.sub_value_weight||"")===n.value?"active":""}
                        data-chip-idx=${t}
                        data-key="sub_value_weight"
                        data-mode=${P.SET_OR_DELETE_EMPTY}
                        data-value=${n.value}
                        @click=${this._onChipSegmentedSelect}
                      >
                        ${n.label}
                      </button>`)}
                </div>
                <div class="segmented" role="radiogroup" aria-label="Position">
                  ${[{value:"below",label:"Below"},{value:"beside",label:"Beside value"}].map(n=>{let l=e.sub_value_position==="beside"?"beside":"below";return s`<button
                      type="button"
                      role="radio"
                      class=${l===n.value?"active":""}
                      data-chip-idx=${t}
                      data-key="sub_value_position"
                      data-mode=${P.BESIDE_OR_DELETE}
                      data-value=${n.value}
                      @click=${this._onChipSegmentedSelect}
                    >
                      ${n.label}
                    </button>`})}
                </div>
                ${E([{name:"sub_value_overflow",selector:{select:{mode:"dropdown",options:D.chip_overflow}}}])}`:""}`:""}`,st=(e.sub_value_overflow||"").toLowerCase()==="marquee",Ce=Qe||et||st?s`<div class="toggle-group">
              <label class="toggle-row">
                <span>Right-to-left</span>
                <ha-switch
                  data-chip-idx=${t}
                  data-key="marquee_rtl"
                  data-mode=${z.TRUE_DELETE}
                  .checked=${e.marquee_rtl===!0}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${(()=>{let n=parseFloat(e.marquee_speed)||30;return this._renderChipSlider(e,b,"marquee_speed","Scroll speed",5,100,5,n,30)})()}`:null,nt=s`${te("text_label","Label",rt)}
    ${te("text_value","Value",it)}
    ${te("text_sub","Sub value",ot)}
    ${Ce?te("text_marquee","Scrolling",Ce):""}`,ct=s`<div
        class="segmented"
        role="radiogroup"
        aria-label="Chip layout"
      >
        ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(n=>s`<button
              type="button"
              role="radio"
              class=${e.style===n.value?"active":""}
              data-chip-idx=${t}
              data-key="style"
              data-mode=${P.TOGGLE_DELETE_IF_SAME}
              data-value=${n.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${n.label}
            </button>`)}
      </div>
      <div class="segmented" role="radiogroup" aria-label="Alignment">
        ${[{value:"start",label:"Left"},{value:"center",label:"Center"},{value:"end",label:"Right"},{value:"spread",label:"Spread"}].map(n=>s`<button
              type="button"
              role="radio"
              class=${e.align===n.value?"active":""}
              data-chip-idx=${t}
              data-key="align"
              data-mode=${P.TOGGLE_DELETE_IF_SAME}
              data-value=${n.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${n.label}
            </button>`)}
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>Round shape</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="chip_round"
            data-mode=${z.TRUE_DELETE}
            .checked=${e.chip_round===!0}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>Background</span>
          <ha-switch
            data-chip-idx=${t}
            data-key="background"
            data-mode=${z.FALSE_DELETE}
            .checked=${e.background!==!1}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${e.background!==!1?this._renderColorPicker("Background color",e.background_color||"",(n,l)=>{let m={...e};n?m.background_color=this._serializeColor(n,l):delete m.background_color,b(m)}):""}
      <div class="settings-group">
        <div class="settings-group-label">Chip Layout</div>
        <div class="css-field-row cols-2">
          ${S("width","Width","e.g. 200px")}
          ${S("height","Height","e.g. 40px")}
        </div>
        <div class="css-field-row cols-2">
          ${S("padding","Padding","auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">Gaps</div>
        <div class="css-field-row cols-2">
          ${S("inner_gap","Icon/text gap","auto")}
          ${S("text_gap","Label/value gap","auto")}
        </div>
      </div>`,Se=n=>{let l=n+"_",m=n==="ring"?"Ring":"Bar",y=Array.isArray(e[l+"thresholds"])?e[l+"thresholds"]:[],$=n==="ring"?s`<div class="css-field-row cols-2">
              ${S("ring_width","Thickness","4")}
              ${S("ring_gap","Gap","3")}
            </div>`:s`<div class="css-field-row cols-2">
              ${S("bar_height","Thickness","4")}
              ${S("bar_gap","Gap","4")}
            </div>`,x=(e.gauge_entity||"").toString().trim();return s`<div class="css-field-row cols-2">
          ${S(l+"min","Min","0")}
          ${S(l+"max","Max","100")}
        </div>
        ${$}
        ${this._renderColorPicker(`${m} color`,e[l+"color"]||"",(w,T)=>{let A={...e};w?A[l+"color"]=this._serializeColor(w,T):delete A[l+"color"],b(A)})}
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${m} entity</span>
          </summary>
          <div class="disclosure-body">
            <div
              style="font-size:var(--awc-e-f-meta);color:var(--secondary-text-color);line-height:1.4"
            >
              Use a different entity for the ${n} value instead of the
              chip's main entity.
            </div>
            ${ee("gauge_entity","gauge_attribute",{entity:{}})}
            ${x?E([{name:"gauge_attribute",selector:{attribute:{entity_id:x}}}]):o?s`<ha-form
                    .hass=${this.hass}
                    .data=${{gauge_attribute:e.gauge_attribute||""}}
                    .schema=${[{name:"gauge_attribute",selector:{select:{mode:"dropdown",options:se}}}]}
                    .computeLabel=${()=>"Forecast attribute"}
                    @value-changed=${w=>{w.stopPropagation();let T=w.detail&&w.detail.value&&w.detail.value.gauge_attribute,A={...e};T?A.gauge_attribute=T:delete A.gauge_attribute,b(A)}}
                  ></ha-form>`:""}
          </div>
        </details>
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>Color thresholds</span>
          </summary>
          <div class="disclosure-body">
            <div
              class="segmented"
              role="radiogroup"
              aria-label="Threshold mode"
            >
              ${[{value:"solid",label:"Solid"},{value:"segments",label:"Segments"},{value:"gradient",label:"Gradient"}].map(w=>s`<button
                    type="button"
                    role="radio"
                    class=${(e[l+"threshold_mode"]||"solid")===w.value?"active":""}
                    data-chip-idx=${t}
                    data-key=${l+"threshold_mode"}
                    data-mode=${P.SOLID_OR_DELETE}
                    data-value=${w.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${w.label}
                  </button>`)}
            </div>
            ${y.map((w,T)=>s`<div class="ring-threshold-row">
                  <span class="threshold-label">≥</span>
                  <input
                    type="text"
                    placeholder="value"
                    .value=${String(w.value!=null?w.value:"")}
                    @change=${A=>{let I=[...y];I[T]={...I[T],value:A.target.value.trim()},b({...e,[l+"thresholds"]:I})}}
                  />
                  <input
                    type="color"
                    class="chip-color-swatch"
                    .value=${w.color||"#ff0000"}
                    @input=${A=>{let I=[...y];I[T]={...I[T],color:A.target.value},b({...e,[l+"thresholds"]:I})}}
                  />
                  <button
                    type="button"
                    class="ring-threshold-del"
                    title="Remove"
                    @click=${()=>{let A=[...y];A.splice(T,1),b({...e,[l+"thresholds"]:A.length?A:void 0})}}
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
              @click=${()=>{let w=[...y,{value:"",color:"#ff9800"}];b({...e,[l+"thresholds"]:w})}}
            >
              <ha-icon icon="mdi:plus" style="--mdc-icon-size:14px"></ha-icon>
              Add threshold
            </button>
          </div>
        </details>`},lt=["min","max","color","thresholds","threshold_mode"],dt=s`<div
        class="segmented"
        role="radiogroup"
        aria-label="Chip type"
      >
        ${[{value:"",label:"Default"},{value:"ring",label:"Ring"},{value:"bar",label:"Bar"}].map(n=>s`<button
              type="button"
              role="radio"
              class=${h===n.value?"active":""}
              @click=${()=>{let l={...e},m=h;if(n.value?l.type=n.value:delete l.type,m&&n.value&&m!==n.value)for(let y of lt){let $=m+"_"+y,x=n.value+"_"+y;l[$]!==void 0&&l[x]===void 0&&(l[x]=l[$])}b(l)}}
            >
              ${n.label}
            </button>`)}
      </div>
      ${h==="ring"?Se("ring"):""}
      ${h==="bar"?Se("bar"):""}`,pt=["top-left","top-center","top-right","left","center","right","bottom-left","bottom-center","bottom-right"],ht=e.position_anchor||"top-left",ut=s`<div class="toggle-group">
        <label class="toggle-row">
          <span>Free positioning</span>
          <ha-switch
            .checked=${i}
            @change=${n=>{let l={...e};n.target.checked?(l.position="custom",l.position_anchor||(l.position_anchor="top-left")):["position","position_anchor","position_x","position_y"].forEach(m=>delete l[m]),b(l)}}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>Behind animations</span>
          <ha-switch
            .checked=${e.behind_effects===!0}
            @change=${n=>{let l={...e};n.target.checked?l.behind_effects=!0:delete l.behind_effects,b(l)}}
          ></ha-switch
        ></label>
      </div>
      ${i?s`<div>
            <div class="free-pos-layout">
              <div>
                <div class="settings-group-label">Position</div>
                <div
                  class="anchor-grid"
                  role="radiogroup"
                  aria-label="Position"
                >
                  ${pt.map(n=>s`<button
                        type="button"
                        role="radio"
                        class="anchor-cell ${ht===n?"active":""}"
                        title=${n}
                        aria-label=${n}
                        data-chip-idx=${t}
                        data-anchor=${n}
                        @click=${this._onChipAnchorSelect}
                      ></button>`)}
                </div>
              </div>
              <div>
                <div class="settings-group-label">Offset</div>
                <div class="offset-fields">
                  <div class="offset-field">
                    <span class="offset-field-label">X</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(e.position_x||"")}
                      @change=${n=>{let l={...e},m=n.target.value.trim();m?l.position_x=m:delete l.position_x,b(l)}}
                    />
                  </div>
                  <div class="offset-field">
                    <span class="offset-field-label">Y</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(e.position_y||"")}
                      @change=${n=>{let l={...e},m=n.target.value.trim();m?l.position_y=m:delete l.position_y,b(l)}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> `:""}`,_t=s`${E([{name:"tap_action",selector:{ui_action:{}}}])}`,gt=o&&!_?s`<div class="chip-forecast-box">
            <div class="chip-forecast-header">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon> Forecast
            </div>
            <div class="chip-forecast-body">
              <div
                class="segmented"
                role="radiogroup"
                aria-label="Forecast type"
              >
                ${[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"}].map(n=>s`<button
                      type="button"
                      role="radio"
                      class=${e.forecast===n.value?"active":""}
                      data-chip-idx=${t}
                      data-forecast-type=${n.value}
                      @click=${this._onChipForecastTypeSelect}
                    >
                      ${n.label}
                    </button>`)}
              </div>
              ${(()=>{let n=e.forecast==="hourly"?23:6,l=e.forecast==="hourly"?"Hours ahead":"Days ahead",m=e.forecast==="hourly"?q===0?"Now":`+${q}h`:q===0?"Today":q===1?"Tomorrow":`+${q} days`;return this._renderChipSlider(e,b,"forecast_offset",l,0,n,1,q,0,m)})()}
              <ha-form
                .hass=${this.hass}
                .data=${{attribute:xe}}
                .schema=${[{name:"attribute",selector:{select:{mode:"dropdown",options:se}}}]}
                .computeLabel=${()=>"Show"}
                @value-changed=${n=>{n.stopPropagation();let l=n.detail&&n.detail.value&&n.detail.value.attribute;l!==void 0&&b({...e,attribute:l})}}
              ></ha-form>
              ${xe!=="condition"&&!e.hide_value?s`${(()=>{let n=e.forecast_precision!==void 0?e.forecast_precision:1;return this._renderChipSlider(e,b,"forecast_precision","Decimal places",0,2,1,n,0)})()}`:""}
            </div>
          </div>`:null,ft=Ve.some(n=>e[n]!==void 0&&e[n]!==""),mt=s`${We} ${Ye} ${Ke} ${Xe}
    ${gt||""}
    ${B("ring","mdi:circle-outline","Type",dt)}
    ${B("layout","mdi:view-compact-outline","Layout",ct)}
    ${B("text","mdi:format-text","Text",nt)}
    ${B("icon","mdi:image-outline","Icon",Ze)}
    ${B("position","mdi:arrow-all","Position",ut)}
    ${B("tap","mdi:gesture-tap","Tap Action",_t)}
    ${ft?s`<button
          type="button"
          class="add-card-btn"
          style="border-style:solid;border-color:rgba(var(--rgb-error-color,211,47,47),0.35);color:var(--error-color);margin-top:var(--awc-e-s3)"
          data-chip-idx=${t}
          data-action="reset-styles"
          @click=${this._onChipActionClick}
        >
          <ha-icon icon="mdi:restore"></ha-icon><span>Reset all styles</span>
        </button>`:""}`;return this._renderListRow({idx:t,total:a,expanded:r,body:mt,badge:u,title:this._chipTitle(e),onToggle:()=>this._toggleChipExpanded(t),onMoveUp:()=>this._moveChip(t,-1),onMoveDown:()=>this._moveChip(t,1),onDuplicate:()=>this._duplicateChip(t),onRemove:()=>this._removeChip(t)})}_parseColor(e){let t=(e||"").toString().trim(),a=t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);return a?{hex:`#${parseInt(a[1]).toString(16).padStart(2,"0")}${parseInt(a[2]).toString(16).padStart(2,"0")}${parseInt(a[3]).toString(16).padStart(2,"0")}`,opacity:a[4]!==void 0?parseFloat(a[4]):1,hasColor:!0}:/^#[0-9a-f]{3,8}$/i.test(t)?{hex:t.slice(0,7),opacity:1,hasColor:!0}:{hex:"#ffffff",opacity:0,hasColor:!1}}_serializeColor(e,t){if(t>=1)return e;let a=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16);return`rgba(${a},${r},${i},${parseFloat(t.toFixed(2))})`}_renderColorPicker(e,t,a){let{hex:r,opacity:i,hasColor:o}=this._parseColor(t);return s`<div class="chip-color-box">
      <div class="chip-color-row">
        <ha-icon
          icon="mdi:palette-outline"
          style="--mdc-icon-size:15px;color:var(--secondary-text-color);flex-shrink:0"
        ></ha-icon>
        <span class="chip-color-label">${e}</span>
        <input
          type="color"
          class="chip-color-swatch"
          .value=${r}
          @input=${h=>a(h.target.value,i||1)}
        />
        ${o?s`<button
              type="button"
              class="chip-color-clear"
              title="Clear color"
              @click=${()=>a("",1)}
            >
              <ha-icon icon="mdi:close" style="--mdc-icon-size:14px"></ha-icon>
            </button>`:""}
      </div>
      ${o?s`<div class="chip-color-opacity-row">
            <span class="chip-color-opacity-label">Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              class="chip-color-opacity"
              .value=${String(i)}
              @input=${h=>a(r,parseFloat(h.target.value))}
            />
            <span class="chip-color-opacity-val"
              >${Math.round(i*100)}%</span
            >
          </div> `:""}
    </div>`}_renderGlobalColorPicker(e,t){let a=(this._config[e]||"").toString().trim();return this._renderColorPicker(t,a,(r,i)=>{this._updateField(e,r?this._serializeColor(r,i):"")})}_renderSlider(e,t,a,r,i,o){let h=parseFloat(this._formData[e]!=null?this._formData[e]:a)||a,d=Math.round((h-a)/(r-a)*100);return this._renderSliderMarkup({label:t,min:a,max:r,step:i,val:h,pct:d,helper:o,onNumChange:u=>{let g=Math.min(r,Math.max(a,parseFloat(u.target.value)||a));this._syncSliderRange(u,g,a,r),this._updateField(e,g)},onRangeInput:u=>{this._syncSliderNum(u,parseFloat(u.target.value),a,r)},onRangeChange:u=>this._updateField(e,parseFloat(u.target.value))})}_renderChipSlider(e,t,a,r,i,o,h,d,u,g){let p=Math.round((d-i)/(o-i)*100);return this._renderSliderMarkup({label:r,min:i,max:o,step:h,val:d,pct:p,helper:g,onNumChange:f=>{let _=Math.min(o,Math.max(i,parseInt(f.target.value,10)||u));this._syncSliderRange(f,_,i,o),t({...e,[a]:_})},onRangeInput:f=>{this._syncSliderNum(f,parseInt(f.target.value,10),i,o)},onRangeChange:f=>t({...e,[a]:parseInt(f.target.value,10)})})}_syncSliderRange(e,t,a,r){let i=e.target.closest(".awc-slider").querySelector(".awc-slider-range");i&&(i.value=t,i.style.setProperty("--awc-slider-pct",Math.round((t-a)/(r-a)*100)+"%"))}_syncSliderNum(e,t,a,r){e.target.style.setProperty("--awc-slider-pct",Math.round((t-a)/(r-a)*100)+"%");let i=e.target.closest(".awc-slider").querySelector(".awc-slider-num");i&&(i.value=t)}_renderSliderMarkup({label:e,min:t,max:a,step:r,val:i,pct:o,onNumChange:h,onRangeInput:d,onRangeChange:u,helper:g}){return s`<div class="awc-slider">
      <div class="awc-slider-head">
        <span class="awc-slider-label">${e}</span>
        <input
          type="number"
          class="awc-slider-num"
          min=${t}
          max=${a}
          step=${r}
          .value=${String(i)}
          @change=${h}
        />
      </div>
      <input
        type="range"
        class="awc-slider-range"
        min=${t}
        max=${a}
        step=${r}
        .value=${String(i)}
        style="--awc-slider-pct:${o}%"
        @input=${d}
        @change=${u}
      />
      ${g?s`<div class="awc-slider-helper">${g}</div>`:""}
    </div>`}_renderCompactField(e,t){let a=String(this._formData[e]||""),r=v[e]||e,o=e==="card_height"&&!!this._cardHeightError;return s`<div class="compact-field ${o?"invalid":""}">
      <span class="compact-field-label">${r}</span>
      <input
        type="text"
        placeholder=${t}
        data-field=${e}
        .value=${a}
        @change=${this._onRawFieldChange}
      />
      ${o?s`<div class="compact-field-hint error">
            ${this._cardHeightError}
          </div>`:""}
    </div>`}_renderChipsEditor(){let e=this._formData,t=this._getChips(),a=(e.chip_area_layout||"wrap").toString().toLowerCase(),r=a==="grid",i=a==="horizontal-scroll"||a==="vertical-scroll",o=(e.chip_area_align||"start").toString().toLowerCase(),h=(e.chip_style||"inline").toString().toLowerCase(),d=e.card_background_style||"frosted",u=!!e.chip_area_background,g=(_,k,b)=>s`<div class="css-field">
        <span class="css-field-label">${k}</span>
        <input
          type="text"
          placeholder=${b}
          data-field=${_}
          .value=${String(e[_]||"")}
          @change=${this._onRawFieldChange}
        />
      </div>`,p=s`<div class="settings-group">
        <div class="section-title">Position &amp; Size</div>
        <div style="display:flex;gap:var(--awc-e-s3);align-items:flex-start">
          ${this._renderPositionGrid("chip_area_position",Q.chip_area_position)}
          <div
            style="display:flex;flex-direction:column;gap:var(--awc-e-s2);align-self:center;flex:1;min-width:0"
          >
            <div class="css-field">
              <span class="css-field-label">${v.chip_area_width}</span>
              <input
                type="text"
                placeholder="auto"
                data-field="chip_area_width"
                .value=${String(e.chip_area_width||"")}
                @change=${this._onRawFieldChange}
              />
            </div>
            <div class="css-field">
              <span class="css-field-label">${v.chip_area_height}</span>
              <input
                type="text"
                placeholder="auto"
                data-field="chip_area_height"
                .value=${String(e.chip_area_height||"")}
                @change=${this._onRawFieldChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">Layout</div>
        <div class="segmented" role="radiogroup" aria-label="Layout">
          ${D.chip_area_layout.map(_=>s`<button
                type="button"
                role="radio"
                class=${a===_.value?"active":""}
                data-field="chip_area_layout"
                data-value=${_.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${_.label}
              </button>`)}
        </div>
        ${r?this._renderSlider("chip_area_columns",v.chip_area_columns,1,12,1):""}
        ${i?this._renderSlider("chip_area_scroll_count",v.chip_area_scroll_count,1,10,1):""}
      </div>
      <div class="settings-group">
        <div class="section-title">Arrangement</div>
        <div class="field-group">
          ${this._renderToggleGroup([{key:"chip_area_grouped",label:v.chip_area_grouped},...i?[{key:"chip_area_full_width",label:v.chip_area_full_width}]:[]])}
          ${e.chip_area_grouped===!0?this._renderToggleGroup([{key:"chip_area_separator",label:v.chip_area_separator}]):""}
          <div class="css-field-row cols-2">
            ${g("chip_area_gap",v.chip_area_gap,"8px")}
            ${g("chip_area_padding",v.chip_area_padding,"0")}
          </div>
        </div>
      </div>
      ${e.chip_area_grouped===!0&&e.chip_area_background===!0?s`
            <div class="settings-group">
              <div class="section-title">Container Color</div>
              ${this._renderGlobalColorPicker("chip_area_background_color","Container background color")}
            </div>
          `:""}`,f=s`<div class="settings-group">
        <div class="section-title">Chip Layout</div>
        <div class="segmented" role="radiogroup" aria-label="Chip style">
          ${[{value:"inline",label:"Inline"},{value:"stacked",label:"Stacked"},{value:"vertical",label:"Vertical"}].map(_=>s`<button
                type="button"
                role="radio"
                class=${h===_.value?"active":""}
                data-field="chip_style"
                data-value=${_.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${_.label}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">Content Alignment</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label="Chip content alignment"
          style="flex-wrap:nowrap"
        >
          ${D.chip_area_align.map(_=>s`<button
                type="button"
                role="radio"
                class=${o===_.value?"active":""}
                data-field="chip_area_align"
                data-value=${_.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${_.label}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">Background</div>
        <div class="settings-group-label">Chip background</div>
        <div class="segmented" role="radiogroup" aria-label="Background">
          <button
            type="button"
            role="radio"
            class=${u?"":"active"}
            data-bg-mode="off"
            @click=${this._onChipAreaBackgroundModeSelect}
          >
            Off
          </button>
          ${[{value:"frosted",label:"Frosted"},{value:"contrast",label:"Contrast"},{value:"theme",label:"Theme"}].map(_=>s`<button
                type="button"
                role="radio"
                class=${u&&d===_.value?"active":""}
                data-bg-mode=${_.value}
                @click=${this._onChipAreaBackgroundModeSelect}
              >
                ${_.label}
              </button>`)}
        </div>
        <div class="settings-group-label">Icon background</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${v.chip_icon_background}
        >
          ${[{value:void 0,label:"Default"},{value:!0,label:"On"},{value:!1,label:"Off"}].map(_=>s`<button
                type="button"
                role="radio"
                class=${e.chip_icon_background===_.value||_.value===void 0&&e.chip_icon_background===void 0?"active":""}
                data-field="chip_icon_background"
                data-value=${_.value===void 0?"":String(_.value)}
                data-value-type=${_.value===void 0?"empty":"boolean"}
                @click=${this._onSegmentedFieldSelect}
              >
                ${_.label}
              </button>`)}
        </div>
        <div class="settings-group-label">Custom colors</div>
        ${this._renderGlobalColorPicker("chip_background_color","Background color (all chips)")}
        ${this._renderGlobalColorPicker("chip_icon_background_color","Icon background color (all chips)")}
      </div>
      <div class="settings-group">
        <div class="section-title">Dimensions</div>
        <div class="css-field-row cols-2">
          ${g("chip_text_size",v.chip_text_size,"auto")}
          ${g("chip_label_size",v.chip_label_size,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_icon_size",v.chip_icon_size,"auto")}
          ${g("chip_icon_padding",v.chip_icon_padding,"auto")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_gap",v.chip_gap,"6px")}
          ${g("chip_text_gap",v.chip_text_gap,"0.35em")}
        </div>
        <div class="css-field-row cols-2">
          ${g("chip_padding",v.chip_padding,"auto")}
        </div>
      </div>`;return s` <div class="sensor-list">
        ${t.map((_,k)=>this._renderChipRow(_,k,t.length))}
      </div>
      <button type="button" class="add-chip-btn" @click=${this._addChip}>
        <ha-icon icon="mdi:plus"></ha-icon> <span>Add chip</span>
      </button>
      ${this._renderDisclosure("Chip Area Settings",p)}
      ${this._renderDisclosure("Chip Style Settings",f)}
      <div
        class="fc-box"
        style="background:rgba(var(--rgb-primary-text-color,0,0,0),0.03)"
      >
        <div
          style="display:flex;align-items:center;gap:var(--awc-e-s2);font-size:var(--awc-e-f-meta);color:var(--secondary-text-color)"
        >
          <ha-icon
            icon="mdi:lightbulb-outline"
            style="--mdc-icon-size:16px;flex-shrink:0"
          ></ha-icon>
          <span
            >SVG icons:
            <a
              href="https://github.com/shpongledsummer/atmo-weather-card#weather-icons"
              target="_blank"
              rel="noopener"
              style="color:var(--primary-color)"
              >How to add them</a
            ></span
          >
        </div>
      </div>`}_renderPerformancePanel(){let e={low:{perf_fps:24,perf_cloud_quality:.5,perf_effects:0,perf_fauna:0,perf_dpr:1,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:.5,fauna_plane_density:.5,fauna_bird_flock_size:4,fauna_birds_at_night:!0},default:{perf_fps:30,perf_cloud_quality:1.5,perf_effects:1,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1,fauna_plane_density:1,fauna_bird_flock_size:8,fauna_birds_at_night:!0},ultra:{perf_fps:60,perf_cloud_quality:2,perf_effects:2,perf_fauna:2,perf_dpr:2,animation_speed:1,bird_animation_speed:.3,star_animation_speed:.5,fauna_bird_density:1.5,fauna_plane_density:1.5,fauna_bird_flock_size:12,fauna_birds_at_night:!0}},t=["perf_fps","animation_speed","bird_animation_speed","star_animation_speed","perf_cloud_quality","perf_effects","perf_fauna","perf_dpr","fauna_bird_density","fauna_plane_density","fauna_bird_flock_size","fauna_birds_at_night"],a=this._config||{},r=typeof a.perf_mode=="string"&&e[a.perf_mode]?a.perf_mode:"default",i=e[r],o=p=>{let f=a[p]!==void 0?a[p]:i[p],_=typeof f=="number"?f:parseFloat(f);return Number.isFinite(_)?_:i[p]},h=["low","default","ultra"].find(p=>t.every(f=>o(f)===e[p][f]))||"custom",d=p=>{let f=e[p],_={};for(let k of t)_[k]=f[k];_.perf_mode=p,this._patch(_)},u={perf_fps:{24:"Battery saver",30:"Balanced",45:"Smoother",60:"Maximum smoothness"},perf_cloud_quality:{.5:"Simple clouds",1:"Moderate detail",1.5:"Detailed clouds",2:"Maximum detail"},perf_effects:{0:"No weather effects",1:"Rain, snow, lightning, stars",2:"Extra shooting stars and comets"},perf_fauna:{0:"No fauna",1:"Birds only",2:"Birds and planes"},perf_dpr:{.5:"Low resolution",1:"Standard resolution",1.5:"Sharp rendering",2:"Native resolution"}},g=(p,f,_)=>{let k=o(p),b=u[p]&&u[p][k]||"";return s`<div class="settings-group">
        <div class="settings-group-label">${f}</div>
        <div class="segmented" role="radiogroup" aria-label=${f}>
          ${_.map(E=>s`<button
                type="button"
                role="radio"
                class=${k===E.value?"active":""}
                data-field=${p}
                data-value=${String(E.value)}
                data-value-type="number"
                @click=${this._onSegmentedFieldSelect}
              >
                ${E.label}
              </button>`)}
        </div>
        ${b?s`<div class="composite-helper">${b}</div>`:""}
      </div>`};return s`<div class="grid-picker">
        <div class="grid-picker-label">${v.perf_mode}</div>
        <div class="segmented">
          ${[{v:"low",l:"Low"},{v:"default",l:"Default"},{v:"ultra",l:"Ultra"}].map(p=>s`<button
                type="button"
                class=${h===p.v?"active":""}
                @click=${()=>d(p.v)}
              >
                ${p.l}
              </button>`)}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${v.wind_style}</div>
        <div class="segmented" role="radiogroup" aria-label=${v.wind_style}>
          ${[{v:"lines",l:"Wind lines"},{v:"flow",l:"Flow field"},{v:"off",l:"Off"}].map(p=>s`<button
                type="button"
                role="radio"
                class=${(a.wind_style||"lines")===p.v?"active":""}
                data-field="wind_style"
                data-value=${p.v}
                @click=${this._onSegmentedFieldSelect}
              >
                ${p.l}
              </button>`)}
        </div>
        <div class="composite-helper">${U.wind_style}</div>
      </div>
      ${this._renderDisclosure("Advanced Settings",s`
          ${g("perf_fps",v.perf_fps,[{value:24,label:"24"},{value:30,label:"30"},{value:45,label:"45"},{value:60,label:"60"}])}
          ${this._renderSlider("animation_speed",v.animation_speed,0,3,.1)}
          ${this._renderSlider("bird_animation_speed",v.bird_animation_speed,0,3,.1)}
          ${this._renderSlider("star_animation_speed",v.star_animation_speed,0,2,.1)}
          ${g("perf_cloud_quality",v.perf_cloud_quality,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Ultra"}])}
          ${g("perf_effects",v.perf_effects,[{value:0,label:"Off"},{value:1,label:"Default"},{value:2,label:"Ultra"}])}
          ${g("perf_fauna",v.perf_fauna,[{value:0,label:"Off"},{value:1,label:"Birds"},{value:2,label:"All"}])}
          ${g("perf_dpr",v.perf_dpr,[{value:.5,label:"Low"},{value:1,label:"Medium"},{value:1.5,label:"High"},{value:2,label:"Full"}])}
          <div
            class="settings-group"
            style="margin-top: var(--awc-e-s4); padding-top: var(--awc-e-s4); border-top: 1px solid var(--divider-color);"
          >
            <div class="settings-group-label">🦅 Fauna Customization</div>
            ${this._renderSlider("fauna_bird_density","Bird spawn rate",.5,2,.1)}
            ${this._renderSlider("fauna_plane_density","Plane spawn rate",.5,2,.1)}
            ${this._renderSlider("fauna_bird_flock_size","Birds per flock",1,20,1)}
            ${this._renderToggleGroup([{key:"fauna_birds_at_night",label:"Birds at night"}])}
          </div>
        `)}`}render(){if(!this.hass||!this._config)return s``;let e=this._formData;return s`${this._renderForm([{name:"weather_entity",selector:{entity:{domain:"weather"}}}])}
      <ha-expansion-panel
        outlined
        data-panel="sun_moon"
        .expanded=${this._openPanel==="sun_moon"}
        @expanded-changed=${this._onPanelExpandedChanged}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:theme-light-dark"></ha-icon>
          <span>Sun &amp; Moon</span>
        </div>
        ${this._renderForm([{type:"grid",name:"",schema:[{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"moon_phase_entity",selector:{entity:{domain:"sensor"}}}]}])}
        ${this._renderDisclosure("Position & Size",(()=>{let t=this._formData.celestial_position||"fixed";return s` ${this._renderForm([{name:"celestial_position",selector:{select:{mode:"dropdown",options:[{value:"fixed",label:"Fixed Sun & Moon"},{value:"dynamic_sun",label:"Dynamic Sun"},{value:"dynamic_both",label:"Dynamic Sun & Moon"}]}}}])}
            ${t==="fixed"||t==="dynamic_sun"?s`<div class="field-group">
                  ${this._renderPositionGrid("celestial_alignment",Q.celestial_alignment)}
                  ${this._renderCelestialOffsetPicker()}
                </div> `:""}
            ${this._renderSlider("celestial_size",v.celestial_size,20,200,1)}`})())}
      </ha-expansion-panel>
      <ha-expansion-panel
        outlined
        data-panel="color_mode"
        .expanded=${this._openPanel==="color_mode"}
        @expanded-changed=${this._onPanelExpandedChanged}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:palette-outline"></ha-icon>
          <span>Color Mode</span>
        </div>
        ${this._renderForm(this._colorModeSchema())}
        ${this._renderDisclosure("Advanced options",this._renderForm([{name:"card_filter_clouds",selector:{select:{mode:"dropdown",options:D.card_filter_clouds}}},{name:"card_filter_sun",selector:{select:{mode:"dropdown",options:D.card_filter_sun}}}]))}</ha-expansion-panel
      >
      <ha-expansion-panel
        outlined
        data-panel="layout"
        .expanded=${this._openPanel==="layout"}
        @expanded-changed=${this._onPanelExpandedChanged}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:page-layout-body"></ha-icon>
          <span>Card Style</span>
        </div>
        ${this._renderCardStyleSegmented()}
        ${this._renderDisclosure("Advanced options",s`${this._renderToggleGroup([{key:"card_hide_text",label:v.card_hide_text},{key:"card_square",label:v.card_square},...(this._formData.card_style||"standalone")!=="standalone"?[{key:"card_full_width",label:v.card_full_width},{key:"card_mask_vertical",label:v.card_mask_vertical},{key:"card_mask_horizontal",label:v.card_mask_horizontal}]:[]])}
          ${this._renderSlider("card_stack_order",v.card_stack_order,-10,10,1,U.card_stack_order)}
          ${this._renderOffsetPicker()}`)}</ha-expansion-panel
      >
      <ha-expansion-panel
        outlined
        data-panel="text"
        .expanded=${this._openPanel==="text"}
        @expanded-changed=${this._onPanelExpandedChanged}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:layers-outline"></ha-icon>
          <span>Overlays</span>
        </div>
        ${e.card_hide_text===!0?s`<div class="info inline-action">
              <span
                >Chips are hidden by <b>Hide All Text</b> in Card Style →
                Advanced options. Your settings are preserved.</span
              >
              <button
                type="button"
                class="inline-action-btn"
                data-field="card_hide_text"
                @click=${this._onClearFieldClick}
              >
                Show again
              </button>
            </div>`:s`${this._renderDisclosure("Chips",this._renderChipsEditor())}`}
        ${this._renderDisclosure("Image",s`<div class="settings-group">
              ${this._renderClearableText("image_day")}
              ${this._renderClearableText("image_night")}
            </div>
            ${this._renderSlider("image_scale",v.image_scale,0,200,1,U.image_scale)}
            ${this._renderPositionGrid("image_alignment",Q.image_alignment)}
            ${this._renderImageOffsetPicker()}
            ${this._renderDisclosure("Status Override",this._renderForm(this._imageStatusSchema()))}`)}
        ${this._renderDisclosure("Cards",s`<div class="info">
              Add any Home Assistant card here. You can also use grids or stacks
              if you need a specific layout.
            </div>
            ${this._renderPositionGrid("custom_cards_position",Q.custom_cards_position)}
            ${this._renderClearableText("custom_cards_css_class")}
            ${this._renderCustomCardsEditor()}`)}</ha-expansion-panel
      >
      <ha-expansion-panel
        outlined
        .expanded=${this._openPanel==="performance"}
        @expanded-changed=${t=>this._onPanelToggle("performance",t.detail.expanded)}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:speedometer"></ha-icon>
          <span>Performance</span>
        </div>
        ${this._renderPerformancePanel()}</ha-expansion-panel
      >
      <ha-expansion-panel
        outlined
        .expanded=${this._openPanel==="card_tap_action"}
        @expanded-changed=${t=>this._onPanelToggle("card_tap_action",t.detail.expanded)}
      >
        <div slot="header" class="panel-header">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
          <span>Tap Action</span>
        </div>
        ${this._renderForm([{name:"card_tap_action",selector:{ui_action:{}}}])}</ha-expansion-panel
      >`}};customElements.get("atmo-weather-card-editor")||customElements.define("atmo-weather-card-editor",$e);
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
