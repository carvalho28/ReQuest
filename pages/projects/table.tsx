import Layout from "@/components/Layout";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

  function toggleModal() {
    setShowModal(!showModal);
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLeftArrow = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
  };

  const handleRightArrow = () => {
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
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

                <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                    <div className="flex flex-col">
                      <div className="mt-5 text-center">
                        <h3
                          className="text-2xl font-medium text-black"
                          id="modal-headline"
                        >
                          New Project
                        </h3>
                      </div>
                      <button
                        className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
                        onClick={() => toggleModal()}
                      >
                        <XMarkIcon className="h-8 w-8" />
                      </button>

                      {/* w-full grey line */}
                      <div className="w-full h-0.5 bg-gray-200 mt-1"></div>

                      <div className="carousel-container mt-8 text-left flex-col space-y-2 w-96">
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
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                              name="description"
                              id="description"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                              type="date"
                              name="deadline"
                              id="deadline"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              onChange={(e) => setDeadline(e.target.value)}
                            />
                          </div>
                        </div>
                        <div
                          className={`carousel-slide ${
                            currentSlide === 3 ? "active" : "hidden"
                          }`}
                        >
                          <label
                            htmlFor="people"
                            className="block text-md font-medium text-gray-700"
                          >
                            People
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="people"
                              id="people"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              // onChange={(e) => setPeople(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 flex flex-col">
                    <div className="flex flex-row justify-center">
                      {currentSlide > 0 && (
                        <RiArrowLeftCircleFill
                          className="h-16 w-16 text-contrast hover:cursor-pointer"
                          onClick={() => handleLeftArrow()}
                        />
                      )}
                      {currentSlide < 3 && (
                        <RiArrowRightCircleFill
                          className="h-16 w-16 text-contrast hover:cursor-pointer"
                          onClick={() => handleRightArrow()}
                        />
                      )}
                    </div>
                    <div className="flex flex-row justify-end mb-5">
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
