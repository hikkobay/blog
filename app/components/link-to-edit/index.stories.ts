import type { GlobalTypes } from 'storybook/internal/types'

import ja from './../../../i18n/locales/ja'
import en from './../../../i18n/locales/en'

import LinkToEdit from '@/components/link-to-edit/index.vue'

const messages: { ja: Record<string, string>, en: Record<string, string> } = {
  ja: ja,
  en: en,
}

export default {
  title: 'components/link-to-edit',
  component: LinkToEdit,
  render: (args: { fileName: string }, { globals }: { globals: GlobalTypes }) => ({
    components: { LinkToEdit },
    setup() {
      const locale = globals.locale || 'ja'
      const app = getCurrentInstance()?.appContext.app
      if (app) {
        app.config.globalProperties.$t = (key: string) => locale === 'ja' ? messages.ja[key] || key : messages.en[key] || key
      }
      return { ...args }
    },
    template: `
      <LinkToEdit :file-name="file-name" />
    `,
  }),
}

export const Default = {
  args: {
    fileName: '',
  },
}
