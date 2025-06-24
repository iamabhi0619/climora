'use client';

// import { useEffect } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { useWeatherStore } from '@/store/weatherStore';
import Home from '@/pages/Home';
import Loader from '@/components/Loader';

export default function Page() {
  const { isLoading: isLoadingLocation, error: locationError } = useLocationStore();

  const { isLoading: isLoadingWeather, error: weatherError, } = useWeatherStore();

  const isLoading = isLoadingLocation || isLoadingWeather;

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (locationError || weatherError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">
          {locationError || weatherError || 'Something went wrong.'}
        </p>
      </div>
    );
  }

  return (
    <Home />
  );
}
