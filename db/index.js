
const { Pool } = require('pg')

const queries = require('./queries');

  const connParam1 = process.env.API_URL_APP
  const connParam2 = process.env.API_URL_STAT

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
//getConnectionOrder: queries.getConnectionOrder,
module.exports = {
  dbpgApp1,
  queryStat: (name, params) => dbpgStat.query( text, params ),
  queryStat1: (name, params) => dbpgStat.query( queries[name](params) ),
  queryAppStatSqlExec: (txtQuery, params) => dbpgStat.query( {text: txtQuery, values: params} ),
  queryApp: (name, params) => dbpgApp1.query( queries[name](params) ),
  queryAppSqlExec: (txtQuery, params) => dbpgApp1.query( {text: txtQuery, values: params} ),

}
