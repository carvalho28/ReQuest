import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import {
  renderImage,
  renderProjectStatusBadge,
} from "@/components/utils/general";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { Database } from "@/types/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import Link from "next/link";
import { RiAddLine, RiArrowLeftSLine } from "react-icons/ri";
import { RealtimeChannel } from "@supabase/supabase-js";

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

  const id = ctx.params?.id;
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id);

  if (projectError) console.log(projectError);
  if (!projectData) throw new Error("No data found");

  return {
    props: {
      avatar_url: avatar_url,
      projectsChildren: projectsChildren,
      project_data: projectData,
    },
  };
};

type ProjectUsers = {
  id_user: string;
  profiles: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
  };
};

export default function ProjectSettings({
  avatar_url,
  projectsChildren,
  project_data,
}: any) {
  const project: Database["public"]["Tables"]["projects"]["Row"] =
    project_data[0];
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [projectDeadline, setProjectDeadline] = useState(project.deadline);

  const [projectUsers, setProjectUsers] = useState<ProjectUsers[]>([]);

  const router = useRouter();

  useEffect(() => {
    // get users for the given project
    const getUsers = async () => {
      const { data: usersData, error: usersError } = await supabaseClient
        .from("project_profiles")
        .select(
          `id_user, 
        profiles(id, email,name, avatar_url)`
        )
        .eq("id_proj", project.id);
      if (usersError) console.log(usersError);

      console.log(usersData);
      setProjectUsers(usersData as ProjectUsers[]);
    };
    getUsers();
  }, []);

  async function deleteProject() {
    // popup to confirm
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabaseClient
      .from("projects")
      .delete()
      .eq("id", project.id);
    if (error) console.log(error);

    // redirect to projects page
    router.push("/projects/table");
  }

  async function exitProject() {
    // popup to confirm
    if (!confirm("Are you sure you want to exit this project?")) return;
    const { error } = await supabaseClient
      .from("project_profiles")
      .delete()
      .match({ id_proj: project.id, id_user: user?.id });

    if (error) console.log(error);

    router.push("/projects/table");
  }

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [showMessage, setShowMessage] = useState(false);
  async function updateProject() {
    if (projectName === "") {
      setShowMessage(true);
      setErrorMessage("Project name cannot be empty");
      return;
    }
    if (projectDescription === "") {
      setShowMessage(true);
      setErrorMessage("Project description cannot be empty");
      return;
    }
    if (projectStatus === "") {
      setShowMessage(true);
      setErrorMessage("Project status cannot be empty");
      return;
    }
    if (projectDeadline === "") {
      setShowMessage(true);
      setErrorMessage("Project deadline cannot be empty");
      return;
    }

    const { error } = await supabaseClient
      .from("projects")
      .update({
        name: projectName,
        description: projectDescription,
        status: projectStatus,
        deadline: projectDeadline,
      })
      .eq("id", project.id);

    if (error) console.log(error);

    setErrorMessage(null);
    setSuccessMessage("Project updated successfully");
    setShowMessage(true);
    // sset show message for 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }

  const [emailToAdd, setEmailToAdd] = useState("");
  const [errorAddEmail, setErrorAddEmail] = useState<null | string>(null);
  const [successAddEmail, setSuccessAddEmail] = useState<null | string>(null);
  const [showAddEmailMessage, setShowAddEmailMessage] = useState(false);

  async function addPeopleToProject() {
    setErrorAddEmail(null);
    setSuccessAddEmail(null);
    setShowAddEmailMessage(false);
    if (emailToAdd === "") {
      setErrorAddEmail("Email cannot be empty");
      setShowAddEmailMessage(true);
      return;
    } else {
      // if email is already in the project
      const emailAlreadyInProject = projectUsers.find(
        (user) => user.profiles.email === emailToAdd
      );
      if (emailAlreadyInProject) {
        setErrorAddEmail("Email is already in the project");
        setShowAddEmailMessage(true);
        return;
      }
      if (emailToAdd !== undefined) {
        //if email exists in the database
        const { data: emailData, error: emailError } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("email", emailToAdd);

        if (emailError) {
          setErrorAddEmail("Email not found");
          setShowAddEmailMessage(true);
          return;
        }
        if (emailData.length === 0) {
          setErrorAddEmail("Email not found");
          setShowAddEmailMessage(true);
          return;
        } else {
          const { error } = await supabaseClient
            .from("project_profiles")
            .insert({
              id_proj: project.id,
              id_user: emailData[0].id,
            });

          if (error) console.log(error);

          setErrorAddEmail(null);
          setSuccessAddEmail("Email added successfully");
          setShowAddEmailMessage(true);
          //clear email input
          setEmailToAdd("");

          // set show message for 3 seconds
          setTimeout(() => {
            setShowAddEmailMessage(false);
          }, 3000);
        }
      }
    }
  }

  // refresh realtime
  useEffect(() => {
    let proj_channel: RealtimeChannel;
    async function refreshProjectUsers() {
      proj_channel = supabaseClient
        .channel("proj_users")
        .on(
          "postgres_changes", 
          {
            event: "*",
            schema: "public",
            table: "project_profiles",
          },
          async (payload) => {
            const { data: usersData, error: usersError } = await supabaseClient
              .from("project_profiles")
              .select(
                `id_user, 
              profiles(id, email,name, avatar_url)`
              )
              .eq("id_proj", project.id);
            if (usersError) console.log(usersError);
            setProjectUsers(usersData as ProjectUsers[]);
          }
        ).subscribe();

      return () => {
        supabaseClient.removeChannel(proj_channel);
      }
    }
    refreshProjectUsers();
  } , [projectUsers])

  return (
    <Layout
      currentPage={`${project.name}\t⚙️`}
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
      {/* icon to go back */}
      <div className="flex items-end justify-end ml-auto gap-x-2 px-6">
        <Link href={`/projects/${project.id}`}>
          <span className="text-gray-500 hover:cursor-pointer hover:bg-contrast hover:text-white px-5 py-3 rounded-lg">
            Return to project
          </span>
        </Link>
      </div>
      <div className="flex mt-8 gap-x-4 flex-col md:flex-row gap-y-8 mx-6">
        <div
          className="flex flex-col p-6 bg-white rounded-lg shadow-lg 
          justify-center w-1/2"
        >
          {/* input with value predefinded name*/}
          <div>
            <label
              htmlFor="project-name"
              className="block text-md font-medium leading-6 text-gray-900"
            >
              Project Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="project-name"
                id="project-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm 
                sm:leading-6"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          {/* input for description */}
          <div className="mt-10">
            <label
              htmlFor="project-description"
              className="block text-md font-medium leading-6 text-gray-900"
            >
              Project Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="project-description"
                id="project-description"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                sm:leading-6"
                value={projectDescription || ""}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>

          {/* dropdown for status */}
          <div className="mt-10">
            <div className="flex flex-row space-x-4 items-center justify-center">
              <div className="w-1/2 items-center justify-center flex flex-col">
                <label
                  htmlFor="project-status"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Project Status
                </label>
                <div className="mt-2">
                  <Dropdown
                    func={renderProjectStatusBadge}
                    onSelect={(value) => setProjectStatus(value)}
                    options={["Active", "On Hold", "Completed", "Cancelled"]}
                    selected={projectStatus}
                  />
                </div>
              </div>
              <div className="w-1/2 items-center justify-center flex flex-col">
                <label
                  htmlFor="project-deadline"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Project Deadline
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="project-deadline"
                    id="project-deadline"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm
                    sm:leading-6"
                    value={projectDeadline.split("T")[0]}
                    onChange={(e) => setProjectDeadline(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {showMessage && errorMessage && (
              <div className="mt-4">
                <ErrorMessage message={errorMessage || ""} />
              </div>
            )}
            {showMessage && successMessage && (
              <div className="mt-4">
                <SuccessMessage message={successMessage || ""} />
              </div>
            )}
            {/* save button */}
            <div className="mt-10 items-center flex justify-center">
              <button
                type="button"
                className="inline-flex items-center px-6 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white bg-contrast
                hover:bg-contrasthover"
                onClick={updateProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col p-6 bg-white rounded-lg shadow-lg 
          items-center w-1/2"
        >
          {/* show users */}
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Project Members
          </h2>

          <div className="h-72">
            {projectUsers.map((user) => (
              <div
                className="flex items-center mt-4 bg-gray-50 py-3 px-6 rounded-lg"
                key={user.profiles.id}
              >
                <Image
                  id="Profile"
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={
                    "data:image/svg+xml," +
                    renderImage(user.profiles.avatar_url)
                  }
                  alt="Avatar"
                  width={2}
                  height={2}
                  priority
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.profiles.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.profiles.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* button to add people to the project */}
          <div className="flex flex-row space-x-4 justify-center items-center w-72">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md h-10"
              placeholder="Enter email to add"
              value={emailToAdd}
              onChange={(e) => setEmailToAdd(e.target.value)}
            />
            <button
              type="button"
              className="px-2 py-2 border border-transparent
              text-sm font-medium rounded-md shadow-sm text-white bg-contrast
              hover:bg-contrasthover justify-center"
              onClick={addPeopleToProject}
            >
              <RiAddLine className="h-6 w-6" />
            </button>
          </div>
          {showAddEmailMessage && errorAddEmail && (
            <div className="mt-4">
              <ErrorMessage message={errorAddEmail || ""} />
            </div>
          )}
          {showAddEmailMessage && successAddEmail && (
            <div className="mt-4">
              <SuccessMessage message={successAddEmail || ""} />
            </div>
          )}
        </div>
      </div>
      {/* dangerous options such as delete project or exit project*/}
      <div className="flex flex-row mt-8 md:flex-row gap-y-8 mx-6 rounded-lg shadow-lg bg-white">
        <div className="flex flex-row p-6 justify-center w-1/2 items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-medium leading-6 text-gray-900 w-full p-5">
              Danger Zone
            </h2>
            <div className="mt-8">
              <button
                type="button"
                className="inline-flex items-center px-6 py-2 border border-transparent
              text-sm font-medium rounded-md shadow-sm text-white bg-contrast
              hover:bg-contrasthover"
                onClick={() => {
                  exitProject();
                }}
              >
                Exit Project
              </button>
            </div>
            <div className="mt-10">
              <button
                type="button"
                className="inline-flex items-center px-6 py-2 border border-transparent
              text-sm font-medium rounded-md shadow-sm text-white bg-red-500
              hover:bg-red-600"
                onClick={() => {
                  deleteProject();
                }}
              >
                Delete Project
              </button>
            </div>
          </div>
          {/* render svg image */}
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
          <Image
            id="Danger"
            className="w-96 h-96 flex-none p-5"
            src={"/danger-guy.svg"}
            alt="Danger"
            width={2}
            height={2}
            priority
          />
        </div>
      </div>
    </Layout>
  );
}
