"use client"
import React, { useState } from 'react'
import { Cloud, Sun, CloudRain, CloudFog } from 'lucide-react';

const weatherIcons = {
    "Sunny": <Sun className='text-yellow-500 w-8 h-8' />,
    "Cloudy": <Cloud className='text-gray-500 w-8 h-8' />,
    "Rainny": <CloudRain className='text-blue-500 w-8 h-8' />,
    "Mist": <CloudFog className='text-gray-400 w-8 h-8' />
};

const LeftSection = () => {
    const [activeDay, setActiveDay] = useState("Today");

    const data = [
        { day: "Today", temp: 20, condition: "Mist" },
        { day: "Tue", temp: 12, condition: "Sunny" },
        { day: "Wed", temp: 32, condition: "Rainny" },
        { day: "Thu", temp: 20, condition: "Mist" },
        { day: "Fri", temp: 12, condition: "Sunny" },
        { day: "Sat", temp: 32, condition: "Rainny" }
    ];

    return (
        <div className='h-full w-9/12 bg-white flex flex-col items-center justify-between py-10 rounded-r-3xl shadow-lg'>
            {/* Header */}
            <div className='flex items-center w-full justify-between px-32 text-2xl font-nunito text-dark2'>
                <p className='font-bold'>Punjab</p>
                <p className='font-semibold'>21.01.2025</p>
            </div>

            {/* Main Temperature Display */}
            <div className="font-nunito font-semibold text-dark2 text-center">
                <p className="text-[200px] flex items-start leading-none">
                    {`20`}°<span className="text-8xl mt-4">C</span>
                </p>
                <p className='text-4xl flex items-center justify-center gap-3'>
                    {weatherIcons["Cloudy"]} Cloudy
                </p>
            </div>

            {/* Weekly Forecast */}
            <div className='flex gap-8 text-center text-dark2 overflow-x-hidden w-full items-center justify-center'>
                {data.map((condition) => (
                    <div
                        key={condition.day}
                        className={`flex flex-col items-center gap-2 py-2 w-24 rounded-lg bg-white transition-all cursor-pointer ${activeDay === condition.day && 'border border-dark2'}`}
                        onClick={() => setActiveDay(condition.day)}
                    >
                        <p className='font-semibold text-lg'>{condition.day}</p>
                        {weatherIcons[condition.condition as keyof typeof weatherIcons]}
                        <p className='text-lg font-semibold'>{condition.temp}°C</p>
                        <p className='text-sm text-gray-600'>{condition.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeftSection;