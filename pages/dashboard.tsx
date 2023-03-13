import { withAuth } from "@/components/WithAuth";
import { checkUser } from "@/utils/signInUtils";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Dashboard() {
  const router = useRouter();

  // useEffect(() => {
  // async function checkUserAuth() {
  //   const user = await checkUser();
  //   if (!user) {
  //     router.push("/");
  //   }
  // }
  // checkUserAuth();
  // });

  async function userLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    }
    router.push("/");
  }

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
    </>
  );
}

export default withAuth(Dashboard, true);
