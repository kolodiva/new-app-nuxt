const db = require('../db')

async function getNewsBlock() {

  const {rows} = await db.queryApp('getNewsBlock')

  //console.log(rows)

  return rows;
}

export { getNewsBlock };
