const db = require('../db')

async function getSubNomenklator( { parentguid, userid, connectionid } ) {

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getSubNomenklator', { parentguid, orderid })

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  //console.log(breadcrumb.rows)

  return {rows, breadcrumb: breadcrumb.rows};
}

export { getSubNomenklator };
