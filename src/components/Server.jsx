import React, { useState } from 'react'
import ServerSidebar from './ServerSidebar'
import ServerMain from './ServerMain'

export default function Server() {
  const [activeChannelName, setActiveChannelName] = useState('channel-1')

  return (
    <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m500:grid-cols-1'>
      <ServerSidebar 
        activeChannelName={activeChannelName}
        setActiveChannelName={setActiveChannelName}
      />

      <ServerMain 
        activeChannelName={activeChannelName}
      />
    </div>
  )
}
