import React, { useState } from 'react'
import { auth, db } from "../firebase";
import { collection, doc, setDoc, query, where, getCountFromServer } from "firebase/firestore"
import { emailPattern } from '../data/data';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loading from './Loading';
import FormInput from './FormInput';
import RegisterDate from './RegisterDate';
import RegisterCheckbox from './RegisterCheckbox';

export default function RegisterScreen({ activeDiv, setActiveDiv }) {

const [loadingButton, setLoadingButton] = useState(false)

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')

const [emailError, setEmailError] = useState(false)
const [passwordError, setPasswordError] = useState(false)
const [usernameError, setUsernameError] = useState(false)

const [invalidEmail, setInvalidEmail] = useState(false)
const [invalidUsername, setInvalidUsername] = useState(false)

const [toggleCheckbox, setToggleCheckbox] = useState(false)

let handleRegSubmit = async (e) => {
    e.preventDefault()
    setLoadingButton(true)

    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", `${email}`));
    const userNameQuery = query(usersRef, where("displayName", "==", `${username}`));

    setEmailError(!emailPattern.test(email))
    setUsernameError(username.trim().length <= 1)
    setPasswordError(password.trim().length <= 7)

    if(!emailPattern.test(email) || username.trim().length <= 1 || password.trim().length <= 7){
        setLoadingButton(false)
    }

    const emailCount = await getCountFromServer(emailQuery);
    const usernameCount = await getCountFromServer(userNameQuery);

    setInvalidEmail(emailCount.data().count === 1)
    setInvalidUsername(usernameCount.data().count === 1)

    if(emailPattern.test(email) && username.trim().length > 1 && password.trim().length > 7 && usernameCount.data().count !== 1 && emailCount.data().count !== 1){
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(res.user, {
                displayName: username,
            });

            await setDoc(doc(db, "users", displayName), {
                uid: res.user.uid,
                displayName: username,
                email,
                photoURL: 'default',
                friends: [],
                chats: []
            });

            try {
                await signInWithEmailAndPassword(auth, email, password);
                setLoadingButton(false)
            }catch(err){
                console.log(err)
                setLoadingButton(false)
            }
        }catch(err){
            console.log(err)
            setLoadingButton(false)
        }
    }else{
        setLoadingButton(false)
    }
}

return (
    <div className={activeDiv === 'reg' ? "w-[480px] regform:px-4 min-h-[550px] rounded-main bg-main-gray text-white p-8 active" : "w-[480px] h-[550px] rounded-main bg-main-gray text-white p-8"}>
        <form onSubmit={handleRegSubmit}>
            <h1 className="font-semibold text-2xl text-center mb-2 leading-[30px]">Create an account</h1>
            <div className="mt-5">
                <div className="mb-5">
                    <FormInput 
                        name={"email"}
                        id={"register-email"}
                        type={'text'}
                        setValue={setEmail}
                        inputError={emailError || invalidEmail}
                        errorMessage={
                            !invalidEmail
                                ? '- Email is invalid'
                                : '- Email is already in use'
                        }
                    />
                </div>

                <div className="mb-5">
                    <FormInput 
                        name={"username"}
                        id={"register-username"}
                        type={'text'}
                        setValue={setUsername}
                        inputError={usernameError || invalidUsername}
                        errorMessage={
                            !invalidUsername
                                ? '- Username must be at least 2 charachters long'
                                : '- This username already exists'
                        }
                    />
                </div>

                <div className="mb-5">
                    <FormInput 
                        name={"password"}
                        inputType={'register-password'}
                        type={"password"}
                        setValue={setPassword}
                        inputError={passwordError}
                        errorMessage={passwordError && '- Must be at least 8 characters long'}
                    />
                </div>

                <RegisterDate />

                <RegisterCheckbox 
                    setToggleCheckbox={setToggleCheckbox}
                    toggleCheckbox={toggleCheckbox}
                />

                <button disabled={!toggleCheckbox} onClick={handleRegSubmit} className={toggleCheckbox ? 'main-btn active' : 'main-btn disabled hover:bg-button-initial group'} type="submit">
                    <div className='continue'>
                        {loadingButton ?
                            <Loading /> : 'Continue'
                        }
                    </div>
                    <div className='w-[190px] h-[64px] bg-black-2 opacity-1 text-white bottom-[50px] absolute scale-0 group-hover:scale-100 text-sm px-3 py-2 leading-4 rounded-main transition-all duration-75'>
                        <div className='text-left'>
                            You need to agree to our terms of service to continue
                        </div>
                        <div className='relative top-[7px] left-20 w-[10px] border-transparent border-[5px] border-t-black-2'></div>
                    </div>
                </button>

                <div onClick={() => {setActiveDiv('log')}} className="text-link text-sm font-medium hover:underline cursor-pointer">Already have an account?</div>
            </div>
        </form>
    </div>
)
}