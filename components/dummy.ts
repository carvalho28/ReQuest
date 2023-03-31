export const reqData = () => {
  const data = [
    {
      name: "Req 1",
      description: null,
      due_date: null,
      priority: 1,
      assigned_to: [],
      checked: 3,
    },
    {
      name: "Req2",
      description: null,
      due_date: null,
      priority: 1,
      assigned_to: [],
      checked: 1,
    },
    {
      name: "Req 3",
      description: "Hi there sdkhfgjsdfgdjsf",
      due_date: "2021-05-01",
      priority: 1,
      assigned_to: ["user1", "user2"],
      checked: 2,
    },
  ];
  return data;
};
