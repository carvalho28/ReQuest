import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPen } from "react-icons/fa";

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

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // get user data
    async function getUserData() {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user?.id);
      if (error) console.log(error);
      if (!data) {
        console.log("No data found");
        return;
      }
      setUserData(data[0]);
    }

    getUserData();
  }, [supabaseClient, user]);

  return (
    <Layout currentPage="profile" avatarUrl={avatar_url}>
      <div className="flex max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="w-1/2 flex flex-col justify-center items-center">
          {/* load avatar */}
          <Image
            className="object-cover w-full h-54 rounded-lg"
            src={avatar_url}
            alt="avatar"
            width={300}
            height={300}
          />
          <button
            type="submit"
            className="flex w-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast mt-4"
          >
            Customize me
          </button>
        </div>

        <div className="w-px bg-gray-400 mx-4"></div>
        <div className="w-1/2 p-6">
          <div className="flex items-center">
            <h3 className="text-black font-semibold text-lg">
              {userData?.name}
            </h3>
            <button className="flex items-center ml-4 mb-2">
              <FaPen />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
