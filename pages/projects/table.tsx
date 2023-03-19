import Layout from "@/components/Layout";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

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
      name: "M-Team",
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
  ];

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
                >
                  Add project
                </button>
              </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Deadline
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      People
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-whitepages">
                  {projects.map((project) => (
                    <tr key={project.name}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        {project.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Name</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {project.status}
                          </dd>
                          <dt className="sr-only sm:hidden">Email</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {project.description}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {project.description}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {project.status}
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

                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {project.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
