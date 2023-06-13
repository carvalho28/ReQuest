import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { RiCloseLine } from "react-icons/ri";

const ResetPassword = ({ open, setOpen }: { open: boolean; setOpen: any }) => { 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabaseClient = useSupabaseClient();

  const handleResetPassword = async () => {
    if (!email) {
      return setErrorMessage("Please enter your email");
    }
    setLoading(true);
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/forgot-password",
    });
    if (error) {
      console.log(error);
      return setErrorMessage(error.message);
    }
    router.push("/");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleResetPassword}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <LockClosedIcon
                      className="h-6 w-6 text-purple-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <RiCloseLine
                      className="absolute top-2 right-2 h-6 w-6 text-gray-500 cursor-pointer"
                      aria-hidden="true"
                      onClick={() => {
                        setOpen(false);
                      }}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Reset your password
                    </Dialog.Title>
                    <div className="mt-6">
                      <input
                        required
                        type="emailR"
                        name="emailR"
                        id="email"
                        className="pl-4 block w-full rounded-md border-0
                          py-1.5 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                          focus:ring-contrast sm:text-sm sm:leading-6"
                        placeholder="Insert your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <p className="text-sm text-gray-500 mt-5">
                        We will send you an email to reset your password
                      </p>
                      <div className="mt-5">
                        {errorMessage && (
                          <ErrorMessage message={errorMessage} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-contrast 
                    px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-contrast"
                    onClick={() => handleResetPassword()}
                  >
                    Send email to reset password
                  </button>
                  {loading && <Loading />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ResetPassword;
