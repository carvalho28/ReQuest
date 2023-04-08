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
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiCheckboxBlankCircleFill,
} from "react-icons/ri";
import { DOTS, useCustomPagination } from "./CustomPagination";
import "regenerator-runtime/runtime";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ColumnsReq, RowReq, classNames } from "./utils/general";
import { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RequirementData from "./RequirementData";
import { RealtimeChannel } from "@supabase/supabase-js";

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
        {value}
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

function GlobalFilter({ globalFilter, setGlobalFilter, placeholder }: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="flex flex-col pt-10 pb-10 items-center justify-center">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="md:w-5/12 w-1/3 rounded-xl border p-3 text-gray-500 cursor-pointer"
        type="search"
        placeholder="🔎   Search..."
      />
    </span>
  );
}

interface RequirementsTableProps {
  name: string;
  projectUserNames: string[];
  projectId: string;
}

function Table({ name, projectUserNames, projectId }: RequirementsTableProps) {
  const [requirements, setRequirements] = useState<
    Database["public"]["Tables"]["requirements"]["Row"][]
  >([]);
  const [requirement, setRequirement] =
    useState<Database["public"]["Tables"]["requirements"]["Row"]>();

  const columns: Column<ColumnsReq>[] = useMemo(
    () => [
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
        Cell: AssignedToProject,
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
        .select("*")
        .order("created_at", { ascending: false })
        .eq("id_proj", projectId);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      setRequirements(
        data as Database["public"]["Tables"]["requirements"]["Row"][]
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
            created_at: req.created_at,
            created_by: req.created_by,
            updated_at: req.updated_at,
            updated_by: req.updated_by,
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
            getRequirements();
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(req_channel2);
      };
    }
    getRequirements();
    getProjectsRealTime();
  }, [supabaseClient, projectId]);

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
            />
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200 shadow-md"
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
                            className="md:px-5 px-2 py-5 whitespace-nowrap truncate text-sm md:text-[16px]"
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
          name={name}
          requirement={requirement}
          projectUserNames={projectUserNames}
        />
      )}
    </div>
  );
}

export default Table;
