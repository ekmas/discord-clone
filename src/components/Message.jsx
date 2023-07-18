import React from 'react'
import defaultpfp from '../media/img/defaultpfp.png'

export default function Message({ sender, date, msg }) {
  return (
    <div className="px-4 m400:px-2 mt-[17px] py-1 hover:bg-gray-11">
      <div className="grid grid-cols-message m400:gap-2 gap-4 relative">
        <button className="pt-1 btn msgbtn h-max">
          <div
            style={{ backgroundImage: `url(${defaultpfp})` }}
            className="bg-center msgbtn btn bg-cover h-10 rounded-full"
          ></div>
        </button>
        <div className="flex flex-col min-h-[44px]">
          <div className="flex items-center">
            <button className="btn msgbtn font-medium leading-[22px] mr-1.5 text-white w-min">
              {sender}
            </button>
            <p className="font-medium text-xs m400:text-[10px] text-gray-14 leading-[22px]">
              {date}
            </p>
          </div>
          <p className="leading-[22px] break-words">{msg}</p>
        </div>
      </div>
    </div>
  )
}
