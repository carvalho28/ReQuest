import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log("ctx", ctx);

  const supabase = createServerSupabaseClient(ctx);

  console.log("supabase", supabase);

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // if (!session)
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };

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
      <button
        onClick={() => userLogout()}
        type="button"
        className="rounded bg-indigo-600 py-1 px-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
      Hello
    </>
  );
}
