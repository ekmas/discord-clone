import React, { useState } from 'react'
import { emailPattern } from '../data/data'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ email, setEmail, activeDiv, setResetPassword, setActiveDiv}) {

const [password, setPassword] = useState('')
const [loadingButton, setLoadingButton] = useState(false)

const [emailError, setEmailError] = useState(false)
const [passwordError, setPasswordError] = useState(false)

let handlePasswordReset = () => {
    if(emailPattern.test(logInputValues.email)){
        setResetPassword(true)
    }else{
        setEmailError(false)
    }
}

let handleLogSubmit = async (e) => {
    e.preventDefault()
    setLoadingButton(true)

    if(emailPattern.test(email)){
        setEmailError(false)
    }else{
        setEmailError(true)
        setLoadingButton(false)
    }

    if(password.length > 7){
        setPasswordError(false)
    }else{
        setPasswordError(true)
        setLoadingButton(false)
    }

    if(emailPattern.test(email) && password.length > 7){
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setPasswordError(false)

            console.log('success')
        }catch{
            setPasswordError(true)
        }
        setLoadingButton(false)
    }
}

return (
    <div className={activeDiv === 'log' ? "w-[480px] regform:px-4 min-h-[408px] rounded-main bg-main-gray text-white p-8 active" : "w-[464px] h-[408px] rounded-main bg-main-gray text-white p-8"}>
        <form onSubmit={handleLogSubmit}>
            <div>
                <h1 className="font-semibold text-2xl text-center mb-2 leading-[30px]">Welcome back!</h1>
                <p className="font-normal text-secondary-gray text-center leading-[20px]">We're so excited to see you again!</p>
            </div>
            <div className="w-full text-left mt-5">
                <div className="mb-5">
                    <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="email">
                        EMAIL
                        <span className='text-red pl-1'>{emailError ? '- Email is invalid' : '*'}</span>
                    </label>
                    
                    <div>
                        <input onChange={(e) => {setEmail(e.target.value)}} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="email" name="email" id="email" />
                    </div>
                </div>
                <div>
                    <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="email">
                        PASSWORD
                        <span className="text-red pl-1">{passwordError ? '- Password is invalid' : '*'}</span>
                    </label>
                    
                    <div>
                        <input onChange={(e) => {setPassword(e.target.value)}} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="password" name="password" id="password" />
                    </div>
                </div>
                <button className="mt-1">
                    <div onClick={() => {handlePasswordReset(true)}} className="font-medium text-link text-sm hover:underline">Forgot your password?</div>
                </button>
                <button onClick={handleLogSubmit} className="main-btn" type="submit">
                    {loadingButton ?
                    <div className='flex'>
                        <div style={{ animationDelay: '0ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                        <div style={{ animationDelay: '100ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing mx-1'></div>
                        <div style={{ animationDelay: '200ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                    </div>
                    :
                    'Log in'
                    }
                </button>
                <div className="mt-0.5 text-sm">
                    <span className="text-gray-3">Need an account?</span>
                    <button type="button" onClick={() => {setActiveDiv('reg')}} className="pl-1">
                        <div className="text-link font-medium hover:underline">Register</div>
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}