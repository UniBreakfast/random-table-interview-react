import React from 'react'

function NumCell({amount, portion, clickHandler, hoverHandler, leaveHandler,
  className}) {
  portion+='%'
  return (
    <td onClick={ clickHandler } onMouseOver={ hoverHandler }
      onMouseLeave={ leaveHandler }
      className={className} data-portion={portion}
      style={{'--portion': portion}}
    >
      {amount}
    </td>
  )
}

export default NumCell
