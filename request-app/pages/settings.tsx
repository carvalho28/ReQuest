import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect } from "react";

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

  useEffect(() => {
    if (user) {
      console.log("email is set", user.email);
    }
  }, [user]);

  return (
    <div>
      <Layout
        currentPage="Settings"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="flex flex-row mt-8 md:flex-row gap-y-8 mx-6 rounded-lg shadow-lg bg-white p-5">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <h2 className="text-2xl font-bold text-center">Change Email</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
}
