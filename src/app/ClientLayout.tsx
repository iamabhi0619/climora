'use client';

import { useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";
import { useWeatherStore } from "@/store/weatherStore";

export default function ClientLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { fetchCoOrdinates, coOrdinates } = useLocationStore();
    const { fetchWeather } = useWeatherStore();

    useEffect(() => {
        fetchCoOrdinates();
    }, [fetchCoOrdinates]);

    useEffect(() => {
        if (coOrdinates.latitude && coOrdinates.longitude) {
            fetchWeather();
        }
    }, [coOrdinates, fetchWeather]);

    return <>{children}</>;
}
