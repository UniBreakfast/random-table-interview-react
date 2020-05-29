import React from 'react'

function Field({label, className, value, handler}) {
  return (
    <label className={className || ''} >{label}:
      <input type="number" value={ value } onChange={ handler }></input>
    </label>
  )
}

export default Field
