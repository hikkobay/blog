import Card from '@/components/card/index.vue'

export default {
  title: 'components/card',
  component: Card,
}

export const Default = {
  args: {
    to: '#',
    emoji: '&#127881;',
    title:
      'タイトルが入ります。ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
    description:
      '説明が入ります。ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
    createdAt: '2024-1-1',
    tags: ['JavaScript', 'Vue.js'],
  },
}
