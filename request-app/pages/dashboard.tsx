import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import Image from "next/image";
import { Fireworks } from "fireworks-js";
import ReactEChart from "echarts-for-react";

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

  const { data: dataProjects2, error: errorProjects2 } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  return {
    props: {
      avatar_url: data[0].avatar_url,
      projectsChildren: projectsChildren,
      dataProjects: dataProjects,
      userData: userData,
      dataProjects2: dataProjects2,
    },
  };
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

export default function Dashboard({
  avatar_url,
  projectsChildren,
  dataProjects,
  dataProjects2,
  userData,
}: any) {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [reqComplete, setReqComplete] = useState<number>(0);
  const [nProjects, setNProjects] = useState<number>(0);
  const [averageForecast, setAverageForecast] = useState<number>(0);

  const [recentRequirements, setRecentRequirements] = useState<any[]>([]);
  const [projectNMonths, setProjectNMonths] = useState<any[]>([]);
  const [nMonths, setNMonths] = useState<number>(1);

  const getProjectNMonths = async (num_months: number) => {
    const { data, error } = await supabaseClient.rpc(
      "get_user_projects_within_months",
      { user_id: userData.id, num_months: num_months }
    );
    if (error) console.log(error);
    if (!data) {
      console.log("No data found");
    }
    console.log(data);
    setProjectNMonths(data);
  };

  useEffect(() => {
    setReqComplete(userData?.requirements_completed);
    setNProjects(projectsChildren.length);
    console.log(userData);

    const getRecentRequirements = async () => {
      const { data, error } = await supabaseClient.rpc(
        "get_latest_closed_requirements",
        { user_id: userData.id }
      );
      if (error) console.log(error);
      if (!data) throw new Error("No data found");
      // console.log(data);
      setRecentRequirements(data);
    };
    getRecentRequirements();
    getProjectNMonths(1);
  }, [user]);

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
    const averageForecastCalc =
      forecast.reduce((a, b) => a + b, 0) / forecast.length;
    setAverageForecast(averageForecastCalc < 0 ? 0 : averageForecastCalc);
  }, [dataProjects]);

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

  // Charts
  const optionMobile = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      top: "80%",
      // left: "10%",
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

  const greetingsMessage = (name: string) => {
    const date = new Date();
    const hour = date.getHours();
    let greeting = "";

    if (hour < 12) {
      greeting = "Good Morning";
    } else if (hour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    if (user === undefined || name === undefined) {
      return greeting + "!";
    } else {
      return greeting + ", " + name.split(" ")[0] + "!";
    }
  };

  const handleRowRequirementClick = (requirement: any) => {
    const url = `/projects/${requirement.project_id}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    getProjectNMonths(nMonths);
  }, [nMonths]);

  return (
    <Layout
      currentPage="dashboard"
      avatar_url={avatar_url}
      projectChildren={projectsChildren}
    >
      <h1 className="text-2xl font-bold text-gray-700 mt-10 mb-4">
        {greetingsMessage(userData?.name)}
      </h1>

      <div className="flex gap-x-4 mt-8 flex-col md:flex-row gap-y-8">
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg justify-center md:w-1/2 w-full">
          <h3 className="text-xl font-bold flex justify-center items-center text-center">
            Recent Closed Requirements
          </h3>
          <div className="overflow-x-auto w-full mt-4">
            <table className="table w-full">
              <thead>
                <tr className="text-md">
                  <th className="text-lg">Requirement</th>
                  <th>Project</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequirements.map((requirement) => (
                  <tr
                    key={requirement.id}
                    className="hover cursor-pointer"
                    onClick={() => handleRowRequirementClick(requirement)}
                  >
                    <td>
                      <div className="md:w-64 w-32 truncate">
                        {requirement.requirement_name}
                      </div>
                    </td>
                    <td>{requirement.project_name}</td>
                    <td>{requirement.closed_at.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <Image
              id="Requirements Closed"
              className="w-36 h-auto flex-none py-3"
              src={"/closed-req.svg"}
              alt="Requirements Closed"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg md:w-1/2 w-full">
          <div className="flex flex-row items-center justify-center space-x-2">
            <h3 className="text-xl font-bold flex justify-center">
              Projects Ending in
            </h3>
            <select
              className="select select-bordered w-15"
              onChange={(e) => setNMonths(parseInt(e.target.value))}
            >
              <option selected>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <h3 className="text-xl font-bold flex justify-center">Months</h3>
          </div>
          <div className="overflow-x-auto w-full mt-4">
            <table className="table w-72 mx-auto">
              <thead>
                <tr className="">
                  <th>Project</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {projectNMonths.map((requirement) => (
                  <tr
                    key={requirement.id}
                    className="hover cursor-pointer"
                    onClick={() => handleRowRequirementClick(requirement)}
                  >
                    <td>
                      <div className="truncate">{requirement.project_name}</div>
                    </td>
                    <td>{requirement.deadline.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <Image
              id="Requirements Closed"
              className="w-36 h-auto flex-none py-3"
              src={"/time-deadline.svg"}
              alt="Requirements Closed"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>

      <div className="md:flex flex-wrap bg-white rounded-lg shadow-lg hidden mt-5">
        <div className="flex flex-wrap flex-1 w-full md:w-3/4">
          <div
            className="flex md:flex-row flex-col md:gap-y-0 gap-y-10 items-center justify-between
                          w-full p-4 mt-4"
          >
            <div className="flex-1 md:border-r-2 md:border-primaryblue">
              <h3 className="text-xl font-bold flex justify-center">
                Number of Projects
              </h3>
              <div className="flex flex-col justify-center items-center mt-2 text-lg">
                {nProjects}
              </div>
            </div>
            <div className="flex-1 md:border-r-2 md:border-primaryblue">
              <h3 className="text-xl font-bold flex justify-center">
                Req. Completed
              </h3>
              <div className="flex flex-col justify-center items-center mt-2 text-lg">
                {reqComplete}
              </div>
            </div>
            <div className="flex-1 md:border-r-2 md:border-primaryblue md:mr-8">
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
                  marginLeft: "3em",
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
        <div className="flex md:w-1/4 w-full items-center justify-center p-4">
          <Image
            id="milestones"
            className="w-full h-full flex-none object-cover"
            src={"/milestones.svg"}
            alt="Milestones"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>

      {/* mobile */}

      <div className="md:hidden flex-wrap bg-white rounded-lg shadow-lg flex">
        <div className="flex flex-col justify-start items-center text-center w-full p-4 mt-4">
          <h3 className="text-xl font-bold">Number of Projects</h3>
          <div className="flex flex-col justify-center items-center mt-2 text-lg ">
            {nProjects}
          </div>

          <div className="border-b-2 border-primaryblue w-10/12 mt-2"></div>

          <h3 className="mt-6 text-xl font-bold flex justify-center">
            Req. Completed
          </h3>
          <div className="flex flex-col justify-center items-center mt-2 text-lg">
            {reqComplete}
          </div>

          <div className="border-b-2 border-primaryblue w-10/12 mt-2"></div>

          <div className="mt-6">
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
                marginTop: "1em",
                marginLeft: "5em",
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

          <div className="border-b-2 border-primaryblue w-10/12 mt-4"></div>

          <div className="p-6">
            <div className="flex flex-col justify-start items-center">
              <div className="text-3xl font-extrabold p-4">
                Projects by status
              </div>
              <ReactEChart
                option={optionMobile}
                style={{
                  height: "25em",
                  width: "14em",
                  margin: "0 auto",
                  marginTop: "-7em",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
