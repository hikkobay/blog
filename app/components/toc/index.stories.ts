import type { GlobalTypes } from 'storybook/internal/types'

import ja from './../../../i18n/locales/ja'
import en from './../../../i18n/locales/en'

import Toc from '@/components/toc/index.vue'
import type { TocProps } from '@/types'

const messages: { ja: Record<string, string>, en: Record<string, string> } = {
  ja: ja,
  en: en,
}

export default {
  title: 'components/toc',
  component: Toc,
  render: (args: TocProps, { globals }: { globals: GlobalTypes }) => ({
    components: { Toc },
    setup() {
      const locale = globals.locale || 'ja'
      const app = getCurrentInstance()?.appContext.app
      if (app) {
        app.config.globalProperties.$t = (key: string) => locale === 'ja' ? messages.ja[key] || key : messages.en[key] || key
      }
      return { ...args }
    },
    template: `
      <Toc :items='items' />
    `,
  }),

}

const items = {
  title: '目次のダミーデータ',
  searchDepth: 0,
  links: [
    {
      id: '1',
      depth: 1,
      text: '1章',
    },
    {
      id: '2',
      depth: 2,
      text: '2章',
    },
    {
      id: '3',
      depth: 3,
      text: '3章',
    },
  ],
}

export const Default = {
  args: {
    items: items,
  },
}
