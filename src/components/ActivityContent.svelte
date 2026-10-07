<script lang="ts">
  import { CheckCircle2, RotateCcw } from '@lucide/svelte';

  let {
    emoji,
    prompt,
    choices,
    answer
  }: {
    emoji: string;
    prompt: string;
    choices: string[];
    answer: string;
  } = $props();

  let selectedChoice = $state('');
  let hasAnswered = $state(false);
  let isCorrect = $derived(selectedChoice === answer);

  function chooseAnswer(choice: string) {
    selectedChoice = choice;
    hasAnswered = true;
  }

  function tryAgain() {
    selectedChoice = '';
    hasAnswered = false;
  }
</script>

<div class="rounded-3xl bg-white p-6 text-center shadow-lg sm:p-10">
  <div class="mb-4 text-7xl" aria-hidden="true">{emoji}</div>
  <p class="text-sm font-extrabold uppercase tracking-wider text-violet-500">Fun question</p>
  <h2 class="mt-2 text-3xl font-extrabold text-slate-800">{prompt}</h2>

  <div class="mx-auto mt-8 grid max-w-xl gap-3">
    {#each choices as choice}
      <button
        type="button"
        class={selectedChoice === choice
          ? isCorrect
            ? 'rounded-2xl border-2 border-emerald-400 bg-emerald-100 px-5 py-4 text-xl font-bold text-emerald-800'
            : 'rounded-2xl border-2 border-rose-400 bg-rose-100 px-5 py-4 text-xl font-bold text-rose-800'
          : 'rounded-2xl border-2 border-violet-100 bg-violet-50 px-5 py-4 text-xl font-bold text-slate-700 hover:border-violet-400 hover:bg-violet-100'}
        onclick={() => chooseAnswer(choice)}
      >
        {choice}
      </button>
    {/each}
  </div>

  {#if hasAnswered && isCorrect}
    <div class="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-emerald-100 p-4 text-lg font-extrabold text-emerald-700">
      <CheckCircle2 size={24} />
      Great job! You got it!
    </div>
  {:else if hasAnswered}
    <div class="mt-7 rounded-2xl bg-amber-100 p-4 text-lg font-bold text-amber-800">
      Nice try! Pick another answer.
      <button
        type="button"
        class="ml-2 inline-flex items-center gap-1 underline"
        onclick={tryAgain}
      >
        <RotateCcw size={16} />
        Try again
      </button>
    </div>
  {/if}
</div>
