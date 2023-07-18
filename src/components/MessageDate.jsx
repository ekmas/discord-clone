import React from 'react'

export default function MessageDate({ newDayDateFormat }) {
  return (
    <div className="flex justify-center text-xs font-semibold text-gray-14 relative px-4 mt-[17px]">
      <p className="z-10 px-2 py-px bg-main-gray">{newDayDateFormat}</p>
      <div className="w-[calc(100%-32px)] bg-gray-10 h-px absolute top-2"></div>
    </div>
  )
}
