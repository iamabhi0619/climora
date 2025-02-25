"use client"
import React from 'react'
import { useAppContext } from '../context/AppContext';
import moment from 'moment';
import WeatherIcon from './WeatherIcons';
import WindIndicator from './WindIndicatorProps';


const LeftSection = () => {
    const { weather, forecast } = useAppContext();
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
                    {forecast.map((_, index) => (
                        <div key={index} className='flex flex-col items-center gap-2 py-2 w-20 md:w-24 rounded-lg bg-gray-300 h-28'></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='h-full w-full md:w-9/12 bg-white flex flex-col items-center justify-between py-6 md:py-10 rounded-t-3xl md:rounded-r-3xl shadow-lg'>
            {/* Header */}
            <div className='hidden md:flex items-center w-full justify-between px-4 md:px-16 text-xl md:text-2xl font-nunito text-dark2'>
                <p className='font-bold'>{weather.name}, {weather.sys.country}</p>
                <p className='font-semibold'>{moment.unix(weather.dt).format('LL')}</p>
            </div>

            {/* Main Temperature Display */}
            <div className="font-nunito font-semibold text-dark2 text-center md:mt-6 md:block hidden">
                <p className="text-[70px] md:text-[200px] flex items-start leading-none">
                    {Math.ceil(weather.main.temp)}°<span className="text-4xl md:text-9xl mt-2 md:mt-4">C</span>
                </p>
            </div>
            {/* Weekly Forecast */}
            <div className="w-full px-2">
                <h3 className="text-lg md:text-xl font-bold text-dark2 mb-4 text-center">Weekly Forecast</h3>
                <div className="flex items-center gap-4 px-2 scrollbar-hide overflow-y-scroll pb-2 md:justify-center">
                    {forecast.map((condition) => (
                        <div
                            key={condition.date}
                            className="flex flex-col gap-2 items-center bg-gray-100 shadow-md rounded-xl py-4 px-5 min-w-[120px] md:min-w-[140px]">
                            <p className="text-lg md:text-lg font-bold">{moment(condition.date).format('ddd')}</p>
                            <div className=' flex gap-3'>
                                <div className="flex flex-col items-center">
                                    <WeatherIcon size={32} isDay={true} code={condition.most_common_weather_id} />
                                    <p className="text-lg font-semibold">{Math.round(condition.avg_temp)}°C</p>
                                    <p className="text-xs md:text-sm text-gray-600">{condition.most_common_weather}</p>
                                </div>
                                <WindIndicator speed={Math.round(condition.avg_wind_speed)} direction={condition.avg_wind_deg} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default LeftSection;
