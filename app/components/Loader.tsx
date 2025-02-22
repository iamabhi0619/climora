import { motion } from 'framer-motion';
import React from 'react';

const Loader = () => {
    const rippleVariants = {
        animate: {
            scale: [1, 1.3, 1],
            boxShadow: [
                '0px 10px 10px rgba(0, 0, 0, 0.3)',
                '0px 30px 20px rgba(0, 0, 0, 0.3)',
                '0px 10px 10px rgba(0, 0, 0, 0.3)'
            ],
            transition: {
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity
            }
        }
    };

    return (
        <div>
            <div className="absolute w-full h-full overflow-hidden">
                {[40, 30, 20, 10, 0].map((inset, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full border-t border-gray-200"
                        style={{ inset: `${inset}%` }}
                        variants={rippleVariants}
                        animate="animate"
                        transition={{ delay: 0.2 * index }}
                    />
                ))}
                <div className="absolute inset-0 flex justify-center items-center">
                    <motion.div
                        className="text-2xl font-bold text-dark2 flex flex-col items-center -space-y-0.5 sm:flex-row sm:space-x-2"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                            duration: 2,
                            ease: 'easeInOut',
                            repeat: Infinity
                        }}
                    >
                        {"CLIMORA".split('').map((char, index) => (
                            <span className='text-sm font-bold font-nunito sm:text-xl md:text-xl lg:text-3xl' key={index}>{char}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
