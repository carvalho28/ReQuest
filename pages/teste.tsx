import Table, {
  AssignedToProject,
  DescriptionProject,
  DueDateProject,
  PriorityProject,
  StatusProject,
} from "@/components/Table";
import { reqData } from "@/components/dummy";
import { useMemo } from "react";

export default function Teste() {
  // Table
  const data = useMemo(() => reqData(), []);

  // uplicate data 100 times
  const data2 = Array(100).fill(data);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: DescriptionProject,
      },
      {
        Header: "Due Date",
        accessor: "due_date",
        Cell: DueDateProject,
      },
      {
        Header: "Status",
        accessor: "checked",
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

  return (
    <div className="h-screen bg-gray-100">
      <h1>Hello React!</h1>
      <div>
        <Table columns={columns} data={data2} />
      </div>
    </div>
  );
}
