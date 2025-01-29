<script>
const supabase = useSupabaseClient();

await supabase.auth.signOut();
navigateTo('/login');
</script>

<template>
  Logging out...
</template>
