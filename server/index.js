const express = require('express')
const cookieParser = require('cookie-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const https = require('https')

const fileUpload = require('express-fileupload');
const cors = require('cors')

app.use(cookieParser())

// middle ware
app.use(express.static('test'))
app.use(cors())
app.use(fileUpload());

app.post('/loadfile', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    //myFile.mv(`${__dirname}/test/${myFile.name}`, function (err) {
    myFile.mv(`/home/ftp_user/www/news/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "fuck eroor" });
        }
        return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
    });
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
