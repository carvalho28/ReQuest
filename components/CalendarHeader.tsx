import { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "./utils/general";
import format from "date-fns/format";
import CalendarViewMonth from "./CalendarViewMonth";
import CalendarViewYear from "./CalendarViewYear";

interface CalendarHeaderProps {
  projects: any;
  requirements: any;
}

const CalendarHeader = ({ projects, requirements }: CalendarHeaderProps) => {
  const [isMonthView, setIsMonthView] = useState(true);
  const [isYearView, setIsYearView] = useState(false);

  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());

  function addMonth() {
    let currentMonth = month.getMonth();
    let currentYear = year.getFullYear();
    let newMonth = new Date(currentYear, currentMonth + 1, 1);
    setMonth(newMonth);
  }

  function subtractMonth() {
    let currentMonth = month.getMonth();
    let currentYear = year.getFullYear();
    let newMonth = new Date(currentYear, currentMonth - 1, 1);
    setMonth(newMonth);
  }

  function addYear() {
    let currentYear = year.getFullYear();
    let newYear = new Date(currentYear + 1, 0, 1);
    setYear(newYear);
  }

  function subtractYear() {
    let currentYear = year.getFullYear();
    let newYear = new Date(currentYear - 1, 0, 1);
    setYear(newYear);
  }

  function addMonthOrYear() {
    if (isMonthView) {
      addMonth();
    } else if (isYearView) {
      addYear();
    }
  }

  function subtractMonthOrYear() {
    if (isMonthView) {
      subtractMonth();
    } else if (isYearView) {
      subtractYear();
    }
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        {/* <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">{format(new Date(), "LLLL yyyy")}</time>
        </h1> */}
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div
              className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
              aria-hidden="true"
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={() => {
                subtractMonthOrYear();
              }}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block hover:cursor-default"
            >
              {isMonthView && (
                <time dateTime="2022-01">{format(month, "LLLL yyyy")}</time>
              )}
              {isYearView && (
                <time dateTime="2022-01">{format(year, "yyyy")}</time>
              )}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={() => {
                addMonthOrYear();
              }}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {isMonthView && <span>Month view</span>}
                {isYearView && <span>Year view</span>}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full"
                          )}
                          onClick={() => {
                            setIsMonthView(true);
                            setIsYearView(false);
                          }}
                        >
                          Month view
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full"
                          )}
                          onClick={() => {
                            setIsMonthView(false);
                            setIsYearView(true);
                          }}
                        >
                          Year view
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setIsMonthView(true);
                          setIsYearView(false);
                        }}
                      >
                        Month view
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setIsMonthView(false);
                          setIsYearView(true);
                        }}
                      >
                        Year view
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      {isMonthView && (
        <CalendarViewMonth projects={projects} requirements={requirements} />
      )}
      {isYearView && (
        <CalendarViewYear
          projects={projects}
          requirements={requirements}
          year={year}
        />
      )}
    </div>
  );
};

export default CalendarHeader;
