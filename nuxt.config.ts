import localization from './src/assets/primevue/localization';
import theme from './src/assets/primevue/theme';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
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

  srcDir: 'src/',
  serverDir: 'src/server/',
  compatibilityDate: '2024-11-01',

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
