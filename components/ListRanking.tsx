import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { classNames } from "./utils/general";
import Image from "next/image";
import { Rankings } from "@/pages/projects/[id]";
import { Rubik_Bubbles } from "next/font/google";

const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

interface ListRankingProps {
  rankings: Rankings[];
}

const ListRanking = ({ rankings }: ListRankingProps) => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
        {rankings.map((item, index) => (
          <div key={item.id} className=" flex flex-row px-4 py-5 sm:p-6">
            <dt
              className={classNames(
                index === 1
                  ? "text-yellow-500"
                  : index === 2
                  ? "text-gray-500"
                  : index === 3
                  ? "text-orange-500"
                  : "text-gray-500",
                "text-base font-normal text-gray-900"
              )}
            >
              {index === 0 ? (
                <span className="text-7xl font-bold">🥇</span>
              ) : index === 1 ? (
                <span className="text-7xl font-bold">🥈</span>
              ) : index === 2 ? (
                <span className="text-7xl font-bold">🥉</span>
              ) : (
                <span className="text-7xl font-bold">{item.id}</span>
              )}
            </dt>
            {/* image */}
            <div className="flex flex-col items-start">
              {/* <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" alt="avatar" />
              </div> */}
              <div className="flex flex-row items-center">
                <Image
                  className="h-12 w-12 rounded-full"
                  alt="avatar"
                  src={item.avatar_url}
                  width={40}
                  height={40}
                />
                <div className="ml-2 text-md font-medium text-gray-900">
                  {item.name}
                </div>
              </div>
              <div
                className={`flex flex-row items-center ${rubikBubbles.className}`}
              >
                <div className="ml-2 text-md font-medium text-gray-900">
                  {item.requirements_closed}
                </div>
                <div className="ml-2 text-sm text-gray-500 truncate">
                  requirements closed
                </div>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ListRanking;
