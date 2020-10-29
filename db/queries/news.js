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
