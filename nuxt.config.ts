import tailwindcss from '@tailwindcss/vite';
import localization from './src/assets/primevue/localization';
import theme from './src/assets/primevue/theme';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxt/fonts',
    '@nuxtjs/supabase',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Tasklog',
    },
  },
  css: ['~/assets/css/main.css'],

  srcDir: 'src/',
  serverDir: 'src/server/',
  compatibilityDate: '2024-11-01',

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        indent: 2,
        quotes: 'single',
      },
    },
  },

  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Geist',
        global: true,
      },
    ],
  },

  primevue: {
    options: {
      theme: {
        preset: theme,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'base, primevue',
          },
        },
      },
      ripple: true,
      locale: localization,
    },
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/auth/callback',
    },
  },
});
