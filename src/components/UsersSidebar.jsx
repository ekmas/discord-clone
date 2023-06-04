import React, { useContext } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
import { MainContext } from '../contexts/MainContext'

export default function UsersSidebar({ toggleServerMemberList }) {
  const { allUsers } = useContext(MainContext)

  return (
    <div className={toggleServerMemberList ? 'bg-gray-4 relative min-h-[calc(100vh-49px)] max-h-[calc(100vh-49px)] m750:hidden' : 'hidden'}>
        <div className='overflow-y-scroll dropdownscrollbar pb-6 h-full'>
            <h3 className='text-gray-13 font-semibold text-xs p-siderbar tracking-[0.02em] mb-px'>
                MEMBERS — {allUsers.length}
            </h3>

            <div>
                {allUsers.map(item => {
                    return(
                        <div className='ml-2 userbtn btn px-2 h-[42px] flex items-center rounded hover:bg-gray-5 group min-w-[224px] m1000:min-w-[130px] m1000:max-w-[130px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer'>
                            <div style={{ backgroundImage: `url(${defaultpfp})` }} className='w-8 h-8 userbtn btn rounded-full bg-center bg-cover mr-3 userbtndiv'></div>
                            <div className='whitespace-nowrap btn max-w-[70px] overflow-ellipsis overflow-hidden userbtn userbtndiv'>
                                <p className='font-semibold btn text-base text-gray-13 group-hover:text-overlay-text userbtn userbtnp'>{item.displayName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
