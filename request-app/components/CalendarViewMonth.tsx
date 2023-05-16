import { useEffect, useState } from "react";
import { classNames } from "./utils/general";
import {
  addRequirementsAsDays,
  getProjectsAsDays,
} from "./utils/calendarHelper";
import { Days } from "./utils/calendarHelper";

interface CalendarViewProps {
  projects: any;
  requirements: any;
  monthYear: any;
}

const CalendarViewMonth = ({
  projects,
  requirements,
  monthYear,
}: CalendarViewProps) => {
  // const days = getProjectsAsDays(projects);

  const [days, setDays] = useState<Days[]>([]);

  // turn isSelected to true on 20 of the month
  const [selectedDay, setSelectedDay] = useState<Days>();

  useEffect(() => {
    setDays(getProjectsAsDays(projects, monthYear));
  }, [projects, monthYear]);

  useEffect(() => {
    // setDays(getRequirementsAsDays(requirements, days));
    const addRequirements = () => {
      addRequirementsAsDays(requirements, days);
    };
    addRequirements();
  }, [requirements, days]);

  useEffect(() => {
    const selected = days[19];
    if (selected) {
      selected.isSelected = true;
      setSelectedDay(selected);
    }
  }, [days]);

  function changeSelectedDay(day: any) {
    const index = days.findIndex((day) => day.isSelected === true);
    days[index].isSelected = false;
    const newDayIndex = days.findIndex((d) => d.date === day);
    days[newDayIndex].isSelected = true;
    setSelectedDay(days[newDayIndex]);
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day: any) => (
              <div
                key={day.date + Math.random()}
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative px-3 py-4"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-contrast font-semibold text-white"
                      : undefined
                  }
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event: any) => (
                      <li key={event.id}>
                        <a
                          href={event.href}
                          className="group flex mt-3 items-center p-2 rounded-md border border-gray-300"
                        >
                          <div className="flex flex-col">
                            <p
                              className="flex-auto truncate font-medium text-black group-hover:text-contrast"
                              onClick={() => {
                                changeSelectedDay(day.date);
                              }}
                            >
                              {/* {event.name} */}
                              {/* for medium screens add ... to name */}
                              <span className="hidden lg2:flex">
                                {event.name.length > 20
                                  ? event.name.substring(0, 20) + "..."
                                  : event.name}
                              </span>
                              <span className="lg2:hidden">
                                {event.name.length > 10
                                  ? event.name.substring(0, 10) + "..."
                                  : event.name}
                              </span>
                            </p>
                            <div className="flex flex-row">
                              <span
                                className={classNames(
                                  event.isProject
                                    ? "bg-sky-500 text-white"
                                    : "bg-pink-400 text-white",
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-center justify-center"
                                )}
                              >
                                {/* for larger screens display Requirement for small just Req */}
                                <span className="hidden lg2:flex">
                                  {event.isProject ? "Project" : "Requirement"}
                                </span>
                                <span className="lg2:hidden">
                                  {event.isProject ? "Project" : "Req."}
                                </span>
                              </span>
                              {event.priority && (
                                <span
                                  className={classNames(
                                    event.priority === "P1"
                                      ? "bg-red-100 text-red-800"
                                      : event.priority === "P2"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800",
                                    "ml-1 rounded-md px-1"
                                  )}
                                >
                                  {event.priority}
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day: any) => (
              <button
                key={day.date + Math.random()}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                )}
                onClick={() => {
                  changeSelectedDay(day.date);
                }}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-contrast",
                    day.isSelected && !day.isToday && "bg-black",
                    "ml-auto"
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event: any) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDay && (
        <div>
          {selectedDay.events.length > 0 && (
            <div className="px-4 py-10 sm:px-6 lg:hidden">
              <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                {selectedDay?.events.map((event) => (
                  <li
                    key={event.id}
                    className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50 space-y-4"
                  >
                    <div className="flex-auto items-center justify-center">
                      <p className="font-semibold text-gray-900">
                        {event.name}
                      </p>
                      <div className="flex flex-row items-center">
                        <span
                          className={classNames(
                            event.isProject
                              ? "bg-cyan-500 text-white"
                              : "bg-pink-400 text-white",
                            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-center justify-center mt-2"
                          )}
                        >
                          {event.isProject ? "Project" : "Requirement"}
                        </span>
                        {event.priority && (
                          <span
                            className={classNames(
                              event.priority === "P1"
                                ? "bg-red-100 text-red-800"
                                : event.priority === "P2"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800",
                              "ml-1 rounded-md px-2 py-1 text-xs justify-center mt-2"
                            )}
                          >
                            {event.priority}
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={event.href}
                      className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                    >
                      Edit<span className="sr-only">, {event.name}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarViewMonth;
