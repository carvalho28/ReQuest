import Table from "@/components/Table";
import { reqData } from "@/components/dummy";
import { useMemo } from "react";

export default function Teste() {
  // Table
  const data = useMemo(() => reqData(), []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Due Date",
        accessor: "due_date",
      },
      {
        Header: "Status",
        accessor: "checked",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Assigned To",
        accessor: "assigned_to",
      },
    ],
    []
  );

  console.log("Type of data: ", typeof data);

  return (
    <>
      <h1>Hello React!</h1>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}
