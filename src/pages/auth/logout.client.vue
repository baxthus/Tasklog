<script>
const supabase = useSupabaseClient();

supabase.auth.signOut().then(() => navigateTo('/login'));
</script>

<template>
  Logging out...
</template>
