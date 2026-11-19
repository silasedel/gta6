import{c as V}from"./kit-I6Xalg7L.js";import"./index-Cm_mx7eP.js";function F(l,S={}){const a=V(l,{anisotropy:4,seaY:-50,...S});S.shareTex&&(a.tex=S.shareTex);const u=a.mat,m=128,b=new Uint8Array(m*m),p=new l.DataTexture(b,m,m,l.RedFormat,l.UnsignedByteType);p.minFilter=p.magFilter=l.NearestFilter,p.needsUpdate=!0;const _={value:p};a.lotMask={size:m*m,hidden(e){return e>0&&e<m*m&&b[e]>0},set(e,r){e>0&&e<m*m&&b[e]!==(r?255:0)&&(b[e]=r?255:0,p.needsUpdate=!0)}};const D=`attribute float aLot;
uniform sampler2D uLotMask;
`,z=`{ int hl = int( aLot + 0.5 ); if ( hl > 0 && texelFetch( uLotMask, ivec2( hl % 128, hl / 128 ), 0 ).r > 0.5 ) transformed = vec3( 0.0 ); }
`,k=new WeakSet;a.hideHook=e=>{if(k.has(e))return e;k.add(e);const r=e.onBeforeCompile,o=e.customProgramCacheKey;return e.onBeforeCompile=function(t,c){r.call(this,t,c),t.uniforms.uLotMask=_,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
`+D).replace("#include <project_vertex>",z+"#include <project_vertex>")},e.customProgramCacheKey=function(){return(o?o.call(this):"")+"|lotHide"},e.needsUpdate=!0,e},a.hideDepth=a.hideHook(new l.MeshDepthMaterial({depthPacking:l.RGBADepthPacking})),a.uNight={value:0};const x=new l.MeshStandardMaterial({vertexColors:!0,roughness:.07,metalness:0,envMapIntensity:1.25,color:16777215});x.name="house:window",x.userData.uvScale=0,x.onBeforeCompile=e=>{e.uniforms.uNight=a.uNight,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute float aWear;
varying float vLit;
`).replace("#include <begin_vertex>",`#include <begin_vertex>
vLit = aWear;
`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying float vLit;
uniform float uNight;
`).replace("#include <color_fragment>",`#include <color_fragment>
  vec3 hwTint = diffuseColor.rgb;
  diffuseColor.rgb = hwTint * 0.09 + vec3( 0.012, 0.016, 0.02 );
`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += mix( vec3( 1.0, 0.62, 0.3 ), hwTint * vec3( 1.25, 1.0, 0.75 ), 0.45 ) * vLit * uNight * 2.2 + hwTint * vLit * ( 1.0 - uNight ) * 0.05;   // by day a lit room reads through the glass
`)},x.customProgramCacheKey=()=>"house:window",u.houseWindow=()=>x;const y=new l.MeshStandardMaterial({vertexColors:!0,roughness:.3,color:16777215});y.onBeforeCompile=e=>{e.uniforms.uNight=a.uNight,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute float aWear;
varying float vLit;
`).replace("#include <begin_vertex>",`#include <begin_vertex>
vLit = aWear;
`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying float vLit;
uniform float uNight;
`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vec3( 1.0, 0.72, 0.42 ) * vLit * uNight * 9.0;
`)},y.customProgramCacheKey=()=>"house:bulb",y.name="house:bulb",y.userData.uvScale=0,u.houseBulb=()=>y;const C=a.canvasTex(512,512,(e,r,o)=>{const t=a.rng(77);e.fillStyle="#8a8a8a",e.fillRect(0,0,r,o);const c=8,i=o/c;for(let n=0;n<c;n++){const s=n%2*(r/6);for(let f=-1;f<4;f++){const d=120+t()*50|0;e.fillStyle=`rgb(${d},${d},${d})`,e.fillRect(f*r/3+s+2,n*i,r/3-4,i),e.fillStyle="rgba(0,0,0,0.55)",e.fillRect(f*r/3+s-2,n*i+i*.35,4,i*.65)}e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(0,n*i+i-3,r,3)}for(let n=0;n<9e3;n++){const s=t()*255|0;e.fillStyle=`rgba(${s},${s},${s},${.25+t()*.3})`,e.fillRect(t()*r,t()*o,1.5,1.5)}for(let n=0;n<40;n++){const s=t()*r,f=e.createLinearGradient(0,0,0,o);f.addColorStop(0,"rgba(30,30,25,0)"),f.addColorStop(1,"rgba(30,30,25,0.18)"),e.fillStyle=f,e.fillRect(s,0,4+t()*18,o)}});u.shingle=()=>a.materials.get("house:shingle")||(()=>{const e=new l.MeshStandardMaterial({map:C,vertexColors:!0,roughness:.92,bumpMap:C,bumpScale:1.4});return e.name="house:shingle",e.userData.uvScale=1.8,a.materials.set(e.name,e),e})();const T=a.canvasTex(64,64,(e,r,o)=>{e.clearRect(0,0,r,o),e.strokeStyle="rgba(200,205,205,1)",e.lineWidth=3,e.beginPath(),e.moveTo(0,o/2),e.lineTo(r/2,0),e.lineTo(r,o/2),e.lineTo(r/2,o),e.closePath(),e.stroke()});u.chainlink=()=>a.materials.get("house:chain")||(()=>{const e=new l.MeshStandardMaterial({map:T,alphaTest:.4,transparent:!1,metalness:1,roughness:.5,side:l.DoubleSide,vertexColors:!0});return e.name="house:chain",e.userData.uvScale=.06,a.materials.set(e.name,e),e})();const W=a.canvasTex(64,64,(e,r,o)=>{e.clearRect(0,0,r,o),e.strokeStyle="rgba(30,34,36,0.9)",e.lineWidth=1.2;for(let t=0;t<=r;t+=4)e.beginPath(),e.moveTo(t,0),e.lineTo(t,o),e.stroke(),e.beginPath(),e.moveTo(0,t),e.lineTo(r,t),e.stroke()});u.screen=()=>a.materials.get("house:screen")||(()=>{const e=new l.MeshStandardMaterial({map:W,transparent:!0,opacity:.55,depthWrite:!1,roughness:.8,side:l.DoubleSide});return e.name="house:screen",e.userData.uvScale=.03,a.materials.set(e.name,e),e})();const P=a.canvasTex(128,128,(e,r,o)=>{e.fillStyle="#fff",e.fillRect(0,0,r,o),e.globalCompositeOperation="destination-out";for(const[t,c]of[[32,32],[96,32],[32,96],[96,96]])e.beginPath(),e.ellipse(t,c,22,22,0,0,6.3),e.fill();e.globalCompositeOperation="source-over",e.fillStyle="#fff",e.fillRect(62,0,4,o),e.fillRect(0,62,r,4);for(const[t,c]of[[32,32],[96,32],[32,96],[96,96]])e.beginPath(),e.arc(t,c,6,0,6.3),e.fill()});u.oilStain=()=>a.materials.get("house:oil")||(()=>{const e=a.canvasTex(128,128,(o,t,c)=>{const i=a.rng(41);o.clearRect(0,0,t,c);for(let n=0;n<70;n++){const s=i()*6.28,f=Math.sqrt(i())*.36*t,d=t/2+Math.cos(s)*f,h=c/2+Math.sin(s)*f*.8,v=6+i()*18,w=o.createRadialGradient(d,h,0,d,h,v);w.addColorStop(0,`rgba(38,34,30,${.1+i()*.12})`),w.addColorStop(1,"rgba(38,34,30,0)"),o.fillStyle=w,o.fillRect(d-v,h-v,v*2,v*2)}},{srgb:!0}),r=new l.MeshStandardMaterial({map:e,transparent:!0,depthWrite:!1,roughness:.55,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});return r.name="house:oil",r.userData.uvScale=1,a.materials.set(r.name,r),r})(),u.breeze=()=>a.materials.get("house:breeze")||(()=>{const e=new l.MeshStandardMaterial({map:P,alphaTest:.5,vertexColors:!0,roughness:.9,side:l.DoubleSide,bumpMap:a.microTex(),bumpScale:1});return e.name="house:breeze",e.userData.uvScale=.4,a.materials.set(e.name,e),e})();const L=a.canvasTex(640,96,(e,r,o)=>{e.clearRect(0,0,r,o),e.fillStyle="#fff",e.textAlign="center",e.textBaseline="middle",e.font=a.font(84,700,"Georgia, serif");for(let t=0;t<10;t++)e.fillText(String(t),t*64+32,50)},{repeat:!1});u.digits=()=>a.materials.get("house:digits")||(()=>{const e=new l.MeshStandardMaterial({map:L,alphaTest:.5,vertexColors:!0,roughness:.45,metalness:0});return e.name="house:digits",e.userData.uvScale=0,a.materials.set(e.name,e),e})();const M=new l.TextureLoader().load("./assets/env/waternormals.jpg");M.wrapS=M.wrapT=l.RepeatWrapping,u.poolWater=()=>a.materials.get("house:pool")||(()=>{const e=new l.MeshStandardMaterial({vertexColors:!0,roughness:.04,metalness:0,normalMap:M,normalScale:new l.Vector2(.25,.25),envMapIntensity:1.4});return e.name="house:pool",e.userData.uvScale=3,a.materials.set(e.name,e),e})(),u.stucco=()=>u.pbr("concrete_wall_008",{rep:1.4,grunge:!0,gain:2.25,rough:1.15,nscale:.7}),u.stoneVeneer=()=>u.pbr("coral_stone_wall",{rep:1.2,grunge:!0,gain:1.6,rough:1.15,nscale:.85}),u.pavers=()=>u.pbr("scuffed_cement",{rep:1.6,grunge:!0,tint:"#bcd2ff",gain:3.4});const N=new l.DataTexture(new Uint8Array([255,255,255,255]),1,1);N.needsUpdate=!0;const g=new l.MeshStandardMaterial({vertexColors:!0,roughness:.16,metalness:0,envMapIntensity:.32,map:N,color:16777215});g.name="house:shopGlass",g.userData.uvScale=0,g.onBeforeCompile=e=>{e.uniforms.uNight=a.uNight,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute float aWear;
varying float vRoom;
varying vec3 vRoomW;
`).replace("#include <begin_vertex>",`#include <begin_vertex>
vRoom = aWear;
vRoomW = ( modelMatrix * vec4( position, 1.0 ) ).xyz;
`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying float vRoom; varying vec3 vRoomW; uniform float uNight;
float rh( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
vec3 roomColor( vec2 uv, vec3 V, vec3 N, vec3 dpx, vec3 dpy, vec2 dux, vec2 duy, vec3 tint, float kind, float seed ) {
  vec3 p1 = cross( N, dpx ), p2 = cross( dpy, N );
  vec3 T = p2 * dux.x + p1 * duy.x, B = p2 * dux.y + p1 * duy.y;
  float im = inversesqrt( max( dot( T, T ), dot( B, B ) ) + 1e-12 ); T *= im; B *= im;
  vec3 d = vec3( dot( V, T ), dot( V, B ), -dot( V, N ) ); d.z = max( d.z, 0.05 );
  float depth = 0.9; vec3 o = vec3( uv, 0.0 );
  float tx = d.x > 0.0 ? ( 1.0 - o.x ) / d.x : -o.x / min( d.x, -1e-4 );
  float ty = d.y > 0.0 ? ( 1.0 - o.y ) / d.y : -o.y / min( d.y, -1e-4 );
  float tz = depth / d.z; float t = min( tz, min( tx, ty ) ); vec3 h = o + d * t;
  vec3 wall = tint, floorC = vec3( 0.32, 0.25, 0.18 ), ceilC = vec3( 0.92, 0.9, 0.86 ), c;
  if ( t == tz ) { // back wall with the room's furniture
    c = wall;
    if ( kind < 0.5 ) { c *= 0.9 + 0.1 * step( 0.5, fract( h.x * 3.0 ) ); }
    else if ( kind < 1.5 ) { float row = floor( h.y * 4.0 ), f = fract( h.y * 4.0 ); vec2 cell = vec2( floor( h.x * 9.0 ), row ); vec3 g = vec3( rh( cell + seed ), rh( cell + seed + 7.0 ), rh( cell + seed + 13.0 ) ); c = f < 0.08 ? vec3( 0.25, 0.2, 0.16 ) : ( f < 0.7 && h.y < 0.92 && h.y > 0.1 ? mix( g * 0.9 + 0.1, wall, step( 0.75, rh( cell + 3.0 + seed ) ) ) : wall * 0.75 ); }
    else if ( kind < 2.5 ) { c = h.y < 0.38 ? vec3( 0.36, 0.24, 0.15 ) * ( 0.9 + 0.1 * step( 0.5, fract( h.x * 12.0 ) ) ) : ( h.y < 0.42 ? vec3( 0.75, 0.72, 0.66 ) : wall ); if ( h.y > 0.55 && h.y < 0.8 ) { vec2 cell = vec2( floor( h.x * 6.0 ), 0.0 ); c = mix( c, vec3( rh( cell + seed ), 0.4, 0.3 ), 0.5 * step( 0.3, fract( h.x * 6.0 ) ) * step( fract( h.x * 6.0 ), 0.8 ) ); } }
    else if ( kind < 3.5 ) { float col = fract( h.x * 7.0 ); vec2 cell = vec2( floor( h.x * 7.0 ), floor( h.y * 2.0 ) ); vec3 g = vec3( rh( cell + seed ), rh( cell + seed + 5.0 ), rh( cell + seed + 9.0 ) ); c = ( h.y > 0.3 && h.y < 0.85 && col > 0.15 && col < 0.85 ) ? g * 0.75 + 0.15 : wall; if ( abs( h.y - 0.86 ) < 0.012 ) c = vec3( 0.6 ); }
    else if ( kind < 4.5 ) { c = h.y < 0.45 ? vec3( 0.38, 0.26, 0.17 ) * ( 0.85 + 0.15 * step( 0.5, fract( h.x * 5.0 ) ) ) : wall; if ( h.y > 0.55 && h.y < 0.8 && fract( h.x * 2.0 ) > 0.2 && fract( h.x * 2.0 ) < 0.8 ) c = vec3( 0.55, 0.6, 0.62 ); }
    else { c = h.y < 0.4 ? vec3( 0.75, 0.12, 0.12 ) : ( h.y < 0.44 ? vec3( 0.85 ) : wall ); if ( h.y > 0.6 && h.y < 0.75 ) c = vec3( 0.85, 0.85, 0.8 ); }
  } else if ( t == ty ) {
    if ( d.y < 0.0 ) { c = floorC * ( 0.85 + 0.15 * step( 0.5, fract( h.x * 4.0 + floor( h.z * 4.0 ) * 0.5 ) ) ); if ( kind > 1.5 && kind < 2.5 ) { vec2 q = fract( vec2( h.x * 2.0, h.z * 2.5 ) ) - 0.5; c = mix( c, vec3( 0.2, 0.14, 0.1 ), step( length( q ), 0.22 ) ); } }
    else { c = ceilC; float lp = step( 0.85, fract( h.x * 2.0 + 0.4 ) ) * step( 0.3, fract( h.z * 1.5 ) ); c = mix( c, vec3( 1.6, 1.5, 1.3 ), lp ); }
  } else { c = wall * 0.82; if ( kind > 0.5 && kind < 1.5 ) { float f = fract( h.y * 4.0 ); vec2 cell = vec2( floor( h.z * 6.0 ), floor( h.y * 4.0 ) ); c = f < 0.08 ? vec3( 0.25, 0.2, 0.16 ) : mix( vec3( rh( cell + seed + 2.0 ), rh( cell + seed + 4.0 ), rh( cell + seed + 6.0 ) ) * 0.8 + 0.1, c, 0.35 ); } }
  return c * mix( 1.0, 0.55, h.z / depth );
}
`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  { float kind = floor( vRoom ), lit = fract( vRoom ); vec3 V = normalize( -vViewPosition );   // eye -> fragment
    vec3 dpx = dFdx( -vViewPosition ), dpy = dFdy( -vViewPosition ); vec3 Ng = normalize( cross( dpx, dpy ) ); if ( dot( Ng, vViewPosition ) < 0.0 ) Ng = -Ng;
    vec3 room = roomColor( vMapUv, V, Ng, dpx, dpy, dFdx( vMapUv ), dFdy( vMapUv ), vColor.rgb, kind, floor( vRoomW.x * 0.3 ) + floor( vRoomW.z * 0.3 ) * 7.0 );
    float day = 1.0 - uNight;
    totalEmissiveRadiance += room * ( day * ( 0.42 + 0.3 * lit ) + uNight * ( 0.3 + 1.0 * lit ) * vec3( 1.0, 0.84, 0.62 ) ); }
`).replace("#include <color_fragment>",`#include <color_fragment>
  diffuseColor.rgb = vec3( 0.02, 0.025, 0.03 );
`)},g.customProgramCacheKey=()=>"house:shopGlass",u.shopGlass=()=>g;const B=a.canvasTex(512,512,(e,r,o)=>{const t=a.rng(41);e.fillStyle="#b8b0a2",e.fillRect(0,0,r,o);const c=32,i=96;for(let n=0;n<o;n+=c)for(let s=-i;s<r;s+=i){const f=n/c%2?i/2:0,d=.78+t()*.3,h=t();e.fillStyle=`rgb(${214*d|0},${196*d*(.95+h*.08)|0},${182*d*(.9+h*.1)|0})`,e.fillRect(s+f+3,n+3,i-6,c-6);for(let v=0;v<14;v++)e.fillStyle=`rgba(0,0,0,${t()*.12})`,e.fillRect(s+f+3+t()*(i-8),n+3+t()*(c-8),2+t()*4,1+t()*2)}}),R=a.canvasTex(512,512,(e,r,o)=>{e.fillStyle="#202020",e.fillRect(0,0,r,o),e.fillStyle="#e0e0e0";const t=32,c=96;for(let i=0;i<o;i+=t)for(let n=-c;n<r;n+=c){const s=i/t%2?c/2:0;e.fillRect(n+s+4,i+4,c-8,t-8)}},{srgb:!1});return u.brick=()=>a.materials.get("house:brick")||(()=>{const e=new l.MeshStandardMaterial({map:B,bumpMap:R,bumpScale:2.2,roughness:.88,vertexColors:!0});return e.name="house:brick",e.userData.uvScale=1.6,a.materials.set(e.name,e),e})(),a}export{F as createHouseKit};
