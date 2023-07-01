import CalendarHeader from "@/components/CalendarHeader";
import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

/**
 * Calendar page
 * @description It allows the user to see the calendar of the projects
 * @param avatar_url - the avatar url of the user
 * @param projects - the projects of the user
 * @param requirements - the requirements of the user
 * @param projectsChildren - the projects of the user
 * @returns Returns the Calendar page
 */
export default function Calendar({
  avatar_url,
  projects,
  requirements,
  projectsChildren,
}: any) {
  return (
    <div>
      <Layout
        currentPage="Calendar"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div>
          <CalendarHeader projects={projects} requirements={requirements} />
        </div>
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
  const avatar_url = data[0].avatar_url;

  // get user projects info
  const { data: dataProjects, error: errorProjects } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  // get user requirements info
  const { data: dataRequirements, error: errorRequirements } =
    await supabase.rpc("requirements_user", { user_id: user?.id });

  // get user projects info
  const { data: dataProjectsChildren, error: errorProjectsChildren } =
    await supabase.rpc("projects_user", { user_id: user?.id });
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
      projects: dataProjects,
      requirements: dataRequirements,
      projectsChildren: projectsChildren,
    },
  };
};
