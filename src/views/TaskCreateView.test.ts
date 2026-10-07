import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import TaskCreateView from './TaskCreateView.vue'

test('renders without crashing', () => {
  mount(TaskCreateView, { global: { plugins: [createPinia(), createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
