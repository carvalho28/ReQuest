import Layout from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Database } from "@/types/supabase";
import RequirementsTable from "@/components/RequirementsTable";
import Table from "@/components/Table";
import {
  RiArrowLeftCircleFill,
  RiArrowRightCircleFill,
  RiUser3Line,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { ProjectChildren } from "@/components/utils/sidebarHelper";

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

  //   get the id from the url
  const id = ctx.params?.id;

  // get the project data from the database
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id);

  if (projectError) console.log(projectError);
  if (!projectData) throw new Error("No data found");

  // get user name from the database
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user?.id);

  if (userError) console.log(userError);
  if (!userData) throw new Error("No data found");

  // get all users that are in the project
  const { data: usersInProject, error: usersInProjectError } = await supabase
    .from("project_profiles")
    .select(
      `id_user, 
    profiles (
      name,
      email
    )`
    )
    .eq("id_proj", id);

  if (usersInProjectError) console.log(usersInProjectError);
  if (!usersInProject) throw new Error("No data found");

  const projectUserNames = usersInProject.map(
    (user: any) => user.profiles.name ?? user.profiles.email
  );

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
      avatar_url: data[0].avatar_url,
      project_data: projectData,
      user: userData[0].name,
      projectUserNames,
      projectsChildren: projectsChildren,
    },
  };
};

export default function SingleProject({
  avatar_url,
  project_data,
  user,
  projectUserNames,
  projectsChildren,
}: any) {
  const project: Database["public"]["Tables"]["projects"]["Row"] =
    project_data[0];
  const name = user;
  const projectId = project.id;

  const supabaseClient = useSupabaseClient();

  const [totalRequirements, setTotalRequirements] = useState(0);
  const [requirementsCompleted, setRequirementsCompleted] = useState(0);
  const [requirementsInProgress, setRequirementsInProgress] = useState(0);
  const [requirementsNotStarted, setRequirementsNotStarted] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsCarrousel = [
    { label: "Total Requirements", value: totalRequirements },
    { label: "Requirements Completed", value: requirementsCompleted },
    { label: "Requirements In Progress", value: requirementsInProgress },
    { label: "Requirements Not Started", value: requirementsNotStarted },
  ];

  const handleLeftArrow = () => {
    setCurrentIndex(
      (currentIndex - 1 + itemsCarrousel.length) % itemsCarrousel.length
    );
  };

  const handleRightArrow = () => {
    setCurrentIndex((currentIndex + 1) % itemsCarrousel.length);
  };

  useEffect(() => {
    const getRequirements = async () => {
      const { data, error } = await supabaseClient
        .from("requirements")
        .select("*")
        .eq("id_proj", projectId);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      setTotalRequirements(data.length);
      setRequirementsCompleted(
        data.filter(
          (requirement: any) => requirement.status.toLowerCase() === "done"
        ).length
      );
      setRequirementsInProgress(
        data.filter(
          (requirement: any) =>
            requirement.status.toLowerCase() === "in progress"
        ).length
      );
      setRequirementsNotStarted(
        data.filter(
          (requirement: any) =>
            requirement.status.toLowerCase() === "not started"
        ).length
      );
    };

    let req_channel: RealtimeChannel;
    async function getProjectsRealTime() {
      req_channel = supabaseClient
        .channel("reqs_load")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requirements",
          },
          async (payload: any) => {
            getRequirements();
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(req_channel);
      };
    }

    getRequirements();
    getProjectsRealTime();
  }, [
    requirementsCompleted,
    requirementsInProgress,
    requirementsNotStarted,
    projectId,
    supabaseClient,
  ]);

  return (
    <div>
      <Layout
        currentPage="projects"
        namePage={`Project - ${project.name}`}
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="flex gap-x-4 mt-8 flex-col sm:flex-row gap-y-8">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg justify-center sm:w-1/3 w-full">
            <h3 className="text-xl font-bold flex justify-center items-center text-center">
              Requirements Overview
            </h3>
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="text-6xl font-extrabold">
                {itemsCarrousel[currentIndex].value}
              </div>
              <div className="text-md mt-2 text-gray-700">
                {itemsCarrousel[currentIndex].label}
              </div>
              <div className="flex justify-center items-center mt-8">
                <RiArrowLeftCircleFill
                  className="h-10 w-10 text-black mr-2 hover:cursor-pointer"
                  onClick={() => handleLeftArrow()}
                />
                <RiArrowRightCircleFill
                  className="h-10 w-10 text-black ml-2 hover:cursor-pointer"
                  onClick={() => handleRightArrow()}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg sm:w-1/3 w-full">
            <h3 className="text-xl font-bold flex justify-center">
              Team Members
            </h3>
            <div className="flex flex-col justify-center mt-8 ml-2">
              {/* print user names next to  an icon */}
              {projectUserNames.map((user: any) => (
                <div className="flex gap-x-2 mt-4" key={user}>
                  <RiUser3Line className="h-6 w-6" />
                  <div className="text-md">{user}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Table
          name={name}
          projectId={projectId}
          projectUserNames={projectUserNames}
        />

        {/* <Table /> */}
      </Layout>
    </div>
  );
}
