import React from 'react'
import DmChatNav from './DmChatNav'

export default function DmChat({ activeConversationName }) {
  return (
    <div>
        <DmChatNav 
            activeConversationName={activeConversationName}
        />
    </div>
  )
}
