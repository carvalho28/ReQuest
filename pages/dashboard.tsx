import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";

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

export default function Dashboard({ avatar_url }: any) {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  useEffect(() => {}, [user]);

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto border-r border-gray-200 sidebar-background pt-5 pb-4">
        <Sidebar currentPage="dashboard" avatar_url={avatar_url} />
      </div>
      <div className="mt-12 ml-72 mr-8">
        <div className="flex flex-wrap space-x-14">
          <Card sizeClass="w-full lg:w-1/3 mb-4" />
          <Card sizeClass="w-full lg:w-1/2 mb-4" />
          <Card sizeClass="w-full lg:w-1/4 mb-4" />
          <Card sizeClass="w-full lg:w-1/4 mb-4" />
        </div>
      </div>
    </>
  );
}
