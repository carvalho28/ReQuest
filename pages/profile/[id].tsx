import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
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

  return {
    props: {},
  };
};

export default function Profile() {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto border-r border-gray-200 sidebar-background pt-5 pb-4">
        <Sidebar />
      </div>
      <div className="mt-12 ml-72 mr-8">user.id: {user?.id}</div>
    </>
  );
}
