import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import MultiSelectKeywords from "@/components/MultiSelectKeywords";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import { RiArrowRightFill, RiFileCopyLine } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import ErrorMessage from "@/components/ErrorMessage";

export interface Option {
  readonly label: string;
  readonly value: string;
}

/**
 * Playground page
 * @description The playground page is where the user can test the AI to generate a scenario and verify a requirements
 * @param avatar_url - The avatar url of the user
 * @param projectsChildren - The projects of the user
 * @returns playground page
 */
export default function Playground({ avatar_url, projectsChildren }: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [value, setValue] = useState<readonly Option[]>([]);
  const [scenario, setScenario] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  // const [requirements, setRequirements] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const [requirement, setRequirement] = useState<string>("");
  const [AIanswer, setAIanswer] = useState<string>("");

  const generateScenario = async () => {
    if (value.length === 0) return;
    setLoading(true);
    setScenario("");
    const keywords = value.map((option) => option.value);
    try {
      const response = await fetch(
        "https://morning-flower-3545.fly.dev/api/ai/ltfs",
        // "http://localhost:8080/api/ai/ltfs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: keywords,
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
    setAIanswer("");
    setShow(true);
    setError("");
    try {
      const response = await fetch(
        "https://morning-flower-3545.fly.dev/api/ai/verify",
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

  function handleInput(event: any) {
    setRequirement(event.target.value);
    event.target.style.height = "auto"; // reset the height to auto to recalculate the number of rows
    event.target.style.height = `${Math.min(
      event.target.scrollHeight,
      5 * 20
    )}px`; // set the height based on the number of rows and a row height of 20px

    // adjust the height of the chat-messages container based on the number of rows
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
      chatMessages.style.height = `calc(100% - ${event.target.style.height})`;
    }
  }

  const [toast, setToast] = useState<boolean>(false);

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
          {/* trash icon to reset on top right */}
          <div className="flex justify-end w-full">
            <FaTrashAlt
              className="text-gray-800 mr-4 mt-4 cursor-pointer md:h-10 md:w-10 w-4 h-4 hover:text-red-500"
              onClick={() => {
                setScenario("");
                setRequirements([]);
                setRequirement("");
                setAIanswer("");
                setValue([]);
                setShow(false);
              }}
            />
          </div>

          <div className="flex flex-col items-center md:w-3/5 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Keywords</h1>
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

          <div className="flex flex-col items-center md:w-3/5 md:p-4">
            {loading && <Loading />}
            {scenario !== "" && (
              <>
                <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
                  Generated Scenario
                </h1>
                <article className="prose-base text-justify bg-gray-50 rounded-lg">
                  {/* button to copy the full scenario */}
                  {scenario !== "" && (
                    <div className="flex flex-row items-center w-full justify-end">
                      <button
                        className="btn text-whitepage border-0 md:hover:bg-purple-200 bg-transparent truncate"
                        onClick={() => {
                          console.log("copying to clipboard");
                          setToast(true);
                          navigator.clipboard.writeText(scenario);
                          setTimeout(() => {
                            setToast(false);
                          }, 3000);
                        }}
                        title="Copy to clipboard"
                      >
                        <RiFileCopyLine className="md:w-5 md:h-5 h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="md:px-8 px-2 -mt-0">{scenario}</p>
                </article>
              </>
            )}
          </div>

          {scenario !== "" && (
            <div className="flex flex-col md:w-3/5 p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6 items-center text-center">
                Requirements
              </h1>

              {/* requirements already verified */}
              {requirements.length > 0 && (
                <div className="flex flex-col justify-center w-full mb-8">
                  {requirements.map((requirement, index) => (
                    <div className="flex flex-row items-start" key={index}>
                      <RiArrowRightFill className="text-2xl text-gray-800 mr-2 mt-2" />
                      <div
                        key={index}
                        className="flex flex-row text-justify w-full p-2"
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
                  rows={2}
                  name="message"
                  id="message"
                  className="block w-full text-gray-900 px-4 ring-0 border-1 border-gray-300 
            focus:outline-none resize-none h-auto bg-gray-100 rounded-md
            py-1 ml-2 overflow-y-scroll md:text-lg text-sm"
                  placeholder="Type a requirement..."
                  value={requirement}
                  onChange={handleInput}
                />

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
        {toast && (
          <div className="toast toast-center">
            <div className="alert">
              <span>Scenario copied to clipboard!</span>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

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
