import { motion } from 'framer-motion';

const rings = [0, 1, 2, 3, 4];

export default function Loader() {
    return (
        <div className="relative w-40 h-40">
            {rings.map((i) => (
                <motion.span
                    key={i}
                    className="absolute inset-0 rounded-full border border-gray-300"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{
                        duration: 1.8,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        delay: i * 0.25,   // simple stagger
                    }}
                />
            ))}

            <motion.div
                className="absolute inset-0 flex items-center justify-center font-bold tracking-wider text-dark2 text-xl"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
            >
                {'CLIMORA'.split('').map((c) => (
                    <span key={c}>{c}</span>
                ))}
            </motion.div>
        </div>
    );
}
