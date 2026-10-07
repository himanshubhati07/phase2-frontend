<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Layout from './components/Layout.svelte';
  import Redirect from './components/Redirect.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import UserDetail from './pages/UserDetail.svelte';
  import Login from './pages/Login.svelte';
  import NotFound from './pages/NotFound.svelte';
</script>

<Router>
  <Route path="/login"><Login /></Route>
  <Route path="/"><Redirect to="/dashboard" /></Route>
  <Route path="/dashboard"><Layout><Dashboard /></Layout></Route>
  <Route path="/activity/:id" let:params><Layout><UserDetail id={params.id} /></Layout></Route>
  <Route path="/activities/:id" let:params><Layout><UserDetail id={params.id} /></Layout></Route>
  <Route path="*"><NotFound /></Route>
</Router>