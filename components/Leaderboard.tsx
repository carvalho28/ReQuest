import { Rankings } from "@/pages/projects/[id]";
import Image from "next/image";
import { Rubik_Bubbles } from "next/font/google";
import { classNames } from "./utils/general";

const rubik = Rubik_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

interface LeaderboardProps {
  rankings: Rankings[];
}

export default function Leaderboard({ rankings }: LeaderboardProps) {
  const rankings3 = [...rankings, ...rankings, ...rankings];
  //   console.log(rankings3);

  //   const rankings3 = [
  //     {
  //       id: 1,
  //       name: "Diogo",
  //       requirements_completed: 1,
  //       avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  //     },
  //     {
  //       id: 2,
  //       name: "Alcina",
  //       requirements_completed: 2,
  //       avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
  //     },
  //     {
  //       id: 3,
  //       name: "Zé",
  //       requirements_completed: 3,
  //       avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
  //     },
  //   ];

  //   const top3 = rankings3.slice(0, 3);
  // get top three and cut names to appear only the first one
  const top3 = rankings3.slice(0, 3).map((user) => {
    return {
      ...user,
      name: user.name.split(" ")[0],
    };
  });

  return (
    <div className="grid grid-rows-4 grid-cols-3 w-full text-center h-[200px]">
      <div></div>
      <div className="flex flex-col items-center">
        <div>
          <Image
            src={top3[0].avatar_url}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </div>
        <div className="truncate text-sm">{top3[0].name}</div>
      </div>
      <div></div>
      <div className="flex flex-col items-center">
        <div>
          <Image
            src={top3[1].avatar_url}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </div>
        <div className="truncate text-sm">{top3[1].name}</div>
      </div>
      <div className={`bg-gold text-3xl ${rubik.className} flex flex-col`}>
        <span className="mt-2">🥇</span>
      </div>
      <div></div>
      <div className={`bg-silver text-3xl ${rubik.className} flex flex-col`}>
        <span className="mt-2">🥈</span>
      </div>
      <div className="bg-gold"></div>
      <div className="flex flex-col items-center">
        <div>
          <Image
            src={top3[2].avatar_url}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </div>
        <div className="truncate text-sm">{top3[2].name}</div>
      </div>
      <div className="bg-silver flex flex-col justify-end"></div>
      <div className="bg-gold flex flex-col justify-end"></div>
      <div className={`bg-bronze text-3xl ${rubik.className} flex flex-col`}>
        <span className="mt-2">🥉</span>
      </div>
    </div>
  );
}
