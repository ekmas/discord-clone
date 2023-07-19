import React, { useState } from 'react'
import ServerNav from './ServerNav'
import ServerMessages from './ServerMessages'
import UsersSidebar from './UsersSidebar'

export default function ServerMain({ activeChannelName }) {
  const [toggleServerMemberList, setToggleServerMemberList] = useState(false)

  return (
    <main className="max-h-[100svh] relative">
      <ServerNav
        activeChannelName={activeChannelName}
        toggleServerMemberList={toggleServerMemberList}
        setToggleServerMemberList={setToggleServerMemberList}
      />

      <div
        className={
          toggleServerMemberList
            ? 'h-[calc(100svh-49px)] grid grid-cols-server m1000:grid-cols-server-responsive'
            : 'h-[calc(100%-49px)] block'
        }
      >
        <ServerMessages activeChannelName={activeChannelName} />
        <UsersSidebar toggleServerMemberList={toggleServerMemberList} />
      </div>
    </main>
  )
}
