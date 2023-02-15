const db = require('../db')
const nodemailer = require('nodemailer');
const arrayToTree = require('array-to-tree');
const http = require('https');

//const fs = require('fs')

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

export async function getParams({param}) {
    const {rows} = await db.queryAppSqlExec( "select content from settings where param=$1 and accessible=$2", [param, true] );
    return rows
}

async function sendCreateTask(taskinfo) {
//path: encodeURI(`/rest/94/41xv4ix4x1shvfom/task.item.add.json?TASKDATA[GROUP_ID]=${taskinfo.GROUP_ID}&TASKDATA[TITLE]=${taskinfo.TITLE}&TASKDATA[RESPONSIBLE_ID]=${taskinfo.RESPONSIBLE_ID}&TASKDATA[DESCRIPTION]=${taskinfo.DESCRIPTION}&TASKDATA[DEADLINE]=${taskinfo.DEADLINE}`),
  const options = {
  host: 'b24-sjyom9.bitrix24.ru',
  path: encodeURI(`/rest/94/41xv4ix4x1shvfom/task.item.add.json?TASKDATA[GROUP_ID]=${taskinfo.GROUP_ID}&TASKDATA[TITLE]=${taskinfo.TITLE}&TASKDATA[RESPONSIBLE_ID]=${taskinfo.RESPONSIBLE_ID}&TASKDATA[DESCRIPTION]=${taskinfo.DESCRIPTION}&TASKDATA[DEADLINE]=${taskinfo.DEADLINE}`),
};

if (taskinfo.AUDITORS > 0) {
  options.path = options.path + `&TASKDATA[AUDITORS][0]=${taskinfo.AUDITORS}`
}

// console.log(options.host + options.path);
//
// return

const callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    return (str);
  });
}

await http.request(options, callback).end();

}
async function sendEmail(message) {

  const {rows} = await db.queryAppSqlExec( "select content from settings where param=$1 and accessible=$2", ['email_order_response', true] );

  if (rows && rows.length) {

    const params = rows[0].content

    //console.log(params);

    message.from = params.email;

    const transport = await nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
         user: params.email,
         pass: params.pass
      }
    });

    transport.sendMail(message, function(err, info) {
        if (err) {
          //console.log(err)
        } else {
          //console.log(info);
        }})
  }

}

//api Bitrix24
export async function getcdata( {id, id2} ) {

  let result = null;

  if (id2 && id2 === process.env.PASS_1C) {

    if (id) {
      result = await db.queryAppStatSqlExec( "select id_bitrix24 id, guid, name, code, new_article, mesure, price, planned_price, future_price, minus6_price, url from nomenklators_bitrix24 where code=$1", [id] );
    } else {
      result = await db.queryAppStatSqlExec( "select id_bitrix24 id, guid, name, code, new_article, mesure, price, planned_price, future_price, minus6_price, url from nomenklators_bitrix24" );
    }

  } else {
    result = { rows: [] };
  }


  return result.rows;
}
export async function getcdatamanagers( {id, id2} ) {

  let result = null;

  if (id2 && id2 === process.env.PASS_1C) {

    if (id) {
      result = await db.queryAppStatSqlExec( "select guid, short_name, name, last_name , second_name from managers_bitrix24 where guid=$1", [id] );
    } else {
      result = await db.queryAppStatSqlExec( "select guid, short_name, name, last_name , second_name from managers_bitrix24" );
    }

  } else {
    result = { rows: [] };
  }


  return result.rows;
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

  const canUseFilter = await db.queryAppSqlExec( "select count(*) as count_rec from nomenklators where guid=$1 and show_filter = 1", [parentguid] );

  // console.log(parentguid, canUseFilter.rows[0].count_rec > 0)

  return {rows, breadcrumb: breadcrumb.rows, seoText: seoText.rows, canUseFilter: canUseFilter.rows[0].count_rec > 0};
}

export async function getSubNomenklatorByFilter( params ) {

  // console.log( 'getSubNomenklator' );
  // console.log( params );

  const { parentguid, userid, token, filterParams } = params;

  //connectionid мы получаем из ПАРАМЕТРОВ в кот middle-server засовывает этот параметр пр любом запросе
  //console.log( { parentguid, userid, token } )

  //console.log( token )

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await getConnectionOrder( userid, token, false );

  //const orderid = undefined;

  const { rows } = await db.queryApp('getSubNomenklatorByFilter', { parentguid, orderid, filterParams })

  return {rows};
}

