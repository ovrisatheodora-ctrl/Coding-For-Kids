import { test, expect } from './fixtures.js'

const unitId = 'logic-g12-pola'
const unitTitle = 'Mengenal Pola'
const unitUrl = '/lessons/logic-algorithms/units?grade=1-2&lang=id'

async function seedProgress(page, progress) {
  await page.addInitScript(({ key, value, seedKey }) => {
    if (sessionStorage.getItem(seedKey)) return
    localStorage.clear()
    if (value !== null) localStorage.setItem(key, value)
    sessionStorage.setItem(seedKey, 'done')
  }, {
    key: 'cfk_progress',
    value: progress === null ? null : JSON.stringify(progress),
    seedKey: '__e2e_learning_progress_seeded',
  })
}

async function openUnit(page) {
  await page.goto(unitUrl)
  await page.getByRole('button', { name: new RegExp(unitTitle) }).click()
  await expect(page.getByRole('heading', { name: unitTitle, exact: true })).toBeVisible()
}

async function completeUnit(page) {
  await page.getByRole('button', { name: 'Lanjut ke Aktivitas →' }).click()
  await expect(page.getByRole('heading', { name: 'Apa yang datang selanjutnya?' })).toBeVisible()
  await page.getByRole('button', { name: '🔵' }).click()
  await page.getByRole('button', { name: 'Cek jawaban' }).click()
  await expect(page.getByText('Hebat!')).toBeVisible()
  await page.getByRole('button', { name: 'Lanjut →' }).click()

  await expect(page.getByRole('heading', { name: 'Lanjutkan pola: 🐱🐶🐱🐶❓' })).toBeVisible()
  await page.getByRole('button', { name: '🐶' }).click()
  await page.getByRole('button', { name: 'Cek jawaban' }).click()
  await expect(page.getByText('Hampir! Coba lagi.')).toBeVisible()
  await page.getByRole('button', { name: '🐱' }).click()
  await page.getByRole('button', { name: 'Cek jawaban' }).click()
  await expect(page.getByText('Hebat!')).toBeVisible()
  await page.getByRole('button', { name: 'Lanjut →' }).click()

  await expect(page.getByRole('heading', { name: 'Buah apa yang melengkapi urutan ini: 🍎🍎🍌🍎🍎❓' })).toBeVisible()
  await page.getByRole('button', { name: '🍌' }).click()
  await page.getByRole('button', { name: 'Cek jawaban' }).click()
  await expect(page.getByText('Hebat!')).toBeVisible()
  await page.getByRole('button', { name: 'Lanjut →' }).click()

  await expect(page.getByRole('heading', { name: 'Kamu berhasil mencoba!' })).toBeVisible()
  await page.getByRole('button', { name: 'Lanjut →' }).click()
  await expect(page.getByRole('heading', { name: 'PELAJARAN SELESAI!' })).toBeVisible()
}

async function readStoredProgress(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('cfk_progress') || '{}'))
}

for (const [description, initialProgress] of [
  ['a fresh user', null],
  ['a user with existing progress', {
    xp: 40,
    stars: 8,
    badges: ['junior-coder'],
    completedLessons: [],
    completedUnits: [],
    completedGames: [],
    highScores: {},
    lessonStars: {},
    grade: '1-2',
    language: 'id',
  }],
]) {
  test(`learning unit reward is saved for ${description}`, async ({ page }) => {
    await seedProgress(page, initialProgress)
    await openUnit(page)
    await completeUnit(page)

    await expect(page.getByText('3 bintang didapat')).toBeVisible()
    await expect(page.getByText('20 XP didapat')).toBeVisible()
    await expect(page.getByText('Pattern Finder')).toBeVisible()

    const beforeReload = await readStoredProgress(page)
    const initialXp = initialProgress?.xp || 0
    const initialStars = initialProgress?.stars || 0
    expect(beforeReload.xp).toBe(initialXp + 20)
    expect(beforeReload.stars).toBe(initialStars + 2)
    expect(beforeReload.badges).toContain('pattern-finder')
    expect(beforeReload.completedUnits).toContain(unitId)
    expect(beforeReload.lessonStars[unitId]).toBe(3)

    await page.reload()
    await expect(page.getByRole('main')).toBeVisible()
    const afterReload = await readStoredProgress(page)
    expect(afterReload.xp).toBe(initialXp + 20)
    expect(afterReload.stars).toBe(initialStars + 2)
    expect(afterReload.badges).toContain('pattern-finder')
    expect(afterReload.completedUnits).toContain(unitId)
    expect(afterReload.lessonStars[unitId]).toBe(3)
  })
}

test('learning unit reports that progress cannot be saved when localStorage refuses writes', async ({ page }) => {
  await seedProgress(page, null)
  await openUnit(page)
  await page.evaluate(() => {
    Object.defineProperty(localStorage, 'setItem', {
      configurable: true,
      value() {
        throw new DOMException('Storage is read-only', 'QuotaExceededError')
      },
    })
  })

  await completeUnit(page)

  await expect(page.getByRole('status')).toContainText('Progress tidak dapat disimpan di perangkat ini.')
  await expect(page.getByText('20 XP didapat')).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('cfk_progress'))).toBeNull()
})
