import { describe, expect, test, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LinkToEdit from '@/components/link-to-edit/index.vue'

describe('LinkToEditコンポーネント', () => {
  const mockTranslations: { [key: string]: string } = {
    linkToEdit: 'GitHubで編集を提案する',
  }

  beforeEach(() => {
    vi.stubGlobal('$t', (key: string) => mockTranslations[key] || key)
  })

  const baseUrl = 'https://github.com/hikkobay/blog/tree/main/'
  const props = {
    fileName: 'content/vitest',
  }

  const linkToEdit = shallowMount(LinkToEdit, {
    propsData: {
      ...props,
    },
    global: {
      config: {
        globalProperties: {
          $t: (key: string) => mockTranslations[key] || key,
        },
      },
    },
  })

  test('「GitHubで編集を提案する」というリンクが表示されている', () => {
    expect(linkToEdit.find('a').exists()).toBe(true)
    expect(linkToEdit.find('a').text()).toBe('GitHubで編集を提案する')
  })

  test(`遷移先が${baseUrl + props.fileName}である`, () => {
    expect(linkToEdit.attributes('href')).toBe(baseUrl + props.fileName)
  })

  test('外部リンクである', () => {
    expect(linkToEdit.attributes('target')).toBe('_blank')
  })
})
