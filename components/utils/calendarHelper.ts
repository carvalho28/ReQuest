import { Database } from "@/types/supabase";
import { classNames } from "./general";
import moment from "moment";

export type Days = {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Array<{
    id: number;
    name: string;
    time: string;
    datetime: string;
    href: string;
    isProject?: boolean;
    priority?: string;
  }>;
};

// write a function that returns the projects in the form of the days array
function getProjectsAsDays(
  projects: Database["public"]["Tables"]["projects"]["Row"][]
) {
  // create an array with the month, having some days of the previous month and some days of the next month, isCurrentMonth = false and Events = []
  const days: Array<{
    date: string;
    isCurrentMonth: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    events: Array<{
      id: number;
      name: string;
      time: string;
      datetime: string;
      href: string;
      isProject?: boolean;
      priority?: string;
    }>;
  }> = [];

  // define the current month and year
  const currentMonth = new Date().getMonth() + 1; // adding 1 to get the correct month number
  const currentYear = new Date().getFullYear();

  // define the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

  // define the number of days in the previous and next months
  const daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

  // define the number of days to show from the previous and next months
  const daysToShowFromPrevMonth =
    firstDayOfMonth !== 0 ? firstDayOfMonth - 1 : 6; // adjust for Sunday being 0
  const daysToShowFromNextMonth =
    7 - ((daysToShowFromPrevMonth + daysInCurrentMonth) % 7);

  // create the array
  for (
    let i = daysInPrevMonth - daysToShowFromPrevMonth + 1;
    i <= daysInPrevMonth;
    i++
  ) {
    days.push({
      date: `${currentYear}-${(currentMonth - 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`,
      isCurrentMonth: false,
      isSelected: false,
      events: [],
    });
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push({
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`,
      isCurrentMonth: true,
      isSelected: false,
      events: [],
    });
  }

  for (let i = 1; i <= daysToShowFromNextMonth; i++) {
    days.push({
      date: `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`,
      isCurrentMonth: false,
      isSelected: false,
      events: [],
    });
  }

  // for each project, add to days events the project in the form of an event where id = project.id, name = project.name, time = project.deadline time, datetime = project.deadline, href = "#"
  projects.forEach((project: any) => {
    const day = days.find((day) => day.date === project.deadline.split("T")[0]);
    if (day) {
      day.events.push({
        id: project.id,
        name: project.name,
        time: new Date(project.deadline).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        // 2023-03-29T00:00:00+00:00 -> 2023-03-29T00:00
        datetime: project.deadline.substring(0, 16),
        isProject: true,
        href: "#",
      });
    }
  });
  // add isSelected = true to the day that is today
  const today = days.find(
    (day) => day.date === new Date().toISOString().split("T")[0]
  );
  if (today) {
    today.isToday = true;
  }

  return days;
}

function addRequirementsAsDays(
  requirements: Database["public"]["Tables"]["requirements"]["Row"][],
  days: Days[]
) {
  console.log(requirements);
  console.log(days);

  requirements.forEach((requirement: any) => {
    const day = days.find(
      (day) => day.date === requirement.due_date.split("T")[0]
    );
    if (day) {
      day.events.push({
        id: requirement.id,
        name: requirement.name,
        time: new Date(requirement.due_date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        isProject: false,
        priority: requirement.priority,
        // 2023-03-29T00:00:00+00:00 -> 2023-03-29T00:00
        datetime: requirement.due_date.substring(0, 16),
        href: "#",
      });
    }
  });

  return days;
}

export type DaysYear = {
  id: string;
  name: string;
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Array<{
    id: string;
    name: string;
    isProject: boolean;
    priority?: string;
    date: string;
    href: string;
  }>;
};

export type MonthYear = {
  name: string;
  days: DaysYear[];
};

// convert the requirements and projects into days
function getProjReqYear(
  proj: Database["public"]["Tables"]["projects"]["Row"][],
  req: Database["public"]["Tables"]["requirements"]["Row"][],
  year: number
) {
  const months: MonthYear[] = [];
  const currentMonth = new Date().getMonth();
  const todayDay = new Date().getDate();
  for (let i = 0; i < 12; i++) {
    const numDays = new Date(year, i + 1, 0).getDate(); // get number of days in month
    const firstDayOfMonth = new Date(year, i, 1).getDay(); // get the day of the week the month starts on
    const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // get the number of days to display from the previous month
    const daysFromNextMonth = 42 - (numDays + daysFromPrevMonth); // get the number of days to display from the next month
    const month: MonthYear = {
      name: new Date(year, i).toLocaleString("en-US", { month: "long" }),
      days: [],
    };
    // add days from previous month
    for (let j = daysFromPrevMonth; j > 0; j--) {
      const prevMonth = i === 0 ? 11 : i - 1;
      const prevMonthYear = i === 0 ? year - 1 : year;
      const numDaysPrevMonth = new Date(
        prevMonthYear,
        prevMonth + 1,
        0
      ).getDate();
      const day: DaysYear = {
        id: `${prevMonthYear}-${prevMonth}-${numDaysPrevMonth - j + 1}`,
        name: `${numDaysPrevMonth - j + 1}`,
        date: `${prevMonthYear}-${prevMonth}-${numDaysPrevMonth - j + 1}`,
        isCurrentMonth: false,
        isToday: false,
        events: [],
        isSelected: false,
      };
      month.days.push(day);
    }
    // add days from current month
    for (let j = 1; j <= numDays; j++) {
      const day: DaysYear = {
        id: `${year}-${i}-${j}`,
        name: `${j}`,
        date: `${year}-${i}-${j}`,
        isCurrentMonth: true,
        // if the day is today, add the isToday class to the day if year is the current year
        isToday:
          i === currentMonth &&
          j === todayDay &&
          year === new Date().getFullYear(),
        events: [],
        isSelected: false,
      };
      month.days.push(day);
    }
    // add days from next month
    for (let j = 1; j <= daysFromNextMonth; j++) {
      const nextMonth = i === 11 ? 0 : i + 1;
      const nextMonthYear = i === 11 ? year + 1 : year;
      const day: DaysYear = {
        id: `${nextMonthYear}-${nextMonth}-${j}`,
        name: `${j}`,
        date: `${nextMonthYear}-${nextMonth}-${j}`,
        isCurrentMonth: false,
        isToday: false,
        events: [],
        isSelected: false,
      };
      month.days.push(day);
    }
    months.push(month);
  }

  console.log(months);

  // add projects to days if they are in the same year, month, and day
  proj.forEach((project: any) => {
    const date = new Date(project.deadline);
    if (date.getFullYear() === year) {
      const month = months.find(
        (month) =>
          month.name === date.toLocaleString("en-US", { month: "long" })
      );
      if (month) {
        const day = month.days.find(
          (day) => day.name === date.toLocaleString("en-US", { day: "2-digit" })
        );
        if (day) {
          day.events.push({
            id: project.id,
            name: project.name,
            isProject: true,
            date: project.deadline,
            href: "#",
          });
        }
      }
    }
  });

  // add requirements to days if they are in the same year, month, and day
  req.forEach((requirement: any) => {
    const date = new Date(requirement.due_date);
    console.log(date.getFullYear());
    console.log(year);

    if (date.getFullYear() === year) {
      const month = months.find(
        (month) =>
          month.name === date.toLocaleString("en-US", { month: "long" })
      );
      if (month) {
        const day = month.days.find(
          (day) => day.name === date.toLocaleString("en-US", { day: "2-digit" })
        );
        if (day) {
          day.events.push({
            id: requirement.id,
            priority: requirement.priority,
            name: requirement.name,
            isProject: false,
            date: requirement.due_date,
            href: "#",
          });
        }
      }
    }
  });

  return months;
}

export { getProjectsAsDays, addRequirementsAsDays, getProjReqYear };
