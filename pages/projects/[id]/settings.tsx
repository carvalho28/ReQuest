import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { renderProjectStatusBadge } from "@/components/utils/general";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { Database } from "@/types/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

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

export default function ProjectSettings({
  avatar_url,
  projectsChildren,
  project_data,
}: any) {
  const project: Database["public"]["Tables"]["projects"]["Row"] =
    project_data[0];

  console.log(project);

  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [projectDeadline, setProjectDeadline] = useState(project.deadline);

  return (
    <Layout
      currentPage={`${project.name}\t⚙️`}
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
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
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
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
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
                sm:leading-6"
                value={projectDescription || ""}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>

          {/* dropdown for status */}
          <div className="mt-10">
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
        </div>
        <div
          className="flex flex-col p-6 bg-white rounded-lg shadow-lg 
          items-center w-1/2"
        >
          {/* show users */}
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Project Members
          </h2>
        </div>
      </div>
    </Layout>
  );
}
