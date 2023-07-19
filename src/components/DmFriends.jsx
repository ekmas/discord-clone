import React, { useContext } from 'react'
import DmFriendsNav from './DmFriendsNav'
import { useState } from 'react'
import DmAddFriend from './DmAddFriend'
import { MainContext } from '../contexts/MainContext'
import DmAllFriends from './DmAllFriends'
import DmPendingRequests from './DmPendingRequests'

export default function DmFriends() {
  const [activeFriendsSection, setActiveFriendsSection] = useState('all')
  const { myName } = useContext(MainContext)

  return (
    <main className="max-h-[100svh] min-h-[100svh] relative bg-main-gray">
      <div className="h-full flex flex-col">
        <DmFriendsNav
          activeFriendsSection={activeFriendsSection}
          setActiveFriendsSection={setActiveFriendsSection}
        />

        {activeFriendsSection === 'add friend' ? (
          <DmAddFriend myName={myName} />
        ) : (
          <>
            {activeFriendsSection === 'all' ? (
              <DmAllFriends setActiveFriendsSection={setActiveFriendsSection} />
            ) : (
              <DmPendingRequests />
            )}
          </>
        )}
      </div>
    </main>
  )
}
