import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  usePagination,
  useSortBy,
  Column,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowLeftCircleFill,
  RiArrowRightCircleFill,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiCheckboxBlankCircleFill,
  RiCloseLine,
  RiDeleteRow,
  RiDownloadLine,
  RiRobotLine,
} from "react-icons/ri";
import { DOTS, useCustomPagination } from "./CustomPagination";
import "regenerator-runtime/runtime";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  ColumnsReq,
  RowReq,
  UserIdAndName,
  classNames,
  renderTypeBadge,
} from "./utils/general";
import { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RequirementData from "./RequirementData";
import { RealtimeChannel } from "@supabase/supabase-js";
import { CSVLink } from "react-csv";
import Stepper from "./Stepper";
import { XMarkIcon } from "@heroicons/react/20/solid";

// dynamic imports
import dynamic from "next/dynamic";
import Dropdown from "./Dropdown";
import supabase from "@/utils/supabaseClient";
import Loading from "./Loading";
const ErrorMessage = dynamic(() => import("@/components/ErrorMessage"), {
  ssr: false,
});

export function PriorityProject({ value }: any) {
  const status = typeof value === "string" ? value.toLowerCase() : "p3";

  return (
    <span
      className={classNames(
        status === "p1"
          ? "bg-red-100 text-red-700"
          : status === "p2"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700",
        "px-2 md:px-3 py-1 md:uppercase capitalize leading-wide font-bold text-xs rounded-full shadow-sm"
      )}
    >
      {status}
    </span>
  );
}

export function StatusProject({ value }: any) {
  const status =
    typeof value === "string" ? value.toLowerCase() : "not started";

  return (
    <span
      className={classNames(
        "px-2 md:px-3 py-1 md:uppercase capitalize leading-wide font-bold text-xs rounded-full shadow-sm inline-flex items-center",
        status.startsWith("completed") ? "bg-green-100 text-green-700" : null,
        status.startsWith("in progress")
          ? "bg-yellow-100 text-yellow-700"
          : null,
        status.startsWith("not started") ? "bg-red-100 text-red-700" : null
      )}
    >
      <RiCheckboxBlankCircleFill className="mr-1" />
      {status}
    </span>
  );
}

export function DueDateProject({ value }: any) {
  if (value) {
    return (
      <span className="text-md text-black" title={value}>
        {value.substring(0, 10)}
      </span>
    );
  } else {
    return (
      <div>
        <span className="italic text-sm text-gray-400">No due date</span>
      </div>
    );
  }
}

function getUserNamesFromIds(ids: string[], projectUserIdsAndNames: any) {
  const names: string[] = [];
  if (ids === null || ids.length === 0) return null;
  ids.forEach((id) => {
    const name = projectUserIdsAndNames.find((user: any) => user.id === id);
    if (name) names.push(name.name);
  });
  return names;
}

export function AssignedToProject({ value }: any) {
  if (value && value.length > 0) {
    const users = value.map((user: string) => (
      <span
        key={user}
        className="text-md text-black flex flex-row items-center"
        title={user}
      >
        <RiArrowRightSLine className="mr-1" />
        {user}
      </span>
    ));

    return <div className="flex flex-col justify-center">{users}</div>;
  } else {
    return <span className="italic text-sm text-gray-400">Not assigned</span>;
  }
}

export function NameProject({ value, row, setRequirement }: any) {
  const handleCellClick = (requirement: any) => {
    setRequirement(requirement);
  };

  if (value) {
    return (
      <span>
        {/* {value} */}
        {/* if more than 20 chars, add ... */}
        {value.length > 30 ? value.substring(0, 30) + "..." : value}
        <label
          htmlFor="my-modal-5"
          onClick={() => handleCellClick(row.original)}
          className="btn text-contrast hover:text-contrasthover bg-transparent border-0 hover:bg-purple-200"
        >
          <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
        </label>
      </span>
    );
  } else {
    return <span className="italic text-sm text-gray-400">No name</span>;
  }
}

export function IdentifierProject({ value }: any) {
  if (value) {
    return <span>{value}</span>;
  } else {
    <></>;
  }
}

function createNewRequirement(handleClickPopup: any) {
  handleClickPopup();
}

async function deleteRequirement(selectedFlatRows: any) {
  let ids: string[] = [];
  selectedFlatRows.forEach((row: any) => {
    ids.push(row.original.id);
  });

  // alert asking if user is sure they want to delete
  const confirmDelete = confirm(
    "Are you sure you want to delete these requirements?"
  );
  if (!confirmDelete) return;
  // use supabase to delete all the rows in ids
  const { error } = await supabase
    .from("requirements")
    .delete()
    .match({ id: ids });

  if (error) return;
}

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  placeholder,
  requirements,
  handleClickPopup,
  selectedFlatRows,
}: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex flex-row items-center justify-center w-full pt-20 pb-2">
      {/* button to create new requirement */}
      <div className="flex items-center">
        {selectedFlatRows.length !== 0 && (
          <button
            onClick={() => deleteRequirement(selectedFlatRows)}
            className="btn text-white hover:text-red-400 bg-red-500 border-0 hover:bg-red-200 truncate mr-4"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => createNewRequirement(handleClickPopup)}
          className="btn text-whitepages hover:text-contrasthover bg-contrast border-0 hover:bg-purple-200 truncate"
        >
          <RiAddLine className="h-5 w-5" aria-hidden="true" />
          Requirement
        </button>
      </div>
      <div className="flex items-center w-full">
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className="mx-auto lg:w-4/12 w-2/4 rounded-xl border p-3 text-gray-500 cursor-pointer"
          type="search"
          placeholder="🔎   Search..."
        />
      </div>
      <div className="flex items-end">
        <>
          <CSVLink
            data={requirements}
            filename={"requirements.csv"}
            className="btn text-contrast hover:text-contrasthover bg-transparent border-0 hover:bg-purple-200"
          >
            {/* download to excel icon */}
            <RiDownloadLine
              className="h-5 w-5"
              aria-hidden="true"
              title="Download to Excel"
            />
          </CSVLink>
        </>
      </div>
    </div>
  );
}

