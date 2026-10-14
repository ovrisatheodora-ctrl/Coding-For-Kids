import { test, expect } from './fixtures.js'

const knownRoutes = [
  {
    name: 'lessons page',
    path: '/lessons',
    heading: 'PELAJARAN DI KOLEKSI INI',
  },
  {
    name: 'learning unit page',
    path: '/lessons/logic-algorithms/learn?grade=1-2&lang=id&unit=logic-g12-pola',
    heading: 'Mengenal Pola',
  },
  {
    name: 'unit catalog page',
    path: '/lessons/logic-algorithms/units?grade=1-2&lang=id',
    button: /Mengenal Pola/,
  },
  {
    name: 'game page',
    path: '/games/pattern-adventure',
    heading: 'Lengkapi pola!',
  },
  {
    name: 'About page',
    path: '/about',
    heading: 'Tentang Coding for Kids',
  },
]

for (const route of knownRoutes) {
  test(`${route.name} renders directly and survives reload`, async ({ page }) => {
    await page.goto(route.path)
    await expect(page.getByRole('main')).toBeVisible()
    if (route.heading) {
      await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible()
    }
    if (route.button) {
      await expect(page.getByRole('button', { name: route.button })).toBeVisible()
    }

    await page.reload()

    await expect(page.getByRole('main')).toBeVisible()
    if (route.heading) {
      await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible()
    }
    if (route.button) {
      await expect(page.getByRole('button', { name: route.button })).toBeVisible()
    }
  })
}

test('unknown URL shows the app not-found page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')

  await expect(page.getByRole('heading', { name: 'Oops! Page Not Found' })).toBeVisible()
  await expect(page.getByRole('link', { name: '← Go Home' })).toBeVisible()
})

test('unknown lesson shows its not-found state without a page error', async ({ page }) => {
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/lessons/unknown-lesson-id')

  await expect(page.getByRole('heading', { name: 'Lesson not found' })).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('unknown unit shows the app not-found page without a page error', async ({ page }) => {
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/lessons/logic-algorithms/learn?grade=1-2&lang=id&unit=unknown-unit-id')

  await expect(page.getByRole('heading', { name: 'Oops! Page Not Found' })).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('unknown game shows the app not-found page without a page error', async ({ page }) => {
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/games/unknown-game-id')

  await expect(page.getByRole('heading', { name: 'Oops! Page Not Found' })).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('server returns 404 for a missing static asset and 200 for health', async ({ page }) => {
  const assetResponse = await page.request.get('/assets/does-not-exist.js')
  expect(assetResponse.status()).toBe(404)
  expect(assetResponse.headers()['content-type']).toContain('application/json')
  expect(await assetResponse.text()).not.toContain('<html')

  const healthResponse = await page.request.get('/health')
  expect(healthResponse.status()).toBe(200)
  await expect(healthResponse.json()).resolves.toEqual({ status: 'ok' })
})

test('server security headers are present and home page has no CSP console violation', async ({ page }) => {
  const cspMessages = []
  page.on('console', (message) => {
    if (/content security policy|csp violation|refused to (?:load|execute)/i.test(message.text())) {
      cspMessages.push(message.text())
    }
  })

  const response = await page.goto('/')
  expect(response).not.toBeNull()
  const headers = response.headers()
  expect(headers['content-security-policy']).toContain("default-src 'self'")
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['permissions-policy']).toContain('camera=()')
  await expect(page.getByRole('main')).toBeVisible()
  expect(cspMessages).toEqual([])
})

test('inner route has no CSP console violation', async ({ page }) => {
  const cspMessages = []
  page.on('console', (message) => {
    if (/content security policy|csp violation|refused to (?:load|execute)/i.test(message.text())) {
      cspMessages.push(message.text())
    }
  })

  await page.goto('/lessons/logic-algorithms/learn?grade=1-2&lang=id&unit=logic-g12-pola')

  await expect(page.getByRole('heading', { name: 'Mengenal Pola', exact: true })).toBeVisible()
  expect(cspMessages).toEqual([])
})
