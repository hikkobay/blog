import IconButton from '@/components/icon-button/index.vue'

type Args = {
  element: string
  type: string
  to: string
  href: string
  target: string
  label: string
}

export default {
  title: 'components/icon-button',
  component: IconButton,
  render: (args: Args) => ({
    components: { IconButton },
    setup() {
      return { ...args }
    },
    template: `
      <IconButton v-bind="{ ...args }">
        <template #icon>
          <img src="/app/assets/images/github.svg" width="16" height="16" style="display:block;" alt="" />
        </template>
      </IconButton>
    `,
  }),
}

export const Button = {
  args: {
    element: 'button',
    label: 'ラベル',
  },
}

export const AnchorLink = {
  args: {
    element: 'anchor-link',
    href: '#',
    target: '_self',
    label: 'ラベル',
  },
}

export const NuxtLink = {
  args: {
    element: 'nuxt-link',
    to: '#',
    target: '_blank',
    label: 'ラベル',
  },
}
