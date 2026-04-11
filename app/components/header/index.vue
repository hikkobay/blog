<script setup lang="ts">
import Fuse from 'fuse.js'

const { isRevealed, reveal, cancel } = useConfirmDialog()
const keyword = ref('')
const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('content'))
const fuse = new Fuse(data.value ?? [], {
  keys: ['title', 'description'],
})

const results = computed(() => {
  if (!keyword.value) return []
  return fuse.search(toValue(keyword))
})

const resetSearchKeyword = () => {
  keyword.value = ''
  cancel()
}

// ナビゲーションメニューの表示・非表示状態を管理
const navigationVisibleStatus = ref<boolean>(false)

/**
 * ナビゲーションメニューの表示・非表示を切り替える
 * @param {Boolean} status - 表示する場合はtrue、非表示にする場合はfalse
 */
const toggleNavigationVisibleStatus = (status: boolean) => {
  navigationVisibleStatus.value = status
}

/**
 * ビューポートのサイズが変わった時にメニューが表示されていたら非表示にする
 */
const hideNavigationMenu = () => {
  if (!toggleNavigationVisibleStatus) return

  toggleNavigationVisibleStatus(false)
}

const navigationMenu = ref<HTMLElement | null>(null)
const navigationButton = ref<HTMLButtonElement | null>(null)

/**
 * ナビゲーションメニューが表示されている時に要素外のクリックを検知し、メニューを非表示にする
 * @param {Event} event - クリックイベントのオブジェクト
 */
const detectClickOutside = (event: Event) => {
  // ナビゲーションメニューが表示されていない場合は早期リターンする
  if (!navigationVisibleStatus.value) return

  if (
    event.target instanceof Node
    && !navigationMenu.value?.contains(event.target)
    && !navigationButton.value?.contains(event.target)
  ) {
    toggleNavigationVisibleStatus(false)
  }
}

onMounted(() => {
  window.addEventListener('resize', hideNavigationMenu)
  nextTick(() => {
    navigationMenu.value = document.querySelector('.navigation-menu')
    navigationButton.value = document.querySelector('.navigation-button')

    window.addEventListener('click', detectClickOutside)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', hideNavigationMenu)
  window.removeEventListener('click', detectClickOutside)
})
</script>

<template>
  <header>
    <div class="wrapper">
      <a
        href="/"
        class="link"
      >
        Blog
      </a>
      <nav class="navigation">
        <NuxtLinkLocale
          to="/about"
          class="link"
        >
          About
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/tags"
          class="link"
        >
          Tags
        </NuxtLinkLocale>
        <IconButton
          element="button"
          label="記事を検索する"
          @on-click="reveal"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/search.svg"
              alt=""
            >
          </template>
        </IconButton>
        <IconButton
          element="anchor-link"
          href="https://twitter.com/hikkobay"
          target="_blank"
          label="X(旧Twitter)を新しいタブで表示する"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/x-twitter.svg"
              alt=""
            >
          </template>
        </IconButton>
        <IconButton
          element="anchor-link"
          href="https://zenn.dev/splendente"
          target="_blank"
          label="Zennを新しいタブで表示する"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/zenn.svg"
              alt=""
            >
          </template>
        </IconButton>
        <IconButton
          element="anchor-link"
          href="https://github.com/hikkobay/blog"
          target="_blank"
          label="GitHubを新しいタブで表示する"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/github.svg"
              alt=""
            >
          </template>
        </IconButton>
        <!-- MEMO: nuxt-feedme does not compatible with Nuxt Content v3 -->
        <!-- <IconButton
          element="anchor-link"
          href="/feed.xml"
          target="_blank"
          label="RSSフィードを新しいタブで表示する"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/rss.svg"
              alt=""
            >
          </template>
        </IconButton> -->
        <IconButton
          element="button"
          :label="$i18n.locale === 'ja' ? 'Switch to English' : '日本語に切り替える'"
          @on-click="$i18n.setLocale($i18n.locale === 'ja' ? 'en' : 'ja')"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/language.svg"
              alt=""
            >
          </template>
        </IconButton>
        <ClientOnly fallback-tag="span">
          <IconButton
            v-if="$colorMode.value === 'light' || $colorMode.preference === 'light'"
            element="button"
            label="サイトのテーマをダークモードに切り替える"
            @on-click="$colorMode.preference = 'dark'"
          >
            <template #icon>
              <img
                width="16"
                height="16"
                src="@/assets/images/sun.svg"
                alt=""
              >
            </template>
          </IconButton>
          <IconButton
            v-else-if="$colorMode.value === 'dark' || $colorMode.preference === 'dark'"
            element="button"
            label="サイトのテーマをライトモードに切り替える"
            @on-click="$colorMode.preference = 'light'"
          >
            <template #icon>
              <img
                width="16"
                height="16"
                src="@/assets/images/moon.svg"
                alt=""
              >
            </template>
          </IconButton>
        </ClientOnly>
        <IconButton
          class="navigation-button"
          element="button"
          label="ナビゲーションメニューを表示する"
          @on-click="toggleNavigationVisibleStatus(!navigationVisibleStatus)"
        >
          <template #icon>
            <img
              width="16"
              height="16"
              src="@/assets/images/menu.svg"
              alt=""
            >
          </template>
        </IconButton>
      </nav>
      <NavigationMenu :visible="navigationVisibleStatus" />
    </div>
    <Modal
      :is-revealed="isRevealed"
      @outside-click="resetSearchKeyword"
    >
      <div class="modal-wrapper">
        <div class="modal-header">
          <button
            type="button"
            aria-label="モーダルを閉じる"
            class="close-button"
            @click="cancel()"
          >
            <img
              width="20"
              height="20"
              src="@/assets/images/cancel.svg"
              alt=""
            >
          </button>
        </div>
        <div class="modal-body">
          <SearchInput v-model="keyword" />
          <List
            :keyword="keyword"
            :items="results"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="reset-button"
            @click="keyword = ''"
          >
            検索条件をリセット
          </button>
        </div>
      </div>
    </Modal>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--primary-border-color);
  position: sticky;
  top: 0;
  background-color: var(--primary-bg-color);
  z-index: 10;
}

.wrapper {
  max-width: 1216px;
  padding: 16px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  display: block;
  text-decoration: none;
  color: var(--primary-text-color);
  position: relative;
}

.link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 12px;
}

.navigation > button.icon-button:last-child {
  display: none;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--primary-border-color);
  display: flex;
  justify-content: flex-end;
}

.modal-body {
  width: 100%;
  height: calc(100% - 96px);
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--primary-border-color);
  background-color: var(--primary-bg-color);
  width: 100%;
  padding: 24px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 16px;
  border-radius: 4px;
  transition: all 0.5s ease;
}

.reset-button {
  color: var(--primary-text-color);
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: var(--primary-bg-color);
  border: 1px solid var(--primary-border-color);
  transition: all 0.5s ease;
}

.reset-button:hover,
.close-button:hover {
  cursor: pointer;
  background-color: var(--secondary-bg-color);
}

@media (width < 640px) {
  .wrapper {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .navigation > a.icon-button, .navigation > .link {
    display: none;
  }
  .navigation > button.icon-button:last-child {
    display: block;
  }
}
</style>
