
import React, { useState, useEffect } from 'react';
import Topbutton from './Components/Topbutton';
import Search from './Components/Search';

import HourAndDay from './Components/HourAndDay';
import getFormattedData from './Components/WeatherService';
import DateAndTIme from './Components/DateAndTIme';

function App() {
  const [query, setQuery] = useState({ q: 'Karachi' }); // Fix typo in setQuery
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const data = await getFormattedData({ q: query.q, units }); // Use the current query and units
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  

  return (
    <div className='h-100vh bg-blue-500 m-auto w-full text-white'>
      <Topbutton c setQuery={setQuery} />
      <Search setQuery={setQuery} />
      {weather && (
        <>
          
           
          <DateAndTIme weather={weather} />
          <HourAndDay title="3 hour step forecast" data={weather.hourlyForecast} /> 
          <div className=''>
          <HourAndDay c title="Daily step forecast" data={weather.dailyForecast}  />
          </div>
        </>
      )} 
    </div>
  );
}

export default App;
