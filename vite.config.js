import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Keep chunk warnings at a sensible threshold
    chunkSizeWarningLimit: 500,

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
          // GSAP — not actually used in any component currently, keep isolated
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
          // Fontsource — split per font family
          if (id.includes('@fontsource/nunito')) {
            return 'font-nunito';
          }
          if (id.includes('@fontsource/lilita-one')) {
            return 'font-lilita';
          }
        },
      },
    },
  },

  css: {
    // Enable lightningcss for faster CSS processing (Vite 5+)
    // devSourcemap: true,
  },
})
