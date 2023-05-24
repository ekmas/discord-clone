import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import MainNav from '../components/MainNav';
import DirectMessages from '../components/DirectMessages';
import Server from '../components/Server';
import defaultpfp from '../media/img/defaultpfp.png'
import { MainContext } from '../contexts/MainContext'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate()

  const [activeDiv, setActiveDiv] = useState('dm')
  const [myPfp, setMypfp] = useState('')
  const [myName, setMyName] = useState('')
  const [allUsers] = useCollectionData(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
    transform: (doc) => ({ id: doc.id }),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }else{
        setTimeout(() => {
          setMyName(user.displayName)

          if(user.photoURL === null){
            setMypfp(defaultpfp)
          }else{
            setMypfp(user.photoURL)
          }
        }, [1000])
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainContext.Provider value={{ myName, myPfp, allUsers }}>
      <div className="w-screen h-screen grid grid-cols-main overflow-hidden">
        <MainNav 
          setActiveDiv={setActiveDiv}
          activeDiv={activeDiv}
        />

        {activeDiv === 'dm' ?
          <DirectMessages />
          :
          <Server />
        }
      </div>
    </MainContext.Provider>
  )
}
