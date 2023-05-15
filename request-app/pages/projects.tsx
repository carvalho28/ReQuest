import Layout from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  RiArrowRightCircleFill,
  RiArrowLeftCircleFill,
  RiArrowRightFill,
} from "react-icons/ri";
import { PlusIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import Tabs from "@/components/Tabs";
import Image from "next/image";

// dynamic imports
import dynamic from "next/dynamic";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { renderProjectStatusBadge } from "@/components/utils/general";
const ErrorMessage = dynamic(() => import("@/components/ErrorMessage"), {
  ssr: false,
});
const Stepper = dynamic(() => import("@/components/Stepper"), { ssr: false });

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type Step = {
  id: string;
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
};

const steps: Step[] = [
  { id: "01", name: "Name", href: "#", status: "current" },
  { id: "02", name: "Description", href: "#", status: "upcoming" },
  { id: "03", name: "Deadline", href: "#", status: "upcoming" },
  { id: "04", name: "Coworkers", href: "#", status: "upcoming" },
];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const user = session.user;
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user?.id);
  if (error) console.log(error);
  if (!data) throw new Error("No data found");
  const avatar_url = data[0].avatar_url;

  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "projects_user_people",
    {
      user_id: user.id,
    }
  );

  if (rpcError) console.log(error);
  if (!rpcData) return;

  const projects = rpcData;

  // get user projects info
  const { data: dataProjects, error: errorProjects } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  // convert to a ProjectChildren type where href is the /projects/[id] route
  const projectsChildren: ProjectChildren[] = dataProjects.map(
    (project: any) => {
      return {
        name: project.name,
        href: `/projects/${project.id}`,
      };
    }
  );

  return {
    props: {
      avatar_url: avatar_url,
      projects: projects,
      projectsChildren: projectsChildren,
    },
  };
};

