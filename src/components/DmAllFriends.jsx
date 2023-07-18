import React, { useContext, useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import all from '../media/img/wumpusall.png'
import notfound from '../media/img/wumpusnotfound.png'
import { MainContext } from '../contexts/MainContext'
import DmFriend from './DmFriend'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function DmFriendsSearch({ setActiveFriendsSection }) {
  const { myName } = useContext(MainContext)

  const [initialAllFriends, setInitialAllFriends] = useState([])
  const [allFriends, setAllFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (myName) {
      const friendsDocRef = doc(db, 'users', myName)

      const unsubscribeFriends = onSnapshot(friendsDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const friendsData = snapshot.data().friends
          setAllFriends(friendsData)
          setInitialAllFriends(friendsData)
          setLoading(false)
        }
      })

      return () => {
        unsubscribeFriends()
      }
    }
  }, [myName])

  return (
    <div className="h-full">
      {!loading && initialAllFriends.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <img
            className="mb-12 m900:w-[260px] m900:mb-6 m600:hidden"
            src={`${all}`}
            alt="wumpus"
          />
          <p className="text-gray-3 text-center mx-2">
            Wumpus is waiting on friends. You don’t have to though!
          </p>
          <button
            onClick={() => {
              setActiveFriendsSection('add friend')
            }}
            className="mt-5 bg-button-initial text-white font-medium text-sm rounded-secondary py-[9px] px-4 transition-all hover:bg-button-hover ease-linear"
            type="button"
          >
            Add Friend
          </button>
        </div>
      ) : (
        <div className="h-full pr-5 flex flex-col relative">
          <SearchInput
            initialResults={initialAllFriends}
            setResults={setAllFriends}
            allFriends={true}
          />

          <div className="mt-6 m550:pl-[15px] pl-[30px]">
            <h2 className="text-secondary-gray font-semibold text-xs tracking-[0.02em]">
              ALL FRIENDS — {loading ? '#' : allFriends.length}
            </h2>
          </div>
          <div className="mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar m550:pl-[15px] pl-[30px]">
            {!loading &&
              allFriends.map((friend) => {
                return <DmFriend key={friend} friend={friend} />
              })}

            {!loading && allFriends.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center">
                <img
                  className="mb-10 m900:w-[260px] m900:mb-7 m600:hidden"
                  src={`${notfound}`}
                  alt=""
                />
                <div>
                  <div className="mt-2 text-gray-3 text-center mx-2">
                    Wumpus looked, but couldn’t find anyone with that name.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
