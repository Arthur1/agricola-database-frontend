require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Agricola DB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  router: {
    trailingSlash: true,
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/:revision/cards/:page',
        component: resolve(__dirname, 'pages/_revision/cards/index.vue'),
      })
    },
  },

  generate: {
    fallback: true,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  dotenv: {
    filename: `.env.${process.env.NODE_ENV}`,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Agricola DB',
      short_name: 'AgricolaDB',
      description: 'This is Agricola DB.',
      lang: 'ja',
      theme_color: '#ff9800',
      background_color: '#ffffff',
    },
    meta: {
      ogType: 'website',
      ogSiteName: 'Agricola DB',
      ogDescription: 'This is Agricola DB.',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
