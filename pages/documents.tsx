import Layout from "@/components/Layout";
import Uppy from "@uppy/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Dashboard } from "@uppy/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import CardFile from "@/components/CardFile";

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
      allowedFileTypes: ["image/*", "video/*", "application/*"],
      maxFileSize: 10000000,
    },
  });

  // on submit upload all files to supabase storage
  uppy.on("complete", async (result) => {
    const uuid = user?.id;
    if (!uuid) return;

    // upload multiple files
    for (let i = 0; i < result.successful.length; i++) {
      const { error } = await supabaseClient.storage
        .from("user-files")
        .upload(
          `${uuid}/${result.successful[i].name}`,
          result.successful[i].data
        );

      if (error) {
        if (error.message === "The resource already exists") {
          uppy.info(
            `File ${result.successful[i].name} already exists`,
            "error",
            3000
          );
          return;
        } else {
          uppy.info(`Failed to upload ${result.successful[i].name}`, "error");
          return;
        }
      } else {
        // show progress details
        uppy.info(`Uploaded ${result.successful[i].name}`, "info", 1000);
        // remove file from uppy
        uppy.removeFile(result.successful[i].id);
      }
    }
    uppy.info("Upload complete", "info", 3000);
  });

  useEffect(() => {
    async function getUserFiles() {
      // get user files from supabase storage
      const { data, error } = await supabaseClient.storage
        .from("user-files")
        .list(`${user?.id}/`);

      if (error) console.log(error);
      if (!data) throw new Error("No data found");

      console.log("data: ", data);

      // remove . (hidden files)
      const filesData: any = data.filter(
        (file: any) => !file.name.startsWith(".")
      );

      // if it is an image, add the url to the file object
      for (let i = 0; i < filesData.length; i++) {
        const { data: urlData, error: urlError } = await supabaseClient.storage
          .from("user-files")
          .createSignedUrl(`${user?.id}/${filesData[i].name}`, 60 * 60 * 24);

        if (urlError) console.log(urlError);
        if (!urlData) throw new Error("No data found");

        // add url to file object
        if (urlData) {
          filesData[i].url = urlData.signedUrl as string;
        }
      }

      setFiles(filesData);
    }
    getUserFiles();
  }, [user?.id]);

  console.log(files);

  return (
    <div>
      <Layout currentPage="Documents" avatar_url={avatar_url}>
        <div>
          <div>{files && <CardFile files={files} />}</div>

          <div className="mt-5">
            <Dashboard
              height={500}
              width="100%"
              uppy={uppy}
              proudlyDisplayPoweredByUppy={false}
              // allow images to be edited
              metaFields={[
                { id: "name", name: "Name", placeholder: "file name" },
              ]}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
