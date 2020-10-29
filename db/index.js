
const { Pool } = require('pg')

const queries = require('./queries');

let connParam1   = null;
let connParam2   = null;

if (process.env.NODE_ENV == 'production') {
  //размещение DO
  connParam1 = 'postgresql://postgres:fc18ecd9-10c3-4ce4-a40b-36a07285@localhost:5432/app1'
  connParam2 = 'postgresql://postgres:123456@localhost:5432/statistica'

  //Не забудь зольДат поменять при размещении на RF
  // conn_param = {'host':'172.17.0.3', 'password':'c2ec57df699966b3afef779a16fa5fff', 'port':'5432'};
  // conn_param_statistica = {'host':'172.17.0.2', 'password':'27ac4a1dd6873624b7535fe5660740d6', 'port':'5432'};

  // connParam1 = 'postgresql://postgres:c2ec57df699966b3afef779a16fa5fff@172.17.0.3:5432/app1'
  // connParam2 = 'postgresql://postgres:27ac4a1dd6873624b7535fe5660740d6@172.17.0.2:5432/statistica'
} else {
  connParam1 = 'postgresql://postgres:123456@localhost:5432/app1'
  connParam2 = 'postgresql://postgres:123456@localhost:5432/statistica'
}

const dbpgApp1 = new Pool({
  connectionString: connParam1,
})

dbpgApp1.connect( err => {
  if (err) {
  console.log(err.stack)
  }
})

const dbpgStat = new Pool({
  connectionString: connParam2,
})

module.exports = {
  queryStat: (name, params) => dbpgStat.query( text, params ),
  queryStat1: (name, params) => dbpgStat.query( queries[name](params) ),
  queryApp: (name, params) => dbpgApp1.query( queries[name](params) ),
  getConnectionOrder: queries.getConnectionOrder,
}
