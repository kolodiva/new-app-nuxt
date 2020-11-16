//const colors = require('vuetify/es5/util/colors').default
const path = require('path')
const fs = require('fs')
//const webpack = require('webpack')


module.exports = {

  components: true,
  // server: {
  //     https: {
  //       key: fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
  //       cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
  //     }
  //   },
  telemetry: false,
  env: {
    // PGUSER: 'postgres',
  },
  //mode: 'universal',
  //mode: 'spa',
  /*
   ** Headers of the page
   */
  router: {
  //   base: '/'
    //middleware: 'stats'
  },
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s',
    htmlAttrs: {
        lang: 'ru',
      },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'description', content: 'Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
         {src: "/src/jquery.min.js"},
         {src: "/src/jquery.stickr.min.js"},
         {src: "/src/jquery.morecontent.min.js"},
         {src: "https://widget.cdek.ru/widget/widjet.js", id: "ISDEKscript", charset: "utf-8"},
         {src: "https://api-maps.yandex.ru/2.1/?apikey=a0730179-856a-47bc-bc4a-eab5cf8d185a&lang=ru_RU", type: "text/javascript"},
     ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
     '@/assets/style/_reboot.scss',
     'animate.css'
  ],

// '~/api/index.js'
  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
        {
          path: "/api",
          handler: (req, res, next) => {
            const url = require("url");
            req.query = url.parse(req.url, true).query;
            req.params = { ...req.query, ...req.body };
            next();
          }
        },
        { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
          /*'~plugins/vuetify.js'*/
    // {src: '~/plugins/vue-pdf.js', mode: 'client'},
    // {src: '~/plugins/vue-zoomer.js', mode: 'client'},
    // {src: '~/plugins/vue-inject.js', mode: 'client'},
    // {src: '~/plugins/crypto-js.js'},
    {src: '~/plugins/hello.js' },
    {src: '~/plugins/api-context.client.js'},
    {src: '~/plugins/api-context.server.js'},
    {src: '~/plugins/crypto-js.js'},
    //{src: '~/plugins/read-more-js.js', mode: 'client'},
    //{src: '~/plugins/jq.js', mode: 'client'},
    //{src: '~/plugins/jq2.js', mode: 'client'},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/component-cache',
    '@nuxtjs/style-resources',
    '@nuxtjs/robots',
    // ['@nuxtjs/yandex-metrika',
    //   {
    //     id: '51108848',
    //     webvisor: true,
    //     clickmap:true,
    //     trackLinks:true,
    //     accurateTrackBounce:true
    //   }],
    //'@nuxtjs/auth',
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  styleResources: {
        scss: [
            '@/assets/style/_const.scss'
        ]
    },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  axios: {
    // proxyHeaders: false
    proxy: true,
     //baseURL: 'http://127.0.0.1:3000/api'
  },

  // auth: {
  //     localStorage: false,
  //     strategies: {
  //       local: {
  //         token: {
  //           property: 'token',
  //           required: true,
  //           type: false,
  //           maxAge: 60 * 60 * 24 * 30
  //          },
  //         endpoints: {
  //           login: { url: '/api/loginUser', method: 'post' },
  //           user: { url: '/api/userAuth', method: 'get' },
  //           logout: false,
  //         },
  //       }
  //     },
  //   },

  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3,
    //     },
    //   },
    // },
  },
  /*
   ** Build configuration
   */
  build: {
    // vendor: ['vuetify'],
    /*
     ** You can extend webpack config here
     */
     // vendor: ['jquery'],
     //
     // plugins: [
     //
     //       new webpack.ProvidePlugin({
     //         $: 'jquery',
     //         jQuery: 'jquery',
     //         'window.jQuery': 'jquery'
     //       })
     //     ],

    //transpile: ['jquery'],

    parallel: true,
    cache: true,
    hardSource: true,
    extend(config, ctx) {

      config.module.rules.push({
              test: /\.(ogg|mp3|wav|mpe?g)$/i,
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            })

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }

    },
  },
}
