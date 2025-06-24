import { CitySearchResult } from "@/lib/types/cityData";
import axios from "axios";
import { create } from "zustand";

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

interface LocationState {
  coOrdinates: Coordinates;
  city: CitySearchResult | null;
  isLoading: boolean;
  error?: string | null;
  fetchCoOrdinates: () => Promise<void>;
  setCoOrdinates: (latitude: number, longitude: number) => Promise<void>;
}

const fetchCityInfo = async (latitude: number, longitude: number): Promise<CitySearchResult> => {
  const response = await axios.get("https://api-bdc.io/data/reverse-geocode-client", {
    params: {
      latitude,
      longitude,
      localityLanguage: "en",
    },
  });

  const data = response.data;

  return {
    continent: data.continent,
    countryName: data.countryName,
    countryCode: data.countryCode,
    principalSubdivision: data.principalSubdivision,
    locality: data.locality,
    city: data.city || data.locality,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};

const getCoordinates = (): Promise<{ latitude: number; longitude: number }> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      async () => {
        try {
          const res = await axios.get("https://ipinfo.io/json");
          const [latitude, longitude] = res.data.loc.split(",").map(Number);
          resolve({ latitude: latitude, longitude: longitude });
        } catch (error) {
          if (process.env.NODE_ENV === "development")
            console.error("Failed to fetch coordinates from IP.", error);
          reject(new Error("Unable to fetch coordinates from IP."));
        }
      },
      { timeout: 10000 }
    );
  });

export const useLocationStore = create<LocationState>((set) => ({
  coOrdinates: {
    latitude: null,
    longitude: null,
  },
  city: null,
  isLoading: false,
  error: null,

  fetchCoOrdinates: async () => {
    set({ isLoading: true, error: null });
    try {
      const { latitude, longitude } = await getCoordinates();
      const cityData = await fetchCityInfo(latitude, longitude);
      set({
        coOrdinates: { latitude, longitude },
        city: cityData,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") console.error(error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch location.",
      });
    }
  },

  setCoOrdinates: async (latitude: number, longitude: number) => {
    set({ isLoading: true, error: null });
    try {
      const cityData = await fetchCityInfo(latitude, longitude);
      set({
        coOrdinates: { latitude, longitude },
        city: cityData,
        isLoading: false,
      });
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") console.error(error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to set coordinates.",
      });
    }
  },
}));
