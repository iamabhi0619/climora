export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
}

export interface Temperature {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
}
