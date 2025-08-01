import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
   <div className="w-full bg-[#0E1116] pt-16 text-center">
  <p className="text-base text-[#80D8FF] tracking-wide">
    Trusted by learners from
  </p>
  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5 px-4">
    <img
      src={assets.microsoft_logo}
      alt="Microsoft"
      className="w-20 md:w-28 hover:scale-105 transition duration-300"
    />
    <img
      src={assets.accenture_logo}
      alt="Accenture"
      className="w-20 md:w-28 hover:scale-105 transition duration-300"
    />
    <img
      src={assets.walmart_logo}
      alt="Walmart"
      className="w-20 md:w-28 hover:scale-105 transition duration-300"
    />
    <img
      src={assets.paypal_logo}
      alt="Paypal"
      className="w-20 md:w-28 hover:scale-105 transition duration-300"
    />
    <img
      src={assets.adobe_logo}
      alt="Adobe"
      className="w-20 md:w-28 hover:scale-105 transition duration-300"
    />
  </div>
</div>



    
  )
}

export default Companies