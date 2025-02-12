<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import type { ToastMessageOptions } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import { z } from 'zod';
import type { Database, Tables } from '~/types/database';

const supabase = useSupabaseClient<Database>();
const toast = useToast();
const confirm = useConfirm();

const notes = useLazyAsyncData(async () => {
  const { data, error } = await supabase.from('notes').select();
  if (error) {
    toast.add({
      summary: 'Error fetching notes',
      detail: error.message,
      severity: 'error',
      life: 3000,
    });
    return [];
  }
  // Sort by favorite and created_at in descending order
  data.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return data;
});

const search = ref('');
const filterFavorite = ref(false);

const filteredNotes = computed(() => {
  if (!notes.data.value) return [];
  return notes.data.value.filter((note) => {
    const matchesSearch = Object.keys(note).filter(key => !['id', 'favorite', 'user'].includes(key)).some(key =>
      note[key as keyof typeof note]?.toString().toLowerCase().includes(search.value.toLowerCase()),
    );
    const matchesFavorite = !filterFavorite.value || note.favorite;
    return matchesSearch && matchesFavorite;
  });
});

type CleanNote = Omit<Tables<'notes'>, 'id' | 'created_at' | 'user'>;
const noteSchema = z.object({
  name: z.string(),
  content: z.string().nullable().optional(),
  favorite: z.boolean().default(false),
});

const mode = ref<'view' | 'create' | 'edit'>('view');
const visible = ref(false);
const loading = ref(false);
const resolver = ref(zodResolver(noteSchema));
const selected = ref<Tables<'notes'>>();
const menu = ref();

const menuItems = ref<Array<MenuItem>>([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      mode.value = 'edit';
      visible.value = true;
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => confirm.require({
      header: 'Delete Note',
      message: `Are you sure you want to delete "${selected.value?.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      rejectProps: { label: 'No', severity: 'secondary' },
      acceptProps: { label: 'Yes', severity: 'danger' },
      accept: deleteNote,
    }),
  },
]);

async function onFormSubmit({ valid, values }: FormSubmitEvent) {
  if (!valid) return;

  loading.value = true;

  if (mode.value === 'edit') {
    const isChanged = Object.keys(values).some(key => values[key] !== selected.value![key as keyof typeof selected.value]);
    if (!isChanged) {
      toast.add({
        summary: 'No changes',
        severity: 'info',
        life: 3000,
      });
      loading.value = false;
      return;
    }
  }

  const action = mode.value === 'create'
    ? supabase.from('notes').insert(values as CleanNote)
    : supabase.from('notes').update(values).eq('id', selected.value!.id);

  const { error } = await action;
  loading.value = false;
  if (error) {
    toast.add({
      summary: 'Error saving note',
      detail: error.message,
      severity: 'error',
      life: 3000,
    });
    return;
  }

  toast.add({
    summary: 'Note saved',
    severity: 'success',
    life: 3000,
  });
  visible.value = false;
  notes.refresh();
}

async function deleteNote() {
  if (!selected.value) return;

  const loadingToast: ToastMessageOptions = {
    summary: 'Deleting note',
    detail: 'Please wait...',
    severity: 'info',
    closable: false,
  };
  toast.add(loadingToast);

  const { error } = await supabase.from('notes').delete().eq('id', selected.value.id);
  toast.remove(loadingToast);
  if (error) {
    toast.add({
      summary: 'Error deleting note',
      detail: error.message,
      severity: 'error',
      life: 3000,
    });
    return;
  }

  toast.add({
    summary: 'Note deleted',
    severity: 'success',
    life: 3000,
  });
  notes.refresh();
}
</script>

<template>
  <div>
    <h1 class="font-bold flex gap-x-4 items-center">
      <span class="text-3xl">Notes</span>
      <Button
        icon="pi pi-plus"
        severity="secondary"
        rounded
        @click="selected = undefined, mode = 'create'; visible = true"
      />
    </h1>
    <div class="flex gap-4 w-fit my-3 items-center">
      <InputGroup>
        <InputText v-model="search" placeholder="Search" size="small" />
        <Button
          v-if="search"
          icon="pi pi-times"
          severity="secondary"
          size="small"
          @click="search = ''"
        />
      </InputGroup>
      <!-- i don't like the implementation of this button :( -->
      <button
        class="px-0.5 mb-1 text-xl"
        :class="filterFavorite ? 'pi pi-star-fill' : 'pi pi-star'"
        @click="filterFavorite = !filterFavorite"
      />
    </div>
    <DataView :value="filteredNotes" data-key="id" unstyled class="mt-4">
      <template #list="{ items }">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="note in items"
            :key="note.id"
            class="px-4 py-3 border border-neutral-800 rounded-lg shadow-sm flex flex-col gap-2 bg-highlight hover:bg-highlight-emphasis"
            @contextmenu="selected = note; menu.show($event)"
            @click="selected = note; mode = 'view'; visible = true"
          >
            <h2 class="text-xl font-semibold">
              {{ note.name }}
            </h2>
            <p class="text-sm">
              {{ new Date(note.created_at).toLocaleString() }}
            </p>
            <Badge v-if="note.favorite" class="w-fit self-center">
              Favorite
            </Badge>
          </button>
        </div>
      </template>
      <template #empty>
        <ProgressSpinner v-if="notes.status.value === 'pending'" />
        <span v-else class="text-xl pl-1">No notes found</span>
      </template>
    </DataView>
  </div>
  <ContextMenu ref="menu" :model="menuItems" />

  <Dialog v-model:visible="visible" modal :header="mode === 'create' ? 'Create Note' : 'Note Details'" class="w-full sm:w-1/2 mx-2">
    <Form
      v-slot="$form"
      :resolver
      :initial-values="selected"
      class="flex flex-col gap-4 mt-1"
      @submit="onFormSubmit"
    >
      <FormField v-slot="$field" name="name" class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputText fluid :readonly="mode === 'view'" />
          <label for="name">Name</label>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field?.error?.message }}
          </Message>
        </FloatLabel>
      </FormField>
      <FormField v-slot="$field" name="content" class="flex flex-col gap-1">
        <Editor editor-style="height: 320px" :readonly="mode === 'view'" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field?.error?.message }}
        </Message>
      </FormField>
      <FormField v-slot="$field" name="favorite" class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <Checkbox input-id="favorite" :disabled="mode === 'view'" binary />
          <label for="favorite">Favorite</label>
        </div>
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field?.error?.message }}
        </Message>
      </FormField>
      <Button
        v-if="mode !== 'view'"
        type="submit"
        label="Save"
        :loading
        :disabled="!$form.valid || loading"
      />
    </Form>
  </Dialog>
</template>
