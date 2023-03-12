import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  async function signUpEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="h-screen login-background">
      <Header color={0} />
      <div className="relative isolate pt-2">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-24 lg:px-8 lg:py-40">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white2 rounded-3xl h-fit shadow-lg m-6">
            <div className="mx-auto w-full max-w-sm lg:w-96">
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
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                          <span className="sr-only">Sign in with Google</span>
                          <FcGoogle size={20} />
                        </a>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                          <span className="sr-only">Sign in with Twitter</span>
                          <FaTwitter size={20} color="#1DA1F2" />
                        </a>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                          <span className="sr-only">Sign in with GitHub</span>
                          <FaGithub size={20} color="#333" />
                        </a>
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
                        // onClick={signUpEmail}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-0 flex-1 justify-center hidden lg:block">
            <Image
              className="inset-0 w-full h-full p-6"
              src="/register.svg"
              alt=""
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
