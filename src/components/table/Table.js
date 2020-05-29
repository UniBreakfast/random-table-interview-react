import React, { Component } from 'react'
import NumRow from './numRow/NumRow'
import { genNumMatrix, calcAvgNums, genNumRow, calcRowSum } from '../../numMatrix'
import AvgRow from './avgRow/AvgRow';
import Button from '../button/Button';

export class Table extends Component {

  state = genNumMatrix(5, 7)

  removeRow(index) {
    this.setState(prevState => {
      const numRows = prevState.numRows.filter((_, i)=> i!==index),
            sums = prevState.sums.filter((_, i)=> i!==index)
      return {numRows, avgNums: calcAvgNums(numRows), sums}
    })
  }

  addRow() {
    this.setState(prevState => {
      const length = prevState.avgNums.length,
            counter = {i: prevState.nextId},
            newRow = genNumRow(length, counter),
            numRows = [...prevState.numRows, newRow],
            sums = [...prevState.sums, calcRowSum(newRow)]

      return {numRows, avgNums: calcAvgNums(numRows), sums, nextId: counter.i}
    })
  }

  render() {
    return (
      <table border="1">
        <caption>
          <label>Input:</label>
          <input></input>
          <Button label="generate"/>
        </caption>
        <tbody>
          {this.state.numRows.map((row, i) => <NumRow key={i} nums={row}
            sum={this.state.sums[i]} remHandler={ ()=> this.removeRow(i) } />)}
        </tbody>
        <tfoot>
          <AvgRow avgNums={this.state.avgNums}
                  addHandler={ ()=>this.addRow() }/>
        </tfoot>
      </table>
    )
  }
}


export default Table