export async function getGroupFilter( params ) {

  const { parentguid } = params;

  const txtQuery = ' \
  with guids as ( \
             with recursive r as ( \
                select name, parentguid, guid, itgroup from nomenklators where parentguid = $1 \
                  union all \
                select prop1.name, prop1.parentguid, prop1.guid, prop1.itgroup from nomenklators as prop1 join r on prop1.parentguid = r.guid \
              ) \
               select guid from r where not itgroup ) \
               select distinct property, array_agg(DISTINCT properties.value order by properties.value) as arrayprop \
  			 from properties as properties \
  			 join guids on properties.nomenklator_id = guids.guid \
  			 group by property \
  			 order by property \
    ';
  const groupFilter = await db.queryAppSqlExec( txtQuery, [parentguid] );

  return {rows: groupFilter.rows};
}

export async function getGoodCard( { synonym, userid, token } ) {

  const { orderid }  = await getConnectionOrder( userid, token, false );

  //const orderid = undefined;

  const { rows } = await db.queryApp('getGoodCard', { synonym, orderid } )

  if (rows.length === 0) {
    return {status: 404, msg: "Товар с таким Кодом НЕ найден."};
  }
  const rowsInstructions = await db.queryApp('getInstructions', { synonym } )

  const rowsYoutubechick = await db.queryApp('getYoutubechick', { synonym } )

  const rowsPhotos250 = await db.queryApp('getPhotos250', { synonym } )

  const parentguid = rows[0].parentguid

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  const complects = await db.queryApp('getGoodCardComplects', { synonym, orderid })

  const dopcomplects = await db.queryApp('getGoodCardDopComplects', { synonym, orderid })
  //console.log('complects', complects[1].rows)

  return { rows: rows, rowsphoto: rowsPhotos250.rows, rowsinstructions: rowsInstructions.rows, breadcrumb: breadcrumb.rows, complects: complects[1].rows, dopcomplects: dopcomplects[1].rows, rowsyoutubechick: rowsYoutubechick.rows };
}

export async function getStrucCatalog_old() {

  const rows = await db.queryApp('getStrucCatalog')

  //console.log(breadcrumb.rows)

  return rows;
}

export async function getStrucCatalog() {

  const {rows} = await db.queryApp('getStrucCatalog')

  const tree = arrayToTree(rows, {
          customID: 'node_id',
          parentProperty: 'parentguid'
      });

  return {tree};
}

//seo
export async function getSeoTextMain() {

  const seoText = await db.queryApp('getSeoText', { parentguid: 'main' })

  return {seoText: seoText.rows};
}
export async function getAdvsHtml({id}) {

  const advsHtml = await db.queryApp('getAdvsHtml', { id })

  return {rows  : advsHtml.rows};
}


//news
export async function getNewsBlock() {

  const {rows} = await db.queryApp('getNewsBlock')

  //console.log(rows)

  return rows;
}
// export async function getManagers( {id} ) {
export async function getManagers( inpData ) {

  let id = undefined;

  if (inpData !== undefined && 'id' in inpData) {
      id = inpData.id;
  }


  const {rows} = await db.queryStat1('getManagers', id)

  return rows;
}
export async function getNewsArhive( {pageSize, currentLength, curFilial} ) {

  const {rows} = await db.queryApp('getNewsArhive', {pageSize, currentLength, curFilial} )

  //console.log(rows)

  return rows;
}

export async function getNewCard( {id} ) {

  const {rows} = await db.queryApp('getNewCard', id )

  //console.log(rows)

  return rows;
}
export async function saveNewCard( {params} ) {

  let id = params.id ? params.id : null
  let rows = null;

if (id) {
  // const {rows} = await db.queryAppSqlExec( "select * from new_blocks where id=$1", [id] );
  // console.log(rows)
  await db.queryAppSqlExec( "update new_blocks set name = $2, header = $3, main_html = $4, on_slider = $5, filials = $6 where id=$1 RETURNING id", [id, params.name, params.name, params.name, params.on_slider, params.filials] );

} else {
  const {rows} = await db.queryAppSqlExec( "insert into new_blocks(name, header, main_html, on_slider, on_public, filials, created_at, updated_at, date, code) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id", [params.name, params.name, params.name, params.on_slider, true, params.filials, new Date(), new Date(), new Date(), genUuid()] );
  id = rows[0].id
}

if (params.pic1name) {
  await db.queryAppSqlExec( "update new_blocks set picture1 = $2 where id=$1 RETURNING id", [id, params.pic1] );
}
if (params.pic2name) {
  await db.queryAppSqlExec( "update new_blocks set path_pic2 = $2 where id=$1 RETURNING id", [id, params.pic2name] );
}
if (params.path_pdf_new) {
  await db.queryAppSqlExec( "update new_blocks set path_pdf = $2 where id=$1 RETURNING id", [id, params.path_pdf_new] );
}

return id;
}

