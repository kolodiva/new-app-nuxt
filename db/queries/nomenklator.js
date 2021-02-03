//nomenklator
export function getSubNomenklator(params) {

  const textqry=`

  with price_list_total as (

    with price_list_with_compl as (

    select *
    from crosstab(
    $$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
    from prices
    left join currencies on prices.currency_id = currencies.code

    where nomenklator_id in (

    select distinct
        coalesce(complects.guid_complect, nomenklators.guid) as guid

      from nomenklators

               left join complects on complects.nomenklator_id = nomenklators.guid

               where nomenklators.parentguid='${params.parentguid}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    )

    order by 1$$,
    $$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
    )

    AS (guid text, price1 numeric, price2 numeric, price3 numeric)
    )

  select
    nomenklators.guid,

    sum(round(coalesce(complects.qty, 1) * pl.price1, 2)) as price1,
    sum(round(coalesce(complects.qty, 1) * pl.price2, 2)) as price2,
    sum(round(coalesce(complects.qty, 1) * pl.price3, 2)) as price3

    from nomenklators

       left join complects on complects.nomenklator_id = nomenklators.guid
         join price_list_with_compl as pl on pl.guid = nomenklators.guid or pl.guid = complects.guid_complect

         group by nomenklators.guid)

  select
  COALESCE(nomenklators.weight, 0) as weight,
      nomenklators.guid,
      nomenklators.parentguid,
          nomenklators.artikul,
          nomenklators.artikul_new,
          nomenklators.name,
          nomenklators.synonym,
          nomenklators.itgroup,
          nomenklators.guid_picture,
          replace(nomenklators.guid_picture, '250x250', '82x82') guid_picture_small,
          nomenklators.sort_field,
          nomenklators.describe,
          nomenklators.is_complect,
          case when nomenklators.itgroup then '' else coalesce( case when nomenklators.is_complect > 0 then 'компл.' else unit_types.name end, 'нет ед.изм.') end as unit_name,
          nomenklators.unit_type_id unit_type_id,

    COALESCE(price_list_total.price1, 0.00) as price1,
    COALESCE(price_list_total.price2, 0.00) as price2,
    COALESCE(price_list_total.price3, 0.00) as price3,

    COALESCE(order_goods.qty::real, 0) as qty1,
    COALESCE(order_goods.qty::real, 0) as qty2,

    round(COALESCE(order_goods.price, 0.00), 2) as price_order,

    round(COALESCE(price_list_total.price1, 0.00)*COALESCE(order_goods.qty, 0.0000), 2) as total,

      nomenklators.intrnt_keyword, nomenklators.intrnt_title, nomenklators.intrnt_description, nomenklators.intrnt_og_title, nomenklators.intrnt_microdata


    from nomenklators

    left join price_list_total on nomenklators.guid = price_list_total.guid

    left join orders on orders.id = ${params.orderid || null} and orders.status = 0
    left join order_goods on order_goods.order_id = ${params.orderid || null} and price_list_total.guid = order_goods.nomenklator_id

    left join unit_types on right('0000' || nomenklators.unit_type_id, 3) = unit_types.code

    where nomenklators.parentguid='${params.parentguid}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getSubNomenklatorByFilter(params) {

  let strQuery0 = `
        with guids as (
           with recursive r as (
          select name, parentguid, guid, itgroup from nomenklators where parentguid = '${params.parentguid}'

          union all

          select prop1.name, prop1.parentguid, prop1.guid, prop1.itgroup from nomenklators as prop1 join r on prop1.parentguid = r.guid
             )

             select distinct guid from r where not itgroup
        ) `;

  //
  let strQuery1 = [];

  let dopTxt = '';

  params.filterParams.forEach((item, i) => {

    if (i > 0) {
      if (item.property === params.filterParams[i-1].property ) {
        dopTxt = " union all "
      } else {
        dopTxt = " intersect "
      }
    }

      strQuery1.push(
        `${dopTxt} select prop.nomenklator_id as guid from properties as prop join guids on guids.guid = prop.nomenklator_id where  prop.property = '${item.property}' AND prop.value = '${item.value}'`
      );
  });

  dopTxt = strQuery1.join(' ').split('intersect');

  //console.log('dopTxt', dopTxt);

  strQuery1 = [];

  dopTxt.forEach((item, i) => {

      strQuery1.push(
        `(${item})`
      );
  });

  strQuery0 = strQuery0 + ' select distinct u1.guid from ( ' + strQuery1.join(' intersect ') + ' ) u1';

  // console.log(strQuery0);

  const textqry=`

  with price_list_total as (

    with price_list_with_compl as (

    select *
    from crosstab(
    $$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
    from prices
    left join currencies on prices.currency_id = currencies.code

    where nomenklator_id in (

    select distinct
        coalesce(complects.guid_complect, nomenklators.guid) as guid

      from nomenklators

               left join complects on complects.nomenklator_id = nomenklators.guid

               where nomenklators.guid in (${strQuery0}) and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    )

    order by 1$$,
    $$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
    )

    AS (guid text, price1 numeric, price2 numeric, price3 numeric)
    )

  select
    nomenklators.guid,

    sum(round(coalesce(complects.qty, 1) * pl.price1, 2)) as price1,
    sum(round(coalesce(complects.qty, 1) * pl.price2, 2)) as price2,
    sum(round(coalesce(complects.qty, 1) * pl.price3, 2)) as price3

    from nomenklators

       left join complects on complects.nomenklator_id = nomenklators.guid
         join price_list_with_compl as pl on pl.guid = nomenklators.guid or pl.guid = complects.guid_complect

         group by nomenklators.guid)

  select
  COALESCE(nomenklators.weight, 0) as weight,
      nomenklators.guid,
      nomenklators.parentguid,
          nomenklators.artikul,
          nomenklators.artikul_new,
          nomenklators.name,
          nomenklators.synonym,
          nomenklators.itgroup,
          nomenklators.guid_picture,
          replace(nomenklators.guid_picture, '250x250', '82x82') guid_picture_small,
          nomenklators.sort_field,
          nomenklators.describe,
          nomenklators.is_complect,
          case when nomenklators.itgroup then '' else coalesce( case when nomenklators.is_complect > 0 then 'компл.' else unit_types.name end, 'нет ед.изм.') end as unit_name,
          nomenklators.unit_type_id unit_type_id,

    COALESCE(price_list_total.price1, 0.00) as price1,
    COALESCE(price_list_total.price2, 0.00) as price2,
    COALESCE(price_list_total.price3, 0.00) as price3,

    COALESCE(order_goods.qty::real, 0) as qty1,
    COALESCE(order_goods.qty::real, 0) as qty2,

    round(COALESCE(order_goods.price, 0.00), 2) as price_order,

    round(COALESCE(price_list_total.price1, 0.00)*COALESCE(order_goods.qty, 0.0000), 2) as total,

      nomenklators.intrnt_keyword, nomenklators.intrnt_title, nomenklators.intrnt_description, nomenklators.intrnt_og_title, nomenklators.intrnt_microdata

    from nomenklators

    left join price_list_total on nomenklators.guid = price_list_total.guid

    left join orders on orders.id = ${params.orderid || null} and orders.status = 0
    left join order_goods on order_goods.order_id = ${params.orderid || null} and price_list_total.guid = order_goods.nomenklator_id

    left join unit_types on right('0000' || nomenklators.unit_type_id, 3) = unit_types.code

    where nomenklators.guid in (${strQuery0}) and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
  `
  //console.log(textqry);

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getGoodCard(params) {

  const textqry=`

  with price_list_total as (

    with price_list_with_compl as (

    select *
    from crosstab(
    $$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
    from prices
    left join currencies on prices.currency_id = currencies.code

    where nomenklator_id in (

    select distinct
        coalesce(complects.guid_complect, nomenklators.guid) as guid

      from nomenklators

               left join complects on complects.nomenklator_id = nomenklators.guid

               where nomenklators.synonym='${params.synonym}'

    )

    order by 1$$,
    $$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
    )

    AS (guid text, price1 numeric, price2 numeric, price3 numeric)
    )

  select
    nomenklators.guid,

    sum(round(coalesce(complects.qty, 1) * pl.price1, 2)) as price1,
    sum(round(coalesce(complects.qty, 1) * pl.price2, 2)) as price2,
    sum(round(coalesce(complects.qty, 1) * pl.price3, 2)) as price3

    from nomenklators

       left join complects on complects.nomenklator_id = nomenklators.guid
         join price_list_with_compl as pl on pl.guid = nomenklators.guid or pl.guid = complects.guid_complect

         group by nomenklators.guid)

  select
  COALESCE(nomenklators.weight, 0) as weight,
  --nomenklators.packing as packing,
      nomenklators.guid,
      nomenklators.parentguid,
          nomenklators.artikul,
          nomenklators.artikul_new,
          nomenklators.name,
          nomenklators.synonym,
          nomenklators.itgroup,
          nomenklators.guid_picture,
          replace(nomenklators.guid_picture, '250x250', '82x82') guid_picture_small,
          nomenklators.sort_field,
          nomenklators.describe,
          nomenklators.is_complect,
          case when nomenklators.itgroup then '' else coalesce( case when nomenklators.is_complect > 0 then 'компл.' else unit_types.name end, 'нет ед.изм.') end as unit_name,
          nomenklators.unit_type_id unit_type_id,

    COALESCE(price_list_total.price1, 0.00) as price1,
    COALESCE(price_list_total.price2, 0.00) as price2,
    COALESCE(price_list_total.price3, 0.00) as price3,

    COALESCE(order_goods.qty::real, 0) as qty1,
    COALESCE(order_goods.qty::real, 0) as qty2,

    round(COALESCE(order_goods.price, 0.00), 2) as price_order,

    round(COALESCE(price_list_total.price1, 0.00)*COALESCE(order_goods.qty, 0.0000), 2) as total,

      nomenklators.intrnt_keyword, nomenklators.intrnt_title, nomenklators.intrnt_description, nomenklators.intrnt_og_title, nomenklators.intrnt_microdata

    from nomenklators

    left join price_list_total on nomenklators.guid = price_list_total.guid

    left join orders on orders.id = ${params.orderid || null} and orders.status = 0
    left join order_goods on order_goods.order_id = ${params.orderid || null} and price_list_total.guid = order_goods.nomenklator_id

    left join unit_types on right('0000' || nomenklators.unit_type_id, 3) = unit_types.code

    where nomenklators.synonym='${params.synonym}'

    ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getGoodCardComplects(params) {

  const textqry=`

  create extension if not exists tablefunc;

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
    inner join nomenklators on nomenklators.guid = complects.nomenklator_id and nomenklators.synonym='${params.synonym}'
  )

  order by 1$$,
  $$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
  )

  AS (guid text, price1 numeric, price2 numeric, price3 numeric)
  )



     SELECT complects.id,
                                                      complects.name,
                                                      complects.guid_complect as guid,

                                                      coalesce(complects.artikul, '--') as artikul,
                                                      coalesce(complects.artikul_new, '--') as artikul_new,

                                                      complects.qty::real qty,
                                                      coalesce(order_goods.qty::real , 0) as qty_order,
                                                      'https://newfurnitura.ru/upload/' || complects.guid_complect || '.jpg' as pic_path,
                                                      'https://newfurnitura.ru/upload/' || complects.guid_complect || '_82x82.jpg' as pic_path_small,
                                                      coalesce(unit_types.name, '--') as unit_name,
                                                      coalesce(unit_types.code, '--') as unit_code,

                                                      COALESCE(price_list_compl.price1, 0.00) as price1,
                                                      COALESCE(price_list_compl.price2, 0.00) as price2,
                                                      COALESCE(price_list_compl.price3, 0.00) as price3

                                                      from complects

                          inner join nomenklators on nomenklators.guid = complects.nomenklator_id and nomenklators.synonym='${params.synonym}'

                                                      left join orders on orders.id = ${params.orderid || null} and orders.status = 0
                                                      left join order_goods on orders.id=order_goods.order_id and complects.nomenklator_id = order_goods.nomenklator_id and complects.nomenklator_id = order_goods.nomenklator_id

                                                      left join unit_types on right('0000' || complects.unit_type_id, 3) = unit_types.code

                                                      left join price_list_compl on complects.guid_complect = price_list_compl.guid

                                                       order by complects.name
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getGoodCardDopComplects(params) {

  const textqry=`

  create extension if not exists tablefunc;

  with price_list_compl as (

  			select *
  			from crosstab(
  			$$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
  			from prices
  			left join currencies on prices.currency_id = currencies.code

  			where nomenklator_id in (
  				select distinct substr(t1.name, 34) as name
  				from depots t1
  				inner join nomenklators t2 on t1.guid = t2.guid and t2.synonym = '${params.synonym}' and t1.type='dop_compl'
  			)

  			order by 1$$,
  			$$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
  			)

  			AS (guid text, price1 numeric, price2 numeric, price3 numeric)
  			)



  			   SELECT
                                                            substr(depots.name, 34) as guid,

                                                            nomenklators.parentguid,
                                                            nomenklators.synonym,
                                                            nomenklators.name as name,
                                                            nomenklators.artikul as artikul,
                                                            nomenklators.artikul_new as artikul_new,

                                                            coalesce(order_goods.qty , 0)::real as qty1,
                                                            coalesce(order_goods.qty , 0)::real as qty2,

                                                            round(COALESCE(order_goods.price, 0.00), 2) as price_order,

                                                            'https://newfurnitura.ru/upload/' || substr(depots.name, 1, 32) || '_250x250.jpg' as guid_picture,

                                                            coalesce(unit_types.name, '--') as unit_name,

                                                            nomenklators.unit_type_id unit_type_id,


                                                            COALESCE(price_list_compl.price1, 0.00) as price1,
                                                            COALESCE(price_list_compl.price2, 0.00) as price2,
                                                            COALESCE(price_list_compl.price3, 0.00) as price3

                                                            from depots

                                                            left join price_list_compl on substr(depots.name, 34) = price_list_compl.guid
                                                            left join nomenklators on substr(depots.name, 34) = nomenklators.guid
                                                            left join unit_types on right('0000' || nomenklators.unit_type_id, 3) = unit_types.code

                                                            left join orders on orders.id = ${params.orderid || null} and orders.status = 0
                                                            left join order_goods on orders.id=order_goods.order_id and substr(depots.name, 34) = order_goods.nomenklator_id

  														                              inner join nomenklators t2 on depots.guid = t2.guid and t2.synonym = '${params.synonym}' and depots.type='dop_compl'

                                                            order by depots.name
  `
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getPhotos250(params) {

  const textqry=`

  with r as (select
  COALESCE(nomenklators.guid_picture, '') as pic_path,
  nomenklators.name as name,
  nomenklators.artikul as artikul,
  nomenklators.artikul_new as artikul_new,
  null as serv,
  0 as sort,
  '' as alt
  from nomenklators
  where nomenklators.synonym='${params.synonym}'
  union all
  select distinct
  COALESCE(depots.name, '') as pic_path,
  nomenklators.name as name,
  nomenklators.artikul as artikul,
  nomenklators.artikul_new as artikul_new,
  depots.name as serv,
  1,
  depots.alt
  from nomenklators left join depots on nomenklators.guid = depots.guid
  where nomenklators.synonym='${params.synonym}' and COALESCE(depots.name, '') like '%250x250%' )
  select * from r where pic_path <> '' order by sort, pic_path
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getInstructions(params) {

  const textqry=`
  select
  COALESCE(depots.name, '') as pic_path,
  nomenklators.name as name,
  nomenklators.artikul as artikul,
  nomenklators.artikul_new as artikul_new,
  depots.alt
  from nomenklators inner join depots on nomenklators.guid = depots.guid
  where nomenklators.synonym='${params.synonym}' and type='instruction'
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getBreadCrumbs(params) {

  const textqry=`

  WITH RECURSIVE r AS (

						select id, level_group, guid, parentguid, name, intrnt_keyword, intrnt_microdata, guid_picture
						from nomenklators where guid='${params.parentguid}'

						union all

						select nom.id, nom.level_group, nom.guid, nom.parentguid, nom.name, nom.intrnt_keyword, nom.intrnt_microdata, nom.guid_picture
            from nomenklators as nom join r on nom.guid = r.parentguid
					)

					select 0 as id, 'Дом' as name, null as guid,  0  as level_group, '' as intrnt_keyword, '{}'::jsonb as intrnt_microdata, '' as guid_picture
					 union
					select id, name, guid, level_group, intrnt_keyword, intrnt_microdata, guid_picture from r order by level_group

  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getStrucCatalog_old() {

  const textqry=`
  WITH RECURSIVE location_with_level AS (
    SELECT guid node_id, name, parentguid parent_id, 0 AS lvl
      FROM nomenklators
     WHERE
        parentguid is NULL and guid not in ( 'yandexpagesecret', 'sekretnaya_papka' )

    UNION ALL

    SELECT child.guid, child.name, child.parentguid, lvl + 1
      FROM nomenklators child
      JOIN location_with_level parent ON parent.node_id = child.parentguid and child.itgroup
        where lvl <=1
  ),
  maxlvl AS (
    SELECT max(lvl) maxlvl FROM location_with_level
  ),
  c_tree AS (
    (SELECT location_with_level.*,
           '[]'::JSONB children
      FROM location_with_level, maxlvl
     WHERE lvl = maxlvl order by location_with_level.lvl, location_with_level.name)

     UNION

     (
       SELECT (branch_parent).*,
              jsonb_agg(branch_child order by branch_child ->> 'name')
         FROM (
           SELECT branch_parent,
                  to_jsonb(branch_child) - 'lvl' - 'parent_id' AS branch_child
             FROM location_with_level branch_parent
             JOIN c_tree branch_child ON branch_child.parent_id = branch_parent.node_id
         ) branch
         GROUP BY branch.branch_parent

         UNION

         SELECT c.*,
                '[]'::JSONB
         FROM location_with_level c
         WHERE NOT EXISTS (SELECT 1
                             FROM location_with_level hypothetical_child
                            WHERE hypothetical_child.parent_id = c.node_id)
     )
  ),
  c_tree_sort AS (


         SELECT node_id, name, children from c_tree WHERE lvl=0
        order by lvl, name, (children->>'name')::text ASC
  )

  select
  jsonb_pretty(
        array_to_json(
                array_agg(
                        row_to_json(c_tree_sort)::JSONB
                                )
                        )::JSONB
        ) AS tree
  from c_tree_sort
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

export function getStrucCatalog() {

  const textqry=`
  With recursive r as (   select id::text, name, level_group, guid, '' as parentguid from nomenklators
          where level_group = 1
          and guid!='d6699c69-8e85-4709-9676-27a8c27c'

        union all

        select nomenklators.id::text || nom1.id::text as id , nom1.name, nom1.level_group, nom1.guid, nom1.parentguid from nomenklators as nom1 join nomenklators on nom1.parentguid = nomenklators.guid where nom1.itgroup )

        select name, level_group, guid node_id, parentguid from r
        where
            guid!='sekretnaya_papka' and parentguid!='sekretnaya_papka'
            and guid!='yandexpagesecret' and parentguid!='yandexpagesecret'
              order by id
              `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

//nikolas
export function getNomenklatorY() {
  return {
    name: '',
    text: `
    SELECT JSON_AGG(src) AS res
    FROM (
      select t1.filial, t2.artikul, CONCAT(t2.name, ' (', t2.artikul_new, ')') as name, t1.qty1, t1.qty1-t1.qty2 qty1, t1.qty2 qty2, t1.qty3 qty3,t1.qty4 qty4, t1.price3 price
      from blnc_mob t1
      left join nomenklators t2 on t1.guid = t2.guid
      where price3<>0
    ) src    `,
    values: [],
  }
}

//search
export function getSearchNomenklator_old({searchtext}) {

  const strQueryWhereExactly  = searchtext.split(' ').join('').toLowerCase()
  const strQueryWhere         = '%' + searchtext.split(' ').join('%').toLowerCase() + '%'
  const strQueryWhereArtikul  = searchtext.split(' ').join('%').toLowerCase() + '%'

  const textqry = `

  SELECT DISTINCT trim(nomenklators2.name) as name1, nomenklators2.guid, nomenklators2.parentguid,
         min(case when (lower(nomenklators1.artikul) = '${strQueryWhereExactly}' or lower(nomenklators1.artikul_new) = '${strQueryWhereExactly}' ) then 0 else 1 end) as ord
                   FROM
                   nomenklators as nomenklators1
                   inner join nomenklators as nomenklators2 on nomenklators1.parentguid = nomenklators2.guid

               WHERE ( lower(nomenklators1.name) like '${strQueryWhere}'
                 OR lower(nomenklators2.name)  like '${strQueryWhere}'
                   OR lower(nomenklators1.synonym)  like '${strQueryWhere}'
                   OR lower(nomenklators2.synonym)  like '${strQueryWhere}'
                     OR lower(nomenklators1.artikul) like '${strQueryWhereArtikul}'
                     OR lower(nomenklators1.artikul_new) like '${strQueryWhereArtikul}'
                       AND NOT nomenklators1.itgroup and nomenklators2.guid!='yandexpagesecret' and nomenklators2.guid!='sekretnaya_papka'
                               and case when nomenklators2.parentguid is null then true else nomenklators2.parentguid != 'yandexpagesecret' end
                               and case when nomenklators2.parentguid is null then true else nomenklators2.parentguid != 'sekretnaya_papka' end
                       ) group by nomenklators2.guid, nomenklators2.parentguid, nomenklators2.name
                       having nomenklators2.guid != 'sekretnaya_papka'
                       ORDER BY ord, trim(nomenklators2.name)
                       limit 30

                       `
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getSearchNomenklator_old1( searchtext ) {

  let whereStr = searchtext.toLowerCase().split(' ');

  whereStr.forEach(function(el, i) {this[i] = "'" + el + "'"}, whereStr);

  whereStr = `all(array[${whereStr.join(',')}])`

  //console.log(whereStr)

  const textqry = `

  with r1 as (select parentguid, synonym, name, artikul, artikul_new from nomenklators
  where not itgroup
  and parentguid not in ('yandexpagesecret', 'sekretnaya_papka')
  and
  (lower(name) ~ ${whereStr} or lower(artikul) ~ ${whereStr} or lower(artikul_new) ~ ${whereStr} )
  limit 50
  )
  select name, guid,
  (
        select array_to_json(array_agg(row_to_json(d)))
        from (
          select synonym, name, artikul, artikul_new
          from r1
          where r1.parentguid=t1.guid
  		  order by artikul
        ) d
      ) as goods

  from nomenklators t1
  where guid in (select distinct parentguid from r1)
  order by name
  `
   console.log(textqry);
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getSearchNomenklator_old2( searchtext ) {

  let whereStr = searchtext.toLowerCase().split(' ');

  whereStr.forEach(function(el, i) {this[i] = "'" + el + "'"}, whereStr);

  whereStr = `all(array[${whereStr.join(',')}])`

  //console.log(whereStr)

  const textqry = `
  select distinct synonym, name || ' (' || artikul || ')' || ' (' || artikul_new || ')' descr, artikul, artikul_new from nomenklators
  where not itgroup
  and parentguid not in ('yandexpagesecret', 'sekretnaya_papka')
  and
  (lower(name) ~ ${whereStr} or lower(artikul) ~ ${whereStr} or lower(artikul_new) ~ ${whereStr} )
  order by descr
  limit 20
  `
   //console.log(textqry);
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getSearchNomenklator_old3(searchtext) {

  const strQueryWhereExactly  = searchtext.split(' ').join('').toLowerCase()
  const strQueryWhere         = '%' + searchtext.split(' ').join('%').toLowerCase() + '%'
  const strQueryWhereArtikul  = searchtext.split(' ').join('%').toLowerCase() + '%'

  const textqry = `

  SELECT DISTINCT trim(nomenklators2.name) as descr, nomenklators2.guid synonym, nomenklators2.parentguid,
         min(case when (lower(nomenklators1.artikul) = '${strQueryWhereExactly}' or lower(nomenklators1.artikul_new) = '${strQueryWhereExactly}' ) then 0 else 1 end) as ord
                   FROM
                   nomenklators as nomenklators1
                   inner join nomenklators as nomenklators2 on nomenklators1.parentguid = nomenklators2.guid

               WHERE ( lower(nomenklators1.name) like '${strQueryWhere}'
                 OR lower(nomenklators2.name)  like '${strQueryWhere}'
                   OR lower(nomenklators1.synonym)  like '${strQueryWhere}'
                   OR lower(nomenklators2.synonym)  like '${strQueryWhere}'
                     OR lower(nomenklators1.artikul) like '${strQueryWhereArtikul}'
                     OR lower(nomenklators1.artikul_new) like '${strQueryWhereArtikul}'
                       AND NOT nomenklators1.itgroup and nomenklators2.guid!='yandexpagesecret' and nomenklators2.guid!='sekretnaya_papka'
                               and case when nomenklators2.parentguid is null then true else nomenklators2.parentguid != 'yandexpagesecret' end
                               and case when nomenklators2.parentguid is null then true else nomenklators2.parentguid != 'sekretnaya_papka' end
                       ) group by nomenklators2.guid, nomenklators2.parentguid, nomenklators2.name
                       having nomenklators2.guid != 'sekretnaya_papka'
                       ORDER BY ord, trim(nomenklators2.name)
                       limit 30

                       `
                       // console.log(textqry);
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
export function getSearchNomenklator( searchtext ) {

  let whereStr = searchtext.toLowerCase().split(' ');

  whereStr.forEach(function(el, i) {this[i] = "'" + el + "'"}, whereStr);

  whereStr = `all(array[${whereStr.join(',')}])`

  //console.log(whereStr)

  const textqry = `
  with r1 as (
  select distinct t2.id, t1.parentguid, t1.synonym, ' (' || t1.artikul || ') ' || t1.name || ' (' || t1.artikul_new || ')' descr, t1.name, t1.artikul, t1.artikul_new, t1.itgroup
  	from nomenklators t1
  	inner join nomenklators t2 on t2.guid = t1.parentguid
    where not t1.itgroup
    and t1.parentguid not in ('yandexpagesecret', 'sekretnaya_papka')
  	and ( t2.parentguid is null or t2.parentguid not in ('yandexpagesecret', 'sekretnaya_papka') )
    and
    ( lower(t1.name || ' ' || t1.artikul || ' ' || t1.artikul_new ) ~ ${whereStr} )
  order by t1.name
    limit 20)
    select id, synonym, synonym descr, guid parentguid, itgroup from nomenklators t where lower(synonym || ' ' || name) ~ ${whereStr} and itgroup
    	union all
    select distinct min(r1.id) id, r1.synonym, r1.descr, t1.parentguid, r1.itgroup
    from r1
    inner join nomenklators t1 on r1.id = t1.id
    group by r1.synonym, r1.descr, t1.parentguid, r1.itgroup
  `
     //console.log(textqry);
  return {
    name: '',
    text: textqry,
    values: [],
  }
}
