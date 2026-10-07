<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import TopBar from './TopBar.svelte';
  let { children } = $props();
</script>

<div class="flex h-screen bg-surface">
  <Sidebar />
  <div class="flex flex-1 flex-col overflow-hidden">
    <TopBar />
    <main class="flex-1 overflow-y-auto p-6">{@render children()}</main>
  </div>
</div>