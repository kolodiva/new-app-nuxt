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

export function getManagers() {

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
