<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import TopBar from '../components/TopBar.vue'
</script>

<template>
  <div class="min-h-screen bg-canvas lg:flex">
    <Sidebar />
    <div class="min-w-0 flex-1">
      <TopBar />
      <main class="p-6 lg:p-10">
        <router-view />
      </main>
    </div>
  </div>
</template>
