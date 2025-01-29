<script setup lang="ts">
import 'primeicons/primeicons.css';
</script>

<template>
  <div class="flex flex-col h-screen m-4">
    <NuxtPage />
  </div>

  <Toast position="bottom-right" />
  <ConfirmDialog />
</template>
