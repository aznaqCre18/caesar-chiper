import React from 'react'

function Button({label, onClick, disable}) {
  return (
    <button disabled={disable} type="submit" onClick={onClick} className={`btn ${disable ? 'disable' : ''}`}>{label}</button>
  )
}

export default Button
