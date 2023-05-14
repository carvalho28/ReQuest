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

  const { data: dataProjects2, error: errorProjects2 } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  return {
    props: {
      avatar_url: data[0].avatar_url,
      user_data: userData,
      projectsChildren: projectsChildren,
      dataProjects: dataProjects,
      dataProjects2: dataProjects2,
    },
  };
};

type ItemCarrousel = {
  label: string;
  value: number;
};

type ProjectInfo = {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  deadline: string;
  completed_reqs: number;
  total_reqs: number;
};

export default function Profile({
  avatar_url,
  user_data,
  projectsChildren,
  dataProjects,
  dataProjects2,
}: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  console.log("dataProjects: ", dataProjects);

  const [averageForecast, setAverageForecast] = useState<number>(0);

  useEffect(() => {
    const forecast: number[] = [];
    dataProjects.forEach((project: ProjectInfo) => {
      const today = new Date();
      const deadline = new Date(project.deadline);
      const createdAt = new Date(project.created_at);

      const totalDays =
        Math.floor(
          (deadline.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      const daysRemaining =
        Math.floor(
          (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      const completedRequirements = project.completed_reqs;
      const totalRequirements = project.total_reqs;

      let probability = 0;
      if (completedRequirements > 0) {
        const completionRatio =
          (completedRequirements + 1) / (totalRequirements + 1);
        const timeRatio = daysRemaining / totalDays;
        probability = completionRatio * timeRatio;
      } else {
        probability = daysRemaining / totalDays;
      }

      const probabilityPercentage = Math.round(probability * 100);

      forecast.push(probabilityPercentage);
    });
    setAverageForecast(forecast.reduce((a, b) => a + b, 0) / forecast.length);
    console.log("forecast: ", forecast);
  }, [dataProjects]);

  // useEffect(() => {
  //   console.log("forecast: ", forecast);
  // }, [forecast]);

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
      value: dataProjects2.filter(
        (project: any) => project.status.toLowerCase() === "active"
      ).length,
      name: "Active",
    },
    {
      value: dataProjects2.filter(
        (project: any) => project.status.toLowerCase() === "completed"
      ).length,
      name: "Completed",
    },
    {
      value: dataProjects2.filter(
        (project: any) => project.status.toLowerCase() === "on hold"
      ).length,
      name: "On hold",
    },
    {
      value: dataProjects2.filter(
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
      orient: "vertical",
      top: "30%",
      left: "10%",
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
            value: averageForecast,
            name: "Completion Progress",
          },
        ],
      },
    ],
  };

  function getGradientColor(percentage: number): string {
    const hue = ((percentage - 0) * 120) / (100 - 0);
    return `hsl(${hue}, 80%, 45%)`;
  }

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
            <div className="flex flex-wrap bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap flex-1 w-3/4">
          <div className="flex flex-row items-center justify-between w-full p-4 mt-4">
            <div className="flex-1 border-r-2 border-primaryblue">
              <h3 className="text-xl font-bold flex justify-center">
                Number of Projects
              </h3>
              <div className="flex flex-col justify-center items-center mt-2 text-lg">
                {nProjects}
              </div>
            </div>
            <div className="flex-1  border-r-2 border-primaryblue">
              <h3 className="text-xl font-bold flex justify-center">
                Req. Completed
              </h3>
              <div className="flex flex-col justify-center items-center mt-2 text-lg">
                {reqComplete}
              </div>
            </div>
            <div className="flex-1 border-r-2 border-primaryblue mr-8">
              <h3 className="text-xl font-bold flex justify-center">
                Forecast Accuracy
              </h3>
              <div
                style={{
                  height: "3em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1em",
                  marginLeft: "3em"
                }}
              >
                <div className="flex flex-row">
                  <ReactEChart
                    option={optionsGauge}
                    opts={{ renderer: "svg" }}
                    style={{
                      height: "10em",
                      width: "12em",
                      margin: "0 auto",
                    }}
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
                      marginLeft: "1.25em",
                    }}
                  >
                    <div
                      className="text-3xl font-extrabold"
                      style={{
                        color: getGradientColor(averageForecast),
                      }}
                    >
                      {/* {overall.toFixed(0)}% */}
                      {Math.round(averageForecast)} %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col justify-start items-center">
              <div className="text-3xl font-extrabold p-4">
                Projects by status
              </div>
              <ReactEChart
                option={option}
                style={{ height: "15em", width: "30em", margin: "0 auto" }}
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/4 items-center justify-center p-4">
          <Image
            id="No ranking"
            className="w-full h-full flex-none object-cover"
            src={"/milestones.svg"}
            alt="Cat"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    </Layout>
  );
}