export default function Projects({
  avatar_url,
  projects,
  projectsChildren,
}: any) {
  const [isTable, setIsTable] = useState(true);

  // funtion to change isTable and current tab
  function changeIsTable(tabName: string) {
    setIsTable(tabName === "Table");
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        current: tab.name === tabName,
      }))
    );
  }

  const [tabs, setTabs] = useState([
    { name: "Table", onClick: () => changeIsTable("Table"), current: true },
    { name: "Cards", onClick: () => changeIsTable("Cards"), current: false },
  ]);

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [projectsList, setProjectsList] = useState<
    Database["public"]["Tables"]["projects"]["Row"][]
  >([]);

  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [deadline, setDeadline] = useState<string | undefined>();

  const [person, setPerson] = useState<string | undefined>("");

  const [peopleId, setPeopleId] = useState<string[]>([]);
  const [peopleEmails, setPeopleEmails] = useState<string[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function handleCreate() {
    const { data, error } = await supabaseClient
      .from("projects")
      .insert([
        {
          name,
          description,
          deadline,
        },
      ])
      .select("id");
    if (error) console.log(error);
    if (!data) return;

    if (user) {
      peopleId.unshift(user.id);
    }

    if (data) {
      const { data: data2, error: error2 } = await supabaseClient
        .from("project_profiles")
        .insert(
          peopleId.map((id) => {
            return {
              id_proj: data[0].id,
              id_user: id,
            };
          })
        );
      if (error2) console.log(error2);

      console.log("Project created");

      setShowModal(false);
      setName(undefined);
      setDescription(undefined);
      setDeadline(undefined);
      setPeopleId([]);
      setPeopleEmails([]);
      clearSteps();
      router.push("/projects/table");
    }
  }

  async function handleAddPeople() {
    if (person === user?.email) {
      setErrorMessage("You can't add yourself to the project.");
      setError(true);
      return;
    }
    if (person === "") {
      return;
    }
    if (person !== undefined) {
      setError(false);
      const id = await searchByEmail(person);
      if (id) {
        setPeopleId([...peopleId, id]);
        setPeopleEmails([...peopleEmails, person]);
        setPerson("");
      } else {
        setErrorMessage("User not found");
        setError(true);
      }
    }
  }

  function removePerson(email: string) {
    setError(false);
    setPeopleEmails(peopleEmails.filter((e) => e !== email));
  }

  async function searchByEmail(email: string) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id")
      .eq("email", email);
    if (error) console.log(error);
    if (!data) return undefined;
    if (data.length === 0) return undefined;

    return data[0].id;
  }

  useEffect(() => {
    setProjectsList(projects);
    // realtime updates
    let pj_channel: RealtimeChannel;
    async function getProjectsRealTime() {
      pj_channel = supabaseClient
        .channel("projects_load")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "projects",
          },
          async (payload: any) => {
            // set the project changed to the new state
            if (payload.new) {
              const id = payload.new.id;
              const index = projectsList.findIndex((p) => p.id === id);
              console.log(index);

              if (index !== -1) {
                const newProjectsList = [...projectsList];
                newProjectsList[index] = payload.new;
                setProjectsList(newProjectsList);
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(pj_channel);
      };
    }
    // getProjects();
    getProjectsRealTime();
  }, [supabaseClient, user, projectsList, projects]);

  function toggleModal(cross?: boolean) {
    if (cross) {
      clearSteps();
    }
    setError(false);
    setCurrentSlide(0);
    setShowModal(!showModal);
  }

  function clearSteps() {
    steps.forEach((step) => (step.status = "upcoming"));
    steps[0].status = "current";
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLeftArrow = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
    steps[currentSlide].status = "upcoming";
    steps[currentSlide === 0 ? 3 : currentSlide - 1].status = "current";
  };

  const handleRightArrow = () => {
    if (name === undefined || name === "") {
      setErrorMessage("Please enter a name for the project");
      setError(true);
      return;
    }
    if (currentSlide === 2) {
      if (deadline === undefined) {
        setErrorMessage("Please enter a deadline for the project");
        setError(true);
        return;
      }
    }
    steps[currentSlide].status = "complete";
    steps[currentSlide === 3 ? 0 : currentSlide + 1].status = "current";
    setError(false);
    setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
  };

  async function updateField(id: string, field: string, value: string) {
    console.log(id, field, value);

    const { data, error } = await supabaseClient
      .from("projects")
      .update({ [field]: value })
      .eq("id", id)
      .select("id");
    if (error) console.log(error);
    if (!data) return;
  }

  return (
    <div>
      <Layout
        currentPage="projects"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="bg-white h-full p-6 shadow-lg rounded-xl pb-16 pt-4">
          <Tabs currentPage="table" tabs={tabs} />
          <div className="mt-10">
            <div className="px-4 sm:px-2">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Your projects
                  </h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-contrast py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    Add project
                  </button>
                </div>
              </div>
              {projectsList && (
                <>
                  {isTable ? (
                    <div className="-mx-4 mt-8 sm:-mx-0">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr className="divide-x divide-gray-300">
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black sm:pl-0"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-black lg:table-cell"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-black sm:table-cell"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-black"
                            >
                              Deadline
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-black"
                            >
                              Coworkers
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {projectsList?.map((item: any) => (
                            <tr
                              key={item.id}
                              className="divide-x divide-gray-300 hover:bg-gray-200 hover:cursor-pointer"
                              onClick={() => {
                                router.push(`/projects/${item.id}`);
                              }}
                            >
                              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm sm:font-medium text-black sm:w-auto sm:max-w-none sm:pl-0">
                                {item.name}
                                <dl className="font-normal lg:hidden">
                                  <dt className="sr-only">Description</dt>
                                  <dd className="mt-1 truncate text-gray-700">
                                    {item.description}
                                  </dd>
                                  <dt className="sr-only sm:hidden">Status</dt>
                                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                    {item.status == "Active" ? (
                                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        {item.status}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                        {item.status}
                                      </span>
                                    )}
                                  </dd>
                                </dl>
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                {item.description}
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {renderProjectStatusBadge(item.status, 4, 0.3)}
                              </td>
                              <td className="px-3 py-4 text-sm text-gray-500">
                                {/* convert to only show date */}
                                {item.deadline?.split("T")[0]}
                              </td>
                              <td className="px-3 py-4 text-sm text-gray-500">
                                {item.project_users?.length === 0 && (
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">-</div>
                                  </div>
                                )}
                                {item.project_users?.map((p: any) => (
                                  <div
                                    className="flex items-center space-x-3 text-xs sm:text-sm"
                                    key={p}
                                  >
                                    <div className="flex-shrink-0">{p}</div>
                                  </div>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                      {projectsList?.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            router.push(`/projects/${item.id}`);
                          }}
                        >
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-black mb-2">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                              {item.description}
                            </p>
                            <div className="flex justify-between">
                              <p className="text-gray-500 text-sm">
                                {/* {item.status} */}
                                {renderProjectStatusBadge(item.status, 4, 1)}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {item.deadline?.split("T")[0]}
                              </p>
                            </div>
                            <div className="flex flex-wrap mt-4 flex-col">
                              {item.project_users?.length === 0 && (
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">-</div>
                                </div>
                              )}

                              <div className="text-gray-500 text-sm mt-2">
                                Coworkers:
                              </div>

                              <div className="flex flex-wrap mt-2">
                                {item.project_users?.map((coworker: any) => (
                                  <div
                                    className="flex items-center space-x-3 text-xs sm:text-sm"
                                    key={coworker}
                                  >
                                    <div className="flex flex-row flex-shrink-0 items-center">
                                      <RiArrowRightFill className="mr-2" />
                                      {coworker}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
            id="Project Management"
            className="w-96 h-auto flex-none py-3"
            src={"/project-management.svg"}
            alt="Project management"
            width={100}
            height={100}
            priority
          />
        </div>
        <div>
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="inline-block bg-neutral-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle w-fit">
                  <div className="px-4 pt-4 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                    <div className="flex flex-col">
                      <div className="mt-5 md:text-left text-center">
                        <h3
                          className="text-2xl text-black font-semibold"
                          id="modal-headline"
                        >
                          New Project
                        </h3>
                      </div>
                      <div className="mt- px-5 pt-5">
                        <Stepper steps={steps} />
                      </div>

                      <button
                        className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
                        onClick={() => toggleModal(true)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>

                      <div className="carousel-container mt-8 md:text-left text-center flex-col space-y-2 w-full">
                        <div className="flex flex-col justify-center items-center">
                          <div
                            className={classNames(
                              error ? "mb-2" : "mb-0",
                              "w-80 md:w-96"
                            )}
                          >
                            {error && <ErrorMessage message={errorMessage} />}
                          </div>
                          <div
                            className={`carousel-slide ${
                              currentSlide === 0 ? "active" : "hidden"
                            }`}
                          >
                            <label
                              htmlFor="name"
                              className="block text-md font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="shadow-sm focus:ring-contrat focus:border-contrast block w-80 md:w-96 sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div
                            className={`carousel-slide ${
                              currentSlide === 1 ? "active" : "hidden"
                            }`}
                          >
                            <label
                              htmlFor="description"
                              className="block text-md font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                rows={3}
                                maxLength={125}
                                name="description"
                                id="description"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
                                block w-80 md:w-96 sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <div
                            className={`carousel-slide ${
                              currentSlide === 2 ? "active" : "hidden"
                            }`}
                          >
                            <label
                              htmlFor="deadline"
                              className="block text-md font-medium text-gray-700"
                            >
                              Deadline
                            </label>
                            <div className="mt-1">
                              <input
                                min={new Date().toISOString().split("T")[0]}
                                type="date"
                                name="deadline"
                                id="deadline"
                                className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setDeadline(e.target.value)}
                              />
                            </div>
                          </div>
                          <div
                            className={`carousel-slide ${
                              currentSlide === 3 ? "active" : "hidden"
                            }`}
                          >
                            {/* list of people added */}
                            <div className="flex flex-col space-y-2 mb-8">
                              {peopleEmails.map((p) => (
                                <div
                                  className="flex flex-row justify-between items-center"
                                  key={p}
                                >
                                  <div className="flex flex-row items-center space-x-2">
                                    <UserIcon className="h-6 w-6" />
                                    <p>{p}</p>
                                  </div>
                                  <button
                                    type="button"
                                    // className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-contrast hover:bg-contrast-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => removePerson(p)}
                                  >
                                    <XMarkIcon className="h-6 w-6 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <label
                              htmlFor="people"
                              className="block text-md font-medium text-gray-700 mb-4"
                            >
                              Coworker
                            </label>
                            <div className="flex flex-row space-x-6 w-full">
                              <div className="md:mt-1 w-5/6">
                                <input
                                  value={person}
                                  type="email"
                                  name="person"
                                  id="person"
                                  placeholder="Coworker email address"
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-64 md:w-80 sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) => setPerson(e.target.value)}
                                />
                              </div>
                              {/* add button */}
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="rounded-full bg-contrast p-1 text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    onClick={() => handleAddPeople()}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-col">
                    <div className="flex flex-row justify-center">
                      {currentSlide > 0 && (
                        <RiArrowLeftCircleFill
                          className="h-12 w-12 text-contrast hover:cursor-pointer"
                          onClick={() => handleLeftArrow()}
                        />
                      )}
                      {currentSlide < 3 && (
                        <RiArrowRightCircleFill
                          className="h-12 w-12 text-contrast hover:cursor-pointer"
                          onClick={() => handleRightArrow()}
                        />
                      )}
                    </div>
                    <div className="flex flex-row justify-end mb-5 mr-5">
                      {currentSlide === 3 && (
                        <button
                          type="submit"
                          className="flex w-fit h-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                          onClick={() => handleCreate()}
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}
