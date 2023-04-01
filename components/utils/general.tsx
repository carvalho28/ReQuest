// render different badge depending on priority

import { RiCheckboxBlankCircleFill } from "react-icons/ri";

// name: "Req 1",
//       description: null,
//       due_date: null,
//       priority: "P1",
//       assigned_to: [],
//       status: "Completed",

export type ColumnsReq = {
  name: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  assigned_to: string[];
  status: string;
};

export type RowReq = {
  name: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  assigned_to: string[];
  status: string;
  id: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
};

function renderPriorityBadge(priority: string, sizex: number, sizey: number) {
  const p = priority.toLowerCase();
  if (p === "p1") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
        >
          P1
        </span>
      </div>
    );
  } else if (p === "p2") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-yellow-100 text-yellow-800`}
      >
        P2
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-green-100 text-green-800`}
      >
        P3
      </span>
    );
  }
}

function renderStatusBadge(status: string, sizex: number, sizey: number) {
  const s = status.toLowerCase();
  if (s === "not started") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
        >
          <RiCheckboxBlankCircleFill className="mr-1" />
          Not Started
        </span>
      </div>
    );
  } else if (s === "in progress") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-yellow-100 text-yellow-800`}
      >
        <RiCheckboxBlankCircleFill className="mr-1" />
        In Progress
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-green-100 text-green-800`}
      >
        <RiCheckboxBlankCircleFill className="mr-1" />
        Done
      </span>
    );
  }
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export { renderPriorityBadge, renderStatusBadge, classNames };
