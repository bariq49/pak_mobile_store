// ProductCountdownTimer.tsx
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const TimerRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) return null;
    const times = [days, hours, minutes, seconds];
    return (
        <div className="flex items-center text-base xl:text-lg text-brand-dark font-medium -mx-2.5">
            {times.map((time, idx) => (
                <React.Fragment key={idx}>
                    <span
                        
                        className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5"
                    >
                        {zeroPad(time)}
                    </span>
                    {idx < times.length - 1 && ':'}
                </React.Fragment>
            ))}
        </div>
    );
};

const ProductCountdownTimer = ({ date }: { date: string | number | Date }) => (
    <Countdown date={date} intervalDelay={1000} renderer={TimerRenderer} />
);

export default ProductCountdownTimer;
