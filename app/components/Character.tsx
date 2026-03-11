import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Character Assets
import baseV2 from '../../assets/character/base_v2.png';
import capImg from '../../assets/character/cap.png';
import jerseyImg from '../../assets/character/jersey.png';
import shadesImg from '../../assets/character/shades.png';

interface CharacterProps {
    state: {
        skin: string;
        hat: string;
        shirt: string;
        accessory: string;
        hatPos?: { x: number; y: number };
        shirtPos?: { x: number; y: number };
        accessoryPos?: { x: number; y: number };
    };
    width?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animate?: boolean;
}

const SIZE_PX: Record<string, number> = {
    sm: 128,
    md: 192,
    lg: 256,
    xl: 320,
};

export const Character = ({
    state,
    size = 'md',
    width,
    className = '',
    animate = true,
}: CharacterProps) => {
    const px = width ?? SIZE_PX[size] ?? 192;
    const spring = { type: 'spring', damping: 20, stiffness: 300 } as const;

    const getHueRotate = (skin: string) => {
        switch (skin) {
            case 'normal': return 'none';
            case 'tan': return 'sepia(0.3) saturate(1.2) brightness(0.9)';
            case 'blue': return 'none'; // Base is blue
            case 'green': return 'hue-rotate(-120deg)';
            case 'red': return 'hue-rotate(-240deg)';
            case 'purple': return 'hue-rotate(40deg)';
            case 'orange': return 'hue-rotate(-180deg)';
            case 'yellow': return 'hue-rotate(-140deg)';
            case 'pink': return 'hue-rotate(60deg)';
            case 'cyan': return 'hue-rotate(-20deg)';
            default: return 'none';
        }

    };

    const idleVariants = {
        animate: {
            y: [0, -4, 0] as any,
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            variants={animate ? (idleVariants as any) : undefined}
            animate="animate"
            className={`relative inline-block ${className}`}
            style={{ width: px }}
        >
            {/* ── Base Character ─────────────────────────────────── */}
            <img
                src={baseV2}
                alt="Character"
                className="block w-full h-auto relative z-0 transition-all duration-500"
                style={{ filter: getHueRotate(state.skin || 'normal') }}
                draggable={false}
            />

            {/* ── Jersey / Shirt ────────────────────────────────── */}
            <AnimatePresence>
                {state.shirt !== 'none' && (
                    <motion.img
                        key="shirt"
                        src={jerseyImg}
                        alt=""
                        className="absolute z-10"
                        style={{
                            width: '75%',
                            top: '38%',
                            left: '12.5%',
                            height: 'auto',
                            x: state.shirtPos?.x || 0,
                            y: state.shirtPos?.y || 0
                        }}
                        initial={animate ? { opacity: 0, scale: 0.7 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={animate ? { opacity: 0, scale: 0.7 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Cap / Hat ─────────────────────────────────────── */}
            <AnimatePresence>
                {state.hat !== 'none' && (
                    <motion.img
                        key="hat"
                        src={capImg}
                        alt=""
                        className="absolute z-20"
                        style={{
                            width: '90%',
                            top: '-5%',
                            left: '5%',
                            height: 'auto',
                            x: state.hatPos?.x || 0,
                            y: state.hatPos?.y || 0
                        }}
                        initial={animate ? { opacity: 0, scale: 0.7 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={animate ? { opacity: 0, scale: 0.7 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Shades / Accessory ────────────────────────────── */}
            <AnimatePresence>
                {state.accessory !== 'none' && (
                    <motion.img
                        key="accessory"
                        src={shadesImg}
                        alt=""
                        className="absolute z-30"
                        style={{
                            width: '95%',
                            top: '18%',
                            left: '2.5%',
                            height: 'auto',
                            x: state.accessoryPos?.x || 0,
                            y: state.accessoryPos?.y || 0
                        }}
                        initial={animate ? { opacity: 0, scale: 0.7 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={animate ? { opacity: 0, scale: 0.7 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
