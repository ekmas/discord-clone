import React from 'react'

export default function SameSenderMessage({ formattedTime, msg }) {
  return (
    <div className="px-4 m400:px-2 py-1 hover:bg-gray-11 group">
      <div className="grid grid-cols-message m400:gap-2 gap-4">
        <div>
          <div className="text-center text-gray-14 m400:text-[10px] text-[11px] font-medium tracking-tighter flex items-center justify-center">
            <p className="leading-[22px] hidden group-hover:inline">
              {formattedTime}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="leading-[22px] break-words">{msg}</p>
        </div>
      </div>
    </div>
  )
}
