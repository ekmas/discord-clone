import React, { useState } from 'react'
import DmSidebar from './DmSidebar'
import DmFriends from './DmFriends'

export default function DirectMessages() {
  const [activeSection, setActiveSection] = useState('friends')

  return (
    <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m500:grid-cols-1'>
        <DmSidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
        />

        {activeSection === 'friends' ?
            <DmFriends />
            :
            <p>chat</p>
        }
    </div>
  )
}
