const db = require('../db')

export async function getSubNomenklator( { parentguid, userid, connectionid } ) {

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getSubNomenklator', { parentguid, orderid })

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid })

  const seoText = await db.queryApp('getSeoText', { parentguid })
  //const seoText = []

  //console.log(breadcrumb.rows)

  return {rows, breadcrumb: breadcrumb.rows, seoText: seoText.rows};
}

export async function getGoodCard( { synonym, userid, connectionid } ) {

  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getGoodCard', { synonym, orderid } )

  const rowsPhotos250 = await db.queryApp('getPhotos250', { synonym } )

  const parentguid = rows[0].parentguid

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  return { rows: rows, rowsphoto: rowsPhotos250.rows, breadcrumb: breadcrumb.rows  };
}

export async function getSeoTextMain() {

  const seoText = await db.queryApp('getSeoText', { parentguid: 'main' })

  return {seoText: seoText.rows};
}
// export { getSubNomenklator };
