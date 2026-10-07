<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template><main class="grid min-h-screen place-items-center bg-canvas p-6 text-center"><div><p class="text-sm font-bold text-primary">404</p><h1 class="mt-3 text-4xl font-bold">Page not found</h1><p class="mt-3 text-muted">The page you requested doesn't exist or has moved.</p><RouterLink to="/" class="mt-6 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Go home</RouterLink></div></main></template>
