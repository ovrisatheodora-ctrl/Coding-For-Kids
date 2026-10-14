import { defineConfig } from '@playwright/test'
import process from 'node:process'

const port = 4173

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'npm run build && npm start',
    url: `http://127.0.0.1:${port}/health`,
    env: {
      PORT: String(port),
      AI_TUTOR_ENABLED: 'false',
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
