"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type WeatherData = {
  coord: { lon: number; lat: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone?: number;
  id: number;
  name: string;
  cod: number;
};

type AppContextType = {
  weather: WeatherData | null;
  loading: boolean;
  cor: { lat: number | null; lon: number | null };
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cor, setCor] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (typeof window !== "undefined" && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCor({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          async () => {
            try {
              const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`);
              const { location } = response.data;
              setCor({ lat: location.lat, lon: location.lng });
            } catch (apiError) {
              console.error('Failed to fetch coordinates from Google API:', apiError);
            }
          },
          { enableHighAccuracy: true }
        );
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (cor.lat !== null && cor.lon !== null) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cor.lat}&lon=${cor.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API}`
          );
          setWeather(response.data as WeatherData);
        } catch (error) {
          console.error('Failed to fetch weather data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeather();
  }, [cor]);

  return (
    <AppContext.Provider value={{ weather, loading, cor }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
