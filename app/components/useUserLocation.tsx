"use client"; // Ensures this runs only on the client

import { useEffect, useState } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const useUserLocation = (): Location => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });

  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};

export default useUserLocation;
