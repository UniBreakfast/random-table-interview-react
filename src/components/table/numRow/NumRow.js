import React from 'react'
import NumCell from './numCell/NumCell'
import Button from '../../button/Button'


function NumRow({nums, sum}) {
  return (
    <tr>
      {nums.map(num => <NumCell
        key={num.ID} amount={num.Amount} portion={num.portion}/>)}
      <th>{sum}</th>
      <td><Button className="rem-btn" label="remove"/></td>
    </tr>
  )
}

export default NumRow