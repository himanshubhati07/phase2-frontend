<script lang="ts">
  import ActivityCardGrid from '../components/ActivityCardGrid.svelte';

  const activities = [
    { id: 'colors', title: 'Colors', emoji: '🎨', description: 'Match bright colors', color: 'bg-pink-100' },
    { id: 'animals', title: 'Animals', emoji: '🦁', description: 'Meet friendly animals', color: 'bg-amber-100' },
    { id: 'numbers', title: 'Numbers', emoji: '🔢', description: 'Count from one to five', color: 'bg-sky-100' },
    { id: 'shapes', title: 'Shapes', emoji: '⭐', description: 'Find fun shapes', color: 'bg-violet-100' }
  ];
</script>

<section class="mx-auto max-w-5xl text-center">
  <p class="mb-2 text-lg font-semibold text-pink-500">Let’s play and learn!</p>
  <h2 class="text-4xl font-extrabold text-slate-800">What would you like to learn?</h2>
  <p class="mx-auto mt-3 max-w-xl text-lg text-slate-600">
    Pick an activity and have fun discovering something new.
  </p>

  <ActivityCardGrid {activities} />
</section>