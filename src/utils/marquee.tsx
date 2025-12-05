'use client';
// utils/Marquee.tsx
import React, { ReactNode, useState } from 'react';
import cn from 'classnames';

type MarqueeProps = {
    children: ReactNode; // Content of the marquee
    speed?: number; // Scrolling speed (default: 50)
    className?: string; // Additional Tailwind CSS classes
};

const Marquee: React.FC<MarqueeProps> = ({ children, speed = 50, className = '' }) => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className={cn(
                'relative overflow-hidden whitespace-nowrap',
                className
            )}
        >
            <div
                className={cn(
                    'flex gap-20 animate-marquee',
                    isPaused && 'animation-paused'
                )}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
        </div>
    );
};

export default Marquee;