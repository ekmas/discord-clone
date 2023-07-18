import React, { useState } from 'react'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import all from '../media/img/wumpusall.png'

export default function AddFriend({ myName }) {
  const [activeSendRequestButton, setActiveSendRequestButton] = useState(false)
  const [sendRequestDivBorderColor, setSendRequestDivBorderColor] = useState('')
  const [sendRequestName, setSendRequestName] = useState('')

  let handleSendRequestInput = (e) => {
    setSendRequestName(e.target.value.trim())
    setSendRequestDivBorderColor('#00AFF4')

    if (e.target.value.trim() === '' || e.target.value.trim() === myName) {
      setActiveSendRequestButton(false)
    } else {
      setActiveSendRequestButton(true)
    }
  }

  let handleSendRequestDivBorder = (e) => {
    if (
      sendRequestDivBorderColor !== '#f38688' ||
      sendRequestDivBorderColor !== '#46c46e'
    ) {
      if (e === 'focus') {
        setSendRequestDivBorderColor('#00AFF4')
      } else {
        setSendRequestDivBorderColor('#000')
      }
    }
  }

  let handleSendRequestSubmit = async (e) => {
    e.preventDefault()

    let userRef = doc(db, 'users', sendRequestName)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      try {
        await setDoc(
          doc(db, `users/${myName}/requests`, `${sendRequestName}`),
          {
            displayName: sendRequestName,
            incoming: false,
          }
        )

        await setDoc(
          doc(db, `users/${sendRequestName}/requests`, `${myName}`),
          {
            displayName: myName,
            incoming: true,
          }
        )

        setSendRequestDivBorderColor('#46c46e')
      } catch (err) {
        console.log(err)
        setSendRequestDivBorderColor('#f38688')
      }
    } else {
      setSendRequestDivBorderColor('#f38688')
    }
  }

  return (
    <div className="h-full">
      <div className="px-[30px] m600:px-[20px] py-[19px] border-b border-gray-7">
        <h2 className="text-white font-semibold leading-5 mb-2">ADD FRIEND</h2>

        <form onSubmit={handleSendRequestSubmit} autoComplete="off">
          <div className="text-secondary-gray text-sm">
            You can add a friend with their Discord Name. It&apos;s cAsE
            sEnSitIvE!
          </div>
          <div
            style={{
              border: `1px solid ${
                sendRequestDivBorderColor === '#f38688'
                  ? 'red'
                  : sendRequestDivBorderColor
              }`,
            }}
            className="w-full bg-black flex items-center mt-4 px-3 rounded-lg"
          >
            <div className="flex-auto mr-4 py-1">
              <input
                onChange={handleSendRequestInput}
                onFocus={() => {
                  handleSendRequestDivBorder('focus')
                }}
                onBlur={() => {
                  handleSendRequestDivBorder('blur')
                }}
                className="outline-none w-full bg-transparent h-10 font-medium tracking-[0.04em] border-0 text-overlay-text leading-5 placeholder-gray-8"
                maxLength="37"
                autoComplete="off"
                placeholder="Enter a Username"
                type="text"
              />
            </div>
            <button
              onClick={handleSendRequestSubmit}
              className={
                activeSendRequestButton
                  ? 'hover:bg-button-hover transition-all opacity-100 cursor-pointer w-auto min-w-[60px] h-8 min-h-[32px] flex justify-center items-center text-white font-medium text-sm px-4 py-0.5 rounded-secondary bg-button-initial'
                  : 'opacity-50 cursor-not-allowed w-auto min-w-[60px] h-8 min-h-[32px] flex justify-center items-center text-white font-medium text-sm px-4 py-0.5 rounded-secondary bg-button-initial'
              }
              type="submit"
              disabled={!activeSendRequestButton}
            >
              Send
            </button>
          </div>
          <p
            style={{ color: `${sendRequestDivBorderColor}` }}
            className="text-sm leading-5 mt-2"
          >
            {sendRequestDivBorderColor === '#f38688' ? (
              <>
                {
                  "Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct."
                }
              </>
            ) : sendRequestDivBorderColor === '#46c46e' ? (
              <>
                {'Success! Your friend request to '}
                <strong>{sendRequestName}</strong>
                {' was sent.'}
              </>
            ) : null}
          </p>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center h-[calc(100%-161px)]">
        <img
          className="mb-10 m900:w-[260px] m900:mb-7 m600:hidden"
          src={`${all}`}
          alt=""
        />
        <div className="text-gray-3 text-center mx-2 leading-5">
          Wumpus is waiting on friends. You don’t have to though!
        </div>
      </div>
    </div>
  )
}
