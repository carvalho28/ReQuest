import { Rankings } from "@/pages/projects/[id]";
import { Rubik_Bubbles } from "next/font/google";
import Image from "next/image";
import { renderImage } from "./utils/general";

const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

interface ListRankingProps {
  rankings: Rankings[];
  user_id: string;
}

const ListRanking = ({ rankings, user_id }: ListRankingProps) => {
  const cups = [
    "/gold-cup.svg",
    "/silver-cup.svg",
    "/bronze-cup.svg",
    "/purple-cup.svg",
  ];

  function generateCup(index: number) {
    if (index == 0) {
      return cups[0];
    } else if (index == 1) {
      return cups[1];
    } else if (index == 2) {
      return cups[2];
    } else {
      return cups[3];
    }
  }

  console.log(rankings);

  return (
    <>
      {rankings.length == 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            id="No ranking"
            className="w-72 h-auto flex-none py-3"
            src={"/dog.svg"}
            alt="Cat"
            width={100}
            height={100}
            priority
          />
          <span className="text-md font-normal text-gray-900">No ranking yet</span>
        </div>
      ) : (
        <div className="overflow-y-scroll w-full h-60 scroll">
          <dl className="grid grid-cols-1 rounded-lg h-54 space-y-2">
            {rankings.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-row p-2 rounded-lg border-2 border-gray-100 ${
                  user_id === item.id ? "bg-contrast bg-opacity-30" : "bg-white"
                }`}
              >
                <dt
                  className="flex flex-col items-center justify-center
              pr-2"
                >
                  <div className="px-2">
                    <Image
                      className="h-12 w-12 rounded-full border-2 border-xl border-gray-200"
                      alt="avatar"
                      src={"data:image/svg+xml," + renderImage(item.avatar_url)}
                      width={40}
                      height={40}
                    />
                  </div>
                </dt>
                {/* image */}
                <div className="flex flex-col items-start ml-2">
                  <div className="flex flex-row items-center">
                    <div className="ml-1 text-md font-medium text-gray-900 truncate md:w-full w-16">
                      {item.name}
                    </div>
                  </div>
                  <div className={`flex flex-row items-center`}>
                    <div className="ml-1 text-xs text-gray-500 truncate">
                      Req. closed:
                    </div>

                    <div
                      className={`ml-2 text-sm font-medium text-gray-900 items-center`}
                    >
                      {item.requirements_closed}
                    </div>
                  </div>
                </div>
                <div className="ml-auto px-3 items-center justify-center flex">
                  <Image
                    className="h-8 w-8 shadow-xl rounded-full"
                    alt="avatar"
                    src={generateCup(index)}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
};

export default ListRanking;
