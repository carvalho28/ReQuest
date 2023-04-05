import React, { useEffect, useState } from "react";
import { classNames } from "./utils/general";
import { getProjReqYear, MonthYear, DaysYear } from "./utils/calendarHelper";

interface CalendarViewYearProps {
  projects: any;
  requirements: any;
}

interface DayProps {
  events: any[]; // assuming each event is an object with some properties
}

// function to render dots for the number of events on a day, if more than 3 events, add + after the 3rd
// const Day = ({ events }: DayProps) => {
//   return (
//     <div className="flex justify-center">
//       {events && events.length > 0 && <span className="text-gray-400">•</span>}
//       {events && events.length > 1 && <span className="text-gray-400">•</span>}
//       {events && events.length > 2 && <span className="text-gray-400">•</span>}
//       {events && events.length > 3 && <span className="text-gray-400">+</span>}
//     </div>
//   );
// };

const CalendarViewYear = ({
  projects,
  requirements,
}: CalendarViewYearProps) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [months, setMonths] = useState<any>([]);

  function handleDayClick(day: any) {
    setSelectedEvents(day.events);
  }

  useEffect(() => {
    // get current year
    const currentYear = new Date().getFullYear();
    const months = getProjReqYear(projects, requirements, currentYear);
    setMonths(months);
  }, [projects, requirements]);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          {months.map((month: MonthYear) => (
            <section key={month.name} className="text-center">
              <h2 className="text-sm font-semibold text-gray-900">
                {month.name}
              </h2>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                {month.days.map((day: any, dayIdx: any) => (
                  <button
                    key={day.date}
                    type="button"
                    className={classNames(
                      day.isCurrentMonth
                        ? "bg-white text-gray-900"
                        : "bg-gray-50 text-gray-400",
                      dayIdx === 0 && "rounded-tl-lg",
                      dayIdx === 6 && "rounded-tr-lg",
                      dayIdx === month.days.length - 7 && "rounded-bl-lg",
                      dayIdx === month.days.length - 1 && "rounded-br-lg",
                      "py-2 hover:bg-gray-100 focus:z-10"
                    )}
                    onClick={() => handleDayClick(day)}
                  >
                    <time
                      dateTime={day.date}
                      className={classNames(
                        day.isToday && "bg-contrast font-semibold text-white",
                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full relative"
                      )}
                    >
                      {day.date.split("-").pop().replace(/^0/, "")}
                      {day.events && day.events.length > 0 && (
                        <span className="absolute -bottom-1 w-full h-1 flex justify-center items-center">
                          <span className="h-full flex items-center justify-center">
                            {[...Array(Math.min(day.events.length, 3))].map(
                              (_, index) => (
                                <span
                                  key={index}
                                  className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                                  style={{
                                    marginLeft: index > 0 ? "0.1rem" : "",
                                  }}
                                />
                              )
                            )}
                            {day.events.length > 3 && (
                              <>
                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full ml-0.1rem" />
                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full ml-0.1rem" />
                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full ml-0.1rem">
                                  <span className="sr-only">
                                    {day.events.length - 3} more events
                                  </span>
                                  <span className="absolute top-0.5 left-0 w-full h-full flex justify-center items-center font-bold text-xs">
                                    +
                                  </span>
                                </span>
                              </>
                            )}
                          </span>
                        </span>
                      )}
                    </time>

                    {/* {day.events.length} */}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div>Events</div>
      {/* {selectedEvents && (
        <ul>
          {selectedEvents.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default CalendarViewYear;

// {day.events && (
//     <div className="-mt-4">
//       {day.events.length > 0 && (
//         <span className="text-gray-400">•</span>
//       )}
//       {day.events.length > 1 && (
//         <span className="text-gray-400">•</span>
//       )}
//       {day.events.length > 2 && (
//         <span className="text-gray-400">•</span>
//       )}
//       {day.events.length > 3 && (
//         <span className="text-gray-400">+</span>
//       )}
//   )}
