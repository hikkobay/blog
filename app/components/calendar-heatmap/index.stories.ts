import type { GlobalTypes } from 'storybook/internal/types'

import ja from './../../../i18n/locales/ja'
import en from './../../../i18n/locales/en'

import CalendarHeatmap from '@/components/calendar-heatmap/index.vue'
import type { CalendarHeatmapProps } from '@/types'

const messages: { ja: Record<string, string>, en: Record<string, string> } = {
  ja: ja,
  en: en,
}

export default {
  title: 'components/calendar-heatmap',
  component: CalendarHeatmap,
  render: (args: CalendarHeatmapProps, { globals }: { globals: GlobalTypes }) => ({
    components: { CalendarHeatmap },
    setup() {
      const locale = globals.locale || 'ja'
      const app = getCurrentInstance()?.appContext.app
      if (app) {
        app.config.globalProperties.$t = (key: string) => locale === 'ja' ? messages.ja[key] || key : messages.en[key] || key
      }
      return { ...args }
    },
    template: `
      <CalendarHeatmap :target-year="targetYear" :active-dates="activeDates" :title="title" />
    `,
  }),
}

export const Default = {
  args: {
    targetYear: 2023,
    activeDates: ['2023-01-01', '2023-07-19', '2023-12-31'],
    title: 'すべて',
  },
}
