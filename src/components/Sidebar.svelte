<script lang="ts">
  import { Home, Sparkles } from '@lucide/svelte';
  import { Link } from 'svelte-routing';
</script>

<aside class="hidden w-52 flex-col bg-violet-500 p-4 text-white md:flex">
  <Link
    to="/dashboard"
    class="mb-10 flex items-center gap-2 px-2 text-xl font-extrabold"
  >
    <Sparkles size={24} />
    Little Learners
  </Link>

  <nav>
    <Link
      to="/dashboard"
      getProps={({ isCurrent }) => ({
        class: isCurrent
          ? 'flex items-center gap-3 rounded-2xl bg-white/25 px-4 py-3 font-bold'
          : 'flex items-center gap-3 rounded-2xl px-4 py-3 font-bold hover:bg-white/15'
      })}
    >
      <Home size={20} />
      Learning Home
    </Link>
  </nav>
</aside>