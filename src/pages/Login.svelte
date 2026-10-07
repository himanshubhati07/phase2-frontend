<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { localLogin } from '../auth/auth';

  let email = '';
  let password = '';
  let errorMessage = '';

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault();
    const isAuthenticated = await localLogin(email, password);
    if (!isAuthenticated) {
      errorMessage = 'Invalid email or password';
      return;
    }

    navigate('/dashboard');
  };
</script>

<form onsubmit={handleLogin}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
  {#if errorMessage}<p>{errorMessage}</p>{/if}
</form>