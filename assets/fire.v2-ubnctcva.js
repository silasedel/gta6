import{K as E,i as J,a1 as Y,A as ee}from"./index-Cm_mx7eP.js";const q=96,$=220,G=320,T=`
float fHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float fNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = fHash(i);
  float b = fHash(i + vec2(1.0, 0.0));
  float c = fHash(i + vec2(0.0, 1.0));
  float d = fHash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fFbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * fNoise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
`,te=`
attribute vec4 iPosSize;   // xyz position (base of a flame, center of smoke), w = width
attribute vec4 iParams;    // x height, y seed, z intensity / opacity, w mode or age
varying vec2 vUv;
varying vec4 vParams;
varying float vDist;
void main() {
  vUv = uv;
  vParams = iParams;
  vec3 right = normalize(vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]));
  vec3 up = BILLBOARD_UP;
  vec3 wp = iPosSize.xyz + right * position.x * iPosSize.w + up * position.y * iParams.x;
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,oe=`
uniform float uTime;
varying vec2 vUv;
varying vec4 vParams;
${T}
vec3 blackBody(float h) {
  vec3 c = mix(vec3(0.25, 0.015, 0.0), vec3(1.0, 0.22, 0.02), smoothstep(0.0, 0.35, h));
  c = mix(c, vec3(1.0, 0.55, 0.12), smoothstep(0.3, 0.6, h));
  c = mix(c, vec3(1.0, 0.86, 0.45), smoothstep(0.55, 0.85, h));
  c = mix(c, vec3(1.0, 0.97, 0.86), smoothstep(0.85, 1.0, h));
  return c;
}
void main() {
  float seed = vParams.y;
  float inten = vParams.z;
  float mode = vParams.w;
  float t = uTime;
  float heat;
  if (mode < 0.5) {
    // flame sheet: base at uv.y = 0, tongues tear off toward the top
    vec2 p = vec2(vUv.x - 0.5, vUv.y);
    float sway = (fNoise(vec2(seed * 7.0, t * 0.9)) - 0.5) * 0.4 * p.y;
    p.x += sway;
    float turb = fFbm(vec2(p.x * 2.6 + seed * 11.0, p.y * 2.0 - t * 2.4));
    float fine = fFbm(vec2(p.x * 6.5 - seed * 5.0, p.y * 5.0 - t * 4.4));
    // the body narrows upward and tears into separate tongues (horizontal warp grows with height)
    float width = mix(0.5, 0.16, pow(p.y, 0.9));
    float warp = (turb - 0.5) * 0.65 * p.y + (fine - 0.5) * 0.18;
    float env = 1.0 - smoothstep(width * 0.35, width, abs(p.x + warp));
    env *= smoothstep(0.0, 0.1, p.y);
    float tear = smoothstep(0.25, 0.75, fine + 0.35 - p.y * 0.55);
    heat = env * (0.5 + 0.6 * turb) * mix(1.0, tear, smoothstep(0.2, 0.7, p.y)) - p.y * 0.42;
    heat = clamp(heat * 1.35, 0.0, 1.0);
  } else {
    // fireball: a billowing radial mass that burns down as it ages (age in mode - 1, 0..1)
    float age = clamp(mode - 1.0, 0.0, 1.0);
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    float ang = atan(p.y, p.x);
    float bill = fFbm(vec2(ang * 2.4 + seed * 9.0, r * 3.0 - t * 1.5 - age * 3.0));
    float edge = 0.62 + 0.42 * bill;
    float body = 1.0 - smoothstep(edge * 0.45, edge, r);
    // billowing lobes: a mottled mass of hot and cooler pockets, not a smooth disc
    float core = fFbm(p * 6.0 + vec2(seed * 3.0, -t * 2.0 - age * 4.0));
    float lobes = fFbm(p * 11.0 + vec2(-seed * 4.0, -t * 3.0));
    heat = body * (0.3 + 0.55 * core + 0.3 * lobes) * (1.0 - age * 0.95) - age * 0.5 * (1.0 - core);
    heat = clamp(heat * 1.1, 0.0, 1.0);
  }
  float a = smoothstep(0.03, 0.3, heat) * inten;
  if (a < 0.003) discard;
  // mostly orange and red; only the hottest core goes yellow-white and bright enough to bloom
  vec3 col = blackBody(heat * 0.85) * (0.7 + 1.2 * heat * heat * heat);
  // premultiplied, partly occluding: the flame adds light but also hides some of what is behind it, so it
  // stays orange against a bright sky instead of washing out to white
  gl_FragColor = vec4(col * a, a * (mode < 0.5 ? 0.45 : 0.7));
}
`,ae=`
uniform float uTime;
uniform vec3 uSmokeLight;
varying vec2 vUv;
varying vec4 vParams;
${T}
void main() {
  float seed = vParams.y;
  float op = vParams.z;
  float age = vParams.w;
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;
  float n = fFbm(p * 2.6 + vec2(seed * 13.0, seed * 7.0 - uTime * 0.12));
  float n2 = fFbm(p * 6.0 + vec2(-seed * 5.0, uTime * 0.2));
  float shape = (1.0 - smoothstep(0.35 + 0.35 * n, 1.0, r + (n2 - 0.5) * 0.35)) * (1.0 - smoothstep(0.8, 0.98, r));
  float a = shape * op * (0.55 + 0.6 * n);
  if (a < 0.004) discard;
  // soot color, lit by the day light; the youngest puffs glow from the fire below them
  vec3 soot = mix(vec3(0.045, 0.04, 0.038), vec3(0.16, 0.15, 0.14), n2) * uSmokeLight;
  float glow = (1.0 - smoothstep(0.0, 0.25, age)) * (1.0 - smoothstep(-0.4, 0.3, p.y));
  vec3 col = soot + vec3(1.0, 0.38, 0.08) * glow * 0.3;
  gl_FragColor = vec4(col, a);
}
`,ie=`
attribute float aSize;
attribute float aGlow;
uniform float uScale;
varying float vGlow;
void main() {
  vGlow = aGlow;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = max(1.0, aSize * uScale / max(0.5, -mv.z));
}
`,ne=`
varying float vGlow;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0 || vGlow < 0.01) discard;
  float a = (1.0 - r * r) * vGlow;
  vec3 c = mix(vec3(1.0, 0.3, 0.04), vec3(1.0, 0.8, 0.4), vGlow) * 3.0;
  gl_FragColor = vec4(c * a, a);
}
`;function Q(a,g,M,P,W,w){const b=new a.PlaneGeometry(1,1);w==="flame"&&b.translate(0,.5,0);const f=new a.InstancedBufferGeometry;f.index=b.index,f.setAttribute("position",b.getAttribute("position")),f.setAttribute("uv",b.getAttribute("uv"));const B=new a.InstancedBufferAttribute(new Float32Array(g*4),4),U=new a.InstancedBufferAttribute(new Float32Array(g*4),4);B.setUsage(a.DynamicDrawUsage),U.setUsage(a.DynamicDrawUsage),f.setAttribute("iPosSize",B),f.setAttribute("iParams",U),f.instanceCount=0,f.boundingSphere=new a.Sphere(new a.Vector3,1e7);const x=new a.ShaderMaterial({uniforms:W,vertexShader:te.replace("BILLBOARD_UP",w==="flame"?"vec3(0.0, 1.0, 0.0)":"normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]))"),fragmentShader:M,transparent:!0,depthWrite:!1,blending:P,side:a.DoubleSide});P===a.CustomBlending&&(x.blendSrc=a.OneFactor,x.blendDst=a.OneMinusSrcAlphaFactor,x.blendSrcAlpha=a.ZeroFactor,x.blendDstAlpha=a.OneFactor);const C=new a.Mesh(f,x);return C.frustumCulled=!1,{mesh:C,geo:f,posSize:B,params:U}}function se(a,g,M={}){const P={value:0},W={value:new a.Vector3(1,1,1)},w=Q(a,q,oe,a.CustomBlending,{uTime:P},"flame");w.mesh.name="fx-fire-flames",w.mesh.renderOrder=6;const b=Q(a,$,ae,a.NormalBlending,{uTime:P,uSmokeLight:W},"smoke");b.mesh.name="fx-fire-smoke",b.mesh.renderOrder=5;const f=new Float32Array(G*3),B=new Float32Array(G),U=new Float32Array(G),x=new Float32Array(G*3),C=new Float32Array(G),F=new Float32Array(G),_=new a.BufferGeometry;_.setAttribute("position",new a.BufferAttribute(f,3).setUsage(a.DynamicDrawUsage)),_.setAttribute("aSize",new a.BufferAttribute(B,1).setUsage(a.DynamicDrawUsage)),_.setAttribute("aGlow",new a.BufferAttribute(U,1).setUsage(a.DynamicDrawUsage)),_.boundingSphere=new a.Sphere(new a.Vector3,1e7);const X={value:600},j=new a.ShaderMaterial({uniforms:{uScale:X},vertexShader:ie,fragmentShader:ne,transparent:!0,depthWrite:!1,blending:a.CustomBlending,blendSrc:a.OneFactor,blendDst:a.OneFactor}),L=new a.Points(_,j);L.name="fx-fire-embers",L.frustumCulled=!1,L.renderOrder=7,g.add(w.mesh,b.mesh,L);const k=new a.PointLight(16742954,0,22,1.6);k.castShadow=!1,k.name="fx-fire-light",g.add(k);const n=new Map,m=[];for(let i=0;i<$;i++)m.push({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,s0:1,s1:3,life:0,max:1,op:.5,seed:Math.random()});let l=0,v=0;const h=[];for(let i=0;i<8;i++)h.push({alive:!1,x:0,y:0,z:0,r:1,t:0,dur:1,seed:Math.random()});let s=0;const t=(i,d)=>i+Math.random()*(d-i),r={x:0,z:0};function S(){var d;const i=(d=M.wind)==null?void 0:d.call(M);i&&i.dir?(r.x=(i.dir.x||0)*(i.speed||0),r.z=(i.dir.y??i.dir.z??0)*(i.speed||0)):(r.x=.4,r.z=.1)}function z(i,d,y,c,p,D,I){const e=m[l];l=(l+1)%$,e.alive=!0,e.x=i,e.y=d,e.z=y,e.vx=t(-.25,.25),e.vy=I,e.vz=t(-.25,.25),e.s0=c,e.s1=c*t(3,4.5),e.life=0,e.max=D,e.op=p,e.seed=Math.random()}function N(i,d,y,c){const p=v;v=(v+1)%G,f[p*3]=i,f[p*3+1]=d,f[p*3+2]=y,x[p*3]=t(-.6,.6)*c,x[p*3+1]=t(1.2,3.4)*c,x[p*3+2]=t(-.6,.6)*c,C[p]=0,F[p]=t(.8,2.4),B[p]=t(.03,.07)}function K(i,d,y=1){let c=n.get(i);if(!c){c={x:d.x,y:d.y,z:d.z,size:y,k:0,last:s,smokeAcc:0,emberAcc:0,tongues:[]};const p=4+Math.round(y*3);for(let D=0;D<p;D++){const I=D<2;c.tongues.push({ox:t(-.55,.55)*y,oz:t(-.55,.55)*y,w:(I?t(1.2,1.6):t(.7,1.2))*y,h:(I?t(2,2.7):t(1.1,2))*y,seed:Math.random(),phase:Math.random()*6.28})}n.set(i,c)}return c.x=d.x,c.y=d.y,c.z=d.z,c.size=y,c.last=s,c}function Z(i,d=7.5){const y=Math.max(.4,d/7.5),c=h.find(p=>!p.alive)||h[0];c.alive=!0,c.x=i.x,c.y=i.y+1.2*y,c.z=i.z,c.r=d*.75,c.t=0,c.dur=1.1+.3*y,c.seed=Math.random();for(let p=0;p<70*y;p++)N(i.x+t(-1,1),i.y+t(.3,2),i.z+t(-1,1),3.2*y);for(let p=0;p<16*y;p++)z(i.x+t(-2,2)*y,i.y+t(1,4)*y,i.z+t(-2,2)*y,t(1.6,2.6)*y,.8,t(3.5,6.5),t(.8,2.2))}const u={d:1e9,x:0,y:0,z:0,s:0};function R(i,d){var D,I;if(i=Math.min(i||.016,.1),s+=i,P.value=s,S(),d){const e=((D=M.viewportHeight)==null?void 0:D.call(M))||1080;X.value=e/(2*Math.tan(d.fov*Math.PI/180/2))}const y=((I=M.dayLight)==null?void 0:I.call(M))??1;W.value.setScalar(.35+.65*y);let c=0;u.d=1e9,u.s=0;for(const[e,o]of n){const O=s-o.last<.25?1:0;if(o.k+=(O-o.k)*Math.min(1,i*(O?2.5:1.2)),!O&&o.k<.02){n.delete(e);continue}const V=.85+.15*Math.sin(s*17+o.x)*Math.sin(s*23+o.z);for(const A of o.tongues){if(c>=q)break;const H=.82+.18*Math.sin(s*(3.1+A.seed*2)+A.phase);w.posSize.setXYZW(c,o.x+A.ox+r.x*.03,o.y,o.z+A.oz+r.z*.03,A.w*(.85+.15*o.k)),w.params.setXYZW(c,A.h*H*o.k,A.seed,.95*o.k*V,0),c++}for(o.smokeAcc+=i*(5+6*o.size)*o.k;o.smokeAcc>=1;)o.smokeAcc-=1,z(o.x+t(-.4,.4)*o.size,o.y+1.1*o.size+t(0,.6),o.z+t(-.4,.4)*o.size,.8*o.size,.7,t(3.5,6.5),t(1.1,2));for(o.emberAcc+=i*9*o.size*o.k;o.emberAcc>=1;)o.emberAcc-=1,N(o.x+t(-.4,.4)*o.size,o.y+t(.2,1)*o.size,o.z+t(-.4,.4)*o.size,1);if(d){const A=Math.hypot(o.x-d.position.x,o.z-d.position.z);A<u.d&&(u.d=A,u.x=o.x,u.y=o.y+1.2*o.size,u.z=o.z,u.s=o.k*o.size)}}for(const e of h){if(!e.alive||c>=q)continue;e.t+=i;const o=e.t/e.dur;if(o>=1){e.alive=!1;continue}const O=1-Math.pow(1-Math.min(1,o*2.2),3),V=e.r*(.35+.8*O);if(w.posSize.setXYZW(c,e.x,e.y-V*.5+o*2.5,e.z,V*2),w.params.setXYZW(c,V*2,e.seed,1,1+o),c++,d){const A=Math.hypot(e.x-d.position.x,e.z-d.position.z);A<u.d+30&&(u.d=A,u.x=e.x,u.y=e.y,u.z=e.z,u.s=6*(1-o))}}w.geo.instanceCount=c,w.posSize.needsUpdate=!0,w.params.needsUpdate=!0;let p=0;for(const e of m){if(!e.alive)continue;e.life+=i;const o=e.life/e.max;if(o>=1){e.alive=!1;continue}e.vy*=1-i*.25,e.x+=(e.vx+r.x*.8*o)*i,e.y+=e.vy*i,e.z+=(e.vz+r.z*.8*o)*i;const O=e.s0+(e.s1-e.s0)*Math.sqrt(o);b.posSize.setXYZW(p,e.x,e.y,e.z,O),b.params.setXYZW(p,O,e.seed,e.op*Math.min(1,o*6)*(1-o)*(1-o),o),p++}b.geo.instanceCount=p,b.posSize.needsUpdate=!0,b.params.needsUpdate=!0;for(let e=0;e<G;e++){if(F[e]<=0)continue;C[e]+=i;const o=C[e]/F[e];if(o>=1){F[e]=0,U[e]=0;continue}x[e*3]+=(r.x*.6-x[e*3])*i*.8+(Math.random()-.5)*i*3,x[e*3+2]+=(r.z*.6-x[e*3+2])*i*.8+(Math.random()-.5)*i*3,x[e*3+1]-=i*.6,f[e*3]+=x[e*3]*i,f[e*3+1]+=x[e*3+1]*i,f[e*3+2]+=x[e*3+2]*i,U[e]=(1-o)*(.6+.4*Math.sin(s*30+e))}_.attributes.position.needsUpdate=!0,_.attributes.aGlow.needsUpdate=!0,_.attributes.aSize.needsUpdate=!0,u.s>.01&&u.d<120?(k.position.set(u.x,u.y,u.z),k.intensity=(9+4*Math.sin(s*19)*Math.sin(s*31+1.3))*Math.min(2.5,u.s)):k.intensity=0}return{burn:K,explode:Z,update:R,light:k,get count(){return n.size},meshes:[w.mesh,b.mesh,L]}}const fe=160,re=new Y(0,1,0);function ce(a){const g=Math.sin(a*127.1+311.7)*43758.5453;return g-Math.floor(g)}async function he(a){var k;const g=se(E,a.scene,{wind:()=>a.wind,dayLight:()=>{var n;return((n=a.env)==null?void 0:n.dayFactor)??1},viewportHeight:()=>{var n,m;return((m=(n=a.renderer)==null?void 0:n.domElement)==null?void 0:m.height)||1080}});a.fireFx={system:g,burn:(n,m,l)=>g.burn(n,m,l),explode:(n,m)=>g.explode(n,m)};const M=new J(16742938);let P=0;function W(){var n,m,l;for(const v of a.scene.children){if(!v.isPoints||!v.visible)continue;const h=(l=(m=(n=v.material)==null?void 0:n.uniforms)==null?void 0:m.color)==null?void 0:l.value;h&&h.isColor&&h.equals(M)&&v.material.blending===ee&&(v.visible=!1)}}const w=new Y,b=new Y,f=(n,m)=>n+Math.random()*(m-n);let B=!1;function U(){var l,v;const n=(v=(l=a.gameplay)==null?void 0:l.G)==null?void 0:v.gfx;if(!n||B)return;B=!0;const m=(h,s,t)=>{var r,S;try{const z=(S=(r=a.city)==null?void 0:r.groundHeightAt)==null?void 0:S.call(r,h,s);return Number.isFinite(z)?z:t-1}catch{return t-1}};n.explosion=function(s,t=7.5,r={}){var N,K,Z;const S=t/7.5,z=m(s.x,s.z,s.y+1);g.explode(s,t);for(let u=0;u<30*S;u++)n.emit(1,s,{vx:f(-16,16),vy:f(2,18),vz:f(-16,16),life:f(.4,1.1),s0:.07,s1:.015,color:16756816,a:1,drag:.8,grav:9.81,tex:0,floor:z});for(let u=0;u<16;u++)n.emit(0,s,{vx:f(-7,7),vy:f(.2,1.2),vz:f(-7,7),life:f(.8,1.6),s0:.5,s1:2.4,color:10129020,a:.38,drag:2.2,grav:0,tex:1});for(let u=0;u<34*S;u++)w.set(f(-9,9),f(3,13),f(-9,9)),n.chip(b.set(s.x+f(-.5,.5),s.y+.2,s.z+f(-.5,.5)),w,u%3?4867648:9077880,f(.03,.08),{floor:z,life:f(7,12)});!r.noScorch&&s.y-z<1.5&&n.decal("scorch",w.set(s.x,z,s.z),re,t*.75,110),n.shockwave(s,t),s.y<(((N=a.city)==null?void 0:N.seaLevel)??-.12)+.6&&((K=a.surfaceAt)==null?void 0:K.call(a,s.x,s.z))==="water"&&((Z=n.waterSplash)==null||Z.call(n,s,3.5)),x.push({key:"x"+C++,x:s.x,y:z,z:s.z,size:.9*Math.min(1.6,S),t:f(5,9)})},n.flame=function(s,t=1){const r="f"+Math.round(s.x*2)+","+Math.round(s.z*2);g.burn(r,s,Math.max(.12,t)*1.4)}}const x=[];let C=0;(k=a.on)==null||k.call(a,"explosion",n=>{var v,h,s;const m=n==null?void 0:n.position;if(!m)return;const l=(n.radius||7.5)*1.5;for(const t of((v=a.vehicles)==null?void 0:v.list)||[])try{const r=(s=(h=t.body)==null?void 0:h.translation)==null?void 0:s.call(h);r&&Math.hypot(r.x-m.x,r.z-m.z)<l&&(t._psBurn=!0)}catch{}});const F=new Y;let _=0;const X=new J(1380622);function j(n,m){if(n._psChar||(n._psChar=[],n.mesh.traverse(l=>{if(!l.isMesh||!l.material||Array.isArray(l.material))return;const v=l.material,h=v.clone();Object.prototype.hasOwnProperty.call(v,"onBeforeCompile")&&(h.onBeforeCompile=v.onBeforeCompile),Object.prototype.hasOwnProperty.call(v,"customProgramCacheKey")&&(h.customProgramCacheKey=v.customProgramCacheKey),v.userData&&(h.userData={...v.userData}),l.material=h,n._psChar.push({m:h,color:h.color?h.color.clone():null,rough:h.roughness,metal:h.metalness,emissive:h.emissive?h.emissive.clone():null})})),!(Math.abs((n._psCharK||0)-m)<.02)){n._psCharK=m;for(const l of n._psChar)l.color&&l.m.color.copy(l.color).lerp(X,.85*m),l.rough!==void 0&&(l.m.roughness=l.rough+(.95-l.rough)*m),l.metal!==void 0&&(l.m.metalness=l.metal*(1-.8*m)),l.emissive&&l.m.emissive.copy(l.emissive).multiplyScalar(1-m)}}function L(n){var v,h,s;if(P-=n,P<=0){P=2;try{W()}catch{}U()}const m=a.camera,l=((v=a.vehicles)==null?void 0:v.list)||[];for(const t of l)if(!(!t||!t.disabled)&&(t._psId===void 0&&(t._psId=_++),t._psBurn===void 0&&(t._psBurn=!!(t.playerDriven||t.wasPlayerDriven)||ce(t._psId)<.12),!(!t._psBurn||!(t.burnT>0)||!t.mesh||!t.spec)))try{const r=(s=(h=t.body)==null?void 0:h.translation)==null?void 0:s.call(h);if(r&&m&&Math.hypot(r.x-m.position.x,r.z-m.position.z)>220)continue;F.set(0,t.spec.belt-(t.groundOff||0)-.15,t.spec.L/2-1),t.mesh.localToWorld(F);const S=25-t.burnT;j(t,Math.min(1,S/12));const z=.7+.6*Math.min(1,S/4)-.35*Math.max(0,(S-16)/9);g.burn("v"+t._psId,F,z)}catch{}for(let t=x.length-1;t>=0;t--){const r=x[t];if(r.t-=n,r.t<=0){x.splice(t,1);continue}F.set(r.x,r.y,r.z),g.burn(r.key,F,r.size*Math.min(1,r.t/3))}g.update(n,m)}a.updaters.push(L)}export{he as initV2,fe as order};
