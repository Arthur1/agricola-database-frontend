import axios from 'axios'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  env: {
    frontendVersion: process.env.npm_package_version || 'unknown',
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Agricola DB',
    titleTemplate: '%s - Agricola DB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fontsource/roboto/index.css',
    'noto-sans-jp/noto_sans_jp_regular/css.css',
    '@/assets/scss/app.scss',
  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/:revision/cards/:page',
        component: resolve(__dirname, 'pages/_revision/cards/index.vue'),
      })
    },
  },

  generate: {
    fallback: true,
    concurrency: process.env.CONCURRENCY || 500,
    async routes() {
      const cardsPages = []
      const cardPagesList = []
      for (let page = 1; ; page++) {
        const res = await axios.get(`${process.env.API_BASE_URL}/AG1/cards`, {
          params: { page },
        })
        await new Promise((resolve) => {
          setTimeout(resolve, 800)
        })
        if (!res.data.cards.length) break
        if (page === 1) {
          cardsPages[0] = {
            route: `/AG1/cards`,
            payload: res.data,
          }
        }
        cardsPages[page] = {
          route: `/AG1/cards/${page}`,
          payload: res.data,
        }
        cardPagesList[page - 1] = res.data.cards.map((card) => ({
          route: `/AG1/card/${card.literal_id}`,
          payload: card,
        }))
      }
      const cardPages = [].concat.apply([], cardPagesList)
      return [...cardsPages, ...cardPages]
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
  ],

  dotenv: {
    filename: `.env.${process.env.NODE_ENV}`,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    debug: {
      enabled: process.env.NODE_ENV !== 'production',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
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
      description:
        'ボードゲーム「アグリコラ」に関する情報をまとめたWebサイトです。製品版の全てのカードを掲載する予定です。（現在は旧版のカードのみ掲載。）',
      lang: 'ja',
      theme_color: '#ff9800',
      background_color: '#ffffff',
    },
    meta: {
      ogType: 'website',
      ogSiteName: 'Agricola DB',
      ogDescription:
        'ボードゲーム「アグリコラ」に関する情報をまとめたWebサイトです。製品版の全てのカードを掲載する予定です。（現在は旧版のカードのみ掲載。）',
      ogHost: process.env.BASE_URL,
    },
  },

  sitemap: {
    hostname: process.env.BASE_URL,
  },

  robots: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        UserAgent: '*',
        Disallow: '',
        Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
      }
    } else {
      return {
        UserAgent: '*',
        Disallow: '/',
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
