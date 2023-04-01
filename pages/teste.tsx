import Table, {
  AssignedToProject,
  DescriptionProject,
  DueDateProject,
  PriorityProject,
  ProjectName,
  StatusProject,
} from "@/components/Table";
import { reqData } from "@/components/dummy";
import { useMemo } from "react";

export default function Teste() {
  // Table
  const data = useMemo(() => reqData(), []);

  // copy data 100 times and add to a new array
  const data2 = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(...data);
    }
    return arr;
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ProjectName,
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

  return (
    <div className="h-screen bg-gray-100">
      <h1>Hello React!</h1>
      <div>
        <Table columns={columns} data={data2} />
      </div>
    </div>
  );
}
