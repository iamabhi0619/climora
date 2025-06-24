import { Weather, Wind, Temperature } from "./common";

export interface Current extends Temperature, Wind {
  dt: number;
  sunrise: number;
  sunset: number;
  weather: Weather[];
}
