import React, { useEffect, useState } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
// import User from './User'
import { db } from '../firebase'
import { arrayRemove, collection, doc, updateDoc } from "firebase/firestore";
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'

export default function DmLeftSidebar({ setActiveSection, activeSection }) {

const [user, loading, error] = useDocumentData(doc(db, "users", `samke`));
const [allUsers] = useCollectionData(collection(db, 'users'), {
      snapshotListenOptions: { includeMetadataChanges: true },
      transform: (doc) => ({ id: doc.id }),
    }
)

const closeConversationButton = async (username) => {
    await updateDoc(doc(db, "users", `${myName}`), {
        chats: arrayRemove(`${username}`)
    });

    setActiveSection('friends')
}

  return (
    <div className='bg-gray-4 relative max-h-screen m500:hidden'>
        <div className='flex items-center font-semibold text-base px-4 py-3 text-white border-b border-black h-[49px]'>
            <p>Direct Messages</p>
        </div>

        <div className='flex flex-col h-[calc(100vh-49px)]'>
            <div className='p-2 flex-1 overflow-y-scroll dropdownscrollbar'>
                <button onClick={() => {setActiveSection('friends')}} className={activeSection === 'friends' ? 'flex items-center px-3 font-medium text-white h-[42px] w-full rounded bg-gray-7' : 'group hover:text-white hover:bg-gray-7 flex items-center px-3 font-medium h-[42px] text-gray-3 w-full rounded'}>
                    <svg className="mr-4" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path className={activeSection === 'friends' ? "fill-white" : "group-hover:fill-white fill-gray-3"} fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
                    Friends
                </button>

                <h2 className='text-xs font-semibold text-gray-3 p-dm-heading tracking-[.02em] uppercase'>Direct Messages</h2>

                {!loading && user.chats.map(chat => {
                    let photoURL = allUsers.find(user => user.displayName === chat).photoURL

                    return(
                        <div key={crypto.randomUUID()} className={activeSection === `${chat}` ? 'text-white bg-gray-7 group flex items-center font-medium h-[42px] w-full rounded mb-1' : 'group hover:text-white hover:bg-gray-5 text-gray-3 flex items-center mb-1 font-medium h-[42px] w-full rounded'}>
                            <button onClick={() => {setActiveSection(`${chat}`)}} key={crypto.randomUUID()} className='flex h-full pl-2 items-center flex-auto'>
                                <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})`}} className='w-8 h-8 rounded-full m850:hidden bg-center bg-cover mr-3'></div>
                                <p key={crypto.randomUUID()} className='font-medium'>{chat}</p>
                            </button>
                            <button onClick={() => {closeConversationButton(chat)}} key={crypto.randomUUID()} className='pr-2'>
                                <div key={crypto.randomUUID()} className={activeSection === `${chat}` ? 'w-4 h-4 opacity-70 m-0.5 pr-2 hidden group-hover:block hover:opacity-100' : 'w-4 h-4 opacity-70 m-0.5 pr-2 hidden group-hover:block hover:opacity-100'}>
                                <svg key={crypto.randomUUID()} className="closeIcon-1NwtbI" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* <User myPfp={myPfp} myName={myName}/> */}
        </div>
    </div>
  )
}