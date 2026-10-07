<script lang="ts">
  import { Home, Sparkles } from '@lucide/svelte';
  import { Link } from 'svelte-routing';
</script>

<header class="flex items-center justify-between border-b border-violet-100 bg-white px-5 py-4 shadow-sm">
  <Link to="/dashboard" class="flex items-center gap-2 text-xl font-extrabold text-violet-600">
    <Sparkles size={25} />
    Little Learners
  </Link>
  <Link
    to="/dashboard"
    class="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 font-bold text-violet-700 hover:bg-violet-200"
  >
    <Home size={18} />
    Home
  </Link>
</header>