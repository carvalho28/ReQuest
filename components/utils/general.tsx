// render different badge depending on priority

import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

export type Requirement = {
  id: number;
  name: string;
  description: string;
  due_date: Date;
  priority: number;
  updated_at: Date;
  updated_by: string;
  created_at: Date;
  created_by: string;
  assigned_to: string;
  checked: number;
};

export class DefaultRequirement implements Requirement {
  id = 0;
  name = "";
  description = "";
  due_date = new Date();
  priority = 0;
  updated_at = new Date();
  updated_by = "";
  created_at = new Date();
  created_by = "";
  assigned_to = "";
  checked = 0;

  constructor() {}
}

function renderPriorityBadge(priority: number, sizex: number, sizey: number) {
  if (priority === 1) {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
        >
          P1
        </span>
      </div>
    );
  } else if (priority === 2) {
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

function renderStatusBadge(status: number, sizex: number, sizey: number) {
  if (status === 1) {
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
  } else if (status === 2) {
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

export { renderPriorityBadge, renderStatusBadge };
