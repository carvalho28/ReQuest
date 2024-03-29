import { useState, useEffect, CSSProperties } from "react";
import moment from "moment";

interface Props {
  dateString: string;
}

// create a type for the style object
interface Style extends CSSProperties {
  "--value": string;
}

/**
 * CountdownTimer component is the component used to render the countdown timer
 * @param dateString - The date string of the countdown timer
 * @returns Returns the CountdownTimer component
 */
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
            {timeLeft.days.toString().length > 2 ? (
              <div className="flex flex-row">
                <span className="countdown font-mono text-xl">
                  <span style={{ "--value": "99" } as Style}></span>
                </span>
                <span className="countdown font-mono text-xl">+</span>
              </div>
            ) : (
              <span className="countdown font-mono text-2xl">
                <span style={{ "--value": timeLeft.days } as Style}></span>
              </span>
            )}
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
          <span className="font-bold text-2xl px-4 py-1">Time&apos;s up</span>
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
