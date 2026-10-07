<script lang="ts">
  import { ArrowLeft, Home } from '@lucide/svelte';
  import { navigate } from 'svelte-routing';

  let { title }: { title: string } = $props();
</script>

<div class="mb-6 flex items-center justify-between">
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-violet-700 shadow-sm hover:bg-violet-50"
    onclick={() => navigate('/dashboard')}
  >
    <ArrowLeft size={19} />
    All activities
  </button>
  <div class="flex items-center gap-2 font-extrabold text-slate-700">
    <Home size={19} class="text-violet-500" />
    {title}
  </div>
</div>
