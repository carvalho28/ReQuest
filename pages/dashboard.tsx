import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Layout from "@/components/Layout";
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
      projectsChildren: projectsChildren,
    },
  };
};

export default function Dashboard({ avatar_url, projectsChildren }: any) {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  useEffect(() => {}, [user]);

  return (
    <Layout
      currentPage="dashboard"
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
      Dashboard2
    </Layout>
  );
}
