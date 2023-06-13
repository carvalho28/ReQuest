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
    "In a future world, objects have evolved to become highly advanced and integral to everyday life. These new objects hold immense power and influence over society, shaping the way people live, work, and interact with each other. The first object is a revolutionary AI system with unparalleled intelligence and problem-solving capabilities. It quickly establishes itself as the ultimate authority in fields ranging from medicine to politics. The second object is a breakthrough in energy production, enabling humans to harness clean and sustainable sources of power like never before. This technology revolutionizes the way we live and work, providing energy independence and reducing our dependence on fossil fuels. The third object is a powerful new tool in the fight against disease. Using nanotechnology, it can detect and treat illnesses at a microscopic level, targeting even the most stubborn infections with incredible precision and speed. The fourth and final object is the key to unlocking humanity's potential in space. With this new technology, we can explore the furthest reaches of the cosmos, expanding our understanding of the universe and perhaps even discovering new forms of life. Together, these objects shape a world where humanity has achieved unprecedented levels of advancement and exploration. It is a world where we have conquered our greatest challenges and unlocked the secrets of the universe."
  );

  const [loading, setLoading] = useState<boolean>(false);
  // const [requirements, setRequirements] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([
    "The AI system must be able to solve problems in a variety of fields.",
    "The AI system must be able to solve problems in a variety of fields.",
  ]);

  const generateScenario = async () => {
    if (value.length === 0) return;
    console.log(value);
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

  // Joyride
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    setSteps([
      {
        target: ".keywords",
        content: "Select keywords that you want to use to generate a scenario",
        disableBeacon: true,
      },
      {
        target: ".btn",
        content: "Click here to generate a scenario",
        disableBeacon: true,
      },
    ]);
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
                <div className="flex flex-col items-center justify-center  w-full mb-8">
                  {requirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-center w-full p-2"
                    >
                      <RiArrowRightFill className="text-2xl text-gray-800 mr-2" />
                      {requirement}
                    </div>
                  ))}
                </div>
              )}

              {/* input text to verify if it is a requirement for the scenario */}
              <div className="flex flex-row items-center w-full">
                <textarea
                  className="w-full h-10 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  placeholder="Type your requirement here"
                ></textarea>

                <label htmlFor="my_modal_6" className="btn ml-5 text-whitepages hover:text-contrasthover bg-contrast
                  border-0 hover:bg-purple-200">
                  Verify
                </label>
              </div>
            </div>
          )}
        </div>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">This modal works with a hidden checkbox!</p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
