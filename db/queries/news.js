//news
export function getNewsBlock() {

  const textqry=`
  select header, picture1 icon, path_pic2 pic, path_pdf  pdf
  from new_blocks
  where on_slider and on_public
  order by id desc
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

export function getManagers_old() {

  const textqry=`
  select tmp.* from (
  					  select order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site
  						where position like '%Директор по продажам%' and false
  					  union all
  					  select order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{ 1000000 }' ) as tmp
  					  order by tmp.rozn, tmp.order_by, tmp.name
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

export function getManagers() {

  const textqry=`
  with r2 as (
  with r1 as (
  select
  	order_by,
  	case
  	when filials = '{ 1000000 }' then '1'
  	when filials = '{ 0100000 }' then '7'
  	when filials = '{ 0010000 }' then '6'
  	when filials = '{ 0001000 }' then '3'
  	when filials = '{ 0000100 }' then '4'
  	when filials = '{ 0000010 }' then '2'
  	when filials = '{ 0000001 }' then '5'
  	else '0' end filial,
  	case when lower(region) like '%розница%' then 0 else 1 end rozn,
  	name manager, tel_add, tel_mob, email, skype, region, position
  	from managers_site

  	union all

  	select 1, '1', 2, 'Хренов<br/>Дмитрий<br/>Игоревич', '029', '+7 (915) 480-07-33 (моб.)<br/>+7 (916) 149-57-60<br/>+7 (916) 149-57-61', 'hrenov@newfurnitura.ru', '', '', '<br/>менеджер отдела<br/>снабжения'

  	order by filial, rozn, order_by, manager
  )
  	select filial, rozn,
  	json_agg(
  		json_build_object(
  			'manager', manager,
  			'position', position,
          	'tel_add', tel_add,
          	'tel_mob', tel_mob,
          	'email', email,
          	'skype', skype,
          	'region', region
       		)
  	) descr

  	from r1
  	group by filial, rozn
  	order by filial, rozn)

  	select filial,
  	json_agg(
  			json_build_object(
  				'rozn', rozn,
  				'managers', descr
  				)
       		) descr

  	from r2
  	group by filial
  	order by filial
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

export function getSeoText(params) {

  const textqry=`
				select content from seo_articles where name_group='${params.parentguid}'
  `
//console.log(params.parentguid);

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
