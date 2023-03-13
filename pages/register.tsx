import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";
import ConfirmEmail from "@/components/ConfirmEmail";
import { signUpGithub, signUpGoogle } from "@/utils/signInProviders";
import LoadModals from "@/components/LoadModals";

export default function Register() {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const [regSuccess, setRegSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadProvider, setLoadProvider] = useState<boolean>(false);

  async function signUpEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      if (name && email && password && confirmPassword) {
        console.log(email, password, confirmPassword);

        const resp = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (resp.error) {
          throw resp.error.message;
        }
        const userId = resp.data.user?.id;
        if (userId) {
          setLoading(false);
          setRegSuccess(true);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async function signUpProvider(provider: string) {
    setLoadProvider(true);
    if (provider === "google") {
      signUpGoogle();
    }
    if (provider === "github") {
      signUpGithub();
    }
  }

  return (
    <div className="min-h-screen login-background flex flex-col">
      <Header color={0} />
      <div className="flex-1 flex items-center justify-center">
        {regSuccess && <ConfirmEmail />}
        {loadProvider && <LoadModals />}
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-24 lg:px-8">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white2 rounded-3xl shadow-lg">
            <div className="mx-auto max-w-sm md:w-96">
              <div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-black text-center">
                  Create an account
                </h2>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <p className="text-sm font-medium leading-6 text-black">
                      Sign up with
                    </p>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                          onClick={() => signUpProvider("google")}
                        >
                          <span className="sr-only">Sign in with Google</span>
                          <FcGoogle size={20} />
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                          <span className="sr-only">Sign in with Twitter</span>
                          <FaTwitter size={20} color="#1DA1F2" />
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                          onClick={() => signUpProvider("github")}
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
                  <form className="space-y-6" onSubmit={signUpEmail}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="name"
                          autoComplete="name"
                          placeholder="Your name"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6 pl-4"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
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
                          className="pl-4 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Password"
                          required
                          className="pl-4 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="conf-password"
                          name="conf-password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Confirm password"
                          required
                          className="pl-4 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      {loading && (
                        <div className="flex justify-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-10 h-10 mr-2 mt-5 text-gray-200 animate-spin fill-contrast"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center align-end text-sm justify-end">
                      <Link
                        href="/login"
                        className="font-medium text-contrast hover:text-contrasthover"
                      >
                        Already have an account?
                      </Link>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-contrast py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
                      >
                        Sign up
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
