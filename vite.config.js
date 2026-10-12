import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

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
