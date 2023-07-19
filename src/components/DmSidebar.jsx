import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { MainContext } from '../contexts/MainContext'
import DmButton from './DmButton'
import User from './User'

export default function DmLeftSidebar({ setActiveSection, activeSection }) {
  const [userChats, setUserChats] = useState([])
  const { myName } = useContext(MainContext)

  useEffect(() => {
    if (myName) {
      const userRef = doc(db, 'users', myName)

      const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data().chats
          setUserChats(userData)
        }
      })

      return () => {
        unsubscribeUser()
      }
    }
  }, [myName])

  return (
    <div className="bg-gray-4 relative max-h-[100svh] m550:hidden">
      <div className="flex items-center font-semibold text-base px-4 py-3 text-white border-b border-black h-[49px]">
        <p className="m850:text-[13px]">Direct Messages</p>
      </div>

      <div className="flex flex-col h-[calc(100svh-49px)]">
        <div className="p-2 flex-1 overflow-y-scroll dropdownscrollbar">
          <button
            onClick={() => {
              setActiveSection('friends')
            }}
            className={
              activeSection === 'friends'
                ? 'flex items-center px-3 font-medium text-white h-[42px] w-full rounded bg-gray-7'
                : 'group hover:text-white hover:bg-gray-7 flex items-center px-3 font-medium h-[42px] text-gray-3 w-full rounded'
            }
          >
            <svg
              className="mr-4"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  className={
                    activeSection === 'friends'
                      ? 'fill-white'
                      : 'group-hover:fill-white fill-gray-3'
                  }
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
            Friends
          </button>

          <h2 className="text-xs font-semibold text-gray-3 p-dm-heading tracking-[.02em] uppercase">
            Direct Messages
          </h2>

          {userChats.map((chat) => {
            return (
              <DmButton
                chat={chat}
                key={chat}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            )
          })}
        </div>

        <User />
      </div>
    </div>
  )
}
