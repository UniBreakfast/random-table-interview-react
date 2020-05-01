export default function genNumMatrix(rows, cols) {
  let count = 1

  const matrix = {
    numRows: [...Array(rows).keys()].map(()=> [...Array(cols).keys()].map(()=>
      ({ID: count++, Amount: Math.floor(Math.random()*900) + 100}))),
  }

  matrix.avgNums = matrix.numRows[0].map((_, col)=> matrix.numRows
    .reduce((sum, row)=> sum + row[col].Amount, 0) / matrix.numRows.length | 0)

  matrix.sums = matrix.numRows.map(row => row
    .reduce((sum, num)=> sum + num.Amount, 0))

  matrix.numRows.forEach((row, i) => row
    .forEach(num => num.portion = num.Amount / matrix.sums[i] * 100 | 0))

  return matrix
}
