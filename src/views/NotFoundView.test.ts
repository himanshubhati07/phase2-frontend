import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import NotFoundView from './NotFoundView.vue'

test('renders without crashing', () => {
  mount(NotFoundView, { global: { plugins: [createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
