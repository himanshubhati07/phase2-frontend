<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';
  import { navigate } from 'svelte-routing';

  let {
    id,
    title,
    emoji,
    description,
    color
  }: {
    id: string;
    title: string;
    emoji: string;
    description: string;
    color: string;
  } = $props();

  const openActivity = () => navigate(`/activity/${id}`);
</script>

<button
  type="button"
  class={`group min-h-64 rounded-3xl p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${color}`}
  onclick={openActivity}
>
  <span class="mb-5 block text-6xl" aria-hidden="true">{emoji}</span>
  <h3 class="text-2xl font-extrabold text-slate-800">{title}</h3>
  <p class="mt-2 text-base font-medium text-slate-600">{description}</p>
  <span class="mt-5 flex items-center gap-2 font-bold text-violet-700">
    Let's play
    <ArrowRight size={19} class="transition group-hover:translate-x-1" />
  </span>
</button>
