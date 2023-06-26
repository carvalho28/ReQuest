import ErrorMessage from "@/components/ErrorMessage";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import SuccessMessage from "@/components/SuccessMessage";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

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
  const [userEmail, setUserEmail] = useState<string | undefined | string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const router = useRouter();

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
    setLoading(false);
  };

  const updateEmail = async () => {
    if (userEmail === "") {
      setErrorMessage("Email cannot be empty");
      return;
    }
    setLoading(true);
    if (userEmail) {
      const { data, error } = await supabaseClient.auth.updateUser({
        email: userEmail,
      });
      if (error) {
        console.log(error);
        setSuccessMessage(undefined);
        setErrorMessage(error.message);
      }
      if (data) {
        if (data.user) {
          setSuccessMessage(
            "Please verify in both the old and new email the confirmation sent"
          );
          setErrorMessage(undefined);
        }
      }
    }
    setLoading(false);
  };

  // get profile changes in real-time
  useEffect(() => {
    let pj_channel: RealtimeChannel;
    async function getUserDataRealtime() {
      pj_channel = supabaseClient
        .channel("user_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
          },
          async (payload: any) => {
            console.log(payload);
            if (payload.new.email) {
              // get new user and session
              const { error } = await supabaseClient.auth.signOut();
              if (error) {
                console.log(error);
                throw error;
              }
              router.push("/login");
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(pj_channel);
      };
    }
    getUserDataRealtime();
  }, [supabaseClient]);

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
                    onClick={() => updateEmail()}
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label
                  htmlFor="user-password-new"
                  className="mt-10 block text-md font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="text"
                  name="user-password-new"
                  id="user-password-new"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6 p-2 mt-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label
                  htmlFor="user-password-conf"
                  className="mt-10 block text-md font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="text"
                  name="user-password-conf"
                  id="user-password-new"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6 p-2 mt-2"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
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

          {tabs[2].actual && (
            <div className="flex flex-col gap-x-4 md:flex-row gap-y-8 mx-6">
              <div className="flex flex-col w-64 text-center justify-center items-center">
                {/* huge danger icon */}
                <RiErrorWarningFill className="text-red-400 w-20 h-20" />
                <button
                  type="button"
                  className="inline-flex items-center px-10 mt-10 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white bg-red-500
                hover:bg-contrasthover"
                >
                  Delete Account
                </button>

                <Image
                  className="inset-0 h-auto max-w-screen p-6 mx-auto"
                  style={{ maxWidth: "130%" }}
                  src="/delete-account.svg"
                  alt=""
                  width={1600}
                  height={1600}
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
          <div className="flex flex-row justify-center items-center mt-8">
            {loading && <Loading />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && <SuccessMessage message={successMessage} />}
          </div>
        </div>
      </Layout>
    </div>
  );
}
