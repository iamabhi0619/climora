import WeatherAPI from "@/lib/api/weather";
import { OneCallAPIResponse } from "@/lib/types/oneCall";
import { create } from "zustand";
import { useLocationStore } from "./locationStore";

interface WeatherState {
  weather: OneCallAPIResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: (
    lat?: number,
    lon?: number,
    units?: "metric" | "imperial" | "standard",
    exclude?: string
  ) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  isLoading: false,
  error: null,

  fetchWeather: async (lat?: number, lon?: number, units = "metric", exclude = "") => {
    set({ isLoading: true, error: null });

    try {
      let latitude = lat;
      let longitude = lon;

      // Fallback to location store
      if (latitude === undefined || longitude === undefined) {
        const { latitude: latFromStore, longitude: lonFromStore } =
          useLocationStore.getState().coOrdinates;

        if (latFromStore !== null && lonFromStore !== null) {
          latitude = latFromStore;
          longitude = lonFromStore;
        }
      }

      if (latitude === undefined || longitude === undefined) {
        throw new Error("Coordinates are missing. Cannot fetch weather data.");
      }

      const weatherData = await WeatherAPI.getWeather(latitude, longitude, units, exclude);

      if (process.env.NODE_ENV === "development") {
        console.debug("Fetched weather data:", weatherData);
      }

      set({
        weather: weatherData,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching weather:", error);
      }
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
