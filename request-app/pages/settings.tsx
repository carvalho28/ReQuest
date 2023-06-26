import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      projectsChildren: projectsChildren,
    },
  };
};

export default function Settings({ avatar_url, projectsChildren }: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [userEmailStatic, setUserEmailStatic] = useState<string | undefined>(
    undefined
  );
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setUserEmailStatic(user.email);
    }
  }, [user]);

  const tabsPre = [
    { name: "Change Email", actual: true },
    { name: "Change Password", actual: false },
    { name: "Delete Account", actual: false },
    { name: "Privacy", actual: false },
  ];
  const [tabs, setTabs] = useState(tabsPre);

  const handleTabClick = async (e: any) => {
    // set actual
    const newTabs = tabs.map((tab) => {
      if (tab.name === e.target.innerText) {
        return { ...tab, actual: true };
      } else {
        return { ...tab, actual: false };
      }
    });
    // set tabs
    setTabs(newTabs);
  };

  return (
    <div>
      <Layout
        currentPage="Settings"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="tabs tabs-boxed flex flex-row justify-center items-center gap-x-4 w-fit mx-auto">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              className={`tab ${tab.actual ? "tab-active" : ""}`}
              onClick={(e) => handleTabClick(e)}
            >
              {tab.name}
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-col p-6 bg-white rounded-lg shadow-lg w-full text-center items-center pt-10">
          {tabs[0].actual && (
            <div className="flex flex-col gap-x-4 md:flex-row gap-y-8 mx-6">
              <div className="flex flex-col w-64 text-center justify-center items-center">
                <label
                  htmlFor="user-password"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Current Email
                </label>
                <input
                  // readOnly={true}
                  disabled={true}
                  type="text"
                  name="user-email"
                  id="user-email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6 p-2 mt-2"
                  value={userEmailStatic}
                />
                <label
                  htmlFor="user-password"
                  className="mt-10 block text-md font-medium leading-6 text-gray-900"
                >
                  New Email
                </label>
                <input
                  type="text"
                  name="user-email"
                  id="user-email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6 p-2 mt-2"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <div className="mt-10 items-center flex justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white bg-contrast
                hover:bg-contrasthover"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
          {tabs[1].actual && (
            <div className="flex flex-col gap-x-4 md:flex-row gap-y-8 mx-6">
              <div className="flex flex-col w-64 text-center justify-center items-center">
                <label
                  htmlFor="user-password"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Current Password
                </label>
                <input
                  type="text"
                  name="user-email"
                  id="user-email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6 p-2 mt-2"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {tabs[3].actual && (
            <div className="flex flex-col mt-2 gap-y-8 mx-6">
              <div className="flex flex-row text-center justify-center items-center">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">
                  Your privacy settings
                </h3>
              </div>
              <div className="flex flex-col w-96 text-center justify-center items-center">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-10">
                      Opt-out of data collection and sharing.
                    </span>
                    <input
                      type="checkbox"
                      // checked="checked"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-10">
                        Ensure data encryption.
                      </span>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text mr-10">
                          Consent to cookie usage.
                        </span>
                        <input
                          type="checkbox"
                          // checked="checked"
                          checked={true}
                          className="checkbox checkbox-primary"
                        />
                      </label>
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
