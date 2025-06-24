import { Weather, Wind } from "./common";

interface DailyTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyEntry extends Wind {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  weather: Weather[];
  clouds: number;
  pop?: number;
  rain?: number;
  snow?: number;
  uvi?: number;
}

export type Daily = DailyEntry[];