type Step = {
  id: string;
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
};

const steps: Step[] = [
  { id: "01", name: "Name", href: "#", status: "current" },
  { id: "02", name: "Due date", href: "#", status: "upcoming" },
  { id: "03", name: "Type", href: "#", status: "upcoming" },
];

const steps2: Step[] = [
  { id: "01", name: "Description", href: "#", status: "current" },
  { id: "02", name: "Type", href: "#", status: "upcoming" },
  { id: "03", name: "Generated Requirements", href: "#", status: "upcoming" },
];

type genReq = {
  name: string;
  id_proj: string;
  created_by: string;
  updated_by: string;
  due_date: string;
  type: string;
};

interface RequirementsTableProps {
  userId: string;
  name: string;
  projectUserIdsAndNames: UserIdAndName[];
  projectId: string;
}

function Table({
  userId,
  name,
  projectUserIdsAndNames,
  projectId,
}: RequirementsTableProps) {
  const [requirements, setRequirements] = useState<
    Database["public"]["Tables"]["requirements"]["Row"][]
  >([]);
  const [requirement, setRequirement] =
    useState<Database["public"]["Tables"]["requirements"]["Row"]>();

  const [showPopup, setShowPopup] = useState(false);
  const [showsPopupAIHelper, setShowsPopupAIHelper] = useState(false);

  // requirements properties for creating new requirement
  const [requirementName, setRequirementName] = useState("");
  const [requirementProjectId, setRequirementProjectId] = useState(projectId);

  const [requirementCreatedBy, setRequirementUpdatedBy] = useState(userId);
  const [requirementUpdatedBy, setRequirementCreatedBy] = useState(userId);
  const [requirementDueDate, setRequirementDueDate] = useState("");

  const [projectDesc, setProjectDesc] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideAI, setCurrentSlideAI] = useState(0);

  const [generatedReq, setGeneratedReq] = useState<genReq[]>([]);
  const [showLoadingGenAI, setShowLoadingGenAI] = useState(true);

  const deleteRequirementGenerated = (index: number) => {
    let temp = [...generatedReq];
    temp.splice(index, 1);
    setGeneratedReq(temp);
  };

  function handleClickPopup(cross?: boolean) {
    if (cross) {
      clearSteps();
    }
    setShowPopup(!showPopup);
  }

  function handleAIPopup() {
    setShowPopup(false);
    setShowsPopupAIHelper(!showsPopupAIHelper);
    if (currentSlideAI === 2) {
      clearStepsAI();
    }
    setTimeout(adjustTextareaHeight, 10); // Adjust the textarea height after a small delay
  }

  const clearSteps = () => {
    steps.forEach((step) => (step.status = "upcoming"));
    steps[0].status = "current";
    setCurrentSlide(0);
  };

  const clearStepsAI = () => {
    steps2.forEach((step) => (step.status = "upcoming"));
    steps2[0].status = "current";
    setCurrentSlideAI(0);
  };

  const handleLeftArrow = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
    steps[currentSlide].status = "upcoming";
    steps[currentSlide === 0 ? 2 : currentSlide - 1].status = "current";
  };

  const handleLeftArrowAI = () => {
    setCurrentSlideAI(currentSlideAI === 0 ? 1 : currentSlideAI - 1);
    steps2[currentSlideAI].status = "upcoming";
    steps2[currentSlideAI === 0 ? 1 : currentSlideAI - 1].status = "current";
  };

  const handleRightArrow = () => {
    if (requirementName === "" || requirementName == undefined) {
      setErrorMessage("Please enter a name for the requirement");
      setError(true);
      return;
    }
    if (currentSlide === 0) {
      isFunctional();
    }

    if (currentSlide === 1) {
      if (requirementDueDate === "" || requirementDueDate == undefined) {
        setErrorMessage("Please enter a due date for the requirement");
        setError(true);
        return;
      }
    }

    steps[currentSlide].status = "complete";
    steps[currentSlide === 2 ? 0 : currentSlide + 1].status = "current";
    setError(false);
    setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
  };

  const handleRightArrowAI = () => {
    if (projectDesc === "" || projectDesc == undefined) {
      setErrorMessage("Please enter a description");
      setError(true);
      return;
    }

    if (currentSlideAI == 0) {
      // save description in the database
      const updateProjectDesc = async () => { 
        const {error} = await supabaseClient
        .from("projects")
        .update({ description: projectDesc })
        .eq("id", projectId);
        if (error) {
          console.log(error);
        }
      }
      updateProjectDesc();
    }

    if (currentSlideAI === 1) {
      generateRequirements();
    }

    if (currentSlideAI === 2) {
      if (generatedReq.length === 0) {
        setErrorMessage("Please generate requirements");
        setError(true);
        return;
      }
    }

    steps2[currentSlideAI].status = "complete";
    steps2[currentSlideAI === 2 ? 0 : currentSlideAI + 1].status = "current";
    setCurrentSlideAI(currentSlideAI === 2 ? 0 : currentSlideAI + 1);
  };

  async function addGeneratedRequirements() {
    console.log("adding generated requirements");
    // if requirement does not have a due date, show error
    const hasEmptyDueDate = generatedReq.some((req) => req.due_date === "");
    if (hasEmptyDueDate) {
      console.log("has empty due date");
      setErrorMessage("Please enter a due date for the requirement");
      setError(true);
      return;
    }
    setErrorMessage("");
    setError(false);

    // add requirements to database
    const { data, error } = await supabaseClient
      .from("requirements")
      .insert(generatedReq)
      .select("id");

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }

    // clear generated requirements
    setGeneratedReq([]);
    handleAIPopup();
  }

  async function btnCreateNewRequirement() {
    const { data, error } = await supabaseClient
      .from("requirements")
      .insert([
        {
          name: requirementName,
          id_proj: requirementProjectId,
          created_by: requirementCreatedBy,
          updated_by: requirementUpdatedBy,
          due_date: requirementDueDate,
          type: requirementType,
        },
      ])
      .select("id");

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }

    handleClickPopup();
    clearSteps();
    setRequirementName("");
    setRequirementDueDate("");
    setRequirementType("");
    setRequirementTypeAI("");
  }

  useEffect(() => {
    console.log(showPopup);
  }, [showPopup]);

  const columns: Column<ColumnsReq>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "identifier",
        Cell: IdentifierProject as any,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }: any) => (
          <NameProject
            value={value}
            row={row}
            setRequirement={setRequirement}
          />
        ),
      },
      {
        Header: "Due Date",
        accessor: "due_date",
        Cell: DueDateProject,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusProject,
      },
      {
        Header: "Priority",
        accessor: "priority",
        Cell: PriorityProject,
      },
      {
        Header: "Assigned To",
        accessor: "assigned_to",
        Cell: ({ value }: any) => (
          <AssignedToProject
            value={getUserNamesFromIds(value, projectUserIdsAndNames)}
          />
        ),
      },
    ],
    []
  );
  const [data, setData] = useState<RowReq[]>([]);

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    let req_channel2: RealtimeChannel;
    async function getRequirements() {
      const { data, error } = await supabaseClient
        .from("requirements")
        .select(
          `
            id,
            id_proj,
            name,
            description,
            due_date,            
            priority,
            created_at,
            created_by (id, name),
            updated_at,
            updated_by (id, name),
            assigned_to,
            status,
            closed_at,
            closed_by,
            type,
            identifier
          `
        )

        .order("created_at", { ascending: false })
        .eq("id_proj", projectId);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      // destructuring the data for the created_by and updated_by fields
      data?.map((req: any) => {
        req.created_by = req.created_by.id as string;
        req.updated_by = req.updated_by.id as string;
      });

      // if there is property of created_by and updated_by, then set the data
      setRequirements(
        // data as Database["public"]["Tables"]["requirements"]["Row"][]
        data as any
      );

      setData(
        data.map((req: any) => {
          return {
            name: req.name,
            description: req.description,
            due_date: req.due_date,
            status: req.status,
            priority: req.priority,
            assigned_to: req.assigned_to,
            id: req.id,
            id_proj: req.id_proj,
            created_at: req.created_at,
            created_by: req.created_by,
            updated_at: req.updated_at,
            updated_by: req.updated_by,
            type: req.type,
            identifier: req.identifier,
          };
        })
      );
    }

    async function getProjectsRealTime() {
      req_channel2 = supabaseClient
        .channel("reqs_load2")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requirements",
          },
          async (payload: any) => {
            console.log(payload);
            getRequirements();
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(req_channel2);
      };
    }
    // update description realtime
    let req_channel_desc: RealtimeChannel;
    async function getDescRealTime() {
      req_channel_desc = supabaseClient
        .channel("desc_load")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "projects",
          },
          async (payload: any) => {
            setProjectDesc(payload.new.description);
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(req_channel_desc);
      };
    }
    getRequirements();
    getProjectsRealTime();
    getDescRealTime();
  }, [supabaseClient, projectId]);

  // get projectDesc on Load
  useEffect(() => {
    async function getProjectDesc() {
      const { data, error } = await supabaseClient
        .from("projects")
        .select("description")
        .eq("id", projectId);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      setProjectDesc(data[0].description);
    }
    getProjectDesc();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowSelectColumn
  );

  const { pageIndex } = state;
  const paginationRange = useCustomPagination({
    totalPageCount: pageCount,
    currentPage: pageIndex,
  }); //new

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]); //set according to your preferrence

  const [requirementType, setRequirementType] = useState<undefined | string>(
    "functional"
  );
  const [requirementTypeAI, setRequirementTypeAI] = useState<
    undefined | string
  >("functional");

  const [requirementChoiceAI, setRequirementChoiceAI] = useState<
    undefined | string
  >("functional");

  // call api to verify functional/non-functional
  async function isFunctional() {
    const requirement = requirementName;
    const reqBody = JSON.stringify({ requirement });
    console.log(reqBody);

    try {
      const response = await fetch(
        "https://morning-flower-3545.fly.dev/api/ai/functional",
        // "http://localhost:8080/api/ai/functional",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqBody,
        }
      );

      // if there was an error, then return
      if (!response.ok) {
        setErrorMessage("There was an error");
        setError(true);
        setShowLoadingGenAI(false);
        return;
      }
      const data = await response.json();
      let answer = data.answer;
      console.log(answer);

      // remove the . in the end
      answer = answer.replace(".", "");

      setRequirementType(answer || "functional");
      setRequirementTypeAI(answer || "functional");
    } catch (err) {
      setErrorMessage("There was an error");
      setError(true);
      console.log(err);
      return;
    }
  }

  async function generateRequirements() {
    const description = projectDesc;
    const type = requirementChoiceAI;
    let typeRoute: string = "";
    const reqBody = JSON.stringify({ description });

    if (type?.toLowerCase() === "functional") {
      typeRoute = "functional";
    } else {
      typeRoute = "nonfunctional";
    }

    try {
      const response = await fetch(
        // "http://localhost:8080/api/ai/create/" + typeRoute,
        "https://morning-flower-3545.fly.dev/api/ai/create/" + typeRoute,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqBody,
        }
      );

      // if there was an error, then return
      if (!response.ok) {
        setErrorMessage("There was an error");
        setError(true);
        return;
      }
      const data = await response.json();
      let answer = data.answer;
      console.log(answer);
      setShowLoadingGenAI(false);
      setGeneratedReq(
        answer.map((req: any) => {
          return {
            name: req,
            id_proj: projectId,
            due_date: "",
            created_by: userId,
            updated_by: userId,
            type: type,
          };
        })
      );
    } catch (err) {
      setErrorMessage("There was an error");
      setError(true);
      console.log(err);
      return;
    }
  }

  function adjustTextareaHeight() {
    const textarea = document.getElementById("desc");
    if (textarea) {
      console.log("here");
      textarea.style.height = "auto"; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    }
  }

  // Render the UI for your table and the styles
  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border-gray-200 sm:rounded-lg">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              requirements={requirements}
              handleClickPopup={handleClickPopup}
              handleAIPopup={handleAIPopup}
              selectedFlatRows={selectedFlatRows}
            />
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200 shadow-md bg-white"
            >
              <thead className="bg-gray-10">
                {headerGroups.map((headerGroup: any, i: number) => (
                  <tr
                    key={`header-group-${i}`}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column: any, j: number) => (
                      <th
                        key={`header-${i}-${j}`}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="md:px-5 px-2 py-5 text-medium md:text-left md:text-[16px] font-medium text-gray-400 uppercase rounded-sm tracking-wider text-xs"
                      >
                        <span className="flex flex-row items-center">
                          {column.render("Header")}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <RiArrowDownSLine className="ml-1" size={25} />
                            ) : (
                              <RiArrowUpSLine className="ml-1" size={25} />
                            )
                          ) : (
                            ""
                          )}
                          {column.id === "selection" &&
                            column.render("Summary")}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {page.map((row: any, i: number) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={`row-${i}`}>
                      {row.cells.map((cell: any, j: number) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={`cell-${i}-${j}`}
                            className="md:px-5 px-2 py-4 whitespace-nowrap truncate text-sm md:text-[16px]"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* pagination */}
            <div className="py-1 flex items-center text-center justify-center pt-10">
              <div className="flex-1 flex justify-between md:hidden">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>
              </div>
            </div>
            <div
              className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between mb-4"
              aria-label="Pagination"
            >
              <div
                className="relative z-0 inline-flex items-center ml-auto mr-auto shadow-lg space-x-6 bg-gray-100 p-2 rounded-lg"
                aria-label="Pagination"
              >
                {paginationRange?.map((pageNumber, index) => {
                  if (pageNumber === DOTS) {
                    return <div key={index}>...</div>;
                  }

                  if (pageNumber - 1 === pageIndex) {
                    return (
                      <div
                        key={index}
                        className=" bg-contrast text-white border-gray-300 p-2 rounded-md"
                        onClick={() => gotoPage(pageNumber - 1)}
                      >
                        {pageNumber}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="hover:bg-contrast hover:text-white hover:border-gray-300 hover:rounded-md cursor-pointer p-2"
                      onClick={() => gotoPage(pageNumber - 1)}
                    >
                      {pageNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {requirement && (
        <RequirementData
          userId={userId}
          name={name}
          requirement={requirement}
          projectUserIdsAndNames={projectUserIdsAndNames}
        />
      )}
      {showPopup && (
        // popup
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block bg-neutral-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle w-6/12">
              <div className="px-4 pt-4 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="md:text-left text-center">
                    <h3
                      className="text-2xl text-black font-semibold text-center"
                      id="modal-headline"
                    >
                      New Requirement
                    </h3>
                  </div>
                  {/* name */}

                  <div className="px-5 pt-5 text-center items-center flex justify-center flex-grow">
                    <Stepper steps={steps} />
                  </div>

                  <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
                    onClick={() => handleClickPopup()}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <div className="carousel-container mt-8 md:text-left text-center flex-col space-y-2 w-full">
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className={classNames(
                          error ? "mb-2" : "mb-0",
                          "w-80 md:w-96"
                        )}
                      >
                        {error && <ErrorMessage message={errorMessage} />}
                      </div>
                      <div
                        className={`carousel-slide ${
                          currentSlide === 0 ? "active" : "hidden"
                        }`}
                      >
                        <label
                          htmlFor="name"
                          className="block text-md font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <textarea
                            // type="text"
                            name="name"
                            rows={5}
                            id="name"
                            required
                            className="shadow-sm focus:ring-contrat
                            focus:border-contrast block w-80 md:w-96 sm:text-sm 
                            border-gray-300 rounded-md h-20"
                            onChange={(e) => setRequirementName(e.target.value)}
                          />
                        </div>

                        {/* unure how to start ? Press here */}
                        <div className="flex justify-center items-center mt-8">
                          <button
                            className="text-sm text-white hover:text-gray-800 
                            bg-primarygreen p-2 rounded-lg"
                            onClick={() => handleAIPopup()}
                          >
                            Unsure how to start?
                          </button>
                        </div>
                      </div>

                      <div
                        className={`carousel-slide ${
                          currentSlide === 1 ? "active" : "hidden"
                        }`}
                      >
                        <label
                          htmlFor="deadline"
                          className="block text-md font-medium text-gray-700"
                        >
                          Due date
                        </label>
                        <div className="mt-1">
                          <input
                            min={new Date().toISOString().split("T")[0]}
                            type="date"
                            name="deadline"
                            id="deadline"
                            className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) =>
                              setRequirementDueDate(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div
                        className={`carousel-slide ${
                          currentSlide === 2 ? "active" : "hidden"
                        }`}
                      >
                        {/*  show requirement type */}
                        <div className="m-4 pl-2 w-8/12 text-justify items-center flex flex-col mx-auto">
                          {requirementType !== undefined && (
                            <>
                              <div className="chat chat-start">
                                <div
                                  className="chat chat-bubble chat-bubble-primary text-black"
                                  data-theme="mytheme2"
                                >
                                  Base on our AI, your requirement is most
                                  likely to be a{" "}
                                  <span className="font-bold text-xl">
                                    {requirementTypeAI}
                                  </span>{" "}
                                  requirement.
                                  <br />
                                  However, you can use the dropdown below to
                                  change it.
                                </div>
                                {/* render an alien icon*/}
                                <div>
                                  <RiRobotLine className="h-24 w-24 -mt-12 text-primaryblue" />
                                </div>
                              </div>
                              <div className="mt-2 mb-5 shadow-sm focus:ring-contrast focus:border-contrast border-slate-400 border rounded-md p-2">
                                {requirementType && (
                                  <Dropdown
                                    func={renderTypeBadge}
                                    options={["Functional", "Non-functional"]}
                                    selected={requirementType}
                                    onSelect={(e) => setRequirementType(e)}
                                  />
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex flex-col">
                      <div className="flex flex-row justify-center">
                        {currentSlide > 0 && (
                          <RiArrowLeftCircleFill
                            className="h-12 w-12 text-contrast hover:cursor-pointer"
                            onClick={() => handleLeftArrow()}
                          />
                        )}
                        {currentSlide < 2 && (
                          <RiArrowRightCircleFill
                            className="h-12 w-12 text-contrast hover:cursor-pointer"
                            onClick={() => handleRightArrow()}
                          />
                        )}
                      </div>
                      <div className="flex flex-row justify-end mb-5 mr-5">
                        {currentSlide === 2 && (
                          <button
                            type="submit"
                            className="flex w-fit h-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                            onClick={btnCreateNewRequirement}
                          >
                            Create
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showsPopupAIHelper && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block bg-neutral-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle w-6/12">
              <div className="px-4 pt-4 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="md:text-left text-center">
                    <h3
                      className="text-2xl text-black font-semibold text-center"
                      id="modal-headline"
                    >
                      AI Requirement Generation
                    </h3>
                  </div>

                  <div className="px-5 pt-5 text-center items-center flex justify-center flex-grow">
                    <Stepper steps={steps2} />
                  </div>

                  {/* // close  */}
                  <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
                    onClick={() => handleAIPopup()}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <div className="carousel-container mt-8 md:text-left text-center flex-col space-y-2 w-full">
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className={classNames(
                          error ? "mb-2" : "mb-0",
                          "w-80 md:w-96"
                        )}
                      >
                        {error && <ErrorMessage message={errorMessage} />}
                      </div>

                      <div
                        className={`carousel-slide ${
                          currentSlideAI === 0 ? "active" : "hidden"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <label
                            htmlFor="deadline"
                            className="block text-md font-bold text-gray-700"
                          >
                            Project Description
                          </label>
                          <div className="mt-4">
                            <textarea
                              name="desc"
                              id="desc"
                              className="shadow-sm focus:ring-contrast focus:border-contrast block
                            w-96 sm:text-sm border-gray-300 rounded-md h-fit text-justify border-2 p-2"
                              value={projectDesc}
                              onChange={(e) => {
                                adjustTextareaHeight();
                                setProjectDesc(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm mt-4 flex">
                          Note: The better the project description, the best
                          results AI can give you.
                        </span>
                      </div>

                      <div
                        className={`carousel-slide ${
                          currentSlideAI === 1 ? "active" : "hidden"
                        }`}
                      >
                        <label
                          htmlFor="deadline"
                          className="block text-md font-medium text-gray-700"
                        >
                          Choose the type of requirements you wish to generate
                        </label>
                        <div className="mt-1">
                          <div className="mt-8 mb-5 shadow-sm focus:ring-contrast focus:border-contrast flex items-center justify-center">
                            {requirementChoiceAI && (
                              <Dropdown
                                func={renderTypeBadge}
                                options={["Functional", "Non-functional"]}
                                selected={requirementChoiceAI}
                                onSelect={(e) => setRequirementChoiceAI(e)}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`carousel-slide ${
                          currentSlideAI === 2 ? "active" : "hidden"
                        }`}
                      >
                        {showLoadingGenAI ? (
                          <>
                            <span className="block text-md text-lg font-bold text-center">
                              This process can take up to 30 sec.
                            </span>
                            <Loading />
                          </>
                        ) : (
                          <>
                            <span className="block text-md text-lg font-bold text-center">
                              Here are the requirements generated by the AI.
                            </span>
                            <div className="mt-4 justify-center flex items-center">
                              <div className="overflow-x-auto px-4">
                                <table className="table table-compact w-full">
                                  {/* head */}
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>Requirement</th>
                                      <th>Due Date </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {generatedReq.map((req, index) => (
                                      <tr key={index}>
                                        <td>
                                          <button
                                            className="text-contrast hover:text-contrast-hover bg-red-300"
                                            onClick={() =>
                                              deleteRequirementGenerated(index)
                                            }
                                          >
                                            <RiCloseLine className="w-5 h-5 text-black" />
                                          </button>
                                        </td>
                                        <td className="whitespace-normal break-words">
                                          {req.name}
                                        </td>
                                        <td>
                                          <input
                                            type="date"
                                            className="shadow-sm focus:ring-contrast focus:border-contrast block
                                              w-36 sm:text-sm border-gray-300 rounded-md h-fit text-justify border-2 p-1.5"
                                            value={req.due_date}
                                            onChange={(e) => {
                                              let temp = [...generatedReq];
                                              temp[index].due_date =
                                                e.target.value;
                                              setGeneratedReq(temp);
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>{" "}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-col">
                    <div className="flex flex-row justify-center">
                      {currentSlideAI > 0 && (
                        <RiArrowLeftCircleFill
                          className="h-12 w-12 text-contrast hover:cursor-pointer"
                          onClick={() => handleLeftArrowAI()}
                        />
                      )}
                      {currentSlideAI < 2 && (
                        <RiArrowRightCircleFill
                          className="h-12 w-12 text-contrast hover:cursor-pointer"
                          onClick={() => handleRightArrowAI()}
                        />
                      )}
                    </div>
                    <div className="flex flex-row justify-end mb-5 mr-5">
                      {currentSlideAI === 2 && (
                        <button
                          type="submit"
                          className="flex w-fit h-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                          onClick={addGeneratedRequirements}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
