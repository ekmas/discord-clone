import React, { useState } from 'react'
import DmSidebar from './DmSidebar'
import DmFriends from './DmFriends'
import { DmContext } from '../contexts/DmContext'
import DmChat from './DmChat'

export default function DirectMessages() {
  const [activeSection, setActiveSection] = useState('friends')

  return (
    <DmContext.Provider value={{ setActiveSection }}>
      <div className="grid grid-cols-dm m850:grid-cols-dm-responsive m550:grid-cols-1">
        <DmSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {activeSection === 'friends' ? (
          <DmFriends />
        ) : (
          <DmChat activeConversationName={activeSection} />
        )}
      </div>
    </DmContext.Provider>
  )
}
