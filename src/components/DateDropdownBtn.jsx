import React from 'react'

export default function DateDropdownBtn({
  setDateDropdown,
  setDate,
  dateDropdown,
  dates,
  date,
}) {
  let handleData = (e) => {
    setDate(e.target.innerText)
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDateDropdown(!dateDropdown)
      }}
      onBlur={() => {
        setDateDropdown(false)
      }}
      className="bg-black rounded-secondary regform:text-sm flex justify-between items-center pl-[11px] pr-2 relative"
    >
      <div
        className={`dropdownscrollbar overflow-y-scroll border border-black absolute w-full bottom-[40px] max-h-[215px] min-h-[215px] bg-gray-4 left-0 ${
          dateDropdown ? 'block' : 'hidden'
        }`}
      >
        {dates.map((d) => {
          return (
            <div
              onClick={handleData}
              key={crypto.randomUUID()}
              className="dropdown-btn regform:text-xs"
            >
              {d}
            </div>
          )
        })}
      </div>

      <p className="text-secondary-gray font-medium">{date}</p>
      <svg
        className="relative right-px bottom-px hover:fill-white transition-all duration-150 hover:cursor-pointer"
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
        fill="#b9bbbe"
      >
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    </button>
  )
}
