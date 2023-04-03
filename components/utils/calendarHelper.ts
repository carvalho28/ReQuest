import { Database } from "@/types/supabase";

// const days = [
//   { date: "2021-12-27", events: [] },
//   { date: "2021-12-28", events: [] },
//   { date: "2021-12-29", events: [] },
//   { date: "2021-12-30", events: [] },
//   { date: "2021-12-31", events: [] },
//   { date: "2022-01-01", isCurrentMonth: true, events: [] },
//   { date: "2022-01-02", isCurrentMonth: true, events: [] },
//   {
//     date: "2022-01-03",
//     isCurrentMonth: true,
//     events: [
//       {
//         id: 1,
//         name: "Design review",
//         time: "10AM",
//         datetime: "2022-01-03T10:00",
//         href: "#",
//       },
//       {
//         id: 2,
//         name: "Sales meeting",
//         time: "2PM",
//         datetime: "2022-01-03T14:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-04", isCurrentMonth: true, events: [] },
//   { date: "2022-01-05", isCurrentMonth: true, events: [] },
//   { date: "2022-01-06", isCurrentMonth: true, events: [] },
//   {
//     date: "2022-01-07",
//     isCurrentMonth: true,
//     events: [
//       {
//         id: 3,
//         name: "Date night",
//         time: "6PM",
//         datetime: "2022-01-08T18:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-08", isCurrentMonth: true, events: [] },
//   { date: "2022-01-09", isCurrentMonth: true, events: [] },
//   { date: "2022-01-10", isCurrentMonth: true, events: [] },
//   { date: "2022-01-11", isCurrentMonth: true, events: [] },
//   {
//     date: "2022-01-12",
//     isCurrentMonth: true,
//     isToday: true,
//     events: [
//       {
//         id: 6,
//         name: "Sam's birthday party",
//         time: "2PM",
//         datetime: "2022-01-25T14:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-13", isCurrentMonth: true, events: [] },
//   { date: "2022-01-14", isCurrentMonth: true, events: [] },
//   { date: "2022-01-15", isCurrentMonth: true, events: [] },
//   { date: "2022-01-16", isCurrentMonth: true, events: [] },
//   { date: "2022-01-17", isCurrentMonth: true, events: [] },
//   { date: "2022-01-18", isCurrentMonth: true, events: [] },
//   { date: "2022-01-19", isCurrentMonth: true, events: [] },
//   { date: "2022-01-20", isCurrentMonth: true, events: [] },
//   { date: "2022-01-21", isCurrentMonth: true, events: [] },
//   {
//     date: "2022-01-22",
//     isCurrentMonth: true,
//     isSelected: true,
//     events: [
//       {
//         id: 4,
//         name: "Maple syrup museum",
//         time: "3PM",
//         datetime: "2022-01-22T15:00",
//         href: "#",
//       },
//       {
//         id: 5,
//         name: "Hockey game",
//         time: "7PM",
//         datetime: "2022-01-22T19:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-23", isCurrentMonth: true, events: [] },
//   { date: "2022-01-24", isCurrentMonth: true, events: [] },
//   { date: "2022-01-25", isCurrentMonth: true, events: [] },
//   { date: "2022-01-26", isCurrentMonth: true, events: [] },
//   { date: "2022-01-27", isCurrentMonth: true, events: [] },
//   { date: "2022-01-28", isCurrentMonth: true, events: [] },
//   { date: "2022-01-29", isCurrentMonth: true, events: [] },
//   { date: "2022-01-30", isCurrentMonth: true, events: [] },
//   { date: "2022-01-31", isCurrentMonth: true, events: [] },
//   { date: "2022-02-01", events: [] },
//   { date: "2022-02-02", events: [] },
//   {
//     date: "2022-02-03",
//     events: [
//       {
//         id: 7,
//         name: "Cinema with friends",
//         time: "9PM",
//         datetime: "2022-02-04T21:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-02-04", events: [] },
//   { date: "2022-02-05", events: [] },
//   { date: "2022-02-06", events: [] },
// ];

// [
//     {
//       id: 'dd06e9a6-7346-4f6d-9a1b-4ef5ba195cd2',
//       name: 'Projeto SO',
//       description: 'Tiny web server.',
//       status: 'Active',
//       deadline: '2023-03-30T00:00:00+00:00'
//     },
//     {
//       id: '200d20db-9526-4d27-bf54-52c31bba8acd',
//       name: 'Diogo',
//       description: 'dfgdfsgsdf',
//       status: 'Active',
//       deadline: '2023-03-29T00:00:00+00:00'
//     }
//   ]

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
  }>;
};

// write a function that returns the projects in the form of the days array
function getProjectsAsDays(
  projects: Database["public"]["Tables"]["projects"]["Row"][]
) {
  console.log(projects);
  // get how many days are in the current month
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

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
  const daysInNextMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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

  console.log("after adding projects: ", days);

  return days;
}

export { getProjectsAsDays };
