import React, { useState } from 'react'
import DmLeftSidebar from './DmSidebar'

export default function DirectMessages() {
  const [activeSection, setActiveSection] = useState('friends')
//   const [activeChat, setActiveChat] = useState('')

  return (
    <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m500:grid-cols-1'>
        <DmLeftSidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            // setActiveChat={setActiveChat}
            // activeChat={activeChat}
        />

        {activeSection === 'friends' ?
            <p>friends</p>
            :
            <p>chat</p>
        }
    </div>
  )
}
