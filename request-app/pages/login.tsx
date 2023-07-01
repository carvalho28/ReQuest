import Header from "@/components/Header";
import PasswordInput from "@/components/PasswordInput";
import { signUpGithub, signUpGoogle } from "@/utils/signInUtils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

// dynamic imports
import dynamic from "next/dynamic";
import ResetPassword from "@/components/ResetPassword";
const Loading = dynamic(() => import("@/components/Loading"), { ssr: false });
const ConfirmEmail = dynamic(() => import("@/components/ConfirmEmail"), {
  ssr: false,
});
const ErrorMessage = dynamic(() => import("@/components/ErrorMessage"), {
  ssr: false,
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default function Login() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [regSuccess, setRegSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  // const user = useUser();

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      if (email && password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
        }
        if (data.user) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInProviders(provider: string) {
    setLoading(true);
    if (provider === "google") {
      signUpGoogle({ supabaseClient });
    }
    if (provider === "github") {
      signUpGithub({ supabaseClient });
    }
  }

  const [open, setOpen] = useState(false);
  // useEffect(() => {}, [open]);

  return (
    <div className="min-h-screen login-background flex flex-col">
      <Header color={0} />
      <div className="flex-1 flex items-center justify-center">
        {regSuccess && <ConfirmEmail />}
        {open && <ResetPassword open={open} setOpen={setOpen} />}
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-24 lg:px-8">
          <div className="flex flex-1 flex-col justify-center py-12 px-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white2 rounded-3xl shadow-lg">
            <div className="mx-auto max-w-sm md:w-96">
              <div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-black text-center">
                  Welcome back!
                </h2>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <p className="text-sm font-medium leading-6 text-black">
                      Login with
                    </p>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                          onClick={() => signInProviders("google")}
                        >
                          <span className="sr-only">Sign in with Google</span>
                          <FcGoogle size={20} />
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                          // onClick={handleClick}
                        >
                          <span className="sr-only">Sign in with Twitter</span>
                          <FaTwitter size={20} color="#1DA1F2" />
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                          onClick={() => signInProviders("github")}
                        >
                          <span className="sr-only">Sign in with GitHub</span>
                          <FaGithub size={20} color="#333" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white2 px-2 text-black">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <form className="space-y-6" onSubmit={signIn}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="Email address"
                          required
                          className="pl-4 block w-full rounded-md border-1
                          py-1.5 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                          focus:ring-contrast sm:text-sm sm:leading-6"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium border-1 leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="flex items-center align-end text-sm justify-end">
                          <p
                            onClick={() => setOpen(true)}
                            className="font-medium text-contrast hover:text-contrasthover
                             cursor-pointer text-xs md:text-md"
                          >
                            Forgot your password?
                          </p>
                        </div>
                      </div>
                      <PasswordInput
                        setPassword={setPassword}
                        placeholder="Password"
                        id="password"
                      />
                    </div>

                    {loading && <Loading />}

                    <div className="flex items-center align-end text-sm justify-end">
                      <Link
                        href="/register"
                        className="font-medium text-contrast hover:text-contrasthover"
                      >
                        Don&apos;t have an account? Sign up
                      </Link>
                    </div>
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-1 justify-center hidden lg:block">
            <Image
              priority
              className="inset-0 w-128 h-full max-w-screen p-6 mx-auto"
              src="/register.svg"
              alt=""
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
