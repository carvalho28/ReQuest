import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "./Container";
import {
  Variants,
  motion,
} from "framer-motion";

const features = [
  {
    title: "Projects",
    description:
      "Keep track of your projects, who's working on them, status, and more.",
    image: "/projects-preview.png",
  },
  {
    title: "Requirements",
    description:
      "Keep track of your requirements, progress, deadlines, and more. There is also a ranking system to push your team to the next level.",
    image: "/requirements-preview.png",
  },
  {
    title: "Collaboration",
    description:
      "Collaborate in real-time with your team. This will help you stay on the same page and get things done faster.",
    image: "/collaboration-preview.png",
  },
  {
    title: "AI",
    description:
      "We use AI to help you with your requirements. You can also evaluate your abilities to create requirements from a given scenario.",
    image: "/ai-preview.png",
  },
];

export const sectionInOutFadeVariants: Variants = {
  offscreen: {
    opacity: 0.3,
    y: 20,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.6,
    },
  },
};


const PrimaryFeatures = () => {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: any) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionInOutFadeVariants}
    >
      <section
        id="features"
        aria-label="Features for running your books"
        className="relative overflow-hidden pb-28 pt-20 sm:py-32 bg-gradient-to-b from-contrast 
      to-primarygreen"
      >
        <Image
          className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
          src="/background-features.png"
          alt=""
          width={2245}
          height={1636}
          unoptimized
        />
        <Container className="relative">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-bold text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Everything you need to manage your requirements
            </h2>
            <p className="mt-6 text-lg tracking-tight text-purple-100">
              We&apos;ve got all the features you need to keep your requirements
              organized and your team on the same page.
            </p>
          </div>
          <Tab.Group
            as="div"
            className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
            vertical={tabOrientation === "vertical"}
          >
            {({ selectedIndex }) => (
              <>
                <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                  <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                    {features.map((feature, featureIndex) => (
                      <div
                        key={feature.title}
                        className={clsx(
                          "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                          selectedIndex === featureIndex
                            ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                            : "hover:bg-white/10 lg:hover:bg-white/5"
                        )}
                      >
                        <h3>
                          <Tab
                            className={clsx(
                              "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                              selectedIndex === featureIndex
                                ? "text-purple-600 lg:text-white"
                                : "text-purple-100 hover:text-white lg:text-white"
                            )}
                          >
                            <span className="absolute text-2xl inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                            {feature.title}
                          </Tab>
                        </h3>
                        <p
                          className={clsx(
                            "mt-2 hidden text-sm lg:block",
                            selectedIndex === featureIndex
                              ? "text-white"
                              : "text-blue-100 group-hover:text-white"
                          )}
                        >
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels className="lg:col-span-7">
                  {features.map((feature) => (
                    <Tab.Panel key={feature.title} unmount={false}>
                      <div className="relative sm:px-6 lg:hidden">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                        <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                          {feature.description}
                        </p>
                      </div>
                      <div className="mt-10 w-[45rem] overflow-hidden sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                        <Image
                          className="w-fit rounded-xl shadow-xl shadow-blue-900/20"
                          src={feature.image}
                          width={800}
                          height={800}
                          alt=""
                          priority
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </>
            )}
          </Tab.Group>
        </Container>
      </section>
    </motion.div>
  );
};

export default PrimaryFeatures;
