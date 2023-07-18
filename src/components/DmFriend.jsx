import React, { useContext, useEffect, useState } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
import { MainContext } from '../contexts/MainContext'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { DmContext } from '../contexts/DmContext'

export default function DmFriend({ friend }) {
  const { myName } = useContext(MainContext)
  const { setActiveSection } = useContext(DmContext)

  const [allChats, setAllChats] = useState([])

  useEffect(() => {
    if (myName) {
      const userRef = doc(db, 'users', myName)

      const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data().chats
          setAllChats(userData)
        }
      })

      return () => {
        unsubscribeUser()
      }
    }
  }, [myName])

  let unfriendButton = async () => {
    await updateDoc(doc(db, 'users', `${myName}`), {
      friends: arrayRemove(`${friend}`),
    })

    await updateDoc(doc(db, 'users', `${friend}`), {
      friends: arrayRemove(`${myName}`),
    })
  }

  let handleSendMessageButton = async () => {
    if (!allChats.includes(friend)) {
      await updateDoc(doc(db, 'users', `${myName}`), {
        chats: arrayUnion(`${friend}`),
      })

      await updateDoc(doc(db, 'users', `${friend}`), {
        chats: arrayUnion(`${myName}`),
      })

      let users = [myName, friend]
      users.sort()

      let usersRef = doc(db, `${users[0]}-${users[1]}`, 'FIRSTITEM')
      const usersSnap = await getDoc(usersRef)

      if (usersSnap.exists()) {
        setActiveSection(friend)
      } else {
        await setDoc(doc(db, `${users[0]}-${users[1]}`, 'FIRSTITEM'), {
          firstItem: true,
        })

        setActiveSection(friend)
      }
    } else {
      setActiveSection(friend)
    }
  }

  return (
    <div className="h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer">
      <div className="flex items-center">
        <div
          style={{ backgroundImage: `url(${defaultpfp})` }}
          className="w-8 h-8 rounded-full bg-center bg-cover mr-3"
        ></div>
        <p className="font-semibold text-white text-ellipsis whitespace-nowrap overflow-hidden m400:max-w-[30px] m550:text-xs">
          {friend}
        </p>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => {
            handleSendMessageButton(friend)
          }}
          className="group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center"
        >
          <svg
            role="img"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              className="fill-gray-3 group-hover:fill-white"
              d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {
            unfriendButton(friend)
          }}
          className="group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              className="fill-gray-3 group-hover:fill-red"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
