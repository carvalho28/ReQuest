import Layout from "@/components/Layout";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import { PlusIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import ErrorMessage from "@/components/ErrorMessage";
import Stepper from "@/components/Stepper";

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

const Tabs = dynamic(() => import("@/components/Tabs"), { ssr: false });

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

  return {
    props: {
      avatar_url: data[0].avatar_url,
    },
  };
};

export default function Projects({ avatar_url }: any) {
  const tabs = [
    { name: "Table", href: "/projects/table", current: true },
    { name: "Cards", href: "/projects/cards", current: false },
  ];

  const projects = [
    {
      id: 2341234,
      name: "Share",
      description: "Project for computer security course",
      status: "Active",
      deadline: "2021-01-01",
      people: [
        {
          name: "ze@ze.com",
        },
        {
          name: "joao@joao.com",
        },
        {
          name: "diogo@diogo.com",
        },
      ],
    },
    {
      id: 2341234234,
      name: "O-Security",
      description: "Project for lorem ipsum",
      status: "Completed",
      deadline: "2021-01-01",
      people: [
        {
          name: "ze@ze.com",
        },
        {
          name: "pedro@pedro.com",
        },
      ],
    },
  ];

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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
    console.log(name, description, status, deadline, peopleEmails);
  }, [name, description, status, deadline, peopleEmails]);

  function toggleModal() {
    setError(false);
    setCurrentSlide(0);
    setShowModal(!showModal);
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

  return (
    <div>
      <Layout currentPage="projects" avatar_url={avatar_url}>
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      People
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-whitepages">
                  {projects.map((project) => (
                    <tr
                      key={project.name}
                      className="hover:bg-gray-200 hover:cursor-pointer divide-x divide-gray-300"
                      onClick={() => {
                        router.push(`/projects/${project.id}`);
                      }}
                    >
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-black sm:w-auto sm:max-w-none sm:pl-0">
                        {project.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Description</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {project.description}
                          </dd>
                          <dt className="sr-only sm:hidden">Status</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {project.status == "Active" ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {project.status}
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                {project.status}
                              </span>
                            )}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {project.description}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {project.status == "Active" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {project.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                            {project.status}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {project.deadline}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {project.people.map((p) => (
                          <div
                            className="flex items-center space-x-3"
                            key={p.name}
                          >
                            <div className="flex-shrink-0">{p.name}</div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                      <div className="mt-5 text-left">
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
                        onClick={() => toggleModal()}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>

                      <div className="carousel-container mt-8 text-left flex-col space-y-2 w-full">
                        <div className="flex flex-col justify-center items-center">
                          <div
                            className={classNames(
                              error ? "mb-2" : "mb-0",
                              "w-96"
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
                                className="shadow-sm focus:ring-contrat focus:border-contrast block w-96 sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
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
                              className="block text-md font-medium text-gray-700"
                            >
                              Coworker
                            </label>
                            <div className="flex flex-row space-x-6 w-full">
                              <div className="mt-1 w-5/6">
                                <input
                                  value={person}
                                  type="email"
                                  name="person"
                                  id="person"
                                  placeholder="Coworker email address"
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-80 sm:text-sm border-gray-300 rounded-md"
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
