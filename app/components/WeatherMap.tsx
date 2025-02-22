'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect, JSX } from 'react';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import L from 'leaflet';

import { CloudRain, Cloud, Thermometer, Wind } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const layers: Record<
  string,
  { label: string; icon: JSX.Element; color: string; data: Record<string, string | number> }
> = {
  Precipitation: {
    label: 'precipitation_new',
    icon: <CloudRain size={20} />,
    color: 'bg-blue-600',
    data: { Intensity: 'Moderate', Chance: '70%' },
  },
  Clouds: {
    label: 'clouds_new',
    icon: <Cloud size={20} />,
    color: 'bg-gray-500',
    data: { Coverage: '80%', Altitude: '1500 m' },
  },
  Temperature: {
    label: 'temp_new',
    icon: <Thermometer size={20} />,
    color: 'bg-red-500',
    data: { Current: '28°C', FeelsLike: '30°C' },
  },
  Wind: {
    label: 'wind_new',
    icon: <Wind size={20} />,
    color: 'bg-green-500',
    data: { Speed: '15 km/h', Direction: 'North-East' },
  },
};

const WeatherMap = () => {
  const [activeLayer, setActiveLayer] = useState('precipitation_new');
  const [loading, setLoading] = useState(true);
  const [layerData, setLayerData] = useState(layers.Precipitation.data);

  const bounds = L.latLngBounds(
    [31.244288, 75.7006336],
    [31.244288, 75.7006336]
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLayerData(layers[Object.keys(layers).find(key => layers[key].label === activeLayer)!].data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeLayer]);

  const getWeatherLayer = (layer: string) =>
    `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API}`;

  return (
    <div className="w-full max-w-md h-1/2 rounded-lg shadow-lg bg-white relative">
      <div className="flex justify-center flex-col gap-2 absolute right-2 bottom-2 z-30">
        {Object.entries(layers).map(([name, { label, icon, color }]) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.05 }}
            transition={{duration: 0.03}}
            className={`flex items-center gap-0.5 px-3 py-1.5 text-sm font-bold rounded-lg transition-all w-full ${
              activeLayer === label ? `${color} text-white` : 'bg-dark1 bg-opacity-20 text-dark2'
            }`}
            onClick={() => {
              setActiveLayer(label);
            }}
          >
            {icon}
            {name}
          </motion.button>
        ))}
      </div>

      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </motion.div>
      )}

      <div className="absolute top-4 right-4 p-2 bg-secondary bg-opacity-50 rounded-lg shadow-lg z-20">
        <ul className="text-sm space-y-1">
          {Object.entries(layerData).map(([key, value]) => (
            <li key={key} className="flex justify-between space-x-2 font-bold text-sm text-dark2">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      <MapContainer
        bounds={bounds}
        boundsOptions={{ maxZoom: 10 }}
        className="h-full w-full rounded-lg z-10"
        id="weather-map"
        zoomControl={false}
        placeholder={<div>Loading map...</div>}
        style={{ border: '2px solid #ccc' }}
        whenReady={() => console.log('Map is ready!')}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TileLayer url={getWeatherLayer(activeLayer)} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
