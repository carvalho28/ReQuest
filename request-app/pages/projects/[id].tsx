import Layout from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import Image from "next/image";
import { Rubik_Glitch } from "next/font/google";
import CountdownTimer from "@/components/CountdownTimer";
import { UserIdAndName } from "@/components/utils/general";
import ListRanking from "@/components/ListRanking";
import dynamic from "next/dynamic";

// import Table dynamicaly
const Table = dynamic(() => import("@/components/Table"), { ssr: false });

const rubikGlitch = Rubik_Glitch({
  subsets: ["latin"],
  weight: ["400"],
});

export type Rankings = {
  id: string;
  name: string;
  requirements_closed: number;
  avatar_url: string;
};

/**
 * Single project page
 * @description It shows the project details
 * @param avatar_url - user avatar url
 * @param project_data - project data
 * @param user - user name
 * @param userId - user id
 * @param projectUserIdsAndNames - project user ids and names
 * @param projectsChildren - user projects
 * @returns single project page
 */
export default function SingleProject({
  avatar_url,
  project_data,
  user,
  userId,
  projectUserIdsAndNames,
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
          (requirement: any) => requirement.status.toLowerCase() === "completed"
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

  // function to get a color based on a %, given that the % is between 0 and 100, and the gradient between red for low values, than starts to turn yellow and ends in green for high values
  const getColor = (percentage: number) => {
    const hue = ((percentage - 0) * 120) / (100 - 0);
    return `hsl(${hue}, 80%, 60%)`;
  };

  // use Effect to get ranking
  const [ranking, setRanking] = useState<Rankings[]>([]);
  useEffect(() => {
    const getRanking = async () => {
      const { data, error } = await supabaseClient.rpc("ranking_req", {
        proj_id: projectId,
      });

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      setRanking(data);
    };

    getRanking();
  }, [projectId, supabaseClient, requirementsCompleted]);

  return (
    <div>
      <Layout
        currentPage="projects"
        namePage={`Project - ${project.name}`}
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="flex gap-x-4 mt-8 flex-col md:flex-row gap-y-8">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg justify-center md:w-1/3 w-full">
            <h3 className="text-xl font-bold flex justify-center items-center text-center">
              Progress
            </h3>
            {/* render svg spaceship */}
            <div className="text-center flex justify-center items-center">
              <Image
                alt="Rocketship"
                src="/rocketship.svg"
                width={100}
                height={100}
                className="mt-8"
              />
            </div>
            <div className="w-full h-4 mb-4 bg-gray-200 rounded-full mt-6">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${
                    (requirementsCompleted / totalRequirements) * 100
                  }%`,
                  backgroundColor: getColor(
                    (requirementsCompleted / totalRequirements) * 100
                  ),
                }}
              ></div>
              <div className="flex justify-end text-xs text-gray-600 mt-2">
                <span className={`text-2xl trucate ${rubikGlitch.className}`}>
                  {Math.round(
                    (requirementsCompleted / totalRequirements) * 100
                  ) || 0}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg justify-center md:w-1/3 w-full">
            <h3 className="text-xl font-bold flex justify-center items-center text-center">
              Deadline
            </h3>
            <div className="text-center flex justify-center items-center">
              <Image
                alt="Hourglass"
                src="/hourglass.svg"
                width={100}
                height={100}
                className="mt-8"
              />
            </div>

            {/* show a countdown to the deadline */}
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center mt-3">
                <CountdownTimer dateString={project.deadline} />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg md:w-1/3 w-full">
            <h3 className="text-xl font-bold flex justify-center">Ranking</h3>
            <div className="flex flex-col justify-center mt-8 space-y-4 items-center">
              <ListRanking rankings={ranking} user_id={userId} />
            </div>
          </div>
        </div>

        <Table
          name={name}
          userId={userId}
          projectId={projectId}
          projectUserIdsAndNames={projectUserIdsAndNames}
        />
      </Layout>
    </div>
  );
}

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
      id,
      name,
      email
    )`
    )
    .eq("id_proj", id);

  if (usersInProjectError) console.log(usersInProjectError);
  if (!usersInProject) throw new Error("No data found");

  // const projectUserIds = usersInProject.map((user: any) => user.id_user);

  // const projectUserNames = usersInProject.map(
  //   (user: any) => user.profiles.name ?? user.profiles.email
  // );

  // tuple of user ids and user names
  const projectUserIdsAndNames: UserIdAndName[] = usersInProject.map(
    (user: any) => {
      return {
        id: user.id_user,
        name: user.profiles.name ?? user.profiles.email,
      };
    }
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
      userId: user?.id,
      projectUserIdsAndNames: projectUserIdsAndNames,
      projectsChildren: projectsChildren,
    },
  };
};
