import { Buffer } from 'node:buffer';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { handleAiTutorRequest } from './api/ai-tutor.js';
import { securityHeaders } from './server/security-headers.js';

const DIST_DIRECTORY = resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const MAX_BODY_BYTES = 32 * 1024;
const BODY_READ_TIMEOUT_MS = 10_000;
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendJson(res, statusCode, body) {
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(body));
}

function readJsonBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let size = 0;
    let settled = false;
    const chunks = [];
    const timer = setTimeout(() => fail(408), BODY_READ_TIMEOUT_MS);
    timer.unref();

    function finish() {
      settled = true;
      clearTimeout(timer);
    }

    function fail(statusCode) {
      if (settled) return;
      finish();
      req.removeListener('data', onData);
      req.removeListener('end', onEnd);
      req.resume();
      rejectBody(statusCode);
    }

    function onData(chunk) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        fail(413);
        return;
      }
      chunks.push(chunk);
    }

    function onEnd() {
      if (settled) return;
      finish();
      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        rejectBody(400);
      }
    }

    req.once('error', () => fail(400));
    req.once('aborted', () => fail(400));
    req.on('data', onData);
    req.once('end', onEnd);

    const contentLength = Number(req.headers['content-length']);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      fail(413);
    }
  });
}

async function serveStatic(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(res, 400, { error: 'Invalid path' });
    return;
  }

  const candidate = resolve(DIST_DIRECTORY, `.${decodedPath}`);
  const relativePath = relative(DIST_DIRECTORY, candidate);
  if (relativePath === '..' || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    sendJson(res, 400, { error: 'Invalid path' });
    return;
  }

  let filePath = candidate;
  if (pathname === '/') filePath = resolve(DIST_DIRECTORY, 'index.html');

  let fileInfo;
  try {
    fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error('Not a file');
  } catch {
    if (!req.headers.accept?.includes('text/html')) {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }
    filePath = resolve(DIST_DIRECTORY, 'index.html');
    try {
      fileInfo = await stat(filePath);
    } catch {
      sendJson(res, 500, { error: 'Application is not built' });
      return;
    }
  }

  res.writeHead(200, {
    'Cache-Control': filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=3600',
    'Content-Length': fileInfo.size,
    'Content-Type': MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream',
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.once('error', () => {
    if (res.headersSent) {
      res.destroy();
    } else {
      sendJson(res, 500, { error: 'Unable to serve file' });
    }
  });
  stream.pipe(res);
}

async function handleRequest(req, res) {
  securityHeaders(req, res, () => {
    void (async () => {
      let pathname;
      try {
        pathname = new URL(req.url || '/', 'http://localhost').pathname;
      } catch {
        sendJson(res, 400, { error: 'Invalid request' });
        return;
      }

      if (pathname === '/health') {
        if (req.method !== 'GET') {
          res.setHeader('Allow', 'GET');
          sendJson(res, 405, { error: 'Method not allowed' });
          return;
        }
        sendJson(res, 200, { status: 'ok' });
        return;
      }

      if (pathname === '/api/ai-tutor') {
        if (req.method !== 'POST') {
          const result = await handleAiTutorRequest(req);
          res.setHeader('Allow', 'POST');
          sendJson(res, result.status, result.body);
          return;
        }

        if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
          sendJson(res, 415, { error: 'Content-Type must be application/json' });
          return;
        }

        try {
          req.body = await readJsonBody(req);
        } catch (statusCode) {
          sendJson(res, statusCode, {
            error: statusCode === 413 ? 'Request body too large' : 'Invalid or incomplete request body',
          });
          return;
        }

        const result = await handleAiTutorRequest(req);
        sendJson(res, result.status, result.body);
        return;
      }

      if (pathname.startsWith('/api/')) {
        sendJson(res, 404, { error: 'Not found' });
        return;
      }

      await serveStatic(req, res, pathname);
    })().catch(() => {
      sendJson(res, 500, { error: 'Internal server error' });
    });
  });
}

const port = Number(process.env.PORT || '3000');
if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be a valid TCP port');
}

const server = createServer(handleRequest);
server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;
server.listen(port, '0.0.0.0', () => {
  console.info(`HTTP server listening on 0.0.0.0:${port}`);
});
