import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'

export default function DmInput({ myName, activeConversationName }) {
  const [messageInput, setMessageInput] = useState('')

  let sendConversationMessage = async (e) => {
    e.preventDefault()

    if (messageInput.trim() === '') {
      return
    }

    const users = [myName, activeConversationName]
    users.sort()

    await addDoc(collection(db, `${users[0]}-${users[1]}`), {
      text: messageInput,
      createdAt: new Date(),
      displayName: myName,
    })

    setMessageInput('')
  }

  return (
    <div className="w-full h-[68px] bg-main-gray pb-6 px-4 z-10">
      <form onSubmit={sendConversationMessage} className="h-full">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="bg-gray-10 w-full h-full rounded-lg px-4 outline-none text-overlay-text"
          placeholder={`Message @${activeConversationName}`}
          type="text"
        />
      </form>
    </div>
  )
}
