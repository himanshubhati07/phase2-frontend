import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import SignupView from './SignupView.vue'

test('renders without crashing', () => {
  mount(SignupView, { global: { plugins: [createPinia(), createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
