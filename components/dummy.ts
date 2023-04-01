export const reqData = () => {
  const data = [
    {
      name: "Req 1",
      description: null,
      due_date: null,
      priority: "P1",
      assigned_to: [],
      status: "Completed",
    },
    {
      name: "BBBBB",
      description: null,
      due_date: null,
      priority: "P2",
      assigned_to: [],
      status: "Not Started",
    },
    {
      name: "AAAAAA",
      description: "Hi there sdkhfgjsdfgdjsf",
      due_date: "2021-05-01",
      priority: "P3",
      assigned_to: ["user1", "user2"],
      status: "In Progress",
    },
  ];
  return data;
};
