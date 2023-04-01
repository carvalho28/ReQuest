import Layout from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Database } from "@/types/supabase";
import RequirementsTable from "@/components/RequirementsTable";
import Table from "@/components/Table";

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

  return {
    props: {
      avatar_url: data[0].avatar_url,
      project_data: projectData,
      user: userData[0].name,
      projectUserNames,
    },
  };
};

export default function SingleProject({
  avatar_url,
  project_data,
  user,
  projectUserNames,
}: any) {
  const project: Database["public"]["Tables"]["projects"]["Row"] =
    project_data[0];

  const name = user;

  const projectId = project.id;

  return (
    <div>
      <Layout
        currentPage="projects"
        namePage={`Project - ${project.name}`}
        avatar_url={avatar_url}
      >
        {/* <RequirementsTable
          name={name}
          projectUserNames={projectUserNames}
          projectId={projectId}
        /> */}

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
