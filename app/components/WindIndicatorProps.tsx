import React from 'react';
import { ChevronsUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface WindIndicatorProps {
  speed: number;
  direction: number;
}
const getCardinalDirection = (angle: number): string => {
  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW"
  ];
  const index = Math.round(angle / 22.5) % 16;
  return directions[index];
};
const WindIndicator: React.FC<WindIndicatorProps> = ({ speed, direction }) => {
  const cardinalDirection = getCardinalDirection(direction);
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex items-center justify-center rounded-full border-2 border-dark2"
        animate={{ rotate: direction }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <ChevronsUp className="text-dark2" size={20} />
      </motion.div>
      <h2 className="">{speed}m/s</h2>
      <p className="font-medium text-xs flex flex-col items-center">
        <span>
          {cardinalDirection}
        </span>
        <span>
          {Math.round(direction)}°
        </span>
      </p>
    </div>
  );
};

export default WindIndicator;
