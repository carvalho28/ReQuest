import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";

// avatar imports
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import {
  SkinSVG,
  HairSVG,
  FacialHairSVG,
  BodySVG,
  EyesSVG,
  MouthSVG,
  NoseSVG,
} from "@/components/SVGComponents";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import {
  EyesType,
  FacialHairType,
  HairType,
  MouthTypes,
  NoseType,
  eyesTypes,
  facialHairTypes,
  hairTypes,
  mouthTypes,
  noseTypes,
} from "@/components/avatars/types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

/**
 * Profile page
 * @description It allows the user to see his profile and edit it
 * @param avatar_url - the avatar url of the user
 * @param projectsChildren - the projects of the user
 * @returns Returns the Profile page
 */
export default function Profile({ avatar_url, projectsChildren }: any) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const router = useRouter();

  const [skinColor, setSkinColor] = useState("#" + avatar_url.skinColor[0]);

  const [hairType, setHairType] = useState<HairType>(avatar_url.hair[0]);
  const [hairTypeId, setHairTypeId] = useState(0);
  const [hairColor, setHairColor] = useState("#" + avatar_url.hairColor[0]);

  const [facialHairType, setFacialHairType] = useState<FacialHairType>(
    avatar_url.facialHair[0]
  );
  const [facialHairProbability, setFacialHairProbability] = useState(
    avatar_url.facialHairProbability
  );
  const [facialHairTypeId, setFacialhairTypeId] = useState(0);
  const [facialHairColor, setFacialHairColor] = useState(
    "#" + avatar_url.hairColor[0]
  );

  const [clothingColor, setClothingColor] = useState(
    "#" + avatar_url.clothingColor[0]
  );

  const [eyesType, setEyesType] = useState<EyesType>(avatar_url.eyes[0]);
  const [eyesTypeId, setEyesTypeId] = useState(0);

  const [mouthType, setMouthType] = useState<MouthTypes>(avatar_url.mouth[0]);
  const [mouthTypeId, setMouthTypeId] = useState(0);

  const [noseType, setNoseType] = useState<NoseType>(avatar_url.nose[0]);
  const [noseTypeId, setNoseTypeId] = useState(0);

  const [backgroundColor, setBackgroundColor] = useState(
    "#" + avatar_url.backgroundColor
  );

  const [avatarObject, setAvatarObject] = useState<objectAvatar>();

  const changeSkinColor = (color: string) => {
    console.log(color);
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
    setFacialHairColor(color);
  };

  const changeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  const changeFacialHairType = (direction: "left" | "right") => {
    let newFacialHairTypeId;
    if (direction === "left") {
      newFacialHairTypeId =
        facialHairTypeId === 0
          ? facialHairTypes.length - 1
          : facialHairTypeId - 1;
    } else {
      newFacialHairTypeId =
        facialHairTypeId === facialHairTypes.length - 1
          ? 0
          : facialHairTypeId + 1;
    }
    setFacialhairTypeId(newFacialHairTypeId);
    setFacialHairType(facialHairTypes[newFacialHairTypeId][0]);
    setFacialHairProbability(facialHairTypes[newFacialHairTypeId][1]);
  };

  const changeFacialHairColor = (color: string) => {
    setFacialHairColor(color);
  };

  const changeBodyColor = (color: string) => {
    setClothingColor(color);
  };

  const changeEyesType = (direction: "left" | "right") => {
    const newEyesTypeId =
      direction === "left"
        ? (eyesTypeId - 1 + eyesTypes.length) % eyesTypes.length
        : (eyesTypeId + 1) % eyesTypes.length;

    setEyesTypeId(newEyesTypeId);
    setEyesType(eyesTypes[newEyesTypeId]);
  };

  const changeMouthType = (direction: "left" | "right") => {
    const newMouthTypeId =
      direction === "left"
        ? (mouthTypeId - 1 + mouthTypes.length) % mouthTypes.length
        : (mouthTypeId + 1) % mouthTypes.length;

    setMouthTypeId(newMouthTypeId);
    setMouthType(mouthTypes[newMouthTypeId]);
  };

  const changeNoseType = (direction: "left" | "right") => {
    const newNoseTypeId =
      direction === "left"
        ? (noseTypeId - 1 + noseTypes.length) % noseTypes.length
        : (noseTypeId + 1) % noseTypes.length;

    setNoseTypeId(newNoseTypeId);
    setNoseType(noseTypes[newNoseTypeId]);
  };

  const [svgData, setSvgData] = useState<string | null>("");

  // change svgData when avatar changes
  useEffect(() => {
    const avatar = createAvatar(personas, {
      skinColor: [`${skinColor}`.replace("#", "")],
      hair: [hairType],
      hairColor: [`${hairColor}`.replace("#", "")],
      facialHair: [facialHairType],
      facialHairProbability: facialHairProbability,
      body: ["squared"],
      clothingColor: [`${clothingColor}`.replace("#", "")],
      eyes: [eyesType],
      mouth: [mouthType],
      nose: [noseType],
      backgroundColor: [`${backgroundColor}`.replace("#", "")],
      radius: 50,
    });
    if (avatar) {
      setSvgData(encodeURIComponent(avatar.toString()));
      setAvatarObject({
        skinColor: [`${skinColor}`.replace("#", "")],
        hair: [hairType],
        hairColor: [`${hairColor}`.replace("#", "")],
        facialHair: [facialHairType],
        facialHairProbability: facialHairProbability,
        body: ["squared"],
        clothingColor: [`${clothingColor}`.replace("#", "")],
        eyes: [eyesType],
        mouth: [mouthType],
        nose: [noseType],
        backgroundColor: [`${backgroundColor}`.replace("#", "")],
        radius: 50,
      });
    }
  }, [
    hairType,
    hairColor,
    facialHairProbability,
    skinColor,
    facialHairType,
    clothingColor,
    eyesType,
    mouthType,
    noseType,
    backgroundColor,
  ]);

  async function downloadAvatar() {
    const avatar = createAvatar(personas, {
      skinColor: [`${skinColor}`.replace("#", "")],
      hair: [hairType],
      hairColor: [`${hairColor}`.replace("#", "")],
      facialHair: [facialHairType],
      facialHairProbability: facialHairProbability,
      body: ["squared"],
      clothingColor: [`${clothingColor}`.replace("#", "")],
      eyes: [eyesType],
      mouth: [mouthType],
      nose: [noseType],
      backgroundColor: [`${backgroundColor}`.replace("#", "")],
      radius: 50,
    });
    if (!avatar) return;
    avatar.toFile("request-avatar");
  }

  const [showProgress, setShowProgress] = useState<boolean>(false);

  async function updateAvatar() {
    const json = avatarObject;
    if (!json) return;
    console.log(json);

    setShowProgress(true);

    const { error: errorUpdate } = await supabaseClient
      .from("profiles")
      .update({ avatar_url: json })
      .eq("id", user?.id);

    if (errorUpdate) {
      console.log("error:", errorUpdate);
    }

    // go to profile
    const id = user?.id;
    router.push(`/profile/${id}`);
  }

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
        <div className="mt-36"></div>
        <button
          className="bg-contrast hover:bg-contrasthover text-white font-bold py-2 px-4 rounded mb-6"
          onClick={() => updateAvatar()}
        >
          Update Avatar
        </button>

        {showProgress && (
          <progress className="progress w-56 mt-3 progress-accent mb-5"></progress>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col col-span-2 lg:col-span-1">
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

          <div className="bg-gray-100 p-4 col-span-2 flex justify-start items-center flex-col">
            <div className="flex justify-between w-full">
              <div className="ml-24">
                <h3 className="uppercase text-2xl text-gray-400 font-light">
                  hair
                </h3>
              </div>
              <div className="mr-16">
                <h3 className="uppercase text-2xl text-gray-400 font-light">
                  Facial hair
                </h3>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-row ml-10 mt-4">
                <button onClick={() => changeHairType("left")}>
                  <RiArrowLeftSLine className="w-10 h-10" />
                </button>
                <HairSVG hairType={hairType} color={hairColor} />
                <button onClick={() => changeHairType("right")}>
                  <RiArrowRightSLine className="w-10 h-10" />
                </button>
              </div>
              <div className="flex flex-row mr-10">
                <button onClick={() => changeFacialHairType("left")}>
                  <RiArrowLeftSLine className="w-10 h-10" />
                </button>
                <FacialHairSVG
                  facialHairType={facialHairType}
                  color={facialHairColor}
                  probability={facialHairProbability}
                />
                <button onClick={() => changeFacialHairType("right")}>
                  <RiArrowRightSLine className="w-10 h-10" />
                </button>
              </div>
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
              body
            </h3>
            <div className="text-center">
              <BodySVG color={clothingColor} />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#456DFF" }}
                onClick={() => changeBodyColor("#456DFF")}
              >
                {clothingColor === "#456DFF" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#5A45FF" }}
                onClick={() => changeBodyColor("#5A45FF")}
              >
                {clothingColor === "#5A45FF" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#6DBB58" }}
                onClick={() => changeBodyColor("#6DBB58")}
              >
                {clothingColor === "#6DBB58" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F55D81" }}
                onClick={() => changeBodyColor("#F55D81")}
              >
                {clothingColor === "#F55D81" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#7555CA" }}
                onClick={() => changeBodyColor("#7555CA")}
              >
                {clothingColor === "#7555CA" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#E24553" }}
                onClick={() => changeBodyColor("#E24553")}
              >
                {clothingColor === "#E24553" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#54D7D7" }}
                onClick={() => changeBodyColor("#54D7D7")}
              >
                {clothingColor === "#54D7D7" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F3B63A" }}
                onClick={() => changeBodyColor("#F3B63A")}
              >
                {clothingColor === "#F3B63A" && "✔"}
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              Eyes
            </h3>
            <div className="text-center">
              <div className="flex flex-row">
                <button onClick={() => changeEyesType("left")}>
                  <RiArrowLeftSLine className="w-10 h-10" />
                </button>
                <EyesSVG color="#ffffff" eyesType={eyesType} />
                <button onClick={() => changeEyesType("right")}>
                  <RiArrowRightSLine className="w-10 h-10" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              Mouth
            </h3>
            <div className="text-center">
              <div className="flex flex-row">
                <button onClick={() => changeMouthType("left")}>
                  <RiArrowLeftSLine className="w-10 h-10" />
                </button>
                <MouthSVG color="#ffffff" mouthType={mouthType} />
                <button onClick={() => changeMouthType("right")}>
                  <RiArrowRightSLine className="w-10 h-10" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              Nose
            </h3>
            <div className="text-center">
              <div className="flex flex-row">
                <button onClick={() => changeNoseType("left")}>
                  <RiArrowLeftSLine className="w-10 h-10" />
                </button>
                <NoseSVG color="#ffffff" noseType={noseType} />
                <button onClick={() => changeNoseType("right")}>
                  <RiArrowRightSLine className="w-10 h-10" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-start items-center flex-col">
            <h3 className="uppercase text-2xl text-gray-400 font-light">
              Background
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#93A7FF" }}
                onClick={() => changeBackgroundColor("#93A7FF")}
              >
                {backgroundColor === "#93A7FF" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#A9E775" }}
                onClick={() => changeBackgroundColor("#A9E775")}
              >
                {backgroundColor === "#A9E775" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FF7A9A" }}
                onClick={() => changeBackgroundColor("#FF7A9A")}
              >
                {backgroundColor === "#FF7A9A" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#B379F7" }}
                onClick={() => changeBackgroundColor("#B379F7")}
              >
                {backgroundColor === "#B379F7" && "✔"}
              </button>

              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FF6674" }}
                onClick={() => changeBackgroundColor("#FF6674")}
              >
                {backgroundColor === "#FF6674" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#89E6E4" }}
                onClick={() => changeBackgroundColor("#89E6E4")}
              >
                {backgroundColor === "#89E6E4" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#FFCC65" }}
                onClick={() => changeBackgroundColor("#FFCC65")}
              >
                {backgroundColor === "#FFCC65" && "✔"}
              </button>
              <button
                className="rounded-md w-10 h-10 text-white text-2xl"
                style={{ backgroundColor: "#F8FBFF" }}
                onClick={() => changeBackgroundColor("#F8FBFF")}
              >
                {backgroundColor === "#F8FBFF" && "✔"}
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-primaryblue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => downloadAvatar()}
        >
          Download
        </button>
      </div>
    </Layout>
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
    {
      user_id: user?.id,
    }
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

  // check if id from url is the logged in user
  const id = ctx.query.id;
  if (id !== user?.id) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      avatar_url: avatar_url,
      projectsChildren: projectsChildren,
    },
  };
};

type objectAvatar = {
  skinColor: string[];
  hair: string[];
  hairColor: string[];
  facialHair: string[];
  facialHairProbability: number;
  body: string[];
  clothingColor: string[];
  eyes: string[];
  mouth: string[];
  nose: string[];
  backgroundColor: string[];
  radius: number;
};
