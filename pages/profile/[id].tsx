import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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

export default function Profile({ avatar_url }: any) {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto sidebar-background pt-5 pb-4">
        <Sidebar currentPage="profile" avatar_url={avatar_url} />
      </div>
      <div className="mt-12 ml-72 mr-8">user.id: {user?.id}</div>
    </>
  );
}
