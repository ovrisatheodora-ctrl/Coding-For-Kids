import { expect, test } from './fixtures.js'

test('Block Builder runs a correct level-one program without page errors', async ({ page }) => {
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/games/block-builder')

  await expect(page.getByRole('heading', { name: 'Ayo susun blok!' })).toBeVisible()
  await page.getByRole('button', { name: 'Tambah maju' }).click()
  await page.getByRole('button', { name: 'Tambah maju' }).click()
  await page.getByRole('button', { name: 'Jalankan', exact: true }).click()

  await expect(page.getByRole('status').getByText('Hebat! Robot sampai ke bintang!')).toBeVisible()
  expect(pageErrors).toEqual([])
})
