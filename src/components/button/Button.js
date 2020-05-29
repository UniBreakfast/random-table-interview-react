import React from 'react'

function Button({label, className, handler}) {
  return (
    <button className={className || ''} onClick={handler}>{label}</button>
  )
}

export default Button
