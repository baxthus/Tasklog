<script>
const supabase = useSupabaseClient();

onMounted(async () => {
  await supabase.auth.signOut();
  navigateTo('/login');
});
</script>

<template>
  Logging out...
</template>
