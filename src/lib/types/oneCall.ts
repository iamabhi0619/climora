import { Current } from "./current";
import { Daily } from "./daily";
import { Hourly } from "./hourly";
import { Minutely } from "./minutely";

export interface OneCallAPIResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely?: Minutely;
  hourly?: Hourly;
  daily?: Daily;
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }>;
}
