'use Client'
import React from 'react';
import { Cloud, Sun, CloudRain, CloudFog, Droplet, Wind } from 'lucide-react';

const weatherIcons = {
    "Sunny": <Sun className='text-yellow-500 w-8 h-8' />,
    "Cloudy": <Cloud className='text-gray-500 w-8 h-8' />,
    "Rainny": <CloudRain className='text-blue-500 w-8 h-8' />,
    "Mist": <CloudFog className='text-gray-400 w-8 h-8' />
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
        <div className='h-full w-3/12 flex flex-col items-center py-10 rounded-l-3xl text-dark2 gap-3'>
            <p className='text-2xl font-semibold'>Good Morning</p>
            <p className='text-xl font-medium mt-2'>12:27 PM</p>

            {/* Current Weather */}
            <div className='text-center mt-6'>
                <p className='text-6xl font-bold flex items-center justify-center'>
                    20°
                </p>
                <div className='flex justify-center gap-3 mt-2'>
                    <Wind className='w-5 h-5' /> <span>6.1 mph</span>
                    <Droplet className='w-5 h-5' /> <span>90%</span>
                </div>
                <p className='mt-2 text-lg text-gray-500'>Feels like 19°</p>
                <p className='text-2xl font-semibold flex items-center justify-center gap-2'>
                    {weatherIcons["Cloudy"]} Cloudy
                </p>
            </div>

            {/* Hourly Forecast */}
            <div>
                <p className='text-lg font-semibold mt-6 text-center'>Hourly Forecast</p>
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    {hourlyData.map((hour) => (
                        <div key={hour.time} className='flex flex-col items-center p-3 rounded-lg gap-1'>
                            <p className='font-medium'>{hour.time}</p>
                            {weatherIcons[hour.condition]}
                            <p className='text-lg font-semibold'>{hour.temp}°</p>
                            <p className='text-sm text-gray-600'>{hour.condition}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSection;
