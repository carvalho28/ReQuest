import {
  ArrowLongRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";

const RequirementsTable = () => {
  type Requirement = {
    id: number;
    name: string;
    description: string;
    due_date?: Date;
    priority: number;
    updated_at: Date;
    created_at: Date;
    edited_by: string;
    created_by: string;
    assigned_to: string;
    checked: boolean;
  };
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [descriptionOrder, setDescriptionOrder] = useState("");

  useEffect(() => {
    const reqs = [
      {
        id: 1,
        name: "Requirement 1",
        description: "bbbbbb",
        due_date: new Date("2021-10-01"),
        priority: 1,
        created_at: new Date("2021-10-01"),
        updated_at: new Date("2021-08-01"),
        edited_by: "John Doe",
        created_by: "John Doe",
        assigned_to: "John Doe",
        checked: false,
      },
      {
        id: 2,
        name: "Requirement 2",
        description: "aaaaa",
        due_date: new Date("2021-10-01"),
        priority: 1,
        created_at: new Date("2021-10-01"),
        updated_at: new Date("2021-08-01"),
        edited_by: "John Doe",
        created_by: "John Doe",
        assigned_to: "John Doe",
        checked: false,
      },
    ];
    setRequirements(reqs);
    setDescriptionOrder("asc");
  }, []);

  function sortByTitle(column: string, toggleOrder: boolean) {
    let order = descriptionOrder;

    if (toggleOrder) {
      order = order === "asc" ? "desc" : "asc";
      setDescriptionOrder(order);
    }

    if (
      column === "name" ||
      column === "description" ||
      column === "assigned_to"
    ) {
      const sorted = requirements.slice().sort((a, b) => {
        if (order === "asc") {
          if (a[column] < b[column]) {
            return -1;
          }
          if (a[column] > b[column]) {
            return 1;
          }
        } else {
          if (a[column] > b[column]) {
            return -1;
          }
          if (a[column] < b[column]) {
            return 1;
          }
        }
        return 0;
      });
      setRequirements(sorted);
    }
  }

  // render different badge depending on priority
  function renderPriorityBadge(priority: number) {
    if (priority === 1) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          High
        </span>
      );
    } else if (priority === 2) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Medium
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Low
        </span>
      );
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Requirements
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the requirements for this project.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add requirement
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <a className="group inline-flex">
                      Name
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a className="group inline-flex">
                      Description
                      <span
                        // alternate sorting
                        onClick={() => sortByTitle("description", true)}
                        className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"
                      >
                        {descriptionOrder === "asc" ? (
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Priority
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Due Date
                      <span
                        // onClick={() => sortByColumn(requirements, "id", "asc")}
                        className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Assigned To
                      <span
                        // onClick={() => sortByColumn(requirements, "id", "asc")}
                        className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requirements.map((req) => (
                  <tr key={req.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {req.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* limit 25 chars */}
                      {req.description.length > 25
                        ? req.description.substring(0, 25) + "..."
                        : req.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {renderPriorityBadge(req.priority)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* {req.due_date.getDate() +
                        "/" +
                        req.due_date.getMonth() +
                        "/" +
                        req.due_date.getFullYear()} */}
                      {req.due_date !== null
                        ? moment(req.due_date).format("DD/MM/YYYY")
                        : "No due date"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {req.assigned_to}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <button
                        type="button"
                        className="text-contrast hover:text-contrasthover"
                      >
                        <span className="sr-only">Edit</span>
                        <ArrowUpRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsTable;
