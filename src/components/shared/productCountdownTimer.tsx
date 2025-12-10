// ProductCountdownTimer.tsx
import React from "react";
import Countdown, { zeroPad } from "react-countdown";

const TimerRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) return null;

  const timeUnits = [
    { value: days, label: "D" },
    { value: hours, label: "H" },
    { value: minutes, label: "M" },
    { value: seconds, label: "S" },
  ];

  return (
    <div className="flex items-center text-base xl:text-lg text-brand-dark font-medium md:-mx-2">
      {timeUnits.map((unit, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center mx-1 md:mx-1.5 lg:mx-2.5">
            <div className="flex items-center justify-center min-w-[55px] md:min-w-[65px] min-h-[40px] md:min-h-[45px] bg-gray-200 rounded p-2">
              <span className="text-lg md:text-xl font-bold text-brand-dark">
                {zeroPad(unit.value)}
              </span>
              <span className="text-lg md:text-xl text-gray-400 font-bold ml-1">
                {unit.label}
              </span>
            </div>
          </div>
          {idx < timeUnits.length - 1 && (
            <span className="text-2xl font-bold mx-2 text-brand-dark">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ProductCountdownTimer = ({ date }: { date: string | number | Date }) => (
  <Countdown date={date} intervalDelay={1000} renderer={TimerRenderer} />
);

export default ProductCountdownTimer;
