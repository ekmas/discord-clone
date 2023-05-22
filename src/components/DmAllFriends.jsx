import React, { useContext, useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import all from '../media/img/wumpusall.png'
import notfound from '../media/img/wumpusnotfound.png'
import { MainContext } from '../contexts/MainContext'
import defaultpfp from '../media/img/defaultpfp.png'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function DmFriendsSearch({ setActiveFriendsSection }) {
  const { myName, allUsers } = useContext(MainContext)

  const [initialAllFriends, setInitialAllFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (myName) {
      const friendsDocRef = doc(db, 'users', myName);

      const unsubscribeFriends = onSnapshot(friendsDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const friendsData = snapshot.data().friends;
          setInitialAllFriends(friendsData);
          setAllFriends(friendsData);
          setLoading(false)
        }
      });

      return () => {
        unsubscribeFriends();
      };
    }
  }, [myName]);

  return (
    <>
        {!loading && 
            <div className='h-full'>
            {initialAllFriends.length === 0 ? 
                <div className='h-full flex flex-col justify-center items-center'>
                    <img className='mb-12 m900:w-[260px] m900:mb-6 m600:hidden' src={`${all}`} alt="wumpus" />
                    <p className='text-gray-3 text-center mx-2'>Wumpus is waiting on friends. You don’t have to though!</p>
                    <button onClick={() => {setActiveFriendsSection('add friend')}} className='mt-5 bg-button-initial text-white font-medium text-sm rounded-secondary py-[9px] px-4 transition-all hover:bg-button-hover ease-linear' type='button'>Add Friend</button>
                </div>
                : 
                <div className='h-full pr-5 flex flex-col relative'>
                    <SearchInput 
                        initialResults={initialAllFriends}
                        setResults={setAllFriends}
                    />

                    <div className='mt-6 m550:pl-[15px] pl-[30px]'>
                        <h2 className='text-secondary-gray font-semibold text-xs tracking-[0.02em]'>ALL FRIENDS — {allFriends && allFriends.length}</h2>
                    </div>
                    <div className='mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar m550:pl-[15px] pl-[30px]'>
                        {allFriends.map(friend => {
                        let photoURL = allUsers.find(item => item.displayName === friend).photoURL

                        return(
                            <div key={crypto.randomUUID()} className='h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer'>
                                <div key={crypto.randomUUID()} className='flex items-center'>
                                    <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='w-8 h-8 rounded-full bg-center bg-cover mr-3'></div>
                                    <p key={crypto.randomUUID()} className='font-semibold text-white text-ellipsis whitespace-nowrap overflow-hidden m400:max-w-[30px] m550:text-xs'>{friend}</p>
                                </div>

                                <div key={crypto.randomUUID()} className='flex items-center'>
                                    <button onClick={() => {handleSendMessageButton(friend)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center'>
                                    <svg key={crypto.randomUUID()} role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path className='fill-gray-3 group-hover:fill-white' d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
                                    </button>
                                    <button onClick={() => {unfriendButton(friend)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                                    <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        )
                        })}

                        {allFriends.length === 0 && 

                        <div className='h-full flex flex-col items-center justify-center'>
                            <img className='mb-10 m900:w-[260px] m900:mb-7 m600:hidden' src={`${notfound}`} alt="" />
                            <div>
                                <div className='mt-2 text-gray-3 text-center mx-2'>Wumpus looked, but couldn’t find anyone with that name.</div>
                            </div>
                        </div>
                        
                        }
                    </div>
                </div>
            }
            </div>
        }
    </>
  )
}
