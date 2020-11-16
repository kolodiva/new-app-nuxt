const db = require('../db')
const nodemailer = require('nodemailer');

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
export async function getSubNomenklator( params ) {

  // console.log( 'getSubNomenklator' );
  // console.log( params );

  const { parentguid, userid, token } = params;

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

  // console.log('loginUser');
  // console.log(params);

  res.clearCookie("_keyUser");

  const {keyUser} = params;

  const connectionid = params.token;

  //
  if (!keyUser) {
    return {status: 403, msg: "Your request is forbidden ..."};
  }

  const { rows } = await db.queryApp('getUserByEmail', params)

  //console.log('rows', rows);

  if (!rows || rows.length === 0) {
    return {status: 404, msg: "Пользователь с таким адресом НЕ найден - на регистрацию."};
  }

  const match = matchPass(keyUser, params.password, rows[0].password_digest)

  if (!match) {
    return {status: 401, msg: "Введен неверный пароль, покрутите еще."}
  }

  try {
    await unitOrders( rows[0].userid, connectionid )
    //здесь по идее мы должны получить connectionid по авторизованному пользователю и его connection
  } catch (e) {
    return {status: 403, msg: `Ошибка при создании Заказа, попробуйте позже...: ${e.message}`};
  }

  const rest = await getConnectionOrder( rows[0].userid, connectionid, false );

  res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
  //res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });

  return rest.remember_token;
}
export async function getUserInfo( params ) {

  const { rows } = await db.queryApp('getUserInfo', params)

  return rows[0];
}
export async function addNewUser( params, res ) {

  //при добавлении нового Пользователя автоматически заводим ему connection НО сначала проверим неи ли такого с таким email
  let result = await db.queryApp('getUserByEmail', params);

  let rows = result.rows;

  if (rows && rows.length > 0) {
    return {status: 401, msg: "Пользователь с таким адресом уже зарегистрирован."};
  }

  const connectionid = params.token;

  params.password_digest = genPass(params.password)

  result = await db.queryApp('addNewUser', params);

  rows = result.rows;

  const rest = await getConnectionOrder( rows[0].id, connectionid, true );

  res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
  //res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });

  return rest.remember_token;
}
export async function recoveryUserPassword( params, res ) {

  let result = await db.queryApp('getUserByEmail', params)

  let rows = result.rows;

  // console.log('rows', rows);
  if (!rows || rows.length === 0) {
    return {status: 404, msg: "Пользователь с таким адресом НЕ найден - на регистрацию."};
  }

  result = await db.queryApp('setUserRecoveryCode', params)

  rows = result.rows;

  // console.log('rows', rows);

  const transport = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
       user: 'afmc@mail.ru',
       pass: 'Pp123456'
    }
});
// transport.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });
const message = {
    from: 'afmc@mail.ru', // Sender address
    to: 'kolodiva@mail.ru',         // List of recipients
    subject: 'Код восстановления пароля.', // Subject line
    text: 'Здравствуйте! Вы запросили код восстановления пароля к своему аккаунту на сайте newfurnitura.ru. Введите код: ' + rows[0].inn + ' на странице сайта.' // Plain text body
};
transport.sendMail(message, function(err, info) {
    if (err) {
      //console.log(err)
    } else {
      //console.log(info);
    }
});

  return rows[0].inn
}
export async function changeUserPassword( params, res ) {

  // console.log('loginUser');
  // console.log(params);
  let result = await db.queryApp('getUserByEmail', params);

  let rows = result.rows;

  //console.log('rows', rows);

  if (!rows || rows.length === 0) {
    return {status: 404, msg: "Пользователь с таким адресом НЕ найден - на регистрацию."};
  }

  if (rows[0].inn != params.recovCode) {
    return {status: 401, msg: "НЕ совпадает Код восстановления из Почтового сообщения. Операция отменена - попробуйте еще раз."};
  }

  params.password_digest = genPass(params.passwordnew)

  await db.queryApp('changeUserPassword', params);

  return true;
}

//orders
async function chngOrder( orderid, guid, qty, price, unit_type_id ) {

  const res = await db.queryApp('chngOrder', { orderid, guid, qty, price, unit_type_id } )
  const res2 = await db.queryApp('chngSumOrder', orderid )

  return ( res[1].rowCount === 1 || (res[1].rowCount === 0 && parseFloat(qty) === 0) )
}

export async function chngeCart( { guid, qty, price1, unit_type_id, userid, token }, res) {

  //console.log( qty )

  //const token = res.cookie('connectionid');
  // const token = req.cookie('connectionid') || undefined;
  //
  // console.log( token )

  const {connid, orderid, remember_token}  = await getConnectionOrder( userid, token );

  if (remember_token && remember_token != token) {
    //console.log( remember_token )
      res.cookie("connectionid", remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      //res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  const resOk  = await chngOrder( orderid, guid, qty, price1, unit_type_id );

  return resOk;
}

async function unitOrders( userid, connectionid ) {

  // console.log('userid', userid)
  // console.log('connectionid', connectionid)

  //ищем сущ connection по анониму если он есть НЕ создавая нового
  const orderid2 = await getConnectionOrder( 1, connectionid, false );



  //ищем сущ connection по Авторизованномй пользователю если он есть НЕ создавая нового при userid > 1 НЕ аноним берм любой ПЕРВЫЙ (он же ед) со статусом 0
  const { connid, orderid} = await getConnectionOrder( userid, connectionid, false );

  // console.log('orderid2_anonym', orderid2)
  // console.log('orderid_loginuser', orderid)

  //return true;
  //console.log( userid, orderid, orderid2.orderid, connid, connectionid )

  //объединяем ТОЛЬКО если существую заказы и по анониму и по авторизованному пользователю
  if ( orderid && orderid2.orderid ) {
    try {

      await db.dbpgApp1.query( 'begin;' );

      //Добавили новые Conn Order
      const newconnorder = await db.queryApp( 'addNewConnOrder', userid )

      const newrec = newconnorder.rows[0]

      await db.queryApp( 'unitOrders', { orderid1: orderid, orderid2: orderid2.orderid, orderidnew: newrec.orderid } )

      await db.queryApp( 'chngSumOrder', newrec.orderid )

      await db.dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await db.dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  //если существует заказ  только по анониму - заменяем userid авториз пользователя
  if ( orderid2.connid ) {
    try {

      await db.dbpgApp1.query( 'begin;' );

      await db.dbpgApp1.query(`update connections set user_id=${userid} where id=${orderid2.connid}`)

      await db.dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await db.dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  // в случае если ничего не было вообще в части заказа - создаеме по автризованному польз Connection со статусом 0 для того что бы получить Токен для этого пользователя
  // это  значит что в случае с авторизацией в рбом случае уже создаем connrction так ка к по нему у нас будет выполнятся идентификация пользователя по Токену connection
  // такова Новизна моего метода для того чтобы не хранить одновременно идентификатор connection ит usrtid. UserId мы найдем через user_id в Connection
  // кот найдем по connectionid кот хранится в Cookie
  if (!orderid) {
      const newrec = await db.queryApp( 'addNewConnOrder', userid )
  }


  //console.log( 'newconnorder', newconnorder );

  return true
}
