import React, { useContext, useState } from 'react'
import SearchInput from './SearchInput'
import notfound from '../media/img/wumpusnotfound.png'
import { MainContext } from '../contexts/MainContext'
import defaultpfp from '../media/img/defaultpfp.png'
import pending from '../media/img/wumpuspending.png'

export default function PendindRequests({ requests, loading }) {
  const { allUsers } = useContext(MainContext)

  let initialPendingRequests = requests
  const [pendingRequests, setPendingRequests] = useState(requests)

  return (
    <div className='h-full'>
        {initialPendingRequests.length === 0 ? 
            <div className='h-full flex flex-col justify-center items-center'>
                <img className='mb-12 m900:w-[260px] m900:mb-6 m600:hidden' src={`${pending}`} alt="wumpus" />
                <p className='text-gray-3 text-center mx-2'>There are no pending requests. Here's Wumpus for now.</p>
            </div>
            : 
            <div className='h-full pr-5 flex flex-col relative'>
                <SearchInput 
                    initialResults={initialPendingRequests}
                    setResults={setPendingRequests}
                />

                <div className='mt-6 pl-[30px] m550:pl-[15px]'>
                    <h2 className='text-secondary-gray font-semibold text-xs tracking-[0.02em]'>PENDING — {pendingRequests && pendingRequests.length}</h2>
                </div>

                <div className='mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar m550:pl-[15px] pl-[30px]'>
                    {pendingRequests.map(request => {
                    let photoURL = allUsers.find(item => item.displayName === request.displayName).photoURL

                    return(
                        <div key={crypto.randomUUID()} className='h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer'>
                            <div key={crypto.randomUUID()} className='flex items-center'>
                                <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='w-8 h-8 rounded-full bg-center bg-cover mr-3'></div>
                                <div key={crypto.randomUUID()} className='flex flex-col'>
                                    <p key={crypto.randomUUID()} className='font-semibold text-white text-ellipsis whitespace-nowrap overflow-hidden m350:max-w-[30px] m550:text-xs leading-5'>{request.displayName}</p>
                                    <p key={crypto.randomUUID()} className='font-medium text-xs m550:text-[10px] m550:hidden text-secondary-gray'>{request.incoming ? 'Incoming Friend Request' : 'Outgoing Friend Request'}</p>
                                </div>
                            </div>

                            <div key={crypto.randomUUID()} className='flex items-center relative'>
                                {request.incoming ?
                                <>
                                    <button onClick={() => {handleRequestButton('accept', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center'>
                                        <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-green' fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                                    </button>
                                    <button onClick={() => {handleRequestButton('decline', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                                        <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                    </button>
                                </>
                                :
                                <button onClick={() => {handleRequestButton('decline', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                                    <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                </button>
                                }
                            </div>
                        </div>
                    )
                    })}

                    {pendingRequests.length === 0 &&

                    <div className='h-full flex flex-col items-center justify-center'>
                        <img className='mb-10 m900:w-[260px] m900:mb-7 m600:hidden' src={`${notfound}`} alt="" />
                        <div>
                            <div className='mt-2 text-gray-3 text-center mx-2'>Wumpus looked, but couldn’t find anyone with that name.</div>
                        </div>
                    </div>
                    
                    }
                </div>
            </div>
        }
    </div>
  )
}