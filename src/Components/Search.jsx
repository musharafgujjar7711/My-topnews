import React, { useState } from 'react'
import { BiLocationPlus, BiSearch } from 'react-icons/bi'

function Search({ setQuery }) {
  const [city, setCity] = useState("");

  const onChangeCity = () => {
    if (city !== "") setQuery({ q: city });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className='p-4 mt-6 flex items-center justify-center gap-20'>
      <div className='flex items-center gap-6 justify-center'>
        <input 
          type="text" 
          placeholder='Search here by city name' 
          className='text-black w-auto p-3 rounded outline-none'
          value={city} 
          onChange={(e) => setCity(e.currentTarget.value)} 
        />
        <span>
          <BiSearch size={40} onClick={onChangeCity} />
        </span>
        <span>
          <BiLocationPlus size={30} onClick={getCurrentLocation} />
        </span>
      </div>
     
    </div>
  )
}

export default Search;
