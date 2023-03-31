import { useTable } from "react-table";

function Table({ columns, data }: any) {
  console.log("columns: ", columns);
  console.log("data: ", data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table and the styles
  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-10">
                {headerGroups.map((headerGroup, i) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={`header-group-${i}`}
                  >
                    {headerGroup.headers.map((column, j) => (
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
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={`row-${i}`}>
                      {row.cells.map((cell, j) => {
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
