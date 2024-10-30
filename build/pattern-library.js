(()=>{var e={838:function(e){e.exports=function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:r,getOwnPropertyDescriptor:a}=Object;let{freeze:i,seal:o,create:s}=Object,{apply:l,construct:c}="undefined"!=typeof Reflect&&Reflect;i||(i=function(e){return e}),o||(o=function(e){return e}),l||(l=function(e,t,n){return e.apply(t,n)}),c||(c=function(e,t){return new e(...t)});const u=E(Array.prototype.forEach),d=E(Array.prototype.pop),p=E(Array.prototype.push),m=E(String.prototype.toLowerCase),f=E(String.prototype.toString),g=E(String.prototype.match),h=E(String.prototype.replace),b=E(String.prototype.indexOf),v=E(String.prototype.trim),y=E(Object.prototype.hasOwnProperty),_=E(RegExp.prototype.test),w=(x=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c(x,t)}),k=E(Number.isNaN);var x;function E(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return l(e,t,r)}}function T(e,r){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m;t&&t(e,null);let i=r.length;for(;i--;){let t=r[i];if("string"==typeof t){const e=a(t);e!==t&&(n(r)||(r[i]=e),t=e)}e[t]=!0}return e}function S(e){for(let t=0;t<e.length;t++)y(e,t)||(e[t]=null);return e}function C(t){const n=s(null);for(const[r,a]of e(t))y(t,r)&&(Array.isArray(a)?n[r]=S(a):a&&"object"==typeof a&&a.constructor===Object?n[r]=C(a):n[r]=a);return n}function A(e,t){for(;null!==e;){const n=a(e,t);if(n){if(n.get)return E(n.get);if("function"==typeof n.value)return E(n.value)}e=r(e)}return function(){return null}}const N=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),P=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),O=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),I=i(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),L=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),R=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),M=i(["#text"]),D=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),B=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),z=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),F=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),U=o(/\{\{[\w\W]*|[\w\W]*\}\}/gm),H=o(/<%[\w\W]*|[\w\W]*%>/gm),j=o(/\${[\w\W]*}/gm),V=o(/^data-[\-\w.\u00B7-\uFFFF]/),$=o(/^aria-[\-\w]+$/),q=o(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),K=o(/^(?:\w+script|data):/i),W=o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),G=o(/^html$/i),Y=o(/^[a-z][.\w]*(-[.\w]+)+$/i);var X=Object.freeze({__proto__:null,MUSTACHE_EXPR:U,ERB_EXPR:H,TMPLIT_EXPR:j,DATA_ATTR:V,ARIA_ATTR:$,IS_ALLOWED_URI:q,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:W,DOCTYPE_NAME:G,CUSTOM_ELEMENT:Y});const Z=1,Q=3,J=7,ee=8,te=9,ne=function(){return"undefined"==typeof window?null:window};return function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne();const r=e=>t(e);if(r.version="3.1.3",r.removed=[],!n||!n.document||n.document.nodeType!==te)return r.isSupported=!1,r;let{document:a}=n;const o=a,l=o.currentScript,{DocumentFragment:c,HTMLTemplateElement:x,Node:E,Element:S,NodeFilter:U,NamedNodeMap:H=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:j,DOMParser:V,trustedTypes:$}=n,K=S.prototype,W=A(K,"cloneNode"),Y=A(K,"nextSibling"),re=A(K,"childNodes"),ae=A(K,"parentNode");if("function"==typeof x){const e=a.createElement("template");e.content&&e.content.ownerDocument&&(a=e.content.ownerDocument)}let ie,oe="";const{implementation:se,createNodeIterator:le,createDocumentFragment:ce,getElementsByTagName:ue}=a,{importNode:de}=o;let pe={};r.isSupported="function"==typeof e&&"function"==typeof ae&&se&&void 0!==se.createHTMLDocument;const{MUSTACHE_EXPR:me,ERB_EXPR:fe,TMPLIT_EXPR:ge,DATA_ATTR:he,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:ve,ATTR_WHITESPACE:ye,CUSTOM_ELEMENT:_e}=X;let{IS_ALLOWED_URI:we}=X,ke=null;const xe=T({},[...N,...P,...O,...L,...M]);let Ee=null;const Te=T({},[...D,...B,...z,...F]);let Se=Object.seal(s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,Ae=null,Ne=!0,Pe=!0,Oe=!1,Ie=!0,Le=!1,Re=!0,Me=!1,De=!1,Be=!1,ze=!1,Fe=!1,Ue=!1,He=!0,je=!1,Ve=!0,$e=!1,qe={},Ke=null;const We=T({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ge=null;const Ye=T({},["audio","video","img","source","image","track"]);let Xe=null;const Ze=T({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Qe="http://www.w3.org/1998/Math/MathML",Je="http://www.w3.org/2000/svg",et="http://www.w3.org/1999/xhtml";let tt=et,nt=!1,rt=null;const at=T({},[Qe,Je,et],f);let it=null;const ot=["application/xhtml+xml","text/html"];let st=null,lt=null;const ct=a.createElement("form"),ut=function(e){return e instanceof RegExp||e instanceof Function},dt=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!lt||lt!==e){if(e&&"object"==typeof e||(e={}),e=C(e),it=-1===ot.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,st="application/xhtml+xml"===it?f:m,ke=y(e,"ALLOWED_TAGS")?T({},e.ALLOWED_TAGS,st):xe,Ee=y(e,"ALLOWED_ATTR")?T({},e.ALLOWED_ATTR,st):Te,rt=y(e,"ALLOWED_NAMESPACES")?T({},e.ALLOWED_NAMESPACES,f):at,Xe=y(e,"ADD_URI_SAFE_ATTR")?T(C(Ze),e.ADD_URI_SAFE_ATTR,st):Ze,Ge=y(e,"ADD_DATA_URI_TAGS")?T(C(Ye),e.ADD_DATA_URI_TAGS,st):Ye,Ke=y(e,"FORBID_CONTENTS")?T({},e.FORBID_CONTENTS,st):We,Ce=y(e,"FORBID_TAGS")?T({},e.FORBID_TAGS,st):{},Ae=y(e,"FORBID_ATTR")?T({},e.FORBID_ATTR,st):{},qe=!!y(e,"USE_PROFILES")&&e.USE_PROFILES,Ne=!1!==e.ALLOW_ARIA_ATTR,Pe=!1!==e.ALLOW_DATA_ATTR,Oe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ie=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,Le=e.SAFE_FOR_TEMPLATES||!1,Re=!1!==e.SAFE_FOR_XML,Me=e.WHOLE_DOCUMENT||!1,ze=e.RETURN_DOM||!1,Fe=e.RETURN_DOM_FRAGMENT||!1,Ue=e.RETURN_TRUSTED_TYPE||!1,Be=e.FORCE_BODY||!1,He=!1!==e.SANITIZE_DOM,je=e.SANITIZE_NAMED_PROPS||!1,Ve=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,we=e.ALLOWED_URI_REGEXP||q,tt=e.NAMESPACE||et,Se=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Se.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(Pe=!1),Fe&&(ze=!0),qe&&(ke=T({},M),Ee=[],!0===qe.html&&(T(ke,N),T(Ee,D)),!0===qe.svg&&(T(ke,P),T(Ee,B),T(Ee,F)),!0===qe.svgFilters&&(T(ke,O),T(Ee,B),T(Ee,F)),!0===qe.mathMl&&(T(ke,L),T(Ee,z),T(Ee,F))),e.ADD_TAGS&&(ke===xe&&(ke=C(ke)),T(ke,e.ADD_TAGS,st)),e.ADD_ATTR&&(Ee===Te&&(Ee=C(Ee)),T(Ee,e.ADD_ATTR,st)),e.ADD_URI_SAFE_ATTR&&T(Xe,e.ADD_URI_SAFE_ATTR,st),e.FORBID_CONTENTS&&(Ke===We&&(Ke=C(Ke)),T(Ke,e.FORBID_CONTENTS,st)),Ve&&(ke["#text"]=!0),Me&&T(ke,["html","head","body"]),ke.table&&(T(ke,["tbody"]),delete Ce.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw w('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw w('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');ie=e.TRUSTED_TYPES_POLICY,oe=ie.createHTML("")}else void 0===ie&&(ie=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+a+" could not be created."),null}}($,l)),null!==ie&&"string"==typeof oe&&(oe=ie.createHTML(""));i&&i(e),lt=e}},pt=T({},["mi","mo","mn","ms","mtext"]),mt=T({},["foreignobject","annotation-xml"]),ft=T({},["title","style","font","a","script"]),gt=T({},[...P,...O,...I]),ht=T({},[...L,...R]),bt=function(e){p(r.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},vt=function(e,t){try{p(r.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){p(r.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Ee[e])if(ze||Fe)try{bt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},yt=function(e){let t=null,n=null;if(Be)e="<remove></remove>"+e;else{const t=g(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===it&&tt===et&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const r=ie?ie.createHTML(e):e;if(tt===et)try{t=(new V).parseFromString(r,it)}catch(e){}if(!t||!t.documentElement){t=se.createDocument(tt,"template",null);try{t.documentElement.innerHTML=nt?oe:r}catch(e){}}const i=t.body||t.documentElement;return e&&n&&i.insertBefore(a.createTextNode(n),i.childNodes[0]||null),tt===et?ue.call(t,Me?"html":"body")[0]:Me?t.documentElement:i},_t=function(e){return le.call(e.ownerDocument||e,e,U.SHOW_ELEMENT|U.SHOW_COMMENT|U.SHOW_TEXT|U.SHOW_PROCESSING_INSTRUCTION|U.SHOW_CDATA_SECTION,null)},wt=function(e){return e instanceof j&&(void 0!==e.__depth&&"number"!=typeof e.__depth||void 0!==e.__removalCount&&"number"!=typeof e.__removalCount||"string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof H)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},kt=function(e){return"function"==typeof E&&e instanceof E},xt=function(e,t,n){pe[e]&&u(pe[e],(e=>{e.call(r,t,n,lt)}))},Et=function(e){let t=null;if(xt("beforeSanitizeElements",e,null),wt(e))return bt(e),!0;const n=st(e.nodeName);if(xt("uponSanitizeElement",e,{tagName:n,allowedTags:ke}),e.hasChildNodes()&&!kt(e.firstElementChild)&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent))return bt(e),!0;if(e.nodeType===J)return bt(e),!0;if(Re&&e.nodeType===ee&&_(/<[/\w]/g,e.data))return bt(e),!0;if(!ke[n]||Ce[n]){if(!Ce[n]&&St(n)){if(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,n))return!1;if(Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))return!1}if(Ve&&!Ke[n]){const t=ae(e)||e.parentNode,n=re(e)||e.childNodes;if(n&&t)for(let r=n.length-1;r>=0;--r){const a=W(n[r],!0);a.__removalCount=(e.__removalCount||0)+1,t.insertBefore(a,Y(e))}}return bt(e),!0}return e instanceof S&&!function(e){let t=ae(e);t&&t.tagName||(t={namespaceURI:tt,tagName:"template"});const n=m(e.tagName),r=m(t.tagName);return!!rt[e.namespaceURI]&&(e.namespaceURI===Je?t.namespaceURI===et?"svg"===n:t.namespaceURI===Qe?"svg"===n&&("annotation-xml"===r||pt[r]):Boolean(gt[n]):e.namespaceURI===Qe?t.namespaceURI===et?"math"===n:t.namespaceURI===Je?"math"===n&&mt[r]:Boolean(ht[n]):e.namespaceURI===et?!(t.namespaceURI===Je&&!mt[r])&&!(t.namespaceURI===Qe&&!pt[r])&&!ht[n]&&(ft[n]||!gt[n]):!("application/xhtml+xml"!==it||!rt[e.namespaceURI]))}(e)?(bt(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!_(/<\/no(script|embed|frames)/i,e.innerHTML)?(Le&&e.nodeType===Q&&(t=e.textContent,u([me,fe,ge],(e=>{t=h(t,e," ")})),e.textContent!==t&&(p(r.removed,{element:e.cloneNode()}),e.textContent=t)),xt("afterSanitizeElements",e,null),!1):(bt(e),!0)},Tt=function(e,t,n){if(He&&("id"===t||"name"===t)&&(n in a||n in ct||"__depth"===n||"__removalCount"===n))return!1;if(Pe&&!Ae[t]&&_(he,t));else if(Ne&&_(be,t));else if(!Ee[t]||Ae[t]){if(!(St(e)&&(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,e)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(e))&&(Se.attributeNameCheck instanceof RegExp&&_(Se.attributeNameCheck,t)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(t))||"is"===t&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,n)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))))return!1}else if(Xe[t]);else if(_(we,h(n,ye,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==b(n,"data:")||!Ge[e])if(Oe&&!_(ve,h(n,ye,"")));else if(n)return!1;return!0},St=function(e){return"annotation-xml"!==e&&g(e,_e)},Ct=function(e){xt("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee};let a=t.length;for(;a--;){const i=t[a],{name:o,namespaceURI:s,value:l}=i,c=st(o);let p="value"===o?l:v(l);if(n.attrName=c,n.attrValue=p,n.keepAttr=!0,n.forceKeepAttr=void 0,xt("uponSanitizeAttribute",e,n),p=n.attrValue,n.forceKeepAttr)continue;if(vt(o,e),!n.keepAttr)continue;if(!Ie&&_(/\/>/i,p)){vt(o,e);continue}if(Re&&_(/((--!?|])>)|<\/(style|title)/i,p)){vt(o,e);continue}Le&&u([me,fe,ge],(e=>{p=h(p,e," ")}));const m=st(e.nodeName);if(Tt(m,c,p)){if(!je||"id"!==c&&"name"!==c||(vt(o,e),p="user-content-"+p),ie&&"object"==typeof $&&"function"==typeof $.getAttributeType)if(s);else switch($.getAttributeType(m,c)){case"TrustedHTML":p=ie.createHTML(p);break;case"TrustedScriptURL":p=ie.createScriptURL(p)}try{s?e.setAttributeNS(s,o,p):e.setAttribute(o,p),wt(e)?bt(e):d(r.removed)}catch(e){}}}xt("afterSanitizeAttributes",e,null)},At=function e(t){let n=null;const r=_t(t);for(xt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();){if(xt("uponSanitizeShadowNode",n,null),Et(n))continue;const t=ae(n);n.nodeType===Z&&(t&&t.__depth?n.__depth=(n.__removalCount||0)+t.__depth+1:n.__depth=1),(n.__depth>=255||n.__depth<0||k(n.__depth))&&bt(n),n.content instanceof c&&(n.content.__depth=n.__depth,e(n.content)),Ct(n)}xt("afterSanitizeShadowDOM",t,null)};return r.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,a=null,i=null,s=null;if(nt=!e,nt&&(e="\x3c!--\x3e"),"string"!=typeof e&&!kt(e)){if("function"!=typeof e.toString)throw w("toString is not a function");if("string"!=typeof(e=e.toString()))throw w("dirty is not a string, aborting")}if(!r.isSupported)return e;if(De||dt(t),r.removed=[],"string"==typeof e&&($e=!1),$e){if(e.nodeName){const t=st(e.nodeName);if(!ke[t]||Ce[t])throw w("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof E)n=yt("\x3c!----\x3e"),a=n.ownerDocument.importNode(e,!0),a.nodeType===Z&&"BODY"===a.nodeName||"HTML"===a.nodeName?n=a:n.appendChild(a);else{if(!ze&&!Le&&!Me&&-1===e.indexOf("<"))return ie&&Ue?ie.createHTML(e):e;if(n=yt(e),!n)return ze?null:Ue?oe:""}n&&Be&&bt(n.firstChild);const l=_t($e?e:n);for(;i=l.nextNode();){if(Et(i))continue;const e=ae(i);i.nodeType===Z&&(e&&e.__depth?i.__depth=(i.__removalCount||0)+e.__depth+1:i.__depth=1),(i.__depth>=255||i.__depth<0||k(i.__depth))&&bt(i),i.content instanceof c&&(i.content.__depth=i.__depth,At(i.content)),Ct(i)}if($e)return e;if(ze){if(Fe)for(s=ce.call(n.ownerDocument);n.firstChild;)s.appendChild(n.firstChild);else s=n;return(Ee.shadowroot||Ee.shadowrootmode)&&(s=de.call(o,s,!0)),s}let d=Me?n.outerHTML:n.innerHTML;return Me&&ke["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&_(G,n.ownerDocument.doctype.name)&&(d="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+d),Le&&u([me,fe,ge],(e=>{d=h(d,e," ")})),ie&&Ue?ie.createHTML(d):d},r.setConfig=function(){dt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),De=!0},r.clearConfig=function(){lt=null,De=!1},r.isValidAttribute=function(e,t,n){lt||dt({});const r=st(e),a=st(t);return Tt(r,a,n)},r.addHook=function(e,t){"function"==typeof t&&(pe[e]=pe[e]||[],p(pe[e],t))},r.removeHook=function(e){if(pe[e])return d(pe[e])},r.removeHooks=function(e){pe[e]&&(pe[e]=[])},r.removeAllHooks=function(){pe={}},r}()}()},252:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,a,i;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(!e(t[a],n[a]))return!1;return!0}if(t instanceof Map&&n instanceof Map){if(t.size!==n.size)return!1;for(a of t.entries())if(!n.has(a[0]))return!1;for(a of t.entries())if(!e(a[1],n.get(a[0])))return!1;return!0}if(t instanceof Set&&n instanceof Set){if(t.size!==n.size)return!1;for(a of t.entries())if(!n.has(a[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(n)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(t[a]!==n[a])return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(i=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(a=r;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,i[a]))return!1;for(a=r;0!=a--;){var o=i[a];if(!e(t[o],n[o]))return!1}return!0}return t!=t&&n!=n}},774:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,a,i;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(!e(t[a],n[a]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(i=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(a=r;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,i[a]))return!1;for(a=r;0!=a--;){var o=i[a];if(!("_owner"===o&&t.$$typeof||e(t[o],n[o])))return!1}return!0}return t!=t&&n!=n}},531:function(e,t){var n,r;void 0===(r="function"==typeof(n=e=>{"use strict";var t=(e,t)=>{if(e===T)return T;var n=e.target,r=n.length,a=e._indexes;a=a.slice(0,a.len).sort(((e,t)=>e-t));for(var i="",o=0,s=0,l=!1,c=(e=[],0);c<r;++c){var u=n[c];if(a[s]===c){if(++s,l||(l=!0,e.push(i),i=""),s===a.length){i+=u,e.push(t(i,o++)),i="",e.push(n.substr(c+1));break}}else l&&(l=!1,e.push(t(i,o++)),i="");i+=u}return e},n=e=>{"string"!=typeof e&&(e="");var t=c(e);return{target:e,_targetLower:t._lower,_targetLowerCodes:t.lowerCodes,_nextBeginningIndexes:T,_bitflags:t.bitflags,score:T,_indexes:[0],obj:T}},r=e=>{"string"!=typeof e&&(e=""),e=e.trim();var t=c(e),n=[];if(t.containsSpace){var r=e.split(/\s+/);r=[...new Set(r)];for(var a=0;a<r.length;a++)if(""!==r[a]){var i=c(r[a]);n.push({lowerCodes:i.lowerCodes,_lower:r[a].toLowerCase(),containsSpace:!1})}}return{lowerCodes:t.lowerCodes,bitflags:t.bitflags,containsSpace:t.containsSpace,_lower:t._lower,spaceSearches:n}},a=e=>{if(e.length>999)return n(e);var t=d.get(e);return void 0!==t||(t=n(e),d.set(e,t)),t},i=e=>{if(e.length>999)return r(e);var t=p.get(e);return void 0!==t||(t=r(e),p.set(e,t)),t},o=(e,t,n)=>{var r=[];r.total=t.length;var i=n&&n.limit||v;if(n&&n.key)for(var o=0;o<t.length;o++){var s=t[o];if(d=h(s,n.key)){b(d)||(d=a(d)),d.score=y,d._indexes.len=0;var l=d;if(l={target:l.target,_targetLower:"",_targetLowerCodes:T,_nextBeginningIndexes:T,_bitflags:0,score:d.score,_indexes:T,obj:s},r.push(l),r.length>=i)return r}}else if(n&&n.keys)for(o=0;o<t.length;o++){s=t[o];for(var c=new Array(n.keys.length),u=n.keys.length-1;u>=0;--u)(d=h(s,n.keys[u]))?(b(d)||(d=a(d)),d.score=y,d._indexes.len=0,c[u]=d):c[u]=T;if(c.obj=s,c.score=y,r.push(c),r.length>=i)return r}else for(o=0;o<t.length;o++){var d;if((d=t[o])&&(b(d)||(d=a(d)),d.score=y,d._indexes.len=0,r.push(d),r.length>=i))return r}return r},s=(e,t,n=!1)=>{if(!1===n&&e.containsSpace)return l(e,t);for(var r=e._lower,a=e.lowerCodes,i=a[0],o=t._targetLowerCodes,s=a.length,c=o.length,d=0,p=0,g=0;;){if(i===o[p]){if(m[g++]=p,++d===s)break;i=a[d]}if(++p>=c)return T}d=0;var h=!1,b=0,v=t._nextBeginningIndexes;v===T&&(v=t._nextBeginningIndexes=u(t.target));var y=0;if((p=0===m[0]?0:v[m[0]-1])!==c)for(;;)if(p>=c){if(d<=0)break;if(++y>200)break;--d,p=v[f[--b]]}else if(a[d]===o[p]){if(f[b++]=p,++d===s){h=!0;break}++p}else p=v[p];var _=t._targetLower.indexOf(r,m[0]),w=~_;if(w&&!h)for(var k=0;k<g;++k)m[k]=_+k;var x=!1;if(w&&(x=t._nextBeginningIndexes[_-1]===_),h)var E=f,S=b;else E=m,S=g;var C=0,A=0;for(k=1;k<s;++k)E[k]-E[k-1]!=1&&(C-=E[k],++A);if(C-=(E[s-1]-E[0]-(s-1)+12)*A,0!==E[0]&&(C-=E[0]*E[0]*.2),h){var N=1;for(k=v[0];k<c;k=v[k])++N;N>24&&(C*=10*(N-24))}else C*=1e3;for(w&&(C/=1+s*s*1),x&&(C/=1+s*s*1),C-=c-s,t.score=C,k=0;k<S;++k)t._indexes[k]=E[k];return t._indexes.len=S,t},l=(e,t)=>{for(var n=new Set,r=0,a=T,i=0,o=e.spaceSearches,l=0;l<o.length;++l){var c=o[l];if((a=s(c,t))===T)return T;r+=a.score,a._indexes[0]<i&&(r-=i-a._indexes[0]),i=a._indexes[0];for(var u=0;u<a._indexes.len;++u)n.add(a._indexes[u])}var d=s(e,t,!0);if(d!==T&&d.score>r)return d;a.score=r,l=0;for(let e of n)a._indexes[l++]=e;return a._indexes.len=l,a},c=e=>{for(var t=e.length,n=e.toLowerCase(),r=[],a=0,i=!1,o=0;o<t;++o){var s=r[o]=n.charCodeAt(o);32!==s?a|=1<<(s>=97&&s<=122?s-97:s>=48&&s<=57?26:s<=127?30:31):i=!0}return{lowerCodes:r,bitflags:a,containsSpace:i,_lower:n}},u=e=>{for(var t=e.length,n=(e=>{for(var t=e.length,n=[],r=0,a=!1,i=!1,o=0;o<t;++o){var s=e.charCodeAt(o),l=s>=65&&s<=90,c=l||s>=97&&s<=122||s>=48&&s<=57,u=l&&!a||!i||!c;a=l,i=c,u&&(n[r++]=o)}return n})(e),r=[],a=n[0],i=0,o=0;o<t;++o)a>o?r[o]=a:(a=n[++i],r[o]=void 0===a?t:a);return r},d=new Map,p=new Map,m=[],f=[],g=e=>{for(var t=y,n=e.length,r=0;r<n;++r){var a=e[r];if(a!==T){var i=a.score;i>t&&(t=i)}}return t===y?T:t},h=(e,t)=>{var n=e[t];if(void 0!==n)return n;var r=t;Array.isArray(t)||(r=t.split("."));for(var a=r.length,i=-1;e&&++i<a;)e=e[r[i]];return e},b=e=>"object"==typeof e,v=1/0,y=-v,_=[];_.total=0;var w,k,x,E,T=null,S=(w=[],k=0,E=e=>{for(var t=0,n=w[t],r=1;r<k;){var a=r+1;t=r,a<k&&w[a].score<w[r].score&&(t=a),w[t-1>>1]=w[t],r=1+(t<<1)}for(var i=t-1>>1;t>0&&n.score<w[i].score;i=(t=i)-1>>1)w[t]=w[i];w[t]=n},(x={}).add=e=>{var t=k;w[k++]=e;for(var n=t-1>>1;t>0&&e.score<w[n].score;n=(t=n)-1>>1)w[t]=w[n];w[t]=e},x.poll=e=>{if(0!==k){var t=w[0];return w[0]=w[--k],E(),t}},x.peek=e=>{if(0!==k)return w[0]},x.replaceTop=e=>{w[0]=e,E()},x);return{single:(e,t)=>{if("farzher"==e)return{target:"farzher was here (^-^*)/",score:0,_indexes:[0]};if(!e||!t)return T;var n=i(e);b(t)||(t=a(t));var r=n.bitflags;return(r&t._bitflags)!==r?T:s(n,t)},go:(e,t,n)=>{if("farzher"==e)return[{target:"farzher was here (^-^*)/",score:0,_indexes:[0],obj:t?t[0]:T}];if(!e)return n&&n.all?o(e,t,n):_;var r=i(e),l=r.bitflags,c=(r.containsSpace,n&&n.threshold||y),u=n&&n.limit||v,d=0,p=0,m=t.length;if(n&&n.key)for(var f=n.key,w=0;w<m;++w){var k=t[w];(O=h(k,f))&&(b(O)||(O=a(O)),(l&O._bitflags)===l&&(I=s(r,O))!==T&&(I.score<c||(I={target:I.target,_targetLower:"",_targetLowerCodes:T,_nextBeginningIndexes:T,_bitflags:0,score:I.score,_indexes:I._indexes,obj:k},d<u?(S.add(I),++d):(++p,I.score>S.peek().score&&S.replaceTop(I)))))}else if(n&&n.keys){var x=n.scoreFn||g,E=n.keys,C=E.length;for(w=0;w<m;++w){k=t[w];for(var A=new Array(C),N=0;N<C;++N)f=E[N],(O=h(k,f))?(b(O)||(O=a(O)),(l&O._bitflags)!==l?A[N]=T:A[N]=s(r,O)):A[N]=T;A.obj=k;var P=x(A);P!==T&&(P<c||(A.score=P,d<u?(S.add(A),++d):(++p,P>S.peek().score&&S.replaceTop(A))))}}else for(w=0;w<m;++w){var O,I;(O=t[w])&&(b(O)||(O=a(O)),(l&O._bitflags)===l&&(I=s(r,O))!==T&&(I.score<c||(d<u?(S.add(I),++d):(++p,I.score>S.peek().score&&S.replaceTop(I)))))}if(0===d)return _;var L=new Array(d);for(w=d-1;w>=0;--w)L[w]=S.poll();return L.total=d+p,L},highlight:(e,n,r)=>{if("function"==typeof n)return t(e,n);if(e===T)return T;void 0===n&&(n="<b>"),void 0===r&&(r="</b>");var a="",i=0,o=!1,s=e.target,l=s.length,c=e._indexes;c=c.slice(0,c.len).sort(((e,t)=>e-t));for(var u=0;u<l;++u){var d=s[u];if(c[i]===u){if(o||(o=!0,a+=n),++i===c.length){a+=d+r+s.substr(u+1);break}}else o&&(o=!1,a+=r);a+=d}return a},prepare:n,indexes:e=>e._indexes.slice(0,e._indexes.len).sort(((e,t)=>e-t)),cleanup:()=>{d.clear(),p.clear(),m=[],f=[]}}})?n.apply(t,[]):n)||(e.exports=r)},717:e=>{e.exports=function(e){var t=function(n,r,a){var i=n.splice(0,50);a=(a=a||[]).concat(e.add(i)),n.length>0?setTimeout((function(){t(n,r,a)}),1):(e.update(),r(a))};return t}},249:e=>{e.exports=function(e){return e.handlers.filterStart=e.handlers.filterStart||[],e.handlers.filterComplete=e.handlers.filterComplete||[],function(t){if(e.trigger("filterStart"),e.i=1,e.reset.filter(),void 0===t)e.filtered=!1;else{e.filtered=!0;for(var n=e.items,r=0,a=n.length;r<a;r++){var i=n[r];t(i)?i.filtered=!0:i.filtered=!1}}return e.update(),e.trigger("filterComplete"),e.visibleItems}}},844:(e,t,n)=>{n(981);var r=n(332),a=n(433),i=n(340),o=n(378),s=n(481);e.exports=function(e,t){t=a({location:0,distance:100,threshold:.4,multiSearch:!0,searchClass:"fuzzy-search"},t=t||{});var n={search:function(r,a){for(var i=t.multiSearch?r.replace(/ +$/,"").split(/ +/):[r],o=0,s=e.items.length;o<s;o++)n.item(e.items[o],a,i)},item:function(e,t,r){for(var a=!0,i=0;i<r.length;i++){for(var o=!1,s=0,l=t.length;s<l;s++)n.values(e.values(),t[s],r[i])&&(o=!0);o||(a=!1)}e.found=a},values:function(e,n,r){if(e.hasOwnProperty(n)){var a=i(e[n]).toLowerCase();if(s(a,r,t))return!0}return!1}};return r.bind(o(e.listContainer,t.searchClass),"keyup",e.utils.events.debounce((function(t){var r=t.target||t.srcElement;e.search(r.value,n.search)}),e.searchDelay)),function(t,r){e.search(t,r,n.search)}}},799:(e,t,n)=>{var r=n(813),a=n(378),i=n(433),o=n(859),s=n(332),l=n(340),c=n(981),u=n(200),d=n(212);e.exports=function(e,t,p){var m,f=this,g=n(608)(f),h=n(717)(f),b=n(195)(f);m={start:function(){f.listClass="list",f.searchClass="search",f.sortClass="sort",f.page=1e4,f.i=1,f.items=[],f.visibleItems=[],f.matchingItems=[],f.searched=!1,f.filtered=!1,f.searchColumns=void 0,f.searchDelay=0,f.handlers={updated:[]},f.valueNames=[],f.utils={getByClass:a,extend:i,indexOf:o,events:s,toString:l,naturalSort:r,classes:c,getAttribute:u,toArray:d},f.utils.extend(f,t),f.listContainer="string"==typeof e?document.getElementById(e):e,f.listContainer&&(f.list=a(f.listContainer,f.listClass,!0),f.parse=n(672)(f),f.templater=n(939)(f),f.search=n(647)(f),f.filter=n(249)(f),f.sort=n(343)(f),f.fuzzySearch=n(844)(f,t.fuzzySearch),this.handlers(),this.items(),this.pagination(),f.update())},handlers:function(){for(var e in f.handlers)f[e]&&f.handlers.hasOwnProperty(e)&&f.on(e,f[e])},items:function(){f.parse(f.list),void 0!==p&&f.add(p)},pagination:function(){if(void 0!==t.pagination){!0===t.pagination&&(t.pagination=[{}]),void 0===t.pagination[0]&&(t.pagination=[t.pagination]);for(var e=0,n=t.pagination.length;e<n;e++)b(t.pagination[e])}}},this.reIndex=function(){f.items=[],f.visibleItems=[],f.matchingItems=[],f.searched=!1,f.filtered=!1,f.parse(f.list)},this.toJSON=function(){for(var e=[],t=0,n=f.items.length;t<n;t++)e.push(f.items[t].values());return e},this.add=function(e,t){if(0!==e.length){if(!t){var n=[],r=!1;void 0===e[0]&&(e=[e]);for(var a=0,i=e.length;a<i;a++){var o;r=f.items.length>f.page,o=new g(e[a],void 0,r),f.items.push(o),n.push(o)}return f.update(),n}h(e.slice(0),t)}},this.show=function(e,t){return this.i=e,this.page=t,f.update(),f},this.remove=function(e,t,n){for(var r=0,a=0,i=f.items.length;a<i;a++)f.items[a].values()[e]==t&&(f.templater.remove(f.items[a],n),f.items.splice(a,1),i--,a--,r++);return f.update(),r},this.get=function(e,t){for(var n=[],r=0,a=f.items.length;r<a;r++){var i=f.items[r];i.values()[e]==t&&n.push(i)}return n},this.size=function(){return f.items.length},this.clear=function(){return f.templater.clear(),f.items=[],f},this.on=function(e,t){return f.handlers[e].push(t),f},this.off=function(e,t){var n=f.handlers[e],r=o(n,t);return r>-1&&n.splice(r,1),f},this.trigger=function(e){for(var t=f.handlers[e].length;t--;)f.handlers[e][t](f);return f},this.reset={filter:function(){for(var e=f.items,t=e.length;t--;)e[t].filtered=!1;return f},search:function(){for(var e=f.items,t=e.length;t--;)e[t].found=!1;return f}},this.update=function(){var e=f.items,t=e.length;f.visibleItems=[],f.matchingItems=[],f.templater.clear();for(var n=0;n<t;n++)e[n].matching()&&f.matchingItems.length+1>=f.i&&f.visibleItems.length<f.page?(e[n].show(),f.visibleItems.push(e[n]),f.matchingItems.push(e[n])):e[n].matching()?(f.matchingItems.push(e[n]),e[n].hide()):e[n].hide();return f.trigger("updated"),f},m.start()}},608:e=>{e.exports=function(e){return function(t,n,r){var a=this;this._values={},this.found=!1,this.filtered=!1,this.values=function(t,n){if(void 0===t)return a._values;for(var r in t)a._values[r]=t[r];!0!==n&&e.templater.set(a,a.values())},this.show=function(){e.templater.show(a)},this.hide=function(){e.templater.hide(a)},this.matching=function(){return e.filtered&&e.searched&&a.found&&a.filtered||e.filtered&&!e.searched&&a.filtered||!e.filtered&&e.searched&&a.found||!e.filtered&&!e.searched},this.visible=function(){return!(!a.elm||a.elm.parentNode!=e.list)},function(t,n,r){if(void 0===n)r?a.values(t,r):a.values(t);else{a.elm=n;var i=e.templater.get(a,t);a.values(i)}}(t,n,r)}}},195:(e,t,n)=>{var r=n(981),a=n(332),i=n(799);e.exports=function(e){var t=!1,n=function(n,a){if(e.page<1)return e.listContainer.style.display="none",void(t=!0);t&&(e.listContainer.style.display="block");var i,s=e.matchingItems.length,l=e.i,c=e.page,u=Math.ceil(s/c),d=Math.ceil(l/c),p=a.innerWindow||2,m=a.left||a.outerWindow||0,f=a.right||a.outerWindow||0;f=u-f,n.clear();for(var g=1;g<=u;g++){var h=d===g?"active":"";o.number(g,m,f,d,p)?(i=n.add({page:g,dotted:!1})[0],h&&r(i.elm).add(h),i.elm.firstChild.setAttribute("data-i",g),i.elm.firstChild.setAttribute("data-page",c)):o.dotted(n,g,m,f,d,p,n.size())&&(i=n.add({page:"...",dotted:!0})[0],r(i.elm).add("disabled"))}},o={number:function(e,t,n,r,a){return this.left(e,t)||this.right(e,n)||this.innerWindow(e,r,a)},left:function(e,t){return e<=t},right:function(e,t){return e>t},innerWindow:function(e,t,n){return e>=t-n&&e<=t+n},dotted:function(e,t,n,r,a,i,o){return this.dottedLeft(e,t,n,r,a,i)||this.dottedRight(e,t,n,r,a,i,o)},dottedLeft:function(e,t,n,r,a,i){return t==n+1&&!this.innerWindow(t,a,i)&&!this.right(t,r)},dottedRight:function(e,t,n,r,a,i,o){return!e.items[o-1].values().dotted&&t==r&&!this.innerWindow(t,a,i)&&!this.right(t,r)}};return function(t){var r=new i(e.listContainer.id,{listClass:t.paginationClass||"pagination",item:t.item||"<li><a class='page' href='#'></a></li>",valueNames:["page","dotted"],searchClass:"pagination-search-that-is-not-supposed-to-exist",sortClass:"pagination-sort-that-is-not-supposed-to-exist"});a.bind(r.listContainer,"click",(function(t){var n=t.target||t.srcElement,r=e.utils.getAttribute(n,"data-page"),a=e.utils.getAttribute(n,"data-i");a&&e.show((a-1)*r+1,r)})),e.on("updated",(function(){n(r,t)})),n(r,t)}}},672:(e,t,n)=>{e.exports=function(e){var t=n(608)(e),r=function(n,r){for(var a=0,i=n.length;a<i;a++)e.items.push(new t(r,n[a]))},a=function(t,n){var i=t.splice(0,50);r(i,n),t.length>0?setTimeout((function(){a(t,n)}),1):(e.update(),e.trigger("parseComplete"))};return e.handlers.parseComplete=e.handlers.parseComplete||[],function(){var t=function(e){for(var t=e.childNodes,n=[],r=0,a=t.length;r<a;r++)void 0===t[r].data&&n.push(t[r]);return n}(e.list),n=e.valueNames;e.indexAsync?a(t,n):r(t,n)}}},647:e=>{e.exports=function(e){var t,n,r,a={resetList:function(){e.i=1,e.templater.clear(),r=void 0},setOptions:function(e){2==e.length&&e[1]instanceof Array?t=e[1]:2==e.length&&"function"==typeof e[1]?(t=void 0,r=e[1]):3==e.length?(t=e[1],r=e[2]):t=void 0},setColumns:function(){0!==e.items.length&&void 0===t&&(t=void 0===e.searchColumns?a.toArray(e.items[0].values()):e.searchColumns)},setSearchString:function(t){t=(t=e.utils.toString(t).toLowerCase()).replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),n=t},toArray:function(e){var t=[];for(var n in e)t.push(n);return t}},i=function(i){return e.trigger("searchStart"),a.resetList(),a.setSearchString(i),a.setOptions(arguments),a.setColumns(),""===n?(e.reset.search(),e.searched=!1):(e.searched=!0,r?r(n,t):function(){for(var r,a=[],i=n;null!==(r=i.match(/"([^"]+)"/));)a.push(r[1]),i=i.substring(0,r.index)+i.substring(r.index+r[0].length);(i=i.trim()).length&&(a=a.concat(i.split(/\s+/)));for(var o=0,s=e.items.length;o<s;o++){var l=e.items[o];if(l.found=!1,a.length){for(var c=0,u=a.length;c<u;c++){for(var d=!1,p=0,m=t.length;p<m;p++){var f=l.values(),g=t[p];if(f.hasOwnProperty(g)&&void 0!==f[g]&&null!==f[g]&&-1!==("string"!=typeof f[g]?f[g].toString():f[g]).toLowerCase().indexOf(a[c])){d=!0;break}}if(!d)break}l.found=d}}}()),e.update(),e.trigger("searchComplete"),e.visibleItems};return e.handlers.searchStart=e.handlers.searchStart||[],e.handlers.searchComplete=e.handlers.searchComplete||[],e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"keyup",e.utils.events.debounce((function(t){var n=t.target||t.srcElement;""===n.value&&!e.searched||i(n.value)}),e.searchDelay)),e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"input",(function(e){""===(e.target||e.srcElement).value&&i("")})),i}},343:e=>{e.exports=function(e){var t={els:void 0,clear:function(){for(var n=0,r=t.els.length;n<r;n++)e.utils.classes(t.els[n]).remove("asc"),e.utils.classes(t.els[n]).remove("desc")},getOrder:function(t){var n=e.utils.getAttribute(t,"data-order");return"asc"==n||"desc"==n?n:e.utils.classes(t).has("desc")?"asc":e.utils.classes(t).has("asc")?"desc":"asc"},getInSensitive:function(t,n){var r=e.utils.getAttribute(t,"data-insensitive");n.insensitive="false"!==r},setOrder:function(n){for(var r=0,a=t.els.length;r<a;r++){var i=t.els[r];if(e.utils.getAttribute(i,"data-sort")===n.valueName){var o=e.utils.getAttribute(i,"data-order");"asc"==o||"desc"==o?o==n.order&&e.utils.classes(i).add(n.order):e.utils.classes(i).add(n.order)}}}},n=function(){e.trigger("sortStart");var n={},r=arguments[0].currentTarget||arguments[0].srcElement||void 0;r?(n.valueName=e.utils.getAttribute(r,"data-sort"),t.getInSensitive(r,n),n.order=t.getOrder(r)):((n=arguments[1]||n).valueName=arguments[0],n.order=n.order||"asc",n.insensitive=void 0===n.insensitive||n.insensitive),t.clear(),t.setOrder(n);var a,i=n.sortFunction||e.sortFunction||null,o="desc"===n.order?-1:1;a=i?function(e,t){return i(e,t,n)*o}:function(t,r){var a=e.utils.naturalSort;return a.alphabet=e.alphabet||n.alphabet||void 0,!a.alphabet&&n.insensitive&&(a=e.utils.naturalSort.caseInsensitive),a(t.values()[n.valueName],r.values()[n.valueName])*o},e.items.sort(a),e.update(),e.trigger("sortComplete")};return e.handlers.sortStart=e.handlers.sortStart||[],e.handlers.sortComplete=e.handlers.sortComplete||[],t.els=e.utils.getByClass(e.listContainer,e.sortClass),e.utils.events.bind(t.els,"click",n),e.on("searchStart",t.clear),e.on("filterStart",t.clear),n}},939:e=>{var t=function(e){var t,n=this,r=function(e){if("string"==typeof e){if(/<tr[\s>]/g.exec(e)){var t=document.createElement("tbody");return t.innerHTML=e,t.firstElementChild}if(-1!==e.indexOf("<")){var n=document.createElement("div");return n.innerHTML=e,n.firstElementChild}}},a=function(t,n,r){var a=void 0,i=function(t){for(var n=0,r=e.valueNames.length;n<r;n++){var a=e.valueNames[n];if(a.data){for(var i=a.data,o=0,s=i.length;o<s;o++)if(i[o]===t)return{data:t}}else{if(a.attr&&a.name&&a.name==t)return a;if(a===t)return t}}}(n);i&&(i.data?t.elm.setAttribute("data-"+i.data,r):i.attr&&i.name?(a=e.utils.getByClass(t.elm,i.name,!0))&&a.setAttribute(i.attr,r):(a=e.utils.getByClass(t.elm,i,!0))&&(a.innerHTML=r))};this.get=function(t,r){n.create(t);for(var a={},i=0,o=r.length;i<o;i++){var s=void 0,l=r[i];if(l.data)for(var c=0,u=l.data.length;c<u;c++)a[l.data[c]]=e.utils.getAttribute(t.elm,"data-"+l.data[c]);else l.attr&&l.name?(s=e.utils.getByClass(t.elm,l.name,!0),a[l.name]=s?e.utils.getAttribute(s,l.attr):""):(s=e.utils.getByClass(t.elm,l,!0),a[l]=s?s.innerHTML:"")}return a},this.set=function(e,t){if(!n.create(e))for(var r in t)t.hasOwnProperty(r)&&a(e,r,t[r])},this.create=function(e){return void 0===e.elm&&(e.elm=t(e.values()),n.set(e,e.values()),!0)},this.remove=function(t){t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.show=function(t){n.create(t),e.list.appendChild(t.elm)},this.hide=function(t){void 0!==t.elm&&t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.clear=function(){if(e.list.hasChildNodes())for(;e.list.childNodes.length>=1;)e.list.removeChild(e.list.firstChild)},function(){var n;if("function"!=typeof e.item){if(!(n="string"==typeof e.item?-1===e.item.indexOf("<")?document.getElementById(e.item):r(e.item):function(){for(var t=e.list.childNodes,n=0,r=t.length;n<r;n++)if(void 0===t[n].data)return t[n].cloneNode(!0)}()))throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");n=function(t,n){var r=t.cloneNode(!0);r.removeAttribute("id");for(var a=0,i=n.length;a<i;a++){var o=void 0,s=n[a];if(s.data)for(var l=0,c=s.data.length;l<c;l++)r.setAttribute("data-"+s.data[l],"");else s.attr&&s.name?(o=e.utils.getByClass(r,s.name,!0))&&o.setAttribute(s.attr,""):(o=e.utils.getByClass(r,s,!0))&&(o.innerHTML="")}return r}(n,e.valueNames),t=function(){return n.cloneNode(!0)}}else t=function(t){var n=e.item(t);return r(n)}}()};e.exports=function(e){return new t(e)}},981:(e,t,n)=>{var r=n(859),a=/\s+/;function i(e){if(!e||!e.nodeType)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}Object.prototype.toString,e.exports=function(e){return new i(e)},i.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array();return~r(t,e)||t.push(e),this.el.className=t.join(" "),this},i.prototype.remove=function(e){if(this.list)return this.list.remove(e),this;var t=this.array(),n=r(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},i.prototype.toggle=function(e,t){return this.list?(void 0!==t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):(void 0!==t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},i.prototype.array=function(){var e=(this.el.getAttribute("class")||"").replace(/^\s+|\s+$/g,"").split(a);return""===e[0]&&e.shift(),e},i.prototype.has=i.prototype.contains=function(e){return this.list?this.list.contains(e):!!~r(this.array(),e)}},332:(e,t,n)=>{var r=window.addEventListener?"addEventListener":"attachEvent",a=window.removeEventListener?"removeEventListener":"detachEvent",i="addEventListener"!==r?"on":"",o=n(212);t.bind=function(e,t,n,a){for(var s=0,l=(e=o(e)).length;s<l;s++)e[s][r](i+t,n,a||!1)},t.unbind=function(e,t,n,r){for(var s=0,l=(e=o(e)).length;s<l;s++)e[s][a](i+t,n,r||!1)},t.debounce=function(e,t,n){var r;return t?function(){var a=this,i=arguments,o=n&&!r;clearTimeout(r),r=setTimeout((function(){r=null,n||e.apply(a,i)}),t),o&&e.apply(a,i)}:e}},433:e=>{e.exports=function(e){for(var t,n=Array.prototype.slice.call(arguments,1),r=0;t=n[r];r++)if(t)for(var a in t)e[a]=t[a];return e}},481:e=>{e.exports=function(e,t,n){var r=n.location||0,a=n.distance||100,i=n.threshold||.4;if(t===e)return!0;if(t.length>32)return!1;var o=r,s=function(){var e,n={};for(e=0;e<t.length;e++)n[t.charAt(e)]=0;for(e=0;e<t.length;e++)n[t.charAt(e)]|=1<<t.length-e-1;return n}();function l(e,n){var r=e/t.length,i=Math.abs(o-n);return a?r+i/a:i?1:r}var c=i,u=e.indexOf(t,o);-1!=u&&(c=Math.min(l(0,u),c),-1!=(u=e.lastIndexOf(t,o+t.length))&&(c=Math.min(l(0,u),c)));var d,p,m=1<<t.length-1;u=-1;for(var f,g=t.length+e.length,h=0;h<t.length;h++){for(d=0,p=g;d<p;)l(h,o+p)<=c?d=p:g=p,p=Math.floor((g-d)/2+d);g=p;var b=Math.max(1,o-p+1),v=Math.min(o+p,e.length)+t.length,y=Array(v+2);y[v+1]=(1<<h)-1;for(var _=v;_>=b;_--){var w=s[e.charAt(_-1)];if(y[_]=0===h?(y[_+1]<<1|1)&w:(y[_+1]<<1|1)&w|(f[_+1]|f[_])<<1|1|f[_+1],y[_]&m){var k=l(h,_-1);if(k<=c){if(c=k,!((u=_-1)>o))break;b=Math.max(1,2*o-u)}}}if(l(h+1,o)>c)break;f=y}return!(u<0)}},200:e=>{e.exports=function(e,t){var n=e.getAttribute&&e.getAttribute(t)||null;if(!n)for(var r=e.attributes,a=r.length,i=0;i<a;i++)void 0!==r[i]&&r[i].nodeName===t&&(n=r[i].nodeValue);return n}},378:e=>{e.exports=function(e,t,n,r){return(r=r||{}).test&&r.getElementsByClassName||!r.test&&document.getElementsByClassName?function(e,t,n){return n?e.getElementsByClassName(t)[0]:e.getElementsByClassName(t)}(e,t,n):r.test&&r.querySelector||!r.test&&document.querySelector?function(e,t,n){return t="."+t,n?e.querySelector(t):e.querySelectorAll(t)}(e,t,n):function(e,t,n){for(var r=[],a=e.getElementsByTagName("*"),i=a.length,o=new RegExp("(^|\\s)"+t+"(\\s|$)"),s=0,l=0;s<i;s++)if(o.test(a[s].className)){if(n)return a[s];r[l]=a[s],l++}return r}(e,t,n)}},859:e=>{var t=[].indexOf;e.exports=function(e,n){if(t)return e.indexOf(n);for(var r=0,a=e.length;r<a;++r)if(e[r]===n)return r;return-1}},212:e=>{e.exports=function(e){if(void 0===e)return[];if(null===e)return[null];if(e===window)return[window];if("string"==typeof e)return[e];if(function(e){return"[object Array]"===Object.prototype.toString.call(e)}(e))return e;if("number"!=typeof e.length)return[e];if("function"==typeof e&&e instanceof Function)return[e];for(var t=[],n=0,r=e.length;n<r;n++)(Object.prototype.hasOwnProperty.call(e,n)||n in e)&&t.push(e[n]);return t.length?t:[]}},340:e=>{e.exports=function(e){return(e=null===(e=void 0===e?"":e)?"":e).toString()}},813:e=>{"use strict";var t,n,r=0;function a(e){return e>=48&&e<=57}function i(e,t){for(var i=(e+="").length,o=(t+="").length,s=0,l=0;s<i&&l<o;){var c=e.charCodeAt(s),u=t.charCodeAt(l);if(a(c)){if(!a(u))return c-u;for(var d=s,p=l;48===c&&++d<i;)c=e.charCodeAt(d);for(;48===u&&++p<o;)u=t.charCodeAt(p);for(var m=d,f=p;m<i&&a(e.charCodeAt(m));)++m;for(;f<o&&a(t.charCodeAt(f));)++f;var g=m-d-f+p;if(g)return g;for(;d<m;)if(g=e.charCodeAt(d++)-t.charCodeAt(p++))return g;s=m,l=f}else{if(c!==u)return c<r&&u<r&&-1!==n[c]&&-1!==n[u]?n[c]-n[u]:c-u;++s,++l}}return s>=i&&l<o&&i>=o?-1:l>=o&&s<i&&o>=i?1:i-o}i.caseInsensitive=i.i=function(e,t){return i((""+e).toLowerCase(),(""+t).toLowerCase())},Object.defineProperties(i,{alphabet:{get:function(){return t},set:function(e){n=[];var a=0;if(t=e)for(;a<t.length;a++)n[t.charCodeAt(a)]=a;for(r=n.length,a=0;a<r;a++)void 0===n[a]&&(n[a]=-1)}}}),e.exports=i}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.data,t=window.wp.dataControls,r=window.wp.apiFetch;var a=n.n(r);const i=window.wp.url,o={state:{},blocks:[],blockKeywords:[]},s={getBlocks:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getBlocks"});return t&&t.length&&e({type:"SET_BLOCKS",payload:t}),t},getBlockKeywords:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getBlockKeywords"});return t&&t.length&&e({type:"SET_BLOCKS_KEYWORDS",payload:t}),t}},l={loadFullBlocks:e=>async({dispatch:t})=>{if(!e.length)return;const n=await a()({path:(0,i.addQueryArgs)("boldblocks/v1/getFullBlockData",{blockIds:e.join(",")})});return n&&n.length&&t({type:"UPDATE_BLOCKS",payload:n}),n},setBlockLibraryState:e=>({type:"UPDATE_BLOCK_LIBRARY_STATE",payload:e})},c={state:{},variations:[],variationKeywords:[]},u={getVariations:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getVariations"});return t&&t.length&&e({type:"SET_VARIATIONS",payload:t}),t},getVariationKeywords:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getVariationKeywords"});return t&&t.length&&e({type:"SET_VARIATIONS_KEYWORDS",payload:t}),t}},d={loadFullVariations:e=>async({dispatch:t})=>{if(!e.length)return;const n=await a()({path:(0,i.addQueryArgs)("boldblocks/v1/getFullVariationData",{variationIds:e.join(",")})});return n&&n.length&&t({type:"UPDATE_VARIATIONS",payload:n}),n},setVariationLibraryState:e=>({type:"UPDATE_VARIATION_LIBRARY_STATE",payload:e})},p={status:!1,state:{},patterns:[],patternKeywords:[],plugins:[]},m={getPatterns:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getPatterns"});return t&&t.length&&e({type:"SET_PATTERNS",payload:t}),t},getPatternKeywords:()=>async({dispatch:e})=>{const t=await a()({path:"boldblocks/v1/getPatternKeywords"});return t&&t.length&&e({type:"SET_PATTERN_KEYWORDS",payload:t}),t},getPlugins:()=>async({dispatch:e})=>{let t=await a()({path:"wp/v2/plugins"});t=t.map((e=>{const{plugin:t}=e,n=t.split("/")[0];return{...e,slug:n}})),e({type:"SET_PLUGINS",payload:t})}},f={setPatternInserterModalStatus:e=>({type:"SET_PATTERN_INSERTER_MODAL_STATUS",payload:e}),loadFullPatterns:e=>async({dispatch:t})=>{if(!e.length)return;const n=await a()({path:(0,i.addQueryArgs)("boldblocks/v1/getFullPatternData",{patternIds:e.join(",")})});return n&&n.length&&t({type:"UPDATE_PATTERNS",payload:n}),n},setPatternLibraryState:e=>({type:"UPDATE_PATTERN_INSERTER_MODAL_STATE",payload:e})},g="boldblocks/block-library",h=(0,e.createReduxStore)(g,{selectors:{getBlocks:e=>e.blockLibrary.blocks,getBlockLibraryState:e=>e.blockLibrary.state,getBlockKeywords:e=>e.blockLibrary.blockKeywords,getVariations:e=>e.variationLibrary.variations,getVariationLibraryState:e=>e.variationLibrary.state,getVariationKeywords:e=>e.variationLibrary.variationKeywords,getPatternInserterModalStatus:e=>e.patternLibrary.status,getPatterns:e=>e.patternLibrary.patterns,getPatternLibraryState:e=>e.patternLibrary.state,getPatternKeywords:e=>e.patternLibrary.patternKeywords,getPlugins:e=>e.patternLibrary.plugins},actions:{...l,...d,...f},controls:t.controls,reducer:(0,e.combineReducers)({blockLibrary:(e=o,t)=>{switch(t.type){case"SET_BLOCKS":return{...e,blocks:[...t.payload]};case"UPDATE_BLOCKS":const n=t.payload.map((({id:e})=>e)),r=e.blocks.map((e=>{if(n.includes(e.id)){const n=t.payload.find((({id:t})=>t===e.id));if(n)return n}return e}));return{...e,blocks:r};case"UPDATE_BLOCK_LIBRARY_STATE":return{...e,state:{...t.payload}};case"SET_BLOCKS_KEYWORDS":return{...e,blockKeywords:[...t.payload]}}return e},variationLibrary:(e=c,t)=>{switch(t.type){case"SET_VARIATIONS":return{...e,variations:[...t.payload]};case"UPDATE_VARIATIONS":const n=t.payload.map((({id:e})=>e)),r=e.variations.map((e=>{if(n.includes(e.id)){const n=t.payload.find((({id:t})=>t===e.id));if(n)return n}return e}));return{...e,variations:r};case"UPDATE_VARIATION_LIBRARY_STATE":return{...e,state:{...t.payload}};case"SET_VARIATIONS_KEYWORDS":return{...e,variationKeywords:[...t.payload]}}return e},patternLibrary:(e=p,t)=>{switch(t.type){case"SET_PATTERN_INSERTER_MODAL_STATUS":return{...e,status:t.payload};case"SET_PATTERNS":return{...e,patterns:[...t.payload]};case"UPDATE_PATTERNS":const n=t.payload.map((({id:e})=>e)),r=e.patterns.map((e=>{if(n.includes(e.id)){const n=t.payload.find((({id:t})=>t===e.id));if(n)return n}return e}));return{...e,patterns:r};case"UPDATE_PATTERN_INSERTER_MODAL_STATE":return{...e,state:{...t.payload}};case"SET_PATTERN_KEYWORDS":return{...e,patternKeywords:[...t.payload]};case"SET_PLUGINS":return{...e,plugins:[...t.payload]}}return e}}),resolvers:{...s,...u,...m}});(0,e.register)(h);const b=window.React,v=window.wp.i18n,y=window.wp.plugins,_=window.wp.element,w=window.wp.editor,k=window.wp.components;var x;function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},E.apply(this,arguments)}var T=function(e){return b.createElement("svg",E({xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 256 256"},e),x||(x=b.createElement("path",{d:"m78.97 138.062 15.601 4.948q-3.587 13.046-11.96 19.407-8.317 6.306-21.147 6.306-15.873 0-26.092-10.819-10.22-10.872-10.22-29.682 0-19.896 10.274-30.876Q45.7 86.309 62.443 86.309q14.624 0 23.756 8.645 5.437 5.108 8.155 14.677l-15.928 3.805q-1.413-6.197-5.926-9.785-4.457-3.587-10.872-3.587-8.861 0-14.406 6.36-5.49 6.36-5.49 20.602 0 15.113 5.436 21.528t14.134 6.415q6.414 0 11.035-4.078 4.621-4.076 6.633-12.828zm17.093-50.393h31.856q9.46 0 14.08.816 4.676.76 8.318 3.26 3.697 2.5 6.142 6.687 2.447 4.132 2.447 9.296 0 5.6-3.044 10.275-2.99 4.675-8.155 7.013 7.285 2.12 11.2 7.23 3.913 5.11 3.913 12.013 0 5.437-2.554 10.602-2.502 5.109-6.906 8.208-4.348 3.044-10.762 3.75-4.024.436-19.409.545H96.063zm16.092 13.264v18.429H122.7q9.406 0 11.69-.273 4.13-.488 6.469-2.826 2.391-2.391 2.391-6.251 0-3.698-2.066-5.98-2.011-2.338-6.034-2.828-2.392-.272-13.753-.272zm0 31.693v21.31h14.895q8.697 0 11.034-.489 3.589-.652 5.818-3.153 2.284-2.555 2.284-6.795 0-3.588-1.74-6.089-1.74-2.5-5.055-3.642-3.263-1.142-14.244-1.142zm51.94-44.957h31.855q9.46 0 14.08.816 4.676.76 8.318 3.26 3.697 2.5 6.142 6.687 2.447 4.132 2.447 9.296 0 5.6-3.043 10.275-2.991 4.675-8.156 7.013 7.285 2.12 11.2 7.23 3.913 5.11 3.913 12.013 0 5.437-2.554 10.602-2.502 5.109-6.904 8.208-4.35 3.044-10.765 3.75-4.023.436-19.407.545h-27.127zm16.09 13.264v18.429h10.546q9.406 0 11.69-.273 4.13-.488 6.469-2.826 2.391-2.391 2.391-6.251 0-3.698-2.066-5.98-2.011-2.338-6.034-2.828-2.392-.272-13.753-.272zm0 31.693v21.31h14.896q8.697 0 11.035-.489 3.588-.652 5.817-3.153 2.284-2.555 2.284-6.795 0-3.588-1.74-6.089-1.74-2.5-5.055-3.642-3.263-1.142-14.244-1.142z"})),b.createElement("path",{d:"M32.848 74.218q-10.705 0-15.349 3.08-5.212 3.461-5.211 12.543v23.351q0 11.027-9.288 12.378v3.892q9.289 1.406 9.288 12.486v23.134q0 8 3.909 11.569 4.53 4.163 16.651 4.163h1.474v-3.731h-.68q-8.043 0-11.328-2.325-3.738-2.594-3.737-9.891V141.84q-.001-10.324-10.706-14.378 10.706-3.838 10.706-14.27V90.165q0-6.433 2.773-9.083 3.23-3.08 12.291-3.08h.68v-3.784zm188.831 0v3.784h.68q9.062 0 12.29 3.08 2.774 2.65 2.774 9.083v23.027q.001 10.432 10.706 14.27-10.706 4.054-10.706 14.377v23.028q0 7.298-3.737 9.891-3.285 2.326-11.327 2.326h-.68v3.73h1.473q12.122 0 16.65-4.163 3.91-3.568 3.91-11.569v-23.134q0-11.08 9.288-12.486v-3.892q-9.289-1.35-9.288-12.378V89.841q0-9.082-5.211-12.543-4.643-3.08-15.35-3.08z",style:{strokeWidth:1.23703}}))};function S(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=S(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const C=function(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=S(e))&&(r&&(r+=" "),r+=t);return r},A=window.lodash;function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},N.apply(this,arguments)}function P(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var O=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,I=P((function(e){return O.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),L=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),R=Math.abs,M=String.fromCharCode,D=Object.assign;function B(e){return e.trim()}function z(e,t,n){return e.replace(t,n)}function F(e,t){return e.indexOf(t)}function U(e,t){return 0|e.charCodeAt(t)}function H(e,t,n){return e.slice(t,n)}function j(e){return e.length}function V(e){return e.length}function $(e,t){return t.push(e),e}var q=1,K=1,W=0,G=0,Y=0,X="";function Z(e,t,n,r,a,i,o){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:q,column:K,length:o,return:""}}function Q(e,t){return D(Z("",null,null,"",null,null,0),e,{length:-e.length},t)}function J(){return Y=G>0?U(X,--G):0,K--,10===Y&&(K=1,q--),Y}function ee(){return Y=G<W?U(X,G++):0,K++,10===Y&&(K=1,q++),Y}function te(){return U(X,G)}function ne(){return G}function re(e,t){return H(X,e,t)}function ae(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ie(e){return q=K=1,W=j(X=e),G=0,[]}function oe(e){return X="",e}function se(e){return B(re(G-1,ue(91===e?e+2:40===e?e+1:e)))}function le(e){for(;(Y=te())&&Y<33;)ee();return ae(e)>2||ae(Y)>3?"":" "}function ce(e,t){for(;--t&&ee()&&!(Y<48||Y>102||Y>57&&Y<65||Y>70&&Y<97););return re(e,ne()+(t<6&&32==te()&&32==ee()))}function ue(e){for(;ee();)switch(Y){case e:return G;case 34:case 39:34!==e&&39!==e&&ue(Y);break;case 40:41===e&&ue(e);break;case 92:ee()}return G}function de(e,t){for(;ee()&&e+Y!==57&&(e+Y!==84||47!==te()););return"/*"+re(t,G-1)+"*"+M(47===e?e:ee())}function pe(e){for(;!ae(te());)ee();return re(e,G)}var me="-ms-",fe="-moz-",ge="-webkit-",he="comm",be="rule",ve="decl",ye="@keyframes";function _e(e,t){for(var n="",r=V(e),a=0;a<r;a++)n+=t(e[a],a,e,t)||"";return n}function we(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case ve:return e.return=e.return||e.value;case he:return"";case ye:return e.return=e.value+"{"+_e(e.children,r)+"}";case be:e.value=e.props.join(",")}return j(n=_e(e.children,r))?e.return=e.value+"{"+n+"}":""}function ke(e){return oe(xe("",null,null,null,[""],e=ie(e),0,[0],e))}function xe(e,t,n,r,a,i,o,s,l){for(var c=0,u=0,d=o,p=0,m=0,f=0,g=1,h=1,b=1,v=0,y="",_=a,w=i,k=r,x=y;h;)switch(f=v,v=ee()){case 40:if(108!=f&&58==U(x,d-1)){-1!=F(x+=z(se(v),"&","&\f"),"&\f")&&(b=-1);break}case 34:case 39:case 91:x+=se(v);break;case 9:case 10:case 13:case 32:x+=le(f);break;case 92:x+=ce(ne()-1,7);continue;case 47:switch(te()){case 42:case 47:$(Te(de(ee(),ne()),t,n),l);break;default:x+="/"}break;case 123*g:s[c++]=j(x)*b;case 125*g:case 59:case 0:switch(v){case 0:case 125:h=0;case 59+u:-1==b&&(x=z(x,/\f/g,"")),m>0&&j(x)-d&&$(m>32?Se(x+";",r,n,d-1):Se(z(x," ","")+";",r,n,d-2),l);break;case 59:x+=";";default:if($(k=Ee(x,t,n,c,u,a,s,y,_=[],w=[],d),i),123===v)if(0===u)xe(x,t,k,k,_,i,d,s,w);else switch(99===p&&110===U(x,3)?100:p){case 100:case 108:case 109:case 115:xe(e,k,k,r&&$(Ee(e,k,k,0,0,a,s,y,a,_=[],d),w),a,w,d,s,r?_:w);break;default:xe(x,k,k,k,[""],w,0,s,w)}}c=u=m=0,g=b=1,y=x="",d=o;break;case 58:d=1+j(x),m=f;default:if(g<1)if(123==v)--g;else if(125==v&&0==g++&&125==J())continue;switch(x+=M(v),v*g){case 38:b=u>0?1:(x+="\f",-1);break;case 44:s[c++]=(j(x)-1)*b,b=1;break;case 64:45===te()&&(x+=se(ee())),p=te(),u=d=j(y=x+=pe(ne())),v++;break;case 45:45===f&&2==j(x)&&(g=0)}}return i}function Ee(e,t,n,r,a,i,o,s,l,c,u){for(var d=a-1,p=0===a?i:[""],m=V(p),f=0,g=0,h=0;f<r;++f)for(var b=0,v=H(e,d+1,d=R(g=o[f])),y=e;b<m;++b)(y=B(g>0?p[b]+" "+v:z(v,/&\f/g,p[b])))&&(l[h++]=y);return Z(e,t,n,0===a?be:s,l,c,u)}function Te(e,t,n){return Z(e,t,n,he,M(Y),H(e,2,-2),0)}function Se(e,t,n,r){return Z(e,t,n,ve,H(e,0,r),H(e,r+1,-1),r)}var Ce=function(e,t,n){for(var r=0,a=0;r=a,a=te(),38===r&&12===a&&(t[n]=1),!ae(a);)ee();return re(e,G)},Ae=new WeakMap,Ne=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||Ae.get(n))&&!r){Ae.set(e,!0);for(var a=[],i=function(e,t){return oe(function(e,t){var n=-1,r=44;do{switch(ae(r)){case 0:38===r&&12===te()&&(t[n]=1),e[n]+=Ce(G-1,t,n);break;case 2:e[n]+=se(r);break;case 4:if(44===r){e[++n]=58===te()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=M(r)}}while(r=ee());return e}(ie(e),t))}(t,a),o=n.props,s=0,l=0;s<i.length;s++)for(var c=0;c<o.length;c++,l++)e.props[l]=a[s]?i[s].replace(/&\f/g,o[c]):o[c]+" "+i[s]}}},Pe=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function Oe(e,t){switch(function(e,t){return 45^U(e,0)?(((t<<2^U(e,0))<<2^U(e,1))<<2^U(e,2))<<2^U(e,3):0}(e,t)){case 5103:return ge+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return ge+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return ge+e+fe+e+me+e+e;case 6828:case 4268:return ge+e+me+e+e;case 6165:return ge+e+me+"flex-"+e+e;case 5187:return ge+e+z(e,/(\w+).+(:[^]+)/,ge+"box-$1$2"+me+"flex-$1$2")+e;case 5443:return ge+e+me+"flex-item-"+z(e,/flex-|-self/,"")+e;case 4675:return ge+e+me+"flex-line-pack"+z(e,/align-content|flex-|-self/,"")+e;case 5548:return ge+e+me+z(e,"shrink","negative")+e;case 5292:return ge+e+me+z(e,"basis","preferred-size")+e;case 6060:return ge+"box-"+z(e,"-grow","")+ge+e+me+z(e,"grow","positive")+e;case 4554:return ge+z(e,/([^-])(transform)/g,"$1"+ge+"$2")+e;case 6187:return z(z(z(e,/(zoom-|grab)/,ge+"$1"),/(image-set)/,ge+"$1"),e,"")+e;case 5495:case 3959:return z(e,/(image-set\([^]*)/,ge+"$1$`$1");case 4968:return z(z(e,/(.+:)(flex-)?(.*)/,ge+"box-pack:$3"+me+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+ge+e+e;case 4095:case 3583:case 4068:case 2532:return z(e,/(.+)-inline(.+)/,ge+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(j(e)-1-t>6)switch(U(e,t+1)){case 109:if(45!==U(e,t+4))break;case 102:return z(e,/(.+:)(.+)-([^]+)/,"$1"+ge+"$2-$3$1"+fe+(108==U(e,t+3)?"$3":"$2-$3"))+e;case 115:return~F(e,"stretch")?Oe(z(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==U(e,t+1))break;case 6444:switch(U(e,j(e)-3-(~F(e,"!important")&&10))){case 107:return z(e,":",":"+ge)+e;case 101:return z(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+ge+(45===U(e,14)?"inline-":"")+"box$3$1"+ge+"$2$3$1"+me+"$2box$3")+e}break;case 5936:switch(U(e,t+11)){case 114:return ge+e+me+z(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return ge+e+me+z(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return ge+e+me+z(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return ge+e+me+e+e}return e}var Ie=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ve:e.return=Oe(e.value,e.length);break;case ye:return _e([Q(e,{value:z(e.value,"@","@"+ge)})],r);case be:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return _e([Q(e,{props:[z(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return _e([Q(e,{props:[z(t,/:(plac\w+)/,":"+ge+"input-$1")]}),Q(e,{props:[z(t,/:(plac\w+)/,":-moz-$1")]}),Q(e,{props:[z(t,/:(plac\w+)/,me+"input-$1")]})],r)}return""}))}}],Le=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r,a,i=e.stylisPlugins||Ie,o={},s=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)o[t[n]]=!0;s.push(e)}));var l,c,u,d,p=[we,(d=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],m=(c=[Ne,Pe].concat(i,p),u=V(c),function(e,t,n,r){for(var a="",i=0;i<u;i++)a+=c[i](e,t,n,r)||"";return a});a=function(e,t,n,r){l=n,_e(ke(e?e+"{"+t.styles+"}":t.styles),m),r&&(f.inserted[t.name]=!0)};var f={key:t,sheet:new L({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:a};return f.sheet.hydrate(s),f},Re={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Me=/[A-Z]|^ms/g,De=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Be=function(e){return 45===e.charCodeAt(1)},ze=function(e){return null!=e&&"boolean"!=typeof e},Fe=P((function(e){return Be(e)?e:e.replace(Me,"-$&").toLowerCase()})),Ue=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(De,(function(e,t,n){return je={name:t,styles:n,next:je},t}))}return 1===Re[e]||Be(e)||"number"!=typeof t||0===t?t:t+"px"};function He(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return je={name:n.name,styles:n.styles,next:je},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)je={name:r.name,styles:r.styles,next:je},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var a=0;a<n.length;a++)r+=He(e,t,n[a])+";";else for(var i in n){var o=n[i];if("object"!=typeof o)null!=t&&void 0!==t[o]?r+=i+"{"+t[o]+"}":ze(o)&&(r+=Fe(i)+":"+Ue(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=He(e,t,o);switch(i){case"animation":case"animationName":r+=Fe(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var l=0;l<o.length;l++)ze(o[l])&&(r+=Fe(i)+":"+Ue(i,o[l])+";")}return r}(e,t,n);case"function":if(void 0!==e){var a=je,i=n(e);return je=a,He(e,t,i)}}if(null==t)return n;var o=t[n];return void 0!==o?o:n}var je,Ve=/label:\s*([^\s;\n{]+)\s*(;|$)/g,$e=!!b.useInsertionEffect&&b.useInsertionEffect,qe=$e||function(e){return e()},Ke=($e||b.useLayoutEffect,b.createContext("undefined"!=typeof HTMLElement?Le({key:"css"}):null));Ke.Provider;var We=b.createContext({}),Ge=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},Ye=I,Xe=function(e){return"theme"!==e},Ze=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Ye:Xe},Qe=function(e,t,n){var r;if(t){var a=t.shouldForwardProp;r=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},Je=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return Ge(t,n,r),qe((function(){return function(e,t,n){Ge(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+r:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,n,r)})),null},et=function e(t,n){var r,a,i=t.__emotion_real===t,o=i&&t.__emotion_base||t;void 0!==n&&(r=n.label,a=n.target);var s=Qe(t,n,i),l=s||Ze(o),c=!l("as");return function(){var u=arguments,d=i&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==r&&d.push("label:"+r+";"),null==u[0]||void 0===u[0].raw)d.push.apply(d,u);else{d.push(u[0][0]);for(var p=u.length,m=1;m<p;m++)d.push(u[m],u[0][m])}var f,g=(f=function(e,t,n){var r,i,u,p,m=c&&e.as||o,f="",g=[],h=e;if(null==e.theme){for(var v in h={},e)h[v]=e[v];h.theme=b.useContext(We)}"string"==typeof e.className?(r=t.registered,i=g,u=e.className,p="",u.split(" ").forEach((function(e){void 0!==r[e]?i.push(r[e]+";"):p+=e+" "})),f=p):null!=e.className&&(f=e.className+" ");var y=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";je=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,a+=He(n,t,i)):a+=i[0];for(var o=1;o<e.length;o++)a+=He(n,t,e[o]),r&&(a+=i[o]);Ve.lastIndex=0;for(var s,l="";null!==(s=Ve.exec(a));)l+="-"+s[1];var c=function(e){for(var t,n=0,r=0,a=e.length;a>=4;++r,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(a){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(a)+l;return{name:c,styles:a,next:je}}(d.concat(g),t.registered,h);f+=t.key+"-"+y.name,void 0!==a&&(f+=" "+a);var _=c&&void 0===s?Ze(m):l,w={};for(var k in e)c&&"as"===k||_(k)&&(w[k]=e[k]);return w.className=f,w.ref=n,b.createElement(b.Fragment,null,b.createElement(Je,{cache:t,serialized:y,isStringTag:"string"==typeof m}),b.createElement(m,w))},(0,b.forwardRef)((function(e,t){var n=(0,b.useContext)(Ke);return f(e,n,t)})));return g.displayName=void 0!==r?r:"Styled("+("string"==typeof o?o:o.displayName||o.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=o,g.__emotion_styles=d,g.__emotion_forwardProp=s,Object.defineProperty(g,"toString",{value:function(){return"."+a}}),g.withComponent=function(t,r){return e(t,N({},n,r,{shouldForwardProp:Qe(g,r,!0)})).apply(void 0,d)},g}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){et[e]=et(e)}));const tt=window.wp.blocks,nt=window.wp.coreData,rt=window.wp.blockEditor;n(252);const at=(e,t=null)=>{const[n,r]=(0,_.useState)((()=>{try{const n=JSON.parse(localStorage.getItem(e));return(0,A.isNil)(n)?t:n}catch(e){return mt(e,"error"),t}}));return[n,t=>{r(t),localStorage.setItem(e,JSON.stringify(t))}]};n(838);const it=window.wp.primitives,ot=((0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})),(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})),window.wp.hooks),st="Mobile",lt="Tablet",ct="Desktop",ut={},dt=getComputedStyle(document.documentElement);ut[st]=dt.getPropertyValue("--wp--custom--breakpoint--sm")||"576px",ut[lt]=dt.getPropertyValue("--wp--custom--breakpoint--md")||"768px",ut[ct]=dt.getPropertyValue("--wp--custom--breakpoint--lg")||"1024px";const pt={};Object.keys(ut).map((e=>{pt[e]=e===st?"":`@media (min-width: ${ut[e]})`})),(0,v.__)("Mobile","content-blocks-builder"),pt[st],(0,v.__)("Tablet","content-blocks-builder"),pt[lt],(0,v.__)("Desktop","content-blocks-builder"),pt[ct];const mt=(e,t="log")=>{e&&"development"===window?.BBLOG?.environmentType&&(["log","info","warn","error","debug","dir","table"].includes(t)?console[t](e):console.log(e))},ft=window.wp.a11y,gt=window.wp.notices;var ht=n(531),bt=n.n(ht);class vt{constructor(e=""){e||(e=window.location.href),this.parsedURL=new URL(e)}get(e,t=null){return this.parsedURL.searchParams.get(e)||t}set(e,t,n=!0){this.parsedURL.searchParams.set(e,t),n&&history.pushState&&history.pushState({},null,this.parsedURL.href)}delete(e,t=!0){this.parsedURL.searchParams.delete(e),t&&history.pushState&&history.pushState({},null,this.parsedURL.href)}reload(){history?.go?history.go():window.location.reload()}getHref(){return this.parsedURL.href}}const yt=(0,_.createContext)(),_t={pageSize:6,currentPage:1,sortType:"featured",selectedKeywords:(()=>{let e=(new vt).get("keywordIds","");return e=e?e.split(",").map((e=>({id:parseInt(e)}))):[],e})(),isOpenHelp:!1,searchTerm:(new vt).get("s",""),insertingItem:"",isReloading:!1,installingPlugins:[],activatingPlugins:[]},wt=(e,t)=>"UPDATE_STATE"===t.type?{...e,...t.payload}:e,kt=(e,t)=>{let n=[];if(!e.length||!t.length)return t;const[r,...a]=e;return n=t.filter((({keywordIds:e})=>e.indexOf(r.id)>-1)),kt(a,n)},xt={limit:60,threshold:-100,keys:["title","keywords","description"]},Et=(e="block")=>{let t;switch(e){case"block":t=window?.BoldBlocksBlockLibrary?.URL;break;case"variation":t=window?.BoldBlocksVariationLibrary?.URL;break;case"pattern":t=window?.BoldBlocksPatternLibrary?.URL;break;default:t="https://boldpatterns.net"}return t||(t="https://boldpatterns.net"),t},Tt=(t,n=[],r=g)=>(0,e.useSelect)((e=>e(r).isResolving(t,n)),[]),St=(t,n=[],r=g)=>(0,e.useSelect)((e=>e(r).hasFinishedResolution(t,n)),[]),Ct=et.div`
  .scrollbar {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b9b9b9;
    }

    &::-webkit-scrollbar-track {
      background-color: #e2e2e2;
    }
  }

  // Header notices
  .cbb-library__notices {
    .cbb-library-notice {
      margin: 0 0 10px 0;
      padding-right: 10px;
    }

    .components-notice__content {
      display: flex;
      flex-wrap: wrap;
    }

    .notice-message {
      margin-right: 12px;
    }

    .components-notice__actions {
      gap: 12px;

      > .components-notice__action {
        margin-left: 0 !important;
      }
    }
  }

  .template-list-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    max-height: 100%;
    margin-bottom: 0;
    overflow: auto;

    .pagination-links {
      padding-top: 0.5rem;
      margin: auto 0 0;
    }
  }

  .template-list-not-found {
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  &.is-locked {
    pointer-events: none;
  }

  &.is-library-page {
    margin-top: 20px;
  }
`,At=et(k.SearchControl)`
  > * {
    margin-bottom: 0;
  }
`,Nt=et.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  .is-library-page > & {
    padding: 6px 8px;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .search-box {
    flex-grow: 1;

    > * {
      margin-bottom: 0;
    }
  }

  .keywords-filter {
    flex: 1 0 100%;
    order: 2;
    align-self: center;
  }

  .template-header__actions {
    margin-left: auto;
  }

  // $break-wide
  @media (min-width: 1280px) {
    // Force the header in one line.
    flex-wrap: nowrap;

    // Don't shink search ans sort
    .search-box,
    .sort-box {
      flex: 0 0 auto;
    }

    .search-box {
      width: 320px;
    }

    // Grow and shink filter
    .keywords-filter {
      flex: 1 1 auto;
      order: 0;
    }
  }
`,Pt=et(k.Notice)`
  margin: auto 0 1rem;
  font-size: 1.2em;

  p {
    margin: 0;
  }
`,Ot=({className:e})=>{const{libraryState:t,updateLibraryState:n,itemsData:r,filteredFullItemsData:a,itemKeywords:i,isLoadingKeywords:o,isFinishedLoadingItemsData:s,closeModal:l=null,isModalOpen:c,contentType:u}=(0,_.useContext)(yt),{searchTerm:d,sortType:p,selectedKeywords:m,isOpenHelp:f}=t,g=(0,A.debounce)((e=>{e.length>=3?n({searchTerm:e,currentPage:1}):n({searchTerm:e})}),500),h=(0,_.useRef)(null);return(0,_.useEffect)((()=>{s&&h.current&&h.current.focus()}),[c,s]),(0,b.createElement)(b.Fragment,null,(0,b.createElement)(Nt,{className:C("template-header",e)},(0,b.createElement)(At,{className:"search-box",label:(0,v.__)("Search...","content-blocks-builder"),value:d,onChange:g,ref:h}),(0,b.createElement)(Vt,{onChange:e=>{n({sortType:e,currentPage:1})},value:p}),(0,b.createElement)(Kt,{items:a.length!==r.length?a:[],keywords:i,isLoading:o,selectedKeywords:m,onChange:e=>{n({selectedKeywords:e,currentPage:1})}}),(0,b.createElement)(Dt,{isOpenHelp:f,onToggleHelp:()=>{n({isOpenHelp:!f})},onCloseModal:l})),f&&(0,b.createElement)(Pt,{status:"info",className:"library__help",isDismissible:!1},(0,b.createElement)("p",null,(0,b.createElement)("strong",null,"pattern"===u?(0,v.__)("Click on the preview to insert.","content-blocks-builder"):(0,v.__)("Click on the preview to import.","content-blocks-builder"))),(0,b.createElement)("p",null,(0,v.__)("Items with Pro features like parallax, animations... require the Pro version to work full-functional. They will still work perfectly fine on the Free version but without Pro features.","content-blocks-builder")),(0,b.createElement)("p",null,(0,v.__)("Some items require additional blocks, variations from the library. These dependent blocks or variations must be imported first in order to use these items.","content-blocks-builder")),(0,b.createElement)("p",null,(0,v.__)("Some items require blocks in external plugins. You have to install and activate those required plugins to use these items. All external plugins are developed and maintained by us, so they are safe to use.","content-blocks-builder"))))},It=(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"})),Lt=(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"})),Rt={edit:(0,v.__)("Edit","content-blocks-builder"),editItem:(0,v.__)("Edit %s","content-blocks-builder"),save:(0,v.__)("Save","content-blocks-builder"),cancel:(0,v.__)("Cancel","content-blocks-builder"),delete:(0,v.__)("Delete","content-blocks-builder"),closeModal:(0,v.__)("Close modal","content-blocks-builder"),name:(0,v.__)("Name","content-blocks-builder"),label:(0,v.__)("Label","content-blocks-builder"),block:(0,v.__)("block","content-blocks-builder"),variation:(0,v.__)("variation","content-blocks-builder"),defaultVariation:(0,v.__)("default variation","content-blocks-builder"),pattern:(0,v.__)("pattern","content-blocks-builder"),blocks:(0,v.__)("Blocks","content-blocks-builder"),variations:(0,v.__)("Variations","content-blocks-builder"),patterns:(0,v.__)("Patterns","content-blocks-builder")},Mt=et.div`
  display: flex;

  button {
    width: 40px;
    height: 40px;
  }
`,Dt=({isOpenHelp:e,onToggleHelp:t,onCloseModal:n})=>(0,b.createElement)(Mt,{className:"template-header__actions"},(0,b.createElement)(k.Button,{className:"template-header__help",onClick:t,icon:e?It:Lt,iconSize:40,label:(0,v.__)("Toggle help","content-blocks-builder"),"aria-expanded":e}),n&&(0,b.createElement)(k.Button,{className:"template-header__close",onClick:n,icon:It,iconSize:40,label:Rt.closeModal}));var Bt;function zt(){return zt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zt.apply(this,arguments)}var Ft=function(e){return b.createElement("svg",zt({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"currentColor",viewBox:"0 0 16 16"},e),Bt||(Bt=b.createElement("path",{d:"M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"})))};const Ut=[{value:"featured",title:(0,v.__)("Featured","content-blocks-builder")},{value:"latest",title:(0,v.__)("Latest","content-blocks-builder")},{value:"30_days",title:(0,v.__)("Most downloads last 30 days","content-blocks-builder"),shortTitle:(0,v.__)("Last 30 days","content-blocks-builder")},{value:"7_days",title:(0,v.__)("Most downloads last 7 days","content-blocks-builder"),shortTitle:(0,v.__)("Last 7 days","content-blocks-builder")}],Ht=et(k.MenuGroup)`
  .is-active {
    color: #fff;
    background-color: var(--wp-admin-theme-color, #007cba);
  }
`,jt=et.div`
  width: 120px;
  background-color: #f0f0f0;

  .components-dropdown {
    width: 100%;
  }

  .components-button.has-icon {
    width: 100%;
    padding: 8px;
    height: 40px;
  }

  @media (max-width: 599px) {
    /* $break-medium: 600px */
    width: 40px;

    .text {
      display: none;
    }

    .components-button.has-icon.has-text svg {
      margin-right: 0;
    }
  }

  @media (max-width: 1279px) {
    align-self: flex-start;
  }
`;function Vt({sortTypes:e=Ut,value:t,onChange:n}){t=t||"featured";const r=(0,A.find)(e,(e=>e.value===t));return(0,b.createElement)(jt,{className:"sort-box"},(0,b.createElement)(k.Dropdown,{renderToggle:({onToggle:e})=>{var t;return(0,b.createElement)(k.Button,{onClick:e,icon:Ft},(0,b.createElement)("span",{className:"text"},null!==(t=r?.shortTitle)&&void 0!==t?t:r.title))},popoverProps:{placement:"bottom-end",__unstableSlotName:"sortType"},renderContent:({onClose:r})=>(0,b.createElement)(Ht,null,e.map((e=>(0,b.createElement)(k.MenuItem,{className:e.value===t?"is-active":"",key:e.value,onClick:()=>{n(e.value),r(!0)}},e.title))))}))}const $t=(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z"}),(0,b.createElement)(it.Path,{d:"m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z"})),qt=et.div`
  .keywords-filter__label {
    display: flex;
    margin-right: 0.5em;
    font-weight: 500;

    svg {
      margin-right: 5px;
    }
  }

  .keywords-filter__clear {
    font-size: 14px;
    font-weight: 700;
  }

  ul {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 0;

    li {
      margin: 0;

      span {
        display: inline-block;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        margin-right: 0.3em;
      }

      .keyword {
        cursor: pointer;
      }

      .keyword:not(.is-selected) {
        color: var(--wp-admin-theme-color, #007cba);
      }

      .is-selected {
        font-weight: 500;
      }

      .clear-filter {
        margin-right: 0;
        margin-left: 0.5em;
        text-decoration: underline;
      }
    }
  }
`;function Kt({items:e=[],keywords:t,isLoading:n,selectedKeywords:r,onChange:a}){let i;if(e.length){const n=[];e.forEach((({keywordIds:e})=>{n.push(...e)}));const r=[...new Set(n)];i=t.filter((({id:e})=>r.includes(e)))}else i=t;const o=e=>{let t=[];if(r.length){t=[...r];const n=r.findIndex((({id:t})=>t===e.id));n>-1?t.splice(n,1):t.push(e),t.sort(((e,t)=>e.count-t.count))}else t.push(e);a(t)};return(0,b.createElement)(qt,{className:C("keywords-filter",{"has-keywords":i&&!!i.length})},n&&(0,b.createElement)(k.Spinner,null),i&&!!i.length&&(0,b.createElement)("div",{className:"keywords-filter__keywords"},(0,b.createElement)("ul",{className:""},(0,b.createElement)("li",{className:"keywords-filter__label"},(0,b.createElement)(k.Icon,{icon:$t}),(0,b.createElement)("span",{className:""},(0,v.__)(" Keywords:","content-blocks-builder"))),i.map(((e,t)=>(0,b.createElement)("li",{key:t,onClick:()=>o(e),onKeyDown:t=>{"Enter"===t.key&&o(e)},tabIndex:0},(0,b.createElement)("span",{className:C("keyword",{"is-selected":r.findIndex((({id:t})=>t===e.id))>-1})},e.name,t!==i.length-1?",":"")))),!!r.length&&(0,b.createElement)("li",{className:"keywords-filter__clear",onClick:()=>{a([])},onKeyDown:e=>{"Enter"===e.key&&a([])},tabIndex:0},(0,b.createElement)("span",{className:"keyword clear-filter",title:(0,v.__)("Clear filtered keywords","content-blocks-builder")},(0,v.__)("Clear all","content-blocks-builder"))))))}et(k.BaseControl)`
  margin-bottom: 8px !important;

  &.is-bold {
    font-weight: 600;
  }

  &.h3 {
    font-size: 13px;
    font-weight: bold;
  }

  .components-base-control__field {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .components-base-control__label {
    margin-bottom: 0;
  }

  div.components-dropdown {
    min-height: 30px;
    margin-bottom: 0;
    border: 0;

    &:first-of-type {
      margin-left: 10px;
    }

    .components-button {
      min-width: 36px;
      height: 30px;

      &.has-icon {
        min-width: 48px;
      }
    }
  }
`,et.div`
  padding-bottom: 4px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;

  > * {
    margin-bottom: 8px !important;
  }

  .repeater-group__item__actions {
    display: flex;
    align-items: center;
    gap: 0.2em;

    > *:first-of-type {
      margin-right: auto;
    }
  }
`,et(k.PanelBody)`
  margin-right: -16px;
  margin-left: -16px;
`;const Wt=et.div`
  box-sizing: border-box;
  width: 100%;

  .group-control__body {
    gap: 4px;

    > * {
      max-width: 100%;
    }
  }

  &.is-2-columns {
    .group-control__body {
      > * {
        flex-basis: calc(50% - 4px);

        &:nth-of-type(n + 3) {
          margin-top: 8px !important;
        }
      }
    }
  }

  &.is-3-columns {
    .group-control__body {
      > * {
        flex-basis: calc(33.33333% - 4px);

        &:nth-of-type(n + 4) {
          margin-top: 8px !important;
        }
      }
    }
  }

  &.is-4-columns {
    .group-control__body {
      > * {
        flex-basis: calc(25% - 4px);

        &:nth-of-type(n + 5) {
          margin-top: 8px !important;
        }
      }
    }
  }
`,Gt=et(k.Flex)`
  padding-bottom: 8px;

  .label-control {
    margin-bottom: 0 !important;
  }
`,Yt=et(k.Flex)`
  flex-wrap: wrap;
  width: auto;
  gap: 4px;

  > * {
    flex: 1 0 auto;
    margin: 0 !important;
  }
`,Xt=(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),Zt=(0,b.createElement)(it.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(it.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"}));function Qt({isLinked:e,...t}){const n=e?(0,v.__)("Unlink Sides","content-blocks-builder"):(0,v.__)("Link Sides","content-blocks-builder");return(0,b.createElement)(k.Tooltip,{text:n},(0,b.createElement)("span",null,(0,b.createElement)(k.Button,{...t,className:"component-group-control__linked-button",variant:e?"primary":"secondary",size:"small",icon:e?Xt:Zt,iconSize:16,"aria-label":n})))}var Jt=n(774),en=n.n(Jt);const tn=({values:e,fields:t})=>{const n=t.map((({name:t})=>{var n;return null!==(n=e[t])&&void 0!==n?n:void 0}));return(r=n.filter((e=>e))).sort(((e,t)=>(0,A.isObject)(e)?r.filter((t=>en()(t,e))).length-r.filter((e=>en()(e,t))).length:r.filter((t=>t===e)).length-r.filter((e=>e===t)).length)).pop();var r},nn=({values:e,fields:t,renderControl:n,onChange:r,normalizeValue:a})=>t.map((i=>{var o;const{name:s}=i;return(0,b.createElement)(_.Fragment,{key:`group-control-${s}`},n({value:null!==(o=e[s])&&void 0!==o?o:void 0,onChange:(l=s,t=>{t=a({side:l,value:t}),r({...e,[l]:t})}),fields:t,values:e,...i}));var l})),rn=({values:e,fields:t,renderControl:n,renderAllControl:r=null,onChange:a,normalizeValue:i,...o})=>(r||(r=n),r({value:tn({values:e,fields:t}),fields:t,values:e,onChange:n=>{n=i({side:"all",value:n});let r={...e};t.forEach((({name:e})=>{r={...r,[e]:n}})),a(r)},...o})),an=({label:e,fields:t=[],values:n={},renderLabel:r=A.noop,renderControl:a=A.noop,onChange:i=A.noop,normalizeValue:o=(({side:e,value:t})=>t),isLinkedGroup:s=!0,getInitialLinkedState:l=A.noop,className:c,columns:u,...d})=>{const p={fields:t,values:n,renderControl:a,onChange:i,normalizeValue:o,...d},[m,f]=s?function(e){const[t,n]=(0,_.useState)(e);return(0,_.useEffect)((()=>n(e)),[e]),[t,n]}(l(n)):[!1,A.noop];return(0,b.createElement)(Wt,{className:C("group-control",c,{[`is-${u}-columns`]:u}),...d},(0,b.createElement)(Gt,{className:"group-control__header"},r({label:e,isLinkedGroup:s,...d}),s&&(0,b.createElement)(Qt,{onClick:()=>{f(!m)},isLinked:m})),(0,b.createElement)(Yt,{className:"group-control__body"},m&&(0,b.createElement)(rn,{...p}),!m&&(0,b.createElement)(nn,{...p})))};et(an)`
  .group-control__body {
    > *:nth-of-type(3) {
      order: 2;
    }

    .components-input-control__input {
      height: 40px;
    }
  }
`,et.div`
  > .block-editor-tools-panel-color-gradient-settings__item {
    margin: 0 !important;
    border-right: 1px solid #0000001a;
    border-bottom: 1px solid #0000001a;
    border-left: 1px solid #0000001a;

    &:first-of-type {
      border-top: 1px solid #0000001a;
    }
  }

  .block-editor-tools-panel-color-gradient-settings__dropdown {
    display: block;
  }

  &.is-inner-control {
    > * {
      margin: 0 !important;
      border: 0 !important;
    }

    .block-editor-tools-panel-color-gradient-settings__dropdown {
      display: flex;
      align-items: center;
      align-self: flex-end;
      height: 32px;
      border: 1px solid #757575;

      > button {
        height: 100%;
        padding: 4px;
      }
    }
  }
`,et(an)`
  /* .block-editor-panel-color-gradient-settings__item {
    padding: 8px !important;
  } */

  .components-toggle-control {
    > * {
      margin-bottom: 0;
    }
  }
`,et.div`
  .shadow-list__title {
    margin-bottom: 8px;
  }

  .shadow-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;

    margin-bottom: 16px;
  }

  .shadow-item {
    height: 30px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #ddd;

    &.is-selected {
      background: #ddd;
    }
  }
`,et(an)`
  .components-base-control__field {
    margin-bottom: 0;
  }
`,et.div`
  .svg-input-control {
    &__label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__actions {
      display: flex;
      gap: 8px;
      margin: 6px 0;
    }

    &__input {
      margin: 8px 0 4px;

      > * {
        margin-bottom: 0;
      }
    }
  }
`,et(k.ButtonGroup)`
  margin-top: 1px;
  margin-left: 1px;
  button {
    margin: -1px 0 0 -1px;
    vertical-align: middle;
  }
`,et.div`
  margin-top: 8px;
  margin-bottom: revert;
  font-size; 12px;
  color: #757575;
`,et.div`
  .settings-section__description {
    margin: 1em 0;
    font-size: 1.1em;
    font-weight: 500;
  }

  .meta-box-sortables {
    @media (min-width: 1080px) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
      gap: 1rem;

      .postbox {
        margin-bottom: 0;
      }
    }
  }
`,et.div`
  &.is-full-row {
    grid-column: span 2;
  }

  &.is-header-hidden {
    .inside {
      padding: 12px;
    }

    @media (min-width: 1080px) {
      margin: 0;
    }
  }

  .postbox-header {
    .hndle {
      cursor: pointer;
    }
  }

  .inside {
    margin: 0;
  }

  .postbox-footer {
    padding: 12px;
    border-top: 1px solid #f0f0f1;
  }

  &.closed .postbox-footer {
    display: none;
  }

  .components-notice {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 8px;
    margin-right: 0;
    margin-left: 0;
    box-sizing: border-box;
  }
`,et.div`
  padding: 12px 16px;
  margin-top: 12px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 2px;

  .fieldset__label {
    margin-bottom: 12px;
  }

  .fieldset__list {
    margin-bottom: 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 1rem;
  }

  .file-upload {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 0.5em;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`,et.div`
  flex-wrap: wrap;

  .block-editor-block-variation-picker__variations > li {
    margin-right: 8px;
  }

  .block-editor-block-variation-picker.has-many-variations
    .components-placeholder__fieldset {
    max-width: 100%;
  }

  .placeholder__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex-basis: 100%;
    padding: 1em;
    background-color: #fff;
    box-shadow: inset 0 -1px 0 1px #1e1e1e;
  }
`,n(799),window.wp.keycodes,et(k.Modal)`
  // Modal content
  .components-modal__content {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    margin-top: 50px;
    overflow: hidden;

    &::before {
      margin-bottom: 20px;
    }

    > :not(.components-modal__header, .icon-submit) {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
    }
  }

  // Modal header
  .components-modal__header {
    height: 50px;
    padding: 0 20px;
  }

  .icon-library-wrapper {
    flex: 1;
    overflow: hidden;
    content-visibility: hidden;

    &.is-loading,
    &.show-library {
      content-visibility: visible;
    }
  }

  .icon-filter {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    &__search {
      min-width: 220px;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      font-size: 14px;

      > li {
        margin: 0;
      }

      .keyword-label {
        font-weight: 500;
      }

      span {
        display: block;
        padding: 3px 5px;
      }

      .keyword:not(.is-selected) {
        color: var(--wp-admin-theme-color, #007cba);
        cursor: pointer;
      }

      .is-selected {
        font-weight: 500;
        pointer-events: none;
      }
    }

    @media (max-width: 781px) {
      flex-wrap: wrap;

      &__search {
        width: 100%;
      }

      &__keywords {
        margin-top: 8px;
        margin-left: 0 !important;
      }
    }
  }

  .components-search-control > * {
    margin-bottom: 0;
  }

  // Icons list
  .icon-library {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9em, 1fr));
    gap: 0.5em;
    max-height: calc(100% - 110px);
    overflow: auto;

    /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4); */

    svg {
      width: 4em;
      height: 4em;
    }

    .title {
      max-height: 1.7em;
      font-size: 0.85em;
      line-height: 1.5;
      text-align: center;
      word-break: break-word;
    }

    > * {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5em 1em;
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .selected {
      background-color: #ccc;
    }

    &:empty::before {
      display: block;
      width: 100%;
      padding: 2rem;
      text-align: center;
      content: attr(data-empty);
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  // Pagination
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    font-size: 1.5em;

    > li {
      margin: 0 5px;

      &:only-child {
        display: none;
      }

      &.active {
        a {
          color: #3c434a;
        }
      }

      &:not(.active) {
        a {
          cursor: pointer;
        }
      }
    }

    a {
      display: block;
      padding: 5px 10px;
    }
  }
`;const on=et.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0 0;
  font-size: 1.5em;

  > li {
    margin-bottom: 0;

    > * {
      display: block;
      padding: 0.5rem;
    }

    > a {
      cursor: pointer;

      &:focus {
        box-shadow: none;
        outline: 1px solid transparent;
      }
      &:focus-visible {
        box-shadow: 0 0 0 1px #2271b1;
        outline: 1px solid transparent;
      }
    }
  }
`,sn=({total:e,current:t=1,midSize:n=2,endSize:r=1,onChange:a,showAll:i=!1,nextPrev:o=!0})=>{if(e<2)return null;const s=[];let l=!1;o&&t&&t>1&&s.push((0,b.createElement)("a",{className:"pagination-link pagination-link--prev",onClick:()=>a(t-1),onKeyDown:e=>{"Enter"===e.key&&a(t-1)},tabIndex:0},(0,v.__)("Prev","content-blocks-builder")));for(let o=1;o<=e;o++)o===t?(s.push((0,b.createElement)("span",{"aria-current":"page",className:"pagination-link is-active"},o)),l=!0):i||o<=r||o>=t-n&&o<=t+n||o>e-r?(s.push((0,b.createElement)("a",{className:"pagination-link",onClick:()=>a(o),onKeyDown:e=>{"Enter"===e.key&&a(o)},tabIndex:0},o)),l=!0):l&&!i&&(s.push((0,b.createElement)("span",{className:"pagination-link dots"},"…")),l=!1);return o&&t&&t<e&&s.push((0,b.createElement)("a",{className:"pagination-link pagination-link--next",onClick:()=>a(t+1),onKeyDown:e=>{"Enter"===e.key&&a(t+1)},tabIndex:0},(0,v.__)("Next","content-blocks-builder"))),(0,b.createElement)(on,{className:"pagination-links"},s.map(((e,t)=>(0,b.createElement)("li",{key:t},e))))},ln=et.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 782px) {
    // $break-medium
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    // $break-wide
    grid-template-columns: repeat(3, 1fr);
  }
`,cn=et.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ddd;
  transition: border-color 0.15s ease-in-out;

  .components-spinner {
    position: absolute;
    margin: 10px;
  }

  // The item preview
  .template-item__preview {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    min-height: 10rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;

    .template-item__thumbnail {
      max-height: 18rem;
      min-height: 11rem;
      margin: 0 0.5rem;

      img {
        width: 100%;
      }
    }
  }

  // Notices on the preview
  .item-notices {
    position: absolute;
    bottom: 0;
    left: 0;

    .item-notice {
      width: 100%;
      padding: 4px 10px;
      margin: 0;
    }

    .components-notice__actions {
      gap: 8px;

      > .components-notice__action {
        margin: 4px 0 0 !important;
      }
    }
  }

  // Pro badges
  .template-item__badges {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    > * {
      display: inline-block;
      padding: 3px 6px;
      color: #fff;
      background-color: var(--wp-admin-theme-color, #007cba);
      border-radius: 2px;

      + * {
        margin-left: 4px;
      }
    }
  }

  // Footer
  .template-item__footer {
    padding: 12px !important;
    overflow: auto;
    background-color: #f0f0f0;
    border-top: 1px solid #ddd;

    > * {
      margin: 0 0 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // Wrapper of title(s)
  .template-item__title-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px !important;

    .template-item__title {
      width: 100%;
      margin-top: 0;
      margin-bottom: 4px !important;
      overflow: hidden;
      font-size: 1rem;
      line-height: 1.4;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // With view details link
    &.is-pattern-title {
      align-items: center;
      .template-item__title {
        max-width: calc(100% - 80px);
      }

      .template-item__details {
        margin-left: auto;
      }
    }
  }

  // Make long description scrollable
  .template-item__description {
    max-height: 90px;
  }

  // Tutorials, resource links
  .template-item__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    width: 100%;
    margin: 0;

    li {
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .template-item__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;

    > *:not(button) {
      flex-basis: 100%;
    }
  }

  // Ready
  &.is-ready {
    .template-item__preview {
      cursor: pointer;

      &:focus {
        border: 1px solid var(--wp-admin-theme-color, #007cba);
      }
    }

    &:hover {
      border-color: var(--wp-admin-theme-color, #007cba);
    }
  }

  // Is inserting
  &.is-inserting {
    .template-item__preview {
      opacity: 0.6;
    }

    .components-spinner {
      top: calc(50% - 16px);
      left: calc(50% - 16px);
    }
  }

  // Has missing blocks
  &.has-missing-blocks {
    .template-item__preview {
      padding: 1.25rem;
    }
  }
`,un=({items:e,allItems:t,onChangePage:n,currentPage:r=1,pageSize:a=6,TemplateItemControl:i})=>t.length?(0,b.createElement)(b.Fragment,null,(0,b.createElement)(ln,{className:"template-list"},e.map((e=>(0,b.createElement)(i,{item:e,key:e.id})))),(0,b.createElement)(sn,{current:r,total:Math.ceil(t.length/a),onChange:n})):(0,b.createElement)("div",{className:"template-list-not-found"},(0,v.__)("There is no items found.","content-blocks-builder")),dn=["boldblocks/svg-block","boldblocks/icon-separator","boldblocks/youtube-block","boldblocks/breadcrumb-block","boldblocks/counting-number"],pn=(e,t=[])=>{if(!e.length)return t;for(let n=0;n<e.length;n++){const{name:r,innerBlocks:a=[],attributes:{originalName:i=""}={}}=e[n];let o="core/missing"===r?i:r;-1===t.indexOf(o)&&t.push(o),t=pn(a,t)}return t},mn=(0,ot.applyFilters)("boldblocks.CBB.isPremium",!1),fn={installPlugin:(0,v.__)("Install %s","content-blocks-builder"),activatePlugin:(0,v.__)("Activate %s","content-blocks-builder"),blockName:(0,v.__)("Block name: %s","content-blocks-builder"),parentBlockName:(0,v.__)("Parent block: %s","content-blocks-builder"),variationName:(0,v.__)("Variation name: %s","content-blocks-builder"),warningRequiresOtherCBBItems:(0,v.__)("This item requires additional blocks or variations from the library.","content-blocks-builder"),warningRequiresExternalBlocks:(0,v.__)("This item requires the following external block(s): %s. You must install and/or activate the required plugin(s) to use it.","content-blocks-builder"),warningRequiresPro:(0,v.__)("This item requires the Pro version of the plugin.","content-blocks-builder"),warningInstallActivatePlugins:(0,v.__)("You must install and/or activate the required plugin(s) to use this item.","content-blocks-builder"),warningManagePluginsPermission:(0,v.__)("You don't have permission to manage plugins, please contact the administrator for help.","content-blocks-builder"),successInstalledActivatedPlugin:(0,v.__)("The plugin %s has been installed and activated.","content-blocks-builder"),successActivatedPlugin:(0,v.__)("The plugin %s has been activated.","content-blocks-builder"),successReloadPage:(0,v.__)("Reloading the page.","content-blocks-builder"),actionImportAllCBBItems:(0,v.__)("Import all required item(s)","content-blocks-builder"),labelTutorials:(0,v.__)("Tutorials:","content-blocks-builder"),labelResources:(0,v.__)("Resources:","content-blocks-builder"),labelDependencies:(0,v.__)("Dependencies:","content-blocks-builder")},gn=({isPro:e,hasProFeatures:t})=>(0,b.createElement)(b.Fragment,null,(e||t)&&(0,b.createElement)("div",{className:"template-item__badges"},e&&(0,b.createElement)("span",{className:"pro-item"},(0,v.__)("Pro","content-blocks-builder")),t&&(0,b.createElement)("span",{className:"pro-features-item"},(0,v.__)("Has pro features","content-blocks-builder")))),hn=({links:e,label:t})=>(0,b.createElement)(b.Fragment,null,!!e?.length&&(0,b.createElement)("ul",{className:"template-item__links"},(0,b.createElement)("li",{className:"template-item__label"},(0,b.createElement)("strong",null,t)),e.map((({url:e,title:t},n)=>(0,b.createElement)("li",{className:"template-item__link",key:n},(0,b.createElement)("a",{href:e,target:"_blank"},t)))))),bn=({notices:e})=>(0,b.createElement)(b.Fragment,null,!!e?.length&&(0,b.createElement)("div",{className:"item-notices"},e.map((({type:e,message:t,actions:n=[],customActions:r=null},a)=>(0,b.createElement)(k.Notice,{className:"item-notice",status:e,isDismissible:!1,key:`notice-${a}`,actions:n},t,r))))),vn=({items:e,label:t,type:n})=>(0,b.createElement)(b.Fragment,null,!!e?.length&&(0,b.createElement)("ul",{className:"template-item__links"},!!t&&(0,b.createElement)("li",{className:"template-item__label"},(0,b.createElement)("strong",null,t)),e.map((({title:e},t)=>(0,b.createElement)("li",{className:"template-item__link",key:`${n}-${t}`},(0,b.createElement)("code",null,e)))))),yn=({missingPlugins:e,inactivePlugins:t,libraryState:n,updateLibraryState:r,onPluginInstalled:i,onPluginActivated:o})=>{const{activatingPlugins:s=[],installingPlugins:l=[]}=n,c=e=>r({activatingPlugins:e}),u=e=>r({installingPlugins:e});return(0,b.createElement)(b.Fragment,null,(!!e?.length||!!t?.length)&&(0,b.createElement)("div",{className:"template-item__actions"},!!e.length&&e.map((({name:e,slug:t})=>!n?.isReloading&&(0,b.createElement)(k.Button,{key:t,variant:"primary",size:"small",disabled:!!l.length,isBusy:!!l.length&&-1!==l.indexOf(t),onClick:n=>{n.preventDefault(),u([...l,t]),a()({path:"wp/v2/plugins",method:"POST",data:{slug:t,status:"active"}}).then((()=>{i(e)})).catch((e=>mt(e,"error"))).finally((()=>u(l.filter((e=>e!==t)))))}},(0,v.sprintf)(fn.installPlugin,e)))),!!t.length&&t.map((({name:e,plugin:t,slug:r})=>!n?.isReloading&&(0,b.createElement)(k.Button,{key:r,variant:"primary",size:"small",disabled:!!s.length,isBusy:!!s.length&&-1!==s.indexOf(r),onClick:n=>{n.preventDefault(),c([...s,r]),a()({path:`wp/v2/plugins/${t}`,method:"POST",data:{status:"active"}}).then((()=>{o(e)})).catch((e=>mt(e,"error"))).finally((()=>{c(s.filter((e=>e!==r)))}))}},(0,v.sprintf)(fn.activatePlugin,e))))))},wn=({label:e,handleClick:t})=>{const[n,r]=(0,_.useState)(!1),[a,i]=(0,_.useState)(!1);return(0,b.createElement)("div",{className:"components-notice__actions"},(0,b.createElement)(k.Button,{variant:"primary",size:"small",className:"components-notice__action",disabled:n||a,isBusy:n,onClick:e=>{e.preventDefault(),r(!0),t({setIsImported:i,setIsImporting:r})}},e))},kn=({href:e,label:t=(0,v.__)("Learn more","content-blocks-builder")})=>(0,b.createElement)(k.ExternalLink,{href:e},t),xn=({item:e,canManagePlugins:t,plugins:n,availableBlockNames:r,localBlocks:o,localVariations:s,isPremium:l,setItemNotices:c,isItemLoadingData:u,reload:d})=>(0,_.useMemo)((()=>{var p,m;if(!e?.slug||u||(0,A.isUndefined)(t))return{};let f=[];const g=null!==(p=e?.variations)&&void 0!==p?p:[];if(g?.length&&s?.length){const e=(0,A.map)(s,"slug");f=g.filter((({slug:t})=>-1===e.indexOf(t)))}const h=null!==(m=e?.libraryBlocks)&&void 0!==m?m:[];let y,_=[];if(h?.length){const e=(0,A.map)(o,"slug");_=h.filter((({slug:t})=>-1===e.indexOf(t)))}let w=(e=>{var t;let n;if((e=(null!==(t=e)&&void 0!==t?t:"").replaceAll(/\w+:\/\/\S*(w=(\d*))&(h=(\d*))&\w+\S*"/g,((e,t,n,r,a)=>n>800?e.replace(t,"w="+Math.floor(Number(n)/2)).replace(r,"h="+Math.floor(Number(a)/2)):e)))&&(n=JSON.parse(e),n.length)){var r;const{attributes:{boldblocks:{height:e}={}}={}}=null!==(r=n[0])&&void 0!==r?r:{};if((0,A.isObject)(e)&&!(0,A.isEmpty)(e)){let{lg:{value:{value:t}}={}}=e;"100vh"===t&&(n[0]={...n[0],attributes:{...n[0].attributes,boldblocks:{...n[0].attributes.boldblocks,height:{...e,lg:{value:{height:"96vh",value:"96vh"}}}}}})}}return n})(e.meta?.blocks),k=e.meta?.dependent_blocks;e?.thumbnail||(0,A.isArray)(k)&&k.length||!w||(k=pn(w,[])),(0,A.isArray)(k)&&k.length&&(y=((e,t)=>{let n=[];t=t.filter((e=>0!==e.indexOf("core/"))),e=(e=e.filter((e=>0!==e.indexOf("core/")))).filter((e=>0!==e.indexOf("boldblocks/")||-1!==dn.indexOf(e)));for(let r=0;r<e.length;r++)-1===t.indexOf(e[r])&&n.push(e[r]);return n})(k,r));const x=y?.length||_?.length;!x&&w&&(w=(0,tt.createBlocksFromInnerBlocksTemplate)(w));const E=e?.meta?.tutorials,T=e?.meta?.external_resources,S=e.meta?.dependencies,C=t&&n.length&&S?S.filter((({slug:e})=>!(0,A.find)(n,["slug",e]))):[],N=t&&n.length&&S?S.map((({slug:e})=>{const t=(0,A.find)(n,["slug",e]);return!(!t||"inactive"!==t?.status)&&t})).filter((e=>e)):[],P=e?.meta?.is_pro,O=e?.meta?.has_pro_features;let I=[];return x?((_?.length||f?.length)&&I.push({type:"warning",message:(0,b.createElement)(b.Fragment,null,fn.warningRequiresOtherCBBItems,t&&(0,b.createElement)(b.Fragment,null," ",(0,b.createElement)(kn,{href:(0,i.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library"),label:(0,v.__)("Browse block library","content-blocks-builder")})," ",(0,b.createElement)(kn,{href:(0,i.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-variation-library"),label:(0,v.__)("Browse variation library","content-blocks-builder")}))),customActions:(0,b.createElement)(b.Fragment,null,t&&(0,b.createElement)(wn,{label:fn.actionImportAllCBBItems,handleClick:({setIsImported:e,setIsImporting:t})=>{Promise.all([Promise.all(_.map((async e=>(async({item:e,existingId:t=!1,localVariations:n,finishCallback:r=A.noop})=>{const{title:i,slug:o,content:s,keywords:l,variations:c,parentVariations:u,meta:{boldblocks_is_pro:d,boldblocks_has_pro_features:p,boldblocks_download_count:m,boldblocks_download_7_count:f,boldblocks_download_30_count:g,boldblocks_download_stats:h,boldblocks_tutorials:b,boldblocks_external_resources:y,is_pro:_,has_pro_features:w,download_count:k,download_7_count:x,download_30_count:E,download_stats:T,tutorials:S,external_resources:C,...N}={}}=e,P={title:i,slug:o,content:s,meta:N,keywords:l},O=[];c&&c?.length&&O.push(...c.map((({title:e,content:t,slug:n,meta:r})=>({title:e,content:t,slug:n,meta:r})))),u&&u?.length&&O.push(...u.map((({title:e,content:t,slug:n,meta:r})=>({title:e,content:t,slug:n,meta:r}))));let I=[];return a()({path:t?`wp/v2/boldblocks-blocks/${t}`:"wp/v2/boldblocks-blocks",method:"POST",data:{...P,status:"publish"}}).then((e=>(I.push({id:e.id,slug:P.slug,type:"success",message:(0,v.sprintf)((0,v.__)("The block '%s' has been imported successfully.","content-blocks-builder"),P.title)}),O.length?Promise.all(O.map((async e=>{const t=((e,t)=>t.find((t=>e===t.slug)))(e.slug,n);return a()({path:t?`wp/v2/boldblocks-variations/${t.id}`:"boldblocks/v1/createVariation",method:"POST",data:{...e,status:"publish"}}).then((n=>({id:t?n.id:n?.post?.id,slug:e.slug,type:"success",message:(0,v.sprintf)((0,v.__)("The variation '%s' has been imported successfully.","content-blocks-builder"),e.title)}))).catch((t=>(console.error(t),{slug:e.slug,type:"error",message:(0,v.sprintf)((0,v.__)("Failed to import variation: '%s'.","content-blocks-builder"),e.title)})))}))).then((e=>{I.push(...e),r(I)})):r(I),I))).catch((e=>(console.error(e),I.push({slug:P.slug,type:"error",message:(0,v.sprintf)((0,v.__)("Failed to import block: '%s'.","content-blocks-builder"),P.title)}),r(I),I)))})({item:e})))).then((e=>{const t=[];return e.forEach((e=>e.forEach((e=>t.push(e))))),t})),Promise.all(f.map((async e=>(async({item:e,existingId:t=!1,finishCallback:n=A.noop})=>{const{title:r,slug:i,content:o,meta:{boldblocks_is_pro:s,boldblocks_has_pro_features:l,boldblocks_download_count:c,boldblocks_download_7_count:u,boldblocks_download_30_count:d,boldblocks_download_stats:p,boldblocks_tutorials:m,boldblocks_external_resources:f,is_pro:g,has_pro_features:h,download_count:b,download_7_count:y,download_30_count:_,download_stats:w,tutorials:k,external_resources:x,boldblocks_is_queryable:E,...T}={}}=e,S={title:r,slug:i,content:o,meta:T};let C=[];return a()({path:t?`wp/v2/boldblocks-variations/${t}`:"boldblocks/v1/createVariation",method:"POST",data:{...S,status:"publish"}}).then((e=>(C.push({id:t?e.id:e?.post?.id,slug:S.slug,type:"success",message:(0,v.sprintf)((0,v.__)("The variation '%s' has been imported successfully.","content-blocks-builder"),S.title)}),n(C),C))).catch((e=>(console.error(e),C.push({slug:S.slug,type:"error",message:(0,v.sprintf)((0,v.__)("Failed to import variation: '%s'.","content-blocks-builder"),S.title)}),n(C),C)))})({item:e})))).then((e=>{const t=[];return e.forEach((e=>e.forEach((e=>t.push(e))))),t}))]).then((n=>{t(!1),e(!0);let r=[];n.forEach((e=>{r=[...r,...e]})),r=[...r,{type:"success",message:fn.successReloadPage}],c([...I,...r]),d()}))}}))}),y?.length&&I.push({type:"warning",message:(0,v.sprintf)(fn.warningRequiresExternalBlocks,y.join(", "))}),!y?.length||(0,A.isUndefined)(t)||t||I.push({type:"warning",message:fn.warningManagePluginsPermission})):(C.length||N.length)&&I.push({type:"warning",message:fn.warningInstallActivatePlugins}),!l&&P&&I.push({type:"warning",message:fn.warningRequiresPro}),c([...I]),{blocks:w,isMissingBlocks:x,tutorials:E,externalResources:T,dependentPlugins:S,customVariations:g,customBlocks:h,missingPlugins:C,inactivePlugins:N,isPro:P,hasProFeatures:O}}),[e?.slug,t,n,l,u,s]),En=({item:e})=>{const{libraryState:t,stateCacheKey:n,updateLibraryState:r,onInsertPattern:a,availableBlockNames:i,plugins:o,canManagePlugins:s,localBlocks:l,localVariations:c,isResolvingLocalData:u,contentType:d}=(0,_.useContext)(yt),[,p]=at(n),m=()=>((e,t,n,r=500)=>{n({isReloading:!0}),setTimeout((()=>{t(e);const n=new vt;n.set("bb-template-modal",1),n.reload()}),r)})(t,p,r),f=(g=e.title,(h=document.createElement("textarea")).innerHTML=g,h.value);var g,h;const y=e?.loadingFullData||u,[w,x]=(0,_.useState)([]),{blocks:E,isMissingBlocks:T,tutorials:S,externalResources:A,dependentPlugins:N=[],customVariations:P,customBlocks:O,missingPlugins:I,inactivePlugins:L,isPro:R,hasProFeatures:M}=xn({item:e,canManagePlugins:s,plugins:o,availableBlockNames:i,localBlocks:l,localVariations:c,setItemNotices:x,isItemLoadingData:y,reload:m}),D=!y&&!T&&!I?.length&&!L?.length&&(!R||mn),B=(0,_.useCallback)((()=>{D&&!t?.insertingItem&&(r({insertingItem:e.id}),setTimeout((()=>{a({id:e.id,title:f},E)}),0))}),[D,t?.insertingItem,e.id,f,E]),z=(0,_.useMemo)((()=>e?.slug?(0,b.createElement)("div",{className:"template-item__preview",onClick:B,onKeyDown:e=>{"Enter"===e.key&&B()},tabIndex:0},e?.thumbnail?(0,b.createElement)("div",{className:"template-item__thumbnail scrollbar",dangerouslySetInnerHTML:{__html:e?.thumbnail}}):!T&&(0,b.createElement)(rt.BlockPreview,{blocks:E,viewportWidth:1400}),(0,b.createElement)(gn,{isPro:R,hasProFeatures:M}),(0,b.createElement)(bn,{notices:w})):(0,b.createElement)("div",{className:"template-item__preview"})),[e?.slug,B,R,M,w]);return(0,b.createElement)(b.Fragment,null,(0,b.createElement)(cn,{className:C("template-item",{"is-ready":D,"is-pro":R,"has-pro-features":M,"has-missing-blocks":T,"require-pro":!mn&&R,"is-loading-data":y,"is-inserting":t?.insertingItem===e.id})},(y||t?.insertingItem===e.id)&&(0,b.createElement)(k.Spinner,null),z,(0,b.createElement)("div",{className:"template-item__footer"},(0,b.createElement)("div",{className:"template-item__title-wrapper is-pattern-title"},(0,b.createElement)("h3",{className:"template-item__title"},f),e?.slug&&(0,b.createElement)("a",{href:`${Et(d)}/pattern/${e?.slug}?utm_source=CBB&utm_campaign=pattern-inserter&utm_medium=link&utm_content=view-pattern`,className:"template-item__details",target:"_blank"},(0,v.__)("View details","content-blocks-builder"))),(0,b.createElement)("div",{className:"template-item__actions"},(0,b.createElement)(vn,{items:O,label:`${Rt.blocks}:`,type:"block"}),(0,b.createElement)(vn,{items:P,label:`${Rt.variations}:`,type:"variation"}),(0,b.createElement)(hn,{links:S,label:fn.labelTutorials}),(0,b.createElement)(hn,{links:A,label:fn.labelResources}),(0,b.createElement)(hn,{links:N.map((({slug:e,name:t})=>({url:`https://wordpress.org/plugins/${e}`,title:t}))),label:fn.labelDependencies})),(0,b.createElement)(yn,{missingPlugins:I,inactivePlugins:L,libraryState:t,updateLibraryState:r,onPluginInstalled:e=>{x([...w,{type:"success",message:(0,v.sprintf)(fn.successInstalledActivatedPlugin,e)},{type:"success",message:fn.successReloadPage}]),m()},onPluginActivated:e=>{x([...w,{type:"success",message:(0,v.sprintf)(fn.successActivatedPlugin,e)},{type:"success",message:fn.successReloadPage}]),m()}}))))},Tn=et(k.Modal)`
  .components-modal__content {
    display: flex;
    padding: 1rem;
    background-color: #f9f9f9;

    > div {
      width: 100%;
    }
  }

  .cbb-library {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
  }

  &.is-locked {
    pointer-events: none;
  }
`;function Sn({isModalOpen:t=!1,setIsModalOpen:n,onCancel:r=A.noop,className:a}){const i="pattern",o=(0,A.capitalize)(i),s=`get${o}s`,l=`loadFull${o}s`,c=`get${o}Keywords`,u=`get${o}LibraryState`,d=`set${o}LibraryState`,p=`bb-library-state-${i}`,m={..._t,contentType:i},{[s]:f,[c]:h,[u]:y,getPlugins:w}=(0,e.useSelect)((e=>e(g)),[]),{[d]:x}=(0,e.useDispatch)(g),E=()=>{n(!1),x({...z,insertingItem:""}),r()},T=(0,e.useSelect)((e=>e(nt.store).canUser("create","users")),[]);let S=w();const N=Tt("getPlugins");let P=St("getPlugins");(0,A.isUndefined)(T)||T||(P=!0);const O=f(),I=Tt(s),L=St(s),R=h(),M=Tt(c),[D,B]=at(p),[z,F]=(0,_.useReducer)(wt,m,(()=>{const e=Object.assign(m,y(),null!=D?D:{});return B(null),e})),{currentPage:U=1,pageSize:H=6}=z,j=e=>((e,t)=>e({type:"UPDATE_STATE",payload:t}))(F,e),{[l]:V}=(0,e.useDispatch)(g),[$,q]=((e,t,n)=>{const{pageSize:r,currentPage:a,sortType:i,selectedKeywords:o,searchTerm:s}=e,l=o.join(","),c=(0,_.useMemo)((()=>kt(o,t)),[l,t]),u=(0,_.useMemo)((()=>s&&s.length>=3?((e,t)=>{let n;if(!e||e.length<3)n=t;else{const r=bt().go(e,t,xt);n=r.length?r.map((({obj:e})=>e)):[]}return n})(s,c):c),[s,c]),d=(0,_.useMemo)((()=>u.sort(((e,t={"30_days":"count_30","7_days":"count_7"})=>{let n;return"featured"===e?n=(e,t)=>t.order-e.order:"latest"===e?n=(e,t)=>t.id-e.id:"30_days"===e?n=(e,n)=>n.meta[t["30_days"]]-e.meta[t["30_days"]]:"7_days"===e&&(n=(e,n)=>n.meta[t["7_days"]]-e.meta[t["7_days"]]),n})(i))),[u,i]);let p=d.slice((a-1)*r,r*a);p=p.map((e=>({...e,loadingFullData:!e?.slug})));let m=p.map((({id:e,loadingFullData:t})=>!!t&&e)).filter((e=>e));const[,f]=(0,_.useReducer)((()=>({})));return m.length&&n(m).then((()=>{f()})),[p,d]})(z,O,V),K=I||N||(0,A.isUndefined)(T),W=L&&P,G=(0,tt.getBlockTypes)(),Y=(0,A.map)(G,"name"),[,X]=function({shouldFocusBlock:t=!0}){const{getSelectedBlock:n}=(0,e.useSelect)(rt.store),{destinationRootClientId:r,destinationIndex:a}=(0,e.useSelect)((e=>{const{getSelectedBlockClientId:t,getBlockRootClientId:n,getBlockIndex:r,getBlockOrder:a}=e(rt.store),i=t();let o,s;return i?(o=n(i),s=r(i)+1):s=a(o).length,{destinationRootClientId:o,destinationIndex:s}}),[]),{replaceBlocks:i,insertBlocks:o}=(0,e.useDispatch)(rt.store),s=(0,_.useCallback)(((e,s,l=!1)=>{const c=n();c&&(0,tt.isUnmodifiedDefaultBlock)(c)?i(c.clientId,e,null,t||l?0:null,s):o(e,a,r,!0,t||l?0:null,s);const u=Array.isArray(e)?e.length:1,d=(0,v.sprintf)(
// translators: %d: the name of the block that has been added
// translators: %d: the name of the block that has been added
(0,v._n)("%d block added.","%d blocks added.",u),u);(0,ft.speak)(d)}),[n,i,o,r,a,t]),{createSuccessNotice:l}=(0,e.useDispatch)(gt.store),c=(0,_.useCallback)(((e,t)=>{s((null!=t?t:[]).map((e=>(0,tt.cloneBlock)(e))),e.title),l((0,v.sprintf)(/* translators: %s: block pattern title. */ /* translators: %s: block pattern title. */
(0,v.__)('Block pattern "%s" inserted.',"content-blocks-builder"),e.title),{type:"snackbar"})}),[l,s]);return[r,c]}({shouldFocusBlock:!0}),Z=(e,t)=>{X(e,t),j({insertingItem:""}),fetch(`${Et(i)}/wp-json/boldblocks/v1/submitDownload${o}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.id}),credentials:"omit"}),E()},{records:Q,isResolving:J}=(0,nt.useEntityRecords)("postType","boldblocks_block",{per_page:-1,_cbb_load_all:!0}),{records:ee,isResolving:te}=(0,nt.useEntityRecords)("postType","boldblocks_variation",{per_page:-1,_cbb_load_all:!0}),ne=(0,_.useMemo)((()=>({libraryState:z,stateCacheKey:p,updateLibraryState:j,availableBlockNames:Y,plugins:S,canManagePlugins:T,onInsertPattern:Z,localBlocks:Q,localVariations:ee,isResolvingLocalData:J||te,isFinishedLoadingItemsData:L,itemsData:O,filteredFullItemsData:q,itemKeywords:R,isLoadingKeywords:M,closeModal:E,isModalOpen:t,contentType:i})),[z,p,j,Y,S,T,Z,Q,J,ee,te,L,O,q,R,M,E,t,i]);return(0,b.createElement)(yt.Provider,{value:ne},(0,b.createElement)(Tn,{onRequestClose:()=>E(),className:C("template-modal",a,{"is-locked":z?.installingPlugins?.length||z?.activatingPlugins?.length||z?.insertingItem||z?.isReloading}),isFullScreen:!0,__experimentalHideHeader:!0},(0,b.createElement)(Ct,{className:"cbb-library"},(0,b.createElement)(Ot,null),K&&(0,b.createElement)(k.Spinner,null),(0,b.createElement)("div",{className:"template-list-wrapper scrollbar"},W&&(0,b.createElement)(b.Fragment,null,(0,b.createElement)(un,{items:$,allItems:q,onChangePage:e=>{j({currentPage:e})},currentPage:U,pageSize:H,TemplateItemControl:En}))))))}(0,y.registerPlugin)("boldblocks-block-templates",{render:()=>{const t=(0,e.useSelect)((e=>e(w.store).getCurrentPostType()),[]),n=(0,e.useSelect)((e=>e(g).getPatternInserterModalStatus()),[]),r=function(){const{setPatternInserterModalStatus:t}=(0,e.useDispatch)(g);return t}();if(["boldblocks_block","boldblocks_variation"].includes(t))return null;const a=new vt;a.get("bb-template-modal")&&(r(!0),a.delete("bb-template-modal"));const i=Object.assign(document.createElement("div"),{id:"boldblocks-templates-inserter"});return(0,_.createRoot)(i).render((0,b.createElement)(k.Button,{variant:"secondary",className:"button-insert-template",icon:T,onClick:()=>{r(!0)}},(0,b.createElement)("span",{className:"button-insert-template__text"},(0,v.__)("Pattern","content-blocks-builder")))),(0,e.subscribe)((()=>{setTimeout((()=>{const e=document.querySelector(".edit-post-header-toolbar");e&&!e.querySelector("#boldblocks-templates-inserter")&&(e.append(i),e.classList.add("has-cbb-pattern-button"))}),1)})),(0,b.createElement)(b.Fragment,null,!!n&&(0,b.createElement)(Sn,{isModalOpen:n,setIsModalOpen:r}))}})})()})();