import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";

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
    <Layout currentPage="dashboard" avatarUrl={avatar_url}>
      Dashboard
    </Layout>
  );
}
