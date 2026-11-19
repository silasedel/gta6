import{bU as $,u as J,v as Q,V as X,a1 as Z,$ as S,at as ee,au as R,i as te}from"./index-Cm_mx7eP.js";const E=[{key:"stucco",name:"user_plaster1",neutral:1,level:.86,tile:1.8},{key:"stuccoRough",name:"user_plaster2",neutral:.92,level:.8,tile:1.4},{key:"plaster",name:"painted_plaster_wall",neutral:1,level:.84,tile:2},{key:"plasterWorn",name:"worn_plaster_wall",neutral:.8,level:.74,tile:2.6},{key:"paintPeel",name:"peeling_painted_wall",neutral:.75,level:.78,tile:3.2},{key:"concrete",name:"concrete_wall_008",neutral:.9,level:.74,tile:3.2},{key:"precast",name:"concrete_panels",neutral:.9,level:.76,tile:4.2},{key:"brickPaint",name:"painted_brick",neutral:1,level:.82,tile:2.2},{key:"brick",name:"user_brick2",neutral:.15,level:.46,tile:.95},{key:"coral",name:"coral_stone_wall",neutral:.35,level:.7,tile:2.6},{key:"tile",name:"square_tiled_wall",neutral:1,level:.8,tile:1.6},{key:"corrugated",name:"corrugated_iron",neutral:1,level:.8,tile:2.4,metal:.55},{key:"siding",name:"white_planks_clean",neutral:1,level:.84,tile:2.2},{key:"cmu",name:"concrete_block_wall",neutral:.9,level:.7,tile:2.4},{key:"cladding",name:"exterior_wall_cladding",neutral:1,level:.8,tile:3,metal:.35},{key:"marble",name:"marble_01",neutral:.2,level:.8,tile:3,rough:.6},{key:"granite",name:"granite_tile",neutral:.3,level:.34,tile:2.4,rough:.6},{key:"shutter",name:"painted_metal_shutter",neutral:1,level:.78,tile:2.4,metal:.4},{key:"roofGravel",name:"tarred_gravel",neutral:.3,level:.42,tile:3},{key:"roofTile",name:"clay_roof_tiles_02",neutral:0,level:.5,tile:2.6},{key:"roofMetal",name:"corrugated_iron_02",neutral:1,level:.74,tile:3,metal:.6},{key:"roofConcrete",name:"gravel_concrete",neutral:.8,level:.6,tile:4},{key:"roofCoat",name:"painted_concrete",neutral:1,level:.84,tile:4},{key:"facadeTile",name:"rectangular_facade_tiles",neutral:1,level:.8,tile:2,rough:.7}],ae=typeof location<"u"&&/[?&]artgeo=0\b/.test(location.search),ne=Object.fromEntries(E.map((n,t)=>[n.key,t])),A={punched:0,ribbon:1,curtain:2,arched:3,porthole:4,blank:5,storefront:6,garage:8,roller:9},re={office:0,residential:1,hotel:2,retail:3,industrial:4,garage:5,lobby:6},ce={boarded:131072,bars:262144,awning:65536,pilaster:1,spandrel:2,belt:4,stripes:8,cross:16,vsplit:32,jalousie:64,shutters:128,ac:256,darkFrame:512,fins:1024,surround:2048,sill:4096,grime:8192,awningWin:32768},pe={clear:0,blue:1,green:2,bronze:3,gray:4,silver:5,teal:6,dark:7};let W=null;function fe(n){return W||(W=$(n,E,{size:1024}).then(t=>(t.tiles=E.map(a=>1/a.tile),t))),W}const le=[0,3,3.3,0,0,0,0,A.blank,0,0,0,0,1,1,1,0];class me extends S{constructor(){super(),this.fx=[],this.s=le.slice()}blank(t,a=0,l=0){const e=this.s;return e[0]=t,e[1]=3,e[2]=3.3,e[3]=l,e[4]=e[5]=e[6]=0,e[7]=A.blank,e[8]=a,e[9]=e[10]=e[11]=0,e[12]=e[13]=e[14]=1,e[15]=0,this}vert(t,a,l,e,F,x,o,i,c){super.vert(t,a,l,e,F,x,o,i,c);const s=this.s;this.fx.push(s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8],s[9],s[10],s[11],s[12],s[13],s[14],s[15])}attach(t){const a=this.p.length/3,l=new Float32Array(this.fx.length?this.fx:a*16),e=new ee(l,16);return t.setAttribute("aFa",new R(e,4,0)),t.setAttribute("aFb",new R(e,4,4)),t.setAttribute("aFc",new R(e,4,8)),t.setAttribute("aFd",new R(e,4,12)),t}build(t,a={}){const l=super.build(t,a);return this.attach(l.geometry),l}}const K=new te;function ve(n,t,a,l,e,F=0,x=null){const o=t.length;if(o<3||l-a<.05)return;const i=n.s,c=[];for(let r=0;r<o;r++){const p=t[r],f=t[(r+1)%o],z=f[0]-p[0],L=f[1]-p[1],h=Math.hypot(z,L);c.push({p,q:f,L:h,tx:h>1e-6?z/h:1,tz:h>1e-6?L/h:0})}const s=r=>{const p=c[(r-1+o)%o],f=c[r];return p.tx*f.tx+p.tz*f.tz<.914};let M=0;for(let r=0;r<o;r++)if(s(r)){M=r;break}const H=Math.max(1,Math.round((l-a)/e.floorH)),Y=(l-a)/H,k=e.tint.isColor?e.tint:K.set(e.tint);i[0]=e.layer,i[3]=e.seed,i[8]=e.groundY??0,i[9]=e.profile??0,i[10]=e.glass??0,i[11]=e.reflect??.2,i[12]=e.accent.r,i[13]=e.accent.g,i[14]=e.accent.b,i[15]=e.bits||0;let N=0,B=0;for(;N<o;){let r=N,p=0;const f=[];do{const d=c[(M+r)%o];f.push(d),p+=d.L,r++}while(r<o&&!s((M+r)%o));const z=e.type===A.curtain||e.type===A.ribbon?.9:Math.max(1.5,e.bayW*.62),L=p<z||e.type===A.blank,h=L?1:Math.max(1,Math.round(p/e.bayW)),U=p/h;i[1]=U,i[2]=Y,i[4]=L?0:e.winW,i[5]=e.winH,i[6]=e.sill,i[7]=L?A.blank:e.type;const I=B*41+3,G=F,T=F+H;let C=0;for(let d=0;d<f.length;d++){const u=f[d];if(u.L<1e-4)continue;const O=I+h*(C/p),V=I+h*((C+u.L)/p);C+=u.L;const q=d>0?f[d-1]:u,D=d<f.length-1?f[d+1]:u;let y=-(u.tz+q.tz),g=u.tx+q.tx,P=Math.hypot(y,g)||1;y/=P,g/=P;let b=-(u.tz+D.tz),w=u.tx+D.tx,j=Math.hypot(b,w)||1;b/=j,w/=j;const m=u.p,v=u.q;if(n.vert(m[0],a,m[1],y,0,g,O,G,k),n.vert(v[0],a,v[1],b,0,w,V,G,k),n.vert(v[0],l,v[1],b,0,w,V,T,k),n.vert(m[0],a,m[1],y,0,g,O,G,k),n.vert(v[0],l,v[1],b,0,w,V,T,k),n.vert(m[0],l,m[1],y,0,g,O,T,k),x){const _=K.set(16777215);x.vert(m[0],a,m[1],y,0,g,0,0,_),x.vert(v[0],a,v[1],b,0,w,0,0,_),x.vert(v[0],l,v[1],b,0,w,0,0,_),x.vert(m[0],a,m[1],y,0,g,0,0,_),x.vert(v[0],l,v[1],b,0,w,0,0,_),x.vert(m[0],l,m[1],y,0,g,0,0,_)}}N=r,B++}}const ie=[[.5,.57,.58],[.27,.37,.47],[.29,.42,.39],[.44,.37,.28],[.31,.34,.37],[.66,.71,.73],[.22,.4,.42],[.09,.1,.11]],oe=`
uniform sampler2DArray uFCol; uniform sampler2DArray uFNrm; uniform sampler2D uFRooms;
uniform vec4 uFGrid; uniform vec2 uFRoomKind[8]; uniform float uFTile[NUM_FLAYERS]; uniform vec3 uFGlass[8];
uniform float uFLit[8]; uniform float uFAwn; uniform float uFNight; uniform float uFDay; uniform float uFTime; uniform float uFGlow;
flat in vec4 vFa; flat in vec4 vFb; flat in vec4 vFc; flat in vec4 vFd;
in vec3 vFWP; in vec3 vFWN; in vec2 vFuv;
vec3 gFAlb; float gFRough; float gFMetal; float gFAO; vec3 gFNw; vec3 gFEmi; float gFFar = 0.0; float gFLit = 0.0; vec3 gFLitC = vec3(1.0);
float fH2(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float fVN(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(fH2(i), fH2(i + vec2(1.0, 0.0)), f.x), mix(fH2(i + vec2(0.0, 1.0)), fH2(i + vec2(1.0, 1.0)), f.x), f.y); }
float fBox(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float fOpen(int type, vec2 p, vec2 hs) {
  if (type == 1) return abs(p.y) - hs.y;
  if (type == 3) { float r = hs.x; float cy = hs.y - r; return p.y > cy ? length(vec2(p.x, p.y - cy)) - r : max(abs(p.x) - r, -p.y - hs.y); }
  if (type == 4) return length(p) - min(hs.x, hs.y);
  return fBox(p, hs);
}
// anti-aliased line; once the line is thinner than a pixel its coverage fades toward its true area share instead of
// settling at ~0.5 (mullions / frames covered half of every distant facade and washed far towers out pale gray)
float fLine(float d, float w, float px) { return (1.0 - smoothstep(w - px, w + px, abs(d))) * min(1.0, 1.6 * w / max(px, 1e-5)); }
void facadeEval() {
  vec3 Nw = normalize(vFWN);
  vec3 Vw = normalize(vFWP - cameraPosition);
  bool horiz = abs(Nw.y) > 0.6;
  vec3 T = horiz ? vec3(1.0, 0.0, 0.0) : normalize(vec3(Nw.z, 0.0, -Nw.x));
  vec3 Bt = horiz ? vec3(0.0, 0.0, -1.0) : vec3(0.0, 1.0, 0.0);
  vec2 tuv = horiz ? vFWP.xz : vec2(dot(vFWP.xz, T.xz), vFWP.y);
  int Li = int(vFa.x + 0.5); float Lf = float(Li); float ts = uFTile[Li];
  vec4 cR = texture(uFCol, vec3(tuv * ts, Lf));
  vec4 nA = texture(uFNrm, vec3(tuv * ts, Lf));
  // no visible tiling on plain stucco / plaster / concrete: a second, offset and rescaled sample blended in by low-frequency
  // noise (patterned layers - brick, block, siding, tile, metal - keep one sample so courses stay continuous)
  if (Li <= 5 || Li == 9 || Li == 15 || Li == 21 || Li == 22) {
    vec2 uvB = tuv * ts * 0.71 + vec2(0.37, 0.61);
    float bw = smoothstep(0.32, 0.68, fVN(tuv * 0.19 + vFa.w * 37.0));
    cR = mix(cR, texture(uFCol, vec3(uvB, Lf)), bw); nA = mix(nA, texture(uFNrm, vec3(uvB, Lf)), bw);
  }
  int bits = int(vFd.w + 0.5);
  float seed = vFa.w * 913.0;
  // weathering: large soft blotches, vertical rain streaks, splash-zone dirt at the base
  float mac = fVN(tuv * 0.13 + seed);
  float streak = fVN(vec2(tuv.x * 2.1 + seed, tuv.y * 0.16));
  float grimeK = (bits & 8192) != 0 ? 0.42 : 0.2;
  float baseDirt = horiz ? 0.0 : smoothstep(1.8, 0.0, vFWP.y - vFc.x) * (0.18 + 0.26 * fVN(tuv * vec2(1.3, 3.0))); // splash-zone grime at the base
  // r2-art palette: Florida paint is sun-faded. Wall tints keep linear saturation <= 0.5 and painted walls luminance >= 0.16
  // (navy / teal / brick-red paint read as cartoon); a very low-frequency repaint / mildew patchiness breaks up big flat walls
  vec3 tint = vColor.rgb;
#ifndef ART_GEO_OFF
  { float tl = dot(tint, vec3(0.2126, 0.7152, 0.0722)), tmx = max(max(tint.r, tint.g), tint.b), tmn = min(min(tint.r, tint.g), tint.b), tsat = (tmx - tmn) / max(tmx, 1e-4);
    if (tsat > 0.5) tint = mix(vec3(tl), tint, 0.5 / tsat);
    if (!horiz && Li != 8 && Li != 9 && Li != 16 && tl < 0.16) tint *= 0.16 / max(tl, 0.02); }
  float patchy = fVN(tuv * 0.035 + seed * 1.7);
#else
  float patchy = 0.625;
#endif
  vec3 alb = cR.rgb * tint * (0.9 + 0.2 * mac) * (0.9 + 0.16 * patchy);
  alb *= 1.0 - (streak * streak * grimeK + baseDirt) * vec3(0.8, 0.86, 0.95);
#ifndef ART_GEO_OFF
  { float hb = vFWP.y - vFc.x; // painted base course: a 0.45 m darker plinth band at grade (soft top edge), on walls only
    if (!horiz && hb > -0.3 && hb < 0.6) alb = mix(alb, alb * vec3(0.66, 0.66, 0.68) + vec3(0.012), 1.0 - smoothstep(0.43, 0.47, hb)); }
#endif
  float rough = cR.a, metal = nA.a, ao = nA.b;
#ifndef ART_GEO_OFF
  rough = clamp(rough + (patchy - 0.5) * 0.14 + streak * streak * grimeK * 0.25, 0.04, 1.0); // r2-art: roughness follows the repaint / grime breakup (no uniform sheen across a wall)
#endif
  vec3 nT = vec3(nA.xy * 2.0 - 1.0, 0.0); nT.z = sqrt(max(0.05, 1.0 - dot(nT.xy, nT.xy)));
  vec3 emi = vec3(0.0); vec3 nOver = vec3(0.0); float useOver = 0.0;
  int type = int(vFb.w + 0.5);
  { // rusticated stone base: banded courses with V-joints and staggered head joints on the ground floor of masonry-type walls
    float hy = vFWP.y - vFc.x;
    bool stoneWall = Li == 1 || Li == 2 || Li == 5 || Li == 6 || Li == 9 || Li == 15 || Li == 16 || Li == 14;
    if (!horiz && stoneWall && hy > 0.0 && hy < 4.35) {
      float pw = max(length(fwidth(tuv)), 1e-4);
      float cy = hy / 0.52;
      float row = floor(cy);
      float cx = (tuv.x + mod(row, 2.0) * 0.7) / 1.4;
      float gy = min(fract(cy), 1.0 - fract(cy)) * 0.52;
      float gx = min(fract(cx), 1.0 - fract(cx)) * 1.4;
      float jy = 1.0 - smoothstep(0.03 - pw, 0.03 + pw, gy);
      float jx = (1.0 - smoothstep(0.018 - pw, 0.018 + pw, gx)) * (1.0 - smoothstep(0.06, 0.25, pw));
      float j = max(jy, jx);
      float blk = fH2(vec2(floor(cx), row) + vFa.w * 31.0);
      alb = mix(alb, mix(vec3(0.84, 0.81, 0.74), cR.rgb * 1.1, 0.35) * (0.93 + 0.12 * blk), 0.6);
      alb *= 1.0 - 0.45 * j;
      ao *= 1.0 - 0.4 * j;
      float sgn = fract(cy) < 0.5 ? 1.0 : -1.0;
      nT.y += jy * sgn * 0.7;
      rough = mix(rough, 0.82, 0.5);
    }
  }
  if (type != 5 && !horiz) {
    vec2 guv = vFuv; vec2 cell = floor(guv); vec2 f = guv - cell;
    vec2 cs = vec2(vFa.y, vFa.z); vec2 pm = f * cs;
    vec2 pxv = fwidth(guv) * cs; float px = max(max(pxv.x, pxv.y), 1e-4);
    float detail = 1.0 - smoothstep(0.05, 0.28, px);
    float h1 = fH2(cell + seed), h2 = fH2(cell * 1.31 + seed + 17.0), h3 = fH2(cell * 0.73 + seed + 41.0), h4 = fH2(cell * 2.17 + seed + 71.0);
    vec3 acc = vFd.rgb; int prof = int(vFc.y + 0.5);
#ifndef ART_GEO_OFF
    { float al = dot(acc, vec3(0.2126, 0.7152, 0.0722)), amx = max(max(acc.r, acc.g), acc.b), amn = min(min(acc.r, acc.g), acc.b), asat = (amx - amn) / max(amx, 1e-4); if (asat > 0.6) acc = mix(vec3(al), acc, 0.6 / asat); } // r2-art: faded trim / shutter paint
#endif
    vec3 gTint = uFGlass[int(vFc.z + 0.5)]; float refl = vFc.w;
    vec3 frameC = (bits & 512) != 0 ? vec3(0.035, 0.037, 0.04) : vec3(0.74, 0.74, 0.72);
    vec3 Vt = vec3(dot(Vw, T), dot(Vw, Bt), min(dot(Vw, Nw), -0.04));
    vec2 hs = vec2(vFb.x, vFb.y) * cs * 0.5; vec2 wmin = vec2(cs.x * 0.5 - hs.x, vFb.z * cs.y); vec2 wc = wmin + hs;
    float lit = 0.0; vec3 litC = vec3(1.0);
    { // night lighting: each window has a threshold; the lit fraction per building type follows the hour
      float lf = uFLit[prof]; float thr = h4;
      if (prof == 0) thr = mix(h4, fH2(vec2(cell.y, seed)), 0.65);            // offices: whole floors stay on
      // sub-pixel windows (mid / far LOD): light whole clusters of windows (power-of-two groups at least ~1.5 px wide) so a
      // distant tower keeps a random lit pattern instead of averaging to a flat glow
      float farF = smoothstep(0.6, 2.5, px / min(cs.x, cs.y));
      vec2 kg = min(exp2(ceil(log2(max(vec2(1.0), px * 1.6 / cs)))), vec2(4.0)); // stage 1: clusters at most 4x4 windows (bigger groups lit whole towers white)
      vec2 cg = floor(cell / kg);
      float thrG = prof == 0 ? mix(fH2(cg * 1.31 + seed * 7.0), fH2(vec2(cg.y * 1.7, seed)), 0.6) : fH2(cg * 1.31 + seed * 7.0);
      lit = mix(step(thr, lf), step(thrG, lf), farF) * uFNight;
      // stage 1: very far (windows well under a pixel even in clusters): average lit coverage (lit share x glazed share)
      float avgF = smoothstep(4.0, 10.0, px / min(cs.x, cs.y));
      lit = mix(lit, lf * 0.45 * uFNight, avgF);
      gFFar = smoothstep(0.3, 1.6, px / min(cs.x, cs.y));
      gFLit = lit;
      float warm = fH2(cell * 3.1 + seed + 5.0);
      litC = prof == 0 || prof == 5 || prof == 4 ? mix(vec3(0.82, 0.92, 1.0), vec3(1.0, 0.95, 0.84), warm * 0.7) : mix(vec3(1.0, 0.66, 0.36), vec3(1.0, 0.88, 0.70), warm);
      gFLitC = litC;
      if ((bits & 131072) != 0) { lit = 0.0; gFLit = 0.0; } // abandoned: dark
      if (prof == 1 && warm > 0.84) litC = mix(litC, vec3(0.45, 0.6, 1.0) * (0.75 + 0.5 * fH2(vec2(floor(uFTime * 5.0), h1 * 91.0))), 0.75); // TV glow
    }
    if (type == 2) {
      // ---- curtain wall: flush glass, mullion grid, spandrel band at each floor ----
      float spH = vFb.z * cs.y;
      float dv = min(pm.x, cs.x - pm.x), dh = min(abs(pm.y - spH), min(pm.y, cs.y - pm.y));
      float mull = max(fLine(dv, 0.035, px), fLine(dh, 0.03, px));
      if ((bits & 32) != 0) mull = max(mull, fLine(pm.x - cs.x * 0.5, 0.022, px));
      float sp = 1.0 - smoothstep(spH - px, spH + px, pm.y);
      vec2 ruv = pm / cs; float D = mix(4.0, 9.0, h3);
      vec3 Vr = Vt / vec3(cs.x * 0.5, cs.y * 0.5, -D * 0.5);
      if (h2 > 0.5) { ruv.x = 1.0 - ruv.x; Vr.x = -Vr.x; }
      vec3 I = vec3(0.3, 0.28, 0.25);
      if (px < 0.7) {
        vec3 pos = vec3(ruv * 2.0 - 1.0, -1.0); vec3 id = 1.0 / Vr; vec3 k = abs(id) - pos * id; float kMin = min(min(k.x, k.y), k.z); pos += kMin * Vr;
        float it = pos.z * 0.5 + 0.5; float rz = clamp(it, 0.0, 1.0) + 1.0; it = (1.0 - 1.0 / rz) * 2.0;
        vec2 iuv = pos.xy * mix(1.0, 0.5, it) * 0.5 + 0.5;
        vec2 rk = uFRoomKind[prof]; float ri = rk.x + floor(h1 * rk.y);
        vec2 auv = (vec2(mod(ri, uFGrid.x), floor(ri / uFGrid.x)) + clamp(iuv, uFGrid.z, 1.0 - uFGrid.z)) / uFGrid.xy;
        I = textureGrad(uFRooms, auv, dFdx(guv) / uFGrid.xy, dFdy(guv) / uFGrid.xy).rgb * (1.0 - 0.45 * clamp(it, 0.0, 1.0));
      }
      float blind = (h2 < 0.3 ? smoothstep(cs.y - (0.2 + 0.5 * h3) * (cs.y - spH), cs.y - (0.2 + 0.5 * h3) * (cs.y - spH) + 0.02, pm.y) : 0.0) * (1.0 - sp);
      vec3 blindC = vec3(0.78, 0.76, 0.7) * (0.8 + 0.2 * sin(pm.y * 90.0) * detail);
      float tr = (1.0 - refl * 0.82) * (1.0 - sp);
      vec3 gl = mix(gTint * 0.42, blindC * 0.5, blind * 0.8);
      vec3 spC = (bits & 2) != 0 ? mix(gTint * 0.3, vec3(0.16, 0.17, 0.18), 0.5) : gTint * 0.34;
      alb = mix(mix(gl, spC, sp), frameC, mull * (0.35 + 0.65 * detail));
      float fin = (bits & 1024) != 0 ? fLine(dv, 0.06, px) * detail : 0.0;
      alb = mix(alb, vec3(0.8, 0.82, 0.84), fin * 0.8);
      rough = mix(mix(0.05 + 0.1 * fVN(pm * 2.0 + cell), 0.14, sp), 0.42, max(mull, fin));
      metal = mix(mix(max(refl, 0.72), 0.55, sp), 0.75, max(mull, fin)); ao = 1.0 - 0.25 * mull; // glass reads as a tinted mirror of the sky
      nT = vec3((fVN(cell * 3.7 + seed) - 0.5) * 0.035, (fVN(cell * 5.1 + seed) - 0.5) * 0.035, 1.0); // panes are never perfectly coplanar
      emi = I * tr * (1.0 - mull) * (1.0 - blind * 0.7) * (uFDay * 0.16 + lit * litC * uFGlow) + blindC * blind * lit * litC * 0.35 * uFGlow * (1.0 - mull);
    } else {
      // ---- openings in a solid wall ----
      float rec = (type == 1 ? 0.09 : type == 8 ? 0.3 : type == 0 || type == 3 ? 0.26 : 0.17) * (1.0 - smoothstep(0.12, 0.7, px));
      vec2 pg = pm + Vt.xy / (-Vt.z) * rec;
      float sdW = fOpen(type, pm - wc, hs), sdG = fOpen(type, pg - wc, hs);
      float inOpen = 1.0 - smoothstep(-px, px, sdW);
      // wall dressing around the opening
      if ((bits & 1) != 0) { float pd = min(pm.x, cs.x - pm.x); float pil = 1.0 - smoothstep(0.2 - px, 0.2 + px, pd); alb = mix(alb, alb * 1.1 + 0.02, pil); nT.x += (smoothstep(0.16, 0.2, pd) - smoothstep(0.2, 0.24, pd)) * 0.9 * sign(pm.x - cs.x * 0.5) * detail; }
      if ((bits & 4) != 0) { float bc = 1.0 - smoothstep(0.2 - px, 0.2 + px, pm.y); alb = mix(alb, mix(acc, vec3(0.82, 0.79, 0.73), 0.6) * cR.rgb * 1.25, bc); ao *= 1.0 - 0.3 * (1.0 - smoothstep(0.0, 0.1, cs.y - pm.y)); nT.y += (smoothstep(0.16, 0.2, pm.y) - smoothstep(0.2, 0.24, pm.y)) * 0.8 * detail; }
      if ((bits & 8) != 0) { float sy = wmin.y * 0.5; float st = max(fLine(pm.y - sy, 0.03, px), max(fLine(pm.y - sy - 0.11, 0.03, px), fLine(pm.y - sy + 0.11, 0.03, px))); alb = mix(alb, mix(acc, alb, 0.45), st * (0.5 + 0.5 * detail)); }
      if ((bits & 2) != 0 && type == 0) { float spn = (1.0 - smoothstep(-px, px, fBox(pm - vec2(wc.x, wmin.y * 0.5 + 0.06), vec2(hs.x, max(0.02, wmin.y * 0.5 - 0.14))))); alb = mix(alb, acc * (0.9 + 0.1 * cR.rgb), spn); rough = mix(rough, 0.5, spn); }
      if ((bits & 2048) != 0) { float sr = (1.0 - smoothstep(0.13 - px, 0.13 + px, sdW)) * (1.0 - inOpen); alb = mix(alb, acc, sr); ao *= 1.0 - 0.18 * sr * smoothstep(0.09, 0.13, sdW); }
      if ((bits & 128) != 0 && type == 0) { // louvered shutters flanking the window
        float sw = hs.x * 0.52; vec2 sp2 = vec2(abs(pm.x - wc.x) - hs.x - sw * 0.5 - 0.02, pm.y - wc.y);
        float sm = 1.0 - smoothstep(-px, px, fBox(sp2, vec2(sw * 0.5, hs.y)));
        alb = mix(alb, acc * (0.78 + 0.22 * step(0.5, fract(pm.y * 14.0)) * detail), sm); rough = mix(rough, 0.6, sm); nT.y += sm * (fract(pm.y * 14.0) - 0.5) * 0.9 * detail;
      }
      if ((type == 0 || type == 3) && (bits & 2048) == 0) { // stone lintel (flat) or voussoir ring + keystone (arched)
        float topY = wmin.y + hs.y * 2.0;
        float lin = type == 0 ? 1.0 - smoothstep(-px, px, fBox(pm - vec2(wc.x, topY + 0.11), vec2(hs.x + 0.12, 0.11)))
                              : (1.0 - smoothstep(-px, px, abs(sdW - 0.1) - 0.1)) * step(wc.y + hs.y - hs.x, pm.y);
        if (type == 3) lin = max(lin, 1.0 - smoothstep(-px, px, fBox(pm - vec2(wc.x, topY + 0.14), vec2(0.13, 0.17))));
        vec3 stoneC = mix(cR.rgb, vec3(0.86, 0.83, 0.77), 0.55);
        alb = mix(alb, stoneC, lin * (1.0 - inOpen)); nT.y += lin * 0.25 * detail; ao *= 1.0 - 0.12 * lin;
      }
      if ((bits & 4096) != 0 && type != 7 && type != 6) { // sill + stains running down from its ends
        float sl = 1.0 - smoothstep(-px, px, fBox(pm - vec2(wc.x, wmin.y - 0.05), vec2(hs.x + 0.09, 0.05)));
        float below = smoothstep(0.0, 0.06, wmin.y - 0.1 - pm.y);
        float ends = max(fLine(pm.x - (wc.x - hs.x - 0.05), 0.07, px), fLine(pm.x - (wc.x + hs.x + 0.05), 0.07, px));
        alb *= 1.0 - below * ends * (0.2 + 0.25 * h3) * exp(-(wmin.y - pm.y) * 1.3) * (0.6 + 0.8 * fVN(pm * vec2(9.0, 1.5) + cell));
        alb = mix(alb, cR.rgb * vec3(0.86, 0.85, 0.82), sl); nT.y += sl * 0.35;
      }
      ao *= 1.0 - 0.22 * (1.0 - smoothstep(0.0, 0.16, sdW)) * (1.0 - inOpen);
      // window air conditioner (hangs out of the opening) and its drip stain
      float acM = 0.0;
      if ((bits & 256) != 0 && type == 0 && h4 * 1.37 - floor(h4 * 1.37) < 0.2) {
        vec2 ap = pm - vec2(wc.x + (h3 - 0.5) * hs.x * 0.5, wmin.y + 0.19);
        acM = 1.0 - smoothstep(-px, px, fBox(ap, vec2(min(0.33, hs.x * 0.8), 0.19)));
        float drip = fLine(ap.x, 0.05, px) * step(pm.y, wmin.y) * exp(-(wmin.y - pm.y) * 0.9);
        alb *= 1.0 - drip * 0.42;
      }
      if (inOpen > 0.001) {
        vec3 oAlb; float oRough, oMetal, oAO = 1.0; vec3 oEmi = vec3(0.0); vec3 oN = vec3(0.0, 0.0, 1.0);
        if (sdG > 0.0 && rec > 0.001) {
          // the reveal: jamb, soffit or sill of the wall thickness
          vec2 d = pg - wc; vec2 over = abs(d) - hs;
          vec2 rn = (type == 4 || (type == 3 && d.y > hs.y - hs.x)) ? -normalize(d) : (over.x > over.y ? vec2(-sign(d.x), 0.0) : vec2(0.0, -sign(d.y)));
          oAlb = ((bits & 2048) != 0 ? acc : cR.rgb * vColor.rgb) * 0.92; oRough = cR.a; oMetal = 0.0; oAO = 0.62 + 0.2 * rn.y; oN = vec3(rn, 0.25);
        } else {
          float fw = type == 8 ? 0.0 : (type == 6 || type == 7 ? 0.06 : 0.055);
          float fr = smoothstep(-fw - px, -fw + px, sdG);
          vec2 wq = (pg - wmin) / (hs * 2.0);
          // mullions
          float mu = 0.0; float mw = 0.022;
          if (type == 0 || type == 3) {
            if ((bits & 16) != 0) mu = max(fLine(pg.x - wc.x, mw, px), fLine(pg.y - (wmin.y + hs.y * 1.24), mw, px));
            else if ((bits & 32) != 0) mu = fLine(pg.x - wc.x, mw, px);
            else if ((bits & 64) != 0) mu = fLine(fract(wq.y * 5.0) - 0.5, 0.06, px * 5.0 / (hs.y * 2.0));
            else if ((bits & 32768) != 0) mu = max(fLine(pg.y - (wmin.y + hs.y * 0.7), mw, px), fLine(pg.x - wc.x, mw, px) * step(pg.y, wmin.y + hs.y * 0.7));
            float panes = floor(hs.x * 2.0 / 1.5 + 0.5);
            if (panes > 2.5) mu = max(mu, fLine(fract(wq.x * panes + 0.5) - 0.5, mw * panes / (hs.x * 2.0), px * panes / (hs.x * 2.0)));
          } else if (type == 1) { mu = max(fLine(min(pg.x, cs.x - pg.x), 0.03, px), fLine(pg.x - cs.x * 0.5, 0.02, px)); }
          else if (type == 6) { float n6 = max(1.0, floor(hs.x * 2.0 / 1.7 + 0.5)); mu = max(fLine(fract(wq.x * n6 + 0.5) - 0.5, 0.03 * n6 / (hs.x * 2.0), px * n6 / (hs.x * 2.0)), fLine(pg.y - (wmin.y + hs.y * 2.0 - 0.55), 0.03, px)); }
          else if (type == 7) { mu = max(fLine(pg.x - wc.x, 0.03, px), fLine(pg.y - (wmin.y + 2.15), 0.04, px) * step(2.5, hs.y * 2.0)); }
          mu *= detail;
          // interior mapping: the room spans the whole bay x floor cell behind the wall
          vec2 ruv = pg / cs; float D = mix(3.2, 6.5, h3);
          vec3 Vr = Vt / vec3(cs.x * 0.5, cs.y * 0.5, -D * 0.5);
          if (h2 > 0.5) { ruv.x = 1.0 - ruv.x; Vr.x = -Vr.x; }
          vec3 I = vec3(0.3, 0.27, 0.23); float it = 0.5;
          if (px < 0.7) {
            vec3 pos = vec3(clamp(ruv, 0.0, 1.0) * 2.0 - 1.0, -1.0); vec3 id = 1.0 / Vr; vec3 k = abs(id) - pos * id; float kMin = min(min(k.x, k.y), k.z); pos += kMin * Vr;
            it = pos.z * 0.5 + 0.5; float rz = clamp(it, 0.0, 1.0) + 1.0; it = (1.0 - 1.0 / rz) * 2.0;
            vec2 iuv = pos.xy * mix(1.0, 0.5, it) * 0.5 + 0.5;
            int rp = type == 6 ? 3 : (type == 7 ? 6 : (type == 8 ? 5 : prof));
            vec2 rk = uFRoomKind[rp]; float ri = rk.x + floor(h1 * rk.y);
            vec2 auv = (vec2(mod(ri, uFGrid.x), floor(ri / uFGrid.x)) + clamp(iuv, uFGrid.z, 1.0 - uFGrid.z)) / uFGrid.xy;
            I = textureGrad(uFRooms, auv, dFdx(guv) / uFGrid.xy, dFdy(guv) / uFGrid.xy).rgb;
          }
          // curtains and blinds, a different state per window (homes and hotels mostly; offices get blinds)
          float cov = 0.0; vec3 cC = vec3(0.8);
          if (type != 8 && type != 6 && type != 7) {
            float st = h2 * 7.0 - floor(h2 * 7.0); bool home = prof == 1 || prof == 2;
            vec3 pal = mix(vec3(0.78, 0.74, 0.66), 0.5 + 0.42 * cos(6.2831 * (h3 * 3.0 + vec3(0.0, 0.33, 0.67))), 0.12); // linen, cream, grey: never candy colors
            if (st < (home ? 0.22 : 0.34)) { float t = 0.22 + 0.62 * h3; cov = smoothstep(1.0 - t - 0.01, 1.0 - t + 0.01, wq.y) * 0.92; cC = vec3(0.82, 0.8, 0.74) * (0.72 + 0.28 * step(0.5, fract(wq.y * hs.y * 2.0 * 26.0)) * detail); }
            else if (st < (home ? 0.5 : 0.4)) { float c = 0.14 + 0.2 * h1; cov = smoothstep(0.5 - c - 0.01, 0.5 - c + 0.01, abs(wq.x - 0.5)) * 0.95; cC = mix(vec3(0.86, 0.82, 0.74), pal, 0.55) * (0.8 + 0.2 * sin(wq.x * hs.x * 2.0 * 46.0) * detail); }
            else if (st < (home ? 0.64 : 0.44)) { cov = 0.62; cC = vec3(0.9, 0.9, 0.86) * (0.86 + 0.14 * sin(wq.x * hs.x * 2.0 * 34.0 + h1 * 6.0) * detail); }
            else if (st < (home ? 0.76 : 0.5)) { cov = 0.97; cC = mix(vec3(0.62, 0.58, 0.5), pal * 0.7, 0.5) * (0.84 + 0.16 * sin(wq.x * hs.x * 2.0 * 30.0) * detail); }
          }
          float tr = type == 8 ? 1.0 : 1.0 - refl * 0.82;
          float dayI = uFDay * (type == 8 ? 0.55 : type == 6 || type == 7 ? 0.5 : 0.34) * (1.0 - 0.5 * clamp(it, 0.0, 1.0)); // r2-art: 0.2 -> 0.34, the room reads behind daylight glass (depth, not a flat decal)
          if (type != 6 && type != 7 && type != 8) I = mix(vec3(dot(I, vec3(0.3, 0.5, 0.2))), I, 0.45); // rooms seen through daylight glass are muted
          if (type == 6 || type == 7) { dayI += uFDay * 0.12; I = mix(vec3(dot(I, vec3(0.3, 0.5, 0.2))), I, 0.3) * vec3(1.15, 0.97, 0.76); } // shop fronts: warm lit interiors by day too, no candy-colored rooms
          float l2 = type == 8 ? max(lit, uFNight * 0.9) : lit;
          oEmi = I * tr * (1.0 - cov) * (dayI + l2 * litC * uFGlow) + cC * cov * l2 * litC * 0.3 * uFGlow * tr;
          oAlb = mix(gTint * (type == 8 ? 0.0 : 0.4), cC * 0.85, cov * 0.9);
          oRough = type == 8 ? 1.0 : 0.05 + 0.12 * fVN(pm * 2.3 + cell * 7.0);
          oMetal = type == 8 ? 0.0 : mix(type == 6 || type == 7 ? 0.35 : 0.5, 0.0, cov * 0.75); // r2-art: 0.68 -> 0.5, less mirror, more room
          if ((type == 0 || type == 3) && (prof == 1 || prof == 2) && fH2(cell * 7.7 + seed + 3.0) < 0.07 && wq.y < 0.47) { // a window left open: lower sash pushed up, no glass in front of the room
            oAlb *= 0.25; oMetal = 0.0; oRough = 0.9; oEmi = I * (1.0 - cov) * (dayI * 1.6 + l2 * litC * uFGlow);
          }
          if (type == 9) { // roller shutter: ribbed painted steel filling the opening
            vec4 sR = texture(uFCol, vec3(tuv * uFTile[17], 17.0));
            float rib = fract(pg.y * 11.0); oAlb = acc * sR.rgb * (0.82 + 0.18 * smoothstep(0.0, 0.5, rib)); oRough = sR.a; oMetal = 0.35; oEmi = vec3(0.0); oN = vec3(0.0, (rib - 0.5) * 0.9 * detail, 1.0);
          }
          if (type == 7 && (bits & 16384) != 0) { // solid paneled door instead of glass
            vec2 pp = vec2(fract(wq.x * 2.0), fract(wq.y * 3.0)); float panel = step(0.14, pp.x) * step(pp.x, 0.86) * step(0.1, pp.y) * step(pp.y, 0.9);
            oAlb = acc * (0.8 + 0.2 * panel); oRough = 0.45; oMetal = 0.0; oEmi = vec3(0.0); oN = vec3(0.0, 0.0, 1.0);
          }
          if ((bits & 131072) != 0 && type != 8 && type != 9 && fH2(cell * 5.3 + seed + 19.0) < 0.8) { // abandoned: plywood boards nailed over the opening
            float nB = type == 6 || type == 7 ? 2.0 : 3.0; float row = floor(wq.y * nB); float gr = fVN(vec2(pg.x * 2.5 + row * 7.0, pg.y * 34.0) + cell * 3.0);
            float sh = fH2(vec2(row, h1 * 50.0) + cell);
            vec3 ply = mix(vec3(0.58, 0.47, 0.33), vec3(0.40, 0.35, 0.29), sh) * (0.8 + 0.28 * gr) * (1.0 - 0.25 * smoothstep(0.4, 0.95, fVN(pg * 1.7 + cell)));
            float seam = fLine(fract(wq.y * nB) - 0.5, 0.5 - 0.035 * nB / (hs.y * 2.0), px * nB / (hs.y * 2.0));
            seam = 1.0 - seam; // dark gap between boards
            oAlb = ply * (1.0 - 0.55 * seam * detail); oRough = 0.88; oMetal = 0.0; oEmi = vec3(0.0); oN = vec3(0.0, (fract(wq.y * nB) - 0.5) * 0.25 * detail, 1.0); cov = 0.0;
          } else if ((bits & 262144) != 0 && type != 8 && type != 9) { // security bars over the glass
            float bx = fract((pg.x - wmin.x) / 0.13); float bar = max(fLine(bx - 0.5, 0.11, px / 0.13), fLine(fract((pg.y - wmin.y) / 1.1) - 0.5, 0.03, px / 1.1)) * (0.4 + 0.6 * detail);
            oAlb = mix(oAlb, vec3(0.08, 0.08, 0.085), bar); oRough = mix(oRough, 0.45, bar); oMetal = mix(oMetal, 0.6, bar); oEmi *= 1.0 - bar;
          }
          // frame + mullions over the glass
          float fm = max(fr, mu);
          oAlb = mix(oAlb, frameC, fm); oRough = mix(oRough, 0.38, fm); oMetal = mix(oMetal, 0.55, fm); oEmi *= 1.0 - fm;
          // soft shadow from the head of the opening onto the glass
          oAO = 1.0 - 0.3 * smoothstep(0.75, 1.0, wq.y) * step(float(type), 7.5);
          if (type == 6) { float bulk = 1.0 - smoothstep(0.42 - px, 0.42 + px, pg.y - wmin.y); oAlb = mix(oAlb, acc * cR.rgb, bulk); oRough = mix(oRough, 0.6, bulk); oMetal *= 1.0 - bulk; oEmi *= 1.0 - bulk; }
          if (type == 8) { float rail = max(fLine(pg.y - (wmin.y + 0.5), 0.03, px), fLine(pg.y - (wmin.y + 0.95), 0.035, px)) * detail; oAlb = mix(oAlb, vec3(0.55), rail); oEmi *= 1.0 - rail; }
        }
        if (acM > 0.0) { float gr = step(0.5, fract(pm.y * 38.0)) * detail; oAlb = mix(oAlb, vec3(0.72, 0.72, 0.68) * (0.75 + 0.25 * gr), acM); oRough = mix(oRough, 0.55, acM); oMetal = mix(oMetal, 0.3, acM); oEmi *= 1.0 - acM; }
        alb = mix(alb, oAlb, inOpen); rough = mix(rough, oRough, inOpen); metal = mix(metal, oMetal, inOpen); ao = mix(ao, oAO, inOpen); emi = oEmi * inOpen;
        nOver = oN; useOver = inOpen;
      }
    }
    { // distant facades (windows under a pixel): blend toward the glass by the glazed share, so far towers read as tinted,
      // sky-reflecting glass and stone instead of washed-out plaster boxes
      float gz = type == 2 ? 0.8 : (type == 1 ? 0.5 : clamp(vFb.x * vFb.y * 1.15, 0.0, 0.7));
      float fk = smoothstep(0.4, 2.0, px / min(cs.x, cs.y)) * gz;
      alb = mix(alb, gTint * 0.36, fk); metal = mix(metal, 0.72, fk); rough = mix(rough, 0.14, fk);
    }
  }
  if ((bits & 65536) != 0 && uFAwn > 0.5) { // shop awning canvas: bounce from the lit shop window below (stronger on the underside) and a
    // little light through the fabric, so a dark awning reads as colored canvas at night instead of a black void
    float under = clamp(-vFWN.y, 0.0, 1.0);
    float shopLit = 0.35 + 0.65 * uFLit[3];
    emi += alb * (uFNight * shopLit * (0.07 + 0.33 * under) * vec3(1.0, 0.8, 0.55) * uFGlow + uFDay * 0.04);
  }
  nT = mix(nT, nOver, useOver);
  gFNw = normalize(T * nT.x + Bt * nT.y + Nw * max(nT.z, 0.05));
  { float fMx = max(max(alb.r, alb.g), alb.b), fMn = min(min(alb.r, alb.g), alb.b), fS = (fMx - fMn) / max(fMx, 1e-4); // r2-art: sun-faded paint, linear saturation <= 0.72 (~HSV 0.45 sRGB)
    if (fS > 0.72) alb = mix(vec3(dot(alb, vec3(0.2126, 0.7152, 0.0722))), alb, 0.72 / fS); }
  gFAlb = min(alb, vec3(0.78)); gFRough = clamp(rough, 0.03, 1.0); gFMetal = clamp(metal, 0.0, 1.0); gFAO = ao; gFEmi = emi * mix(1.0, 0.45, gFFar) + gFFar * gFLit * gFLitC * 0.12 * uFGlow; // distant facades: average glow = lit share x glazed share (the old 1.6x / 0.95 boost lit mid/far blocks solid white at night)
}
`;function ue(n,t,a,l=null){const e=new J({vertexColors:!0,roughness:1,metalness:1,envMapIntensity:1.25}),F=new Array(8).fill(0).map(()=>new Q(0,1));return["office","residential","hotel","retail","industrial","garage","lobby","restaurant"].forEach((o,i)=>{const c=t.kinds[o]||t.kinds.residential;F[i].set(c.first,c.count)}),e.onBeforeCompile=(o,i)=>{Object.assign(o.uniforms,{uFCol:{value:n.colR},uFNrm:{value:n.nrmAO},uFRooms:{value:t.texture},uFGrid:{value:new X(t.cols,t.rows,.6/t.cell,t.cols*t.rows)},uFRoomKind:{value:F},uFTile:{value:n.tiles},uFGlass:{value:ie.map(c=>new Z(c[0],c[1],c[2]))},uFLit:a.uFLit,uFNight:a.uFNight,uFDay:a.uFDay,uFTime:a.uFTime,uFGlow:a.uFGlow,uFAwn:a.uFAwn||{value:1}}),o.vertexShader=`attribute vec4 aFa; attribute vec4 aFb; attribute vec4 aFc; attribute vec4 aFd;
flat out vec4 vFa; flat out vec4 vFb; flat out vec4 vFc; flat out vec4 vFd;
out vec3 vFWP; out vec3 vFWN; out vec2 vFuv;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        vFa = aFa; vFb = aFb; vFc = aFc; vFd = aFd; vFuv = uv;
        vFWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vFWN = normalize(mat3(modelMatrix) * objectNormal);`),o.fragmentShader=o.fragmentShader.replace("#include <clipping_planes_pars_fragment>",`#include <clipping_planes_pars_fragment>
`+(ae?`#define ART_GEO_OFF
`:"")+oe.replace("NUM_FLAYERS",String(n.count))).replace("#include <map_fragment>",`#include <map_fragment>
  facadeEval();`).replace("#include <color_fragment>","diffuseColor.rgb = gFAlb;").replace("#include <roughnessmap_fragment>","float roughnessFactor = gFRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = gFMetal;").replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
  normal = normalize((viewMatrix * vec4(gFNw, 0.0)).xyz);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += gFEmi;`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
  reflectedLight.indirectDiffuse *= gFAO; reflectedLight.indirectSpecular *= mix(1.0, gFAO, 0.6);`),l&&l(o,i)},e.customProgramCacheKey=()=>"ps-facade-"+n.count+(l?"-x":""),e}export{ce as B,me as F,pe as G,re as P,A as W,ne as a,ue as c,ve as f,fe as l};
