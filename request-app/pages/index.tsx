import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PrimaryFeatures from "@/components/index/PrimaryFeatures";
import Testimonials from "@/components/index/Testimonials";
import { Faqs } from "@/components/index/Faqs";

/**
 * ReQuest - Home page
 * @description The home page contains the primary features, testimonials, and faqs
 * @returns home page
 */
export default function Home() {
  return (
    <div className="min-h-screen index-background">
      <Head>
        <title>ReQuest</title>
        <meta
          name="description"
          content="ReQuest - A requirements management tool"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative isolate scroll-smooth">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-2 lg:flex lg:items-center lg:gap-x-24 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto flex flex-col justify-center items-center">
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-center leading-snug text-white sm:text-[2.9rem]">
              {/* Your requirements at a fun glance */}
              {/* You are in control of your requirements */}
              Embracing the future of requirement management
            </h1>
            <p className="mt-8 text-lg max-w-md text-center leading-8 text-white">
              {/* Your projects will benefit from a streamlined and efficient
              approach to accomplishing your requirements. */}
              {/* Harness the power of AI, collaboration, and gamification to
              elevate your projects.  */}
              Experience seamless teamwork, intelligent insights, and a
              captivating journey toward success.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-contrast px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-contrasthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
              >
                Get started
              </Link>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center">
            <Image
              priority
              src="/guy.svg"
              alt="Guy"
              width={550}
              height={550}
              style={{ width: "auto", height: "375px" }}
            />
          </div>
        </div>
      </div>
      <PrimaryFeatures />
      <Testimonials />
      <Faqs />
    </div>
  );
}
