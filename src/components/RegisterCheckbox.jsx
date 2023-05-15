import React from 'react'

export default function RegisterCheckbox({ setToggleCheckbox, toggleCheckbox }) {
  return (
    <div className="flex items-center mr-2 mt-[25px] px-[1px]">
        <div className="flex justify-center items-center w-[22px] h-[22px] relative rounded-md outline outline-border outline-1">
            <input type="checkbox" name="checkbox" id="checkbox" className="cursor-pointer w-[22px] h-[22px] rounded-md relative before:w-full before:h-full before:bg-main-gray before:block before:rounded-md appearance-none" onClick={() => {setToggleCheckbox(true)}} checked={toggleCheckbox} readOnly/>
            <div className="cursor-pointer absolute rounded-md w-[22px] h-[22px] z-10 pt-[2px] pl-[1.5px] bg-button-initial" onClick={() => {setToggleCheckbox(false)}} style={{ display: toggleCheckbox ? 'block' : 'none' }} >
                <svg className="rounded-md" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
            </div>
        </div>
        
        <div className="text-xs pl-[9px]">
            <p onClick={() => {setToggleCheckbox(!toggleCheckbox)}} className="inline cursor-pointer text-overlay-text">I have read and agree to Discord's </p>
            <a className="text-link inline hover:underline" href="//discord.com/terms" rel="noreferrer noopener" target="_blank">Terms of Service</a>
            <p onClick={() => {setToggleCheckbox(!toggleCheckbox)}} className="inline cursor-pointer text-overlay-text"> and </p>
            <a className="text-link inline hover:underline" href="//discord.com/privacy" rel="noreferrer noopener" target="_blank">Privacy Policy</a>
            <p className="inline">.</p>
        </div>
    </div>
  )
}
