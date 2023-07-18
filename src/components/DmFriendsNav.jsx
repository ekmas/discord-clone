import React from 'react'

export default function DmFriendsNav({
  activeFriendsSection,
  setActiveFriendsSection,
}) {
  return (
    <div className="bg-main-gray px-2 min-h-[49px] border-b border-black flex items-center w-full">
      <div className="h-6 mx-2 m600:hidden">
        <svg
          x="0"
          y="0"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path
              fill="#8e9196"
              fillRule="nonzero"
              d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
              transform="translate(2 4)"
            ></path>
            <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
          </g>
        </svg>
      </div>
      <div className="mr-2 text-white m600:hidden">
        <h1 className="font-semibold">Friends</h1>
      </div>
      <div className="bg-gray-7 w-px h-6 mx-2 m600:hidden"></div>
      <div className="flex h-6 m500:text-xs">
        <div
          onClick={() => {
            setActiveFriendsSection('all')
          }}
          className={
            activeFriendsSection === 'all'
              ? 'bg-gray-9 text-white font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none'
              : 'hover:bg-gray-9 hover:text-white text-gray-3 font-medium flex justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'
          }
        >
          All
        </div>
        <div
          onClick={() => {
            setActiveFriendsSection('pending')
          }}
          className={
            activeFriendsSection === 'pending'
              ? 'bg-gray-9 text-white font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none'
              : 'hover:bg-gray-9 hover:text-white text-gray-3 font-medium flex justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'
          }
        >
          Pending
        </div>
        <div
          onClick={() => {
            setActiveFriendsSection('add friend')
          }}
          className={
            activeFriendsSection === 'add friend'
              ? 'text-green-3 font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none'
              : 'bg-green-2 text-white flex font-medium justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'
          }
        >
          Add friend
        </div>
      </div>
    </div>
  )
}
