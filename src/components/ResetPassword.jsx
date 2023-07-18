import React from 'react'

export default function ResetPassword({ show, email, setResetPassword }) {
  return (
    <div className={show ? 'reset-password active' : 'reset-password'}>
      <div className="container">
        <div className="font-semibold p-4 text-white flex items-start justify-start bg-main-gray rounded-t">
          <h1 className="text-xl leading-[24px]">Instructions Sent</h1>
        </div>
        <div className="pb-5 pl-4 pr-2 text-base font-normal text-overlay-text leading-5 bg-main-gray ">
          We sent instructions to change your password to
          <strong className="inline-block font-semibold">{email}</strong>,
          please check both your inbox and spam folder.
        </div>
        <div className="flex p-4 justify-end bg-overlay-btn-bg rounded-b">
          <button
            onClick={() => {
              setResetPassword(false)
            }}
            className="text-white font-medium text-sm bg-button-initial w-24 h-[38px] rounded-secondary"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}
