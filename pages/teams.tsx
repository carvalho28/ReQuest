import Sidebar from "@/components/Sidebar";
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

  return {
    props: {
      avatar_url: data[0].avatar_url,
    },
  };
};

export default function Teams({ avatar_url }: any) {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto sidebar-background pt-5 pb-4">
        <Sidebar currentPage="teams" avatar_url={avatar_url} />
      </div>
      <div className="mt-12 ml-72 mr-8">Teams</div>
    </>
  );
}
