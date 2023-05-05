export type HairType =
  | "bald"
  | "balding"
  | "beanie"
  | "bobBangs"
  | "bobCut"
  | "bunUndercut"
  | "buzzcut"
  | "cap"
  | "curly"
  | "curlyBun"
  | "curlyHighTop"
  | "extraLong"
  | "fade"
  | "long"
  | "mohawk"
  | "pigtails"
  | "shortCombover"
  | "shortComboverChops"
  | "sideShave"
  | "straightBun";

export type FacialHairType =
  | "beardMustache"
  | "goatee"
  | "pyramid"
  | "shadow"
  | "soulPatch"
  | "walrus";

export type EyesType =
  | "open"
  | "sleep"
  | "wink"
  | "glasses"
  | "happy"
  | "sunglasses";

export type MouthTypes =
  | "bigSmile"
  | "frown"
  | "lips"
  | "pacifier"
  | "smile"
  | "smirk"
  | "surprise";

export type NoseType = "mediumRound" | "smallRound" | "wrinkles";

export const hairTypes: HairType[] = [
  "bald",
  "balding",
  "beanie",
  "bobBangs",
  "bobCut",
  "bunUndercut",
  "buzzcut",
  "cap",
  "curly",
  "curlyBun",
  "curlyHighTop",
  "extraLong",
  "fade",
  "long",
  "mohawk",
  "pigtails",
  "shortCombover",
  "shortComboverChops",
  "sideShave",
  "straightBun",
];

// pair with hairtype and probability
export const facialHairTypes: [FacialHairType, number][] = [
  ["beardMustache", 100],
  ["goatee", 100],
  ["pyramid", 100],
  ["shadow", 100],
  ["soulPatch", 100],
  ["walrus", 100],
  ["walrus", 0],
];

export const eyesTypes: EyesType[] = [
  "open",
  "sleep",
  "wink",
  "glasses",
  "happy",
  "sunglasses",
];

export const mouthTypes: MouthTypes[] = [
  "bigSmile",
  "frown",
  "lips",
  "pacifier",
  "smile",
  "smirk",
  "surprise",
];

export const noseTypes: NoseType[] = ["mediumRound", "smallRound", "wrinkles"];
