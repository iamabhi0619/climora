import axios from "axios";

const UNIT = "metric"; // or 'imperial' for Fahrenheit
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API;

const WeatherAPI = {
  async getWeather(
    latitude: number,
    longitude: number,
    units: string = UNIT,
    exclude: string = ""
  ) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          exclude: exclude,
          appid: API_KEY,
        },
      });
      return await response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Error fetching weather data:", error.message);
      } else {
        console.error("Error fetching weather data:", error);
      }
      throw error;
    }
  },
};

export default WeatherAPI;
