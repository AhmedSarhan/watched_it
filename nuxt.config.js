module.exports = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'watched-it',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: 'Watched it' },
      {
        hid: 'description',
        name: 'description',
        content:
          'a movies web app with all the latest movies and tv shows, you will find any movie at our website',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://use.fontawesome.com/bf14e03edb.js',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/core-components'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/color-mode'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // VERCEL_URL = "https://watched-it.vercel.app/",

  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseUrl: 'https://localhost:3050',
    baseUrl: 'https://watched-it-25.herokuapp.com/',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/users/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: true,
          user: {
            url: '/api/users/user',
            method: 'get',
            propertyName: 'user',
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/auth', // User will be redirected to this path if login is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      home: '/', // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },
};
