import React, { useState, useEffect, CSSProperties } from "react";
import moment from "moment";

interface Props {
  dateString: string;
}

//  <span className="countdown font-mono text-2xl">
{
  /* <span style={{ "--value": timeLeft.days }}></span>
</span> */
}

// create a type for the style object
interface Style extends CSSProperties {
  "--value": string;
}

const CountdownTimer = ({ dateString }: Props) => {
  const date = new Date(dateString);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const duration = moment.duration(moment(date).diff(moment()));
    return {
      days: duration.asDays().toFixed(0),
      hours: duration.hours().toString().padStart(2, "0"),
      minutes: duration.minutes().toString().padStart(2, "0"),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      if (newTimeLeft.minutes !== timeLeft.minutes) {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft.minutes]);

  return (
    <>
      {timeLeft.minutes.toString() > "0" ? (
        <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-primaryblue rounded-box items-center text-white">
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": timeLeft.days } as Style}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-primaryblue rounded-box text-white items-center">
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": timeLeft.hours } as Style}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-primaryblue rounded-box text-white items-center">
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": timeLeft.minutes } as Style}></span>
            </span>
            min
          </div>
        </div>
      ) : (
        // banner with time's up
        <div className="flex flex-col p-2 bg-red-400 rounded-box items-center text-white">
          <span className="font-bold text-2xl px-4 py-1">Time's up</span>
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
