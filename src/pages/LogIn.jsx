import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import LoginScreen from '../components/LoginScreen'
import RegisterScreen from '../components/RegisterScreen'
import LoadingDiv from '../components/LoadingDiv'
import ResetPassword from '../components/ResetPassword'

export default function LogIn() {
  const navigate = useNavigate()

  const [resetPassword, setResetPassword] = useState(false)
  const [activeDiv, setActiveDiv] = useState('loading')

  const [email, setEmail] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/app')
      } else {
        setActiveDiv('log')
      }
    })
  }, [])

  return (
    <>
      <ResetPassword
        show={resetPassword}
        email={email}
        setResetPassword={setResetPassword}
        setActiveDiv={setActiveDiv}
      />

      <div className="wrapper select-none invisiblebar">
        <LoginScreen
          activeDiv={activeDiv}
          setEmail={setEmail}
          email={email}
          setResetPassword={setResetPassword}
          setActiveDiv={setActiveDiv}
        />

        <RegisterScreen activeDiv={activeDiv} setActiveDiv={setActiveDiv} />

        <LoadingDiv activeDiv={activeDiv} />
      </div>
    </>
  )
}
