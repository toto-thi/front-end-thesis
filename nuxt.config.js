import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  head: {
    titleTemplate: '%s - TJ',
    title: 'TJ Charity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src: '~/plugins/persistedState.client.js', ssr: false },
    '~/plugins/router',
  ],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
    'vue-social-sharing/nuxt',
    'nuxt-sweetalert2'
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
      },
      {
        code: 'la',
        file: 'la-LAO.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'la',
    skipSettingLocaleOnNavigate: true,
  },

  axios: {
    baseURL: '/',
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blueGrey.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#44496c',
          accent: colors.indigo.accent2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.orange.darken2,
          error: colors.red.darken2,
          success: colors.green.darken2,
        },
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT,
      },
    },
  },

  build: {},
}
