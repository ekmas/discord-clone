import React from 'react'

export default function LoadingDiv({ activeDiv }) {
  return (
    <div
      className={
        activeDiv === 'loading'
          ? 'w-[480px] regform:px-4 h-28 bg-main-gray rounded-main active flex items-center justify-center'
          : 'w-[480px] h-28 rounded-main bg-main-gray flex items-center justify-center'
      }
    >
      <div className="w-12 h-12 m-auto my-8 grid grid-cols-loadingDiv">
        <div className="w-2 h-2 bg-button-initial relative animate-cube1"></div>
        <div></div>
        <div></div>
        <div className="w-2 h-2 bg-button-initial relative animate-cube2 mt-8 ml-8"></div>
      </div>
    </div>
  )
}
