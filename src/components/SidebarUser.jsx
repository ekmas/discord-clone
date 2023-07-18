import React from 'react'
import defaultpfp from '../media/img/defaultpfp.png'

export default function SidebarUser({ name }) {
  return (
    <div className="ml-2 userbtn btn px-2 h-[42px] flex items-center rounded hover:bg-gray-5 group min-w-[224px] m1000:min-w-[130px] m1000:max-w-[130px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
      <div
        style={{ backgroundImage: `url(${defaultpfp})` }}
        className="w-8 h-8 userbtn btn rounded-full bg-center bg-cover mr-3 userbtndiv"
      ></div>
      <div className="whitespace-nowrap btn max-w-[70px] overflow-ellipsis overflow-hidden userbtn userbtndiv">
        <p className="font-semibold btn text-base text-gray-13 group-hover:text-overlay-text userbtn userbtnp">
          {name}
        </p>
      </div>
    </div>
  )
}
