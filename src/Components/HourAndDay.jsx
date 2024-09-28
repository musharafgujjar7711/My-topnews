import React from 'react';

function HourAndDay({ title, data }) {
  return (
    <div className='w-full '>
      <div className='flex justify-start items-center pt-8 p-2 ml-40 mr-50'>
        <h2 className='text-lg text-gray-900 font-bold '>{title}</h2>
      </div>
      <hr className='my-1 ml-40 mr-40' />
      <div className='flex justify-between items-center ml-40 mr-40 p-2 gap-3 flex-wrap'>
        {data.map((item, index) => ( 
          <div key={index} className='items-center justify-center flex flex-col gap-4'>
            <p>{item.dt}</p>
            <img src={item.icon} alt="" />
            <p>{item.temp.toFixed()}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourAndDay;
