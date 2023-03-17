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

  return {
    props: {},
  };
};

export default function Dashboard() {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function userLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    }
    router.push("/");
  }

  useEffect(() => {}, [user]);

  return (
    <>
      {/* button to logout */}
      {/* <button
        onClick={() => userLogout()}
        type="button"
        className="rounded bg-indigo-600 py-1 px-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
      Hello */}
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto border-r border-gray-200 sidebar-background pt-5 pb-4">
        <Sidebar />
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
