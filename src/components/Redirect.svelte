<script lang="ts">
  import { navigate } from 'svelte-routing';
  let { to }: { to: string } = $props();
  $effect(() => { navigate(to, { replace: true }); });
</script>