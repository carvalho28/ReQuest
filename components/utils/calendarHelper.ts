import { Database } from "@/types/supabase";
import { classNames } from "./general";

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

  console.log("days in getRequirementsAsDays: ", days);

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
  const currentMonth = new Date().getMonth() + 1; // adding 1 to get the correct month number
  const todayDay = new Date().getDate();
  for (let i = 0; i < 12; i++) {
    const numDays = new Date(year, i + 1, 0).getDate(); // get number of days in month
    const month: MonthYear = {
      name: new Date(year, i).toLocaleString("en-US", { month: "long" }),
      days: [],
    };
    for (let j = 1; j <= numDays; j++) {
      // add isCurrentMonth to the days in the current month, and istoday to the day that is today
      const day: DaysYear = {
        id: `${year}-${i}-${j}`,
        name: `${j}`,
        date: `${year}-${i}-${j}`,
        isCurrentMonth: i === currentMonth - 1,
        isToday: i === currentMonth - 1 && j === todayDay,
        events: [],
        isSelected: false,
      };
      month.days.push(day);
    }
    months.push(month);
  }

  // add the projects to the days
  proj.forEach((project: any) => {
    const month = months[new Date(project.deadline).getMonth()];
    const day = month.days[new Date(project.deadline).getDate() - 1];
    day.events.push({
      id: project.id,
      name: project.name,
      isProject: true,
      date: project.deadline,
      href: "#",
    });
  });

  // add the requirements to the days
  req.forEach((requirement: any) => {
    const month = months[new Date(requirement.due_date).getMonth()];
    const day = month.days[new Date(requirement.due_date).getDate() - 1];
    day.events.push({
      id: requirement.id,
      name: requirement.name,
      isProject: false,
      priority: requirement.priority,
      date: requirement.due_date,
      href: "#",
    });
  });

  return months;
}

export { getProjectsAsDays, addRequirementsAsDays, getProjReqYear };
