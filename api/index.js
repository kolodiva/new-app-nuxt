const db = require('../db')

const {matchPass, genPass, genUuid} = require('./crypto')

//connections
async function getConnectionOrder( userid, connectionid, createnewconn = true  ) {

  const strWhere = userid === 1 ? `where t1.user_id = ${userid} and t1.remember_token = '${connectionid}'` : `where t1.user_id = ${userid}`

  let {rows} = await db.queryApp( 'getConnOrder', strWhere )

  if ( rows.length === 0 && !createnewconn ) {
    return {connid: undefined, orderid: undefined, remember_token: undefined}
  }

  if ( rows.length === 0 ) {

    const newconn = await db.queryApp( 'addNewConnOrder', userid )

    rows = newconn.rows
  }

  return rows[0]
}


//nomenklator
export async function getSubNomenklator( { parentguid, userid, token } ) {

  //connectionid мы получаем из ПАРАМЕТРОВ в кот middle-server засовывает этот параметр пр любом запросе
  //console.log( { parentguid, userid, token } )

  //console.log( token )

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await getConnectionOrder( userid, token, false );

  //const orderid = undefined;

  const { rows } = await db.queryApp('getSubNomenklator', { parentguid, orderid })

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid })

  const seoText = await db.queryApp('getSeoText', { parentguid })
  //const seoText = []

  //console.log(breadcrumb.rows)

  return {rows, breadcrumb: breadcrumb.rows, seoText: seoText.rows};
}

export async function getGoodCard( { synonym, userid, token } ) {

  const { orderid }  = await getConnectionOrder( userid, token, false );

  //const orderid = undefined;

  const { rows } = await db.queryApp('getGoodCard', { synonym, orderid } )

  const rowsPhotos250 = await db.queryApp('getPhotos250', { synonym } )

  const parentguid = rows[0].parentguid

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  return { rows: rows, rowsphoto: rowsPhotos250.rows, breadcrumb: breadcrumb.rows  };
}

export async function getStrucCatalog() {

  const rows = await db.queryApp('getStrucCatalog')

  //console.log(breadcrumb.rows)

  return rows;
}

//seo
export async function getSeoTextMain() {

  const seoText = await db.queryApp('getSeoText', { parentguid: 'main' })

  return {seoText: seoText.rows};
}


//news
export async function getNewsBlock() {

  const {rows} = await db.queryApp('getNewsBlock')

  //console.log(rows)

  return rows;
}

//auth
export async function loginUser( params, res ) {

  const {_keyUser} = res.req.cookies;

  res.clearCookie("_keyUser");

  //
  if (!_keyUser) {
    return {status: 403, msg: "Your request is forbidden ..."};
  }

  const { rows } = await db.queryApp('getUserByEmail', params)

  if (rows.length === 0) {
    return {status: 404, msg: "Пользователь с таким адресом НЕ найден - на регистрацию."};
  }

  const match = matchPass(_keyUser, params.password, rows[0].password_digest)

  if (!match) {
    return {status: 401, msg: "Введен неверный пароль, покрутите еще."}
  }

  // try {
  //   await db.unitOrders( rows[0], connectionid )
  // } catch (e) {
  //   return {status: 403, msg: `Ошибка при оаботе с БД: ${e.message}`};
  // }
  //
  return {token: rows};
}

//orders
async function chngOrder( orderid, guid, qty, price, unit_type_id ) {

  const res = await db.queryApp('chngOrder', { orderid, guid, qty, price, unit_type_id } )
  const res2 = await db.queryApp('chngSumOrder', orderid )

  return ( res[1].rowCount === 1 || (res[1].rowCount === 0 && parseFloat(qty) === 0) )
}

export async function chngeCart( { guid, qty, price1, unit_type_id, userid, connectionid }, res) {

  //console.log( qty )

  //const token = res.cookie('connectionid');
  // const token = req.cookie('connectionid') || undefined;
  //
  // console.log( token )

  const {connid, orderid, remember_token}  = await getConnectionOrder( userid, connectionid );

  if (remember_token && remember_token != connectionid) {
    //console.log( remember_token )
      //res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  const resOk  = await chngOrder( orderid, guid, qty, price1, unit_type_id );

  return resOk;
}
