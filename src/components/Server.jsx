import React, { useState } from 'react'
import ServerSidebar from './ServerSidebar'
import ServerNav from './ServerNav'

export default function Server() {
  const [activeChannelName, setActiveChannelName] = useState('channel-1')
  const [toggleServerMemberList, setToggleServerMemberList] = useState(false)

  return (
    <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m500:grid-cols-1'>
      <ServerSidebar 
        activeChannelName={activeChannelName}
        setActiveChannelName={setActiveChannelName}
      />

      <main className='max-h-screen relative'>
        <ServerNav 
          activeChannelName={activeChannelName}
          toggleServerMemberList={toggleServerMemberList}
          setToggleServerMemberList={setToggleServerMemberList}
        />

        <div className={toggleServerMemberList ? 'h-[calc(100vh-49px)] grid grid-cols-server m1000:grid-cols-server-responsive' : 'h-[calc(100%-49px)] block'}>
          <div>Server Messages</div>
          <div>Users Sidebar</div>
        </div>
      </main>
    </div>
  )
}
