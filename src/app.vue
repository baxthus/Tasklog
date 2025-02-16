<script setup lang="ts">
import 'primeicons/primeicons.css';
import { Toaster } from 'vue-sonner';
</script>

<template>
  <div class="flex flex-col h-screen m-4">
    <NuxtPage />
  </div>

  <Toaster position="top-right" theme="dark" rich-colors />
  <ConfirmDialog />
</template>
