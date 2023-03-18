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
import { useUser, useSupabaseClient, User } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./Loading";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "/dashboard",
    count: 0,
    current: false,
  },
  { name: "Teams", icon: UsersIcon, href: "/teams", count: 0, current: false },
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
    href: "/settings",
    count: 0,
    current: false,
  },
];

interface SidebarProps {
  currentPage: string;
  avatar_url?: string;
}

const Sidebar = ({ currentPage, avatar_url }: SidebarProps) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  var user = useUser();

  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [navItems, setNavItems] = useState([...navigation]);

  useEffect(() => {
    setNavItems((prevNavItems) =>
      prevNavItems.map((item) => {
        if (item.name.toLowerCase() === currentPage.toLowerCase()) {
          return { ...item, current: true };
        } else {
          return { ...item, current: false };
        }
      })
    );
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === "profile") {
      setIsProfile(true);
    }
  }, [currentPage]);

  async function userLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    }
    router.push("/");
  }

  function profileClick() {
    const id = user?.id;
    router.push(`/profile/${id}`);
  }

  return (
    <div className="flex flex-grow flex-col overflow-y-auto pt-5 pb-4">
      <div className="flex flex-shrink-0 items-center px-4">
        <Image
          className="h-8 w-auto hover:cursor-pointer"
          src="/logo.svg"
          alt="ReQuest"
          width={32}
          height={32}
          onClick={() => router.push("/dashboard")}
        />
      </div>

      <div
        className={classNames(
          isProfile
            ? "bg-whitepages rounded-l-3xl"
            : "hover:bg-whitepages rounded-l-3xl hover:cursor-pointer",
          "flex text-center justify-center mt-10 ml-6"
        )}
      >
        {avatar_url ? (
          <Image
            id="Profile"
            className="h-auto w-48 pb-5"
            src={avatar_url}
            alt="Avatar"
            width={32}
            height={32}
            onClick={() => profileClick()}
            priority
          />
        ) : (
          <></>
        )}
      </div>

      <div className="mt-32 flex flex-grow flex-col">
        <nav className="flex-1 space-y-4 pl-6" aria-label="Sidebar">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-whitepages text-black"
                  : "text-white hover:bg-whitepages hover:text-black",
                "group flex items-center px-2 pl-5 py-4 text-md font-medium rounded-l-full"
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-primarygreen"
                    : "text-whitepages group-hover:text-primarygreen",
                  "mr-3 h-6 w-6 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? "bg-whitepages"
                      : "bg-whitepages group-hover:bg-gray-400 text-black",
                    "ml-3 mr-2 inline-block rounded-full py-0.5 px-3 text-xs font-medium"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex justify-center">
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
  );
};

export default Sidebar;
