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
export function chngOrder_old( {orderid, guid, qty, price, unit_type_id} ) {

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
export function chngOrder( {orderid, guid, qty, price, unit_type_id} ) {

  return {
    name: '',
    text: `
    with deleted as (delete from order_good_complects where order_good_id in
      ( select id from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}'))
        delete from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}';
        insert into order_goods(order_id, nomenklator_id, qty, price, unit_type_id, sum )
    		select ${orderid}, '${guid}', ${qty || 0}, ${price}, ${unit_type_id}, ${ qty*price } where ${qty || 0} > 0;

        with price_list_compl as (

        						select *
        						from crosstab(
        						$$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
        						from prices
        						left join currencies on prices.currency_id = currencies.code

        						where nomenklator_id in (

        						select distinct
        								complects.guid_complect as guid

        							from complects

        						            where complects.nomenklator_id = '${guid}'

        						)

        						order by 1$$,
        						$$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
        						)

        						AS (guid text, price1 numeric, price2 numeric, price3 numeric)
        						)

        							insert into order_good_complects ( complect_id, unit_type_id, qty, koeff, price, order_good_id  )


                                        select complects.guid_complect as complect_id,

        								complects.unit_type_id,
        								order_goods.qty*complects.qty  as qty,
        								complects.qty as koeff,
        								round(complects.qty*coalesce(price_list_compl.price1, 0) , 2) as price,
        								order_goods.id as order_good_id

                                        from order_goods

                                         left join complects on complects.nomenklator_id = order_goods.nomenklator_id

                                         left join price_list_compl on complects.guid_complect = price_list_compl.guid


                                     where order_goods.order_id = ${orderid} AND order_goods.nomenklator_id = '${guid}' AND coalesce(complects.guid_complect, '') != '';

                         select id, nomenklator_id, qty from order_goods where order_goods.order_id = ${orderid} AND order_goods.nomenklator_id = '${guid}'


    `,
    values: [],
  }
}
export function procOrder( {orderid, dbinfo, mastercard} ) {
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

export function getOrdersList_old( userid ) {

  console.log(`
  select distinct t1.id, t1.status, to_char(t1.created_at, 'DD/MM/YYYY') data_on, t1.sum, t1.sum_for_payment, t1.sum_paid, t1.data_paid, t1.card_payment_order
  from orders t1
  inner join connections t2 on t1.connection_id=t2.id
  where t1.status>0 and t2.user_id=${userid}
  order by t1.id desc
  `);


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
export function getOrdersList( userid ) {

  return {
    name: '',
    text: `
    with r1 as (select distinct t1.id,

case
when t1.status = 1 then 'Заказ отправлен'
when t1.status = 2 then 'Создан резерв'
when t1.status = 3 then 'Отправлен на склад'
when t1.status = 4 then 'Ожид.сборка'
when t1.status = 5 then 'Готов к отгрузке'
when t1.status = 6 then 'Отгружен'
when t1.status = 7 then 'Отменен'
      else
       'Нет данных'
      end status,
    to_char(t1.created_at, 'DD/MM/YYYY') data_on, t1.sum, t1.sum1, t1.sum_for_payment, t1.sum_paid, t1.data_paid, t1.card_payment_order, t1.order_1c,
     jsonb_build_object(
       'ind', row_number() OVER(),
      'guid', t3.nomenklator_id,
      'guidpicture', replace(t4.guid_picture, '250x250', '82x82'),
      'synonym', t4.synonym,
      'parentguid', t4.parentguid,
      'unit_type_id', t4.unit_type_id,
      'name', t4.name,
      'artikul', t4.artikul,
      'artikul_new', t4.artikul_new,
      'qty', t3.qty,
      'qty1', t3.qty1 ,
      'price', t3.price,
      'price1', t3.price1 ,
      'sum', t3.sum,
      'sum1', t3.sum1,
      'priceCur', round(p1.price*coalesce(c1.value, 1), 2)
    ) as order_goods

      from orders t1
      inner join connections t2 on t1.connection_id=t2.id
      inner join order_goods t3 on t1.id = t3.order_id
      inner join nomenklators t4 on t4.guid = t3.nomenklator_id
      left join prices p1 on t3.nomenklator_id = p1.nomenklator_id and p1.price_type_id = '000000004'
      left join currencies c1 on p1.currency_id = c1.code
      where t1.status>0 and t2.user_id=${userid})

      select id, status, data_on, sum, sum1, sum_for_payment, sum_paid, data_paid, card_payment_order, order_1c, json_agg(order_goods order by order_goods ->> 'name') children
      from r1
      group by id, status, data_on, sum, sum1, sum_for_payment, sum_paid, data_paid, card_payment_order, order_1c
      order by id desc
    `,
    values: [],
  }
}

export function getCart(params) {
  //ARRAY[]::text[] children

  return {
    name: 'get-cart',
    text: `
    with compl as (SELECT guid, JSON_AGG(src_json) as compl_json
    FROM (
    	  SELECT t2.complect_id id,t1.nomenklator_id guid, t3.name, t4.name unit_name, t2.koeff, t2.qty, t2.price,
        'https://newfurnitura.ru/upload/' || t3.guid_complect || '_82x82.jpg' guid_picture_compl,
        t3.artikul
    	  FROM order_goods t1
    	  join order_good_complects t2 on t1.id = t2.order_good_id
    	  join complects t3 on t2.complect_id = t3.guid_complect and  t1.nomenklator_id = t3.nomenklator_id
        join unit_types t4 on right('0000' || t2.unit_type_id, 3) = t4.code
        join nomenklators t5 on t5.guid = t3.nomenklator_id
    	  where order_id = $1) src_json
    	  group by guid)

      SELECT t2.guid id, t2.guid, t2.artikul, t2.artikul_new, t2.name, replace(t2.guid_picture, '250x250', '82x82') guid_picture, t2.is_complect,
      to_char(t4.created_at, 'DD/MM/YYYY') data_on, COALESCE(t4.sum::real, 0) sum_total, t2.parentguid, t2.synonym, t1.order_id,
      COALESCE(t1.qty::real, 0) qty1, COALESCE(t1.qty::real, 0) qty2,
      COALESCE(t1.price::real, 0) price1, t1.sum, case when t2.is_complect > 0 then 'компл.' else t3.name end unit_name, t1.unit_type_id,
      COALESCE(compl.compl_json, '[]'::json)  children
      FROM order_goods t1
      inner join orders t4 on t4.id = t1.order_id
      inner join nomenklators t2 on t1.nomenklator_id = t2.guid
      inner join unit_types t3 on right('0000' || t1.unit_type_id, 3) = t3.code
      left join compl on compl.guid = t1.nomenklator_id
      where order_id = $1
      order by t2.artikul
    `,
    values: params,
  }
}
