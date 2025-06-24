// weatherService.ts

import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const UNIT = "metric";
const API_KEY = process.env.OPENWEATHER_API_KEY as string;

const GetCurrentWeather = {
  async getByCoordinates(lat: string, lon: string, units: string = UNIT) {
    try {
      const { data } = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units,
          appid: API_KEY,
        },
      });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching weather by coordinates:", err.message);
      } else {
        console.error("Error fetching weather by coordinates:", err);
      }
      throw err;
    }
  },

  async getByCity(city: string, units: string = UNIT) {
    try {
      const { data } = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units,
          appid: API_KEY,
        },
      });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching weather by coordinates:", err.message);
      } else {
        console.error("Error fetching weather by coordinates:", err);
      }
      throw err;
    }
  },

  async getByCityId(cityId: number, units: string = UNIT) {
    try {
      const { data } = await axios.get(`${BASE_URL}/weather`, {
        params: {
          id: cityId,
          units,
          appid: API_KEY,
        },
      });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching weather by coordinates:", err.message);
      } else {
        console.error("Error fetching weather by coordinates:", err);
      }
      throw err;
    }
  },
};

export default GetCurrentWeather;
