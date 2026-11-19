import{bY as c,bZ as v,Y as d,b_ as m,u as w}from"./index-Cm_mx7eP.js";function h(e,i={}){const n=[i.base||"yard",i.grass||"scrub"],r=c(n),g={value:null},o={value:null};v(e).then(a=>{g.value=a.col,o.value=a.aux,l.needsUpdate=!0});const l=new w({roughness:.92,metalness:0,vertexColors:i.vertexColors??!0});return l.name="ground:"+n.join("+"),l.customProgramCacheKey=()=>"ps-groundsurf-"+n.join("+"),l.onBeforeCompile=a=>{Object.assign(a.uniforms,{tGC:g,tGN:o,uRA:r.uRA,uRB:r.uRB,uRC:r.uRC,uRD:r.uRD,uTA:r.uTA,uTB:r.uTB,uRN:r.uRN,uVegTime:d.uVegTime}),a.vertexShader=`varying vec3 vL;
varying vec3 vBary;
varying vec3 vWP;
varying vec3 vWN;
varying float vShore;
`+a.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
      vL = vec3(0.0); vBary = vec3(1.0, 0.0, 0.0); vShore = 48.0;
      vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * normal);`),a.fragmentShader=m.replace(/\bNC\b/g,"2")+a.fragmentShader.replace("#include <color_fragment>","").replace("#include <map_fragment>",`
      vec2 wp = vWP.xz, gdx = dFdx(wp), gdy = dFdy(wp);
      bool gWantN = distance(cameraPosition, vWP) < 200.0;
      vec3 vcol = vec3(0.86, 0.83, 0.76);
      #if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
        vcol = vColor.rgb;
      #endif
      // the sheet's paint: grass lowers blue against green; brightness against the base tone = ruts, shade, damp
      float gr = clamp((0.916 - vcol.b / max(vcol.g, 0.01)) / 0.37, 0.0, 1.0);
      gr = smoothstep(0.15, 0.85, gr + (gF(wp * 0.35) - 0.5) * 0.5);
      float rel = clamp(vcol.g / mix(0.83, 0.62, gr), 0.45, 1.25);
      GS a = gRecipe(0, wp, gdx, gdy, gWantN); GS b = a;
      float wb = 0.0;
      if (gr > 0.01) { b = gRecipe(1, wp, gdx, gdy, gWantN); float ta = 1.0 - gr + a.h * 0.5, tb = gr + b.h * 0.5, mx = max(ta, tb) - 0.2; ta = max(ta - mx, 0.0); tb = max(tb - mx, 0.0); wb = tb / (ta + tb); }
      vec3 alb = gKeysGrade(mix(a.alb, b.alb, wb) * mix(0.9, 1.08, gF(wp * 0.05 + 2.0)) * rel, wp); // ground pass: same Keys grade as the terrain
      float tRough = mix(a.rough, b.rough, wb) * mix(0.8, 1.0, smoothstep(0.6, 0.9, rel));
      vec2 gTilt = mix(a.tilt, b.tilt, wb);
      diffuseColor.rgb *= alb * mix(1.0, mix(a.ao, b.ao, wb), 0.65);`).replace("#include <roughnessmap_fragment>","float roughnessFactor = clamp(tRough, 0.04, 1.0);").replace("#include <normal_fragment_maps>",`{
        vec3 Nw = normalize(vWN), Tw = normalize(vec3(1.0, 0.0, 0.0) - Nw * Nw.x), Bw = normalize(vec3(0.0, 0.0, 1.0) - Nw * Nw.z);
        normal = normalize((viewMatrix * vec4(normalize(Tw * gTilt.x + Bw * gTilt.y + Nw), 0.0)).xyz);
      }`)},l.userData.ground={keys:n,U:r},l}function R(e,i,n=["scrub","lawn","dirt"],r={}){if(!e||e.userData.recipeGround)return e;e.userData.recipeGround=n.join("+");const g=n.length,o=c(n),l={value:null},a={value:null};v(i).then(t=>{l.value=t.col,a.value=t.aux,e.needsUpdate=!0});const u=e.onBeforeCompile,s=e.customProgramCacheKey?e.customProgramCacheKey.bind(e):()=>"";e.map=null,e.normalMap=null,e.roughnessMap=null,e.aoMap=null,e.color.setRGB(1,1,1),e.roughness=1,e.metalness=0;const[p,b]=r.mix||[.45,.72];return e.onBeforeCompile=(t,x)=>{u&&u.call(e,t,x),Object.assign(t.uniforms,{tGC:l,tGN:a,uRA:o.uRA,uRB:o.uRB,uRC:o.uRC,uRD:o.uRD,uTA:o.uTA,uTB:o.uTB,uRN:o.uRN,uVegTime:d.uVegTime}),t.vertexShader=`varying vec3 vRgW;
varying vec3 vRgN;
`+t.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
  vRgW = (modelMatrix * vec4(transformed, 1.0)).xyz; vRgN = normalize(mat3(modelMatrix) * objectNormal);`),t.fragmentShader=m.replace(/\bNC\b/g,String(g)).replace("varying vec3 vL; varying vec3 vBary; varying vec3 vWP; varying vec3 vWN; varying float vShore;","varying vec3 vRgW; varying vec3 vRgN;")+t.fragmentShader.replace("#include <map_fragment>",`
      vec2 wp = vRgW.xz, gdx = dFdx(wp), gdy = dFdy(wp);
      bool gWantN = distance(cameraPosition, vRgW) < 220.0;
      GS a = gRecipe(0, wp, gdx, gdy, gWantN), b = gRecipe(1, wp, gdx, gdy, gWantN);
      float n = gF(wp * 0.021 + 3.0) * 0.7 + gN(wp * 0.11 - 1.0) * 0.3;
      float wb = smoothstep(${p.toFixed(3)}, ${b.toFixed(3)}, n + (b.h - a.h) * 0.25);
      vec3 alb = mix(a.alb, b.alb, wb); float tRough = mix(a.rough, b.rough, wb), tAo = mix(a.ao, b.ao, wb); vec2 gTilt = mix(a.tilt, b.tilt, wb); float th = mix(a.h, b.h, wb);
      ${g>2?"{ float nd = gF(wp * 0.043 + 9.0); float wd = smoothstep(0.66, 0.84, nd + (0.5 - th) * 0.3); if (wd > 0.0) { GS d = gRecipe(2, wp, gdx, gdy, gWantN); alb = mix(alb, d.alb, wd); tRough = mix(tRough, d.rough, wd); tAo = mix(tAo, d.ao, wd); gTilt = mix(gTilt, d.tilt, wd); } }":""}
      alb *= mix(0.86, 1.1, gF(wp * 0.0095)) * mix(0.94, 1.05, gN(wp * 0.0023 + 5.0)); alb = gKeysGrade(alb, wp);
      diffuseColor.rgb *= alb * mix(1.0, tAo, 0.65);`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
  roughnessFactor = clamp(tRough, 0.04, 1.0);`).replace("#include <normal_fragment_maps>",`{
        vec3 Nw = normalize(vRgN), Tw = normalize(vec3(1.0, 0.0, 0.0) - Nw * Nw.x), Bw = normalize(vec3(0.0, 0.0, 1.0) - Nw * Nw.z);
        normal = normalize((viewMatrix * vec4(normalize(Tw * gTilt.x + Bw * gTilt.y + Nw), 0.0)).xyz);
      }`)},e.customProgramCacheKey=()=>s()+"|recipe:"+n.join("+"),e.userData.pbr="recipe-ground",e.needsUpdate=!0,e}export{h as m,R as p};
