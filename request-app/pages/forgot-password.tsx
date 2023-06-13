import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import PasswordInput from "@/components/PasswordInput";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
    setErrorMessage(null);
  } 


  return (
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
                          className="pl-4 block w-full rounded-md border-0
                          py-1.5 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                          focus:ring-contrast sm:text-sm sm:leading-6"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

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