//auth
export async function loginUser( params, res ) {

  // console.log('loginUser');
   //console.log('params', params);

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
// console.log('rest ', rest)
//
  res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
  //res.cookie("connectionid", rest.remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000  });

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

  try {
    await unitOrders( rows[0].id, connectionid )
  } catch (e) {
  }

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

  const message = {
    from: 'afmc@mail.ru', // Sender address
    to: params.email,         // List of recipients
    subject: 'Код восстановления пароля.', // Subject line
    text: 'Здравствуйте! Вы запросили код восстановления пароля к своему аккаунту на сайте newfurnitura.ru. Введите код: ' + rows[0].inn + ' на странице авторизации.' // Plain text body
  };

  await sendEmail(message);

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

export async function procOrder( { userid, token, mister, filial,  email, phone, info, mastercard, city } ) {

  let dbinfo

  // console.log( userid, guid, qty, connectionid )
  const { orderid }  = await getConnectionOrder( userid, token, false );

  if (userid === 1) {
    dbinfo = `Обращение: ${mister ? mister : '***'} / ${email ? email : '***'} / ${phone ? phone : '***'} / Предпочитаемый офис: ${filial ? filial : '***'} / Напутствие: ${info ? info : '***'}`
  } else {
    dbinfo = `- / Предпочитаемый офис: ${filial ? filial : '***'} / Напутствие: ${info ? info : '***'}`
  }
  const geograf = city ? `\nПредполагаемая география: ${city}` : ' ';
  const dopinfo = (dbinfo + geograf).replace(/'/g, " ");

  //console.log(dopinfo)

  const {rows} = await db.queryApp('procOrder', {orderid, dbinfo: dopinfo, mastercard})

  //console.log(resOk)


  const message = {
    to: email,         // List of recipients
    subject: 'МФ-Комплект. Ваш Заказ ' + orderid + ' на сайте newfurnitura.ru', // Subject line
    text: 'Здравствуйте ' + mister + '! Благодарим Вас за покупку.\n\nВаш Заказ: ' + orderid + ' отправлен в обработку.\n\nДоп.информация:\n' + dbinfo + '\n\nС уважением, МФ-Комплект.\nwww.newfurnitura.ru' // Plain text body
  };

try {
  await sendEmail(message);
} catch (e) {
}

//ответ Красноперофф
let currentdate = new Date();
//currentdate = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + 'T' + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ':' + (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds() + ':00';
currentdate = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + 'T23:59:59';
const taskinfo = {
  GROUP_ID: 94,
  RESPONSIBLE_ID: 30,
  AUDITORS: 0,
  TITLE: `Интернет заказ № ${orderid} на сумму ${rows[0].sum} руб. Отправлен в обработку в 1С. Ожидайте прихода.`,
  DESCRIPTION: `Детали Заказа:\n${dopinfo.replace('- /', (email ? email : '***' + ' /'))}`,
  DEADLINE: currentdate,
};

if (/Санкт-Петербург/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 44;
  //taskinfo.AUDITORS = 60;
}
if (/Новосибирск/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 1486;
  taskinfo.AUDITORS = 62;
}
if (/Екатеринбург/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 72;
  taskinfo.AUDITORS = 76;
}
if (/Казань/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 50;
  taskinfo.AUDITORS = 48;
}
if (/Ростов-на-Дону/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 58;
  taskinfo.AUDITORS = 34;
}
if (/Краснодар/.test(filial)) {
  taskinfo.RESPONSIBLE_ID = 38;
  taskinfo.AUDITORS = 36;
}
// 30 красноперов мск
// 62 манютина нсб 60 князев
// 1486 салабаева нсб 60 князев
// 50 кирилова кзн 48 кирилов
// 72 бражкина екб 76 медведчиков
// 38 клочков крд 36 бурса
// 58 пахомов рнд 34 скляров
// 44 волков спб

try {
  const res = await sendCreateTask(taskinfo);
  //console.log(res);
} catch (e) {
  console.log(e);
}

  return [];
}

export async function addCartFromExcel( { userid, token, arrayOrderList }, res ) {

  const {connid, orderid, remember_token}  = await getConnectionOrder( userid, token );

  if (remember_token && remember_token != token) {
      res.cookie("connectionid", remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      //res.cookie("connectionid", remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  let strQuery = "";

  arrayOrderList.forEach( (el, ind) => {
    strQuery = strQuery + ' select ' + (ind + 1) + " as order, " + "'" + el[0] + "' as art, " + el[1] + ' as qty union all '
  });

  strQuery = strQuery + " select 0, '111111111111111111111111', 0 ";

  const strQuery1 = `with artFilter as (  \
  	with price_list as ( \
    		select * \
    		from crosstab( \
    			$$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2) \
    		from prices \
    		left join currencies on prices.currency_id = currencies.code \
    		where nomenklator_id in ( \
    		select distinct \
        		nomenklators.guid as guid \
  		from nomenklators \
  	  	where nomenklators.guid in ( \
          with artFilter as (  \
            ${strQuery} \
          ) \
          select distinct \
          		t2.guid as guid \
          		  from artFilter t1 \
          		join nomenklators t2 on t2.artikul = t1.art \
            ) \
          ) \
            order by 1$$, \
            $$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$ \
          ) \
            AS (guid text, price1 numeric, price2 numeric, price3 numeric) \
          )	\
          	select distinct \
          		case when nomenklators.name is null then 0 else 1 end fsort, \
          		max(t3.order) order1, \
          		art, \
          		max(nomenklators.name) as name, \
          		max(nomenklators.guid) as guid, \
          		max(unit_type_id) as unit_type_id, \
          		max(unit_types.name) as unit_name, \
          		max(t3.qty) as qty, \
          		max(p1.price1) as price1 \
          		from ( \
                ${strQuery}
              ) as t3 \
              left join nomenklators on artikul = art \
          		left join unit_types on unit_types.code = unit_type_id \
          		left join price_list p1 on p1.guid = nomenklators.guid \
          		where art <> '111111111111111111111111' \
          		group by fsort, art \
          ) \
          	select * from artFilter \
  `;

  const {rows} = await db.dbpgApp1.query(strQuery1);

  for (const el of rows) {
    if (el.guid) {
      await db.queryApp('chngOrder', { orderid, guid: el.guid, qty: el.qty, price: el.price1, unit_type_id: el.unit_type_id } )
    }
  };

  await db.queryApp('chngSumOrder', orderid );

  return {rows}
}

export async function chngeCart( { guid, qty, price1, unit_type_id, userid, token }, res) {

  const {connid, orderid, remember_token}  = await getConnectionOrder( userid, token );

  if (remember_token && remember_token != token) {
      res.cookie("connectionid", remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      //res.cookie("connectionid", remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  const resOk  = await chngOrder( orderid, guid, qty, price1, unit_type_id );

  return resOk;
}


export async function getCart( params ) {

  //console.log('params', params);

  const { userid, token } = params;

  const { orderid }  = await getConnectionOrder( userid, token, false );

    if (orderid) {
      const { rows } = await db.queryApp('getCart', [orderid])

      return rows
    }
  return [];
}

export async function emptyCart( params ) {

  //console.log('params', params);

  const { userid, token } = params;

  const { orderid }  = await getConnectionOrder( userid, token, false );

    if (orderid) {
      const { rows } = await db.queryApp('emptyCart', orderid)

      await db.queryApp('chngSumOrder', orderid );

      return rows
    }
  return [];
}

export async function getOrdersList( {userid} ) {

  const { rows } = await db.queryApp('getOrdersList', userid )

  return rows;
}


//search
export async function searchCatalog( {v} ) {

  // console.log('txtSearchPart', v);

  //по просьбе трудячщихся сначала ищем ПОЛНОЕ совпадение, затем уже по аналогии
  let res = await db.queryApp('getSearchNomenklatorExactly', v)

  if (res.rows.length === 0) {
    res = await db.queryApp('getSearchNomenklator', v)
  }

  const {rows} = res;

  return rows;

// //
//   const searchedList  = await db.queryApp( 'getSearchNomenklator', v );
//
//   return searchedList.rows;
}

//stock-taking
export async function getStockTakings( {pageSize, currentLength, curFilial} ) {

  //const {rows} = await db.queryApp('getStockTaking', {pageSize, currentLength, curFilial} )
  const {rows} = await db.queryApp('getStockTakings', {pageSize, currentLength, curFilial})

  //console.log(rows)

  return rows;
}
