import React, { useEffect, useRef, useState } from 'react'
import MessageDate from '../components/MessageDate'
import SameSenderMessage from './SameSenderMessage'
import Message from './Message'
import ServerInput from './ServerInput'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export default function ServerMessages({ activeChannelName }) {
  const [messages, setMessages] = useState([])

  const dummy = useRef()

  useEffect(() => {
    const messagesQuery = query(
      collection(db, activeChannelName),
      orderBy('createdAt')
    )

    const unsub = onSnapshot(messagesQuery, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data())
      })
      setMessages(messages)
    })

    return () => {
      unsub()
    }
  }, [activeChannelName])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full">
      <div className="bg-main-gray h-[calc(100vh-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text">
        <div className="m-4 mb-6">
          <div className="h-[68px] w-[68px] rounded-full bg-gray-12 flex items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              x="0"
              y="0"
              aria-hidden="true"
              role="img"
            >
              <path
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
              ></path>
            </svg>
          </div>
          <h3 className="text-white font-bold text-[32px] leading-10 mt-[7px] mb-[6px] m600:text-[25px]">
            Welcome to #{activeChannelName}!
          </h3>
          <div className="text-secondary-gray">
            This is the start of the #{activeChannelName} channel.
          </div>
        </div>

        <div>
          {messages &&
            messages.map((message) => {
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
              let monthDIff = currentDate.getMonth() - messageDate.getMonth()
              let yearDiff =
                currentDate.getFullYear() - messageDate.getFullYear()

              if (yearDiff > 0 || monthDIff > 0) {
                dayDiff += 50
              }

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
                  {newDay && (
                    <MessageDate newDayDateFormat={newDayDateFormat} />
                  )}

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
      </div>
      <ServerInput activeChannelName={activeChannelName} dummy={dummy} />
    </div>
  )
}
