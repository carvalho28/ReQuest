import { connectedUsers } from "@/pages/chat";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import { renderImage } from "./utils/general";
import Image from "next/image"

interface ChatListProps {
  connectedUsers: connectedUsers[];
  onUserSelect: (userId: number) => void;
}

const ChatList = ({ connectedUsers, onUserSelect }: ChatListProps) => {
  const [people, setPeople] = useState(connectedUsers);

  // const [searchTerm, setSearchTerm] = useState("");
  // const onChange = useAsyncDebounce((value) => {
  //   setSearchTerm(value || "");
  // }, 200);

  useEffect(() => {
    setPeople(connectedUsers);
  }, [connectedUsers]);

  // get the userId of the selected user
  const selectUser = (userId: number) => {
    const updatedPeople = people.map((user) => {
      if (user.id === userId) {
        return { ...user, selected: true };
      } else {
        return { ...user, selected: false };
      }
    });
    setPeople(updatedPeople);
    onUserSelect(userId);
  };


  return (
    <div className="border-r-2 border-slate-300 h-full bg-gray-50">
      {/*  search bar */}
      <div className="flex items-center w-full justify-center mt-4 mb-2">
        <input
          // value={searchTerm || ""}
          // onChange={(e) => {
          //   setSearchTerm(e.target.value);
          //   onChange(e.target.value);
          // }}
          className="rounded-xl border p-3 text-gray-500 cursor-pointer"
          type="search"
          placeholder="🔎   Search..."
        />
      </div>
      <ul role="list" className="divide-gray-300 py-2">
        {people.map((person) => (
          <li
            key={person.id}
            className={`flex justify-between gap-x-6 
          py-5 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-300 
          ${person.selected ? "bg-gray-200" : "bg-white2"}`}
          >
            <div
              className="flex gap-x-4"
              key={person.id}
              onClick={() => {
                selectUser(person.id);
              }}
            >
              <Image
                id="Profile"
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={"data:image/svg+xml," + renderImage(person.avatar_url)}
                alt="Avatar"
                width={2}
                height={2}
                priority
              />

              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
