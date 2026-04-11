import Tooltip from '@/components/tooltip/index.vue'

export default {
  title: 'components/tooltip',
  component: Tooltip,
  decorators: [
    () => ({
      template: '<div style="position: relative;"><story /></div>',
    }),
  ],
}

export const Default = {
  args: {
    text: '2024-1-1',
    top: 0,
    left: 0,
  },
}
