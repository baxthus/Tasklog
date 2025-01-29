<script setup lang="ts">
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import type { FormSubmitEvent } from '@primevue/forms';
import { passwordSchema } from '~/types/password';

const supabase = useSupabaseClient();
const toast = useToast();

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }).email('Invalid email'),
  password: passwordSchema,
});

const resolver = ref(zodResolver(loginSchema));
const loading = ref(false);

async function onFormSubmit({ valid, values }: FormSubmitEvent) {
  if (!valid) return;

  loading.value = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  loading.value = false;
  if (error) {
    toast.add({
      summary: 'Error logging in',
      detail: error.message,
      severity: 'error',
      life: 3000,
    });
    return;
  }

  toast.add({
    summary: 'Logged in',
    severity: 'success',
    life: 3000,
  });

  navigateTo('/');
}

async function signInWithGithub() {
  loading.value = true;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/auth/callback',
    },
  });
  loading.value = false;
  if (error) {
    toast.add({
      summary: 'Error logging in',
      detail: error.message,
      severity: 'error',
      life: 3000,
    });
    return;
  }

  navigateTo('/');
}
</script>

<template>
  <div class="flex flex-col items-center">
    <Panel>
      <template #header>
        <h1 class="text-2xl font-bold">
          Login
        </h1>
      </template>
      <Form v-slot="$form" :resolver class="flex flex-col gap-4 w-full sm:w-80" @submit="onFormSubmit">
        <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
          <InputText type="email" placeholder="Email" fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
          <Password placeholder="Password" :feedback="false" toggle-mask fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>
        <Button type="submit" label="Login" :loading :disabled="!$form.valid || loading" />
        <Button label="Login with Github" icon="pi pi-github" severity="secondary" @click="signInWithGithub" />
      </Form>
    </Panel>
  </div>
</template>
