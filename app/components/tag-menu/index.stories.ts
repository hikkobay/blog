import { userEvent, within } from 'storybook/test'

import type { GlobalTypes } from 'storybook/internal/types'

import ja from './../../../i18n/locales/ja'
import en from './../../../i18n/locales/en'

import TagMenu from '@/components/tag-menu/index.vue'

const messages: { ja: Record<string, string>, en: Record<string, string> } = {
  ja: ja,
  en: en,
}

export default {
  title: 'components/tag-menu',
  component: TagMenu,
  render: (args: { tags: string[] }, { globals }: { globals: GlobalTypes }) => ({
    components: { TagMenu },
    setup() {
      const locale = globals.locale || 'ja'
      const app = getCurrentInstance()?.appContext.app
      if (app) {
        app.config.globalProperties.$t = (key: string) => locale === 'ja' ? messages.ja[key] || key : messages.en[key] || key
      }
      return { ...args }
    },
    template: `
      <TagMenu :tags='tags' />
    `,
  }),
}

const tags = ['Vue.js', 'React', 'Angular', 'Svelte']

export const Default = {
  args: {
    tags: tags,
  },
}

export const WithSelected = {
  args: {
    tags: tags,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    const selectButton = canvas.getByRole('button', { name: 'タグで絞り込む' })

    userEvent.click(selectButton)
  },
}
