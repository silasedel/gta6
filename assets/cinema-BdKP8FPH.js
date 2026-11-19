import{cB as J,cg as Z,cC as X,W as ee,N as _,cD as te,cE as ae,a1 as S,v as H,a3 as oe,X as ne}from"./index-Cm_mx7eP.js";const le=(e,n,i)=>Math.max(n,Math.min(i,e)),re=(e,n=0)=>typeof e=="number"&&isFinite(e)?e:n,fe=e=>String(e??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]);function de(e,n,...i){const r=document.createElement(e);if(typeof n=="string")n&&(r.className=n),typeof i[0]=="string"&&(r.innerHTML=i.shift());else if(n&&typeof n=="object"&&!(n instanceof Node)){for(const[t,d]of Object.entries(n))if(!(d==null||d===!1))if(t==="class")r.className=d;else if(t==="text")r.textContent=d;else if(t==="html")r.innerHTML=d;else if(t==="on")for(const[m,P]of Object.entries(d))r.addEventListener(m,P);else if(t==="style"&&typeof d=="object")Object.assign(r.style,d);else if(t==="data")for(const[m,P]of Object.entries(d))r.dataset[m]=P;else r.setAttribute(t,d===!0?"":d)}else n instanceof Node&&i.unshift(n);for(const t of i)t!=null&&t!==!1&&r.append(t);return r}const se=e=>(re(e,9)%24+24)%24;function pe(e,n=!0){e=se(e);let i=Math.floor(e);const r=Math.floor((e-i)*60+1e-6);if(!n)return String(i).padStart(2,"0")+":"+String(r).padStart(2,"0");const t=i>=12?"PM":"AM";return i=i%12||12,i+":"+String(r).padStart(2,"0")+" "+t}const ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],me={get(e,n=null){try{const i=localStorage.getItem(e);return i==null?n:JSON.parse(i)}catch{return n}},set(e,n){try{return localStorage.setItem(e,JSON.stringify(n)),!0}catch{return!1}},del(e){try{localStorage.removeItem(e)}catch{}}};function he(){const e=new Map;return{on(n,i){let r=e.get(n);return r||e.set(n,r=new Set),r.add(i),()=>r.delete(i)},emit(n,i){const r=e.get(n);if(r)for(const t of[...r])try{t(i)}catch(d){console.error("[ui event "+n+"]",d)}}}}const C=(e,n=new S)=>Array.isArray(e)?n.set(e[0],e[1],e[2]):e!=null&&e.isVector3?n.copy(e):typeof e=="function"?C(e(),n):e?n.set(e.x,e.y,e.z):n.set(0,0,0),B={linear:e=>e,inOut:e=>e*e*(3-2*e),out:e=>1-Math.pow(1-e,3),in:e=>e*e*e,slider:e=>{const n=e*e*e*(e*(e*6-15)+10);return .15*e+.85*n}},K={uniforms:{tDepth:{value:null},uNear:{value:.25},uFar:{value:8e3},uFocus:{value:10},uAperture:{value:1},uMaxCoc:{value:12}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDepth; uniform float uNear, uFar, uFocus, uAperture, uMaxCoc; varying vec2 vUv;
    void main() {
      float d = texture2D(tDepth, vUv).x;
      float z = d >= 0.99999 ? uFar : -perspectiveDepthToViewZ(d, uNear, uFar);
      // circle of confusion in pixels (thin-lens style: |1/focus - 1/depth|), signed: negative = in front of the focus
      float c = (1.0 / uFocus - 1.0 / max(z, 0.05)) * uAperture;
      gl_FragColor = vec4(z, clamp(c, -1.0, 1.0) * uMaxCoc, (d >= 0.99999 || z > 2500.0) ? 1.0 : 0.0, 1.0);
    }`},ie={uniforms:{tDiffuse:{value:null},tCoc:{value:null},uPixel:{value:new H(1/1920,1/1080)},uAspect:{value:16/9},uDof:{value:1},uMaxCoc:{value:12},uRadScale:{value:1.4},uSunPos:{value:new H(.5,.5)},uSunOn:{value:0},uSunColor:{value:new S(1,.8,.6)},uFlare:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse, tCoc; uniform vec2 uPixel, uSunPos; uniform float uAspect, uDof, uMaxCoc, uRadScale, uSunOn, uFlare; uniform vec3 uSunColor;
    varying vec2 vUv;
    const float GOLDEN = 2.39996323;
    vec3 dof(vec2 uv) {
      vec4 c0 = texture2D(tCoc, uv);
      vec3 col = texture2D(tDiffuse, uv).rgb;
      float cs = abs(c0.y);
      float tot = 1.0, r = uRadScale, ang = 0.0;
      for (int i = 0; i < 160; i++) {
        if (r >= uMaxCoc) break;
        vec2 tc = uv + vec2(cos(ang), sin(ang)) * uPixel * r;
        vec3 sc = texture2D(tDiffuse, tc).rgb;
        vec4 cc = texture2D(tCoc, tc);
        float ss = abs(cc.y);
        if (cc.x > c0.x) ss = clamp(ss, 0.0, cs * 2.0);            // background never bleeds over a sharper foreground
        float m = smoothstep(r - 0.5, r + 0.5, ss);
        col += mix(col / tot, sc, m); tot += 1.0;
        r += uRadScale / r; ang += GOLDEN;
      }
      return col / tot;
    }
    float occl() {                                                // fraction of sky around the sun (1 = unblocked)
      float s = 0.0;
      for (int i = 0; i < 9; i++) { vec2 o = vec2(float(i % 3) - 1.0, float(i / 3) - 1.0) * vec2(0.006 / uAspect, 0.006); s += texture2D(tCoc, clamp(uSunPos + o, 0.001, 0.999)).z; }
      return s / 9.0;
    }
    vec3 flare(vec2 uv) {
      vec2 sp = uSunPos; vec2 toC = vec2(0.5) - sp;
      float vis = occl() * uSunOn * uFlare;
      if (vis <= 0.001) return vec3(0.0);
      vec3 acc = vec3(0.0);
      vec2 a = vec2(uAspect, 1.0);
      // ghosts along the sun-center axis
      for (int k = 0; k < 6; k++) {
        float t = float(k) * 0.37 + 0.35, rad = 0.018 + 0.03 * fract(float(k) * 0.618);
        vec2 gp = sp + toC * 2.0 * t;
        float d = length((uv - gp) * a);
        float disc = smoothstep(rad, rad * 0.55, d) * (0.6 + 0.4 * smoothstep(0.0, rad, d));
        vec3 tint = mix(vec3(0.35, 0.9, 0.85), vec3(1.0, 0.45, 0.3), fract(float(k) * 0.43));
        acc += tint * disc * 0.05;
      }
      // halo ring around the frame center opposite the sun
      vec2 hp = sp + toC * 1.0;
      float hd = length((uv - hp) * a);
      acc += vec3(1.0, 0.55, 0.35) * smoothstep(0.03, 0.0, abs(hd - 0.32)) * 0.03;
      // anamorphic streak and soft glow at the sun
      vec2 dv = (uv - sp) * a;
      acc += uSunColor * exp(-abs(dv.y) * 260.0) * exp(-abs(dv.x) * 2.2) * 0.55;
      acc += uSunColor * exp(-length(dv) * 9.0) * 0.35;
      return acc * vis;
    }
    void main() {
      vec3 c = uDof > 0.5 ? dof(vUv) : texture2D(tDiffuse, vUv).rgb;
      c += flare(vUv);
      gl_FragColor = vec4(c, 1.0);
    }`},ce=`
.pm-cine { position: fixed; inset: 0; pointer-events: none; z-index: 45; }
.pm-cine-bar { position: absolute; left: 0; right: 0; height: var(--pm-bar, 11.5vh); background: #000; transform: scaleY(0); transition: transform 1.1s cubic-bezier(.2,.9,.25,1); }
.pm-cine-bar.t { top: 0; transform-origin: 50% 0; } .pm-cine-bar.b { bottom: 0; transform-origin: 50% 100%; }
.pm-cine.lb .pm-cine-bar { transform: scaleY(1); }
.pm-cine-fade { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; object-fit: cover; }
.pm-cine-black { position: absolute; inset: 0; background: #000; opacity: 0; transition: opacity .6s ease; }
`;let N=null;function ge(e){if(N)return N;const{renderer:n,camera:i}=e,r=e.post,t={active:!1,expo:1,bloomK:1,stage:null,stageExposure:1,dof:!0,flare:!0,grain:1,vignette:0,letterbox:!1,shot:null,t:0,focus:8,aperture:1,maxCoc:10,fov:i.fov,roll:0};if(!document.getElementById("pm-cine-css")){const a=document.createElement("style");a.id="pm-cine-css",a.textContent=ce,document.head.appendChild(a)}const d=document.createElement("div");d.className="pm-cine",d.innerHTML='<canvas class="pm-cine-fade"></canvas><div class="pm-cine-black"></div><div class="pm-cine-bar t"></div><div class="pm-cine-bar b"></div>',document.body.appendChild(d);const m=d.querySelector(".pm-cine-fade"),P=m.getContext("2d"),z=d.querySelector(".pm-cine-black"),R=()=>{const a=innerWidth/Math.max(1,innerHeight),s=2.2;document.documentElement.style.setProperty("--pm-bar",a>=s?"0px":Math.min(8.5,(1-a/s)*50).toFixed(2)+"vh")};R(),addEventListener("resize",R);let p=null,k=null,E=null;const D=r==null?void 0:r.composer;if(D&&r.grade){try{E=new J(new Z({...K,uniforms:X.clone(K.uniforms),depthTest:!1,depthWrite:!1})),k=new ee(4,4,{type:te,depthBuffer:!1,minFilter:_,magFilter:_}),p=new ae(ie),p.enabled=!1;const c=D.passes.findIndex(v=>{var x;return v.isOutputPass||((x=v.constructor)==null?void 0:x.name)==="OutputPass"});D.insertPass(p,c>=0?c:D.passes.length-2);const l=D.passes[0],g=l.render.bind(l);l.render=(v,x,u,F,f)=>{if(t.stage?(l.scene=t.stage,v.toneMappingExposure=t.stageExposure):l.scene!==e.scene&&(l.scene=e.scene),t.active&&!t.stage&&(v.toneMappingExposure*=t.expo,r.bloom&&(r.bloom.strength*=t.bloomK)),g(v,x,u,F,f),!p.enabled||!(u!=null&&u.depthTexture))return;(k.width!==u.width||k.height!==u.height)&&k.setSize(u.width,u.height);const b=E.material.uniforms;b.tDepth.value=r.sceneDepth||u.depthTexture,b.uNear.value=i.near,b.uFar.value=i.far,b.uFocus.value=Math.max(.3,t.focus),b.uAperture.value=t.aperture,b.uMaxCoc.value=t.maxCoc*(u.width/Math.max(1,innerWidth));const A=v.getRenderTarget();v.setRenderTarget(k),E.render(v),v.setRenderTarget(A),p.uniforms.tCoc.value=k.texture,p.uniforms.uPixel.value.set(1/u.width,1/u.height),p.uniforms.uMaxCoc.value=b.uMaxCoc.value,p.uniforms.uRadScale.value=Math.max(1.1,1.35*u.width/Math.max(1,innerWidth)),p.uniforms.uAspect.value=u.width/Math.max(1,u.height)}}catch(c){console.warn("[cinema] post hooks unavailable",c),p=null}const a=r.grade.uniforms,s=a.uGrain.value,o=r.grade.render.bind(r.grade);r.grade.render=(c,l,g,v,x)=>{const u=e.settings||{},F=Number.isFinite(u.filmGrain)?u.filmGrain*2:1;a.uGrain.value=s*F*(t.active?t.grain:1),u.motionBlur===!1&&(a.uSpeed.value=0),t.stage&&(a.uSunOn.value=0,a.uRays.value=0,a.uSpeed.value=0),t.active&&(a.uVignette.value+=t.vignette,a.uSunOn.value*=.35,a.uRays.value*=.35),p&&p.enabled&&(p.uniforms.uSunPos.value.copy(a.uSunPos.value),p.uniforms.uSunOn.value=a.uSunOn.value,p.uniforms.uSunColor.value.copy(a.uSunColor.value)),o(c,l,g,v,x)}}let O=null;if(r!=null&&r.render){const a=r.render;r.render=s=>{if(Q(s),a(s),O){const o=O;O=null;try{o()}catch(c){console.warn("[cinema] snapshot",c)}}}}const h={t:0,dur:0,p:new S,q:new oe,fov:60};function Q(a){if(h.t>=h.dur||t.active)return;h.t=Math.min(h.dur,h.t+a);const s=B.inOut(h.t/h.dur),o=i;o.position.lerpVectors(h.p,o.position,s),o.quaternion.slerpQuaternions(h.q,o.quaternion,s),o.fov=h.fov+(o.fov-h.fov)*s,o.updateProjectionMatrix()}const j=new S,L=new S,U=new S,q=new S,M=new S,y=new S,Y=new S,T={t:Math.random()*100};function G(a,s){var v,x,u,F;if(!t.active)return!1;const o=t.shot;if(!o)return!0;t.t=Math.min(o.dur,t.t+a*(o.speed??1));const c=(o.ease||B.slider)(o.dur>0?t.t/o.dur:1);if(o.from&&(C(o.from.pos,j),C(((v=o.to)==null?void 0:v.pos)??o.from.pos,L),C(o.from.look,U),C(((x=o.to)==null?void 0:x.look)??o.from.look,q),M.lerpVectors(j,L,c),y.lerpVectors(U,q,c)),o.orbit){const f=o.orbit,b=f.a0+(f.a1-f.a0)*c,A=f.r0+((f.r1??f.r0)-f.r0)*c,$=f.h0+((f.h1??f.h0)-f.h0)*c;if(C(f.center,y),M.set(y.x+Math.sin(b)*A,y.y+$,y.z+Math.cos(b)*A),f.lookOffset&&(y.y+=f.lookOffset),f.side){const V=y.x-M.x,I=y.z-M.z,W=Math.hypot(V,I)||1;y.x-=-I/W*f.side,y.z-=V/W*f.side}}T.t+=a;const l=(o.handheld??.6)*((F=(u=e.uiSettings)==null?void 0:u.get)!=null&&F.call(u,"reducedMotion")?0:1);M.x+=Math.sin(T.t*.71)*.012*l,M.y+=Math.sin(T.t*.53+1.3)*.01*l,y.x+=Math.sin(T.t*.37+.4)*.03*l,y.y+=Math.sin(T.t*.29+2)*.02*l,s.position.copy(M),s.up.set(0,1,0),s.lookAt(y),o.roll&&s.rotateZ(o.roll);const g=o.fov1!=null?o.fov+(o.fov1-o.fov)*c:o.fov??40;if(Math.abs(s.fov-g)>.001&&(s.fov=g,s.updateProjectionMatrix()),o.focus!=null?t.focus=typeof o.focus=="number"?o.focus:C(o.focus,Y).distanceTo(M):t.focus=y.distanceTo(M),!ne){const f=Math.min(1.5,Math.max(.2,t.focus*.02));Math.abs(s.near-f)>.02&&(s.near=f,s.updateProjectionMatrix())}return t.aperture=o.aperture??1.2,t.maxCoc=o.maxCoc??11,!0}const w={get active(){return t.active},state:t,root:d,begin(a={}){t.active=!0,t.grain=a.grain??1.6,t.vignette=a.vignette??.12,t.expo=a.exposure??.86,t.bloomK=a.bloom??.65,w.setLook(a),e.cameraOverride=G,w._owner=a.owner||"cinema",e.camera&&(e.camera.near=.2,e.camera.updateProjectionMatrix())},setLook(a={}){const s=e.settings||{};t.dof=(a.dof??!0)&&s.depthOfField!==!1,t.flare=(a.flare??!0)&&s.lensFlare!==!1,p&&(p.enabled=t.active&&(t.dof||t.flare),p.uniforms.uDof.value=t.dof?1:0,p.uniforms.uFlare.value=t.flare?a.flareGain??.2:0),w.letterbox(a.letterbox??t.letterbox)},letterbox(a){var s;t.letterbox=!!a,d.classList.toggle("lb",!!a&&((s=e.settings)==null?void 0:s.letterbox)!==!1)},shot(a){t.shot={dur:10,...a},t.t=0,a.fov!=null&&e.camera&&(e.camera.fov=a.fov,e.camera.updateProjectionMatrix())},get progress(){const a=t.shot;return a?t.t/a.dur:1},crossfade(a=1400,s=null){return new Promise(o=>{O=()=>{const c=n.domElement,l=Math.max(2,Math.floor(c.width/2)),g=Math.max(2,Math.floor(c.height/2));(m.width!==l||m.height!==g)&&(m.width=l,m.height=g),P.drawImage(c,0,0,l,g),m.style.transition="none",m.style.opacity="1",m.style.transform="scale(1)",o(),Promise.resolve(s).then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{m.style.transition=`opacity ${a}ms cubic-bezier(.4,0,.2,1), transform ${a}ms linear`,m.style.opacity="0",m.style.transform="scale(1.025)"})))}})},cancelFade(){O=null,m.style.transition="none",m.style.opacity="0"},black(a,s=600){return z.style.transition=`opacity ${s}ms ease`,z.style.opacity=a?"1":"0",new Promise(o=>setTimeout(o,s))},stage(a,s={}){t.stage=a||null,t.stageExposure=s.exposure??1},handoff(a=1e3){h.p.copy(i.position),h.q.copy(i.quaternion),h.fov=i.fov,h.t=0,h.dur=a/1e3},end(){t.active=!1,t.shot=null,p&&(p.enabled=!1),e.cameraOverride===G&&(e.cameraOverride=null),w.letterbox(!1),e.camera&&(e.camera.near=.25,e.camera.updateProjectionMatrix())},streamReady(a,s,o=260){var g,v;const c=(g=e.city)==null?void 0:g.streamer;if(!c)return!0;let l=!0;for(const x of c.tiles.values())if(Math.hypot(x.cx-a,x.cz-s)<o&&!x.near&&(x.job||x.d<330)){l=!1;break}return l&&(((v=c.pending)==null?void 0:v.call(c))??0)<4},waitStream(a,s,o=5e3,c=260){const l=performance.now();return new Promise(g=>{const v=()=>{w.streamReady(a,s,c)||performance.now()-l>o?g():setTimeout(v,120)};v()})}};return N=w,e.cinema=w,w}export{ve as D,de as a,fe as b,le as c,he as e,pe as f,ge as g,re as n,me as s};
