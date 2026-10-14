import { Buffer } from 'node:buffer'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import aiTutorHandler from './api/ai-tutor.js'
import { defineConfig, loadEnv } from 'vite'

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    let tooLarge = false

    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      if (tooLarge) return
      size += Buffer.byteLength(chunk)
      if (size > 32 * 1024) {
        tooLarge = true
        chunks.length = 0
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (tooLarge) {
        reject(413)
        return
      }
      try {
        resolve(JSON.parse(chunks.join('')))
      } catch {
        reject(400)
      }
    })
    req.on('error', () => reject(400))
  })
}

function aiTutorDevPlugin() {
  return {
    name: 'ai-tutor-dev-api',
    apply: 'serve',
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir, '')
      for (const name of ['GEMINI_API_KEY', 'GEMINI_MODEL', 'AI_TUTOR_ENABLED']) {
        if (process.env[name] === undefined && env[name] !== undefined) {
          process.env[name] = env[name]
        }
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname
        if (pathname !== '/api/ai-tutor') {
          next()
          return
        }

        void (async () => {
          if (req.method === 'POST') {
            try {
              req.body = await readJsonBody(req)
            } catch (statusCode) {
              sendJson(res, statusCode, {
                error: statusCode === 413 ? 'Request body too large' : 'Invalid JSON body',
              })
              return
            }
          }

          const apiResponse = {
            status(statusCode) {
              res.statusCode = statusCode
              return this
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.end(JSON.stringify(payload))
              return this
            },
          }

          try {
            await aiTutorHandler(req, apiResponse)
          } catch {
            if (!res.headersSent) {
              sendJson(res, 500, { error: 'Internal server error' })
            }
          }
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aiTutorDevPlugin()],

  build: {
    // Target modern browsers for smaller, faster output
    target: 'es2020',

    // Warn at 600 KB (gzipped) — realistic for a content-rich kids app
    chunkSizeWarningLimit: 600,

    // Enable CSS code splitting — page-specific styles load on demand
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Manual chunk splitting to avoid bloating the initial bundle
        manualChunks(id) {
          // React core — loaded on every page, keep together
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // React Router — required for navigation
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // Motion (Framer Motion) — used only in Testimonials & LessonsSection
          if (id.includes('node_modules/motion')) {
            return 'motion';
          }
          // GSAP — keep isolated so it doesn't inflate the main bundle
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
          // Fontsource — split per font family to allow parallel loading
          if (id.includes('@fontsource/nunito')) {
            return 'font-nunito';
          }
          if (id.includes('@fontsource/lilita-one')) {
            return 'font-lilita';
          }
          // AiTutor — lazy loaded floating panel; keep in its own chunk
          if (id.includes('/components/AiTutor/')) {
            return 'ai-tutor';
          }
          // i18n translations — large module shared by all routes; isolate for cache efficiency
          if (id.includes('/data/i18n')) {
            return 'i18n';
          }
          // Lesson data is large — isolate it so the homepage doesn't carry it
          if (id.includes('/lessons/lesson-units') || id.includes('/lessons/grade12') || id.includes('/lessons/logic-g12')) {
            return 'lesson-data';
          }
        },
      },
    },
  },

  css: {
    devSourcemap: false,
  },
})
