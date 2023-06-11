import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import MultiSelectKeywords from "@/components/MultiSelectKeywords";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
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
  const [scenario, setScenario] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(value);
  }, [value]);

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
      return;
    }
  };

  return (
    <div>
      <Layout
        currentPage="Playground"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        <div className="flex flex-wrap bg-white rounded-lg shadow-lg justify-center items-center">
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
        </div>
      </Layout>
    </div>
  );
}
