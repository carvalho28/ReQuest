import CalendarView from "@/components/CalendarView";
import Layout from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
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

  return {
    props: {
      avatar_url: avatar_url,
      projects: dataProjects,
    },
  };
};

export default function Calendar({ avatar_url, projects }: any) {
  console.log(projects);

  return (
    <div>
      <Layout currentPage="Calendar" avatar_url={avatar_url}>
        <div>
          <CalendarView projects={projects} />
        </div>
      </Layout>
    </div>
  );
}
