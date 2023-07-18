import React, { useContext } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { MainContext } from '../contexts/MainContext'

export default function DmButton({ chat, activeSection, setActiveSection }) {
  const { myName } = useContext(MainContext)

  const closeConversationButton = async () => {
    await updateDoc(doc(db, 'users', `${myName}`), {
      chats: arrayRemove(`${chat}`),
    })

    setActiveSection('friends')
  }

  return (
    <div
      className={
        activeSection === `${chat}`
          ? 'text-white bg-gray-7 group flex items-center font-medium h-[42px] w-full rounded mb-1'
          : 'group hover:text-white hover:bg-gray-5 text-gray-3 flex items-center mb-1 font-medium h-[42px] w-full rounded'
      }
    >
      <button
        onClick={() => {
          setActiveSection(`${chat}`)
        }}
        className="flex h-full pl-2 items-center flex-auto"
      >
        <div
          style={{ backgroundImage: `url(${defaultpfp})` }}
          className="w-8 h-8 rounded-full m850:hidden bg-center bg-cover mr-3"
        ></div>
        <p className="font-medium">{chat}</p>
      </button>
      <button
        onClick={() => {
          closeConversationButton()
        }}
        className="pr-2"
      >
        <div
          className={
            activeSection === `${chat}`
              ? 'w-4 h-4 opacity-70 m-0.5 pr-2 hidden group-hover:block hover:opacity-100'
              : 'w-4 h-4 opacity-70 m-0.5 pr-2 hidden group-hover:block hover:opacity-100'
          }
        >
          <svg
            className="closeIcon-1NwtbI"
            aria-hidden="true"
            role="img"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  )
}
