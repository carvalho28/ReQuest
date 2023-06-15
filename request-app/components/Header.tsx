import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Features", href: "//#features" },
  { name: "Testimonials", href: "//#testimonials" },
  { name: "Faqs", href: "//#faqs" },
];

type headerProps = {
  color?: number;
};

const Header = ({ color }: headerProps) => {
  let colorClickable = "text-black";
  if (color === 1) {
    // default state, white clickable buttons
    colorClickable = "text-white";
  }

  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    router.push("/register");
  };

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              className="w-auto h-14"
              src="/logo.svg"
              alt="logo"
              width={80}
              height={80}
            />
          </Link>
          <span className="flex ml-4 font-semibold text-white text-lg">
            ReQuest
          </span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-12 w-12" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-semibold leading-6 ${colorClickable}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <Link
            href="/login"
            className={`text-md font-semibold leading-6 ${colorClickable}`}
          >
            Login <span aria-hidden="true"></span>
          </Link>
          <button
            type="button"
            className="ml-8 rounded-md bg-contrast py-2 px-3 text-base font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
            onClick={handleGetStarted}
          >
            Get started
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                className="h-14 w-auto"
                src="/logo.svg"
                width={600}
                height={600}
                alt=""
              />
            </Link>
            <span className="flex ml-2 font-semibold text-black text-lg">
              ReQuest
            </span>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 ml-auto"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

Header.defaultProps = {
  color: 1,
};

export default Header;
