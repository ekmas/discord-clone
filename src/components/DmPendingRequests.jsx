import React, { useContext, useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import notfound from '../media/img/wumpusnotfound.png'
import { MainContext } from '../contexts/MainContext'
import pending from '../media/img/wumpuspending.png'
import DmPendingRequest from './DmPendingRequest'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'

export default function PendindRequests() {
  const { myName } = useContext(MainContext)

  const [initialPendingRequests, setInitialPendingRequests] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (myName) {
      const requestsQuery = query(collection(db, `users/${myName}/requests`));

      const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
        let tempReq = []
        snapshot.forEach((doc) => {
          tempReq.push(doc.data());
        });
        setPendingRequests(tempReq)
        setInitialPendingRequests(tempReq)
        setLoading(false)
      });

      return () => {
        unsubscribeRequests();
      };
    }
  }, [myName]);

  return (
    <div className='h-full'>
        {!loading && initialPendingRequests.length === 0 ? 
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
                    <h2 className='text-secondary-gray font-semibold text-xs tracking-[0.02em]'>PENDING — {loading ? '#' : pendingRequests.length}</h2>
                </div>

                <div className='mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar m550:pl-[15px] pl-[30px]'>
                    {!loading && pendingRequests.map(request => {
                        return(
                            <DmPendingRequest 
                                request={request}
                                key={request.displayName}
                            />
                        )
                    })}

                    {!loading && pendingRequests.length === 0 &&

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