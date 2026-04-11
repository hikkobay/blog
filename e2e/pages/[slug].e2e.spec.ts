import { test, expect } from '@playwright/test'

test('記事ページが正しく表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000/nuxt-og-image')

  await expect(page.getByRole('heading', { name: 'nuxt-og-imageで日本語フォントを指定する方法' })).toBeVisible()
  await expect(page.locator('.created-at')).toHaveText('Mon Apr 07 2025')
  await expect(page.locator('.tags')).toBeVisible()
  await expect(page.locator('#nuxt-content')).toBeVisible()
})

test('シェアボタンが正しく動作すること', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000/nuxt-og-image')

  const shareButton = page.locator('.share-button-component button')
  await expect(shareButton).toBeVisible()

  await shareButton.click() // 実際のシェア動作はブラウザ依存のため、ここでは確認しない
})

test('「一覧に戻る」というボタンをクリックすると記事一覧画面に遷移すること', async ({ page }) => {
  await page.goto('http://localhost:3000/nuxt-og-image')

  const backButton = page.locator('.link-to-back')
  await expect(backButton).toBeVisible()
  await backButton.click()

  await expect(page).toHaveURL('http://localhost:3000')
})

test('「GitHubで編集をリクエストする」というボタンをクリックするとGitHubが別タブで開くこと', async ({ page, context }) => {
  await page.goto('http://localhost:3000/nuxt-og-image')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('.page-edit-link').click(),
  ])

  await newPage.waitForLoadState()
  const nuxtOgImageUrl = 'https://github.com/hikkobay/blog/blob/main/content/23.nuxt-og-image.md'
  await expect(newPage).toHaveURL(nuxtOgImageUrl)
})

test('前後の記事リンクが正しく表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000/nuxt-og-image')

  const prevLink = page.locator('.prev-page')
  const nextLink = page.locator('.next-page')

  await expect(prevLink).toBeVisible()
  await expect(nextLink).toBeVisible()
})
