import React, { Component } from 'react'
import NumRow from './numRow/NumRow'
import genNumMatrix from '../../numMatrixGen'
import AvgRow from './avgRow/AvgRow';
import Button from '../button/Button';

export class Table extends Component {

  state = genNumMatrix(5, 7)

  render() {
    console.log(this.state);

    return (
      <table border="1">
        <caption>
          <label>Input:</label>
          <input></input>
          <Button label="generate"/>
        </caption>
{/*         <thead>
          <tr>
            <th>a</th>
            <th>b</th>
            <th>c</th>
          </tr>
        </thead> */}
        <tbody>
          {this.state.numRows.map((row, i) => <NumRow key={i} nums={row}
                                                  sum={this.state.sums[i]} />)}
        </tbody>
        <tfoot>
          <AvgRow avgNums={this.state.avgNums} />
        </tfoot>
      </table>
    )
  }
}


export default Table
