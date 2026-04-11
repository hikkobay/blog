import { test, expect } from '@playwright/test'

test('ページタイトルが正しいこと', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveTitle('すべての記事一覧')
  await expect(page.getByRole('heading', { name: 'すべて の記事一覧' })).toBeVisible()
})

test('「Blog」というリンクが表示されていること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()
})

test('「Blog」をクリックすると、記事一覧画面に遷移すること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const blogLink = page.getByRole('link', { name: 'Blog' })
  await expect(blogLink).toBeVisible()
  await blogLink.click()

  await expect(page).toHaveURL('http://localhost:3000')
  await expect(page).toHaveTitle('すべての記事一覧')
  await expect(page.getByRole('heading', { name: 'すべて の記事一覧' })).toBeVisible()
})

test('ヘッダー内の「About」をクリックすると、Aboutページに遷移すること', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const aboutLink = page.locator('.navigation').getByRole('link', { name: 'About' })
  await expect(aboutLink).toBeVisible()
  await aboutLink.click()

  await expect(page).toHaveURL('http://localhost:3000/about')
  await expect(page).toHaveTitle('Hikaru Kobayashi')
})

test('ヘッダー内の「Tags」をクリックすると、Tagsページに遷移すること', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const tagsLink = page.locator('.navigation').getByRole('link', { name: 'Tags' })
  await expect(tagsLink).toBeVisible()
  await tagsLink.click()

  await expect(page).toHaveURL('http://localhost:3000/tags')
  await expect(page).toHaveTitle('タグ一覧')
})

test('Xのボタンをクリックすると、Xのプロフィールが別タブで開くこと', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('.navigation').getByRole('link', { name: 'X(旧Twitter)を新しいタブで表示する' }).click(),
  ])

  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL('https://x.com/hikkobay')
})

test('GitHubのボタンをクリックすると、GitHubが別タブで開くこと', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('.navigation').getByRole('link', { name: 'GitHubを新しいタブで表示する' }).click(),
  ])

  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL('https://github.com/hikkobay/blog')
})

test('Zennのボタンをクリックすると、Zennのプロフィールが別タブで開くこと', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.use.isMobile === true, 'モバイルデバイスではスキップ')

  await page.goto('http://localhost:3000')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('.navigation').getByRole('link', { name: 'Zennを新しいタブで表示する' }).click(),
  ])

  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL('https://zenn.dev/splendente')
})

test('記事一覧が表示されていること', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page.locator('.card')).not.toBeNull()
})

test('昇順に並び替えるボタンをクリックすると、降順に並び替えるボタンが表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const descButton = page.locator('.desc')
  await expect(descButton).toBeVisible()
  await descButton.click()

  const ascButton = page.locator('.asc')
  await expect(ascButton).toBeVisible({ timeout: 10000 })
})

test('記事が昇順に並び替えられていることを確認する', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  // 初期状態（降順）の記事一覧を取得
  const initialArticles = await page.locator('.card .created-at').allTextContents()

  // 昇順ボタンをクリック
  const descButton = page.locator('.desc')
  await expect(descButton).toBeVisible()
  await descButton.click()

  await page.waitForTimeout(1000) // ソートの完了を待機

  // クリック後の記事一覧を取得
  const sortedArticles = await page.locator('.card .created-at').allTextContents()

  // 初期状態の配列を昇順にソートして比較
  const expectedArticles = [...initialArticles].sort((a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateA.getTime() - dateB.getTime()
  })

  expect(sortedArticles).toEqual(expectedArticles)
})

test('「タグで絞り込む」が表示されていること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('.tag-menu').getByRole('button', { name: 'タグで絞り込む' })).toBeVisible()
})

test('「タグで絞り込む」をクリックすると、タグの選択肢が表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const tagMenuButton = page.locator('.tag-menu').getByRole('button', { name: 'タグで絞り込む' })
  await expect(tagMenuButton).toBeVisible()
  await tagMenuButton.click()

  await expect(page.locator('.menu').getByRole('link', { name: 'Nuxt' })).toBeVisible({ timeout: 10000 })
})

test('タグの選択肢をクリックすると、選択されたタグで絞り込みされること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const tagMenuButton = page.locator('.tag-menu').getByRole('button', { name: 'タグで絞り込む' })
  await expect(tagMenuButton).toBeVisible()
  await tagMenuButton.click()

  const nuxtTagLink = page.locator('.tag-menu').getByRole('link', { name: 'Nuxt' })
  await expect(nuxtTagLink).toBeVisible()
  await nuxtTagLink.click()

  await expect(page).toHaveURL('http://localhost:3000/?tag=Nuxt')
  await expect(page).toHaveTitle('Nuxtの記事一覧')
  await expect(page.getByRole('heading', { name: 'Nuxt の記事一覧' })).toBeVisible()
})

test('タグでフィルタリングされた記事が正しいことを確認する', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const tagMenuButton = page.locator('.tag-menu').getByRole('button', { name: 'タグで絞り込む' })
  await expect(tagMenuButton).toBeVisible()
  await tagMenuButton.click()

  const nuxtTagLink = page.locator('.menu').getByRole('link', { name: 'Nuxt' })
  await expect(nuxtTagLink).toBeVisible()
  await nuxtTagLink.click()

  await page.waitForURL('http://localhost:3000/?tag=Nuxt')
  await page.waitForLoadState('networkidle')

  const articles = await page.locator('.card .tags').allTextContents()
  articles.forEach((tagList) => {
    expect(tagList).toContain('Nuxt')
  })
})

test('カレンダーのヒートマップが正しく表示されていることを確認する', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('.calendar-heatmap')).toBeVisible()
})

test('「Terms and Privacy」というリンクが表示されていること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('link', { name: 'Terms and Privacy' })).toBeVisible()
})

test('「Terms and Privacy」をクリックすると、利用規約とプライバシーポリシー画面に遷移すること', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const termsLink = page.getByRole('link', { name: 'Terms and Privacy' })
  await expect(termsLink).toBeVisible()
  await termsLink.click()

  await expect(page).toHaveURL('http://localhost:3000/terms-and-privacy')
  await expect(page).toHaveTitle('利用規約とプライバシーポリシー')
  await expect(page.getByRole('heading', { name: '利用規約とプライバシーポリシー' })).toBeVisible()
})
