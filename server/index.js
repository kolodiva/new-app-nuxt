const express = require('express')
const cookieParser = require('cookie-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const https = require('https')

const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser())

app.use(express.json())

var multer  = require('multer')
// var upload = multer({ dest: './static/storefolder/news' })

//
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './storefolder/news')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '/home/ftp_user/www/news')
    cb(null, '/var/www/newfurnitura.ru/news')

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

//
app.post('/loadfile', upload.single('file'), (req, res) => {
  return res.status(200).send({ res: "it's Ok" })
  //return res.status(200)
})


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  if (process.env.NODE_ENV == 'production') {
    host = 'localhost'; port = 7000;
    //host = '192.168.1.105'; port = 3000;
  } else {
    //const { host, port } = nuxt.options.server;
    //host = '192.168.1.41'; port = 3000;
    //host = '192.168.1.105'; port = 5000;

    host = 'localhost'; port = 5000;
    //host = 'localhost'; port = 7000;
  }

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  //https.createServer(nuxt.options.server.https, app).listen(port, host)
  if (process.env.NODE_ENV == 'production') {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on https://${host}:${port}`,
      badge: true,
    })
  } else {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    })
  }
}
start()
