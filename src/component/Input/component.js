import React from 'react'

function Input({label, placeholder, name, onChange, type}) {
  return (
    <div className="input-wrapper">
      <label htmlFor="plain-teks">{label}</label>
      <input onChange={onChange} name={name} type={type} placeholder={placeholder} autoComplete="off" />
    </div>
  )
}

export default Input;
