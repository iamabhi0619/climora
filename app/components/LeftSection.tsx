"use client"
import React, { useState } from 'react'
import { Cloud, Sun, CloudRain, CloudFog } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';

const weatherIcons = {
    "Sunny": <Sun className='text-yellow-500 w-8 h-8' />,
    "Cloudy": <Cloud className='text-gray-500 w-8 h-8' />,
    "Rainny": <CloudRain className='text-blue-500 w-8 h-8' />,
    "Mist": <CloudFog className='text-gray-400 w-8 h-8' />
};

const LeftSection = () => {
    const { weather } = useAppContext();
    const [activeDay, setActiveDay] = useState("Today");
    const data = [
        { day: "Today", temp: 20, condition: "Mist" },
        { day: "Tue", temp: 12, condition: "Sunny" },
        { day: "Wed", temp: 32, condition: "Rainny" },
        { day: "Thu", temp: 20, condition: "Mist" },
        { day: "Fri", temp: 12, condition: "Sunny" },
        { day: "Sat", temp: 32, condition: "Rainny" }
    ];
    if (!weather || Object.keys(weather).length === 0) {
        return (
            <div className='h-full w-full md:w-9/12 bg-white flex flex-col items-center justify-between py-6 md:py-10 rounded-t-3xl md:rounded-r-3xl shadow-lg animate-pulse'>

                <div className='flex items-center w-full justify-between px-4 md:px-16 text-xl md:text-2xl font-nunito text-dark2'>
                    <div className='h-6 w-24 bg-gray-300 rounded'></div>
                    <div className='h-6 w-24 bg-gray-300 rounded'></div>
                </div>

                <div className="text-center md:mt-6 md:block hidden">
                    <div className="h-[200px] w-[150px] bg-gray-300 rounded-lg"></div>
                    <div className='flex items-center justify-center gap-3 mt-4'>
                        <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
                        <div className='h-6 w-32 bg-gray-300 rounded'></div>
                    </div>
                </div>

                <div className='flex flex-wrap gap-4 md:gap-8 text-center overflow-x-auto w-full items-center justify-center px-4 py-4'>
                    {data.map((_, index) => (
                        <div key={index} className='flex flex-col items-center gap-2 py-2 w-20 md:w-24 rounded-lg bg-gray-300 h-28'></div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className='h-full w-full md:w-9/12 bg-white flex flex-col items-center justify-between py-6 md:py-10 rounded-t-3xl md:rounded-r-3xl shadow-lg'>
            {/* Header */}
            <div className='flex items-center w-full justify-between px-4 md:px-16 text-xl md:text-2xl font-nunito text-dark2'>
                <p className='font-bold'>{weather.name}, {weather.sys.country}</p>
                <p className='font-semibold'>{moment.unix(weather.dt).format('LL')}</p>
            </div>

            {/* Main Temperature Display */}
            <div className="font-nunito font-semibold text-dark2 text-center md:mt-6 md:block hidden">
                <p className="text-[70px] md:text-[200px] flex items-start leading-none">
                    {Math.ceil(weather.main.temp)}°<span className="text-4xl md:text-9xl mt-2 md:mt-4">C</span>
                </p>
                <p className='text-2xl md:text-4xl flex items-center justify-center gap-3'>
                    {weatherIcons["Cloudy"]} {weather.weather[0].main}
                </p>
            </div>

            {/* Weekly Forecast */}
            <div className='flex flex-wrap gap-4 md:gap-8 text-center text-dark2 overflow-x-auto w-full items-center justify-center px-4 py-4 scrollbar-hide'>
                {data.map((condition) => (
                    <div
                        key={condition.day}
                        className={`flex flex-col items-center gap-2 py-2 w-20 md:w-24 rounded-lg bg-white transition-all cursor-pointer 
                        ${activeDay === condition.day ? 'border border-dark2 shadow-md' : 'border border-transparent'}`}
                        onClick={() => setActiveDay(condition.day)}
                    >
                        <p className='font-semibold text-sm md:text-lg'>{condition.day}</p>
                        {weatherIcons[condition.condition as keyof typeof weatherIcons]}
                        <p className='text-md md:text-lg font-semibold'>{condition.temp}°C</p>
                        <p className='text-xs md:text-sm text-gray-600'>{condition.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeftSection;
