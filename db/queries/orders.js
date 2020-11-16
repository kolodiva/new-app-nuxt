export function getConnOrder( strWhere ) {
  return {
    name: '',
    text: `
    select t1.id connid, t1.remember_token, t2.id orderid
    from connections t1
    inner join orders t2 on t2.connection_id = t1.id and t2.status=0
    ${strWhere}
    order by t1.id desc, t2.id desc 
    limit 1
    `,
    values: [],
  }
}
export function addNewConnOrder( userid ) {
  return {
    name: '',
    text: `
    with r1 as (insert into connections(user_id, remember_token, updated_at, created_at)
      values( ${userid}, encode(gen_random_bytes(80), 'base64'), now(), now() ) RETURNING id, remember_token)
        insert into orders(connection_id, status, updated_at, created_at) values( (select id from r1), 0, now(), now())
            RETURNING id orderid, (select id from r1) connid, (select remember_token from r1)
    `,
    values: [],
  }
}
export function chngOrder( {orderid, guid, qty, price, unit_type_id} ) {
  return {
    name: '',
    text: `
    with deleted as (delete from order_good_complects where order_good_id in
      ( select id from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}'))
        delete from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}';
        insert into order_goods(order_id, nomenklator_id, qty, price, unit_type_id, sum )
    		select ${orderid}, '${guid}', ${qty || 0}, ${price}, ${unit_type_id}, ${ qty*price } where ${qty || 0} > 0
    		RETURNING id, nomenklator_id, qty;

    `,
    values: [],
  }
}
export function procOrder( orderid, dbinfo, mastercard ) {
  return {
    name: '',
    text: `
      update orders set status = 1, info='${ dbinfo }', card_payment_order='${mastercard}' where id=${orderid}
    `,
    values: [],
  }
}
export function chngSumOrder( orderid ) {
  return {
    name: '',
    text: `
    update orders t1 set sum=(select sum(t2.sum) from order_goods t2 where t2.order_id=${orderid}) where id=${orderid}
    `,
    values: [],
  }
}
export function unitOrders( params ) {

  const orderid1    = params.orderid1   || null
  const orderid2    = params.orderid2   || null
  const orderidnew  = params.orderidnew || null

  return {
    name: '',
    text: `
    with r1 as (
    insert into order_goods(order_id, nomenklator_id, unit_type_id, qty, price, sum, qty1, price1, sum1)
    SELECT ${orderidnew} order_id, nomenklator_id, unit_type_id, sum(qty) qty, max(price) price, sum(qty)*max(price) sum, sum(qty1) qty1, max(price1) price1, sum(qty1)*max(price1) sum1
    FROM order_goods
    where order_id in (${orderid1}, ${orderid2})
    group by
    nomenklator_id, unit_type_id
    returning id, nomenklator_id)

    insert into order_good_complects(order_good_id, complect_id, unit_type_id, qty, koeff, price, qty1, koeff1, price1)
    select r1.id order_id, t1.complect_id, t1.unit_type_id, sum(t1.qty) qty, max(t1.koeff) koeff, max(t1.price) price, sum(t1.qty1) qty1, max(t1.koeff1) koeff1, max(t1.price1) price1
    from order_good_complects t1
    inner join order_goods t2 on t1.order_good_id = t2.id and t2.order_id in (${orderid1}, ${orderid2})
    inner join r1 on r1.nomenklator_id = t2.nomenklator_id
    group by
    r1.id, t1.complect_id, t1.unit_type_id;

    delete from connections where id in ( select connection_id from orders where id in (${orderid1}, ${orderid2}));
    delete from orders where id in (${orderid1}, ${orderid2});
    delete from order_good_complects where order_good_id in (select id from order_goods where order_id in (${orderid1}, ${orderid2}));
    delete from order_goods where order_id in (${orderid1}, ${orderid2});
    `,
    values: [],
  }
}
export function getOrdersList( userid ) {
  return {
    name: '',
    text: `
    select distinct t1.id, t1.status, to_char(t1.created_at, 'DD/MM/YYYY') data_on, t1.sum, t1.sum_for_payment, t1.sum_paid, t1.data_paid, t1.card_payment_order
    from orders t1
    inner join connections t2 on t1.connection_id=t2.id
    where t1.status>0 and t2.user_id=${userid}
    order by t1.id desc
    `,
    values: [],
  }
}

export function getCart(params) {
  return {
    name: 'get-cart',
    text: `
      SELECT t2.guid, t2.artikul, t2.name, replace(t2.guid_picture, '250x250', '82x82') guid_picture_small,
      to_char(t4.created_at, 'DD/MM/YYYY') data_on, t4.sum sum_total, t2.parentguid, t2.synonym, t1.order_id, t1.qty, t1.price, t1.sum, t3.name unit_name
      FROM order_goods t1
      inner join orders t4 on t4.id = t1.order_id
      inner join nomenklators t2 on t1.nomenklator_id = t2.guid
      inner join unit_types t3 on t1.unit_type_id = t3.code
      where order_id = $1
      order by t2.artikul
    `,
    values: params,
  }
}
