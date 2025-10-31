'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/public/Logo.png'
import { useSearch } from '../context/SearchContext'

function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="w-full z-20 fixed top-0 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[124px] py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 h-auto sm:h-[87px]">
      <Image
        className="w-[90px] h-auto sm:w-[100px] sm:h-[55px]"
        alt="Logo"
        src={Logo}
        priority
      />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-[10px] w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search experiences"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[340px] placeholder:text-[#727272] rounded-[4px] py-2 sm:py-3 px-3 sm:px-4 bg-[#EDEDED] outline-none text-black border-none hover:border hover:border-gray-400 focus:border-gray-500 transition"
        />
        <button className="w-full sm:w-fit text-black rounded-lg py-2 sm:py-3 px-4 sm:px-5 bg-[#FFD643]">
          Search
        </button>
      </div>
    </div>
  )
}

export default Navbar
