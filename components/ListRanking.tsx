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
  const rankings3 = [...rankings, ...rankings, ...rankings];
  return (
    <div className="overflow-y-scroll w-full h-60 scroll">
      <dl className="grid grid-cols-1 divide-y divide-gray-400 rounded-lg bg-white border border-gray-400 h-54">
        {rankings3.map((item, index) => (
          <div key={item.id} className=" flex flex-row p-2">
            {/* <dt>{index}</dt> */}
            <dt className="flex flex-col items-center justify-center border-r border-gray-200 pr-2">
              <div
                className={`flex flex-row items-center justify-center rounded-full w-8 h-8 
                ${index === 0 && "bg-yellow-400"}
                ${index === 1 && "bg-gray-400"}
                ${index === 2 && "bg-yellow-600"}
                ${index > 2 && "bg-purple-300"}
                `}
              >
                {index + 1}
                {/* if 1 write st, 2 write sd ... */}
                {index === 0 && <div className="text-xs">st</div>}
                {index === 1 && <div className="text-xs">nd</div>}
                {index === 2 && <div className="text-xs">rd</div>}
                {index > 2 && <div className="text-xs">th</div>}
              </div>
            </dt>
            {/* image */}
            <div className="flex flex-col items-start ml-4">
              {/* <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" alt="avatar" />
              </div> */}
              <div className="flex flex-row items-center">
                {/* <Image
                  className="h-12 w-12 rounded-full"
                  alt="avatar"
                  src={item.avatar_url}
                  width={40}
                  height={40}
                /> */}
                {/* <div className="flex flex-col items-start">{index}</div> */}
                <div className="ml-2 text-md font-medium text-gray-900">
                  {item.name}
                </div>
              </div>
              <div className={`flex flex-row items-center`}>
                <div className="ml-2 text-xs text-gray-500 truncate">
                  Requirements closed:
                </div>

                <div
                  className={`ml-2 text-md font-medium text-gray-900 ${rubikBubbles.className}`}
                >
                  {item.requirements_closed}
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
