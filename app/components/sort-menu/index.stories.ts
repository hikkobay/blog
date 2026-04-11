import type { GlobalTypes } from 'storybook/internal/types'

import ja from './../../../i18n/locales/ja'
import en from './../../../i18n/locales/en'

import SortMenu from '@/components/sort-menu/index.vue'

const messages: { ja: Record<string, string>, en: Record<string, string> } = {
  ja: ja,
  en: en,
}

export default {
  title: 'components/sort-menu',
  component: SortMenu,
  render: (args: { desc: boolean }, { globals }: { globals: GlobalTypes }) => ({
    components: { SortMenu },
    setup() {
      const locale = globals.locale || 'ja'
      const app = getCurrentInstance()?.appContext.app
      if (app) {
        app.config.globalProperties.$t = (key: string) => locale === 'ja' ? messages.ja[key] || key : messages.en[key] || key
      }
      return { ...args }
    },
    template: `
      <SortMenu :desc='desc' />
    `,
  }),
}

export const Desc = {
  args: {
    desc: true,
  },
}

export const Asc = {
  args: {
    desc: false,
  },
}
