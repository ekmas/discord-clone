import React, { useState } from 'react'
import { emailPattern } from '../data/data'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import FormInput from './FormInput';
import Loading from './Loading';

export default function LoginScreen({ email, setEmail, activeDiv, setResetPassword, setActiveDiv}) {

const [password, setPassword] = useState('')
const [loadingButton, setLoadingButton] = useState(false)

const [emailError, setEmailError] = useState(false)
const [passwordError, setPasswordError] = useState(false)
const [incorrectCredentials, setIncorrectCredentials] = useState(false)

let handlePasswordReset = () => {
    if(emailPattern.test(email)){
        setResetPassword(true)
    }else{
        setEmailError(false)
    }
}

let handleLogSubmit = async (e) => {
    e.preventDefault()
    setLoadingButton(true)

    setEmailError(!emailPattern.test(email))
    setPasswordError(password.length < 7)

    if(emailPattern.test(email) && password.length > 7){
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIncorrectCredentials(false)
        }catch{
            setIncorrectCredentials(true)
        }
        setLoadingButton(false)
    }else{
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
                    <FormInput
                        name={"email"}
                        id={"login-email"}
                        type={'text'}
                        setValue={setEmail}
                        inputError={emailError || incorrectCredentials}
                        errorMessage={
                            !incorrectCredentials
                                ? "- Email is invalid"
                                : "- Either the password or the email is incorrect"
                        }
                    />
                </div>
                <div>
                    <FormInput
                        name={'password'}
                        id={"login-password"}
                        type={'password'}
                        setValue={setPassword}
                        inputError={passwordError || incorrectCredentials}
                        errorMessage={
                            !incorrectCredentials
                              ? "- Password is invalid"
                              : "- Either the password or the email is incorrect"
                        }
                    />
                </div>
                <button className="mt-1">
                    <div onClick={() => {handlePasswordReset(true)}} className="font-medium text-link text-sm hover:underline">Forgot your password?</div>
                </button>
                <button onClick={handleLogSubmit} className="main-btn" type="submit">
                    {loadingButton ?
                        <Loading /> : 'Log in'
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