import React, { useContext, useEffect } from 'react'
import DmFriendsNav from './DmFriendsNav'
import { useState } from 'react'
import DmAddFriend from './DmAddFriend'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { MainContext } from '../contexts/MainContext'
import DmAllFriends from './DmAllFriends'
import DmPendingRequests from './DmPendingRequests'

export default function DmFriends() {
  const [activeFriendsSection, setActiveFriendsSection] = useState('all')
  const { myName } = useContext(MainContext)

  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (myName) {
      const friendsDocRef = doc(db, 'users', myName);
      const requestsQuery = query(collection(db, `users/${myName}/requests`));

      const unsubscribeFriends = onSnapshot(friendsDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const friendsData = snapshot.data().friends;
          setFriends(friendsData);
          setLoading(false)
        }
      });

      const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
        let tempReq = []
        snapshot.forEach((doc) => {
          tempReq.push(doc.data());
        });
        setRequests(tempReq)
        setLoading(false)
      });

      return () => {
        unsubscribeFriends();
        unsubscribeRequests();
      };
    }
  }, [myName]);

  return (
    <main className="max-h-screen min-h-screen relative bg-main-gray">
        <div className='h-full flex flex-col'>
            <DmFriendsNav 
                activeFriendsSection={activeFriendsSection}
                setActiveFriendsSection={setActiveFriendsSection}
            />

            {activeFriendsSection === 'add friend' ? 
            <DmAddFriend />
            :
            !loading && 
              <>
                {activeFriendsSection === 'all' ?
                  <DmAllFriends 
                    setActiveFriendsSection={setActiveFriendsSection}
                    friends={friends}
                  />
                  :
                  <DmPendingRequests 
                    requests={requests}
                  />
                }
              </>
            }
        </div>
    </main>        
  )
}
