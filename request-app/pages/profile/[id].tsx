import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPen, FaStar } from "react-icons/fa";
import { Black_Ops_One } from "next/font/google";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { useRouter } from "next/router";
import { renderImage } from "@/components/utils/general";

// dynamic
const ModalAddProject = dynamic(() => import("@/components/ModalAddProject"), {
  ssr: false,
});

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

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

  // get user data
  const { data: dataRpc, error: errorRpc } = await supabase
    .from("profiles")
    .select("*, levels (denomination, xp_needed)")
    .eq("id", user?.id);
  if (errorRpc) console.log(error);
  if (!dataRpc) throw new Error("No user data found");
  const userData = dataRpc[0];

  // get user projects info
  const { data: dataProjects, error: errorProjects } = await supabase.rpc(
    "projects_user_req",
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

  // get all users i have interected with, which means are in a project with me
  const { data: connectedUsers, error: errorConnectedUsers } =
    await supabase.rpc("get_connected_users", { my_user_id: user?.id });
  if (errorConnectedUsers) console.log(errorConnectedUsers);

  return {
    props: {
      avatar_url: data[0].avatar_url,
      user_data: userData,
      projectsChildren: projectsChildren,
      dataProjects: dataProjects,
      connectedUsers: connectedUsers,
    },
  };
};

export default function Profile({
  avatar_url,
  user_data,
  projectsChildren,
  dataProjects,
  connectedUsers,
}: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [userData, setUserData] = useState<any>(user_data);
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [xpNeeded, setXpNeeded] = useState<number>(0);
  const [denomination, setDenomination] = useState<string>("");

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function saveName() {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ name: name })
      .eq("id", user?.id);
    if (!error) {
      // console.log("Name updated");
    }

    setUserData({ ...userData, name: name });

    toggleModal();
  }

  useEffect(() => {
    setName(userData?.name);
    setLevel(userData?.level);
    setXp(userData?.xp);
    setXpNeeded(userData?.levels.xp_needed);
    setDenomination(userData?.levels.denomination);
  }, [userData]);

  const router = useRouter();

  function customizeAvatar() {
    const id = user?.id;
    // redirect to /avatar/[id]
    router.push(`/avatar/${id}`);
  }

  const avatarToRender = renderImage(avatar_url);

  console.log(connectedUsers);

  return (
    <Layout
      currentPage="profile"
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
      <div className="flex gap-x-2 flex-col gap-y-4 sm:flex-row">
        <div className="flex p-5 md:p-6 bg-white rounded-lg shadow-lg sm:w-3/5 w-full">
          <div className="w-2/5 flex flex-col justify-center items-center">
            <Image
              className="object-cover w-full rounded-lg"
              src={"data:image/svg+xml," + avatarToRender}
              alt="avatar"
              width={275}
              height={275}
              priority={true}
            />
            <button
              type="submit"
              className="flex w-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold 
              text-white shadow-sm hover:bg-contrasthover focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast mt-4"
              onClick={() => customizeAvatar()}
            >
              Customize me
            </button>
          </div>

          <div className="md:w-px mx-2 bg-gray-400 md:mx-4"></div>

          <div className="flex-grow p-6">
            <div className="flex items-center">
              <h3 className="text-black font-semibold text-lg">
                {userData?.name}
              </h3>
              <button
                className="flex items-center ml-4 mb-2"
                onClick={() => toggleModal()}
              >
                <FaPen />
              </button>
            </div>
            <div className="flex mt-2">
              <span className="inline-flex items-center rounded-full bg-primarygreen px-3 py-0.5 text-sm font-medium text-white">
                {denomination}
              </span>
            </div>
            <div className="flex mt-8 justify-center">
              <div className="flex items-center align-middle">
                <FaStar className="h-12 w-12 md:h-20 md:w-20 text-yellow-400 w-" />
                <span
                  className={`ml-5 text-black text-xl md:text-2xl ${blackOpsOne.className} text-center`}
                >
                  Level {level}
                </span>
              </div>
            </div>
            <div className="mt-10">
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                <div
                  className="h-4 bg-contrast rounded-full"
                  style={{ width: `${(xp / xpNeeded) * 100}%` }}
                ></div>
                <div className="flex justify-end text-xs text-gray-600 mt-2">
                  <span className="text-sm">
                    {xp} / {xpNeeded} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {showModal && (
            <ModalAddProject
              name={name}
              setName={setName}
              saveName={saveName}
              toggleModal={toggleModal}
            />
          )}
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-lg sm:w-2/5 justify-center w-full">
          <h3 className="text-xl font-bold">Trophies</h3>
          <div></div>
        </div>
      </div>

      <div className="flex gap-x-2 flex-col gap-y-4 sm:flex-row mt-8 md:h-96 h-fit">
        <div className="flex p-5 md:p-6 bg-white rounded-lg shadow-lg w-full md:flex-row flex-col">
          <div className="flex flex-col items-center md:w-1/4 justify-center">
            <h3 className="text-xl font-bold">Projects</h3>
            <div className={`flex flex-col gap-y-4 mt-4 overflow-y-scroll min-h-fit h-60 scroll ${dataProjects.length >= 6 ? "scrollbar" : ""}`}>
              {dataProjects.map((item: any) => (
                <div
                  className="flex flex-row rounded-lg border-2 border-gray-100 bg-white w-56
                  items-center p-2 justify-center h-12 hover:bg-gray-100 hover:cursor-pointer"
                  onClick={() => router.push(`/projects/${item.id}`)}
                  key={item.id}
                >
                  <span className="text-lg font-mono">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:w-1/4 w-full md:border-r-2 md:border-gray-200">
            <Image
              id="Business Analytics"
              className="w-72 h-auto flex-none py-3"
              src={"/business-analytics.svg"}
              alt="Business Analytics"
              width={100}
              height={100}
              priority
            />
          </div>

          <div className="flex flex-col items-center md:w-1/4 w-full justify-center md:mt-0 mt-16">
            <h3 className="text-xl font-bold">Connected Users</h3>
            <div className={`flex flex-col gap-y-4 mt-4 overflow-y-scroll min-h-fit h-60 scroll ${connectedUsers.length >= 6 ? "scrollbar" : ""}`}>
              {connectedUsers.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-row rounded-lg border-2 border-gray-100 bg-white w-56 items-center p-2"
                >
                  <dt className="flex flex-col items-center justify-center ">
                    <div className="px-2">
                      <Image
                        className="h-8 w-8 rounded-full border-2 border-xl border-gray-200"
                        alt="avatar"
                        src={
                          "data:image/svg+xml," + renderImage(item.avatar_url)
                        }
                        width={30}
                        height={30}
                      />
                    </div>
                  </dt>
                  {/* image */}
                  <div className="flex flex-col items-start ml-2 justify-center">
                    <div className="flex flex-row items-center">
                      <div className="ml-1 text-md font-medium text-gray-900 truncate md:w-28 w-16">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:w-1/4 w-full">
            <Image
              id="Connecting Teams"
              className="w-72 h-auto flex-none py-3"
              src={"/connecting-teams.svg"}
              alt="Connecting Teams"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
