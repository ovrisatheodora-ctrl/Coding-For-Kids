import { expect, test as base } from '@playwright/test'

const allowedHosts = new Set(['127.0.0.1', 'localhost', '[::1]'])

export const test = base.extend({
  page: async ({ page }, use) => {
    const externalRequests = []

    await page.context().route('**/*', async (route) => {
      const requestUrl = new URL(route.request().url())
      if (allowedHosts.has(requestUrl.hostname)) {
        await route.continue()
        return
      }

      externalRequests.push(requestUrl.origin)
      await route.abort()
    })

    const providePage = use
    await providePage(page)

    expect(externalRequests, 'browser requests must stay on local origins').toEqual([])
  },
})

export { expect }
