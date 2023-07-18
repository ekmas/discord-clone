import React from 'react'

export default function Loading() {
  return (
    <div className="flex">
      <div
        style={{ animationDelay: '0ms' }}
        className="w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing"
      ></div>
      <div
        style={{ animationDelay: '100ms' }}
        className="w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing mx-1"
      ></div>
      <div
        style={{ animationDelay: '200ms' }}
        className="w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing"
      ></div>
    </div>
  )
}
