import React from 'react'
import DmFriendsNav from './DmFriendsNav'
import { useState } from 'react'

export default function DmFriends() {
  const [activeFriendsSection, setActiveFriendsSection] = useState('all')

  return (
    <main class="max-h-screen min-h-screen relative bg-main-gray">
        <div className='h-full flex flex-col'>
            <DmFriendsNav 
                activeFriendsSection={activeFriendsSection}
                setActiveFriendsSection={setActiveFriendsSection}
            />
        </div>
    </main>        
  )
}