// Dependency-free preview server. Run from any directory: node scripts/preview.mjs
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    // Only serve the deployable site, never Git metadata or local files.
    const allowed = pathname === '/' || pathname === '/index.html' || /^\/assets\/[\w-]+\.(css|js|svg)$/.test(pathname);
    if (!allowed) { response.writeHead(404); response.end('Not found'); return; }
    const file = path.join(root, pathname === '/' ? 'index.html' : pathname.slice(1));
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));
server.on('error', error => { console.error(`Preview failed: ${error.message}`); process.exitCode = 1; });
