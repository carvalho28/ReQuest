import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPen } from "react-icons/fa";
import Link from "next/link";

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

export default function Profile({ avatar_url }: any) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    console.log("toggle");
    setShowModal(!showModal);
  }

  async function saveName() {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ name: name })
      .eq("id", user?.id);
    if (!error) {
      setUserData({ ...userData, name: name });
    }

    toggleModal();
  }

  useEffect(() => {
    // get user data
    async function getUserData() {
      if (user) {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", user?.id);
        if (error) console.log(error);
        if (!data) {
          console.log("No data found");
          return;
        }
        setUserData(data[0]);
        setName(data[0].name);
      }
    }

    getUserData();
  }, [supabaseClient, user]);

  return (
    <Layout currentPage="profile" avatarUrl={avatar_url}>
      <div className="flex p-6 bg-white rounded-lg shadow-lg w-3/5 h-auto">
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

        <div className="w-3/5 p-6">
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
        </div>
      </div>
      <div>
        {showModal && (
          // modal to change name
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
    </Layout>
  );
}
