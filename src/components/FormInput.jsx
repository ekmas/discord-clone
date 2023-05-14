import React from 'react'

export default function FormInput({ type, setValue, inputError, errorMessage, inputType }) {
  return (
    <>
        <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor={type}>
            {type.toUpperCase()}
            <span className='text-red pl-1'>{inputError && errorMessage}</span>
        </label>
        
        <div>
            <input type={inputType} onChange={(e) => {setValue(e.target.value)}} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" name={type} id={type} />
        </div>
    </>
  )
}
