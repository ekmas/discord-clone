import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import MainNav from '../components/MainNav';

export default function Main() {
  const [activeDiv, setActiveDiv] = useState('dm')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="w-screen h-screen grid grid-cols-main overflow-hidden">
        <MainNav 
          setActiveDiv={setActiveDiv}
          activeDiv={activeDiv}
        />
      </div>
    </>
  )
}
