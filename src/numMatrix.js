export function genNumMatrix(rows, cols) {
  let counter = {i: 1}

  const numRows = [...Array(rows).keys()].map(()=> genNumRow(cols, counter)),
        avgNums = calcAvgNums(numRows),
        sums = numRows.map(row => calcRowSum(row))

  numRows.forEach((row, i) => row.forEach(num =>
    num.portion = num.Amount / sums[i] * 100 | 0))

  numRows.forEach((row, i) => calcPortions([row, sums[i]]))

  return {numRows, avgNums, sums, nextId: counter.i}
}

export function calcPortions([row, sum]) {
  row.forEach(num => num.portion = num.Amount / sum * 100 | 0)
}

export function calcAvgNums(numRows) {
  return numRows[0].map((_, col)=> numRows
    .reduce((sum, row)=> sum + row[col].Amount, 0) / numRows.length | 0)
}

export function genNumRow(length, counter) {
  return [...Array(length).keys()].map(()=>
      ({ID: counter.i++, Amount: Math.floor(Math.random()*900) + 100}))
}

export function calcRowSum(row) {
  return row.reduce((sum, num)=> sum + num.Amount, 0)
}