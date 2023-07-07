import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import PasswordInput from "@/components/PasswordInput";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Head from "next/head";

/**
 * Forgot password page
 * @returns forgot password page
 */
export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const resetPassword = async () => {
    setLoading(true);
    setErrorMessage(null);

    if (password !== passwordConfirmation) {
      setLoading(false);
      return setErrorMessage("Passwords do not match");
    }

    const { error } = await supabaseClient.auth.updateUser({
      password: password,
    });

    if (error) {
      setLoading(false);
      return setErrorMessage(error.message);
    }

    setLoading(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Head>
        <title>{"ReQuest | Forgot Password"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen login-background flex flex-col">
        <Header color={0} />
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-24 lg:px-8">
            <div className="flex flex-1 flex-col justify-center py-12 px-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white2 rounded-3xl shadow-lg">
              <div className="mx-auto max-w-sm md:w-96">
                <div>
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-black text-center">
                    Forgot your password?
                  </h2>
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          New Password
                        </label>
                        <PasswordInput
                          setPassword={setPassword}
                          placeholder="Password"
                          id="password"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm New Password
                        </label>
                        <PasswordInput
                          setPassword={setpasswordConfirmation}
                          placeholder="Password Confirmation"
                          id="passwordConfirmation"
                        />
                      </div>

                      {loading && <Loading />}

                      <div className="flex items-center align-end text-sm justify-end">
                        <Link
                          href="/login"
                          className="font-medium text-contrast hover:text-contrasthover"
                        >
                          Try logging in again
                        </Link>
                      </div>
                      {errorMessage && <ErrorMessage message={errorMessage} />}
                      <div>
                        <button
                          onClick={resetPassword}
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-1 justify-center hidden lg:block">
              <Image
                className="inset-0 h-auto max-w-screen p-6 mx-auto"
                style={{ maxWidth: "130%" }}
                src="/forgot-password.svg"
                alt=""
                width={1600}
                height={1600}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
