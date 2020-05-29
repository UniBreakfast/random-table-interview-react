import React, { Component } from 'react'
import NumRow from './numRow/NumRow'
import { genNumMatrix, calcAvgNums, genNumRow, calcRowSum } from '../../numMatrix'
import AvgRow from './avgRow/AvgRow'
import Button from '../button/Button'

const DEFAULT_ROWS = 5,  DEFAULT_COLS = 7,  DEFAULT_CLOSEST = 4

export class Table extends Component {

  state = {
    ...genNumMatrix(DEFAULT_ROWS, DEFAULT_COLS),
    rows: {value: DEFAULT_ROWS},
    cols: {value: DEFAULT_COLS},
    closest: {value: DEFAULT_CLOSEST},
  }

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

  handleInput(label, event) {
    this.setState({[label]: {value: +event.target.value}})
  }

  render() {
    return (
      <table border="1">
        <caption>
          <label>rows:
            <input type="number" value={this.state.rows.value}
              onChange={ e => this.handleInput('rows', e) }></input>
          </label>
          <label>columns:
            <input type="number" value={this.state.cols.value}
              onChange={ e => this.handleInput('cols', e) }></input>
          </label>
          <label>closest:
            <input type="number" value={this.state.closest.value}
              onChange={ e => this.handleInput('closest', e) }></input>
          </label>
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
