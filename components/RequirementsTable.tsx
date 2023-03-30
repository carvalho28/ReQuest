import { renderPriorityBadge } from "@/components/utils/general";
import { Database } from "@/types/supabase";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

//dynamic import
const RequirementData = dynamic(() => import("./RequirementData"), {
  ssr: false,
});

interface RequirementsTableProps {
  name: string;
  projectUserNames: string[];
  projectId: string;
}

const RequirementsTable = ({
  name,
  projectUserNames,
  projectId,
}: RequirementsTableProps) => {
  const [requirements, setRequirements] = useState<
    Database["public"]["Tables"]["requirements"]["Row"][]
  >([]);
  const [descriptionOrder, setDescriptionOrder] = useState("");

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [requirement, setRequirement] = useState<
    Database["public"]["Tables"]["requirements"]["Row"]
  >({
    id: "0",
    name: "",
    description: "",
    due_date: new Date().toString(),
    priority: 0,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    updated_by: "",
    created_by: "",
    assigned_to: [],
    checked: 0,
    id_proj: projectId,
  });

  const [showReq, setShowReq] = useState(false);

  function toggleReq() {
    console.log("toggle");
    setShowReq(!showReq);
  }

  useEffect(() => {
    async function getRequirements() {
      const { data, error } = await supabaseClient
        .from("requirements")
        .select("*")
        .eq("id_proj", projectId);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      setRequirements(
        data as Database["public"]["Tables"]["requirements"]["Row"][]
      );
    }
    getRequirements();
    setDescriptionOrder("asc");
  }, [projectId, supabaseClient]);

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
      // const sorted = requirements.slice().sort((a, b) => {
      //   if (order === "asc") {
      //     if (a[column] < b[column]) {
      //       return -1;
      //     }
      //     if (a[column] > b[column]) {
      //       return 1;
      //     }
      //   } else {
      //     if (a[column] > b[column]) {
      //       return -1;
      //     }
      //     if (a[column] < b[column]) {
      //       return 1;
      //     }
      //   }
      //   return 0;
      // });
      // setRequirements(sorted);
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
                      {req.description
                        ? req.description.length > 25
                          ? req.description.substring(0, 25) + "..."
                          : req.description
                        : "No description"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {renderPriorityBadge(req.priority, 2.5, 0.5)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {req.due_date !== null
                        ? moment(req.due_date).format("DD/MM/YYYY")
                        : "No due date"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {req.assigned_to}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <label
                        htmlFor="my-modal-5"
                        onClick={() => {
                          setRequirement(req);
                        }}
                        className="btn text-contrast hover:text-contrasthover bg-transparent border-0 hover:bg-purple-200"
                      >
                        <span className="sr-only">Edit</span>
                        <ArrowUpRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </label>
                      {/* </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RequirementData
        name={name}
        requirement={requirement}
        projectUserNames={projectUserNames}
      />
    </div>
  );
};

export default RequirementsTable;
