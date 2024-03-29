import * as React from "react";
import {
  BaldingSVG,
  BeanieSVG,
  BobBangsSVG,
  BobCutSVG,
  BunUndercutSVG,
  BuzzcutSVG,
  CapSVG,
  CurlyBunSVG,
  CurlyHighTopSVG,
  CurlySVG,
  ExtraLongSVG,
  FadeSVG,
  LongSVG,
  MohawkSVG,
  PigtailsSVG,
  ShortComboverChopsSVG,
  ShortComboverSVG,
  SideShaveSVG,
} from "./avatars/Hair";
import {
  BeardMustacheSVG,
  GoateeSVG,
  PyramidSVG,
  ShadowSVG,
  SoulpatchSVG,
  WalrusSVG,
} from "./avatars/FacialHair";
import {
  GlassesSVG,
  HappySVG,
  OpenSVG,
  SleepSVG,
  SunglassesSVG,
  WinkSVG,
} from "./avatars/Eyes";
import {
  BigSmileSVG,
  FrownSVG,
  LipsSVG,
  PacifierSVG,
  SmileSVG,
  SmirkSVG,
  SurpriseSVG,
} from "./avatars/Mouth";
import { MediumRoundSVG, SmallRoundSVG, WrinklesSVG } from "./avatars/Nose";

/**
 * SkinSVG is the component used to display the skin
 * @param color - The color of the skin
 * @param width - The width of the skin
 * @param height - The height of the skin
 * @returns Returns the SkinSVG component
 */
const SkinSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none">
      <path
        fill={color}
        d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.036 14.036 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.973V27c0-7.732 6.268-14 14-14s14 6.268 14 14v1.027A4.5 4.5 0 0 1 45.42 37 14.036 14.036 0 0 1 37 46.081z"
      />
      <path
        fill="#FFF"
        fillOpacity={0.3}
        d="M18 0c7.732 0 14 6.268 14 14v6c0 7.732-6.268 14-14 14S4 27.732 4 20v-6C4 6.268 10.268 0 18 0z"
        style={{
          mixBlendMode: "overlay",
        }}
        transform="translate(14 13)"
      />
    </g>
  </svg>
);

interface HairProps {
  color?: React.SVGProps<SVGSVGElement>["color"];
  width?: React.SVGProps<SVGSVGElement>["width"];
  height?: React.SVGProps<SVGSVGElement>["height"];
  hairType: string;
}

/**
 * HairSVG is the component used to display the hair
 * @param color - The color of the hair
 * @param width - The width of the hair
 * @param height - The height of the hair
 * @param hairType - The type of hair
 * @returns Returns the HairSVG component
 */
