import React from 'react'
import AvgCell from './avgCell/AvgCell'
import Button from '../../button/Button'


function AvgRow({avgNums}) {
  return (
    <tr>
      {avgNums.map((avg, i) => <AvgCell key={i} avg={avg} />)}
      <td></td><td><Button className="add-btn" label="add row"/></td>
    </tr>
  )
}

export default AvgRow
