import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import MainNav from '../components/MainNav'
import DirectMessages from '../components/DirectMessages'
import Server from '../components/Server'
import { MainContext } from '../contexts/MainContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import discordlogo from '../media/img/discordlogo.png'

export default function Main() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [activeDiv, setActiveDiv] = useState('dm')
  const [myName, setMyName] = useState('')
  const [allUsers] = useCollectionData(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
    transform: (doc) => ({ id: doc.id }),
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      } else {
        setTimeout(() => {
          setMyName(user.displayName)

          setTimeout(() => {
            setLoading(false)
          }, [1000])
        }, [1000])
      }
    })
  }, [])

  return (
    <MainContext.Provider value={{ myName, allUsers }}>
      <div className="w-screen full-page grid grid-cols-main overflow-hidden">
        <MainNav setActiveDiv={setActiveDiv} activeDiv={activeDiv} />

        {activeDiv === 'dm' ? <DirectMessages /> : <Server />}
      </div>
      <div
        style={{ transition: 'all ease 0.5s' }}
        className={
          loading
            ? 'select-none w-screen full-page z-50 opacity-100 visible fixed flex flex-col items-center justify-center top-0 left-0 bg-black-3'
            : 'select-none w-screen full-page invisible z-50 flex items-center justify-center flex-col opacity-0 fixed top-0 left-0 bg-black-3'
        }
      >
        <img src={discordlogo} width={72} alt="" />
      </div>
    </MainContext.Provider>
  )
}
