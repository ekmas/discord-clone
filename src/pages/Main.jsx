import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../firebase';

export default function Main() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>Main</div>
  )
}
