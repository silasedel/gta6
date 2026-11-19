// Southline offline cache (r2-web). Generated into the Pages build as sw.js by tools/v2/web/build-pages.mjs, which
// replaces 202611190042-43ad1f68 with the build id. sw-manifest.json (same folder) maps every deployed file to a content hash.
// - Cache-first for game files, so the second visit loads from disk and works offline after the first.
// - Per-build versioning without throwing the cache away: each cached response carries the hash it was stored with;
//   when a new build activates, only entries whose hash changed (or that no longer exist) are deleted.
// - index.html is network-first (updates arrive at once), falling back to the cache when offline.
// - Music is never cached or preloaded here: Range requests (streamed media) go straight to the network.
const VERSION = '202611190042-43ad1f68';
const CACHE = 'southline-v1';          // one long-lived cache; entries are validated per build by hash
const META = 'southline-meta';         // { version, manifest } of the build that filled the cache
const SCOPE = new URL(self.registration.scope).pathname; // e.g. /gta6/
let manifest = null;                   // { path: hash } (paths relative to SCOPE)

async function loadManifest(fresh) {
  if (manifest && !fresh) return manifest;
  try {
    const r = await fetch(SCOPE + 'sw-manifest.json?v=' + VERSION, { cache: 'no-store' });
    if (r.ok) { const j = await r.json(); manifest = j.files || {}; const m = await caches.open(META); await m.put('manifest', new Response(JSON.stringify(j))); return manifest; }
  } catch (e) { /* offline */ }
  try { const m = await caches.open(META); const r = await m.match('manifest'); if (r) { manifest = (await r.json()).files || {}; return manifest; } } catch (e) { /* */ }
  manifest = {};
  return manifest;
}
const rel = (url) => { const p = decodeURIComponent(new URL(url).pathname); return p.startsWith(SCOPE) ? p.slice(SCOPE.length) : null; };
const isMusic = (path) => /^assets\/audio\/music\//.test(path);

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    await loadManifest(true);
    // the shell: the page and its entry script / style, so an offline start always gets past the first byte
    const c = await caches.open(CACHE);
    try { await c.add(new Request(SCOPE, { cache: 'reload' })); } catch (x) { /* online check only */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const man = await loadManifest();
    for (const k of await caches.keys()) if (k !== CACHE && k !== META) await caches.delete(k);
    // drop entries whose file changed in this build or is gone
    const c = await caches.open(CACHE);
    let dropped = 0;
    if (Object.keys(man).length) {
      for (const req of await c.keys()) {
        const p = rel(req.url); if (p == null) continue;
        if (p === '' || p === 'index.html') continue; // network-first anyway
        const h = man[p];
        const r = await c.match(req);
        if (!h || !r || r.headers.get('x-sl-hash') !== h) { await c.delete(req); dropped++; }
      }
    }
    await self.clients.claim();
    console.info(`[sw] ${VERSION} active, ${dropped} stale entries dropped`);
  })());
});

async function store(c, req, res, hash) {
  // keep the hash with the response so a later build can tell whether the file changed
  const h = new Headers(res.headers); h.set('x-sl-hash', hash);
  const body = await res.blob();
  await c.put(req, new Response(body, { status: 200, statusText: 'OK', headers: h }));
  return body;
}

async function fromCacheOrNet(req, path) {
  const c = await caches.open(CACHE);
  const key = new Request(new URL(req.url).origin + SCOPE + path); // ignore ?query (cache busters)
  const hit = await c.match(key);
  if (hit) return hit;
  const res = await fetch(req);
  const man = await loadManifest();
  const hash = man[path];
  if (res.ok && res.status === 200 && hash && !isMusic(path)) {
    const copy = res.clone();
    // store after answering: the page never waits for the cache write
    store(c, key, copy, hash).catch(() => {});
  }
  return res;
}

// Range request answered from a cached full file (offline seeking); otherwise the network
async function rangeFrom(req, path) {
  const c = await caches.open(CACHE);
  const hit = await c.match(new Request(new URL(req.url).origin + SCOPE + path));
  if (!hit) return fetch(req);
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const blob = await hit.blob();
  if (!m) return new Response(blob, { headers: hit.headers });
  const start = m[1] ? +m[1] : Math.max(0, blob.size - +m[2]);
  const end = m[1] && m[2] ? Math.min(+m[2], blob.size - 1) : blob.size - 1;
  const h = new Headers(hit.headers); h.set('Content-Range', `bytes ${start}-${end}/${blob.size}`); h.set('Content-Length', String(end - start + 1));
  return new Response(blob.slice(start, end + 1), { status: 206, statusText: 'Partial Content', headers: h });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== self.location.origin) return;
  const path = rel(req.url);
  if (path == null || path === 'sw.js' || path.startsWith('sw-manifest.json')) return;
  if (req.mode === 'navigate' || path === '' || path === 'index.html') {
    // network-first for the page (updates arrive), cache when offline
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) { const c = await caches.open(CACHE); c.put(new Request(u.origin + SCOPE), res.clone()).catch(() => {}); }
        return res;
      } catch (x) {
        const c = await caches.open(CACHE);
        return (await c.match(new Request(u.origin + SCOPE))) || Response.error();
      }
    })());
    return;
  }
  if (req.headers.has('range')) { if (!isMusic(path)) e.respondWith(rangeFrom(req, path)); return; }
  if (isMusic(path)) return; // music streams from the network, never cached
  e.respondWith(fromCacheOrNet(req, path).catch(() => fetch(req)));
});

// the page sends the files it loaded before the worker took control (first visit): copy them in from the HTTP cache
self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type !== 'warm' || !Array.isArray(d.urls)) return;
  e.waitUntil((async () => {
    const man = await loadManifest();
    const c = await caches.open(CACHE);
    let n = 0;
    for (const url of d.urls) {
      const path = rel(url); if (path == null || isMusic(path)) continue;
      const hash = man[path]; if (!hash) continue;
      const key = new Request(new URL(url).origin + SCOPE + path);
      if (await c.match(key)) continue;
      try { const res = await fetch(key, { cache: 'force-cache' }); if (res.ok && res.status === 200) { await store(c, key, res, hash); n++; } } catch (x) { /* offline */ }
    }
    e.source?.postMessage?.({ type: 'warmed', n });
  })());
});
