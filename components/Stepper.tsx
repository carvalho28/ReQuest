import { CheckIcon } from "@heroicons/react/24/outline";

type Step = {
  id: string;
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
};

interface StepperProps {
  steps: Step[];
}

const Stepper = ({ steps }: StepperProps) => {
  return (
    <div>
      <nav aria-label="Progress" className="md:flex flex-col hidden">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <button className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primaryblue group-hover:bg-primarygreen">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </button>
              ) : step.status === "current" ? (
                <button
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primaryblue">
                    <span className="text-primaryblue">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primaryblue">
                    {step.name}
                  </span>
                </button>
              ) : (
                <button className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </button>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute top-0 right-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <nav
        className="flex items-center justify-center md:hidden"
        aria-label="Progress"
      >
        <ol role="list" className="flex items-center space-x-5">
          {steps.map((step) => (
            <li key={step.name}>
              {step.status === "complete" ? (
                <button className="block h-2.5 w-2.5 rounded-full bg-contrast hover:bg-contrasthover">
                  <span className="sr-only">{step.name}</span>
                </button>
              ) : step.status === "current" ? (
                <button
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-indigo-200" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-contrast"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </button>
              ) : (
                <button className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                  <span className="sr-only">{step.name}</span>
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Stepper;
