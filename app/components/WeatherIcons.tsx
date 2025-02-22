"use client";
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Tornado,
  LucideIcon,
} from "lucide-react";

interface WeatherIconMapping {
  description: string;
  day: LucideIcon;
  night: LucideIcon;
}

type WeatherIconsMap = Record<string, WeatherIconMapping>;

const weatherIcons: WeatherIconsMap = {
  "200": { description: "Thunderstorm with light rain", day: CloudLightning, night: CloudLightning },
  "201": { description: "Thunderstorm with rain", day: CloudLightning, night: CloudLightning },
  "202": { description: "Thunderstorm with heavy rain", day: CloudLightning, night: CloudLightning },
  "210": { description: "Light thunderstorm", day: CloudLightning, night: CloudLightning },
  "211": { description: "Thunderstorm", day: CloudLightning, night: CloudLightning },
  "212": { description: "Heavy thunderstorm", day: CloudLightning, night: CloudLightning },
  "221": { description: "Ragged thunderstorm", day: CloudLightning, night: CloudLightning },
  "230": { description: "Thunderstorm with light drizzle", day: CloudLightning, night: CloudLightning },
  "231": { description: "Thunderstorm with drizzle", day: CloudLightning, night: CloudLightning },
  "232": { description: "Thunderstorm with heavy drizzle", day: CloudLightning, night: CloudLightning },
  "300": { description: "Light drizzle", day: CloudDrizzle, night: CloudDrizzle },
  "301": { description: "Drizzle", day: CloudDrizzle, night: CloudDrizzle },
  "500": { description: "Light rain", day: CloudRain, night: CloudRain },
  "501": { description: "Moderate rain", day: CloudRain, night: CloudRain },
  "502": { description: "Heavy rain", day: CloudRain, night: CloudRain },
  "511": { description: "Freezing rain", day: CloudSnow, night: CloudSnow },
  "600": { description: "Light snow", day: CloudSnow, night: CloudSnow },
  "601": { description: "Snow", day: CloudSnow, night: CloudSnow },
  "701": { description: "Mist", day: CloudFog, night: CloudFog },
  "711": { description: "Smoke", day: CloudFog, night: CloudFog },
  "721": { description: "Haze", day: CloudFog, night: CloudFog },
  "741": { description: "Fog", day: CloudFog, night: CloudFog },
  "751": { description: "Sand", day: CloudFog, night: CloudFog },
  "800": { description: "Clear sky", day: Sun, night: Moon },
  "801": { description: "Few clouds", day: CloudSun, night: CloudMoon },
  "802": { description: "Scattered clouds", day: Cloud, night: Cloud },
  "803": { description: "Broken clouds", day: Cloud, night: Cloud },
  "804": { description: "Overcast clouds", day: Cloud, night: Cloud },
  "781": { description: "Tornado", day: Tornado, night: Tornado },
};

interface WeatherIconProps {
  code: string;
  isDay: boolean;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, size = 32 }) => {
  const IconComponent = isDay ? weatherIcons[code]?.day : weatherIcons[code]?.night;
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};

const getWeatherDescription = (code: string): string => {
  return weatherIcons[code]?.description || "Unknown weather condition";
};

export { WeatherIcon, getWeatherDescription };

export default WeatherIcon;