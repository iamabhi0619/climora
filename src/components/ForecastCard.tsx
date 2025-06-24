import { DailyEntry } from '@/lib/types'
import moment from "moment";
import { motion } from "framer-motion";
import {
    IconDroplet,
    IconWind,
    IconSunrise,
    IconSunset,
    IconCloudRain,
    IconTemperaturePlusFilled,
    IconTemperatureMinusFilled,
} from "@tabler/icons-react";
// import Image from "next/image";

const ForecastCard = (data: DailyEntry) => {
    const date = moment.unix(data.dt).format("dddd, MMM D");
    const sunrise = moment.unix(data.sunrise).format("HH:mm");
    const sunset = moment.unix(data.sunset).format("HH:mm");
    // const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-accent2 rounded-2xl py-6 px-3 max-w-md w-full mx-auto h-full flex flex-col justify-between"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="md:text-xl text-lg font-semibold text-dark2">{date}</h2>
                    <p className="text-sm text-dark1">{data.summary}</p>
                </div>
                {/* <Image src={iconUrl} alt="Weather Icon" width={80} height={80} /> */}
            </div>

            <div className="mt-4 flex items-center justify-between text-dark2">
                <div className="flex md:flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <IconTemperaturePlusFilled className="text-red-500 w-5 h-5" />
                        <p className='-space-y-1 flex flex-col'>
                            <span className='text-xs'>Max</span>
                            <span> {data.temp.max}°C</span>
                        </p>

                    </div>
                    <div className="flex items-center gap-2">
                        <IconTemperatureMinusFilled className="text-blue-500 w-5 h-5" />
                        <p className='-space-y-1 flex flex-col'>
                            <span className='text-xs'>Min</span>
                            <span>{data.temp.min}°C</span>
                        </p>

                    </div>
                </div>

                <div className="hidden md:flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <IconDroplet className="text-cyan-500 w-5 h-5" />
                        <p className='-space-y-1 flex flex-col'>
                            <span>{data.humidity}% </span>
                            <span className='text-xs'>Humidity</span>
                        </p>

                    </div>
                    <div className="flex items-center gap-2">
                        <IconWind className="text-sky-400 w-5 h-5" />
                        <p className='-space-y-1 flex flex-col'>
                            <span>{data.wind_speed} m/s </span>
                            <span className='text-xs'>Wind</span>
                        </p>

                    </div>
                </div>
            </div>

            <div className="mt-4 hidden md:flex justify-between text-sm text-dark2">
                <div className="flex items-center gap-1">
                    <IconSunrise className="text-amber-400 w-5 h-5" />
                    <span>{sunrise}</span>
                </div>
                <div className="flex items-center gap-1">
                    <IconSunset className="text-pink-500 w-5 h-5" />
                    <span>{sunset}</span>
                </div>
                <div className="flex items-center gap-1">
                    <IconCloudRain className="text-blue-400 w-5 h-5" />
                    <span>{data.rain ?? 0} mm</span>
                </div>
            </div>
        </motion.div>
    );
}

export default ForecastCard