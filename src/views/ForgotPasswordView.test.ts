import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { test } from 'vitest'
import ForgotPasswordView from './ForgotPasswordView.vue'

test('renders without crashing', () => {
  mount(ForgotPasswordView, { global: { plugins: [createRouter({ history: createMemoryHistory(), routes: [] })] } })
})
