//const colors = require('vuetify/es5/util/colors').default
const path = require('path')
const fs = require('fs')
//const webpack = require('webpack')


module.exports = {

  //version: pkg.version,

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
    //titleTemplate: '%s',
    htmlAttrs: {
        lang: 'ru',
      },
    title: 'МЕБЕЛЬНАЯ ФУРНИТУРА | ВСЕ ДЛЯ МЕБЕЛИ | МФ-КОМПЛЕКТ | купить мебельную фурнитуру оптом и в розницу | Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://securepayments.sberbank.ru/payment/docsite/assets/css/modal.css' },
      { rel: "canonical", href: 'https://newfurnitura.ru/', hid: "canonical" }
    ],
    script: [
         {src: "/src/jquery.min.js"},
         {src: "/src/jquery.stickr.min.js"},
         {src: "/src/jquery.morecontent.min.js"},
         //{src: "/src/xlsx.mini.min.js"},
         {src: "https://widget.cdek.ru/widget/widjet.js", id: "ISDEKscript", charset: "utf-8"},
         {src: "https://api-maps.yandex.ru/2.1/?apikey=a0730179-856a-47bc-bc4a-eab5cf8d185a&lang=ru_RU", type: "text/javascript"},
         // {src: "https://securepayments.sberbank.ru/payment/docsite/assets/js/ipay.js"},
         {src: "https://3dsec.sberbank.ru/payment/docsite/assets/js/ipay.js"},
         //{src: "/src/vue.min.js"},
         //{src: "/src/photomechanics.js"},

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
    // { src: '~/plugins/ymapPlugin.js', mode: 'client' },
    //{src: '~/plugins/xlsx.client.js'},
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
    'nuxt-ssr-cache',
     'vue-social-sharing/nuxt',
     ['vue-yandex-maps/nuxt', {apiKey: "a0730179-856a-47bc-bc4a-eab5cf8d185a", lang: "ru_RU", version: "2.1"}],
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

  robots:[
    {
      UserAgent: '*',
       Disallow:['/login'],
    },
  ],

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

  // cache: {
  //     // if you're serving multiple host names (with differing
  //     // results) from the same server, set this option to true.
  //     // (cache keys will be prefixed by your host name)
  //     // if your server is behind a reverse-proxy, please use
  //     // express or whatever else that uses 'X-Forwarded-Host'
  //     // header field to provide req.hostname (actual host name)
  //     useHostPrefix: false,
  //     pages: [
  //       // these are prefixes of pages that need to be cached
  //       // if you want to cache all pages, just include '/'
  //       // '/page1',
  //       // '/page2',
  //       //
  //       // you can also pass a regular expression to test a path
  //       // /^\/page3\/\d+$/,
  //
  //       // to cache only root route, use a regular expression
  //       /^\/$/
  //     ],
  //
  //     // key(route, context) {
  //     //   // custom function to return cache key, when used previous
  //     //   // properties (useHostPrefix, pages) are ignored. return
  //     //   // falsy value to bypass the cache
  //     // },
  //
  //     store: {
  //       type: 'memory',
  //
  //       // maximum number of pages to store in memory
  //       // if limit is reached, least recently used page
  //       // is removed.
  //       max: 100,
  //
  //       // number of seconds to store this page in cache
  //       ttl: 600,
  //     },
  //   },




}
