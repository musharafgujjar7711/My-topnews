import React from 'react'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { BsSunrise, BsSunsetFill } from 'react-icons/bs'
import { FaTemperatureQuarter } from 'react-icons/fa6'
import { WiHumidity, WiWindBeaufort11 } from 'react-icons/wi'

function DateAndTime({ weather: { name, formattedLocaltime, country, details, icon, temp, feels_like, humidity, sunrise, sunset, temp_max, temp_min } }) {
  
  return (
    <div className='pt-4 flex justify-center items-center flex-col'>
      <div className='font-bold text-black text-lg flex-wrap flex p-2'>
        {formattedLocaltime}
      </div> 
      <div className='pt-8 font-bold text-lg'>
        {name} - {country}
      </div>
      <div className='pt-8 font-bold'>
        {details}
      </div>
      <div className='pt-8 flex flex-col md:flex-row justify-center md:gap-44 items-center'>
        <span><img src={icon} alt="" className="w-16 h-16 md:w-24 md:h-24" /></span>
        <span className='text-3xl'>{temp.toFixed()}°C</span>
        <span>
          <ul className='space-y-2 md:space-y-0 md:space-x-8 md:flex'>
            <li className='flex items-center gap-2'><FaTemperatureQuarter /> {feels_like.toFixed()}°C</li>
            <li className='flex items-center gap-2'><WiHumidity /> {humidity}%</li>
            <li className='flex items-center gap-2'><WiWindBeaufort11 size={20} /> Wind 22km/hr</li>
          </ul>
        </span>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-16 pt-12'>
        <span className='flex items-center gap-2'>
          <BsSunrise /> {sunrise}
        </span>
        <span className='flex items-center gap-2'>
          <BsSunsetFill /> {sunset}
        </span>
        <span className='flex items-center gap-2'>
          <BiUpArrow /> High {temp_max.toFixed()}°C
        </span> 
        <span className='flex items-center gap-2'>
          <BiDownArrow /> Low {temp_min.toFixed()}°C
        </span>
      </div>
    </div>
  )
}

export default DateAndTime
