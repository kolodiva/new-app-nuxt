export async function getConnectionOrder_old( userid, connectionid, createnewconn = true ) {

  const strWhere = userid === 1 ? `where t1.user_id = ${userid} and t1.remember_token = '${connectionid}'` : `where t1.user_id = ${userid}`

  //let {rows} = await dbpgApp1.query( queries['getConnOrder'](strWhere) )
  let rows = []

  if ( rows.length === 0 && !createnewconn ) {
    return {connid: undefined, orderid: undefined, remember_token: undefined}
  }

  if ( rows.length === 0 ) {

    const newconn = await dbpgApp1.query( queries['addNewConnOrder'](userid) )

    rows = newconn.rows
  }

  return rows[0]
}

export async function getConnectionOrder( userid, connectionid, createnewconn = true  ) {

  const strWhere = userid === 1 ? `where t1.user_id = ${userid} and t1.remember_token = '${connectionid}'` : `where t1.user_id = ${userid}`

  let {rows} = await queryApp( 'getConnOrder', strWhere )

  if ( rows.length === 0 && !createnewconn ) {
    return {connid: undefined, orderid: undefined, remember_token: undefined}
  }

  if ( rows.length === 0 ) {

    const newconn = await queryApp( 'addNewConnOrder', userid )

    rows = newconn.rows
  }

  return rows[0]
}


async function chngOrder( orderid, guid, qty, price, unit_type_id ) {

  const res = await dbpgApp1.query( queries['chngOrder'](  orderid, guid, qty, price, unit_type_id ) )
  const res2 = await dbpgApp1.query( queries['chngSumOrder'](  orderid ) )

  return ( res[1].rowCount === 1 )
}

async function procOrder( orderid, mister, filial,  email, phone, info, city ) {
  const res = await dbpgApp1.query( queries['procOrder']( orderid, mister, filial, email, phone, info, city ) )
}

async function unitOrders( { userid }, connectionid ) {

  //ищем сущ connection по анониму если он есть НЕ создавая нового
  const orderid2 = await getConnectionOrder( 1, connectionid, false );
  //ищем сущ connection по Авторизованномй пользователю если он есть НЕ создавая нового
  const { connid, orderid} = await getConnectionOrder( userid, connectionid, false );

  //console.log( userid, orderid, orderid2.orderid, connid, connectionid )

  //объединяем ТОЛЬКО если существую заказы и по анониму и по авторизованному пользователю
  if ( orderid && orderid2.orderid ) {
    try {

      await dbpgApp1.query( 'begin;' );

      //Добавили новые Conn Order
      const newconnorder = await dbpgApp1.query( queries['addNewConnOrder'](userid) )

      const newrec = newconnorder.rows[0]

      await dbpgApp1.query( queries['unitOrders']({ orderid1: orderid, orderid2: orderid2.orderid, orderidnew: newrec.orderid }) )

      await dbpgApp1.query( queries['chngSumOrder'](  newrec.orderid ) )

      await dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  //если существует сщтт  только по анониму - заменяем userid авториз пользователя
  if ( orderid2.connid ) {
    try {

      await dbpgApp1.query( 'begin;' );

      await dbpgApp1.query(`update connections set user_id=${userid} where id=${orderid2.connid}`)

      await dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  return true
}
