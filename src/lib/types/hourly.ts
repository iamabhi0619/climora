import { Current } from "./current";

export interface HourlyEntry extends Current {
  pop: number; // Probability of precipitation
}

export type Hourly = HourlyEntry[];
