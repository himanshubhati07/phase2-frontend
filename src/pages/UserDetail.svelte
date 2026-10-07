<script lang="ts">
  import ActivityContent from '../components/ActivityContent.svelte';
  import ActivityNavigation from '../components/ActivityNavigation.svelte';

  let { id }: { id: string } = $props();

  const activityDetails: Record<string, { title: string; emoji: string; prompt: string; choices: string[]; answer: string }> = {
    colors: { title: 'Colors', emoji: '🎨', prompt: 'Which one is red?', choices: ['🍓 Strawberry', '🥦 Broccoli', '🍋 Lemon'], answer: '🍓 Strawberry' },
    animals: { title: 'Animals', emoji: '🦁', prompt: 'Which animal says roar?', choices: ['🐱 Cat', '🦁 Lion', '🐟 Fish'], answer: '🦁 Lion' },
    numbers: { title: 'Numbers', emoji: '🔢', prompt: 'How many stars are here? ⭐ ⭐ ⭐', choices: ['Two', 'Three', 'Five'], answer: 'Three' },
    shapes: { title: 'Shapes', emoji: '⭐', prompt: 'Which shape has three sides?', choices: ['Circle', 'Triangle', 'Square'], answer: 'Triangle' }
  };

  let activity = $derived(activityDetails[id] ?? activityDetails.colors);
</script>

<section class="mx-auto max-w-3xl">
  <ActivityNavigation title={activity.title} />
  <ActivityContent
    emoji={activity.emoji}
    prompt={activity.prompt}
    choices={activity.choices}
    answer={activity.answer}
  />
</section>