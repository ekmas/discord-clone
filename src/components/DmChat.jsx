import React, { useContext, useEffect, useRef, useState } from 'react'
import DmChatNav from './DmChatNav'
import { MainContext } from '../contexts/MainContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import defaultpfp from '../media/img/defaultpfp.png'
import MessageInput from './MessageInput'

export default function DmChat({ activeConversationName }) {
  const [messages, setMessages] = useState([])
  const { myName, allUsers } = useContext(MainContext)

  const dummy = useRef()

  useEffect(() => {
    let users = [myName, activeConversationName]
    users.sort()

    const userMessagesQuery = query(collection(db, `${users[0]}-${users[1]}`), orderBy('createdAt'))

    const unsub = onSnapshot(userMessagesQuery, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages)
      console.log(messages)
    });

    return () => {
      unsub()
    }
  }, [activeConversationName])

  return (
    <>
      <div>
        <DmChatNav 
            activeConversationName={activeConversationName}
        />
        <div className='bg-main-gray h-[calc(100%-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text'>
          {messages.map(message => {
            let isSameSender, firstMessageDate;

            let newDay = false

            let thisIndex = messages.indexOf(message)

            let currentDate = new Date()

            let messageDate = new Date(message.createdAt.seconds * 1000);

            let formattedTime = messageDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

            let dayDiff = currentDate.getDate() - messageDate.getDate()

            let newDayDateFormat = messageDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

            let photoURL = allUsers.find(item => item.displayName === message.displayName).photoURL

            if(thisIndex === 0){
              isSameSender = false;
              newDay = true
            }else{
              isSameSender = (message.displayName === messages[thisIndex - 1].displayName)

              if(new Date(message.createdAt.seconds * 1000).getDay() !== new Date(messages[thisIndex - 1].createdAt.seconds * 1000).getDay()){
                  newDay = true
              }
            }

            if(dayDiff === 0){
              firstMessageDate = 'Today at ' + formattedTime
            }else if(dayDiff === 1){
              firstMessageDate = 'Yesterday at ' + formattedTime
            }else if(dayDiff > 1){
              firstMessageDate = messageDate.toLocaleDateString("en-US") + ' ' + formattedTime
            }else{
              firstMessageDate = formattedTime
            }
            
            return(
            <div>
                {newDay &&
                  <div className='flex justify-center text-xs font-semibold text-gray-14 relative px-4 mt-[17px]'>
                    <p className='z-10 px-2 py-px bg-main-gray'>{newDayDateFormat}</p>
                    <div className='w-[calc(100%-32px)] bg-gray-10 h-px absolute top-2'></div>
                  </div> 
                }

                {isSameSender && !newDay ? 
                  <div className='px-4 m400:px-2 py-1 hover:bg-gray-11 group'>
                    <div className='grid grid-cols-message m400:gap-2 gap-4'>
                        <div>
                            <div className="text-center text-gray-14 m400:text-[10px] text-[11px] font-medium tracking-tighter flex items-center justify-center">
                              <p className='leading-[22px] hidden group-hover:inline'>{formattedTime}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                          <p className='leading-[22px] break-words'>{message.text}</p>
                        </div>
                    </div>
                  </div>
                :
                <div className='px-4 m400:px-2 mt-[17px] py-1 hover:bg-gray-11'>
                  <div className='grid grid-cols-message m400:gap-2 gap-4 relative'>
                    <button className='pt-1 btn msgbtn h-max'>
                      <div style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='bg-center msgbtn btn bg-cover h-10 rounded-full'></div>
                    </button>
                    <div className='flex flex-col min-h-[44px]'>
                      <div className='flex items-center'>
                          <button className='btn msgbtn font-medium leading-[22px] mr-1.5 text-white w-min'>{message.displayName}</button>
                          <p className='font-medium text-xs m400:text-[10px] text-gray-14 leading-[22px]'>{firstMessageDate}</p>
                      </div>
                      <p className='leading-[22px] break-words'>{message.text}</p>
                    </div>
                  </div>
                </div>
                }
            </div>
        )})}
        <span ref={dummy}></span>
        </div>
        <MessageInput 
          myName={myName}
          activeConversationName={activeConversationName}
          dummy={dummy}
        />
      </div>
    </>
  )
}
