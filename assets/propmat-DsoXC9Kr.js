import{u as w,bW as z,bU as _,a1 as k,i as S,B as N,F as m,bX as x}from"./index-Cm_mx7eP.js";const P={paint:0,galv:1,rust:2,wood:3,concrete:4,plaster:5,rustPaint:6,planks:7,iron:8,patina:9,plastic:10,steel:11,rubber:12,glass:13,bark:14,creosote:15},d=[{key:"paint",cell:0,neutral:1,level:.82,metal:0,tile:1.6},{key:"galv",cell:1,neutral:.8,level:.7,metal:.9,tile:1.4},{key:"rust",cell:2,neutral:0,metal:.25,tile:1.4},{key:"wood",cell:3,neutral:0,level:.55,metal:0,tile:1.2},{key:"concrete",cell:4,neutral:.7,level:.72,metal:0,tile:2},{key:"plaster",cell:5,neutral:1,level:.82,metal:0,tile:2},{key:"rustPaint",name:"rusty_painted_metal",neutral:.55,level:.7,metal:.15,tile:1.8},{key:"planks",name:"weathered_planks",neutral:.2,level:.5,metal:0,tile:1.8},{key:"iron",name:"metal_plate",neutral:.9,level:.3,metal:.85,tile:1},{key:"patina",name:"green_metal_rust",neutral:.75,level:.75,metal:.2,tile:1.6},{key:"plastic",synth:x({luma:205,grain:8,rough:120,bump:5,seed:11}),metal:0,tile:1},{key:"steel",cell:1,neutral:1,level:.85,metal:1,rough:.55,tile:.9},{key:"rubber",synth:x({luma:46,grain:14,rough:235,bump:16,seed:23}),metal:0,tile:.6},{key:"glass",synth:x({luma:210,grain:2,rough:14,bump:1,seed:37}),metal:.7,tile:1},{key:"bark",name:"palm_bark",neutral:.1,level:.42,metal:0,tile:1.3},{key:"creosote",name:"bark_willow",neutral:.5,level:.2,metal:0,tile:1.5}];let b=null;function h(t){return b||(b=(async()=>{const a="./assets/city/tex/",i=await z([a+"props_color.jpg",a+"props_normal.jpg",a+"props_rough.jpg"],3,2),l=d.map(r=>({...r,name:r.name||r.key,synth:r.synth||(r.cell!==void 0?i(r.cell):void 0)})),s=await _(t,l,{size:512});return s.tiles=d.map(r=>1/r.tile),s})()),b}function C(t,a,i={},l={}){const s=i.uEmis||(i.uEmis={value:0}),r=l.surf!==void 0;t.userData.pbr="prop-array:"+(r?Object.keys(P).find(e=>P[e]===l.surf):"per-vertex");const n=t.onBeforeCompile;return r||(t.vertexColors=!0),t.onBeforeCompile=(e,u)=>{n&&n(e,u),e.uniforms.uPropCol={value:a.colR},e.uniforms.uPropNrm={value:a.nrmAO},e.uniforms.uPropEmis=s,e.uniforms.uPropTile={value:a.tiles},r&&(e.uniforms.uPropSurf={value:new k(l.surf,l.emis||0,1)}),e.vertexShader=(r?`uniform vec3 uPropSurf;
#define aSurf uPropSurf
`:`attribute vec3 aSurf;
`)+`flat out vec2 vSurf;
out vec3 vPrP;
out vec3 vPrN;
`+e.vertexShader.replace("#include <color_vertex>",r?"#include <color_vertex>":`#include <color_vertex>
      #ifdef USE_INSTANCING_COLOR
        vColor.xyz = color.xyz * mix(vec3(1.0), instanceColor.xyz, aSurf.z);
      #endif`).replace("#include <begin_vertex>",`#include <begin_vertex>
      vSurf = aSurf.xy;
      { vec4 pw = vec4(transformed, 1.0); vec3 pn = objectNormal;
      #ifdef USE_INSTANCING
        pw = instanceMatrix * pw; pn = mat3(instanceMatrix) * pn;
      #endif
        pw = modelMatrix * pw; vPrP = pw.xyz; vPrN = normalize(mat3(modelMatrix) * pn); }`),e.fragmentShader=`uniform sampler2DArray uPropCol;
uniform sampler2DArray uPropNrm;
uniform float uPropEmis;
uniform float uPropTile[${a.count}];
flat in vec2 vSurf;
in vec3 vPrP;
in vec3 vPrN;
vec4 gPrN; float gPrR; float gPrE;
`+e.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
        { float L = floor(vSurf.x + 0.5); float ts = uPropTile[int(L)];
          vec3 bw = pow(abs(vPrN), vec3(5.0)); bw /= (bw.x + bw.y + bw.z + 1e-4);
          vec2 ux = vPrP.zy * ts, uy = vPrP.xz * ts, uz = vPrP.xy * ts;
          vec4 c = texture(uPropCol, vec3(ux, L)) * bw.x + texture(uPropCol, vec3(uy, L)) * bw.y + texture(uPropCol, vec3(uz, L)) * bw.z;
          vec4 nx = texture(uPropNrm, vec3(ux, L)), ny = texture(uPropNrm, vec3(uy, L)), nz = texture(uPropNrm, vec3(uz, L));
          gPrN = nx * bw.x + ny * bw.y + nz * bw.z; gPrR = c.a;
          // whiteout-blended world normal from the three projections
          vec3 wn = normalize(vPrN);
          vec3 tX = vec3(nx.xy * 2.0 - 1.0, 1.0), tY = vec3(ny.xy * 2.0 - 1.0, 1.0), tZ = vec3(nz.xy * 2.0 - 1.0, 1.0);
          tX = vec3(tX.xy + wn.zy, abs(tX.z) * wn.x); tY = vec3(tY.xy + wn.xz, abs(tY.z) * wn.y); tZ = vec3(tZ.xy + wn.xy, abs(tZ.z) * wn.z);
          gPrN.xyz = normalize(tX.zyx * bw.x + tY.xzy * bw.y + tZ.xyz * bw.z);
          // large-scale grime so identical props still differ a little from place to place
          float gr = fract(sin(dot(floor(vPrP.xz * 0.35), vec2(12.9898, 78.233))) * 43758.5453);
          diffuseColor.rgb *= c.rgb * (0.9 + 0.2 * gr);
          gPrE = vSurf.y; }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
  roughnessFactor = clamp(gPrR, 0.04, 1.0);`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
  metalnessFactor = gPrN.a;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
  normal = normalize((viewMatrix * vec4(gPrN.xyz, 0.0)).xyz) * faceDirection;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += diffuseColor.rgb * gPrE * uPropEmis * 3.0;`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
  reflectedLight.indirectDiffuse *= mix(1.0, gPrN.b, 0.85);`)},t.customProgramCacheKey=()=>"ps-prop-"+a.count+(r?"-u"+l.surf+(l.emis?"e":""):"")+(n?"-p"+(t.userData.pbrKey||t.uuid):""),t.needsUpdate=!0,t}async function E(t,a={},i={}){const l=await h(t);return C(new w({vertexColors:!0,...i}),l,a)}const c=new S;function L(t){const a=[],i=[],l=[],s=[],r=[];for(const e of t){let u=e.g.index?e.g.toNonIndexed():e.g.clone();e.m&&u.applyMatrix4(e.m);const p=u.attributes.position.array,y=u.attributes.normal.array,f=u.attributes.uv?u.attributes.uv.array:null,v=u.attributes.color?u.attributes.color.array:null;c.set(e.color??16777215);for(let o=0,g=0;o<p.length;o+=3,g+=2)a.push(p[o],p[o+1],p[o+2]),i.push(y[o],y[o+1],y[o+2]),l.push(f?f[g]:0,f?f[g+1]:0),v?s.push(v[o]*c.r,v[o+1]*c.g,v[o+2]*c.b):s.push(c.r,c.g,c.b),r.push(e.surf??0,e.emis??0,e.tint??0);u.dispose()}const n=new N;return n.setAttribute("position",new m(a,3)),n.setAttribute("normal",new m(i,3)),n.setAttribute("uv",new m(l,2)),n.setAttribute("color",new m(s,3)),n.setAttribute("aSurf",new m(r,3)),n.computeBoundingSphere(),n.computeBoundingBox(),n}export{P as S,E as c,h as l,L as m,C as p};
