import React, { useContext } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
import { MainContext } from '../contexts/MainContext'
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function DmPendingRequest({ request }) {
  let { myName } = useContext(MainContext)

  let handleRequestButton = async (btn) => {
    await deleteDoc(
      doc(db, `users/${myName}/requests`, `${request.displayName}`)
    )
    await deleteDoc(
      doc(db, `users/${request.displayName}/requests`, `${myName}`)
    )

    if (btn === 'accept') {
      await updateDoc(doc(db, 'users', `${myName}`), {
        friends: arrayUnion(`${request.displayName}`),
      })

      await updateDoc(doc(db, 'users', `${request.displayName}`), {
        friends: arrayUnion(`${myName}`),
      })
    }
  }

  return (
    <div className="h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer">
      <div className="flex items-center">
        <div
          style={{ backgroundImage: `url(${defaultpfp})` }}
          className="w-8 h-8 rounded-full bg-center bg-cover mr-3"
        ></div>
        <div className="flex flex-col">
          <p className="font-semibold text-white text-ellipsis whitespace-nowrap overflow-hidden m350:max-w-[30px] m550:text-xs leading-5">
            {request.displayName}
          </p>
          <p className="font-medium text-xs m550:text-[10px] m550:hidden text-secondary-gray">
            {request.incoming
              ? 'Incoming Friend Request'
              : 'Outgoing Friend Request'}
          </p>
        </div>
      </div>

      <div className="flex items-center relative">
        {request.incoming ? (
          <>
            <button
              onClick={() => {
                handleRequestButton('accept', request.displayName)
              }}
              className="group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  className="fill-gray-3 group-hover:fill-green"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => {
                handleRequestButton('decline', request.displayName)
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
          </>
        ) : (
          <button
            onClick={() => {
              handleRequestButton('decline', request.displayName)
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
        )}
      </div>
    </div>
  )
}
