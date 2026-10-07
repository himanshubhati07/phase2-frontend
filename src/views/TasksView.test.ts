import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import TasksView from './TasksView.vue'

test('renders without crashing', () => {
  mount(TasksView, { global: { plugins: [createPinia(), createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
