"use client"
import React from 'react'
// import moment from 'moment';
import { useLocationStore } from '@/store/locationStore';
import { useWeatherStore } from '@/store/weatherStore';
import ForecastCard from './ForecastCard';
import { DailyEntry } from '@/lib/types';
import CitySearchInput from './CitySearch';
// import WeatherIcon from './WeatherIcons';
// import WindIndicator from './WindIndicatorProps';


const LeftSection = () => {

    const { city } = useLocationStore();
    const { weather } = useWeatherStore();

    if (!city) {
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
                    {/* {forecast.map((_, index) => (
                        <div key={index} className='flex flex-col items-center gap-2 py-2 w-20 md:w-24 rounded-lg bg-gray-300 h-28'></div>
                    ))} */}
                </div>
            </div>
        );
    }

    return (
        <div className='h-full w-full md:w-9/12 bg-white flex flex-col items-center justify-between py-6 md:py-10 rounded-t-3xl md:rounded-r-3xl shadow-lg'>
            {/* Header */}
            <div className='hidden md:flex items-center w-full justify-between px-4 md:px-16 text-xl md:text-2xl font-overpass text-dark2'>
                <p className='font-bold'>{city.locality}, {city.city} {city.countryName}</p>
                {/* <p className='font-semibold'>{moment.unix(weather?.current.feels_like).format('LL')}</p> */}
                <CitySearchInput />
            </div>

            {/* Main Temperature Display */}
            <div className="font-nunito font-semibold text-dark2 text-center md:mt-6 md:block hidden">
                <p className="text-[70px] md:text-[200px] flex items-start leading-none">
                    {Math.ceil(weather?.current.temp ?? 0)}°<span className="text-4xl md:text-9xl mt-2 md:mt-4">C</span>
                </p>
            </div>
            {/* Weekly Forecast */}
            <div className="w-full px-2">
                <h3 className="text-lg md:text-xl font-bold text-dark2 mb-4 text-center">Weekly Forecast</h3>
                <div className="flex items-center gap-4 px-2 scrollbar-hide overflow-x-scroll pb-2 h-full max-h-52 md:max-h-60">
                    {weather?.daily?.slice(1, 5).map((condition: DailyEntry) => (
                        <ForecastCard key={condition.dt} {...condition} />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default LeftSection;
