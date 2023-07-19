import React, { useContext, useEffect, useRef, useState } from 'react'
import DmChatNav from './DmChatNav'
import { MainContext } from '../contexts/MainContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import DmInput from './DmInput'
import MessageDate from './MessageDate'
import SameSenderMessage from './SameSenderMessage'
import Message from './Message'

export default function DmChat({ activeConversationName }) {
  const [messages, setMessages] = useState([])
  const { myName } = useContext(MainContext)

  const dummy = useRef()

  useEffect(() => {
    let users = [myName, activeConversationName]
    users.sort()

    const userMessagesQuery = query(
      collection(db, `${users[0]}-${users[1]}`),
      orderBy('createdAt')
    )

    const unsub = onSnapshot(userMessagesQuery, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data())
      })
      setMessages(messages)
    })

    return () => {
      unsub()
    }
  }, [activeConversationName])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="max-h-[100svh] min-h-[100svh] relative bg-main-gray">
      <DmChatNav activeConversationName={activeConversationName} />
      <div className="bg-main-gray h-[calc(100%-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text">
        {messages.map((message) => {
          let isSameSender, firstMessageDate

          let newDay = false

          let thisIndex = messages.indexOf(message)

          let currentDate = new Date()

          let messageDate = new Date(message.createdAt.seconds * 1000)

          let formattedTime = messageDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })

          let dayDiff = currentDate.getDate() - messageDate.getDate()

          let newDayDateFormat = messageDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          if (thisIndex === 0) {
            isSameSender = false
            newDay = true
          } else {
            isSameSender =
              message.displayName === messages[thisIndex - 1].displayName

            if (
              new Date(message.createdAt.seconds * 1000).getDay() !==
              new Date(
                messages[thisIndex - 1].createdAt.seconds * 1000
              ).getDay()
            ) {
              newDay = true
            }
          }

          if (dayDiff === 0) {
            firstMessageDate = 'Today at ' + formattedTime
          } else if (dayDiff === 1) {
            firstMessageDate = 'Yesterday at ' + formattedTime
          } else if (dayDiff > 1) {
            firstMessageDate =
              messageDate.toLocaleDateString('en-US') + ' ' + formattedTime
          } else {
            firstMessageDate = formattedTime
          }

          return (
            <div key={crypto.randomUUID()}>
              {newDay && <MessageDate newDayDateFormat={newDayDateFormat} />}

              {isSameSender && !newDay ? (
                <SameSenderMessage
                  formattedTime={formattedTime}
                  msg={message.text}
                />
              ) : (
                <Message
                  sender={message.displayName}
                  date={firstMessageDate}
                  msg={message.text}
                />
              )}
            </div>
          )
        })}
        <span ref={dummy}></span>
      </div>
      <DmInput
        myName={myName}
        activeConversationName={activeConversationName}
        dummy={dummy}
      />
    </div>
  )
}
