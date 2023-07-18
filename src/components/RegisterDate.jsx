import React, { useState } from 'react'
import DateDropdownBtn from './DateDropdownBtn'
import { days, months, years } from '../data/data'

export default function RegisterDate() {
  const [dayDropdown, setDayDropdown] = useState(false)
  const [monthDropdown, setMonthDropdown] = useState(false)
  const [yearDropdown, setYearDropdown] = useState(false)

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState('January')
  const [year, setYear] = useState(2000)

  return (
    <div>
      <label
        className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block"
        htmlFor="date"
      >
        DATE OF BIRTH
      </label>

      <div className="text-base w-full h-10 grid gap-2.5 regform:gap-1 grid-cols-dropdowns">
        <DateDropdownBtn
          setDateDropdown={setMonthDropdown}
          setDate={setMonth}
          dateDropdown={monthDropdown}
          dates={months}
          date={month}
        />

        <DateDropdownBtn
          setDateDropdown={setDayDropdown}
          setDate={setDay}
          dateDropdown={dayDropdown}
          dates={days}
          date={day}
        />

        <DateDropdownBtn
          setDateDropdown={setYearDropdown}
          setDate={setYear}
          dateDropdown={yearDropdown}
          dates={years}
          date={year}
        />
      </div>
    </div>
  )
}
