'use Client'
import React from 'react';
import { Cloud, Sun, CloudRain, CloudFog, Droplet, Wind } from 'lucide-react';

const weatherIcons = {
    "Sunny": <Sun className='text-yellow-500md: w-8md: h- h-5 w-5' />,
    "Cloudy": <Cloud className='text-gray-500 md:w-8 md:h-8 h-5 w-5' />,
    "Rainny": <CloudRain className='text-blue-500 md:w-8 md:h-8 h-5 w-5' />,
    "Mist": <CloudFog className='text-gray-400 md:w-8 md:h-8 h-5 w-5' />
};

const RightSection = () => {
    const hourlyData = [
        { time: "1 PM", temp: 20, condition: "Cloudy" },
        { time: "2 PM", temp: 21, condition: "Rainny" },
        { time: "3 PM", temp: 21, condition: "Rainny" },
        { time: "4 PM", temp: 20, condition: "Cloudy" },
        { time: "5 PM", temp: 21, condition: "Rainny" },
        { time: "6 PM", temp: 21, condition: "Rainny" }
    ];

    return (
        <div className='md:h-full md:w-3/12 flex w-full flex-col items-center md:py-10 rounded-l-3xl text-dark2 md:gap-3 gap-2 py-5'>
            <div className='flex w-full justify-between px-4'>
                <p className='text-xl md:text-2xl font-semibold'>Good Morning</p>
                <p className='text-xl md:text-xl font-medium md:mt-2'>12:27 PM</p>
            </div>

            {/* Current Weather */}
            <div className='text-center md:mt-6 flex md:flex-col md:gap-3 items-center justify-between px-3 w-full'>
                <div className=''>
                    <p className='text-7xl md:text-6xl font-bold flex items-start leading-none'>
                        20°<span className='mt-0 text-6xl'>c</span>
                    </p>
                    <div className='flex justify-center md:gap-3 md:mt-2'>
                        <Wind className='w-5 h-5' /> <span>6.1 mph</span>
                        <Droplet className='w-5 h-5' /> <span>90%</span>
                    </div>
                </div>
                <div>
                    <p className='mt-2 text-lg text-gray-500'>Feels like 19°</p>
                    <p className='text-2xl font-semibold flex items-center justify-center gap-2'>
                        {weatherIcons["Cloudy"]} Cloudy
                    </p>
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className='w-full'>
                <p className='text-lg font-semibold md:mt-6 text-center w-full'>Hourly Forecast</p>
                <div className=' md:grid md:grid-cols-3 md:gap-4 gap-3 px-2 md:mt-4 flex items-start justify-start w-full overflow-y-scroll scrollbar-hide'>
                    {hourlyData.map((hour) => (
                        <div key={hour.time} className='flex flex-col items-center md:p-3 md:rounded-lg md:gap-1 md:border-0 border-r pr-2 border-dark2'>
                            <p className='font-medium'>{hour.time}</p>
                            <div className='flex md:flex-col items-center gap-1'>
                                {weatherIcons[hour.condition as keyof typeof weatherIcons]}
                                <p className='text-lg font-semibold'>{hour.temp}°</p>
                            </div>
                            <p className='text-sm text-gray-600'>{hour.condition}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSection;
