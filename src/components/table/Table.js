import React, { Component } from 'react'
import NumRow from './numRow/NumRow'
import { genNumMatrix, calcAvgNums, genNumRow, calcRowSum, calcPortions } from '../../numMatrix'
import AvgRow from './avgRow/AvgRow'
import Button from '../button/Button'
import Field from '../field/Field'
import classes from './table.module.css'

export class Table extends Component {

  state = this.props.numData

  generate() {
    this.setState(genNumMatrix(this.state.rows.value, this.state.columns.value))
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

  incrCell(id) {
    this.setState(({numRows, sums}) => {
      const {length} = numRows[0],
            i = numRows.flat().findIndex(num => num.ID === id),
            y = i / length | 0,
            x = i % length,
            cell = numRows[y][x],
            row = [
              ...numRows[y].slice(0, x),
              {...cell, Amount: cell.Amount+1},
              ...numRows[y].slice(x+1)
            ]

      numRows = [...numRows.slice(0, y), row, ...numRows.slice(y+1)]
      sums = [...sums.slice(0, y), calcRowSum(row), ...sums.slice(y+1)]
      calcPortions([row, sums[y]])

      return {numRows, avgNums: calcAvgNums(numRows), sums}
    })
  }

  handleInput(label, event) {
    this.setState({[label]: {value: +event.target.value}})
  }

  activate(row) {
    this.setState({activeRow: row})
  }

  light(id) {
    const nums = this.state.numRows.flat(),
          amount = nums.find(num => num.ID === id).Amount

    this.setState({litIDs: nums.map(num => ({
      id: num.ID, diff: Math.abs(num.Amount - amount),
    })).sort((a, b) => a.diff - b.diff)
      .slice(0, this.state.closest.value+1).map(dif => dif.id)})
  }

  dim() { this.setState({litIDs: []}) }

  render() {
    return (
      <table border="1">
        <caption>
          {['rows', 'columns', 'closest'].map((label, i) =>
            <Field key={i} label={label} value={this.state[label].value}
              handler={ e => this.handleInput(label, e) }/>)}
          <Button label="generate" handler={ ()=> this.generate() }/>
        </caption>
        <tbody>
          {this.state.numRows.map((row, i) => <NumRow key={i} nums={row}
            sum={this.state.sums[i]} remHandler={ ()=> this.removeRow(i) }
            incrHandler={ this.incrCell.bind(this)} litIDs={this.state.litIDs}
            hoverHandler={ this.light.bind(this) }
            unhoverHandler={ ()=>this.dim() }
            classes={classes} active={ i===this.state.activeRow }
            activator={ ()=> this.activate(i) }
            deactivator={ ()=> this.activate(-1) } />)
          }
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