const HairSVG = ({ color, width, height, hairType, ...props }: HairProps) => {
  if (hairType === "shortCombover") {
    return (
      <ShortComboverSVG
        color={color}
        width={width}
        height={height}
        {...props}
      />
    );
  } else if (hairType === "balding") {
    return (
      <BaldingSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "curly") {
    return <CurlySVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "beanie") {
    return <BeanieSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "long") {
    return <LongSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "bobBangs") {
    return (
      <BobBangsSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "bobCut") {
    return <BobCutSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "bunUndercut") {
    return (
      <BunUndercutSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "buzzcut") {
    return (
      <BuzzcutSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "cap") {
    return <CapSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "curlyBun") {
    return (
      <CurlyBunSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "curlyHighTop") {
    return (
      <CurlyHighTopSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "extraLong") {
    return (
      <ExtraLongSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "fade") {
    return <FadeSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "mohawk") {
    return <MohawkSVG color={color} width={width} height={height} {...props} />;
  } else if (hairType === "pigtails") {
    return (
      <PigtailsSVG color={color} width={width} height={height} {...props} />
    );
  } else if (hairType === "shortComboverChops") {
    return (
      <ShortComboverChopsSVG
        color={color}
        width={width}
        height={height}
        {...props}
      />
    );
  } else if (hairType === "sideShave") {
    return (
      <SideShaveSVG color={color} width={width} height={height} {...props} />
    );
  }
  return <div className="h-[100px] w-24"></div>;
};

interface FacialHairProps {
  color?: React.SVGProps<SVGSVGElement>["color"];
  width?: React.SVGProps<SVGSVGElement>["width"];
  height?: React.SVGProps<SVGSVGElement>["height"];
  facialHairType: string;
  probability: number;
}

/**
 * FacialHairSVG is the component used to display the facial hair
 * @param color - The color of the facial hair
 * @param width - The width of the facial hair
 * @param height - The height of the facial hair
 * @param facialHairType - The type of facial hair
 * @param probability - The probability of the facial hair
 * @returns Returns the FacialHairSVG component
 */
const FacialHairSVG = ({
  color,
  width,
  height,
  facialHairType,
  probability,
  ...props
}: FacialHairProps) => {
  if (probability === 100) {
    if (facialHairType === "beardMustache") {
      return (
        <BeardMustacheSVG
          color={color}
          width={width}
          height={height}
          {...props}
        />
      );
    } else if (facialHairType === "goatee") {
      return (
        <GoateeSVG color={color} width={width} height={height} {...props} />
      );
    } else if (facialHairType === "pyramid") {
      return (
        <PyramidSVG color={color} width={width} height={height} {...props} />
      );
    } else if (facialHairType === "shadow") {
      return (
        <ShadowSVG color={color} width={width} height={height} {...props} />
      );
    } else if (facialHairType === "soulPatch") {
      return (
        <SoulpatchSVG color={color} width={width} height={height} {...props} />
      );
    } else if (facialHairType === "walrus") {
      return (
        <WalrusSVG color={color} width={width} height={height} {...props} />
      );
    }
  } else {
    return <div className="h-[100px] w-24"></div>;
  }
  return <></>;
};

/**
 * BodySVG is the component used to display the body
 * @param color - The color of the body
 * @param width - The width of the body
 * @param height - The height of the body
 * @param scale - The scale of the body
 * @returns Returns the BodySVG component
 */
const BodySVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 1.5,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={100}
    height={100}
    viewBox="0 24 64 64"
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill={color}
      d="M27 49v3a5 5 0 0 0 10 0v-3l6.647 2.045A9 9 0 0 1 50 59.647V64H14v-4.353a9 9 0 0 1 6.353-8.602z"
    />
  </svg>
);

interface EyesType {
  color?: React.SVGProps<SVGSVGElement>["color"];
  width?: React.SVGProps<SVGSVGElement>["width"];
  height?: React.SVGProps<SVGSVGElement>["height"];
  eyesType: string;
}

/**
 * EyesSVG is the component used to display the eyes
 * @param color - The color of the eyes
 * @param width - The width of the eyes
 * @param height - The height of the eyes
 * @param eyesType - The type of eyes
 * @returns Returns the EyesSVG component
 */
const EyesSVG = ({ color, width, height, eyesType, ...props }: EyesType) => {
  if (eyesType === "glasses") {
    return (
      <GlassesSVG color={color} width={width} height={height} {...props} />
    );
  } else if (eyesType === "happy") {
    return <HappySVG color={color} width={width} height={height} {...props} />;
  } else if (eyesType === "open") {
    return <OpenSVG color={color} width={width} height={height} {...props} />;
  } else if (eyesType === "sleep") {
    return <SleepSVG color={color} width={width} height={height} {...props} />;
  } else if (eyesType === "sunglasses") {
    return (
      <SunglassesSVG color={color} width={width} height={height} {...props} />
    );
  } else if (eyesType === "wink") {
    return <WinkSVG color={color} width={width} height={height} {...props} />;
  }
  return <div className="h-[100px] w-24"></div>;
};

interface MouthTypes {
  color?: React.SVGProps<SVGSVGElement>["color"];
  width?: React.SVGProps<SVGSVGElement>["width"];
  height?: React.SVGProps<SVGSVGElement>["height"];
  mouthType: string;
}

/**
 * MouthSVG is the component used to display the mouth
 * @param color - The color of the mouth
 * @param width - The width of the mouth
 * @param height - The height of the mouth
 * @param mouthType - The type of mouth
 * @returns Returns the MouthSVG component
 */
const MouthSVG = ({
  color,
  width,
  height,
  mouthType,
  ...props
}: MouthTypes) => {
  if (mouthType === "bigSmile") {
    return (
      <BigSmileSVG color={color} width={width} height={height} {...props} />
    );
  } else if (mouthType === "frown") {
    return <FrownSVG color={color} width={width} height={height} {...props} />;
  } else if (mouthType === "lips") {
    return <LipsSVG color={color} width={width} height={height} {...props} />;
  } else if (mouthType === "pacifier") {
    return (
      <PacifierSVG color={color} width={width} height={height} {...props} />
    );
  } else if (mouthType === "smile") {
    return <SmileSVG color={color} width={width} height={height} {...props} />;
  } else if (mouthType === "smirk") {
    return <SmirkSVG color={color} width={width} height={height} {...props} />;
  } else if (mouthType === "surprise") {
    return (
      <SurpriseSVG color={color} width={width} height={height} {...props} />
    );
  }
  return <div className="h-[100px] w-24"></div>;
};

interface NoseTypes {
  color?: React.SVGProps<SVGSVGElement>["color"];
  width?: React.SVGProps<SVGSVGElement>["width"];
  height?: React.SVGProps<SVGSVGElement>["height"];
  noseType: string;
}

/**
 * NoseSVG is the component used to display the nose
 * @param color - The color of the nose
 * @param width - The width of the nose
 * @param height - The height of the nose
 * @param noseType - The type of nose
 * @returns Returns the NoseSVG component
 */
const NoseSVG = ({ color, width, height, noseType, ...props }: NoseTypes) => {
  if (noseType === "mediumRound") {
    return (
      <MediumRoundSVG color={color} width={width} height={height} {...props} />
    );
  } else if (noseType === "smallRound") {
    return (
      <SmallRoundSVG color={color} width={width} height={height} {...props} />
    );
  } else if (noseType === "wrinkles") {
    return (
      <WrinklesSVG color={color} width={width} height={height} {...props} />
    );
  }
  return <div className="h-[100px] w-24"></div>;
};

export { SkinSVG, HairSVG, FacialHairSVG, BodySVG, EyesSVG, MouthSVG, NoseSVG };
