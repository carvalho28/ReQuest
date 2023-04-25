import { connectedUsers } from "@/pages/chat";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

let peopleA = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    selected: true,
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    selected: false,
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    selected: false,
  },
];

interface ChatListProps {
  connectedUsers: connectedUsers[];
}

const ChatList = ( { connectedUsers }: ChatListProps ) => {

  let people = [
    ...connectedUsers,
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const onChange = useAsyncDebounce((value) => {
    setSearchTerm(value || "");
  }, 200);

  return (
    <div className="border-r-2 border-slate-300 h-full bg-gray-50">
      {/*  search bar */}
      <div className="flex items-center w-full justify-center mt-4 mb-2">
        <input
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(e.target.value);
          }}
          className="rounded-xl border p-3 text-gray-500 cursor-pointer"
          type="search"
          placeholder="🔎   Search..."
        />
      </div>
      <ul role="list" className="divide-gray-300 py-2">
        {people.map((person) => (
          <li key={person.email} className={`flex justify-between gap-x-6 
          py-5 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-300 ${person.selected ? 'bg-gray-200' : 'bg-white2'}`}>
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.avatar_url} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
