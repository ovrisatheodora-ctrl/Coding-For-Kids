import { test, expect } from './fixtures.js'

const apiRoute = '**/api/ai-tutor'
const inputLabel = 'Ketik pertanyaanmu di sini...'
const staticHint = 'Coba pikirkan: apa langkah pertama yang perlu kamu lakukan?'

async function openAiTutor(page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'TANYA AI' }).click()
  await expect(page.getByRole('dialog', { name: 'Asisten Coding' })).toBeVisible()
}

async function mockReply(page, status, body) {
  await page.route(apiRoute, (route) => route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  }))
}

test('AI Tutor shows a successful mocked reply', async ({ page }) => {
  await openAiTutor(page)
  await mockReply(page, 200, { reply: 'Coba susun langkahnya satu per satu.' })

  await page.getByLabel(inputLabel).fill('Bagaimana menyusun algoritma?')
  await page.getByRole('button', { name: 'Kirim' }).click()

  await expect(page.getByRole('log')).toContainText('Bagaimana menyusun algoritma?')
  await expect(page.getByRole('log')).toContainText('Coba susun langkahnya satu per satu.')
})

for (const status of [429, 503]) {
  test(`AI Tutor uses the static hint after mocked HTTP ${status}`, async ({ page }) => {
    await openAiTutor(page)
    await mockReply(page, status, { error: 'mocked failure' })

    await page.getByLabel(inputLabel).fill('Tolong bantu aku belajar coding')
    await page.getByRole('button', { name: 'Kirim' }).click()

    await expect(page.getByRole('log')).toContainText(staticHint)
  })
}

test('AI Tutor uses the static hint after a mocked network abort', async ({ page }) => {
  await openAiTutor(page)
  await page.route(apiRoute, (route) => route.abort('failed'))

  await page.getByLabel(inputLabel).fill('Tolong bantu aku belajar coding')
  await page.getByRole('button', { name: 'Kirim' }).click()

  await expect(page.getByRole('log')).toContainText(staticHint)
})

test('AI Tutor submits input at the 300 character limit', async ({ page }) => {
  await openAiTutor(page)
  let submittedMessage
  await page.route(apiRoute, async (route) => {
    submittedMessage = route.request().postDataJSON().message
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ reply: 'Pertanyaan diterima.' }),
    })
  })

  const input = page.getByLabel(inputLabel)
  await input.fill('a'.repeat(350))
  await expect(input).toHaveValue('a'.repeat(300))
  await page.getByRole('button', { name: 'Kirim' }).click()

  await expect.poll(() => submittedMessage).toHaveLength(300)
  await expect(page.getByRole('log')).toContainText('Pertanyaan diterima.')
})

test('AI Tutor cooldown blocks another send until the controlled time advances', async ({ page }) => {
  await openAiTutor(page)
  await page.clock.install()
  let requestCount = 0
  await page.route(apiRoute, async (route) => {
    requestCount += 1
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ reply: 'Petunjuk diterima.' }),
    })
  })

  const input = page.getByLabel(inputLabel)
  const send = page.getByRole('button', { name: 'Kirim' })
  await input.fill('Pertanyaan pertama')
  await send.click()
  await expect(page.getByRole('log')).toContainText('Petunjuk diterima.')
  await expect(send).toBeDisabled()

  await page.clock.runFor(2_999)
  await expect(send).toBeDisabled()
  await page.clock.runFor(1)
  await input.fill('Pertanyaan kedua')
  await expect(send).toBeEnabled()
  await send.click()

  await expect.poll(() => requestCount).toBe(2)
})

test('AI Tutor falls back to the static hint when the reply is empty', async ({ page }) => {
  await openAiTutor(page)
  await mockReply(page, 200, { reply: '' })
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.getByLabel(inputLabel).fill('Pertanyaan dengan balasan kosong')
  await page.getByRole('button', { name: 'Kirim' }).click()

  await expect(page.getByRole('log')).toContainText('Pertanyaan dengan balasan kosong')
  await expect(page.getByRole('log')).toContainText(staticHint)
  await expect(page.getByRole('main')).toHaveCount(1)
  expect(pageErrors).toEqual([])
})

test('AI Tutor falls back to the static hint when the reply field is missing', async ({ page }) => {
  await openAiTutor(page)
  await mockReply(page, 200, {})
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.getByLabel(inputLabel).fill('Question with missing response')
  await page.getByRole('button', { name: 'Kirim' }).click()

  await expect(page.getByRole('log')).toContainText('Question with missing response')
  await expect(page.getByRole('log')).toContainText('💡 Think about it: what\'s the very first step you need to take? Read the question carefully again!')
  await expect(page.getByRole('main')).toHaveCount(1)
  expect(pageErrors).toEqual([])
})
