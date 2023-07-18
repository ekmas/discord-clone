import React from 'react'
import User from './User'
import ServerChannelButton from './ServerChannelButton'

export default function ServerSidebar({
  activeChannelName,
  setActiveChannelName,
}) {
  const channels = ['channel-1', 'channel-2', 'channel-3']

  return (
    <div className="bg-gray-4 relative max-h-screen m550:hidden">
      <div className="flex items-center font-semibold text-base px-4 py-3 text-white border-b border-black h-[49px]">
        <p>Server</p>
      </div>

      <div className="flex flex-col h-[calc(100vh-49px)]">
        <div className="pt-[19px] flex-1 overflow-y-scroll dropdownscrollbar">
          <div className="flex items-center mb-[5px] ml-4">
            <p className="text-gray-3 text-xs font-semibold tracking-[0.02em]">
              TEXT CHANNELS
            </p>
          </div>

          {channels.map((channel) => {
            return (
              <ServerChannelButton
                key={channel}
                channel={channel}
                activeChannelName={activeChannelName}
                setActiveChannelName={setActiveChannelName}
              />
            )
          })}
        </div>

        <User />
      </div>
    </div>
  )
}
