<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar :image="user?.user_metadata.avatar_url" size="xlarge" shape="circle" />
    <div class="flex flex-col">
      <span class="text-lg font-bold">
        {{ user?.user_metadata.user_name ?? 'User' }}
      </span>
      <span class="text-sm">{{ user?.email }}</span>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="secondary"
        size="small"
        class="mt-2"
        @click="navigateTo('/auth/logout')"
      />
    </div>
  </div>
</template>
