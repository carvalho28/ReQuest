import Layout from "@/components/Layout";
import Uppy from "@uppy/core";
import { ProgressBar } from "@uppy/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Dashboard } from "@uppy/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

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

  return {
    props: {
      avatar_url: avatar_url,
    },
  };
};

export default function Documents({ avatar_url }: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [files, setFiles] = useState<any>([]);

  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 10,
      allowedFileTypes: ["image/*", "video/*", "application/pdf"],
      maxFileSize: 10000000,
    },
  });

  // on submit upload all files to supabase storage
  uppy.on("complete", async (result) => {
    const uuid = user?.id;
    if (!uuid) return;
    const { error } = await supabaseClient.storage
      .from("user-files")
      .upload(
        `${uuid}/${result.successful[0].name}`,
        result.successful[0].data
      );
    if (error) {
      if (error.message === "The resource already exists") {
      }
    }

    // clear all files and show success message
    // uppy.getPlugin("Dashboard").closeModal();
    uppy.info("Upload complete", "info", 3000);
  });

  useEffect(() => {
    async function getUserFiles() {
      // get user files from supabase storage
      const { data, error } = await supabaseClient.storage
        .from("user-files")
        .list(user?.id);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      // remove . (hidden files)
      data.filter((file: any) => !file.name.startsWith("."));

      // generate url for each file if doesn't exist
      data.map(async (file: any) => {
        if (!file.url) {
          let url = await supabaseClient.storage
            .from("user-files")
            .createSignedUrl(`${user?.id}/${file.name}`, 60 * 5);
          file.url = url;
        }
      });
      // set files
      setFiles(data);
    }
    getUserFiles();
  }, [user?.id]);

  console.log(files);

  return (
    <div>
      <Layout currentPage="Documents" avatar_url={avatar_url}>
        <div>
          <div>
            {/* <Dashboard uppy={uppy} showProgressDetails={true} /> */}
            {/* load dashboard without powered by uppy */}
            <Dashboard
              uppy={uppy}
              showProgressDetails={true}
              proudlyDisplayPoweredByUppy={false}
              // allow editing of file names
              metaFields={[
                { id: "name", name: "Name", placeholder: "file name" },
              ]}
            />
            {/* progress bar */}
            <ProgressBar uppy={uppy} />
          </div>
          {/* show user files */}
          <div></div>
        </div>
      </Layout>
    </div>
  );
}
