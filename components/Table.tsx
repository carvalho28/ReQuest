import { useEffect, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  usePagination,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { RiArrowRightSLine, RiCheckboxBlankCircleFill } from "react-icons/ri";
import { DOTS, useCustomPagination } from "./CustomPagination";
import "regenerator-runtime/runtime";

export function PriorityProject({ value }: any) {
  const status = value || 3;

  if (status === 1) {
    return (
      <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-red-100 text-red-700">
        P1
      </span>
    );
  } else if (status === 2) {
    return (
      <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-yellow-100 text-yellow-700">
        P2
      </span>
    );
  } else {
    return (
      <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-700">
        P3
      </span>
    );
  }
}

export function StatusProject({ value }: any) {
  const status = value || 1;

  if (status === 1) {
    return (
      <span className="inline-flex items-center px-3 py-1 uppercase font-bold text-xs rounded-full shadow-sm bg-red-100 text-red-700">
        <RiCheckboxBlankCircleFill className="mr-1" />
        Not Started
      </span>
    );
  } else if (status === 2) {
    return (
      <span className="inline-flex items-center px-3 py-1 uppercase font-bold text-xs rounded-full shadow-sm bg-yellow-100 text-yellow-700">
        <RiCheckboxBlankCircleFill className="mr-1" />
        In Progress
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-700">
        <RiCheckboxBlankCircleFill className="mr-1" />
        Completed
      </span>
    );
  }
}

export function DescriptionProject({ value }: any) {
  if (value) {
    return (
      // if more than 20 characters, show only 17 and add ...
      <span className="text-md text-black" title={value}>
        {value.length > 20 ? value.substring(0, 17) + "..." : value}
      </span>
    );
  } else {
    return <span className="italic text-sm text-gray-400">No description</span>;
  }
}

export function DueDateProject({ value }: any) {
  if (value) {
    return (
      <span className="text-md text-black" title={value}>
        {value}
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

function GlobalFilter({ globalFilter, setGlobalFilter, placeholder }: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="flex pt-10 pb-10 items-center justify-center">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="w-8/12 rounded-xl border p-4 text-gray-500 cursor-pointer"
        type="search"
        placeholder="Search..."
      />
    </span>
  );
}

function Table({ columns, data }: any) {
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
                        {...column.getHeaderProps()}
                        className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                      >
                        {column.render("Header")}
                        {column.id === "selection" && column.render("Summary")}
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
                            className="px-6 py-10 whitespace-nowrap"
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
    </div>
  );
}

export default Table;
