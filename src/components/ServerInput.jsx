import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function ServerInput({ activeChannelName }) {
  const [serverInputValue, setServerInputValue] = useState('')

  let sendServerMessage = async (e) => {
    e.preventDefault()

    if (serverInputValue.trim() === '') {
      return
    }

    const { displayName } = auth.currentUser

    await addDoc(collection(db, activeChannelName), {
      text: serverInputValue,
      createdAt: new Date(),
      displayName,
    })

    setServerInputValue('')
  }

  return (
    <div className="w-full h-[68px] bg-main-gray pb-6 px-4 z-10">
      <form onSubmit={sendServerMessage} className="h-full">
        <input
          value={serverInputValue}
          onChange={(e) => setServerInputValue(e.target.value)}
          className="bg-gray-10 w-full h-full rounded-lg px-4 outline-none text-overlay-text"
          placeholder={`Message #${activeChannelName}`}
          type="text"
        />
      </form>
    </div>
  )
}
