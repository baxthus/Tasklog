<script setup lang="ts">
const event = useEvent();

const { code, next } = getQuery(event);

if (code) {
  const supabase = useSupabaseClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code as string);
  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  await navigateTo(next as string | undefined ?? '/');
}

throw createError({ statusCode: 400, message: 'Invalid code' });
</script>

<template>
  <p>Validating...</p>
</template>
