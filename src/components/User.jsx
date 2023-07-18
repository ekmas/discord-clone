import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { MainContext } from '../contexts/MainContext'
import defaultpfp from '../media/img/defaultpfp.png'

export default function User() {
  const { myName } = useContext(MainContext)

  return (
    <div className="w-full h-[53px] bg-black-4 text-white flex items-center justify-between px-2">
      <div className="flex items-center">
        <div
          style={{ backgroundImage: `url(${defaultpfp})` }}
          className="w-8 h-8 rounded-full m850:hidden bg-center bg-cover mr-3"
        ></div>
        <p className="font-semibold overflow-hidden max-w-[120px] m850:max-w-[70px] text-ellipsis whitespace-nowrap text-sm">
          {myName}
        </p>
      </div>
      <button
        className="group w-8 h-8 rounded hover:bg-gray-7 flex items-center justify-center"
        onClick={() => {
          signOut(auth)
        }}
      >
        <div className="relative">
          <svg
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M18 2H7C5.897 2 5 2.898 5 4V11H12.59L10.293 8.708L11.706 7.292L16.414 11.991L11.708 16.706L10.292 15.294L12.582 13H5V20C5 21.103 5.897 22 7 22H18C19.103 22 20 21.103 20 20V4C20 2.898 19.103 2 18 2Z"
            ></path>
          </svg>
          <div className="absolute bottom-[17px] left-[-33px] scale-0 z-10 group-hover:scale-100 hover:hidden transition-all duration-75">
            <div className="bottom-10 w-auto px-3 py-2 m-2 min-w-max rounded-md shadow-md text-overlay-text bg-black text-sm font-semibold">
              Log Out
            </div>
            <div className="relative left-[38px] bottom-2 w-[10px] border-transparent border-[5px] border-t-black"></div>
          </div>
        </div>
      </button>
    </div>
  )
}
