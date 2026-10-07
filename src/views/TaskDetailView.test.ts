import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import TaskDetailView from './TaskDetailView.vue'

test('renders without crashing', () => {
  mount(TaskDetailView, { global: { plugins: [createPinia(), createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
