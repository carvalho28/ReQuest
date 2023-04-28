import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";

// avatar imports
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { SkinSVG, HairSVG } from "@/components/SVGComponents";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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

type HairType =
  | "bald"
  | "balding"
  | "beanie"
  | "bobBangs"
  | "bobCut"
  | "bunUndercut"
  | "buzzcut"
  | "cap"
  | "curly"
  | "curlyBun"
  | "curlyHighTop"
  | "extraLong"
  | "fade"
  | "long"
  | "mohawk"
  | "pigtails"
  | "shortCombover"
  | "shortComboverChops"
  | "sideShave"
  | "straightBun";

const hairTypes: HairType[] = [
  "bald",
  "balding",
  "beanie",
  "bobBangs",
  "bobCut",
  "bunUndercut",
  "buzzcut",
  "cap",
  "curly",
  "curlyBun",
  "curlyHighTop",
  "extraLong",
  "fade",
  "long",
  "mohawk",
  "pigtails",
  "shortCombover",
  "shortComboverChops",
  "sideShave",
  "straightBun",
];

export default function Profile({ avatar_url, projectsChildren }: any) {
  const [skinColor, setSkinColor] = useState("#F2AD98");
  const [hairType, setHairType] = useState<HairType>("bald");
  const [hairTypeId, setHairTypeId] = useState(0);
  const [hairColor, setHairColor] = useState("#362C47");

  const avatar = createAvatar(personas, {
    // remove hash from skin
    skinColor: [`${skinColor}`.replace("#", "")],
    hair: [hairType],
    hairColor: [`${hairColor}`.replace("#", "")],
    radius: 50,
  });

  const svgData = encodeURIComponent(avatar.toString());

  const changeSkinColor = (color: string) => {
    setSkinColor(color);
  };

  // change hair type using the buttons, left goes on type
  const changeHairType = (direction: "left" | "right") => {
    let newHairTypeId;
    if (direction === "left") {
      newHairTypeId = hairTypeId === 0 ? hairTypes.length - 1 : hairTypeId - 1;
    } else {
      newHairTypeId = hairTypeId === hairTypes.length - 1 ? 0 : hairTypeId + 1;
    }
    setHairTypeId(newHairTypeId);
    setHairType(hairTypes[newHairTypeId]);
  };

  // change hair color
  const changeHairColor = (color: string) => {
    setHairColor(color);
  };

  useEffect(() => {
    console.log(hairType);
    console.log(hairTypeId);
  }, [hairType]);

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
            <div className="text-center">
              <SkinSVG color={skinColor} />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FFCC22" }}
                onClick={() => changeSkinColor("#FFCC22")}
              >
                {skinColor === "#FFCC22" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FBD2C7" }}
                onClick={() => changeSkinColor("#FBD2C7")}
              >
                {skinColor === "#FBD2C7" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F2AD9B" }}
                onClick={() => changeSkinColor("#F2AD9B")}
              >
                {skinColor === "#F2AD9B" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E58F7B" }}
                onClick={() => changeSkinColor("#E58F7B")}
              >
                {skinColor === "#E58F7B" && "✔"}
              </button>

              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E4A070" }}
                onClick={() => changeSkinColor("#E4A070")}
              >
                {skinColor === "#E4A070" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#B16A5B" }}
                onClick={() => changeSkinColor("#B16A5B")}
              >
                {skinColor === "#B16A5B" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#92594B" }}
                onClick={() => changeSkinColor("#92594B")}
              >
                {skinColor === "#92594B" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#623D36" }}
                onClick={() => changeSkinColor("#623D36")}
              >
                {skinColor === "#623D36" && "✔"}
              </button>

              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#C9E6DC" }}
                onClick={() => changeSkinColor("#C9E6DC")}
              >
                {skinColor === "#C9E6DC" && "✔"}
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start flex-col h-60 items-center">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              hair
            </h3>
            <div className="flex flex-row">
              <button onClick={() => changeHairType("left")}>
                <RiArrowLeftSLine className="w-10 h-10" />
              </button>
              <HairSVG hairType={hairType} color={hairColor} />
              <button onClick={() => changeHairType("right")}>
                <RiArrowRightSLine className="w-10 h-10" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#362C47" }}
                onClick={() => changeHairColor("#362C47")}
              >
                {hairColor === "#362C47" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#675E97" }}
                onClick={() => changeHairColor("#675E97")}
              >
                {hairColor === "#675E97" && "✔"}
              </button>

              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#5AC4D4" }}
                onClick={() => changeHairColor("#5AC4D4")}
              >
                {hairColor === "#5AC4D4" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#DEE1FF" }}
                onClick={() => changeHairColor("#DEE1FF")}
              >
                {hairColor === "#DEE1FF" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#6C4545" }}
                onClick={() => changeHairColor("#6C4545")}
              >
                {hairColor === "#6C4545" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F29C65" }}
                onClick={() => changeHairColor("#F29C65")}
              >
                {hairColor === "#F29C65" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E16381" }}
                onClick={() => changeHairColor("#E16381")}
              >
                {hairColor === "#E16381" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E15C66" }}
                onClick={() => changeHairColor("#E15C66")}
              >
                {hairColor === "#E15C66" && "✔"}
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              facial hair
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#362C47" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#675E97" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#5AC4D4" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#DEE1F5" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#6C4545" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F29C65" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E16381" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
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
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#456DFF" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#5A45FF" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#6DBB58" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F55D81" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#7555CA" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E24553" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#54D7D7" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F3B63A" }}
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
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              Background
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#93A7FF" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#A9E775" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FF7A9A" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#B379F7" }}
              ></button>

              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FF6674" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#89E6E4" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FFCC65" }}
              ></button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F8FBFF" }}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
