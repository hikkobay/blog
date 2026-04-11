<script setup lang="ts">
const router = useRouter()
const route = useRoute()

/**
 * 現在のページの情報を取得する
 */
const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

/**
 * 現在のページの前後のページ情報を取得する
 */
const { data } = await useAsyncData('pager', () => {
  return queryCollectionItemSurroundings(
    'content',
    route.path,
    {
      fields: ['path', 'title', 'description'],
    },
  ).where('published', '=', true)
})

useHead({
  title: doc.value?.title,
  meta: [
    { name: 'description', content: doc.value?.description },
    { property: 'og:title', content: doc.value?.title },
    { property: 'og:description', content: doc.value?.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://www.hikaru-kobayashi.me${route.path}` },
    { property: 'og:image', content: 'https://www.hikaru-kobayashi.me/images/hikkobay.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: `https://www.hikaru-kobayashi.me${route.path}` },
  ],
})

defineOgImage('NuxtSeo', {
  title: doc.value?.title,
})
</script>

<template>
  <main>
    <article>
      <div class="blog-header">
        <time
          v-if="doc?.createdAt"
          class="created-at"
          :datetime="doc.createdAt"
        >
          {{ formatDateString(doc.createdAt) }}
        </time>
        <h1 class="title">
          {{ doc?.title }}
        </h1>
        <p class="description">
          {{ doc?.description }}
        </p>
        <div class="tags">
          <Tag
            v-for="tag in doc?.tags"
            :key="tag"
            element="nuxt-link"
            :to="`/?tag=${tag}`"
            :text="tag"
          />
        </div>
      </div>
      <div class="content-wrapper">
        <div class="share-button-component">
          <p>{{ $t('share') }}</p>
          <ShareButton
            title="記事をシェアする"
            text="この記事をシェアしよう！"
            :url="router.currentRoute.value.fullPath"
          />
        </div>
        <div id="nuxt-content">
          <Toc
            v-if="doc?.body?.toc"
            class="toc-component-sp"
            :items="doc.body.toc"
          />
          <ContentRenderer
            v-if="doc"
            :value="doc"
          />
        </div>
        <Toc
          v-if="doc?.body?.toc"
          class="toc-component-pc"
          :items="doc.body.toc"
        />
      </div>
    </article>
    <div class="link-box">
      <LinkToBack />
      <LinkToEdit
        v-if="doc?.id"
        :file-name="doc.id"
      />
    </div>
    <Pager
      v-if="data"
      :prev-page="data[0]"
      :next-page="data[1]"
    />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  width: 100%;
  max-width: 1216px;
  margin: 0 auto;
  padding: 32px 16px;
}

.blog-header {
  text-align: center;
  padding-bottom: 32px;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--primary-border-color);
}

.title {
  font-size: 32px;
  color: var(--primary-text-color);
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: var(--primary-text-color);
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.created-at {
  font-size: 14px;
  color: var(--primary-text-color);
  margin-bottom: 16px;
}

.link-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--primary-border-color);
  border-bottom: 1px solid var(--primary-border-color);
  padding: 32px 0;
  margin: 32px 0;
}

.toc-component-sp {
  margin-bottom: 48px;
}

.share-button-component, .toc-component-pc {
  display: none;
}

.share-button-component > p {
  font-size: 14px;
  color: var(--primary-text-color);
  font-weight: bold;
  margin-bottom: 8px;
}

@media (width > 768px) {
  .content-wrapper {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) 200px;
    gap: 0 32px;
  }
  .toc-component-sp {
    display: none;
  }
  .toc-component-pc {
    display: block;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 90px;
  }
  .share-button-component {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 90px;
  }
}
</style>
