<script setup lang="ts">
onMounted(async () => {
  const event = useRequestEvent()!;
  const { code, next } = getQuery(event);

  if (code) {
    const supabae = useSupabaseClient();

    const { error } = await supabae.auth.exchangeCodeForSession(code as string);
    if (error) {
      throw createError({ statusCode: 500, message: error.message });
    }

    navigateTo(next as string | undefined ?? '/');
  } else {
    throw createError({ statusCode: 400, message: 'Missing code' });
  }
});
</script>

<template>
  <div>Validating...</div>
</template>
