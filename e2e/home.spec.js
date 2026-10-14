import { test, expect } from './fixtures.js'

const nav = (page) => page.getByRole('navigation', { name: 'Main navigation' })

async function seedProgress(page, state) {
  await page.addInitScript(({ key, value, seedKey }) => {
    if (sessionStorage.getItem(seedKey)) return
    localStorage.clear()
    if (value !== null) localStorage.setItem(key, value)
    sessionStorage.setItem(seedKey, 'done')
  }, { key: 'cfk_progress', value: state, seedKey: '__e2e_progress_seeded' })
}

test('home page loads for a fresh user', async ({ page }) => {
  await seedProgress(page, null)
  await page.goto('/')

  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'BELAJAR CODING. BERMAIN. KREATIF. SERU!' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Beranda' })).toHaveAttribute('aria-current', 'page')
})

test('main navigation opens Lessons, Games, and About', async ({ page }) => {
  await seedProgress(page, null)
  await page.goto('/')

  await nav(page).getByRole('link', { name: 'Pelajaran' }).click()
  await expect(page).toHaveURL(/\/lessons$/)
  await expect(page.getByRole('heading', { name: 'PELAJARAN DI KOLEKSI INI' })).toBeVisible()

  await nav(page).getByRole('link', { name: 'Games' }).click()
  await expect(page).toHaveURL(/\/games$/)
  await expect(page.getByRole('heading', { name: 'PETUALANGAN CODING' })).toBeVisible()

  await nav(page).getByRole('link', { name: 'Tentang' }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('main')).toBeVisible()
})

test('language switch updates the home page and persists after reload', async ({ page }) => {
  await seedProgress(page, null)
  await page.goto('/')

  await expect(page.getByText('Belajar coding untuk anak SD melalui permainan, aktivitas interaktif, dan tantangan kreatif.')).toBeVisible()
  await page.getByRole('button', { name: 'Switch to English' }).click()

  await expect(page.getByText('Learn coding for elementary students through games, interactive activities, and creative challenges.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Switch to Bahasa Indonesia' })).toBeVisible()

  await page.reload()

  await expect(page.getByText('Learn coding for elementary students through games, interactive activities, and creative challenges.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Switch to Bahasa Indonesia' })).toBeVisible()
})

for (const [description, storedProgress] of [
  ['empty progress data', '{}'],
  ['corrupted progress data', '{invalid json'],
]) {
  test(`home navigation remains available with ${description}`, async ({ page }) => {
    await seedProgress(page, storedProgress)
    await page.goto('/')

    await expect(page.getByRole('main')).toBeVisible()
    await nav(page).getByRole('link', { name: 'Pelajaran' }).click()
    await expect(page).toHaveURL(/\/lessons$/)
    await expect(page.getByRole('heading', { name: 'PELAJARAN DI KOLEKSI INI' })).toBeVisible()
  })
}
