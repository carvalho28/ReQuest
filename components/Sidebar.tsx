import Image from "next/image";
import {
  CalendarIcon,
  FolderIcon,
  Squares2X2Icon,
  InboxIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "#",
    count: 0,
    current: true,
  },
  { name: "Team", icon: UsersIcon, href: "#", count: 0, current: false },
  { name: "Projects", icon: FolderIcon, href: "#", count: 1, current: false },
  {
    name: "Chat",
    icon: ChatBubbleBottomCenterTextIcon,
    href: "#",
    count: 0,
    current: false,
  },
  { name: "Calendar", icon: CalendarIcon, href: "#", count: 0, current: false },
  { name: "Documents", icon: InboxIcon, href: "#", count: 0, current: false },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    href: "#",
    count: 0,
    current: false,
  },
];

const Sidebar = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  async function userLogout() {
    // popup are you sure?

    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    }
    router.push("/");
  }

  return (
    <div className="fixed inset-y-0 z-10 bg-gray-100 flex flex-col overflow-y-auto border-r border-gray-200 pt-5 pb-4 w-48">
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto border-r border-gray-200 sidebar-background pt-5 pb-4">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200  pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Image
              className="h-8 w-auto"
              src="/logo.svg"
              alt="ReQuest"
              width={32}
              height={32}
            />
          </div>
          <div className="flex text-center justify-center">
            <Image
              className="h-28 w-auto"
              src="/logo.svg"
              alt="ReQuest"
              width={32}
              height={32}
            />
          </div>
          <div className="mt-48 flex flex-grow flex-col">
            <nav className="flex-1 space-y-4 px-2" aria-label="Sidebar">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-black"
                      : "text-white hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-2 py-3 text-md font-medium"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-primarygreen"
                        : "text-white group-hover:text-primarygreen",
                      "mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.count ? (
                    <span
                      className={classNames(
                        item.current
                          ? "bg-white"
                          : "bg-gray-100 group-hover:bg-gray-400 text-black",
                        "ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-medium"
                      )}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </a>
              ))}
            </nav>
          </div>
          {/* button to logout */}
          <div className="flex justify-center">
            {/* ArrowRightOnRectangleIcon */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={userLogout}
            >
              <ArrowRightOnRectangleIcon
                className="text-black h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
