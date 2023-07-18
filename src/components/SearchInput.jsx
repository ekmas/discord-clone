import React, { useState } from 'react'

export default function SearchInput({
  initialResults,
  setResults,
  allFriends,
}) {
  const [active, setActive] = useState(false)
  const [inputValue, setInputValue] = useState('')

  let handleSearch = (e) => {
    setInputValue(e.target.value)
    setResults(
      initialResults.filter((friend) => {
        if (allFriends) {
          return friend.includes(e.target.value.trim())
        } else {
          return friend.displayName.includes(e.target.value.trim())
        }
      })
    )

    if (e.target.value !== '') {
      setActive(true)
    } else {
      setActive(false)
      setResults(initialResults)
    }
  }

  let clearSearch = () => {
    setInputValue('')
    setActive(false)
    setResults(initialResults)
  }

  return (
    <div className="flex flex-none mt-[15px] m550:pl-[15px] pl-[30px]">
      <div className="flex w-full p-px bg-black rounded-secondary items-center">
        <input
          value={inputValue}
          onChange={handleSearch}
          autoComplete="off"
          className="w-full text-base leading-8 h-[30px] px-[9px] bg-transparent focus:outline-none text-overlay-text"
          type="text"
          name="friendssearch"
          id="friendssearch"
          placeholder="Search"
        />
        <div className="w-8 h-8 flex justify-center items-center relative">
          <div className="w-5 h-5">
            <svg
              onClick={clearSearch}
              className={
                !active
                  ? 'absolute rotate-90 opacity-0 transition-all duration-100'
                  : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10 cursor-pointer'
              }
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#dcddde"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
            <svg
              className={
                active
                  ? 'absolute rotate-90 opacity-0 transition-all duration-100'
                  : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10'
              }
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#dcddde"
                d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
