import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'
import SidebarUser from './SidebarUser'

export default function UsersSidebar({ toggleServerMemberList }) {
  const { allUsers } = useContext(MainContext)

  return (
    <div
      className={
        toggleServerMemberList
          ? 'bg-gray-4 relative min-h-[calc(100svh-49px)] max-h-[calc(100svh-49px)] m750:hidden'
          : 'hidden'
      }
    >
      <div className="overflow-y-scroll dropdownscrollbar pb-6 h-full">
        <h3 className="text-gray-13 font-semibold text-xs p-siderbar tracking-[0.02em] mb-px">
          MEMBERS — {allUsers.length}
        </h3>

        <div>
          {allUsers.map((item) => {
            return (
              <SidebarUser key={item.displayName} name={item.displayName} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
