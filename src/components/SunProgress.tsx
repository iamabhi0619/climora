'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import { IconSunHigh, IconSunrise, IconSunset } from '@tabler/icons-react';

interface SunProgressProps {
    sunrise: string; // '06:00'
    sunset: string;  // '18:00'
}

const SunProgress: React.FC<SunProgressProps> = ({ sunrise, sunset }) => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();
    const sunControls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            const now = moment();
            const sunriseTime = moment(sunrise, 'HH:mm');
            const sunsetTime = moment(sunset, 'HH:mm');
            const totalDuration = sunsetTime.diff(sunriseTime, 'minutes');
            const currentDuration = now.diff(sunriseTime, 'minutes');
            let percentage = Math.max(0, Math.min((currentDuration / totalDuration) * 100, 100));
            if (now.isAfter(sunsetTime)) {
                percentage = 100;
            }
            if (now.isBefore(sunriseTime)) {
                percentage = 0;
            }
            setProgress(percentage);
            controls.start({ width: `${percentage}%` });
            sunControls.start({ left: `${percentage}%` });
        }
    }, [inView, sunrise, sunset, controls, sunControls]);

    return (
        <div ref={ref} className="w-full px-8 flex flex-col space-y-3">
            <div className="flex justify-between items-center px-2">
                <div className="flex flex-col items-center">
                    <IconSunrise />
                    <p className="text-xs">Sunrise</p>
                </div>
                <div className="flex flex-col items-center">
                    <IconSunset />
                    <p className="text-xs">Sunset</p>
                </div>
            </div>

            <div className="relative w-full h-2 bg-gray-300 rounded-full z-0">
                {/* Sun icon above the progress bar */}
                <motion.div
                    className="absolute -top-2 rounded-full p-0 m-0 -translate-x-4"
                    initial={{ left: 0 }}
                    animate={sunControls}
                    transition={{ duration: 2, ease: 'easeOut' }}
                >
                    <IconSunHigh className="" />
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    className="h-full bg-dark1/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={controls}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />
            </div>

            <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span className="font-bold">{moment(sunrise, 'HH:mm').format('h:mm A')}</span>
                {progress === 100 ? (
                    <span>Daylight is over</span>
                ) : (
                    <span>{progress.toFixed(0)}% of daylight</span>
                )}
                <span className="font-bold">{moment(sunset, 'HH:mm').format('h:mm A')}</span>
            </div>
        </div>
    );
};

export default SunProgress;
