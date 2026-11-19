import{i as p,aw as d,cj as m,a as v,ci as g,S as C,R as y,h as S,L as w}from"./index-Cm_mx7eP.js";const u="/gta6/assets/models/street/var/",h=typeof location<"u"&&/[?&]propvar=0/.test(location.search);function _(e){return!!(e&&e.userData&&e.userData.varN)}function b(e,a=1,c=0,n=new p){return n.setRGB(e,a,c,d)}async function O(e,a,c){var f;const n=await(await fetch(e)).blob(),r=await createImageBitmap(n,{colorSpaceConversion:"none",premultiplyAlpha:"none"}),t=a*c,l=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(a,t):Object.assign(document.createElement("canvas"),{width:a,height:t})).getContext("2d",{willReadFrequently:!0});l.drawImage(r,0,0,a,t),(f=r.close)==null||f.call(r);const o=new Uint8Array(l.getImageData(0,0,a,t).data.buffer),i=new m(o,a,a,c);return i.format=v,i.type=g,i.colorSpace=C,i.wrapS=i.wrapT=y,i.magFilter=S,i.minFilter=w,i.generateMipmaps=!0,i.anisotropy=8,i.needsUpdate=!0,i}function V(e,a,c){const n=e.onBeforeCompile;e.userData.varN=c,e.userData.varTex=a,e.onBeforeCompile=function(t,s){n&&n.call(this,t,s),t.uniforms.uVarMap={value:a},t.uniforms.uVarN={value:c},t.vertexShader=`varying vec3 vVar;
`+t.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
#ifdef USE_INSTANCING_COLOR
  vVar = instanceColor;
  #if defined( USE_COLOR_ALPHA )
    vColor = vec4( 1.0 );
  #elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
    vColor = vec3( 1.0 );
  #endif
#else
  vVar = vec3( 0.0, 1.0, 0.0 );
#endif`),t.fragmentShader=`precision highp sampler2DArray;
uniform sampler2DArray uVarMap;
uniform float uVarN;
varying vec3 vVar;
`+t.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
  vec4 sampledDiffuseColor = texture( uVarMap, vec3( vMapUv, clamp( floor( vVar.x + 0.5 ), 0.0, uVarN - 1.0 ) ) );
  diffuseColor *= sampledDiffuseColor;
#endif
  diffuseColor.rgb *= vVar.y;
  { float l = dot( diffuseColor.rgb, vec3( 0.299, 0.587, 0.114 ) ); diffuseColor.rgb = mix( diffuseColor.rgb, vec3( l ) * vec3( 1.05, 1.0, 0.9 ) * 1.12 + 0.015, clamp( vVar.z, 0.0, 1.0 ) ); }`)};const r=e.customProgramCacheKey;e.customProgramCacheKey=function(){return(r?r.call(this):"")+"|propvar"},e.needsUpdate=!0}async function x(e){if(h||typeof fetch>"u"||typeof createImageBitmap>"u")return{};let a=null;try{a=await(await fetch(u+"variants.json")).json()}catch(n){return console.warn("[variants] no manifest",n==null?void 0:n.message),{}}const c={};return await Promise.all(Object.entries(a).map(async([n,r])=>{const t=r.glb.replace(/\.glb$/,""),s=e[t];if(!s)return;const l=s.find(o=>o.material&&o.material.name===r.mat&&o.material.map);if(l)try{const o=await O(u+n+".jpg",r.size,r.n);V(l.material,o,r.n),c[t]={n:r.n,set:n,layers:r.layers,material:l.material}}catch(o){console.warn("[variants] set failed",n,o==null?void 0:o.message)}})),c}export{_ as isVariantMaterial,x as loadVariants,b as variantColor};
