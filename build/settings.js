(()=>{var e={838:function(e){e.exports=function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:a,getOwnPropertyDescriptor:r}=Object;let{freeze:o,seal:i,create:l}=Object,{apply:s,construct:c}="undefined"!=typeof Reflect&&Reflect;o||(o=function(e){return e}),i||(i=function(e){return e}),s||(s=function(e,t,n){return e.apply(t,n)}),c||(c=function(e,t){return new e(...t)});const u=x(Array.prototype.forEach),d=x(Array.prototype.pop),m=x(Array.prototype.push),p=x(String.prototype.toLowerCase),f=x(String.prototype.toString),g=x(String.prototype.match),h=x(String.prototype.replace),b=x(String.prototype.indexOf),y=x(String.prototype.trim),v=x(Object.prototype.hasOwnProperty),_=x(RegExp.prototype.test),k=(w=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c(w,t)}),E=x(Number.isNaN);var w;function x(e){return function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];return s(e,t,a)}}function C(e,a){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p;t&&t(e,null);let o=a.length;for(;o--;){let t=a[o];if("string"==typeof t){const e=r(t);e!==t&&(n(a)||(a[o]=e),t=e)}e[t]=!0}return e}function S(e){for(let t=0;t<e.length;t++)v(e,t)||(e[t]=null);return e}function T(t){const n=l(null);for(const[a,r]of e(t))v(t,a)&&(Array.isArray(r)?n[a]=S(r):r&&"object"==typeof r&&r.constructor===Object?n[a]=T(r):n[a]=r);return n}function N(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return x(n.get);if("function"==typeof n.value)return x(n.value)}e=a(e)}return function(){return null}}const F=o(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),A=o(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),B=o(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),P=o(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),O=o(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),L=o(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),R=o(["#text"]),I=o(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),D=o(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),M=o(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),z=o(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),H=i(/\{\{[\w\W]*|[\w\W]*\}\}/gm),U=i(/<%[\w\W]*|[\w\W]*%>/gm),$=i(/\${[\w\W]*}/gm),V=i(/^data-[\-\w.\u00B7-\uFFFF]/),G=i(/^aria-[\-\w]+$/),j=i(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),W=i(/^(?:\w+script|data):/i),Y=i(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=i(/^html$/i),Q=i(/^[a-z][.\w]*(-[.\w]+)+$/i);var J=Object.freeze({__proto__:null,MUSTACHE_EXPR:H,ERB_EXPR:U,TMPLIT_EXPR:$,DATA_ATTR:V,ARIA_ATTR:G,IS_ALLOWED_URI:j,IS_SCRIPT_OR_DATA:W,ATTR_WHITESPACE:Y,DOCTYPE_NAME:q,CUSTOM_ELEMENT:Q});const K=1,X=3,Z=7,ee=8,te=9,ne=function(){return"undefined"==typeof window?null:window};return function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne();const a=e=>t(e);if(a.version="3.1.3",a.removed=[],!n||!n.document||n.document.nodeType!==te)return a.isSupported=!1,a;let{document:r}=n;const i=r,s=i.currentScript,{DocumentFragment:c,HTMLTemplateElement:w,Node:x,Element:S,NodeFilter:H,NamedNodeMap:U=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:$,DOMParser:V,trustedTypes:G}=n,W=S.prototype,Y=N(W,"cloneNode"),Q=N(W,"nextSibling"),ae=N(W,"childNodes"),re=N(W,"parentNode");if("function"==typeof w){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let oe,ie="";const{implementation:le,createNodeIterator:se,createDocumentFragment:ce,getElementsByTagName:ue}=r,{importNode:de}=i;let me={};a.isSupported="function"==typeof e&&"function"==typeof re&&le&&void 0!==le.createHTMLDocument;const{MUSTACHE_EXPR:pe,ERB_EXPR:fe,TMPLIT_EXPR:ge,DATA_ATTR:he,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:ye,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:_e}=J;let{IS_ALLOWED_URI:ke}=J,Ee=null;const we=C({},[...F,...A,...B,...O,...R]);let xe=null;const Ce=C({},[...I,...D,...M,...z]);let Se=Object.seal(l(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Te=null,Ne=null,Fe=!0,Ae=!0,Be=!1,Pe=!0,Oe=!1,Le=!0,Re=!1,Ie=!1,De=!1,Me=!1,ze=!1,He=!1,Ue=!0,$e=!1,Ve=!0,Ge=!1,je={},We=null;const Ye=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let qe=null;const Qe=C({},["audio","video","img","source","image","track"]);let Je=null;const Ke=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xe="http://www.w3.org/1998/Math/MathML",Ze="http://www.w3.org/2000/svg",et="http://www.w3.org/1999/xhtml";let tt=et,nt=!1,at=null;const rt=C({},[Xe,Ze,et],f);let ot=null;const it=["application/xhtml+xml","text/html"];let lt=null,st=null;const ct=r.createElement("form"),ut=function(e){return e instanceof RegExp||e instanceof Function},dt=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!st||st!==e){if(e&&"object"==typeof e||(e={}),e=T(e),ot=-1===it.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,lt="application/xhtml+xml"===ot?f:p,Ee=v(e,"ALLOWED_TAGS")?C({},e.ALLOWED_TAGS,lt):we,xe=v(e,"ALLOWED_ATTR")?C({},e.ALLOWED_ATTR,lt):Ce,at=v(e,"ALLOWED_NAMESPACES")?C({},e.ALLOWED_NAMESPACES,f):rt,Je=v(e,"ADD_URI_SAFE_ATTR")?C(T(Ke),e.ADD_URI_SAFE_ATTR,lt):Ke,qe=v(e,"ADD_DATA_URI_TAGS")?C(T(Qe),e.ADD_DATA_URI_TAGS,lt):Qe,We=v(e,"FORBID_CONTENTS")?C({},e.FORBID_CONTENTS,lt):Ye,Te=v(e,"FORBID_TAGS")?C({},e.FORBID_TAGS,lt):{},Ne=v(e,"FORBID_ATTR")?C({},e.FORBID_ATTR,lt):{},je=!!v(e,"USE_PROFILES")&&e.USE_PROFILES,Fe=!1!==e.ALLOW_ARIA_ATTR,Ae=!1!==e.ALLOW_DATA_ATTR,Be=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Pe=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,Oe=e.SAFE_FOR_TEMPLATES||!1,Le=!1!==e.SAFE_FOR_XML,Re=e.WHOLE_DOCUMENT||!1,Me=e.RETURN_DOM||!1,ze=e.RETURN_DOM_FRAGMENT||!1,He=e.RETURN_TRUSTED_TYPE||!1,De=e.FORCE_BODY||!1,Ue=!1!==e.SANITIZE_DOM,$e=e.SANITIZE_NAMED_PROPS||!1,Ve=!1!==e.KEEP_CONTENT,Ge=e.IN_PLACE||!1,ke=e.ALLOWED_URI_REGEXP||j,tt=e.NAMESPACE||et,Se=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Se.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(Ae=!1),ze&&(Me=!0),je&&(Ee=C({},R),xe=[],!0===je.html&&(C(Ee,F),C(xe,I)),!0===je.svg&&(C(Ee,A),C(xe,D),C(xe,z)),!0===je.svgFilters&&(C(Ee,B),C(xe,D),C(xe,z)),!0===je.mathMl&&(C(Ee,O),C(xe,M),C(xe,z))),e.ADD_TAGS&&(Ee===we&&(Ee=T(Ee)),C(Ee,e.ADD_TAGS,lt)),e.ADD_ATTR&&(xe===Ce&&(xe=T(xe)),C(xe,e.ADD_ATTR,lt)),e.ADD_URI_SAFE_ATTR&&C(Je,e.ADD_URI_SAFE_ATTR,lt),e.FORBID_CONTENTS&&(We===Ye&&(We=T(We)),C(We,e.FORBID_CONTENTS,lt)),Ve&&(Ee["#text"]=!0),Re&&C(Ee,["html","head","body"]),Ee.table&&(C(Ee,["tbody"]),delete Te.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw k('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw k('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');oe=e.TRUSTED_TYPES_POLICY,ie=oe.createHTML("")}else void 0===oe&&(oe=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const a="data-tt-policy-suffix";t&&t.hasAttribute(a)&&(n=t.getAttribute(a));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}}(G,s)),null!==oe&&"string"==typeof ie&&(ie=oe.createHTML(""));o&&o(e),st=e}},mt=C({},["mi","mo","mn","ms","mtext"]),pt=C({},["foreignobject","annotation-xml"]),ft=C({},["title","style","font","a","script"]),gt=C({},[...A,...B,...P]),ht=C({},[...O,...L]),bt=function(e){m(a.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},yt=function(e,t){try{m(a.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){m(a.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!xe[e])if(Me||ze)try{bt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},vt=function(e){let t=null,n=null;if(De)e="<remove></remove>"+e;else{const t=g(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===ot&&tt===et&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const a=oe?oe.createHTML(e):e;if(tt===et)try{t=(new V).parseFromString(a,ot)}catch(e){}if(!t||!t.documentElement){t=le.createDocument(tt,"template",null);try{t.documentElement.innerHTML=nt?ie:a}catch(e){}}const o=t.body||t.documentElement;return e&&n&&o.insertBefore(r.createTextNode(n),o.childNodes[0]||null),tt===et?ue.call(t,Re?"html":"body")[0]:Re?t.documentElement:o},_t=function(e){return se.call(e.ownerDocument||e,e,H.SHOW_ELEMENT|H.SHOW_COMMENT|H.SHOW_TEXT|H.SHOW_PROCESSING_INSTRUCTION|H.SHOW_CDATA_SECTION,null)},kt=function(e){return e instanceof $&&(void 0!==e.__depth&&"number"!=typeof e.__depth||void 0!==e.__removalCount&&"number"!=typeof e.__removalCount||"string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof U)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},Et=function(e){return"function"==typeof x&&e instanceof x},wt=function(e,t,n){me[e]&&u(me[e],(e=>{e.call(a,t,n,st)}))},xt=function(e){let t=null;if(wt("beforeSanitizeElements",e,null),kt(e))return bt(e),!0;const n=lt(e.nodeName);if(wt("uponSanitizeElement",e,{tagName:n,allowedTags:Ee}),e.hasChildNodes()&&!Et(e.firstElementChild)&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent))return bt(e),!0;if(e.nodeType===Z)return bt(e),!0;if(Le&&e.nodeType===ee&&_(/<[/\w]/g,e.data))return bt(e),!0;if(!Ee[n]||Te[n]){if(!Te[n]&&St(n)){if(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,n))return!1;if(Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))return!1}if(Ve&&!We[n]){const t=re(e)||e.parentNode,n=ae(e)||e.childNodes;if(n&&t)for(let a=n.length-1;a>=0;--a){const r=Y(n[a],!0);r.__removalCount=(e.__removalCount||0)+1,t.insertBefore(r,Q(e))}}return bt(e),!0}return e instanceof S&&!function(e){let t=re(e);t&&t.tagName||(t={namespaceURI:tt,tagName:"template"});const n=p(e.tagName),a=p(t.tagName);return!!at[e.namespaceURI]&&(e.namespaceURI===Ze?t.namespaceURI===et?"svg"===n:t.namespaceURI===Xe?"svg"===n&&("annotation-xml"===a||mt[a]):Boolean(gt[n]):e.namespaceURI===Xe?t.namespaceURI===et?"math"===n:t.namespaceURI===Ze?"math"===n&&pt[a]:Boolean(ht[n]):e.namespaceURI===et?!(t.namespaceURI===Ze&&!pt[a])&&!(t.namespaceURI===Xe&&!mt[a])&&!ht[n]&&(ft[n]||!gt[n]):!("application/xhtml+xml"!==ot||!at[e.namespaceURI]))}(e)?(bt(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!_(/<\/no(script|embed|frames)/i,e.innerHTML)?(Oe&&e.nodeType===X&&(t=e.textContent,u([pe,fe,ge],(e=>{t=h(t,e," ")})),e.textContent!==t&&(m(a.removed,{element:e.cloneNode()}),e.textContent=t)),wt("afterSanitizeElements",e,null),!1):(bt(e),!0)},Ct=function(e,t,n){if(Ue&&("id"===t||"name"===t)&&(n in r||n in ct||"__depth"===n||"__removalCount"===n))return!1;if(Ae&&!Ne[t]&&_(he,t));else if(Fe&&_(be,t));else if(!xe[t]||Ne[t]){if(!(St(e)&&(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,e)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(e))&&(Se.attributeNameCheck instanceof RegExp&&_(Se.attributeNameCheck,t)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(t))||"is"===t&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&_(Se.tagNameCheck,n)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))))return!1}else if(Je[t]);else if(_(ke,h(n,ve,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==b(n,"data:")||!qe[e])if(Be&&!_(ye,h(n,ve,"")));else if(n)return!1;return!0},St=function(e){return"annotation-xml"!==e&&g(e,_e)},Tt=function(e){wt("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:xe};let r=t.length;for(;r--;){const o=t[r],{name:i,namespaceURI:l,value:s}=o,c=lt(i);let m="value"===i?s:y(s);if(n.attrName=c,n.attrValue=m,n.keepAttr=!0,n.forceKeepAttr=void 0,wt("uponSanitizeAttribute",e,n),m=n.attrValue,n.forceKeepAttr)continue;if(yt(i,e),!n.keepAttr)continue;if(!Pe&&_(/\/>/i,m)){yt(i,e);continue}if(Le&&_(/((--!?|])>)|<\/(style|title)/i,m)){yt(i,e);continue}Oe&&u([pe,fe,ge],(e=>{m=h(m,e," ")}));const p=lt(e.nodeName);if(Ct(p,c,m)){if(!$e||"id"!==c&&"name"!==c||(yt(i,e),m="user-content-"+m),oe&&"object"==typeof G&&"function"==typeof G.getAttributeType)if(l);else switch(G.getAttributeType(p,c)){case"TrustedHTML":m=oe.createHTML(m);break;case"TrustedScriptURL":m=oe.createScriptURL(m)}try{l?e.setAttributeNS(l,i,m):e.setAttribute(i,m),kt(e)?bt(e):d(a.removed)}catch(e){}}}wt("afterSanitizeAttributes",e,null)},Nt=function e(t){let n=null;const a=_t(t);for(wt("beforeSanitizeShadowDOM",t,null);n=a.nextNode();){if(wt("uponSanitizeShadowNode",n,null),xt(n))continue;const t=re(n);n.nodeType===K&&(t&&t.__depth?n.__depth=(n.__removalCount||0)+t.__depth+1:n.__depth=1),(n.__depth>=255||n.__depth<0||E(n.__depth))&&bt(n),n.content instanceof c&&(n.content.__depth=n.__depth,e(n.content)),Tt(n)}wt("afterSanitizeShadowDOM",t,null)};return a.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,o=null,l=null;if(nt=!e,nt&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Et(e)){if("function"!=typeof e.toString)throw k("toString is not a function");if("string"!=typeof(e=e.toString()))throw k("dirty is not a string, aborting")}if(!a.isSupported)return e;if(Ie||dt(t),a.removed=[],"string"==typeof e&&(Ge=!1),Ge){if(e.nodeName){const t=lt(e.nodeName);if(!Ee[t]||Te[t])throw k("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof x)n=vt("\x3c!----\x3e"),r=n.ownerDocument.importNode(e,!0),r.nodeType===K&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!Me&&!Oe&&!Re&&-1===e.indexOf("<"))return oe&&He?oe.createHTML(e):e;if(n=vt(e),!n)return Me?null:He?ie:""}n&&De&&bt(n.firstChild);const s=_t(Ge?e:n);for(;o=s.nextNode();){if(xt(o))continue;const e=re(o);o.nodeType===K&&(e&&e.__depth?o.__depth=(o.__removalCount||0)+e.__depth+1:o.__depth=1),(o.__depth>=255||o.__depth<0||E(o.__depth))&&bt(o),o.content instanceof c&&(o.content.__depth=o.__depth,Nt(o.content)),Tt(o)}if(Ge)return e;if(Me){if(ze)for(l=ce.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return(xe.shadowroot||xe.shadowrootmode)&&(l=de.call(i,l,!0)),l}let d=Re?n.outerHTML:n.innerHTML;return Re&&Ee["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&_(q,n.ownerDocument.doctype.name)&&(d="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+d),Oe&&u([pe,fe,ge],(e=>{d=h(d,e," ")})),oe&&He?oe.createHTML(d):d},a.setConfig=function(){dt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),Ie=!0},a.clearConfig=function(){st=null,Ie=!1},a.isValidAttribute=function(e,t,n){st||dt({});const a=lt(e),r=lt(t);return Ct(a,r,n)},a.addHook=function(e,t){"function"==typeof t&&(me[e]=me[e]||[],m(me[e],t))},a.removeHook=function(e){if(me[e])return d(me[e])},a.removeHooks=function(e){me[e]&&(me[e]=[])},a.removeAllHooks=function(){me={}},a}()}()},252:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var a,r,o;if(Array.isArray(t)){if((a=t.length)!=n.length)return!1;for(r=a;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(t instanceof Map&&n instanceof Map){if(t.size!==n.size)return!1;for(r of t.entries())if(!n.has(r[0]))return!1;for(r of t.entries())if(!e(r[1],n.get(r[0])))return!1;return!0}if(t instanceof Set&&n instanceof Set){if(t.size!==n.size)return!1;for(r of t.entries())if(!n.has(r[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(n)){if((a=t.length)!=n.length)return!1;for(r=a;0!=r--;)if(t[r]!==n[r])return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((a=(o=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(r=a;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,o[r]))return!1;for(r=a;0!=r--;){var i=o[r];if(!e(t[i],n[i]))return!1}return!0}return t!=t&&n!=n}},774:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var a,r,o;if(Array.isArray(t)){if((a=t.length)!=n.length)return!1;for(r=a;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((a=(o=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(r=a;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,o[r]))return!1;for(r=a;0!=r--;){var i=o[r];if(!("_owner"===i&&t.$$typeof||e(t[i],n[i])))return!1}return!0}return t!=t&&n!=n}},717:e=>{e.exports=function(e){var t=function(n,a,r){var o=n.splice(0,50);r=(r=r||[]).concat(e.add(o)),n.length>0?setTimeout((function(){t(n,a,r)}),1):(e.update(),a(r))};return t}},249:e=>{e.exports=function(e){return e.handlers.filterStart=e.handlers.filterStart||[],e.handlers.filterComplete=e.handlers.filterComplete||[],function(t){if(e.trigger("filterStart"),e.i=1,e.reset.filter(),void 0===t)e.filtered=!1;else{e.filtered=!0;for(var n=e.items,a=0,r=n.length;a<r;a++){var o=n[a];t(o)?o.filtered=!0:o.filtered=!1}}return e.update(),e.trigger("filterComplete"),e.visibleItems}}},844:(e,t,n)=>{n(981);var a=n(332),r=n(433),o=n(340),i=n(378),l=n(481);e.exports=function(e,t){t=r({location:0,distance:100,threshold:.4,multiSearch:!0,searchClass:"fuzzy-search"},t=t||{});var n={search:function(a,r){for(var o=t.multiSearch?a.replace(/ +$/,"").split(/ +/):[a],i=0,l=e.items.length;i<l;i++)n.item(e.items[i],r,o)},item:function(e,t,a){for(var r=!0,o=0;o<a.length;o++){for(var i=!1,l=0,s=t.length;l<s;l++)n.values(e.values(),t[l],a[o])&&(i=!0);i||(r=!1)}e.found=r},values:function(e,n,a){if(e.hasOwnProperty(n)){var r=o(e[n]).toLowerCase();if(l(r,a,t))return!0}return!1}};return a.bind(i(e.listContainer,t.searchClass),"keyup",e.utils.events.debounce((function(t){var a=t.target||t.srcElement;e.search(a.value,n.search)}),e.searchDelay)),function(t,a){e.search(t,a,n.search)}}},799:(e,t,n)=>{var a=n(813),r=n(378),o=n(433),i=n(859),l=n(332),s=n(340),c=n(981),u=n(200),d=n(212);e.exports=function(e,t,m){var p,f=this,g=n(608)(f),h=n(717)(f),b=n(195)(f);p={start:function(){f.listClass="list",f.searchClass="search",f.sortClass="sort",f.page=1e4,f.i=1,f.items=[],f.visibleItems=[],f.matchingItems=[],f.searched=!1,f.filtered=!1,f.searchColumns=void 0,f.searchDelay=0,f.handlers={updated:[]},f.valueNames=[],f.utils={getByClass:r,extend:o,indexOf:i,events:l,toString:s,naturalSort:a,classes:c,getAttribute:u,toArray:d},f.utils.extend(f,t),f.listContainer="string"==typeof e?document.getElementById(e):e,f.listContainer&&(f.list=r(f.listContainer,f.listClass,!0),f.parse=n(672)(f),f.templater=n(939)(f),f.search=n(647)(f),f.filter=n(249)(f),f.sort=n(343)(f),f.fuzzySearch=n(844)(f,t.fuzzySearch),this.handlers(),this.items(),this.pagination(),f.update())},handlers:function(){for(var e in f.handlers)f[e]&&f.handlers.hasOwnProperty(e)&&f.on(e,f[e])},items:function(){f.parse(f.list),void 0!==m&&f.add(m)},pagination:function(){if(void 0!==t.pagination){!0===t.pagination&&(t.pagination=[{}]),void 0===t.pagination[0]&&(t.pagination=[t.pagination]);for(var e=0,n=t.pagination.length;e<n;e++)b(t.pagination[e])}}},this.reIndex=function(){f.items=[],f.visibleItems=[],f.matchingItems=[],f.searched=!1,f.filtered=!1,f.parse(f.list)},this.toJSON=function(){for(var e=[],t=0,n=f.items.length;t<n;t++)e.push(f.items[t].values());return e},this.add=function(e,t){if(0!==e.length){if(!t){var n=[],a=!1;void 0===e[0]&&(e=[e]);for(var r=0,o=e.length;r<o;r++){var i;a=f.items.length>f.page,i=new g(e[r],void 0,a),f.items.push(i),n.push(i)}return f.update(),n}h(e.slice(0),t)}},this.show=function(e,t){return this.i=e,this.page=t,f.update(),f},this.remove=function(e,t,n){for(var a=0,r=0,o=f.items.length;r<o;r++)f.items[r].values()[e]==t&&(f.templater.remove(f.items[r],n),f.items.splice(r,1),o--,r--,a++);return f.update(),a},this.get=function(e,t){for(var n=[],a=0,r=f.items.length;a<r;a++){var o=f.items[a];o.values()[e]==t&&n.push(o)}return n},this.size=function(){return f.items.length},this.clear=function(){return f.templater.clear(),f.items=[],f},this.on=function(e,t){return f.handlers[e].push(t),f},this.off=function(e,t){var n=f.handlers[e],a=i(n,t);return a>-1&&n.splice(a,1),f},this.trigger=function(e){for(var t=f.handlers[e].length;t--;)f.handlers[e][t](f);return f},this.reset={filter:function(){for(var e=f.items,t=e.length;t--;)e[t].filtered=!1;return f},search:function(){for(var e=f.items,t=e.length;t--;)e[t].found=!1;return f}},this.update=function(){var e=f.items,t=e.length;f.visibleItems=[],f.matchingItems=[],f.templater.clear();for(var n=0;n<t;n++)e[n].matching()&&f.matchingItems.length+1>=f.i&&f.visibleItems.length<f.page?(e[n].show(),f.visibleItems.push(e[n]),f.matchingItems.push(e[n])):e[n].matching()?(f.matchingItems.push(e[n]),e[n].hide()):e[n].hide();return f.trigger("updated"),f},p.start()}},608:e=>{e.exports=function(e){return function(t,n,a){var r=this;this._values={},this.found=!1,this.filtered=!1,this.values=function(t,n){if(void 0===t)return r._values;for(var a in t)r._values[a]=t[a];!0!==n&&e.templater.set(r,r.values())},this.show=function(){e.templater.show(r)},this.hide=function(){e.templater.hide(r)},this.matching=function(){return e.filtered&&e.searched&&r.found&&r.filtered||e.filtered&&!e.searched&&r.filtered||!e.filtered&&e.searched&&r.found||!e.filtered&&!e.searched},this.visible=function(){return!(!r.elm||r.elm.parentNode!=e.list)},function(t,n,a){if(void 0===n)a?r.values(t,a):r.values(t);else{r.elm=n;var o=e.templater.get(r,t);r.values(o)}}(t,n,a)}}},195:(e,t,n)=>{var a=n(981),r=n(332),o=n(799);e.exports=function(e){var t=!1,n=function(n,r){if(e.page<1)return e.listContainer.style.display="none",void(t=!0);t&&(e.listContainer.style.display="block");var o,l=e.matchingItems.length,s=e.i,c=e.page,u=Math.ceil(l/c),d=Math.ceil(s/c),m=r.innerWindow||2,p=r.left||r.outerWindow||0,f=r.right||r.outerWindow||0;f=u-f,n.clear();for(var g=1;g<=u;g++){var h=d===g?"active":"";i.number(g,p,f,d,m)?(o=n.add({page:g,dotted:!1})[0],h&&a(o.elm).add(h),o.elm.firstChild.setAttribute("data-i",g),o.elm.firstChild.setAttribute("data-page",c)):i.dotted(n,g,p,f,d,m,n.size())&&(o=n.add({page:"...",dotted:!0})[0],a(o.elm).add("disabled"))}},i={number:function(e,t,n,a,r){return this.left(e,t)||this.right(e,n)||this.innerWindow(e,a,r)},left:function(e,t){return e<=t},right:function(e,t){return e>t},innerWindow:function(e,t,n){return e>=t-n&&e<=t+n},dotted:function(e,t,n,a,r,o,i){return this.dottedLeft(e,t,n,a,r,o)||this.dottedRight(e,t,n,a,r,o,i)},dottedLeft:function(e,t,n,a,r,o){return t==n+1&&!this.innerWindow(t,r,o)&&!this.right(t,a)},dottedRight:function(e,t,n,a,r,o,i){return!e.items[i-1].values().dotted&&t==a&&!this.innerWindow(t,r,o)&&!this.right(t,a)}};return function(t){var a=new o(e.listContainer.id,{listClass:t.paginationClass||"pagination",item:t.item||"<li><a class='page' href='#'></a></li>",valueNames:["page","dotted"],searchClass:"pagination-search-that-is-not-supposed-to-exist",sortClass:"pagination-sort-that-is-not-supposed-to-exist"});r.bind(a.listContainer,"click",(function(t){var n=t.target||t.srcElement,a=e.utils.getAttribute(n,"data-page"),r=e.utils.getAttribute(n,"data-i");r&&e.show((r-1)*a+1,a)})),e.on("updated",(function(){n(a,t)})),n(a,t)}}},672:(e,t,n)=>{e.exports=function(e){var t=n(608)(e),a=function(n,a){for(var r=0,o=n.length;r<o;r++)e.items.push(new t(a,n[r]))},r=function(t,n){var o=t.splice(0,50);a(o,n),t.length>0?setTimeout((function(){r(t,n)}),1):(e.update(),e.trigger("parseComplete"))};return e.handlers.parseComplete=e.handlers.parseComplete||[],function(){var t=function(e){for(var t=e.childNodes,n=[],a=0,r=t.length;a<r;a++)void 0===t[a].data&&n.push(t[a]);return n}(e.list),n=e.valueNames;e.indexAsync?r(t,n):a(t,n)}}},647:e=>{e.exports=function(e){var t,n,a,r={resetList:function(){e.i=1,e.templater.clear(),a=void 0},setOptions:function(e){2==e.length&&e[1]instanceof Array?t=e[1]:2==e.length&&"function"==typeof e[1]?(t=void 0,a=e[1]):3==e.length?(t=e[1],a=e[2]):t=void 0},setColumns:function(){0!==e.items.length&&void 0===t&&(t=void 0===e.searchColumns?r.toArray(e.items[0].values()):e.searchColumns)},setSearchString:function(t){t=(t=e.utils.toString(t).toLowerCase()).replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),n=t},toArray:function(e){var t=[];for(var n in e)t.push(n);return t}},o=function(o){return e.trigger("searchStart"),r.resetList(),r.setSearchString(o),r.setOptions(arguments),r.setColumns(),""===n?(e.reset.search(),e.searched=!1):(e.searched=!0,a?a(n,t):function(){for(var a,r=[],o=n;null!==(a=o.match(/"([^"]+)"/));)r.push(a[1]),o=o.substring(0,a.index)+o.substring(a.index+a[0].length);(o=o.trim()).length&&(r=r.concat(o.split(/\s+/)));for(var i=0,l=e.items.length;i<l;i++){var s=e.items[i];if(s.found=!1,r.length){for(var c=0,u=r.length;c<u;c++){for(var d=!1,m=0,p=t.length;m<p;m++){var f=s.values(),g=t[m];if(f.hasOwnProperty(g)&&void 0!==f[g]&&null!==f[g]&&-1!==("string"!=typeof f[g]?f[g].toString():f[g]).toLowerCase().indexOf(r[c])){d=!0;break}}if(!d)break}s.found=d}}}()),e.update(),e.trigger("searchComplete"),e.visibleItems};return e.handlers.searchStart=e.handlers.searchStart||[],e.handlers.searchComplete=e.handlers.searchComplete||[],e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"keyup",e.utils.events.debounce((function(t){var n=t.target||t.srcElement;""===n.value&&!e.searched||o(n.value)}),e.searchDelay)),e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"input",(function(e){""===(e.target||e.srcElement).value&&o("")})),o}},343:e=>{e.exports=function(e){var t={els:void 0,clear:function(){for(var n=0,a=t.els.length;n<a;n++)e.utils.classes(t.els[n]).remove("asc"),e.utils.classes(t.els[n]).remove("desc")},getOrder:function(t){var n=e.utils.getAttribute(t,"data-order");return"asc"==n||"desc"==n?n:e.utils.classes(t).has("desc")?"asc":e.utils.classes(t).has("asc")?"desc":"asc"},getInSensitive:function(t,n){var a=e.utils.getAttribute(t,"data-insensitive");n.insensitive="false"!==a},setOrder:function(n){for(var a=0,r=t.els.length;a<r;a++){var o=t.els[a];if(e.utils.getAttribute(o,"data-sort")===n.valueName){var i=e.utils.getAttribute(o,"data-order");"asc"==i||"desc"==i?i==n.order&&e.utils.classes(o).add(n.order):e.utils.classes(o).add(n.order)}}}},n=function(){e.trigger("sortStart");var n={},a=arguments[0].currentTarget||arguments[0].srcElement||void 0;a?(n.valueName=e.utils.getAttribute(a,"data-sort"),t.getInSensitive(a,n),n.order=t.getOrder(a)):((n=arguments[1]||n).valueName=arguments[0],n.order=n.order||"asc",n.insensitive=void 0===n.insensitive||n.insensitive),t.clear(),t.setOrder(n);var r,o=n.sortFunction||e.sortFunction||null,i="desc"===n.order?-1:1;r=o?function(e,t){return o(e,t,n)*i}:function(t,a){var r=e.utils.naturalSort;return r.alphabet=e.alphabet||n.alphabet||void 0,!r.alphabet&&n.insensitive&&(r=e.utils.naturalSort.caseInsensitive),r(t.values()[n.valueName],a.values()[n.valueName])*i},e.items.sort(r),e.update(),e.trigger("sortComplete")};return e.handlers.sortStart=e.handlers.sortStart||[],e.handlers.sortComplete=e.handlers.sortComplete||[],t.els=e.utils.getByClass(e.listContainer,e.sortClass),e.utils.events.bind(t.els,"click",n),e.on("searchStart",t.clear),e.on("filterStart",t.clear),n}},939:e=>{var t=function(e){var t,n=this,a=function(e){if("string"==typeof e){if(/<tr[\s>]/g.exec(e)){var t=document.createElement("tbody");return t.innerHTML=e,t.firstElementChild}if(-1!==e.indexOf("<")){var n=document.createElement("div");return n.innerHTML=e,n.firstElementChild}}},r=function(t,n,a){var r=void 0,o=function(t){for(var n=0,a=e.valueNames.length;n<a;n++){var r=e.valueNames[n];if(r.data){for(var o=r.data,i=0,l=o.length;i<l;i++)if(o[i]===t)return{data:t}}else{if(r.attr&&r.name&&r.name==t)return r;if(r===t)return t}}}(n);o&&(o.data?t.elm.setAttribute("data-"+o.data,a):o.attr&&o.name?(r=e.utils.getByClass(t.elm,o.name,!0))&&r.setAttribute(o.attr,a):(r=e.utils.getByClass(t.elm,o,!0))&&(r.innerHTML=a))};this.get=function(t,a){n.create(t);for(var r={},o=0,i=a.length;o<i;o++){var l=void 0,s=a[o];if(s.data)for(var c=0,u=s.data.length;c<u;c++)r[s.data[c]]=e.utils.getAttribute(t.elm,"data-"+s.data[c]);else s.attr&&s.name?(l=e.utils.getByClass(t.elm,s.name,!0),r[s.name]=l?e.utils.getAttribute(l,s.attr):""):(l=e.utils.getByClass(t.elm,s,!0),r[s]=l?l.innerHTML:"")}return r},this.set=function(e,t){if(!n.create(e))for(var a in t)t.hasOwnProperty(a)&&r(e,a,t[a])},this.create=function(e){return void 0===e.elm&&(e.elm=t(e.values()),n.set(e,e.values()),!0)},this.remove=function(t){t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.show=function(t){n.create(t),e.list.appendChild(t.elm)},this.hide=function(t){void 0!==t.elm&&t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.clear=function(){if(e.list.hasChildNodes())for(;e.list.childNodes.length>=1;)e.list.removeChild(e.list.firstChild)},function(){var n;if("function"!=typeof e.item){if(!(n="string"==typeof e.item?-1===e.item.indexOf("<")?document.getElementById(e.item):a(e.item):function(){for(var t=e.list.childNodes,n=0,a=t.length;n<a;n++)if(void 0===t[n].data)return t[n].cloneNode(!0)}()))throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");n=function(t,n){var a=t.cloneNode(!0);a.removeAttribute("id");for(var r=0,o=n.length;r<o;r++){var i=void 0,l=n[r];if(l.data)for(var s=0,c=l.data.length;s<c;s++)a.setAttribute("data-"+l.data[s],"");else l.attr&&l.name?(i=e.utils.getByClass(a,l.name,!0))&&i.setAttribute(l.attr,""):(i=e.utils.getByClass(a,l,!0))&&(i.innerHTML="")}return a}(n,e.valueNames),t=function(){return n.cloneNode(!0)}}else t=function(t){var n=e.item(t);return a(n)}}()};e.exports=function(e){return new t(e)}},981:(e,t,n)=>{var a=n(859),r=/\s+/;function o(e){if(!e||!e.nodeType)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}Object.prototype.toString,e.exports=function(e){return new o(e)},o.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array();return~a(t,e)||t.push(e),this.el.className=t.join(" "),this},o.prototype.remove=function(e){if(this.list)return this.list.remove(e),this;var t=this.array(),n=a(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},o.prototype.toggle=function(e,t){return this.list?(void 0!==t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):(void 0!==t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},o.prototype.array=function(){var e=(this.el.getAttribute("class")||"").replace(/^\s+|\s+$/g,"").split(r);return""===e[0]&&e.shift(),e},o.prototype.has=o.prototype.contains=function(e){return this.list?this.list.contains(e):!!~a(this.array(),e)}},332:(e,t,n)=>{var a=window.addEventListener?"addEventListener":"attachEvent",r=window.removeEventListener?"removeEventListener":"detachEvent",o="addEventListener"!==a?"on":"",i=n(212);t.bind=function(e,t,n,r){for(var l=0,s=(e=i(e)).length;l<s;l++)e[l][a](o+t,n,r||!1)},t.unbind=function(e,t,n,a){for(var l=0,s=(e=i(e)).length;l<s;l++)e[l][r](o+t,n,a||!1)},t.debounce=function(e,t,n){var a;return t?function(){var r=this,o=arguments,i=n&&!a;clearTimeout(a),a=setTimeout((function(){a=null,n||e.apply(r,o)}),t),i&&e.apply(r,o)}:e}},433:e=>{e.exports=function(e){for(var t,n=Array.prototype.slice.call(arguments,1),a=0;t=n[a];a++)if(t)for(var r in t)e[r]=t[r];return e}},481:e=>{e.exports=function(e,t,n){var a=n.location||0,r=n.distance||100,o=n.threshold||.4;if(t===e)return!0;if(t.length>32)return!1;var i=a,l=function(){var e,n={};for(e=0;e<t.length;e++)n[t.charAt(e)]=0;for(e=0;e<t.length;e++)n[t.charAt(e)]|=1<<t.length-e-1;return n}();function s(e,n){var a=e/t.length,o=Math.abs(i-n);return r?a+o/r:o?1:a}var c=o,u=e.indexOf(t,i);-1!=u&&(c=Math.min(s(0,u),c),-1!=(u=e.lastIndexOf(t,i+t.length))&&(c=Math.min(s(0,u),c)));var d,m,p=1<<t.length-1;u=-1;for(var f,g=t.length+e.length,h=0;h<t.length;h++){for(d=0,m=g;d<m;)s(h,i+m)<=c?d=m:g=m,m=Math.floor((g-d)/2+d);g=m;var b=Math.max(1,i-m+1),y=Math.min(i+m,e.length)+t.length,v=Array(y+2);v[y+1]=(1<<h)-1;for(var _=y;_>=b;_--){var k=l[e.charAt(_-1)];if(v[_]=0===h?(v[_+1]<<1|1)&k:(v[_+1]<<1|1)&k|(f[_+1]|f[_])<<1|1|f[_+1],v[_]&p){var E=s(h,_-1);if(E<=c){if(c=E,!((u=_-1)>i))break;b=Math.max(1,2*i-u)}}}if(s(h+1,i)>c)break;f=v}return!(u<0)}},200:e=>{e.exports=function(e,t){var n=e.getAttribute&&e.getAttribute(t)||null;if(!n)for(var a=e.attributes,r=a.length,o=0;o<r;o++)void 0!==a[o]&&a[o].nodeName===t&&(n=a[o].nodeValue);return n}},378:e=>{e.exports=function(e,t,n,a){return(a=a||{}).test&&a.getElementsByClassName||!a.test&&document.getElementsByClassName?function(e,t,n){return n?e.getElementsByClassName(t)[0]:e.getElementsByClassName(t)}(e,t,n):a.test&&a.querySelector||!a.test&&document.querySelector?function(e,t,n){return t="."+t,n?e.querySelector(t):e.querySelectorAll(t)}(e,t,n):function(e,t,n){for(var a=[],r=e.getElementsByTagName("*"),o=r.length,i=new RegExp("(^|\\s)"+t+"(\\s|$)"),l=0,s=0;l<o;l++)if(i.test(r[l].className)){if(n)return r[l];a[s]=r[l],s++}return a}(e,t,n)}},859:e=>{var t=[].indexOf;e.exports=function(e,n){if(t)return e.indexOf(n);for(var a=0,r=e.length;a<r;++a)if(e[a]===n)return a;return-1}},212:e=>{e.exports=function(e){if(void 0===e)return[];if(null===e)return[null];if(e===window)return[window];if("string"==typeof e)return[e];if(function(e){return"[object Array]"===Object.prototype.toString.call(e)}(e))return e;if("number"!=typeof e.length)return[e];if("function"==typeof e&&e instanceof Function)return[e];for(var t=[],n=0,a=e.length;n<a;n++)(Object.prototype.hasOwnProperty.call(e,n)||n in e)&&t.push(e[n]);return t.length?t:[]}},340:e=>{e.exports=function(e){return(e=null===(e=void 0===e?"":e)?"":e).toString()}},813:e=>{"use strict";var t,n,a=0;function r(e){return e>=48&&e<=57}function o(e,t){for(var o=(e+="").length,i=(t+="").length,l=0,s=0;l<o&&s<i;){var c=e.charCodeAt(l),u=t.charCodeAt(s);if(r(c)){if(!r(u))return c-u;for(var d=l,m=s;48===c&&++d<o;)c=e.charCodeAt(d);for(;48===u&&++m<i;)u=t.charCodeAt(m);for(var p=d,f=m;p<o&&r(e.charCodeAt(p));)++p;for(;f<i&&r(t.charCodeAt(f));)++f;var g=p-d-f+m;if(g)return g;for(;d<p;)if(g=e.charCodeAt(d++)-t.charCodeAt(m++))return g;l=p,s=f}else{if(c!==u)return c<a&&u<a&&-1!==n[c]&&-1!==n[u]?n[c]-n[u]:c-u;++l,++s}}return l>=o&&s<i&&o>=i?-1:s>=i&&l<o&&i>=o?1:o-i}o.caseInsensitive=o.i=function(e,t){return o((""+e).toLowerCase(),(""+t).toLowerCase())},Object.defineProperties(o,{alphabet:{get:function(){return t},set:function(e){n=[];var r=0;if(t=e)for(;r<t.length;r++)n[t.charCodeAt(r)]=r;for(a=n.length,r=0;r<a;r++)void 0===n[r]&&(n[r]=-1)}}}),e.exports=o}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.React,t=window.lodash,a=window.wp.domReady;var r=n.n(a);const o=window.wp.element,i=window.wp.i18n,l=window.wp.components,s=window.wp.coreData,c=window.wp.data;window.wp.blockEditor,n(252);const u=window.wp.apiFetch;var d=n.n(u);const m={headers:{"Content-Type":"application/json"},method:"GET"};n(838);const p=window.wp.url,f=window.wp.primitives,g=((0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})),(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})),window.wp.hooks),h="Mobile",b="Tablet",y="Desktop",v={},_=getComputedStyle(document.documentElement);v[h]=_.getPropertyValue("--wp--custom--breakpoint--sm")||"576px",v[b]=_.getPropertyValue("--wp--custom--breakpoint--md")||"768px",v[y]=_.getPropertyValue("--wp--custom--breakpoint--lg")||"1024px";const k={};Object.keys(v).map((e=>{k[e]=e===h?"":`@media (min-width: ${v[e]})`})),(0,i.__)("Mobile","content-blocks-builder"),k[h],(0,i.__)("Tablet","content-blocks-builder"),k[b],(0,i.__)("Desktop","content-blocks-builder"),k[y];const E=(e,t="log")=>{e&&"development"===window?.BBLOG?.environmentType&&(["log","info","warn","error","debug","dir","table"].includes(t)?console[t](e):console.log(e))},w=(0,o.createContext)();class x{constructor(e=""){e||(e=window.location.href),this.parsedURL=new URL(e)}get(e,t=null){return this.parsedURL.searchParams.get(e)||t}set(e,t,n=!0){this.parsedURL.searchParams.set(e,t),n&&history.pushState&&history.pushState({},null,this.parsedURL.href)}delete(e,t=!0){this.parsedURL.searchParams.delete(e),t&&history.pushState&&history.pushState({},null,this.parsedURL.href)}reload(){history?.go?history.go():window.location.reload()}getHref(){return this.parsedURL.href}}function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},C.apply(this,arguments)}function S(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var T=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,N=S((function(e){return T.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),F=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),A=Math.abs,B=String.fromCharCode,P=Object.assign;function O(e){return e.trim()}function L(e,t,n){return e.replace(t,n)}function R(e,t){return e.indexOf(t)}function I(e,t){return 0|e.charCodeAt(t)}function D(e,t,n){return e.slice(t,n)}function M(e){return e.length}function z(e){return e.length}function H(e,t){return t.push(e),e}var U=1,$=1,V=0,G=0,j=0,W="";function Y(e,t,n,a,r,o,i){return{value:e,root:t,parent:n,type:a,props:r,children:o,line:U,column:$,length:i,return:""}}function q(e,t){return P(Y("",null,null,"",null,null,0),e,{length:-e.length},t)}function Q(){return j=G>0?I(W,--G):0,$--,10===j&&($=1,U--),j}function J(){return j=G<V?I(W,G++):0,$++,10===j&&($=1,U++),j}function K(){return I(W,G)}function X(){return G}function Z(e,t){return D(W,e,t)}function ee(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function te(e){return U=$=1,V=M(W=e),G=0,[]}function ne(e){return W="",e}function ae(e){return O(Z(G-1,ie(91===e?e+2:40===e?e+1:e)))}function re(e){for(;(j=K())&&j<33;)J();return ee(e)>2||ee(j)>3?"":" "}function oe(e,t){for(;--t&&J()&&!(j<48||j>102||j>57&&j<65||j>70&&j<97););return Z(e,X()+(t<6&&32==K()&&32==J()))}function ie(e){for(;J();)switch(j){case e:return G;case 34:case 39:34!==e&&39!==e&&ie(j);break;case 40:41===e&&ie(e);break;case 92:J()}return G}function le(e,t){for(;J()&&e+j!==57&&(e+j!==84||47!==K()););return"/*"+Z(t,G-1)+"*"+B(47===e?e:J())}function se(e){for(;!ee(K());)J();return Z(e,G)}var ce="-ms-",ue="-moz-",de="-webkit-",me="comm",pe="rule",fe="decl",ge="@keyframes";function he(e,t){for(var n="",a=z(e),r=0;r<a;r++)n+=t(e[r],r,e,t)||"";return n}function be(e,t,n,a){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case fe:return e.return=e.return||e.value;case me:return"";case ge:return e.return=e.value+"{"+he(e.children,a)+"}";case pe:e.value=e.props.join(",")}return M(n=he(e.children,a))?e.return=e.value+"{"+n+"}":""}function ye(e){return ne(ve("",null,null,null,[""],e=te(e),0,[0],e))}function ve(e,t,n,a,r,o,i,l,s){for(var c=0,u=0,d=i,m=0,p=0,f=0,g=1,h=1,b=1,y=0,v="",_=r,k=o,E=a,w=v;h;)switch(f=y,y=J()){case 40:if(108!=f&&58==I(w,d-1)){-1!=R(w+=L(ae(y),"&","&\f"),"&\f")&&(b=-1);break}case 34:case 39:case 91:w+=ae(y);break;case 9:case 10:case 13:case 32:w+=re(f);break;case 92:w+=oe(X()-1,7);continue;case 47:switch(K()){case 42:case 47:H(ke(le(J(),X()),t,n),s);break;default:w+="/"}break;case 123*g:l[c++]=M(w)*b;case 125*g:case 59:case 0:switch(y){case 0:case 125:h=0;case 59+u:-1==b&&(w=L(w,/\f/g,"")),p>0&&M(w)-d&&H(p>32?Ee(w+";",a,n,d-1):Ee(L(w," ","")+";",a,n,d-2),s);break;case 59:w+=";";default:if(H(E=_e(w,t,n,c,u,r,l,v,_=[],k=[],d),o),123===y)if(0===u)ve(w,t,E,E,_,o,d,l,k);else switch(99===m&&110===I(w,3)?100:m){case 100:case 108:case 109:case 115:ve(e,E,E,a&&H(_e(e,E,E,0,0,r,l,v,r,_=[],d),k),r,k,d,l,a?_:k);break;default:ve(w,E,E,E,[""],k,0,l,k)}}c=u=p=0,g=b=1,v=w="",d=i;break;case 58:d=1+M(w),p=f;default:if(g<1)if(123==y)--g;else if(125==y&&0==g++&&125==Q())continue;switch(w+=B(y),y*g){case 38:b=u>0?1:(w+="\f",-1);break;case 44:l[c++]=(M(w)-1)*b,b=1;break;case 64:45===K()&&(w+=ae(J())),m=K(),u=d=M(v=w+=se(X())),y++;break;case 45:45===f&&2==M(w)&&(g=0)}}return o}function _e(e,t,n,a,r,o,i,l,s,c,u){for(var d=r-1,m=0===r?o:[""],p=z(m),f=0,g=0,h=0;f<a;++f)for(var b=0,y=D(e,d+1,d=A(g=i[f])),v=e;b<p;++b)(v=O(g>0?m[b]+" "+y:L(y,/&\f/g,m[b])))&&(s[h++]=v);return Y(e,t,n,0===r?pe:l,s,c,u)}function ke(e,t,n){return Y(e,t,n,me,B(j),D(e,2,-2),0)}function Ee(e,t,n,a){return Y(e,t,n,fe,D(e,0,a),D(e,a+1,-1),a)}var we=function(e,t,n){for(var a=0,r=0;a=r,r=K(),38===a&&12===r&&(t[n]=1),!ee(r);)J();return Z(e,G)},xe=new WeakMap,Ce=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,a=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||xe.get(n))&&!a){xe.set(e,!0);for(var r=[],o=function(e,t){return ne(function(e,t){var n=-1,a=44;do{switch(ee(a)){case 0:38===a&&12===K()&&(t[n]=1),e[n]+=we(G-1,t,n);break;case 2:e[n]+=ae(a);break;case 4:if(44===a){e[++n]=58===K()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=B(a)}}while(a=J());return e}(te(e),t))}(t,r),i=n.props,l=0,s=0;l<o.length;l++)for(var c=0;c<i.length;c++,s++)e.props[s]=r[l]?o[l].replace(/&\f/g,i[c]):i[c]+" "+o[l]}}},Se=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function Te(e,t){switch(function(e,t){return 45^I(e,0)?(((t<<2^I(e,0))<<2^I(e,1))<<2^I(e,2))<<2^I(e,3):0}(e,t)){case 5103:return de+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return de+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return de+e+ue+e+ce+e+e;case 6828:case 4268:return de+e+ce+e+e;case 6165:return de+e+ce+"flex-"+e+e;case 5187:return de+e+L(e,/(\w+).+(:[^]+)/,de+"box-$1$2"+ce+"flex-$1$2")+e;case 5443:return de+e+ce+"flex-item-"+L(e,/flex-|-self/,"")+e;case 4675:return de+e+ce+"flex-line-pack"+L(e,/align-content|flex-|-self/,"")+e;case 5548:return de+e+ce+L(e,"shrink","negative")+e;case 5292:return de+e+ce+L(e,"basis","preferred-size")+e;case 6060:return de+"box-"+L(e,"-grow","")+de+e+ce+L(e,"grow","positive")+e;case 4554:return de+L(e,/([^-])(transform)/g,"$1"+de+"$2")+e;case 6187:return L(L(L(e,/(zoom-|grab)/,de+"$1"),/(image-set)/,de+"$1"),e,"")+e;case 5495:case 3959:return L(e,/(image-set\([^]*)/,de+"$1$`$1");case 4968:return L(L(e,/(.+:)(flex-)?(.*)/,de+"box-pack:$3"+ce+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+de+e+e;case 4095:case 3583:case 4068:case 2532:return L(e,/(.+)-inline(.+)/,de+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(M(e)-1-t>6)switch(I(e,t+1)){case 109:if(45!==I(e,t+4))break;case 102:return L(e,/(.+:)(.+)-([^]+)/,"$1"+de+"$2-$3$1"+ue+(108==I(e,t+3)?"$3":"$2-$3"))+e;case 115:return~R(e,"stretch")?Te(L(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==I(e,t+1))break;case 6444:switch(I(e,M(e)-3-(~R(e,"!important")&&10))){case 107:return L(e,":",":"+de)+e;case 101:return L(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+de+(45===I(e,14)?"inline-":"")+"box$3$1"+de+"$2$3$1"+ce+"$2box$3")+e}break;case 5936:switch(I(e,t+11)){case 114:return de+e+ce+L(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return de+e+ce+L(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return de+e+ce+L(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return de+e+ce+e+e}return e}var Ne=[function(e,t,n,a){if(e.length>-1&&!e.return)switch(e.type){case fe:e.return=Te(e.value,e.length);break;case ge:return he([q(e,{value:L(e.value,"@","@"+de)})],a);case pe:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return he([q(e,{props:[L(t,/:(read-\w+)/,":-moz-$1")]})],a);case"::placeholder":return he([q(e,{props:[L(t,/:(plac\w+)/,":"+de+"input-$1")]}),q(e,{props:[L(t,/:(plac\w+)/,":-moz-$1")]}),q(e,{props:[L(t,/:(plac\w+)/,ce+"input-$1")]})],a)}return""}))}}],Fe=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var a,r,o=e.stylisPlugins||Ne,i={},l=[];a=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)i[t[n]]=!0;l.push(e)}));var s,c,u,d,m=[be,(d=function(e){s.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],p=(c=[Ce,Se].concat(o,m),u=z(c),function(e,t,n,a){for(var r="",o=0;o<u;o++)r+=c[o](e,t,n,a)||"";return r});r=function(e,t,n,a){s=n,he(ye(e?e+"{"+t.styles+"}":t.styles),p),a&&(f.inserted[t.name]=!0)};var f={key:t,sheet:new F({key:t,container:a,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:r};return f.sheet.hydrate(l),f},Ae={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Be=/[A-Z]|^ms/g,Pe=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Oe=function(e){return 45===e.charCodeAt(1)},Le=function(e){return null!=e&&"boolean"!=typeof e},Re=S((function(e){return Oe(e)?e:e.replace(Be,"-$&").toLowerCase()})),Ie=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(Pe,(function(e,t,n){return Me={name:t,styles:n,next:Me},t}))}return 1===Ae[e]||Oe(e)||"number"!=typeof t||0===t?t:t+"px"};function De(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return Me={name:n.name,styles:n.styles,next:Me},n.name;if(void 0!==n.styles){var a=n.next;if(void 0!==a)for(;void 0!==a;)Me={name:a.name,styles:a.styles,next:Me},a=a.next;return n.styles+";"}return function(e,t,n){var a="";if(Array.isArray(n))for(var r=0;r<n.length;r++)a+=De(e,t,n[r])+";";else for(var o in n){var i=n[o];if("object"!=typeof i)null!=t&&void 0!==t[i]?a+=o+"{"+t[i]+"}":Le(i)&&(a+=Re(o)+":"+Ie(o,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=t&&void 0!==t[i[0]]){var l=De(e,t,i);switch(o){case"animation":case"animationName":a+=Re(o)+":"+l+";";break;default:a+=o+"{"+l+"}"}}else for(var s=0;s<i.length;s++)Le(i[s])&&(a+=Re(o)+":"+Ie(o,i[s])+";")}return a}(e,t,n);case"function":if(void 0!==e){var r=Me,o=n(e);return Me=r,De(e,t,o)}}if(null==t)return n;var i=t[n];return void 0!==i?i:n}var Me,ze=/label:\s*([^\s;\n{]+)\s*(;|$)/g,He=!!e.useInsertionEffect&&e.useInsertionEffect,Ue=He||function(e){return e()},$e=(He||e.useLayoutEffect,e.createContext("undefined"!=typeof HTMLElement?Fe({key:"css"}):null));$e.Provider;var Ve=e.createContext({}),Ge=function(e,t,n){var a=e.key+"-"+t.name;!1===n&&void 0===e.registered[a]&&(e.registered[a]=t.styles)},je=N,We=function(e){return"theme"!==e},Ye=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?je:We},qe=function(e,t,n){var a;if(t){var r=t.shouldForwardProp;a=e.__emotion_forwardProp&&r?function(t){return e.__emotion_forwardProp(t)&&r(t)}:r}return"function"!=typeof a&&n&&(a=e.__emotion_forwardProp),a},Qe=function(e){var t=e.cache,n=e.serialized,a=e.isStringTag;return Ge(t,n,a),Ue((function(){return function(e,t,n){Ge(e,t,n);var a=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var r=t;do{e.insert(t===r?"."+a:"",r,e.sheet,!0),r=r.next}while(void 0!==r)}}(t,n,a)})),null},Je=function t(n,a){var r,o,i=n.__emotion_real===n,l=i&&n.__emotion_base||n;void 0!==a&&(r=a.label,o=a.target);var s=qe(n,a,i),c=s||Ye(l),u=!c("as");return function(){var d=arguments,m=i&&void 0!==n.__emotion_styles?n.__emotion_styles.slice(0):[];if(void 0!==r&&m.push("label:"+r+";"),null==d[0]||void 0===d[0].raw)m.push.apply(m,d);else{m.push(d[0][0]);for(var p=d.length,f=1;f<p;f++)m.push(d[f],d[0][f])}var g,h=(g=function(t,n,a){var r,i,d,p,f=u&&t.as||l,g="",h=[],b=t;if(null==t.theme){for(var y in b={},t)b[y]=t[y];b.theme=e.useContext(Ve)}"string"==typeof t.className?(r=n.registered,i=h,d=t.className,p="",d.split(" ").forEach((function(e){void 0!==r[e]?i.push(r[e]+";"):p+=e+" "})),g=p):null!=t.className&&(g=t.className+" ");var v=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var a=!0,r="";Me=void 0;var o=e[0];null==o||void 0===o.raw?(a=!1,r+=De(n,t,o)):r+=o[0];for(var i=1;i<e.length;i++)r+=De(n,t,e[i]),a&&(r+=o[i]);ze.lastIndex=0;for(var l,s="";null!==(l=ze.exec(r));)s+="-"+l[1];var c=function(e){for(var t,n=0,a=0,r=e.length;r>=4;++a,r-=4)t=1540483477*(65535&(t=255&e.charCodeAt(a)|(255&e.charCodeAt(++a))<<8|(255&e.charCodeAt(++a))<<16|(255&e.charCodeAt(++a))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(r){case 3:n^=(255&e.charCodeAt(a+2))<<16;case 2:n^=(255&e.charCodeAt(a+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(a)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(r)+s;return{name:c,styles:r,next:Me}}(m.concat(h),n.registered,b);g+=n.key+"-"+v.name,void 0!==o&&(g+=" "+o);var _=u&&void 0===s?Ye(f):c,k={};for(var E in t)u&&"as"===E||_(E)&&(k[E]=t[E]);return k.className=g,k.ref=a,e.createElement(e.Fragment,null,e.createElement(Qe,{cache:n,serialized:v,isStringTag:"string"==typeof f}),e.createElement(f,k))},(0,e.forwardRef)((function(t,n){var a=(0,e.useContext)($e);return g(t,a,n)})));return h.displayName=void 0!==r?r:"Styled("+("string"==typeof l?l:l.displayName||l.name||"Component")+")",h.defaultProps=n.defaultProps,h.__emotion_real=h,h.__emotion_base=l,h.__emotion_styles=m,h.__emotion_forwardProp=s,Object.defineProperty(h,"toString",{value:function(){return"."+o}}),h.withComponent=function(e,n){return t(e,C({},a,n,{shouldForwardProp:qe(h,n,!0)})).apply(void 0,m)},h}}.bind();function Ke(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(n=Ke(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){Je[e]=Je(e)})),Je(l.BaseControl)`
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
`,Je.div`
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
`,Je(l.PanelBody)`
  margin-right: -16px;
  margin-left: -16px;
`;const Xe=function(){for(var e,t,n=0,a="",r=arguments.length;n<r;n++)(e=arguments[n])&&(t=Ke(e))&&(a&&(a+=" "),a+=t);return a},Ze=Je.div`
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
`,et=Je(l.Flex)`
  padding-bottom: 8px;

  .label-control {
    margin-bottom: 0 !important;
  }
`,tt=Je(l.Flex)`
  flex-wrap: wrap;
  width: auto;
  gap: 4px;

  > * {
    flex: 1 0 auto;
    margin: 0 !important;
  }
`,nt=(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),at=(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"}));function rt({isLinked:t,...n}){const a=t?(0,i.__)("Unlink Sides","content-blocks-builder"):(0,i.__)("Link Sides","content-blocks-builder");return(0,e.createElement)(l.Tooltip,{text:a},(0,e.createElement)("span",null,(0,e.createElement)(l.Button,{...n,className:"component-group-control__linked-button",variant:t?"primary":"secondary",size:"small",icon:t?nt:at,iconSize:16,"aria-label":a})))}var ot=n(774),it=n.n(ot);const lt=({values:e,fields:n})=>{const a=n.map((({name:t})=>{var n;return null!==(n=e[t])&&void 0!==n?n:void 0}));return(r=a.filter((e=>e))).sort(((e,n)=>(0,t.isObject)(e)?r.filter((t=>it()(t,e))).length-r.filter((e=>it()(e,n))).length:r.filter((t=>t===e)).length-r.filter((e=>e===n)).length)).pop();var r},st=({values:t,fields:n,renderControl:a,onChange:r,normalizeValue:i})=>n.map((l=>{var s;const{name:c}=l;return(0,e.createElement)(o.Fragment,{key:`group-control-${c}`},a({value:null!==(s=t[c])&&void 0!==s?s:void 0,onChange:(u=c,e=>{e=i({side:u,value:e}),r({...t,[u]:e})}),fields:n,values:t,...l}));var u})),ct=({values:e,fields:t,renderControl:n,renderAllControl:a=null,onChange:r,normalizeValue:o,...i})=>(a||(a=n),a({value:lt({values:e,fields:t}),fields:t,values:e,onChange:n=>{n=o({side:"all",value:n});let a={...e};t.forEach((({name:e})=>{a={...a,[e]:n}})),r(a)},...i})),ut=({label:n,fields:a=[],values:r={},renderLabel:i=t.noop,renderControl:l=t.noop,onChange:s=t.noop,normalizeValue:c=(({side:e,value:t})=>t),isLinkedGroup:u=!0,getInitialLinkedState:d=t.noop,className:m,columns:p,...f})=>{const g={fields:a,values:r,renderControl:l,onChange:s,normalizeValue:c,...f},[h,b]=u?function(e){const[t,n]=(0,o.useState)(e);return(0,o.useEffect)((()=>n(e)),[e]),[t,n]}(d(r)):[!1,t.noop];return(0,e.createElement)(Ze,{className:Xe("group-control",m,{[`is-${p}-columns`]:p}),...f},(0,e.createElement)(et,{className:"group-control__header"},i({label:n,isLinkedGroup:u,...f}),u&&(0,e.createElement)(rt,{onClick:()=>{b(!h)},isLinked:h})),(0,e.createElement)(tt,{className:"group-control__body"},h&&(0,e.createElement)(ct,{...g}),!h&&(0,e.createElement)(st,{...g})))};Je(ut)`
  .group-control__body {
    > *:nth-of-type(3) {
      order: 2;
    }

    .components-input-control__input {
      height: 40px;
    }
  }
`,Je.div`
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
`,Je(ut)`
  /* .block-editor-panel-color-gradient-settings__item {
    padding: 8px !important;
  } */

  .components-toggle-control {
    > * {
      margin-bottom: 0;
    }
  }
`,Je.div`
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
`,Je(ut)`
  .components-base-control__field {
    margin-bottom: 0;
  }
`;const dt=window.wp.notices,mt=(Je.div`
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
`,Je(l.ButtonGroup)`
  margin-top: 1px;
  margin-left: 1px;
  button {
    margin: -1px 0 0 -1px;
    vertical-align: middle;
  }
`,Je.div`
  margin-top: 8px;
  margin-bottom: revert;
  font-size; 12px;
  color: #757575;
`,Je.div`
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
`),pt=({title:t,description:n,children:a})=>(0,e.createElement)(mt,{className:"settings-section"},t&&(0,e.createElement)("h3",{className:"settings-section__title"},t),n&&(0,e.createElement)("p",{className:"settings-section__description"},n),(0,e.createElement)("div",{className:"meta-box-sortables"},a)),ft=Je.div`
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
`,gt=Je.div`
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
`,ht=({title:n,settingsName:a="boldblocks-settings",children:r,renderFooter:i=null,isFullRow:l=!1,isHeaderHidden:s=!1,className:c,initialOpen:u=!0})=>{const d=`${a}-${(0,p.cleanForSlug)(n)}`,[m,f]=((e,n=null)=>{const[a,r]=(0,o.useState)((()=>{try{const a=JSON.parse(localStorage.getItem(e));return(0,t.isNil)(a)?n:a}catch(e){return E(e,"error"),n}}));return[a,t=>{r(t),localStorage.setItem(e,JSON.stringify(t))}]})(d,!u);return(0,e.createElement)(ft,{className:Xe("postbox",c,{closed:m,"is-full-row":l,"is-header-hidden":s})},!s&&(0,e.createElement)("div",{className:"postbox-header","aria-expanded":m?"false":"true",tabIndex:-1,onClick:e=>{e.preventDefault(),f(!m)}},(0,e.createElement)("h2",{className:"hndle"},n),(0,e.createElement)("div",{className:"handle-actions hide-if-no-js"},(0,e.createElement)("button",{type:"button",className:"handlediv","aria-expanded":m?"false":"true",onClick:e=>{e.preventDefault(),f(!m)}},(0,e.createElement)("span",{className:"screen-reader-text"},"Toggle panel: ",n),(0,e.createElement)("span",{className:"toggle-indicator","aria-hidden":m?"true":"false"})))),(0,e.createElement)("div",{className:"inside"},r),(0,t.isFunction)(i)&&(0,e.createElement)("div",{className:"postbox-footer"},i()))};window.wp.blocks,Je.div`
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
`,n(799),window.wp.keycodes,Je(l.Modal)`
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
`,Je.ul`
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
`;const bt=Je(ht)`
  border-top: 0;
  color: #000 !important;

  a,
  ul,
  p {
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0 0 10px !important;
    font-weight: 500 !important;
  }

  h1 {
    padding: 0;
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.185rem;
  }

  h5 {
    font-size: 1rem;
  }

  ul {
    padding-left: 20px;
    list-style: disc;
  }

  .flex-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 0;
    list-style: none;
  }

  .leading {
    font-size: 1.45em;
  }

  .section-title {
    margin-top: 1em !important;
  }

  .section-summary {
    font-size: 1.35em;
  }

  .feature-line {
    font-size: 1.15em;
  }

  details {
    padding: 0 0.5rem;

    ul {
      margin: 0;
    }

    li {
      margin-bottom: 4px;
    }
  }

  details + details {
    border-top: none;
  }

  details[open] {
    padding-bottom: 1em;
  }

  summary {
    padding: 0.35rem 2em 0.35rem 0;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .feature-summary {
    details {
      margin: 1rem 0;
    }
  }

  .technical-feature {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .video-tutorial {
    margin: 16px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
    gap: 1rem;

    &-item {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;

      h3 {
        margin: 0 0 0.5rem;
        font-weight: 700;
      }

      h4,
      h5 {
        margin: 16px 0 !important;
      }
    }
  }

  .grid--large {
    grid-template-columns: repeat(auto-fill, minmax(min(30rem, 100%), 1fr));
  }

  .video-frame {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    margin: 0;
    border: 1px solid #e1e1e1;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .video-caption {
    margin: 4px 0;
    font-size: 0.9rem;
  }

  .video-tutorials {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
    gap: 12px;
  }
`,yt=({videoId:t})=>(0,e.createElement)("div",{className:"video-frame"},(0,e.createElement)("iframe",{src:`https://www.youtube.com/embed/${t}`,srcDoc:`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}.btn-play{position: absolute;top: 50%;left: 50%;z-index: 1;display: block;width: 68px;height: 48px;margin:0;cursor: pointer;transform: translate3d(-50%, -50%, 0);background-color: transparent;background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');filter: grayscale(100%);transition: filter .1s cubic-bezier(0, 0, 0.2, 1);border: none;}body:hover .btn-play,.btn-play:focus{filter:none}.visually-hidden{clip: rect(0 0 0 0);clip-path: inset(50%);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}</style><a href="https://www.youtube.com/embed/${t}?autoplay=1&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/${t}/maxresdefault.jpg" alt="Video tutorial"><button type="button" class="btn-play"><span class="visually-hidden">Play</span></button></a>`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),vt=()=>{const{Docs:{loading:t,docs:n}={}}=(0,o.useContext)(w),a=[{title:"Carousel layouts",keyFeatures:"Ease to use, fast, clean, flexible, responsive, multiple effects, navigation, pagination, etc. Works on any devices with any kind of content,",worksWith:"Carousel repeater blocks, Post template inside Query Loop",builtWith:(0,e.createElement)(e.Fragment,null,"Based on the ",(0,e.createElement)(l.ExternalLink,{href:"https://swiperjs.com"},"SwiperJS")," carousel, and Vanilla JS, this is designed as a layout for repeater blocks. It can also work with the Query Loop block."),goodFor:"Banner slider, Posts carousel, Gallery, Carousel of features, testimonials, services, etc.",howToUse:(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Carousel repeater blocks"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a carousel repeater block to the Block Editor"),(0,e.createElement)("li",null,"Add nested carousel item blocks"),(0,e.createElement)("li",null,"Choose preview mode and customize the settings"))),(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Query Loop"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Choose the Post Template block inside a Query Loop"),(0,e.createElement)("li",null,"Choose the carousel layout"),(0,e.createElement)("li",null,"Choose preview mode and customize the settings")))),videoId:"Eh3kX-9_mDg",videoDesc:"How to create a banner slider",tutorials:[{url:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library&s=carousel"),title:"Prebuilt carousel blocks from the block library",target:"_blank"},{url:"https://youtu.be/i8d8Pha921c",title:"[YouTube] How to create a carousel of posts ↗",target:"_blank"},{url:"https://youtu.be/EEk-kSa59VE",title:"[YouTube] How to create a custom banner slider block ↗",target:"_blank"},{url:"https://youtu.be/XfhgqvzRTRQ",title:"[YouTube] How to create another banner slider ↗",target:"_blank"},{url:"https://www.youtube.com/playlist?list=PLPuEwc7dZkleS_5ATLat8arnVUflXSfTk",title:"[YouTube] Watch all playlist ↗",target:"_blank"}]},{title:"Responsive grid layouts",keyFeatures:"Ease to use, flexible, responsive, grid template columns, gap, row, column, span, order",worksWith:"Grid repeater blocks, Post template inside Query Loop",builtWith:"Based on the CSS grid layout, this is designed as a layout for repeater blocks. It can also work with the Query Loop block.",goodFor:"Posts grid, blog page, Gallery, grid of features, testimonials, services, etc.",howToUse:(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Grid repeater blocks"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a grid repeater block to the Block Editor"),(0,e.createElement)("li",null,"Add nested grid item blocks"),(0,e.createElement)("li",null,"Customize the settings for both grid and grid item blocks"))),(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Query Loop"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Choose the Post Template block inside a Query Loop"),(0,e.createElement)("li",null,"Choose the responsive grid layout"),(0,e.createElement)("li",null,"Customize the grid settings, customize layout for each item to if you want a magazine layout")))),videoId:"awSC09tTnS8",videoDesc:"How to create a responsive grid",tutorials:[{url:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library&s=grid"),title:"Prebuilt grid blocks from the block library",target:"_blank"},{url:"https://youtu.be/mICLfKkF6tU",title:"[YouTube] How to create a custom grid block ↗",target:"_blank"},{url:"https://youtu.be/AnCpVKxhBlM",title:"[YouTube] How to create a testimonial grid block ↗",target:"_blank"},{url:"https://www.youtube.com/playlist?list=PLPuEwc7dZklfsbrRAKe_iUywkjk0fPMUE",title:"[YouTube] Watch all playlist ↗",target:"_blank"}]},{title:"Accordion layouts",keyFeatures:"Ease to use, works with any content, multiple options",worksWith:"Accordion repeater blocks",builtWith:"Based on the CBB Collapse component and Vanilla JS, this is designed as a layout for repeater blocks.",goodFor:"FAQ section, long list of features",howToUse:(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add an accordion repeater block to the Block Editor"),(0,e.createElement)("li",null,"Add nested accordion item blocks"),(0,e.createElement)("li",null,"Customize the settings")),videoId:"YA4-duNF_w4",videoDesc:"How to create an accordion layout",tutorials:[{url:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-variation-library&s=accordion"),title:"Prebuilt accordion variations from the variation library",target:"_blank"}]},{title:"Modal, off-canvas, popover, toggle content layouts",keyFeatures:"Ease to use, works with any content, multiple options",worksWith:"All CBB blocks that have the toggle content support feature enabled.",builtWith:"Built with Vanilla JS, this is designed as an extended support feature for CBB blocks",goodFor:"Popup, Mega menu, off-canvas menu, popover, show/hide content, etc.",howToUse:(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a CBB block that has the toggle content feature enabled"),(0,e.createElement)("li",null,"Add inner blocks"),(0,e.createElement)("li",null,"Turn on the toggle content feature from the inspector settings"),(0,e.createElement)("li",null,"Customize the settings such as trigger element, show/hide on the first load, etc.")),videoId:"y31TAKHZOD0",videoDesc:"How to create a modal or off-canvas layout step by step",tutorials:[{url:"https://youtu.be/5QQRzhO9VJM",title:"[YouTube] How to create a toggle search box ↗",target:"_blank"},{url:"https://youtu.be/E4usfCydR7U",title:"[YouTube] How to create a responsive header with hamburger menu, toggle search box ↗",target:"_blank"},{url:"https://youtu.be/YnUt-zQXnCU",title:"[YouTube] How to create an off-canvas content ↗",target:"_blank"},{url:"https://youtu.be/g_KOCqvU0Ps",title:"[YouTube] How to create a notification, promotion bar ↗",target:"_blank"},{url:"https://youtu.be/52jD9eeBJ78",title:"[YouTube] How to create a video popup ↗",target:"_blank"},{url:"https://youtu.be/UEh_Da9Sozs",title:"[YouTube] How to create a cookies popup ↗",target:"_blank"}]},{title:"Background effects: parallax, zooming, infinite scrolling, video",keyFeatures:"Ease to use, fast, custom image, featured image, video",worksWith:"All CBB blocks that have the background media support feature enabled.",builtWith:"Built with Vanilla JS and CSS animations, this is designed as an extended support feature for CBB blocks",goodFor:"Hero section, zooming image on grid layout, etc.",howToUse:(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a CBB block that has the background media feature enabled"),(0,e.createElement)("li",null,"Input background media from the inspector settings"),(0,e.createElement)("li",null,"Choose background effect and customize the settings.")),videoId:"nDpeQbpu50s",videoDesc:"How to create a hero section with parallax background",tutorials:[{url:"https://youtu.be/mBleA20caGo",title:"[YouTube] How to add infinite scrolling effect to background ↗",target:"_blank"},{url:"https://youtu.be/0g1SLTq-lQ4",title:"[YouTube] How to create a page title bar with parallax background ↗",target:"_blank"}]},{title:"Query Loop: add carousel, responsive grid layout, extended filters and sorting",keyFeatures:"Responsive grid layout, carousel layout, filters by parent, postIds, meta fields, multiple post types, multiple sorting fields, etc.",worksWith:"The default Query Loop block",builtWith:"Using WordPress Core API, and responsive grid and carousel layouts",goodFor:"Blog page, post grid, post carousel",howToUse:(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Extended filters and sorting"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Choose a Query Loop block"),(0,e.createElement)("li",null,"Customize the settings inside the Extended filters and sorting panel from the inspector setting"))),(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Set responsive grid and carousel layouts"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Choose the Post Template block inside a Query Loop block"),(0,e.createElement)("li",null,"Choose responsive grid or carousel layout"),(0,e.createElement)("li",null,"Customize the settings inside the inspector settings")))),videoId:"aHy3spQVBGc",videoDesc:"How to create a blog page",tutorials:[{url:"https://youtu.be/bcK_k3IfW8g",title:"[YouTube] How to create a banner slider using the Query Loop block ↗",target:"_blank"},{url:"https://youtu.be/yDVaRm9Sehg",title:"[YouTube] How to create a related posts section ↗",target:"_blank"},{url:"https://youtu.be/paSXmpHU9K4",title:"[YouTube] How to create a card-style posts sections ↗",target:"_blank"},{url:"https://youtu.be/TSRKEFNwE8M",title:"[YouTube] How to create a magazine layout using just one Query Loop ↗",target:"_blank"},{url:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-variation-library&s=query+loop"),title:"Prebuilt query loop variations from the variation library",target:"_blank"},{url:"https://www.youtube.com/playlist?list=PLPuEwc7dZklchm8nVUOKqSOc6OgmRQyha",title:"[YouTube] View all playlist ↗",target:"_blank"}]},{title:"Sticky content: fixed and sticky with state awareness",keyFeatures:"Always fixed to viewport, sticky on scroll down, or sticky on scroll up",worksWith:"All CBB blocks that have the sticky content support feature enabled and the core/template-part block.",builtWith:"Built with VanilaJS, this is designed as an extended block support feature",goodFor:"Sticky header, sticky footer, two or more columns with one fixed on a side",howToUse:(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"CBB blocks"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a CBB block that has the sticky content feature enabled"),(0,e.createElement)("li",null,"Turn on the sticky content feature from the inspector settings"),(0,e.createElement)("li",null,"Customize the settings"))),(0,e.createElement)("li",null,(0,e.createElement)("h5",null,"Core template part block"),(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Choose the core/template block"),(0,e.createElement)("li",null,"Turn on the sticky content feature from the inspector settings"),(0,e.createElement)("li",null,"Customize the settings")))),videoId:"KEryi1y1UZ4",videoDesc:"How to create a sticky header"},{title:"Reveal animation: Add stunning effects to blocks when they appear in the viewport",keyFeatures:"Easy to use, multiple effects in sequence",worksWith:"All CBB blocks that have the reveal animation support feature enabled. This feature can be combined with carousel and modal, off-canvas layouts.",builtWith:"Built with VanilaJS and CSS animations, this is designed as an extended block support feature",goodFor:"Add reveal animations to any CBB blocks when they appear in the viewport",howToUse:(0,e.createElement)("ol",null,(0,e.createElement)("li",null,"Add a CBB block that has the reveal animations feature enabled"),(0,e.createElement)("li",null,"Add effects from the inspector settings"),(0,e.createElement)("li",null,"Customize effect settings"))}],r=[{title:"CBB blocks",summary:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",null,"The main idea of CBB is to enable you to easily create custom container blocks from other blocks. These container blocks are similar to core layout blocks but offer additional benefits. "),(0,e.createElement)("details",null,(0,e.createElement)("summary",null,"Why CBB blocks?"),(0,e.createElement)("ul",null,(0,e.createElement)("li",null,"They are as fast as core blocks, and have all core support features"),(0,e.createElement)("li",null,"They have extended support features from CBB"),(0,e.createElement)("li",null,"They are content blocks that have predefined content, format and style"),(0,e.createElement)("li",null,"The layout and style can be synchronized across multiple locations, while allowing for different content in each instance."),(0,e.createElement)("li",null,"You can customize the style, add interactivity to them with external JS/CSS or custom JS/CSS"))),(0,e.createElement)("a",{href:"https://contentblocksbuilder.com/documentation/custom-blocks/",target:"_blank"},"[contentblocksbuilder.com] Learn more about CBB blocks ↗"),(0,e.createElement)("h4",null,"How to create CBB blocks"),(0,e.createElement)("p",null,"CBB blocks are stored as custom post types, making their creation as easy as creating a blog post. The most important part when creating a CBB block is setting up its block settings in the sidebar from the block edit screen. There are several methods to create CBB blocks. The fastest way is to navigate to the block list screen and copy an existing one. If you want more advanced prebuilt blocks, you can navigate to the CBB block library, find the one you need, and import it to your site. You can then copy or edit the existing one to fit your needs."),(0,e.createElement)("h5",null,"Helpful links:"),(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("a",{href:"https://contentblocksbuilder.com/documentation/custom-blocks/how-to-create-a-gutenberg-block-with-cbb/",target:"_blank"},"[contentblocksbuilder.com] How to create CBB blocks ↗")),(0,e.createElement)("li",null,(0,e.createElement)("a",{href:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library"),target:"_blank"},"Visit CBB block library")))),videoTutorials:[{videoId:"paSXmpHU9K4",videoCaption:"How to create a features posts section block"},{videoId:"kHmaZ2-8v1Q",videoCaption:"How to create a mega menu block"}],tutorials:[{url:"https://www.youtube.com/watch?v=1tmIWXHv4gE&list=PLPuEwc7dZklcFBm-hwtNGJmuB-J8nV-fD&index=5",title:"[YouTube] View all playlist"}]},{title:"CBB repeater blocks",summary:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",null,"One of the best features of CBB is that it allows you to create repeater blocks that display repeating content, similar to repeater fields in meta field frameworks.\n            However, since they are just container blocks with built in layouts, they are much more flexible and easier to use."),(0,e.createElement)("details",null,(0,e.createElement)("summary",null,"Supported layouts for CBB repeater blocks"),(0,e.createElement)("ul",null,(0,e.createElement)("li",null,"Grid layout"),(0,e.createElement)("li",null,"Carousel layout"),(0,e.createElement)("li",null,"Accordion layout"),(0,e.createElement)("li",null,"Vertical stack layout"))),(0,e.createElement)("a",{href:"https://contentblocksbuilder.com/documentation/custom-blocks/#repeater-blocks",target:"_blank"},"[contentblocksbuilder.com] Learn more about CBB repeater blocks ↗"),(0,e.createElement)("h4",null,"How to create CBB repeater blocks"),(0,e.createElement)("p",null,"To turn a CBB block into a repeater block, simply toggle on the 'Create a repeater parent block for this block' setting and input the block details."),(0,e.createElement)("h5",null,"Helpful links:"),(0,e.createElement)("ul",null,(0,e.createElement)("li",null,(0,e.createElement)("a",{href:"https://contentblocksbuilder.com/documentation/custom-blocks/how-to-adjust-attributes-and-settings-for-cbb-blocks/#settings-for-parent-blocks",target:"_blank"},"[contentblocksbuilder.com] How to turn a CBB block to a repeater block ↗")),(0,e.createElement)("li",null,(0,e.createElement)("a",{href:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library"),target:"_blank"},"Visit CBB block library")))),videoTutorials:[{videoId:"5xv3gpRNagY",videoCaption:"How to create a synced overrides grid block"},{videoId:"EEk-kSa59VE",videoCaption:"How to create a banner slider"}],tutorials:[{url:"https://www.youtube.com/watch?v=1tmIWXHv4gE&list=PLPuEwc7dZklcFBm-hwtNGJmuB-J8nV-fD&index=5",title:"[YouTube] View all playlist"}]},{title:"Block variations, and styles",summary:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",null,"Block variations and styles are really useful features. They help developers provide predefined options for their blocks, making it super easy for end users. However, it's not easy for non-developers to create them. CBB makes it super easy for everyone to create them directly in the Block Editor and apply them in their workflow. You don't need to set up and maintain source code for your block variations anymore.")),videoTutorials:[{videoId:"rAWeQ2XLQJc",videoCaption:"How to create a variation for the core button block"},{videoId:"BAY8_evbyL0",videoCaption:"How to create a variation for the core image block"}]},{title:"A library of blocks, variations, and patterns",summary:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",null,"CBB provides a library of prebuilt blocks, variations, and patterns, all created directly in the Block Editor. You can easily import them into your site with one click. You can use, clone, or edit them to suit your needs."),(0,e.createElement)("ul",{className:"flex-list"},(0,e.createElement)("li",null,(0,e.createElement)("a",{href:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-block-library"),target:"_blank"},"Visit CBB block library")),(0,e.createElement)("li",null,(0,e.createElement)("a",{href:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=cbb-variation-library"),target:"_blank"},"Visit CBB variation library")))),videoTutorials:[{videoId:"TSRKEFNwE8M",videoCaption:"How to create a magazine layout using variations from the CBB variation library"},{videoId:"U-e6wbFGiYg",videoCaption:"How to create a animated arrow button"}]},{title:"Extended block supports",summary:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",null,"Besides core support features, CBB adds a range of extended features to enhance the layout and style of CBB blocks. You can opt in or out of these features for your CBB blocks. You can also apply these extended features to other blocks by wrapping them with a CBB block."),(0,e.createElement)("details",null,(0,e.createElement)("summary",null,"The full list of extended support features"),(0,e.createElement)("ul",null,(0,e.createElement)("li",null,"Responsive width & height"),(0,e.createElement)("li",null,"Responsive spacing: padding, margin, block spacing"),(0,e.createElement)("li",null,"Responsive aspect ratio"),(0,e.createElement)("li",null,"Responsive border & radius"),(0,e.createElement)("li",null,"Background media"),(0,e.createElement)("li",null,"Background overlay"),(0,e.createElement)("li",null,"Responsive Text alignment"),(0,e.createElement)("li",null,"Responsive Vertical alignment"),(0,e.createElement)("li",null,"Responsive Justify alignment"),(0,e.createElement)("li",null,"Box shadow"),(0,e.createElement)("li",null,"Responsive Transform"),(0,e.createElement)("li",null,"Visibility"),(0,e.createElement)("li",null,"Toggle content"),(0,e.createElement)("li",null,"Sticky content"),(0,e.createElement)("li",null,"Custom attributes"),(0,e.createElement)("li",null,"Reveal animation (PRO)"),(0,e.createElement)("li",null,"Custom CSS (PRO)"),(0,e.createElement)("li",null,"Copy/Paste styles (PRO)"))))}],i=({label:t,value:n})=>n?(0,e.createElement)("details",{className:"feature-line"},(0,e.createElement)("summary",{className:"label"},t),(0,e.createElement)("div",{className:"value"},n)):null;return(0,e.createElement)(bt,{isHeaderHidden:!0,isFullRow:!0,className:"welcome-widget welcome"},(0,e.createElement)("h1",null,"Welcome to Content Blocks Builder (CBB)"),(0,e.createElement)("div",{className:"welcome__description"},(0,e.createElement)("p",{className:"leading"},"Content Blocks Builder (CBB) adheres to Gutenberg and enhances it with practical and functional features.\n            Whether you are a beginner with no coding experience or a professional, with CBB you can create complex layouts for real-world websites directly in the Block Editor without using a code editor.\n            It works with any Gutenberg-ready themes."),(0,e.createElement)("a",{href:"https://contentblocksbuilder.com",target:"_blank"},"Visit contentblocksbuilder.com"),(0,e.createElement)("h2",{className:"section-title"},"CBB provides many practical features while remaining fast, clean, and bloat-free."),(0,e.createElement)("p",{className:"section-summary"},"With minimal effort, you can build most real-world features on your WordPress sites using CBB and core blocks, with any block theme, directly in the Block Editor."),(0,e.createElement)("div",{className:"grid"},a.map((({title:t,summary:n,keyFeatures:a,worksWith:r,builtWith:o,goodFor:l,howToUse:s,videoId:c,videoDesc:u,tutorials:d},m)=>(0,e.createElement)("div",{className:"grid-item",key:`feature-${m}`},(0,e.createElement)("div",{className:"feature"},(0,e.createElement)("h3",null,t),n?(0,e.createElement)("p",null,n):null,(0,e.createElement)(i,{label:"Key features",value:a}),(0,e.createElement)(i,{label:"Works with",value:r}),(0,e.createElement)(i,{label:"Good for",value:l}),(0,e.createElement)(i,{label:"How it's built",value:o}),(0,e.createElement)(i,{label:"How to use",value:s})),!!c&&(0,e.createElement)("div",{className:"video-tutorial"},(0,e.createElement)("h4",null,"Video tutorial"),(0,e.createElement)(yt,{videoId:c}),(0,e.createElement)("div",{className:"video-caption"},u)),!!d?.length&&(0,e.createElement)("div",{className:"more-resources"},(0,e.createElement)("h4",null,"More resources"),(0,e.createElement)("ul",null,d.map((({title:t,url:n,target:a},r)=>(0,e.createElement)("li",{key:`tutorial-${m}-${r}`},(0,e.createElement)("a",{href:n,target:a},t)))))))))),(0,e.createElement)("h2",{className:"section-title"},"How does CBB provide a lot of features and still remain super fast and bloat-free?"),(0,e.createElement)("p",{className:"section-summary"},"Unlike other multi-feature plugins, CBB doesn’t come bundled with a ton of blocks for specific needs. Instead, it offers extended block support features and an easy way to create container blocks. You can add any feature to any CBB block, and to apply those features to core or third-party blocks, you only need to wrap them with a CBB block."),(0,e.createElement)("div",{className:"grid grid--large"},r.map((({title:t,summary:n,videoTutorials:a=[],tutorials:r},o)=>(0,e.createElement)("div",{className:"grid-item technical-feature",key:`feature-${o}`},(0,e.createElement)("div",{className:"feature-details"},(0,e.createElement)("h3",null,t),(0,e.createElement)("div",{className:"feature-summary"},n)),(0,e.createElement)("div",{className:"feature-resource"},!!a?.length&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("h4",null,"Video tutorials"),(0,e.createElement)("div",{className:"video-tutorials"},a.map((({videoId:t,videoCaption:n})=>(0,e.createElement)("div",{className:"video-item"},(0,e.createElement)(yt,{videoId:t}),(0,e.createElement)("div",{className:"video-caption"},n)))))),!!r?.length&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("h4",null,"More resources"),(0,e.createElement)("ul",null,r.map((({title:t,url:n},a)=>(0,e.createElement)("li",{key:`tutorial-${o}-${a}`},(0,e.createElement)("a",{href:n,target:"_blank"},t))))))))))),(0,e.createElement)("p",{className:"leading"},"Thank you for choosing Content Blocks Builder (CBB) for your website. CBB sticks to Gutenberg and maintain the primary user experience of it, so if you are already familiar with the Block Editor, you will find it easy to use. If you need any help, contact us through the ",(0,e.createElement)("a",{target:"_blank",href:(0,p.addQueryArgs)("edit.php?post_type=boldblocks_block&page=content-blocks-builder-contact")},"contact page"),", visit the ",(0,e.createElement)("a",{target:"_blank",href:"https://wordpress.org/support/plugin/content-blocks-builder"},"support forum ↗")," ","or email us at"," ",(0,e.createElement)("a",{href:"mailto://hello@contentblocksbuilder.com?subject=Hello+CBB"},"hello@contentblocksbuilder.com"),"."," We’re sure to get back to you promptly.")))},_t=()=>(0,e.createElement)(pt,null,(0,e.createElement)(vt,null)),kt=(window.wp.editor,window.wp.dataControls),Et={},wt={getPreviewMode(e,t){var n;return null!==(n=e.previewModes[t])&&void 0!==n?n:""}},xt={fonts:{body:{fontFamily:"Nunito",genericFamily:"sans-serif",fontVariants:[]},headings:{fontFamily:"Roboto",genericFamily:"sans-serif",fontVariants:[]},additionalFonts:[]},fontsPresets:[{body:{fontFamily:"Nunito",genericFamily:"sans-serif"},headings:{fontFamily:"Roboto",genericFamily:"sans-serif"}},{body:{fontFamily:"Montserrat",genericFamily:"sans-serif"},headings:{fontFamily:"Oswald",genericFamily:"sans-serif"}},{body:{fontFamily:"Merriweather",genericFamily:"serif"},headings:{fontFamily:"Oswald",genericFamily:"sans-serif"}},{body:{fontFamily:"Montserrat",genericFamily:"sans-serif"},headings:{fontFamily:"Source Sans Pro",genericFamily:"sans-serif"}},{body:{fontFamily:"Source Sans Pro",genericFamily:"sans-serif"},headings:{fontFamily:"Libre Baskerville",genericFamily:"serif"}},{body:{fontFamily:"Fauna One",genericFamily:"serif"},headings:{fontFamily:"Playfair Display",genericFamily:"serif"}},{body:{fontFamily:"Josefin Slab",genericFamily:"serif"},headings:{fontFamily:"Six Caps",genericFamily:"sans-serif"}},{body:{fontFamily:"Source Sans Pro",genericFamily:"sans-serif"},headings:{fontFamily:"Playfair Display",genericFamily:"serif"}},{body:{fontFamily:"Quattrocento",genericFamily:"serif"},headings:{fontFamily:"Oswald",genericFamily:"sans-serif"}},{body:{fontFamily:"Alice",genericFamily:"serif"},headings:{fontFamily:"Sacramento",genericFamily:"cursive"}},{body:{fontFamily:"Lato",genericFamily:"sans-serif"},headings:{fontFamily:"Arvo",genericFamily:"serif"}},{body:{fontFamily:"Poppins",genericFamily:"sans-serif"},headings:{fontFamily:"Abril Fatface",genericFamily:"cursive"}},{body:{fontFamily:"Inconsolata",genericFamily:"monospace"},headings:{fontFamily:"Karla",genericFamily:"sans-serif"}},{body:{fontFamily:"Andika",genericFamily:"sans-serif"},headings:{fontFamily:"Amatic SC",genericFamily:"sans-serif"}},{body:{fontFamily:"Lato",genericFamily:"sans-serif"},headings:{fontFamily:"Lustria",genericFamily:"serif"}},{body:{fontFamily:"Proza Libre",genericFamily:"sans-serif"},headings:{fontFamily:"Cormorant Garamond",genericFamily:"serif"}},{body:{fontFamily:"EB Garamond",genericFamily:"serif"},headings:{fontFamily:"Oswald",genericFamily:"sans-serif"}},{body:{fontFamily:"Josefin Sans",genericFamily:"sans-serif"},headings:{fontFamily:"Yeseva One",genericFamily:"cursive"}},{body:{fontFamily:"Inter",genericFamily:"sans-serif"},headings:{fontFamily:"EB Garamond",genericFamily:"serif"}}],googleFonts:[]},Ct={fonts:null},St={getGoogleFonts:()=>async({dispatch:e})=>{const t=await d()({path:"boldblocks/v1/getGoogleFonts"});return t&&t.success&&e({type:"SET_GOOGLE_FONTS",payload:t.data}),t},getTypography:()=>async({dispatch:e})=>{const{BoldBlocksTypography:t}=await d()({path:"wp/v2/settings"});if(t)return Tt(t,e);{const{BoldBlocksTypography:t}=await d()({path:"wp/v2/settings",method:"POST",data:{BoldBlocksTypography:{fonts:JSON.stringify(xt.fonts)}}});return Tt(t,e)}},getPostTypography:e=>async({dispatch:t})=>{if(!e)return;const{meta:{BoldBlocksTypography:n}={}}=await d()({path:e});return Nt(n,t)}},Tt=(e,t)=>{if(e&&e?.fonts){const n=JSON.parse(e.fonts);return t({type:"UPDATE_FONTS",payload:n}),n}return e},Nt=(e,t)=>{let n;return e&&e?.fonts&&(n=JSON.parse(e.fonts)),t({type:"UPDATE_POST_FONTS",payload:n}),n},Ft={updateFonts:e=>({type:"UPDATE_FONTS",payload:e}),updatePostFonts:e=>({type:"UPDATE_POST_FONTS",payload:e}),updateAndPersistFonts:e=>async({dispatch:t})=>{const{BoldBlocksTypography:n}=await d()({path:"wp/v2/settings",method:"POST",data:{BoldBlocksTypography:{fonts:e}}});return Tt(n,t)},updateAndPersistPostFonts:(e,t)=>async({dispatch:n})=>{const{meta:{BoldBlocksTypography:a}={}}=await d()({path:t,method:"POST",data:{meta:{BoldBlocksTypography:{fonts:e}}}});return Nt(a,n)}},At={blocks:{},statuses:{}},Bt={getMissingBlock(e,t){var n;return null!==(n=e.missingBlocks.blocks[t])&&void 0!==n&&n},getMissingBlockStatus(e,t){var n;return null!==(n=e.missingBlocks.statuses[t])&&void 0!==n&&n}},Pt={setMissingBlockStatus:e=>({type:"SET_MISSING_BLOCK_STATUS",payload:e}),loadMissingBlock:e=>async({select:t,dispatch:n})=>{let a=t.getMissingBlock(e);var r;!1===a&&(a=null!==(r=(await d()({path:`wp/v2/block-directory/search?term=${e}`}))[0])&&void 0!==r?r:{},n({type:"SET_MISSING_BLOCK",payload:{[e]:a}}));return a}};(e=>{const t=(0,c.createReduxStore)("boldblocks/cbb-icon-library",{selectors:{getIconLibrary(e){var t;return null!==(t=e?.icons)&&void 0!==t?t:[]}},actions:{loadIconLibrary:e=>async({select:t,dispatch:n})=>{var a;if(!e)return;let r=t.getIconLibrary();if(r&&r.length)return r;const o=await d()({path:e});var i;return o?.success&&n({type:"UPDATE_ICONS",payload:null!==(i=o?.data)&&void 0!==i?i:[]}),null!==(a=o?.data)&&void 0!==a?a:[]}},reducer:(e={icons:[]},t)=>"UPDATE_ICONS"===t.type?{...e,icons:t.payload}:e});(0,c.register)(t)})();const Ot=(0,c.createReduxStore)("boldblocks/data",{selectors:{getGoogleFonts:e=>e.typography.googleFonts,getTypography:e=>({fonts:e.typography.fonts,fontsPresets:e.typography.fontsPresets}),getPostTypography:(e,t)=>({fonts:e.postTypography.fonts,fontsPresets:e.typography.fontsPresets}),...wt,...Bt},actions:{...Ft,setPreviewMode:e=>({type:"SET_PREVIEW_MODE",payload:e}),...Pt},controls:kt.controls,reducer:(0,c.combineReducers)({previewModes:(e=Et,t)=>"SET_PREVIEW_MODE"===t.type?{...e,[t.payload.clientId]:t.payload.previewMode}:e,typography:(e=xt,t)=>{switch(t.type){case"SET_GOOGLE_FONTS":return{...e,googleFonts:t.payload};case"UPDATE_FONTS":return{...e,fonts:t.payload}}return e},postTypography:(e=Ct,t)=>"UPDATE_POST_FONTS"===t.type?{...e,fonts:t.payload}:e,missingBlocks:(e=At,t)=>{switch(t.type){case"SET_MISSING_BLOCK":return{...e,blocks:{...e.missingBlocks,...t.payload}};case"SET_MISSING_BLOCK_STATUS":return{...e,statuses:{...e.statuses,[t.payload]:!0}}}return e}}),resolvers:{...St}});(0,c.register)(Ot);const Lt=(e,t=[])=>t.find((t=>t.label===e)),Rt=(e,t="",n=[],a)=>{let r=`boldblocks-font-${e.replace(/\s/g,"-").toLowerCase()}`;t&&(r=`${r}-text`);let o=a.querySelector(`#${r}`);if(!o){const i=Lt(e,n);if(i){let{label:e,variants:n}=i,l=`https://fonts.googleapis.com/css2?family=${e.replace(/\s/g,"+")}`,s=[];n=n.map((e=>("regular"===e?e="400":"italic"===e&&(e="400italic"),e))),n.sort().forEach((e=>{-1!==e.indexOf("italic")?s.push(`1,${e.replace("italic","")}`):s.push(`0,${e}`)})),l=`${l}:ital,wght@${s.sort().join(";")}&display=swap`,t&&(l=`${l}&text=${encodeURIComponent(t)}`),o=a.createElement("link"),o.id=r,o.rel="stylesheet",o.href=l,a.head.appendChild(o)}return i}},It=(e,t,n)=>{Rt(e?.headings?.fontFamily,"",t,n),Rt(e?.body?.fontFamily,"",t,n)},Dt=(e,t)=>(e&&t&&t?.headings&&(e=e.map((e=>e.headings.fontFamily===t?.headings?.fontFamily&&e.body.fontFamily===t?.body?.fontFamily?{...e,isActive:!0}:e?.isActive?{...e,isActive:!1}:e))),e),Mt=e=>e.map((e=>("regular"===e?e="400":"italic"===e&&(e="400italic"),e+""))).sort(),zt=(e,t,n,a)=>(0,o.useMemo)((()=>{const r=n(e,t);return r?a(r.variants):[]}),[e,t,n,a]),Ht=(e,t)=>{let n={};if(t){const{fontFamily:a,genericFamily:r}=t;a&&(n[`--cbb--${e}--font-family`]=`"${a}", ${r}`)}return n},Ut=(e,t)=>{let n=t.head.querySelector("#boldblocks-css-variables");n?n.innerHTML=e:(n=t.createElement("style"),n.id="boldblocks-css-variables",n.innerHTML=e,t.head.appendChild(n))},$t=Je.div`
  .fonts__actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  &.is-fullview {
    margin-top: 12px;

    .fonts__headings-body {
      display: grid;
      gap: 12px;

      .font__actions {
        margin-bottom: 0;
      }

      @media (min-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));

        .font {
          display: flex;
          flex-direction: column;
        }

        .font__item {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .font__preview {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .font__preview__text {
          flex-grow: 1;
        }

        .font__family__value {
          height: 36px;
        }

        .font__variants__value {
          height: 40px;
        }

        .font__actions {
          margin-top: auto;
        }
      }
    }
  }
`,Vt=Je.div`
  /*
  $break-huge: 1440px;
  $break-wide: 1280px;
  $break-xlarge: 1080px;
  $break-large: 960px;	// admin sidebar auto folds
  $break-medium: 782px;	// adminbar goes big
  $break-small: 600px;
  $break-mobile: 480px;
  $break-zoomed-in: 280px;
  */
  .components-combobox-control__suggestions-container,
  .components-form-token-field__input-container {
    width: auto;
  }

  label:empty {
    display: none;
  }

  h3 {
    margin-top: 16px;
    margin-bottom: 0.25em;
    font-size: 1.25em;
    text-transform: none;
  }

  .font {
    &__item {
      > * {
        margin-top: 0;
        margin-bottom: 8px;

        > * {
          margin-bottom: 4px;
        }
      }
    }

    &__label {
      padding-bottom: 4px;
      margin-top: 10;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }

    &__item__value {
      padding: 8px;
      border: 1px solid #ddd;
    }

    &__preview {
      &__text {
        font-size: 16px;
        line-height: 1.5;
      }
    }

    // Variants
    &__variants__edit {
      p {
        margin: 0;
      }
    }

    // Actions
    &__actions {
      display: flex;
      gap: 8px;
      margin: 10px 0;
    }
  }

  &.is-fullview {
    padding: 10px;
    border: 1px solid #ddd;

    .font__label {
      margin-top: 0;
    }
  }
`,Gt=({label:t,editLabel:n=(0,i.__)("Edit font","content-blocks-builder"),value:a,allFontFamilies:r,text:s,isInSidebar:c=!1,style:u={},isEditable:d,onChange:m})=>{const{fontFamily:p,fontVariants:f=[],allFontVariants:g=[]}=a,[h,b]=(0,o.useState)(!1);return(0,e.createElement)(Vt,{className:Xe("font",{"is-edit":h,"is-view":!h,"is-fullview":!c})},(0,e.createElement)("h3",{className:"font__label"},(0,e.createElement)("strong",null,t)),(0,e.createElement)("div",{className:"font__item"},(0,e.createElement)("div",{className:"font__family"},(0,e.createElement)("div",{className:"font__item__label font__family__label"},(0,i.__)("Family:","content-blocks-builder")),h?(0,e.createElement)("div",{className:"font__family__edit"},(0,e.createElement)(l.ComboboxControl,{value:p,options:r,onChange:e=>{m({...a,fontFamily:e})}})):(0,e.createElement)("div",{className:"font__item__value font__family__value",style:{...u,fontFamily:p}},p)),(0,e.createElement)("div",{className:"font__variants"},(0,e.createElement)("div",{className:"font__item__label font__variants__label"},(0,i.__)("Variants:","content-blocks-builder")),h?(0,e.createElement)("div",{className:"font__variants__edit"},(0,e.createElement)(l.FormTokenField,{label:"",value:f,suggestions:g,onChange:e=>{m({...a,fontVariants:e})},placeholder:(0,i.__)("Choose variants to load","content-blocks-builder"),__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1}),(0,e.createElement)("p",null,(0,i.__)("Leave it blank to load all available variants: ","content-blocks-builder"),!!g.length&&g.map(((t,n)=>(0,e.createElement)("span",{className:"font__variant",key:t},t,n<g.length-1?", ":""))))):(0,e.createElement)("div",{className:"font__item__value font__variants__value"},f.length?f.map(((t,n)=>(0,e.createElement)("span",{className:"font__variant",key:t},t,n<f.length-1?", ":""))):!!g.length&&g.map(((t,n)=>(0,e.createElement)("span",{className:"font__variant",key:t},t,n<g.length-1?", ":""))))),(0,e.createElement)("div",{className:"font__preview"},(0,e.createElement)("div",{className:"font__item__label font__preview__label"},(0,i.__)("Font preview:","content-blocks-builder")),(0,e.createElement)("div",{className:"font__item__value font__preview__text",style:{...u,fontFamily:p}},s))),d&&(0,e.createElement)("div",{className:"font__actions"},!h&&(0,e.createElement)(l.Button,{variant:"primary",size:"small",onClick:()=>{b(!0)}},n),h&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",size:"small",onClick:()=>{b(!1)}},(0,i.__)("Back to preview","content-blocks-builder")))))},jt=({value:t,allFontFamilies:n,onChange:a,onReset:r,isInSidebar:o=!1,isEditable:s,isFontsChanged:c})=>{const{headings:u,body:d}=t;return(0,e.createElement)($t,{className:Xe("fonts",{"is-fullview":!o})},(0,e.createElement)("div",{className:"fonts__headings-body"},(0,e.createElement)(Gt,{label:(0,i.__)("Headings font","content-blocks-builder"),editLabel:(0,i.__)("Edit headings font","content-blocks-builder"),value:u,onChange:e=>{a({...t,headings:e})},allFontFamilies:n,style:{fontWeight:"bold",fontSize:"1.25rem"},text:"The spectacle before us was indeed sublime.",isInSidebar:o,isEditable:s}),(0,e.createElement)(Gt,{label:(0,i.__)("Body font","content-blocks-builder"),editLabel:(0,i.__)("Edit body font","content-blocks-builder"),value:d,onChange:e=>{a({...t,body:e})},allFontFamilies:n,style:{fontSize:"1rem"},text:"By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.",isInSidebar:o,isEditable:s})),(0,e.createElement)("div",{className:"fonts__others"}),s&&(0,e.createElement)("div",{className:"fonts__actions"},(0,e.createElement)(l.Button,{variant:"primary",onClick:()=>{const e={...t};a({...e,headings:e.body,body:e.headings})}},(0,i.__)("Swap fonts","content-blocks-builder")),c&&(0,e.createElement)(l.Button,{variant:"secondary",onClick:r},(0,i.__)("Reset fonts","content-blocks-builder"))))},Wt=Je.div`
  /*
  $break-huge: 1440px;
  $break-wide: 1280px;
  $break-xlarge: 1080px;
  $break-large: 960px;	// admin sidebar auto folds
  $break-medium: 782px;	// adminbar goes big
  $break-small: 600px;
  $break-mobile: 480px;
  $break-zoomed-in: 280px;
  */

  margin-top: 12px;

  .font-pair {
    position: relative;
    height: 100%;
    padding: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.5;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-sizing: border-box;

    &:hover {
      border: 1px solid #000;
    }

    &.is-active {
      border: 1px solid #000;
      box-shadow: 0 0 5px #000;
    }

    .button-remove {
      position: absolute;
      top: 0;
      right: 0;
      color: #ddd;
    }

    &:hover {
      .button-remove {
        color: #000;
      }
    }
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.25em;
    font-size: 1.25em;
    text-transform: none;
  }

  // Fonts presets
  .fonts-presets__list {
    margin: 0 -0.25rem;
    height: 260px;
    overflow-y: auto;

    > * {
      padding: 0.25rem;
      box-sizing: border-box;
    }
  }

  // Grid style
  &.is-grid {
    .fonts-presets__list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.25rem;

      > * {
        flex: 0 0 100%;
        padding: 0.25rem;
        box-sizing: border-box;

        @media (min-width: 600px) {
          flex: 0 0 50%;
        }

        @media (min-width: 960px) {
          flex: 0 0 percentage(1 / 3);
        }
        @media (min-width: 1280px) {
          flex: 0 0 20%;
        }
      }
    }
  }
`,Yt=({presets:n=[],onChange:a=t.noop,isGrid:r=!1})=>(0,e.createElement)(Wt,{className:Xe("fonts-presets",{"is-grid":r})},(0,e.createElement)("h3",{className:"fonts-presets__label"},(0,e.createElement)("strong",null,(0,i.__)("Choose a predefined combination:","content-blocks-builder"))),(0,e.createElement)("div",{className:"fonts-presets__list"},n.map(((t,n)=>(0,e.createElement)("div",{className:"fonts-preset",key:n,onClick:()=>{a(t)}},(0,e.createElement)("div",{className:Xe("font-pair",{"is-active":t?.isActive})},(0,e.createElement)("div",{className:"font-pair__body",style:{fontFamily:t?.body?.fontFamily}},t?.body?.fontFamily),(0,e.createElement)("div",{className:"font-pair__headings",style:{fontFamily:t?.headings?.fontFamily,fontWeight:"bold"}},t?.headings?.fontFamily))))))),qt=window.wp.compose,Qt=Je.div`
  .components-notice {
    padding-right: 0;
    margin-right: 0;
    margin-left: 0;
  }
`,Jt=t=>{const{googleFonts:n=[],fonts:a,editingFonts:r,setEditingFonts:i,fontsPresets:s,isFontsChanged:c,messageData:u,setMessageData:d,isInSidebar:m=!1,isEditable:p=!0,isLoadingData:f,deviceType:g="Desktop"}=t,h=(0,o.useMemo)((()=>n.map((({label:e})=>({label:e,value:e})))),[n]),{headings:{fontFamily:b},body:{fontFamily:y}}=r,v=(0,qt.usePrevious)(g),_="Desktop"!==g&&"Desktop"===v;((e,t)=>{(0,o.useEffect)((()=>{e.length&&t.length&&((e,t,n)=>{e.forEach((e=>{Rt(e?.body?.fontFamily,e?.body?.fontFamily,t,n),Rt(e?.headings?.fontFamily,e?.headings?.fontFamily,t,n)}))})(e,t,document)}),[e.length,t.length,Rt])})(s,n),((e,t,n,a=!1)=>{(0,o.useEffect)((()=>{if(e?.headings?.fontFamily&&e?.body?.fontFamily&&t.length){const n=document.querySelector('iframe[name="editor-canvas"]');if(n){const r=n.contentWindow.document;a?function(e,t,n){return new Promise((a=>{if(t.querySelector(e))return a(t);const r=new MutationObserver((()=>{(t=n.querySelector('iframe[name="editor-canvas"]').contentWindow.document).querySelector(e)&&(a(t),r.disconnect())}));r.observe(t,{subtree:!0,childList:!0})}))}("#boldblocks-custom-fonts-css",r,document).then((n=>{It(e,t,n)})).catch((e=>E(e,"error"))):It(e,t,r)}else It(e,t,document)}}),[e?.headings.fontFamily,e?.body?.fontFamily,t.length,Rt,n,a])})(r,n,g,_),((e,t,n,a=!1)=>{(0,o.useEffect)((()=>{const t=document.querySelector('iframe[name="editor-canvas"]'),n=`.editor-styles-wrapper {${(e=>{const{body:t,headings:n}=e;let a={...Ht("body",t),...Ht("headings",n)};return Object.keys(a).reduce(((e,t)=>`${e}${t}: ${a[t]};`),"")})(e)}}`;if(t){const e=t.contentWindow.document;a?t.addEventListener("load",(()=>{Ut(n,e)})):Ut(n,e)}else Ut(n,document)}),[e,t,n,a])})(r,f,g,_);const k=zt(b,n,Lt,Mt),w=zt(y,n,Lt,Mt),x={...r,headings:{...r.headings,allFontVariants:k},body:{...r.body,allFontVariants:w}};return f?(0,e.createElement)(l.Spinner,null):(0,e.createElement)(Qt,null,(0,e.createElement)(jt,{value:x,allFontFamilies:h,isFontsChanged:c,onChange:e=>{i(e)},onReset:()=>{i(a)},isEditable:p,isInSidebar:m}),p&&(0,e.createElement)(Yt,{presets:Dt(s,r),onChange:e=>{i(e)},isGrid:!m}),u&&u?.message&&(0,e.createElement)(l.Notice,{status:u?.type,isDismissible:!0,onDismiss:()=>{d({type:"success",message:""})}},u.message))},Kt=({href:t,label:n=(0,i.__)("Learn more","content-blocks-builder")})=>(0,e.createElement)(l.ExternalLink,{href:t},n),Xt=Je(l.ToggleControl)`
  margin-top: 12px;
`,Zt=()=>{const n=((e="")=>{const{updateFonts:n,updateAndPersistFonts:a,updatePostFonts:r,updateAndPersistPostFonts:i}=(0,c.useDispatch)(Ot),l=(0,c.useSelect)((t=>{const n=t(Ot).getGoogleFonts(),{fonts:a,fontsPresets:r}=t(Ot).getTypography(),o=t(Ot).hasFinishedResolution("getTypography");let i,l;e&&(i=t(Ot).getPostTypography(e),l=t(Ot).hasFinishedResolution("getPostTypography",[e]));let s={fonts:a,globalFonts:a,fontsPresets:r,googleFonts:n,isGlobalTypographyLoaded:o,isPostTypogrpahyLoaded:l};return i&&i?.fonts&&(s={...s,fonts:i.fonts,isPostFonts:!0}),s}),[e]),{fonts:s,isGlobalTypographyLoaded:u,isPostTypogrpahyLoaded:d}=l,m=e?u&&d:u,[p,f]=(0,o.useState)(s);return(0,o.useEffect)((()=>{m&&f(s)}),[m]),{...l,editingFonts:p,setEditingFonts:f,isDataLoaded:m,isFontsChanged:(0,o.useMemo)((()=>{var e,n,a,r;return!(0,t.isEqual)({headingsFontFamily:s?.headings?.fontFamily,headingsFontVariants:null!==(e=s?.headings?.fontVariants)&&void 0!==e?e:[],bodyFontFamily:s?.body?.fontFamily,bodyFontVariants:null!==(n=s?.body?.fontVariants)&&void 0!==n?n:[]},{headingsFontFamily:p?.headings?.fontFamily,headingsFontVariants:null!==(a=p?.headings?.fontVariants)&&void 0!==a?a:[],bodyFontFamily:p?.body?.fontFamily,bodyFontVariants:null!==(r=p?.body?.fontVariants)&&void 0!==r?r:[]})}),[s,p]),updateFonts:n,updateAndPersistFonts:a,updatePostFonts:r,updateAndPersistPostFonts:i}})(),{isDataLoaded:a,isFontsChanged:r,editingFonts:s,setEditingFonts:u,updateAndPersistFonts:d}=n,[m,p]=(0,o.useState)(!1),[f,g]=(0,o.useState)({type:"success",message:""});return(0,e.createElement)(ht,{title:(0,i.__)("Google fonts settings","content-blocks-builder"),renderFooter:()=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",disabled:!r,onClick:e=>{e.preventDefault(),p(!0),d(JSON.stringify(s)).then((()=>{g({type:"success",message:(0,i.__)("Setttings saved!","content-blocks-builder")})})).catch((e=>{console.error(e),g({type:"error",message:(0,i.__)((0,i.__)("Something went wrong, please contact the author for support!","content-blocks-builder"))})})).finally((()=>{p(!1)}))}},(0,i.__)("Update typography","content-blocks-builder")),m&&(0,e.createElement)(l.Spinner,null)),isFullRow:!0},(0,e.createElement)(Jt,{...n,isLoadingData:!a,editingFonts:s,setEditingFonts:u,isFontsChanged:r,messageData:f,setMessageData:g}))},en=()=>{const{createSuccessNotice:n,createErrorNotice:a}=(0,c.useDispatch)(dt.store),{saveEditedEntityRecord:r}=(0,c.useDispatch)(s.store),[u,d]=(0,s.useEntityProp)("root","site","EnableTypography"),[m,p]=(0,s.useEntityProp)("root","site","UseBunnyFonts"),[f,g]=(0,o.useState)(!1);return(0,e.createElement)(pt,{description:(0,i.__)("Typography settings","content-blocks-builder")},(0,e.createElement)(ht,{isHeaderHidden:!0,isFullRow:!0},(0,e.createElement)(l.ToggleControl,{checked:null!=u&&u,disabled:(0,t.isUndefined)(u),label:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("span",null,(0,i.__)("Enable google fonts ","content-blocks-builder")),(0,t.isUndefined)(u)||f&&(0,e.createElement)(l.Spinner,{style:{margin:"0 10px 0 0"}})),onChange:e=>{d(e),g(!0),r("root","site").then((()=>{n((0,i.__)("Setttings saved!","content-blocks-builder"),{type:"snackbar"})})).catch((e=>{console.error(e),a((0,i.__)("Something went wrong, please contact the author for support!","content-blocks-builder"),{type:"snackbar"})})).finally((()=>{g(!1)}))}}),(0,e.createElement)("p",{style:{margin:0}},(0,e.createElement)("strong",null,(0,i.__)("Enable this setting will override font families from the theme.","content-blocks-builder"))," ",(0,e.createElement)("strong",null,(0,i.__)("It also generates two CSS classes named: 'headings-font-family', 'body-font-family' and two CSS variables named '--cbb--headings--font-family', '--cbb--body--font-family'. You can use those to set the font family for your blocks.","content-blocks-builder"))),u&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(Xt,{checked:null!=m&&m,disabled:(0,t.isUndefined)(m),label:(0,e.createElement)(e.Fragment,null,(0,e.createElement)("span",null,(0,i.__)("Load Bunny Fonts instead of Google Fonts for GDPR compliance","content-blocks-builder")),(0,t.isUndefined)(m)||f&&(0,e.createElement)(l.Spinner,{style:{margin:"0 10px 0 0"}})),onChange:e=>{p(e),g(!0),r("root","site").then((()=>{n((0,i.__)("Setttings saved!","content-blocks-builder"),{type:"snackbar"})})).catch((e=>{console.error(e),a((0,i.__)("Something went wrong, please contact the author for support!","content-blocks-builder"),{type:"snackbar"})})).finally((()=>{g(!1)}))},className:"use-bunny-fonts"}),(0,e.createElement)("p",null,(0,e.createElement)("strong",null,(0,e.createElement)(Kt,{href:"https://fonts.google.com/",label:"Google Fonts"}),","," ",(0,e.createElement)(Kt,{href:"https://fonts.bunny.net/",label:"Bunny Fonts"}))))),u&&(0,e.createElement)(Zt,null))},tn=(e,t,n)=>{if(!t)return n;const a=t.find((t=>e===t?.prefix));return a&&a?.breakpoint?a.breakpoint:n},nn=()=>{const{Messages:t}=(0,o.useContext)(w),{saveEditedEntityRecord:n}=(0,c.useDispatch)(s.store),[a,r]=(0,o.useState)({type:"success",message:""}),[u,d]=(0,s.useEntityProp)("root","site","CBBBreakpoints"),m=(e,t)=>n=>{const a=t.map((t=>t.prefix===e?{...t,breakpoint:n}:t));d(a)},p=(0,o.useMemo)((()=>tn("md",u,768)),[u]),f=(0,o.useMemo)((()=>tn("lg",u,1024)),[u]);return(0,e.createElement)(ht,{title:(0,i.__)("Manage reponsive breakpoints","content-blocks-builder"),renderFooter:()=>{const[a,i]=(0,o.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",onClick:e=>{e.preventDefault(),i(!0),n("root","site").then((()=>{r({type:"success",message:t.Success})})).catch((e=>{E(e,"error"),r({type:"error",message:t.Error})})).finally((()=>{i(!1)}))}},t.UpdateSettings),a&&(0,e.createElement)(l.Spinner,null))}},(0,e.createElement)(gt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,i.__)("Change the breakpoint values for phone, tablet and desktop. All values are in pixels (px).","content-blocks-builder"))),u?(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.RangeControl,{label:(0,i.__)("Tablet","content-blocks-builder"),value:p,onChange:m("md",u),min:600,max:1200}),(0,e.createElement)(l.RangeControl,{label:(0,i.__)("Desktop","content-blocks-builder"),value:f,onChange:m("lg",u),min:960,max:1920})):(0,e.createElement)(l.Spinner,null)),a&&a?.message&&(0,e.createElement)(l.Notice,{status:a?.type,isDismissible:!1},a.message))},an={edit:(0,i.__)("Edit","content-blocks-builder"),editItem:(0,i.__)("Edit %s","content-blocks-builder"),save:(0,i.__)("Save","content-blocks-builder"),cancel:(0,i.__)("Cancel","content-blocks-builder"),delete:(0,i.__)("Delete","content-blocks-builder"),closeModal:(0,i.__)("Close modal","content-blocks-builder"),name:(0,i.__)("Name","content-blocks-builder"),label:(0,i.__)("Label","content-blocks-builder"),block:(0,i.__)("block","content-blocks-builder"),variation:(0,i.__)("variation","content-blocks-builder"),defaultVariation:(0,i.__)("default variation","content-blocks-builder"),pattern:(0,i.__)("pattern","content-blocks-builder"),blocks:(0,i.__)("Blocks","content-blocks-builder"),variations:(0,i.__)("Variations","content-blocks-builder"),patterns:(0,i.__)("Patterns","content-blocks-builder")},rn=({value:n,onChange:a,onDelete:r,validateData:i,isEdit:s=!1})=>{const[c,u]=(0,o.useState)(n),{name:d,label:m}=c,[p,f]=(0,o.useState)(""),[g,h]=(0,o.useState)(s||(0,t.isEmpty)(d)||(0,t.isEmpty)(m));return(0,e.createElement)(e.Fragment,null,g?(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.TextControl,{placeholder:an.name,value:d,onChange:e=>{u({...c,name:e})},className:"category__name"}),(0,e.createElement)(l.TextControl,{placeholder:an.label,value:m,onChange:e=>{u({...c,label:e})},className:"category__label"}),(0,e.createElement)("div",{className:"fieldset__item__actions"},(0,e.createElement)(l.Button,{size:"small",variant:"secondary",onClick:()=>{const e=i(c);if("success"===e?.type){const{name:e,label:t}=c;a({name:e.trim(),label:t.trim()}),h(!1)}else f(e?.message)}},an.save),n?.name&&n?.label&&(0,e.createElement)(l.Button,{size:"small",variant:"secondary",onClick:()=>{u(n),h(!1)}},an.cancel),(0,e.createElement)(l.Button,{size:"small",variant:"secondary",isDestructive:!0,onClick:()=>{r()}},an.delete)),p&&(0,e.createElement)(l.Notice,{className:"message",status:"error",isDismissible:!1},p)):(0,e.createElement)(e.Fragment,null,(0,e.createElement)("code",null,d),(0,e.createElement)("span",null," - "),(0,e.createElement)("span",null,m),(0,e.createElement)("div",{className:"fieldset__item__actions"},(0,e.createElement)(l.Button,{size:"small",variant:"secondary",onClick:()=>{h(!0)}},an.edit),(0,e.createElement)(l.Button,{size:"small",variant:"secondary",isDestructive:!0,onClick:()=>{r()}},an.delete))))};(0,g.addFilter)("boldblocks.settings.patternCategories","boldblocks/premium",((n,{Fieldset:a,CategoryList:r,customCategories:o,setCustomCategories:s,registeredCategories:c})=>{const u=e=>{let{name:t,label:n}=null!=e?e:{};return t=t.trim(),n=n.trim(),t&&n?c.find((({name:e,label:a})=>e===t||a===n))?{type:"error",message:(0,i.__)("Name and label should not be in the list of already registered categories.","content-blocks-builder")}:{type:"success"}:{type:"error",message:(0,i.__)("Both name and label are required!","content-blocks-builder")}};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,i.__)("Manage custom categories","content-blocks-builder")),(0,e.createElement)("p",null,(0,i.__)("Click the 'Update Settings' button to save data to the database.","content-blocks-builder"))),(0,e.createElement)(r,{className:"category__list"},(0,t.isUndefined)(o)&&(0,e.createElement)(l.Spinner,null),o&&o.length>0&&o.map(((t,n)=>(0,e.createElement)("li",{key:t?.name},(0,e.createElement)(rn,{value:t,validateData:u,onChange:e=>{const t=[...o];t[n]=e,s(t)},onDelete:()=>{const e=[...o];e.splice(n,1),s(e)}}))))),o&&(0,e.createElement)(l.Button,{variant:"primary",size:"small",onClick:()=>{s([...o,{name:"",label:""}])}},(0,i.__)("Add category","content-blocks-builder"))))}));const on=Je.ul`
  li {
    display: flex;
    align-items: center;
    align-self: start;
    flex-wrap: wrap;
    gap: 0.2em;
    padding: 6px 0;
    margin: 0;
    border-bottom: 1px solid #ddd;
  }

  .fieldset__item__actions {
    margin-left: auto;

    > * + * {
      margin-left: 8px;
    }
  }

  .components-base-control + .components-base-control {
    margin-left: 8px;
  }

  .components-base-control__field {
    margin-bottom: 0;
  }
`,ln=()=>{const{Messages:t}=(0,o.useContext)(w),{saveEditedEntityRecord:n}=(0,c.useDispatch)(s.store),[a,r]=(0,o.useState)(!0),[u,m]=(0,o.useState)([]),[p,f]=(0,s.useEntityProp)("root","site","boldblocks_pattern_categories"),[h,b]=(0,o.useState)({type:"success",message:""}),[y,v]=(0,s.useEntityProp)("root","site","boldblocks_pattern_categories_all_label");return(0,o.useEffect)((()=>{d()({path:"boldblocks/v1/getPatternCategories"}).then((e=>{m(e),r(!1)}))}),[]),(0,e.createElement)(ht,{title:(0,i.__)("Manage pattern categories","content-blocks-builder"),renderFooter:()=>{const[a,r]=(0,o.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",onClick:e=>{e.preventDefault(),r(!0),n("root","site").then((()=>{b({type:"success",message:t.Success})})).catch((e=>{console.error(e),b({type:"error",message:t.Error})})).finally((()=>{r(!1)}))}},t.UpdateSettings),a&&(0,e.createElement)(l.Spinner,null))}},(0,e.createElement)("p",null,(0,i.__)("You can create custom pattern categories for this site such as 'Carousel', 'Hero'... Don't register new categories with the same name and label as those already registered.","content-blocks-builder")),(0,e.createElement)("p",null,(0,i.__)("Following pattern categories are already registered:","content-blocks-builder")),(0,e.createElement)(gt,{className:"fieldset"},a&&(0,e.createElement)(l.Spinner,null),u.length>0&&(0,e.createElement)("ul",{className:"fieldset__list"},u.map((({name:t,label:n})=>(0,e.createElement)("li",{key:t},(0,e.createElement)("code",null,t),(0,e.createElement)("span",null," - "),(0,e.createElement)("span",null,n)))))),(0,g.applyFilters)("boldblocks.settings.patternCategories",null,{Fieldset:gt,CategoryList:on,customCategories:p,setCustomCategories:f,registeredCategories:u}),(0,e.createElement)(gt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,i.__)("Change the label for the 'all custom patterns' category.","content-blocks-builder"))),(0,e.createElement)(l.TextControl,{value:null!=y?y:"",onChange:v})),h&&h?.message&&(0,e.createElement)(l.Notice,{status:h?.type,isDismissible:!1},h.message))},sn=()=>(0,e.createElement)(pt,{description:(0,i.__)("General settings","content-blocks-builder")},(0,e.createElement)(nn,null),(0,e.createElement)(ln,null)),cn=(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M18 11.3l-1-1.1-4 4V3h-1.5v11.3L7 10.2l-1 1.1 6.2 5.8 5.8-5.8zm.5 3.7v3.5h-13V15H4v5h16v-5h-1.5z"})),un=["boldblocks/group","boldblocks/grid-item","boldblocks/grid-item-repeater","boldblocks/carousel-item","boldblocks/carousel-item-repeater","boldblocks/stack-item","boldblocks/stack-item-repeater","boldblocks/accordion-item","boldblocks/accordion-item-repeater"],dn=e=>{const{records:n,isResolving:a,hasResolved:r}=(0,s.useEntityRecords)("postType",e,{per_page:-1,_cbb_load_all:!0});return[(0,t.isArray)(n)?n.map((e=>{const{id:t,title:{raw:n,rendered:a},content:{raw:r},slug:o,type:i,meta:l,...s}=e;return{id:t,title:n,content:r,slug:o,type:i,meta:l,renderedTitle:a,...s}})):[],a,r]},mn=(0,o.createContext)(),pn=({postType:t,title:n,value:a=[],setValue:r})=>{const s=(0,o.useContext)(mn),c=t.replace("boldblocks_",""),u=`${c}s`,d=`${c.charAt(0).toUpperCase()+c.slice(1)}s`,{[u]:m,[`isLoading${d}`]:p,[`hasFinishedResolution${d}`]:f}=s,g=(t,n)=>{let a=null;switch(n){case"boldblocks_block":case"boldblocks_pattern":a=(0,e.createElement)(e.Fragment,null,`boldblocks/${t?.slug}`);break;case"boldblocks_variation":a=(0,e.createElement)(e.Fragment,null,t?.meta?.boldblocks_variation_name)}return a};let h=m;if("block"===c&&h?.length){const e=un.map((e=>e.replace("boldblocks/","")));h=h.filter((({slug:t})=>!e.includes(t)))}return(0,e.createElement)(gt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,n)),p&&(0,e.createElement)(l.Spinner,null),h&&h.length>0?(0,e.createElement)("fieldset",null,(0,e.createElement)(l.CheckboxControl,{label:(0,i.__)("Toggle All","content-blocks-builder"),checked:a.length===h.length,onChange:e=>{r(e?[...h]:[])}}),(0,e.createElement)("ul",{className:"fieldset__list"},h.map((n=>{return(0,e.createElement)("li",{key:n?.slug},(0,e.createElement)(l.CheckboxControl,{onChange:e=>{let t=[];if(e){const e=h.find((({slug:e})=>e===n?.slug));t=[...a,e]}else t=a.filter((({slug:e})=>e!==n?.slug));r([...t])},checked:(o=n?.slug,a.find((({slug:e})=>e===o))),label:g(n,t)}));var o})))):(0,e.createElement)(e.Fragment,null,f&&(0,e.createElement)("div",null,(0,i.__)("There is no data to export.","content-blocks-builder"))))},fn=()=>{const{isLoading:t}=(0,o.useContext)(mn),[n,a]=(0,o.useState)([]),[r,s]=(0,o.useState)([]),[c,u]=(0,o.useState)([]);return(0,e.createElement)(ht,{title:(0,i.__)("Export data","content-blocks-builder"),renderFooter:()=>(0,e.createElement)(l.Button,{variant:"primary",disabled:0===n.length&&0===r.length&&0===c.length||t,icon:cn,iconSize:16,onClick:e=>{e.preventDefault();const t={};n.length&&(t.blocks=n.map((({title:e,content:t,slug:n,meta:a,keywords:r})=>({title:e,content:t,slug:n,meta:a,keywords:r})))),r.length&&(t.variations=r.map((({title:e,content:t,slug:n,meta:a})=>({title:e,content:t,slug:n,meta:a})))),c.length&&(t.patterns=c.map((({title:e,content:t,slug:n,meta:a,keywords:r})=>({title:e,content:t,slug:n,meta:a,keywords:r})))),((e,t)=>{const n=new Blob([JSON.stringify(t,null,2)],{type:"text/json"}),a=document.createElement("a");a.download=e,a.href=window.URL.createObjectURL(n),a.dataset.downloadurl=["text/json",a.download,a.href].join(":");const r=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});a.dispatchEvent(r),a.remove()})(`cbb-${(new Date).toISOString().slice(0,10)}.json`,t)}},(0,i.__)("Export data","content-blocks-builder"))},(0,e.createElement)("p",null,(0,i.__)("Select the blocks, variations, patterns to export a .json file which you can then import to another WordPress site. Be sure to export all dependent blocks and/or variations.","content-blocks-builder")),(0,e.createElement)(pn,{postType:"boldblocks_block",title:(0,i.__)("Select Blocks","content-blocks-builder"),value:n,setValue:a}),(0,e.createElement)(pn,{postType:"boldblocks_variation",title:(0,i.__)("Select Variations","content-blocks-builder"),value:r,setValue:s}),(0,e.createElement)(pn,{postType:"boldblocks_pattern",title:(0,i.__)("Select Patterns","content-blocks-builder"),value:c,setValue:u}))},gn=(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M18.5 15v3.5H13V6.7l4.5 4.1 1-1.1-6.2-5.8-5.8 5.8 1 1.1 4-4v11.7h-6V15H4v5h16v-5z"})),hn=(0,e.createElement)(f.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(f.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12.848 8a1 1 0 0 1-.914-.594l-.723-1.63a.5.5 0 0 0-.447-.276H5a.5.5 0 0 0-.5.5v11.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-9A.5.5 0 0 0 19 8h-6.152Zm.612-1.5a.5.5 0 0 1-.462-.31l-.445-1.084A2 2 0 0 0 10.763 4H5a2 2 0 0 0-2 2v11.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-5.54Z"})),bn=Je.div`
  margin-top: 12px;
`,yn=({posts:n,title:a})=>(0,t.isArray)(n)&&(0,e.createElement)(bn,{className:"posts-preview"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,a)),(0,e.createElement)("ul",{className:"fieldset__list"},n.map((({slug:t})=>(0,e.createElement)("li",{key:t},`boldblocks/${t}`))))),vn=()=>{const{saveEditedEntityRecord:n}=(0,c.useDispatch)(s.store),a=(0,o.useContext)(mn),{isLoading:r,registeredCategories:u,customCategories:m,setCustomCategories:p,isLoadingPatternsCategories:f}=a,g=!f&&u.concat(m).concat([{name:"boldblocks"}]).map((({name:e})=>e)),[h,b]=(0,o.useState)(""),[y,v]=(0,o.useState)({}),[_,k]=(0,o.useState)({}),[E,w]=(0,o.useState)("ignore");let x=e=>e?.blocks||e?.variations||e?.patterns;return(0,e.createElement)(ht,{title:(0,i.__)("Import data","content-blocks-builder"),renderFooter:()=>{const[s,c]=(0,o.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",disabled:!x(y)||!h||r,icon:gn,iconSize:16,onClick:()=>{c(!0);const e=(0,t.pick)(y,["blocks","variations","patterns"]);Promise.all(Object.keys(e).map((async n=>Promise.all(e[n].map((e=>((e,n)=>{const{[n]:r}=a;let o;return o="variations"===n?(0,t.isArray)(r)&&r.find((({meta:{boldblocks_variation_name:t}})=>t===e?.meta?.boldblocks_variation_name)):(0,t.isArray)(r)&&r.find((({slug:t})=>t===e?.slug)),o?"override"===E?d()({path:`wp/v2/boldblocks-${n}/${o.id}`,method:"POST",data:{...e,status:"publish"}}):void 0:"variations"===n?d()({path:"boldblocks/v1/createVariation",method:"POST",data:{...e,status:"publish"}}):d()({path:`wp/v2/boldblocks-${n}`,method:"POST",data:{...e,status:"publish"}})})(e,n)))).then((e=>({key:n,response:e})))))).then((e=>{const a=e.reduce(((e,{key:t,response:n})=>({...e,[t]:n.filter((e=>e))})),{});if(a?.patterns&&a.patterns){const e=(0,t.uniqBy)(a.patterns.reduce(((e,{meta:{boldblocks_pattern_categories:t=[]}})=>[...e,...t]),[]),"name");if(e.length){const t=e.filter((({name:e})=>!g.find((t=>e===t))));t.length&&(p([...m,...t]),n("root","site"))}}a?.blocks&&a.blocks.length||a?.variations&&a.variations.length||a?.patterns&&a.patterns.length?k({type:"success",message:(0,i.__)("Data has been imported successfully!","content-blocks-builder")}):k({type:"info",message:(0,i.__)("No items have been imported! Please change your settings or upload another JSON file.","content-blocks-builder")})})).catch((e=>{console.error(e),k({type:"error",message:(0,i.__)("Import failed. Please make sure your data is correct!","content-blocks-builder")})})).finally((()=>{c(!1),b(""),v({})}))}},(0,i.__)("Import data","content-blocks-builder")),s&&(0,e.createElement)(l.Spinner,null))}},(0,e.createElement)("p",null,(0,i.__)("Upload your json file and click the import button.","content-blocks-builder")),(0,e.createElement)(gt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,i.__)("Select file","content-blocks-builder"))),(0,e.createElement)("div",{className:"file-upload"},(0,e.createElement)(l.FormFileUpload,{accept:"application/JSON",variant:"primary",onChange:e=>{b(e.target.files[0]);const t=new FileReader;t.onload=e=>{try{const t=JSON.parse(e.target.result);x(t)?(v(t),k({})):(v({}),k({type:"error",message:(0,i.__)("The uploaded file is in the wrong format. Please use a JSON file from the export functionality.","content-blocks-builder")}))}catch(e){v({}),console.error(e)}},t.readAsText(e.target.files[0]),e.target.value=""}},(0,i.__)("Choose file to upload","content-blocks-builder")),x(y)&&h&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"file-preview"},(0,e.createElement)("span",{className:"icon"},hn),(0,e.createElement)("span",{className:"name"},h?.name),(0,e.createElement)(l.Button,{variant:"tertiary",className:"delete",onClick:()=>{b(""),v({})}},an.delete)),(0,e.createElement)("div",{className:"data-preview",style:{flexBasis:"100%"}},(0,e.createElement)("p",null,(0,i.__)("Following data will be imported.","content-blocks-builder")),(0,e.createElement)(yn,{posts:y?.blocks,title:`${an.blocks}:`}),(0,e.createElement)(yn,{posts:y?.variations,title:`${an.variations}:`}),(0,e.createElement)(yn,{posts:y?.patterns,title:`${an.patterns}:`})))),(0,e.createElement)("div",{className:"fieldset__label",style:{marginTop:"12px"}},(0,e.createElement)("strong",null,(0,i.__)("Import settings","content-blocks-builder"))),(0,e.createElement)(l.RadioControl,{selected:E,onChange:w,options:[{value:"override",label:(0,i.__)("Replace old data.","content-blocks-builder")},{value:"ignore",label:(0,i.__)("Existing items are ignored.","content-blocks-builder")}]}),!(0,t.isEmpty)(_)&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Notice,{status:_?.type,isDismissible:!1},_?.message))))},kn=()=>{const n=(()=>{const[e,n,a]=dn("boldblocks_block"),[r,i,l]=dn("boldblocks_variation"),[c,u,m]=dn("boldblocks_pattern"),{registeredCategories:p,customCategories:f,setCustomCategories:g,isLoading:h}=(()=>{const[e,n]=(0,o.useState)(!0),[a,r]=(0,o.useState)([]),[i,l]=(0,s.useEntityProp)("root","site","boldblocks_pattern_categories");return(0,o.useEffect)((()=>{d()({path:"boldblocks/v1/getPatternCategories"}).then((e=>{r(e),n(!1)}))}),[]),{registeredCategories:a,customCategories:i,setCustomCategories:l,isLoading:e||(0,t.isUndefined)(i)}})();return{blocks:e,isLoadingBlocks:n,hasFinishedResolutionBlocks:a,variations:r,isLoadingVariations:i,hasFinishedResolutionVariations:l,patterns:c,isLoadingPatterns:u,hasFinishedResolutionPatterns:m,registeredCategories:p,customCategories:f,setCustomCategories:g,isLoadingPatternsCategories:h,isLoading:n||i||u||h}})();return(0,e.createElement)(mn.Provider,{value:n},(0,e.createElement)(pt,{description:(0,i.__)("Import/Export blocks, patterns and variations","content-blocks-builder")},(0,e.createElement)(fn,null),(0,e.createElement)(vn,null)))},En=Je(ht)`
  .inside h2 {
    padding: 0;
    margin: 0 0 10px;
    font-size: 1.75em;
  }

  .dev__body {
    padding-top: 1em;
  }
`,wn=()=>{const{Debug:{nonce:t,isPurged:n,setIsPurged:a}={}}=(0,o.useContext)(w);return(0,e.createElement)(En,{title:(0,i.__)("Purge the cache","content-blocks-builder"),className:"debug-widget debug"},(0,e.createElement)("div",{className:"dev__body debug__body"},(0,e.createElement)(l.Flex,{justify:"flex-start"},(0,e.createElement)(l.Button,{variant:"primary",type:"button",href:(0,p.addQueryArgs)(`edit.php?post_type=boldblocks_block&page=cbb-settings&tab=developer&_cbb_purge=${t}`),as:"a"},(0,i.__)("Purge cache","content-blocks-builder")),(0,e.createElement)("p",null,(0,i.__)("Delete the entire cache contents for CBB Blocks, Variations and Patterns.","content-blocks-builder"))),!!n&&(0,e.createElement)(l.Notice,{status:"success",onRemove:()=>{a(!1),(new x).delete("_cbb_purge",!0)}},(0,i.__)("Cache cleared.","content-blocks-builder"))))},xn=()=>{const{Messages:n,pages:a,isResolvingPages:r}=(0,o.useContext)(w),u=(0,o.useMemo)((()=>a?.length?a.map((({id:e,title:{rendered:t}={}})=>({label:t,value:e}))):[]),[r]),{saveEditedEntityRecord:d}=(0,c.useDispatch)(s.store),[m,p]=(0,s.useEntityProp)("root","site","IsMaintenance"),[f,g]=(0,s.useEntityProp)("root","site","MaintenanceSlug"),[h,b]=(0,s.useEntityProp)("root","site","MaintananceEnableCustomPage"),[y,v]=(0,s.useEntityProp)("root","site","MaintanancePageId"),[_,k]=(0,o.useState)({type:"success",message:""});return(0,e.createElement)(En,{title:(0,i.__)("Maintenance mode","content-blocks-builder"),renderFooter:()=>{const[t,a]=(0,o.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.Button,{variant:"primary",onClick:e=>{e.preventDefault(),a(!0),d("root","site").then((()=>{k({type:"success",message:n.Success})})).catch((e=>{log(e,"error"),k({type:"error",message:n.Error})})).finally((()=>{a(!1)}))}},n.UpdateSettings),t&&(0,e.createElement)(l.Spinner,null))},className:"maintenance-widget maintenance"},(0,e.createElement)(gt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,i.__)("Turn on the maintenance mode.","content-blocks-builder"))),(0,t.isUndefined)(f)?(0,e.createElement)(l.Spinner,null):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.ToggleControl,{label:(0,i.__)("Enable maintenance mode","content-blocks-builder"),checked:null!=m&&m,disabled:(0,t.isUndefined)(m),onChange:p}),m&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.TextareaControl,{label:(0,i.__)("Ignore slug","content-blocks-builder"),value:f,placeholder:"wp-login.php",onChange:g,help:(0,i.__)("Input the page slugs that will bypass the maintenance mode. Put each item on a new line.","content-blocks-builder"),rows:4}),(0,e.createElement)(l.ToggleControl,{label:(0,i.__)("Use a custom page as the maintenance page","content-blocks-builder"),checked:null!=h&&h,onChange:b}),h&&(0,e.createElement)(e.Fragment,null,r||(0,t.isUndefined)(a)?(0,e.createElement)(l.Spinner,null):(0,e.createElement)(l.SelectControl,{label:(0,i.__)("Custom maintenance page","content-blocks-builder"),value:y,onChange:v,options:u}))))),_&&_?.message&&(0,e.createElement)(l.Notice,{status:_?.type,isDismissible:!1},_.message))},Cn=()=>(0,e.createElement)(pt,{description:(0,i.__)("Settings for developer","content-blocks-builder")},(0,e.createElement)(wn,null),(0,e.createElement)(xn,null)),Sn=({children:t})=>(0,e.createElement)("div",{className:"metabox-holder"},t),Tn=()=>{const n=[{name:"getting-started",title:(0,i.__)("Getting Started","content-blocks-builder"),className:"setting-tabs__getting-started"},{name:"general",title:(0,i.__)("General","content-blocks-builder"),className:"setting-tabs__general"},{name:"typography",title:(0,i.__)("Typography","content-blocks-builder"),className:"setting-tabs__typography"},{name:"tools",title:(0,i.__)("Tools","content-blocks-builder"),className:"setting-tabs__tools"},{name:"developer",title:(0,i.__)("Developer","content-blocks-builder"),className:"setting-tabs__developer"}],a=new x,r=a.get("tab"),c=(0,t.findKey)(n,["name",r])?r:"getting-started",u=(()=>{const{loading:e,error:t,data:{data:n}={}}=((e,t={},n=[])=>{const[a,r]=(0,o.useState)(!0),[i,l]=(0,o.useState)(),[s,c]=(0,o.useState)(),u=(0,o.useCallback)((()=>{r(!0),l(void 0),c(void 0),d()({path:e,...{...m,...t}}).then(c).catch(l).finally((()=>r(!1)))}),n);return(0,o.useEffect)((()=>{u()}),[u]),{loading:a,error:i,data:s}})("boldblocks/v1/getDocs");let a="",r=!1;try{a=CBBSettings?.nonce,r=CBBSettings?.isPurgedCache}catch(t){log("The nonce is not defined!","error")}const[l,c]=(0,o.useState)(r),u={UpdateSettings:(0,i.__)("Update Settings","content-blocks-builder"),Success:(0,i.__)("Setting Saved!","content-blocks-builder"),Error:(0,i.__)("Something went wrong, please contact the author for support!","content-blocks-builder")},{records:p,isResolving:f}=(0,s.useEntityRecords)("postType","page",{per_page:100});return{Docs:{loading:e,error:t,docs:n},Debug:{nonce:a,isPurged:l,setIsPurged:c},Messages:u,pages:p,isResolvingPages:f}})();return(0,e.createElement)(w.Provider,{value:u},(0,e.createElement)(l.TabPanel,{tabs:n,className:"settings-tabs",activeClass:"is-active",initialTabName:c,onSelect:e=>{a.set("tab",e)}},(t=>{switch(t.name){case"getting-started":return(0,e.createElement)(Sn,null,(0,e.createElement)(_t,null));case"general":return(0,e.createElement)(Sn,null,(0,e.createElement)(sn,null));case"typography":return(0,e.createElement)(Sn,null,(0,e.createElement)(en,null));case"tools":return(0,e.createElement)(Sn,null,(0,e.createElement)(kn,null));case"developer":return(0,e.createElement)(Sn,null,(0,e.createElement)(Cn,null))}})))};r()((()=>{(0,o.createRoot)(document.querySelector(".js-boldblocks-settings-root")).render((0,e.createElement)(Tn,null))}))})()})();