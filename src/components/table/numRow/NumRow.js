import React from 'react'
import NumCell from './numCell/NumCell'
import Button from '../../button/Button'


function NumRow({nums, sum, remHandler, incrHandler, hoverHandler,
  unhoverHandler, litIDs, classes, active, activator, deactivator}) {
  return (
    <tr className={active? classes.activeRow : ''}>
      {nums.map(num => <NumCell className={
        classes.num + (litIDs.includes(num.ID)? ' '+(litIDs[0]===num.ID?
          classes.hilit : classes.lit) : '') }
        key={num.ID} amount={num.Amount} portion={num.portion}
        clickHandler={ ()=> incrHandler(num.ID) }
        hoverHandler={ ()=> hoverHandler(num.ID) }
        leaveHandler={ unhoverHandler }/>)}
      <th onMouseOver={ activator } onMouseLeave={deactivator}>{sum}</th>
      <td>
        <Button className="rem-btn" label="remove"
              handler={ remHandler }/>
      </td>
    </tr>
  )
}

export default NumRow
