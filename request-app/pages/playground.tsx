import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import MultiSelectKeywords from "@/components/MultiSelectKeywords";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
// RiCornerUpRightFill
import { RiArrowRightFill } from "react-icons/ri";
import ErrorMessage from "@/components/ErrorMessage";

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

export interface Option {
  readonly label: string;
  readonly value: string;
}

export default function Playground({ avatar_url, projectsChildren }: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [value, setValue] = useState<readonly Option[]>([]);
  // const [scenario, setScenario] = useState<string>("");
  const [scenario, setScenario] = useState<string>(
    "In the foreseeable future, the world is becoming increasingly interconnected. The first object represents the rise of artificial intelligence and automation in various industries, leading to the creation of new jobs and the displacement of others. The second object represents the continued growth of renewable energy sources and their adoption on a global scale in response to climate change. The third object represents the increasing use of virtual reality and augmented reality technologies in entertainment, education, and communication. The fourth object represents the growing importance of data privacy and security in the digital age, leading to new regulations and standards. As these trends continue to evolve, they will shape the world we live in and the way we interact with each other and our environment."
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  // const [requirements, setRequirements] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([
    "The AI system must be able to solve problems in a variety of fields.",
    "The system must be able to learn from its mistakes and improve over time.",
  ]);
  const [error, setError] = useState<string>("");

  const [requirement, setRequirement] = useState<string>("");
  const [AIanswer, setAIanswer] = useState<string>("");

  const generateScenario = async () => {
    if (value.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch(
        // "https://morning-flower-3545.fly.dev/api/ai/functional",
        "http://localhost:8080/api/ai/ltfs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: value,
          }),
        }
      );

      // if there was an error, then return
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      let answer = data.answer;
      console.log(answer);
      setLoading(false);
      setScenario(answer);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
  };

  const [show, setShow] = useState<boolean>(false);

  const verifyRequirement = async () => {
    if (scenario === "") return;
    if (requirement === "") {
      setError("Please enter a requirement");
      return;
    }
    console.log(scenario);
    setLoadingAI(true);
    setShow(true);
    setError("");
    try {
      const response = await fetch(
        // "https://morning-flower-3545.fly.dev/api/ai/functional",
        "http://localhost:8080/api/ai/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scenario: scenario,
            requirement: requirement,
          }),
        }
      );

      // if there was an error, then return
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      let answer = data.answer;
      console.log(answer);
      setLoadingAI(false);
      // setRequirements([...requirements, requirement]);
      setAIanswer(answer);
      if (answer.toLowerCase().includes("yes")) {
        setRequirement("");
        setRequirements([...requirements, requirement]);
      }
    } catch (err) {
      console.log(err);
      setLoadingAI(false);
      return;
    }
  };

  // Joyride
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    // verify if steps have been completed before on local storage
    const isVisited = localStorage.getItem("playground");
    if (isVisited !== "true") {
      setSteps([
        {
          target: ".keywords",
          content:
            "Select keywords that you want to use to generate a scenario",
          disableBeacon: true,
        },
        {
          target: ".btn",
          content: "Click here to generate a scenario",
          disableBeacon: true,
        },
      ]);
      console.log("set steps");
      console.log(steps);
      localStorage.setItem("playground", "true");
    }
  }, []);

  return (
    <div>
      <Layout
        currentPage="Playground"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        {steps.length > 0 && (
          <Joyride
            continuous={true}
            steps={steps}
            showProgress={true}
            showSkipButton={true}
            styles={{
              options: {
                arrowColor: "#8e8e8e",
                primaryColor: "#845EC2",
                textColor: "#000",
                // buttons purple
              },
            }}
          />
        )}
        <div className="flex flex-wrap bg-white rounded-lg shadow-lg justify-center items-center pb-5">
          <div className="flex flex-col items-center w-3/5 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4">
              Scenario generator using keywords
            </h1>
            <MultiSelectKeywords
              value={value}
              setValue={setValue}
              onChange={() => {}}
            />
            <button
              className="btn text-whitepages hover:text-contrasthover bg-contrast border-0 hover:bg-purple-200 truncate mt-6"
              onClick={generateScenario}
            >
              Generate
            </button>
          </div>

          <div className="flex flex-col items-center w-3/5 p-4">
            {loading && <Loading />}
            {scenario !== "" && (
              <>
                <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
                  Generated scenario
                </h1>
                <article className="prose-base text-justify bg-gray-50 rounded-lg px-8 py-4">
                  <p>{scenario}</p>
                </article>
              </>
            )}
          </div>

          {scenario !== "" && (
            <div className="flex flex-col items-center justify-center w-3/5 p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
                Requirements
              </h1>

              {/* requirements already verified */}
              {requirements.length > 0 && (
                <div className="flex flex-col items-center justify-center w-full mb-8">
                  {requirements.map((requirement, index) => (
                    <div className="flex flex-row" key={index}>
                      <RiArrowRightFill className="text-2xl text-gray-800 mr-2 mt-2" />
                      <div
                        key={index}
                        className="flex flex-row items-center justify-center w-full p-2"
                      >
                        {requirement}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* input text to verify if it is a requirement for the scenario */}
              <div className="flex flex-row items-center w-full">
                <textarea
                  className="w-full h-10 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  placeholder="Type your requirement here"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                ></textarea>

                <label
                  htmlFor="my_modal_6"
                  className="btn ml-5 text-whitepages hover:text-contrasthover bg-contrast
                  border-0 hover:bg-purple-200"
                  onClick={verifyRequirement}
                >
                  Verify
                </label>
              </div>
              <div className="flex flex-row items-center justify-center w-full mt-4">
                {error && (
                  <ErrorMessage message="Error while verifying the requirement" />
                )}
              </div>
            </div>
          )}
        </div>
        {show && (
          <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
              {AIanswer !== "" ? (
                <div className="modal-box text-center">
                  {/* <h3 className="font-bold text-lg"> */}
                  <h3
                    className={`font-bold text-2xl ${
                      AIanswer.toLowerCase().includes("yes")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {AIanswer.toLowerCase().includes("yes") ? "Yes!" : "No!"}
                  </h3>
                  <p className="py-4 text-justify">{AIanswer}</p>
                  <div className="modal-action">
                    <label
                      htmlFor="my_modal_6"
                      className={`btn text-whitepages hover:text-contrasthover bg-contrast
                                  border-0 hover:bg-purple-200`}
                    >
                      Close!
                    </label>
                  </div>
                </div>
              ) : (
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    AI is thinking... Please wait!
                  </h3>
                  <Loading />
                </div>
              )}
            </div>
          </>
        )}
      </Layout>
    </div>
  );
}
