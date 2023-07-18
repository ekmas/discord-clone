import React from 'react'

export default function FormInput({
  type,
  setValue,
  inputError,
  errorMessage,
  name,
  id,
}) {
  return (
    <>
      <label
        className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block"
        htmlFor={id}
      >
        {name.toUpperCase()}
        <span className="text-red pl-1">{inputError && errorMessage}</span>
      </label>

      <div>
        <input
          type={type}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5"
          name={id}
          id={id}
        />
      </div>
    </>
  )
}
