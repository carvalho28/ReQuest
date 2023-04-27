import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";

// avatar imports
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

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

  // get user projects info
  const { data: dataProjects, error: errorProjects } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  // convert to a ProjectChildren type where href is the /projects/[id] route
  const projectsChildren: ProjectChildren[] = dataProjects.map(
    (project: any) => {
      return {
        name: project.name,
        href: `/projects/${project.id}`,
      };
    }
  );

  return {
    props: {
      avatar_url: avatar_url,
      projectsChildren: projectsChildren,
    },
  };
};

export default function Profile({ avatar_url, projectsChildren }: any) {
  const avatar = createAvatar(personas, {
    seed: "diogo",
    backgroundColor: ["b6e3f4"],
    radius: 50,
  });

  const svgData = encodeURIComponent(avatar.toString());

  return (
    <Layout
      currentPage="profile"
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg relative h-fit mt-28">
        {/* render svg */}
        <div className="absolute -top-24">
          <Image
            src={`data:image/svg+xml,${svgData}`}
            width={200}
            height={200}
            alt="Avatar"
            className=""
          />{" "}
        </div>
        <div className="mt-48"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full p-4">
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              skin
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#FFCC22" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#FBD2C7" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#F2AD9B" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E58F7B" }}
              ></button>

              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E4A070" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#B16A5B" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#92594B" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#623D36" }}
              ></button>

              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#C9E6DC" }}
              ></button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start flex-col h-60 items-center">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              hair
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#362C47" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#675E97" }}
              ></button>

              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#5AC4D4" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#DEE1FF" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#6C4545" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#F29C65" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E16381" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E15C66" }}
              ></button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              facial hair
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#362C47" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#675E97" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#5AC4D4" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#DEE1F5" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#6C4545" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#F29C65" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E16381" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#E15C66" }}
              ></button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              body
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#456DFF" }}
              ></button>

              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#5A45FF" }}
              ></button>
              <button
                className="rounded-md p-4"
                style={{ backgroundColor: "#6DBB58" }}
              ></button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            5
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            6
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            7
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            8
          </div>
        </div>
      </div>
    </Layout>
  );
}
