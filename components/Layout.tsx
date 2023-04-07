import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  FolderIcon,
  InboxIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useUser, useSupabaseClient, User } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProjectChildren } from "./utils/sidebarHelper";

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
  {
    name: "Projects",
    icon: FolderIcon,
    href: "/projects/table",
    count: 0,
    current: false,
    children: [] as ProjectChildren[],
  },
  {
    name: "Chat",
    icon: ChatBubbleBottomCenterTextIcon,
    href: "#",
    count: 0,
    current: false,
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    href: "/calendar",
    count: 0,
    current: false,
  },
  {
    name: "Documents",
    icon: InboxIcon,
    href: "/documents",
    count: 0,
    current: false,
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    href: "/settings",
    count: 0,
    current: false,
  },
];

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  avatar_url: string;
  namePage?: string;
  projectChildren?: ProjectChildren[];
}

const Layout = ({
  children,
  currentPage,
  avatar_url,
  namePage,
  projectChildren,
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  var user = useUser();

  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [navItems, setNavItems] = useState([...navigation]);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const [showProjectChildren, setShowProjectChildren] =
    useState<boolean>(false);

  function getIsCollapsed() {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", JSON.stringify(!isCollapsed));
  }

  useEffect(() => {
    const isCollapsed = localStorage.getItem("isCollapsed");
    if (isCollapsed) {
      setIsCollapsed(JSON.parse(isCollapsed));
    }
  }, []);

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
    // add project children to navItems
    if (projectChildren) {
      setNavItems((prevNavItems) =>
        prevNavItems.map((item) => {
          if (item.name.toLowerCase() === "projects") {
            return { ...item, children: projectChildren };
          } else {
            return item;
          }
        })
      );
    }
  }, [currentPage, projectChildren]);

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
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col sidebar-background">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
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
                          ? "bg-whitepages rounded-3xl"
                          : "hover:bg-whitepages rounded-3xl hover:cursor-pointer",
                        "flex text-center justify-center mt-10 mx-5"
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

                    <div className="mt-5 flex flex-grow flex-col">
                      <nav
                        className="flex-1 space-y-4 px-3"
                        aria-label="Sidebar"
                      >
                        {navItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-whitepages text-black"
                                : "text-white hover:bg-whitepages hover:text-black",
                              "group flex items-center px-5 py-4 text-md font-medium rounded-full"
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
                                    ? "bg-primarygreen text-white"
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
                  </div>
                  <div className="flex flex-shrink p-8 justify-center">
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
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        {!isCollapsed ? (
          <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col sidebar-background">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col mt-4">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Image
                    className="h-8 w-auto hover:cursor-pointer"
                    src="/logo.svg"
                    alt="ReQuest"
                    width={175}
                    height={150}
                    priority={true}
                    onClick={() => router.push("/dashboard")}
                  />

                  {/* collapse icon if true chevron right if false chevron left */}
                  <div className="flex flex-grow justify-end">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => getIsCollapsed()}
                    >
                      {isCollapsed ? (
                        <ChevronRightIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronLeftIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
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
                      priority={true}
                      width={32}
                      height={32}
                      onClick={() => profileClick()}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {/* <div className="mt-12 flex flex-grow flex-col"> */}
                <nav
                  className="mt-5 flex-1 space-y-4 pl-6"
                  aria-label="Sidebar"
                >
                  {/* {navItems.map((item) => (
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
                              ? "bg-primarygreen text-white"
                              : "bg-whitepages group-hover:bg-gray-400 text-black",
                            "ml-3 mr-2 inline-block rounded-full py-0.5 px-3 text-xs font-medium"
                          )}
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  ))} */}
                  {/* render projects children */}
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <div
                        className={classNames(
                          item.current
                            ? "bg-whitepages text-black"
                            : "text-white hover:bg-whitepages hover:text-black",
                          "group flex items-center px-2 pl-5 py-4 text-md font-medium rounded-l-full hover:cursor-pointer"
                        )}
                        onClick={() => {
                          router.push(item.href);
                        }}
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
                                ? "bg-primarygreen text-white"
                                : "bg-whitepages group-hover:bg-gray-400 text-black",
                              "ml-3 mr-2 inline-block rounded-full py-0.5 px-3 text-xs font-medium"
                            )}
                          >
                            {item.count}
                          </span>
                        ) : null}
                        {/* if it is projects then render the chevron if projectChildren is true, and other chevron if false */}
                        {item.name === "Projects" &&
                        item?.children?.length !== 0 ? (
                          <>
                            {showProjectChildren ? (
                              <ChevronDownIcon
                                className="h-8 w-8 text-primarygreen mr-2 hover:cursor-pointer hover:text-white hover:bg-contrast rounded-full p-1"
                                aria-hidden="true"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setShowProjectChildren(false);
                                }}
                              />
                            ) : (
                              <ChevronRightIcon
                                className="h-8 w-8 mr-2 hover:cursor-pointer text-green-300 hover:bg-contrast rounded-full p-1 hover:text-white"
                                strokeWidth={3}
                                aria-hidden="true"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setShowProjectChildren(true);
                                }}
                              />
                            )}
                          </>
                        ) : null}
                      </div>
                      {showProjectChildren && (
                        <>
                          {item.children && (
                            <>
                              {item.children.map((child) => (
                                <Link
                                  key={child?.name}
                                  href={child?.href}
                                  className="flex items-center px-4 pl-10 py-1 my-2 text-md font-medium rounded-l-full truncate hover:bg-whitepages hover:text-black text-white"
                                >
                                  <span>{child?.name}</span>
                                </Link>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink p-8 justify-center">
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
        ) : (
          <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-16 lg:flex-col sidebar-background">
            <div className="flex min-h-0 flex-1 flex-col mt-4">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4 flex-col">
                  <Image
                    className="h-8 w-auto hover:cursor-pointer"
                    src="/logo.svg"
                    alt="ReQuest"
                    width={175}
                    height={150}
                    priority={true}
                    onClick={() => router.push("/dashboard")}
                  />

                  {/* collapse icon if true chevron right if false chevron left */}
                  <div className="flex flex-grow justify-end mt-5">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => getIsCollapsed()}
                    >
                      {isCollapsed ? (
                        <ChevronRightIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronLeftIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div
                  className={classNames(
                    isProfile
                      ? "bg-whitepages rounded-l-3xl"
                      : "hover:bg-whitepages rounded-l-3xl hover:cursor-pointer",
                    "flex text-center justify-center mt-10"
                  )}
                >
                  {avatar_url ? (
                    <Image
                      id="Profile"
                      className="h-auto pb-2 w-14"
                      src={avatar_url}
                      alt="Avatar"
                      priority={true}
                      width={32}
                      height={32}
                      onClick={() => profileClick()}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <nav
                  className="mt-5 flex-1 space-y-4 pl-1"
                  aria-label="Sidebar"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-whitepages text-black"
                          : "text-white hover:bg-whitepages hover:text-black",
                        "group flex items-center py-4 text-md font-medium rounded-l-full pl-4"
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
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink p-2 justify-center mb-10">
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
        )}
        <div
          className={classNames(
            isCollapsed ? "lg:ml-16" : "lg:ml-64",
            "flex flex-1 flex-col"
          )}
        >
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-contrast bg-contrast hover:bg-contrasthover"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 px-4 py-4">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">
                  {namePage
                    ? namePage
                    : currentPage.charAt(0).toUpperCase() +
                      currentPage.slice(1)}
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
