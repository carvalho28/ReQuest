import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPen, FaStar } from "react-icons/fa";
import { Black_Ops_One } from "next/font/google";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";

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

  return {
    props: {
      avatar_url: data[0].avatar_url,
    },
  };
};

type ItemCarrousel = {
  label: string;
  value: number;
};

export default function Profile({ avatar_url }: any) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [reqComplete, setReqComplete] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [xpNeeded, setXpNeeded] = useState<number>(0);
  const [denomination, setDenomination] = useState<string>("");
  const [nProjects, setNProjects] = useState<number>(0);

  const itemsCarrousel: ItemCarrousel[] = [
    { label: "Reqquirements completed", value: reqComplete },
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
    // get user data
    async function getUserData() {
      if (user) {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*, levels (denomination, xp_needed)")
          .eq("id", user?.id);
        if (error) console.log(error);
        if (!data) {
          console.log("No data found");
          return;
        }
        // console.log(data);

        setName(data[0].name);
        setUserData(data[0]);
        setReqComplete(data[0].requirements_completed);
        setLevel(data[0].level);
        setXp(data[0].xp);
        setXpNeeded(data[0].levels.xp_needed);
        setDenomination(data[0].levels.denomination);
        setNProjects(data[0].n_projects);
      }
    }

    getUserData();
  }, [supabaseClient, user]);

  return (
    <Layout currentPage="profile" avatarUrl={avatar_url}>
      <div className="flex gap-x-2">
        <div className="flex p-6 bg-white rounded-lg shadow-lg w-3/5">
          <div className="w-2/5 flex flex-col justify-center items-center">
            <Image
              className="object-cover w-full rounded-lg"
              src={avatar_url}
              alt="avatar"
              width={300}
              height={300}
            />
            <button
              type="submit"
              className="flex w-fit rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast mt-4"
            >
              Customize me
            </button>
          </div>

          <div className="w-px bg-gray-400 mx-4"></div>

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
                <FaStar className="h-20 w-20 text-yellow-400 w-" />
                <span
                  className={`ml-5 text-black text-2xl ${blackOpsOne.className}`}
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
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                        <h3
                          className="text-lg leading-6 font-medium text-black"
                          id="modal-headline"
                        >
                          Change your name
                        </h3>
                        <div className="mt-6 w-72">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow-sm focus:ring-contrast focus:border-contrast block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-contrast text-base font-medium text-white hover:bg-contrasthover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-contrast sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => saveName()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-contrast sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => toggleModal()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-lg w-2/5 justify-center">
          <h3 className="text-xl font-bold">Trophies</h3>
          <div></div>
        </div>
      </div>
      <div className="flex gap-x-4 mt-8 h-52">
        <div className="flex p-6 bg-white rounded-lg shadow-lg w-full justify-center"></div>
      </div>
      <div className="flex gap-x-4 mt-8">
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg justify-center w-1/3">
          <h3 className="text-xl font-bold flex justify-center">
            Global Stats
          </h3>
          <div className="flex flex-col justify-center items-center mt-8">
            <div className="text-6xl font-extrabold">
              {itemsCarrousel[currentIndex].value}
            </div>
            <div className="text-md mt-2 text-gray-700">
              {itemsCarrousel[currentIndex].label}
            </div>
            <div className="flex justify-center items-center mt-8">
              <RiArrowLeftCircleFill
                className="h-10 w-10 text-black mr-2 hover:cursor-pointer"
                onClick={() => handleLeftArrow()}
              />
              <RiArrowRightCircleFill
                className="h-10 w-10 text-black ml-2 hover:cursor-pointer"
                onClick={() => handleRightArrow()}
              />
            </div>
          </div>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-lg justify-center w-1/3">
          <h3 className="text-xl font-bold flex justify-center">Teams</h3>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-lg justify-center w-1/3">
          <h3 className="text-xl font-bold flex justify-center">Projects</h3>
        </div>
      </div>
    </Layout>
  );
}
