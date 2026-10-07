import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import TaskEditView from './TaskEditView.vue'

test('renders without crashing', () => {
  mount(TaskEditView, { global: { plugins: [createPinia(), createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
