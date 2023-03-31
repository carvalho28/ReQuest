import { useState } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table"; // new
import "regenerator-runtime/runtime";

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
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  // Render the UI for your table and the styles
  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-10">
                {headerGroups.map((headerGroup: any, i: number) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={`header-group-${i}`}
                  >
                    {headerGroup.headers.map((column: any, j: number) => (
                      <th
                        {...column.getHeaderProps()}
                        key={`header-${i}-${j}`}
                        className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map((row: any, i: number) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
