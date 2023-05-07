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

import ReactEChart from "echarts-for-react";

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
      avatar_url: data[0].avatar_url,
      user_data: userData,
      projectsChildren: projectsChildren,
      dataProjects: dataProjects,
    },
  };
};

type ItemCarrousel = {
  label: string;
  value: number;
};

export default function Profile({
  avatar_url,
  user_data,
  projectsChildren,
  dataProjects,
}: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  console.log("dataProjects: ", dataProjects);

  useEffect(() => {
    
  } , [dataProjects])

  const [userData, setUserData] = useState<any>(user_data);
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [reqComplete, setReqComplete] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [xpNeeded, setXpNeeded] = useState<number>(0);
  const [denomination, setDenomination] = useState<string>("");
  const [nProjects, setNProjects] = useState<number>(0);

  const itemsCarrousel: ItemCarrousel[] = [
    { label: "Requirements completed", value: reqComplete },
    { label: "Number of projects", value: nProjects },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrow = () => {
    setCurrentIndex(
      (currentIndex - 1 + itemsCarrousel.length) % itemsCarrousel.length
    );
  };

  const handleRightArrow = () => {
    setCurrentIndex((currentIndex + 1) % itemsCarrousel.length);
  };

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
    setReqComplete(userData?.requirements_completed);
    setLevel(userData?.level);
    setXp(userData?.xp);
    setXpNeeded(userData?.levels.xp_needed);
    setDenomination(userData?.levels.denomination);
    setNProjects(projectsChildren.length);
  }, [userData]);

  const router = useRouter();

  function customizeAvatar() {
    const id = user?.id;
    // redirect to /avatar/[id]
    router.push(`/avatar/${id}`);
  }

  const avatarToRender = renderImage(avatar_url);

  const dataGraph = [
    // get all the active projects, the completed, the on hold and the cancelled
    {
      value: dataProjects.filter(
        (project: any) => project.status.toLowerCase() === "active"
      ).length,
      name: "Active",
    },
    {
      value: dataProjects.filter(
        (project: any) => project.status.toLowerCase() === "completed"
      ).length,
      name: "Completed",
    },
    {
      value: dataProjects.filter(
        (project: any) => project.status.toLowerCase() === "on hold"
      ).length,
      name: "On hold",
    },
    {
      value: dataProjects.filter(
        (project: any) => project.status.toLowerCase() === "cancelled"
      ).length,
      name: "Cancelled",
    },
  ];

  // Charts
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Number of projects",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: dataGraph,
      },
    ],
  };

  const optionsGauge = {
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: [0, 0, 0, 0],
    },
    series: [
      {
        radius: "60%",
        center: ["50%", "75%"],
        itemStyle: {
          borderWidth: 0,
        },
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.333, "#FF6E76"],
              [0.666, "#FFD56E"],
              [1, "#5EE2A0"],
            ],
            shadowBlur: 0,
          },
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: "inherit",
          },
          length: 0,
        },
        axisLabel: {
          position: "bottom",
          distance: -60,
          show: true,
          formatter: function (value: any) {
            if (value === 0 || value === 100) {
              return value + "%";
            } else {
              return "";
            }
          },
          textStyle: {
            color: "inherit",
            fontSize: 14,
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "inherit",
          },
        },
        progress: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color: "inherit",
          show: false,
        },
        pointer: {
          show: true,
          icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
          itemStyle: {
            color: "#000",
          },
          length: "80%",
          widht: 1,
        },
        title: {
          show: false,
        },
        data: [
          {
            value: 50,
            name: "Completion Progress",
          },
        ],
      },
    ],
  };

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
      {/* <div className="flex gap-x-4 mt-8 flex-col sm:flex-row gap-y-8"> */}
      {/*   <div */}
      {/*     className="flex flex-col p-6 bg-white rounded-lg shadow-lg */}
      {/*     justify-center sm:w-1/3 w-full" */}
      {/*   > */}
      {/*     <h3 className="text-xl font-bold flex justify-center"> */}
      {/*       Global Stats */}
      {/*     </h3> */}
      {/*     <div className="flex flex-col justify-center items-center mt-8"> */}
      {/*       <div className="text-6xl font-extrabold"> */}
      {/*         {itemsCarrousel[currentIndex].value} */}
      {/*       </div> */}
      {/*       <div className="text-md mt-2 text-gray-700"> */}
      {/*         {itemsCarrousel[currentIndex].label} */}
      {/*       </div> */}
      {/*       <div className="flex justify-center items-center mt-8"> */}
      {/*         <RiArrowLeftCircleFill */}
      {/*           className="h-10 w-10 text-black mr-2 hover:cursor-pointer" */}
      {/*           onClick={() => handleLeftArrow()} */}
      {/*         /> */}
      {/*         <RiArrowRightCircleFill */}
      {/*           className="h-10 w-10 text-black ml-2 hover:cursor-pointer" */}
      {/*           onClick={() => handleRightArrow()} */}
      {/*         /> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </div> */}

      {/*   <div className="flex p-6 bg-white rounded-lg shadow-lg justify-center sm:w-1/3 w-full"> */}
      {/*     <h3 className="text-xl font-bold flex justify-center">Teams</h3> */}
      {/*   </div> */}

      {/*   <div */}
      {/*     className="flex p-6 bg-white rounded-lg shadow-lg */}
      {/*     justify-start sm:w-1/3 w-full flex-col" */}
      {/*   > */}
      {/*     <h3 className="text-xl font-bold flex justify-center">Projects</h3> */}
      {/*     <div className="flex flex-col justify-center items-center mt-8"> */}
      {/*       {dataProjects.map((project: any) => ( */}
      {/*         <div */}
      {/*           className="flex flex-col bg-gray-50 py-3 px-10 rounded-xl" */}
      {/*           key={project.id} */}
      {/*         > */}
      {/*           {/* scg with first letter of project.name */}
      {/*           <div className="text-lg font-medium text-gray-900"> */}
      {/*             {project.name} */}
      {/*           </div> */}
      {/*           <div className="text-sm text-gray-500"> */}
      {/*             {project.description} */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="flex gap-x-4 mt-8 h-full bg-white rounded-lg shadow-lg flex-col">
        <div className="flex flex-row border-b-primaryblue border-2">
          <div className="flex flex-col p-6 justify-center sm:w-1/4 w-full">
            <h3 className="text-xl font-bold flex justify-center">Projects</h3>
            <div className="flex flex-col justify-center items-center mt-2 text-lg">
              {nProjects}
            </div>
          </div>
          <div className="flex flex-col p-6 justify-center sm:w-1/4 w-full">
            <h3 className="text-xl font-bold flex justify-center">
              Req. Completed
            </h3>
            <div className="flex flex-col justify-center items-center mt-2 text-lg">
              {reqComplete}
            </div>
          </div>
          <div className="flex flex-col p-6 justify-center sm:w-1/2 w-full">
            <h3 className="text-xl font-bold flex justify-center">
              Completion Progress
            </h3>
            <div
              style={{
                height: "3em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1em",
              }}
            >
              <div className="flex flex-row">
                <ReactEChart
                  option={optionsGauge}
                  opts={{ renderer: "svg" }}
                  style={{ height: "10em", width: "16em", margin: "0 auto" }}
                />

                <div
                  style={{
                    height: "10em",
                    width: "10em",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "1em",
                    marginLeft: "-2em",
                  }}
                >
                  <div
                    className="text-2xl font-extrabold"
                    style={{
                      color: "#3B82F6",
                    }}
                  >
                    50%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex p-6 w-2/3 justify-center">
            {/* render an echart, pie format */}
            <div className="flex flex-col justify-start items-center">
              <div className="text-3xl font-extrabold p-4">
                Projects by status
              </div>
              <ReactEChart option={option} className="h-full w-full" />
            </div>
          </div>
          <div className="flex p-6 w-1/3 justify-center items-center">
            <Image
              id="No ranking"
              className="w-96 h-auto flex-none py-3"
              src={"/milestones.svg"}
              alt="Cat"
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
