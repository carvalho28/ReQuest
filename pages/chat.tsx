import ChatConversation from "@/components/ChatConversation";
import ChatList from "@/components/ChatList";
import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";

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


export default function Chat({ avatar_url, projectsChildren }: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <div>
      <Layout
        currentPage="Chat"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        {/* chat layout  */}
        <div className="flex flex-row bg-whitepages border 
        border-gray-300 rounded-lg" style={{ height: "calc(100vh - 12em)" }}>
          {/* first column for chat selection */}
          <div className="flex flex-col w-1/4 overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ChatList />
          </div>
          {/* second column for chat */}
          <div className="flex flex-col w-3/4">
            <ChatConversation />
          </div>
        </div>
      </Layout>
    </div>
  );
}
