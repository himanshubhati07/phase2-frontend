<script lang="ts">
  import ActivityCard from './ActivityCard.svelte';

  type Activity = {
    id: string;
    title: string;
    emoji: string;
    description: string;
    color: string;
  };

  let { activities }: { activities: Activity[] } = $props();
</script>

<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  {#each activities as activity (activity.id)}
    <ActivityCard {...activity} />
  {/each}
</div>
