//news
export function getNewsBlock() {

  const textqry=`
  select header, picture1 icon, path_pic2 pic, path_pdf
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

export function getNewsArhive( {pageSize, currentLength, curFilial} ) {

  let textWhereFilial = "";

  if (curFilial === 0) {
    textWhereFilial = "";
  } else if (curFilial === 1) {
    textWhereFilial = "where filials[1] = 1";
  } else if (curFilial === 2) {
    textWhereFilial = "where filials[6] = 1";
  } else if (curFilial === 3) {
    textWhereFilial = "where filials[4] = 1";
  } else if (curFilial === 4) {
    textWhereFilial = "where filials[5] = 1";
  } else if (curFilial === 5) {
    textWhereFilial = "where filials[7] = 1";
  } else if (curFilial === 6) {
    textWhereFilial = "where filials[3] = 1";
  } else if (curFilial === 7) {
    textWhereFilial = "where filials[2] = 1";
}

  const textqry=`
  select id, header, 'data:image/jpeg; base64, ' || encode(picture1, 'escape') icon, path_pdf
  from new_blocks ${textWhereFilial}
    order by id desc
    limit ${pageSize}
    offset ${currentLength ? currentLength : 0}
  `
//console.log(textqry);

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

export function getNewCard( id ) {

  const textqry=`
  select id, name, 'data:image/jpeg; base64, ' || encode(picture1, 'escape') pic1, path_pic2 pic2, on_slider, on_public, filials, path_pdf, date
  from new_blocks where id = ${id}
  `
//console.log(textqry);

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

//export function getManagers(id = undefined) {
export function getManagers(id) {

  const textWhereFilial = id == undefined ? "" : "where filial = '" + id + "'" ;

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
  	name manager, tel_add, tel_mob, email, skype, region, position, marked
  	from managers_site

  	union all

  	select 1, '1', 2, 'Бурсов<br/>Владимир<br/>Сергеевич', '317', '+7 (915) 213-69-42 (моб.)', 'bursov@newfurnitura.ru', '', '', '<br/>Руководитель отдела<br/>закупок отечественных товаров', true

    union all

  	select 2, '1', 2, 'Хренов<br/>Дмитрий<br/>Игоревич', '177', '+7 (915) 480-07-33 (моб.)', 'hrenov@newfurnitura.ru', '', '', '<br/>Менеджер по<br/>снабжению', true

    union all

  	select 3, '1', 2, 'Власова<br/>Галина<br/>Рафековна', '', '+7 (916) 408-70-38 (моб.)', 'vlasova@newfurnitura.ru', '', '', '<br/>Менеджер по<br/>снабжению', true

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
          	'region', region,
            'whatsapp', marked
       		)
  	) descr

  	from r1 ${textWhereFilial}
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

export function getAdvsHtml(params) {

  const textqry=`
				select alt, intrnt_html from advshtml where type='html_code' and name='${params.id}'
  `
//console.log(params.parentguid);

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
