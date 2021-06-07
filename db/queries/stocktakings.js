//stock-takings
export function getStockTakings( {pageSize, currentLength, curFilial} ) {

  const textqry = `
  select id, artikul1, artikul2, name1, unit, qty1, qty2
  from stock_taking
  where filial = '${curFilial}'
  order by id
  limit 100
  offset 0
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}
