'use Client'
import React from 'react';
import { Cloud, Sun, CloudRain, CloudFog, Droplet, Wind } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';

const weatherIcons = {
    "Sunny": <Sun className='text-yellow-500md: w-8md: h- h-5 w-5' />,
    "Cloudy": <Cloud className='text-gray-500 md:w-8 md:h-8 h-5 w-5' />,
    "Rainny": <CloudRain className='text-blue-500 md:w-8 md:h-8 h-5 w-5' />,
    "Mist": <CloudFog className='text-gray-400 md:w-8 md:h-8 h-5 w-5' />
};

const RightSection = () => {
    const { weather } = useAppContext();
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

            
            <div className='flex w-full justify-between px-4 sm:hidden'>
                <p className='text-xl md:text-2xl font-semibold'>{weather?.name}{weather?.sys.country}</p>
                <p className='text-xl md:text-xl font-medium md:mt-2'>{moment.unix(weather?.dt ?? 0).format('LL')}</p>
            </div>

            <div className='flex w-full justify-between px-4'>
                <p className='text-xl md:text-2xl font-semibold'>Good Morning</p>
                <p className='text-xl md:text-xl font-medium md:mt-2'>12:27 PM</p>
            </div>

            {/* Current Weather */}
            <div className='text-center md:mt-6 flex md:flex-col md:gap-3 items-center justify-between px-3 w-full'>
                <div className=''>
                    <p className='text-7xl md:text-5xl font-bold sm:flex items-start leading-none hidden'>
                        {weather?.main.temp}°<span className='text-3xl mt-1'>C</span>
                    </p>
                    <p className='text-7xl font-bold flex items-start leading-none sm:hidden'>
                    {Math.round(weather?.main.temp ?? 0)}°<span className="text-4xl mt-2">C</span>
                    </p>
                    <div className='flex justify-center md:gap-3 md:mt-2'>
                        <Wind className='w-5 h-5' /> <span>{weather?.wind.speed} kmph</span>
                        <Droplet className='w-5 h-5' /> <span>{weather?.main.humidity}%</span>
                    </div>
                </div>
                <div>
                    <p className='mt-2 text-lg text-gray-500'>Feels like {Math.round(weather?.main.feels_like ?? 0)}°</p>
                    <p className='text-2xl font-semibold flex items-center justify-center gap-2'>
                        {weather?.weather[0].description}
                    </p>
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className='w-full'>
                <p className='text-lg font-semibold md:mt-6 text-center w-full'>Hourly Forecast</p>
                <div className=' md:grid md:grid-cols-3 md:gap-4 gap-3 px-2 md:mt-4 flex items-start justify-between w-full overflow-y-scroll scrollbar-hide'>
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
