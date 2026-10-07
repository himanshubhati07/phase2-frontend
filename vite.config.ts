import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 55939,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
});