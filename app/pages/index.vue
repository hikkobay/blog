<script setup lang="ts">
const route = useRoute()
const title = route.query.tag ? `${route.query.tag}` : (route.path === '/en' ? 'All' : 'すべて')

useHead({
  title: `${title}の記事一覧`,
  titleTemplate: null,
})

defineOgImage('NuxtSeo', {
  title: `${title}の記事一覧`,
})

const { desc, toggleSort } = useSort()

const { data: articleList, refresh } = await useAsyncData('articles', () => {
  return queryCollection('content')
    .where('published', '=', true)
    .andWhere((query) => {
      return query.where('tags', 'LIKE', route.query.tag ? `%${route.query.tag}%` : '%')
    })
    .select('path', 'emoji', 'title', 'description', 'createdAt', 'tags')
    .order('createdAt', desc.value ? 'DESC' : 'ASC')
    .all()
})

watch(desc, () => {
  refresh()
})

const date = new Date()
const targetYear = ref<number>(date.getFullYear())

/**
 * contentディレクトリ配下のコンテンツの全ての情報を取得する
 */
const { data: page } = await useAsyncData('content', () => {
  return queryCollection('content')
    .select('createdAt', 'updatedAt')
    .all()
})

/**
 * コンテンツの作成日と更新日を取得する
 * @returns {Array} - 日付情報
 */
const activeDates = computed(() => {
  // 作成日と更新日を格納する配列
  const createdAtAndUpdatedAt: string[] = []

  // コンテンツが存在した場合のみ実行
  if (page.value && 0 < page.value.length) {
    page.value.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key === 'createdAt' || key === 'updatedAt') {
          // 既に同一稼働日がある場合、配列への追加は行わない
          if (!createdAtAndUpdatedAt.includes(obj[key])) {
            // 重複しない場合、配列に日付を追加する
            createdAtAndUpdatedAt.push(obj[key])
          }
        }
      })
    })
  }

  return createdAtAndUpdatedAt
})

const tags = ref<(string | undefined)[]>([])

const { data } = await useAsyncData('tags', () => {
  return queryCollection('content')
    .select('tags')
    .all()
})

if (data.value) {
  tags.value = [...new Set(data.value.flatMap(values => values.tags))]
}
</script>

<template>
  <main>
    <div class="heatmap">
      <YearSelect
        v-model="targetYear"
        class="year-select"
      />
      <CalendarHeatmap
        :target-year="Number(targetYear)"
        :active-dates="activeDates"
        :title="title"
      />
    </div>
    <div class="title-wrapper">
      <h1 class="title">
        {{ title }}
        <span>{{ $t('heading') }}</span>
      </h1>
      <div class="buttons">
        <TagMenu :tags="tags" />
        <SortMenu
          :desc="desc"
          @toggle-sort="toggleSort"
        />
      </div>
    </div>
    <div class="lists">
      <Card
        v-for="(article, index) in articleList"
        :key="index"
        :to="article.path"
        :emoji="article.emoji"
        :title="article.title"
        :description="article.description"
        :created-at="article.createdAt"
        :tags="article.tags"
      />
    </div>
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

.heatmap {
  margin-bottom: 48px;
}

.heatmap .year-select {
  margin-left: auto;
  margin-bottom: 24px;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.title {
  font-size: 32px;
  color: var(--primary-text-color);
}

.title > span {
  font-size: 16px;
  color: var(--primary-text-color);
  margin-left: 8px;
}

.lists {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.buttons {
  display: flex;
  gap: 0 16px;
}

@media (width < 768px) {
  .lists {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width < 576px) {
  .title-wrapper {
    display: block;
  }
  .title-wrapper > .buttons {
    margin-top: 16px;
  }
  .lists {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
