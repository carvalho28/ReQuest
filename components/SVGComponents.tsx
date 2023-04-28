import * as React from "react";

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

const ShortComboverSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M176.083 60.958c13.391 6.013 21.242 20.265 19.167 34.796l-3.583 25.079c-11.779-7.066-19.563-23.125-23.35-48.17A38.505 38.505 0 0 1 144.6 84.221c-7.596.796-14.129 1.196-19.6 1.196-12.5 0-23.613-2.084-33.333-6.25 0 15.279-5.555 29.862-16.667 43.75l-3.842-35.555a37.654 37.654 0 0 1-.217-4.029c0-20.57 16.926-37.498 37.496-37.5h70.73a38.483 38.483 0 0 1-3.084 15.125Z"
      style={{
        color: color,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BaldingSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M173.617 79.167h6.947c6.858 0 12.5 5.642 12.5 12.5 0 .437-.022.873-.068 1.308l-2.713 25.775a5.694 5.694 0 0 1-5.42-3.975l-11.246-35.608Zm-83.334 0-11.25 35.608a5.687 5.687 0 0 1-5.416 3.975L70.9 92.975a12.43 12.43 0 0 1-.069-1.308c0-6.858 5.643-12.5 12.5-12.5h6.952Z"
      style={{
        fillRule: "nonzero",
      }}
    />
    <path
      d="M93.275 97.658a3.129 3.129 0 0 1-2.785 1.708 3.14 3.14 0 0 1-3.125-3.125c0-.477.109-.947.318-1.374a68.95 68.95 0 0 1 9.175-14.025 49.438 49.438 0 0 1 12.5-10.509 3.126 3.126 0 0 1 1.641-.465 3.14 3.14 0 0 1 3.125 3.125c0 1.122-.604 2.16-1.578 2.715a43.157 43.157 0 0 0-10.929 9.188 62.73 62.73 0 0 0-8.342 12.762Zm26.517-26.825a3.139 3.139 0 0 1-3.125-3.125 3.14 3.14 0 0 1 3.125-3.125 3.14 3.14 0 0 1 3.125 3.125 3.14 3.14 0 0 1-3.125 3.125Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.2,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const CurlySVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="m191.667 116.667-.088-.096a8.326 8.326 0 0 1-1.281.099c-4.571 0-8.333-3.762-8.333-8.333 0-1.27.29-2.522.847-3.662a8.33 8.33 0 0 1-3.096.597c-4.572 0-8.334-3.762-8.334-8.334 0-.331.02-.663.06-.992a8.347 8.347 0 0 1-7.634 4.991 8.336 8.336 0 0 1-6.129-2.687l-.05.021v.176c0 4.572-3.762 8.334-8.333 8.334a8.343 8.343 0 0 1-7.3-4.314c-.403 4.257-4.02 7.549-8.297 7.549a8.354 8.354 0 0 1-8.045-6.162 8.348 8.348 0 0 1-7.785 5.36c-4.39 0-8.065-3.469-8.319-7.851l-.546-.092a8.342 8.342 0 0 1-6.995 3.804c-4.405 0-8.088-3.493-8.321-7.892a84.034 84.034 0 0 1-3.459-1.358c.049.367.074.738.074 1.109 0 4.571-3.762 8.333-8.333 8.333a8.328 8.328 0 0 1-3.095-.596 8.338 8.338 0 0 1 .845 3.657 8.346 8.346 0 0 1-4.72 7.51v.941c-9.475 1.022-16.74 9.113-16.74 18.642 0 10.286 8.465 18.75 18.75 18.75.136 0 .271-.001.407-.004a58.52 58.52 0 0 0 35.083 37.837v12.758a14.503 14.503 0 0 1-2.717-2.833 86.871 86.871 0 0 1-5.958-1.917 14.417 14.417 0 0 1-11.329-.575 14.423 14.423 0 0 1-7.567-9.025 86.828 86.828 0 0 1-4.112-2.945 14.43 14.43 0 0 1-11.425-3.8 14.442 14.442 0 0 1-4.529-11.988 86.94 86.94 0 0 1-2.063-2.754A14.461 14.461 0 0 1 51.692 147.8c-.192-.542-.384-1.083-.567-1.625a14.488 14.488 0 0 1-9.773-13.678c0-4.326 1.942-8.432 5.286-11.176v-.038a14.47 14.47 0 0 1-7.058-12.42 14.483 14.483 0 0 1 9.02-13.396 14.463 14.463 0 0 1-3.748-9.712c0-7.464 5.779-13.763 13.215-14.405a14.452 14.452 0 0 1-1.36-6.122c0-7.931 6.527-14.458 14.458-14.458 1.026 0 2.049.109 3.052.326a14.463 14.463 0 0 1-.139-1.994c0-7.932 6.527-14.459 14.459-14.459 2.483 0 4.924.64 7.088 1.857 1.133-6.968 7.211-12.139 14.271-12.139 3.962 0 7.755 1.629 10.483 4.501a14.48 14.48 0 0 1 12.954-8.037 14.48 14.48 0 0 1 12.955 8.037 14.465 14.465 0 0 1 10.483-4.501c7.059 0 13.138 5.171 14.271 12.139a14.46 14.46 0 0 1 7.088-1.857c7.931 0 14.458 6.527 14.458 14.459 0 .667-.046 1.333-.138 1.994a14.468 14.468 0 0 1 3.049-.325c7.932 0 14.459 6.526 14.459 14.458 0 2.114-.464 4.202-1.358 6.117 7.437.64 13.218 6.94 13.218 14.405 0 3.591-1.338 7.056-3.751 9.716a14.482 14.482 0 0 1 9.019 13.396c0 5.088-2.686 9.816-7.057 12.42v.042a14.467 14.467 0 0 1 5.286 11.176 14.488 14.488 0 0 1-9.773 13.678c-.184.542-.375 1.083-.567 1.621a14.461 14.461 0 0 1-11.108 21.125 88.5 88.5 0 0 1-2.063 2.754 14.442 14.442 0 0 1-4.529 11.988 14.432 14.432 0 0 1-11.425 3.8c-1.342 1.02-2.713 2-4.112 2.945a14.426 14.426 0 0 1-7.567 9.025 14.418 14.418 0 0 1-11.329.575 86.722 86.722 0 0 1-5.959 1.917 14.528 14.528 0 0 1-2.716 2.833v-12.758a58.521 58.521 0 0 0 35.083-37.841l.333.004h.033c10.286 0 18.75-8.464 18.75-18.75 0-9.515-7.242-17.597-16.699-18.638v-.112Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BeanieSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M79.15 90.85c8.596-21.5 29.617-36.683 54.183-36.683 24.567 0 45.584 15.187 54.184 36.683.329.263.654.529.979.8a4.164 4.164 0 0 1 1.408 2.25l2.613 11a2.093 2.093 0 0 1-2.029 2.557 2.08 2.08 0 0 1-1.196-.378C170.787 94.025 152.133 87.5 133.333 87.5c-18.804 0-37.437 6.529-55.904 19.592-.351.247-.77.38-1.2.38a2.093 2.093 0 0 1-2.029-2.555l2.567-11a4.157 4.157 0 0 1 1.408-2.275l.975-.792Z"
      style={{
        fillRule: "nonzero",
      }}
    />
    <path
      d="M133.333 70.833c19.913 0 38.3 6.938 55.167 20.817a4.161 4.161 0 0 1 1.404 2.25l2.613 11a2.093 2.093 0 0 1-2.029 2.557 2.08 2.08 0 0 1-1.196-.378C170.787 94.025 152.133 87.5 133.333 87.5c-18.804 0-37.437 6.529-55.904 19.592-.351.247-.77.38-1.2.38a2.093 2.093 0 0 1-2.029-2.555l2.567-11a4.157 4.157 0 0 1 1.408-2.275c16.867-13.875 35.25-20.809 55.158-20.809Z"
      style={{
        fillOpacity: 0.25,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const LongSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M191.667 116.667c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.238c0-37.97 29.846-68.75 66.666-68.75 36.821 0 66.667 30.78 66.667 68.75v5.242a18.64 18.64 0 0 0-8.333-3.042v-.116ZM200 151.004v27.521c0 30.467-19.217 56.304-45.833 65.329V192a58.52 58.52 0 0 0 35.083-37.842l.333.004A18.664 18.664 0 0 0 200 151.004Zm-86.958 93.029c-26.896-8.854-46.375-34.833-46.375-65.508v-27.517a18.66 18.66 0 0 0 10.75 3.154 58.518 58.518 0 0 0 35.083 37.842v22.767c.213 9.816.396 19.571.542 29.262Z"
      style={{
        fillRule: "nonzero",
      }}
    />
    <path
      d="M191.667 116.667c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.238c0-37.97 29.846-68.75 66.666-68.75 36.821 0 66.667 30.78 66.667 68.75v5.242a18.64 18.64 0 0 0-8.333-3.042v-.116Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.26,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BobBangsSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M191.667 116.667c-9.071-10.079-15.217-23.084-18.438-39.013-9.383 15.059-21.987 25.979-37.812 32.763-19.446 8.333-39.584 9.721-60.417 4.166v2.196a18.64 18.64 0 0 0-8.333 3.042v-5.238c0-37.97 29.845-68.75 66.666-68.75S200 76.613 200 114.583v5.242a18.64 18.64 0 0 0-8.333-3.042v-.116Zm-37.5 88.804v-13.467a58.521 58.521 0 0 0 35.083-37.841l.333.004A18.673 18.673 0 0 0 200 151.008v44.825c-12.971 5.046-28.25 8.259-45.833 9.638Zm-41.667 0c-17.583-1.379-32.863-4.592-45.833-9.638v-44.825a18.668 18.668 0 0 0 10.75 3.155 58.519 58.519 0 0 0 35.083 37.841v13.467Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BobCutSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M191.667 116.667c-5.884-6.542-10.542-14.309-13.959-23.313-13.3 4.525-28.091 6.788-44.375 6.788-20.2 0-38.104-3.484-53.708-10.442A58.143 58.143 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.729c0-37.7 29.846-68.259 66.666-68.259 36.821 0 66.667 30.559 66.667 68.259v5.733a18.64 18.64 0 0 0-8.333-3.042v-.116Zm-37.5 83.587V192a58.52 58.52 0 0 0 35.083-37.833h.333A18.673 18.673 0 0 0 200 151.008v26.567c0 1.987-.083 3.954-.246 5.896-15.196 8.516-30.391 14.108-45.587 16.783Zm-41.667-.004c-15.196-2.667-30.392-8.262-45.587-16.779a70.746 70.746 0 0 1-.246-5.896v-26.567a18.668 18.668 0 0 0 10.75 3.155 58.519 58.519 0 0 0 35.083 37.841v8.246Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BunUndercutSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <circle
      cx={133.333}
      cy={58.333}
      r={16.667}
      style={{
        fill: "#5a45ff",
      }}
    />
    <path
      fill={color}
      d="m148.625 93.75.225-31.929c8.9-.054 13.363-.054 13.392 0 17.579 10.054 29.425 28.979 29.425 50.679V125c-5.554-6.946-11.113-19.446-16.667-37.5-2.067 1.042-10.858 3.125-26.375 6.25Zm-30.583 0c-15.517-3.125-24.309-5.208-26.375-6.25C86.112 105.554 80.554 118.054 75 125v-12.5c0-21.7 11.846-40.629 29.425-50.679h13.625l-.008 31.929Z"
      style={{
        fillOpacity: 0.3,
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="M116.725 52.383c.725-10.666 7.883-19.05 16.608-19.05 8.688 0 15.825 8.309 16.596 18.917 3.063 1.638 6.084 3.738 9.067 6.3a12.505 12.505 0 0 1 4.333 8.917l.409 9.041c.364 8.057-5.169 15.279-13.042 17.025-6.904 1.534-12.696 2.3-17.363 2.3-4.716 0-10.683-.8-17.891-2.4-7.908-1.754-13.33-9.206-12.567-17.27l.867-9.167a12.5 12.5 0 0 1 4.016-8.05 48.129 48.129 0 0 1 8.967-6.563Zm1.321-.704c4.937-2.508 10.029-3.762 15.287-3.762 5.184 0 10.259 1.208 15.23 3.633a16.694 16.694 0 0 0-15.23-9.897 16.693 16.693 0 0 0-15.287 10.026Z"
      style={{
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="M116.729 52.333c.742-10.645 7.896-19 16.604-19 8.609 0 15.688 8.155 16.575 18.621a43.874 43.874 0 0 0-1.475-.687 16.69 16.69 0 0 0-15.099-9.61c-6.6 0-12.605 3.921-15.259 9.964-.453.228-.902.466-1.346.712Z"
      style={{
        fillOpacity: 0.22,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BuzzcutSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M191.667 112.5V125c-5.554-6.946-11.113-19.446-16.667-37.5-11.071 5.554-24.958 8.333-41.667 8.333-16.708 0-30.595-2.779-41.666-8.333-5.554 15.279-11.113 26.388-16.667 33.333V112.5c0-32.217 26.117-58.333 58.333-58.333 32.217 0 58.334 26.116 58.334 58.333Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const CapSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M133.333 79.175c16.171 0 31.45-1.567 45.834 17.575l-7.917 27.054c-2.546 5.113-6.817 6.492-10.262 3.313-8.709-8.038-17.926-12.054-27.655-12.054-9.729 0-18.945 4.016-27.654 12.054-3.446 3.179-7.716 1.8-10.258-3.313L87.5 96.75c14.383-19.142 29.663-17.575 45.833-17.575Z"
      style={{
        fill: color,
        fillOpacity: 0.2,
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="M122.05 55.025a12.517 12.517 0 0 1 11.283-7.121c4.812 0 9.213 2.778 11.284 7.121 25.416 3.988 45.037 21.817 47.05 52.963a115.296 115.296 0 0 0-16.5-5.425l-3.917 2.508a8.358 8.358 0 0 1-10.263 1.925c-8.708-4.667-17.924-6.996-27.654-6.996-9.729 0-18.945 2.333-27.654 6.996a8.356 8.356 0 0 1-10.258-1.925l-3.917-2.508A115.301 115.301 0 0 0 75 107.987c2.013-31.145 21.633-48.975 47.05-52.958v-.004Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="M91.5 102.563a115.255 115.255 0 0 0-16.5 5.425c2.304-35.625 27.633-53.821 58.333-53.821s56.03 18.2 58.334 53.821a115.296 115.296 0 0 0-16.5-5.425l4-2.563c-14.384-11.112-29.663-16.667-45.834-16.667-16.17 0-31.45 5.555-45.833 16.667l4 2.563Z"
      style={{
        fillOpacity: 0.28,
        fillRule: "nonzero",
      }}
    />
    <path
      d="m172.7 104.142-1.454.929a8.356 8.356 0 0 1-10.258 1.925c-8.709-4.667-17.926-6.996-27.655-6.996-9.729 0-18.945 2.333-27.654 6.996a8.356 8.356 0 0 1-10.258-1.925l-1.454-.929c3.608.283 9.095-1.996 11.712-3.396 8.708-4.667 17.925-6.996 27.654-6.996s18.946 2.333 27.654 6.996c2.617 1.4 8.105 3.679 11.713 3.396Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.2,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const CurlyBunSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M185.6 86.571c-9.542-19.208-29.362-32.404-52.267-32.404-22.904 0-42.725 13.2-52.266 32.404a8.354 8.354 0 0 1 2.295-9.9v-.021a8.342 8.342 0 0 1-4.067-7.159 8.347 8.347 0 0 1 5.197-7.72 8.335 8.335 0 0 1-2.164-5.601c0-4.304 3.334-7.936 7.622-8.303a8.329 8.329 0 0 1-.784-3.53c0-4.571 3.761-8.333 8.333-8.333.591 0 1.181.063 1.759.188a8.34 8.34 0 0 1-.079-1.149c0-4.571 3.762-8.333 8.333-8.333 1.43 0 2.837.368 4.084 1.069.652-4.017 4.156-6.997 8.225-6.997a8.34 8.34 0 0 1 6.046 2.597 8.344 8.344 0 0 1 7.466-4.633c3.162 0 6.063 1.8 7.467 4.633a8.339 8.339 0 0 1 6.045-2.597c4.07 0 7.574 2.98 8.226 6.997a8.336 8.336 0 0 1 4.084-1.069c4.572 0 8.333 3.761 8.333 8.333 0 .386-.026.771-.08 1.153a8.353 8.353 0 0 1 1.762-.189c4.572 0 8.333 3.762 8.333 8.334a8.342 8.342 0 0 1-.782 3.526c4.286.369 7.618 4 7.618 8.302a8.335 8.335 0 0 1-2.164 5.602 8.346 8.346 0 0 1 5.199 7.721 8.342 8.342 0 0 1-4.066 7.158v.021a8.355 8.355 0 0 1 2.292 9.9Z"
      style={{
        fillRule: "nonzero",
      }}
    />
    <path
      d="M191.392 106.8c-8.775-21.117-29.6-35.967-53.892-35.967h-8.333c-24.292 0-45.117 14.85-53.892 35.967 2.862-29.542 27.767-52.633 58.058-52.633 30.292 0 55.196 23.091 58.059 52.633Z"
      style={{
        fill: "#f55d81",
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const CurlyHighTopSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M140.8 37.5a8.352 8.352 0 0 1 7.95-5.835 8.352 8.352 0 0 1 7.95 5.835h2.325a8.346 8.346 0 0 1 7.642-5.011c4.369 0 8.034 3.435 8.316 7.794.313.125.625.263.934.396a8.332 8.332 0 0 1 5.336-1.933c4.572 0 8.334 3.762 8.334 8.333a8.33 8.33 0 0 1-.629 3.175l.634.746a8.363 8.363 0 0 1 1.655-.166c4.572 0 8.334 3.762 8.334 8.333a8.335 8.335 0 0 1-2.593 6.041c.175.65.333 1.309.475 1.971a8.35 8.35 0 0 1 5.46 7.822 8.35 8.35 0 0 1-5.385 7.795l-.196 1.35a8.344 8.344 0 0 1 4.742 7.52 8.345 8.345 0 0 1-4.834 7.563 8.32 8.32 0 0 1 .663 3.55 7.503 7.503 0 0 1 1.671 4.721c0 3.834-2.94 7.082-6.755 7.463l-1.162 7.954c-1.834-2.746-3.509-6.167-5.038-10.271a7.492 7.492 0 0 1-1.821-3.317c-3.588-2.502-4.623-7.427-2.345-11.162a60.046 60.046 0 0 1-.092-.409 8.348 8.348 0 0 1-5.29-7.757c0-1.587.453-3.142 1.306-4.48a8.33 8.33 0 0 1-10.166-1.346 8.35 8.35 0 0 1-7.805 5.413 8.347 8.347 0 0 1-7.712-5.175l-1.3.133a8.347 8.347 0 0 1-7.655 5.04 8.343 8.343 0 0 1-7.232-4.194l-.959.012a8.34 8.34 0 0 1-7.224 4.18 8.343 8.343 0 0 1-7.446-4.592c-.57-.04-1.14-.083-1.709-.129a8.346 8.346 0 0 1-7.512 4.725 8.348 8.348 0 0 1-7.804-5.413 8.324 8.324 0 0 1-12.667-.917c-.031.216-.063.431-.096.646A8.338 8.338 0 0 1 93.751 90a8.351 8.351 0 0 1-5.572 7.863 8.333 8.333 0 0 1 1.409 4.635c0 4.157-3.11 7.71-7.23 8.26A103.677 103.677 0 0 1 75 122.917l-.783-8.013c-3.618-.584-6.305-3.739-6.305-7.404a7.513 7.513 0 0 1 4.896-7.033l-.05-.525c-4.173-.495-7.352-4.073-7.352-8.276a8.35 8.35 0 0 1 5.769-7.928l-.054-.6a8.358 8.358 0 0 1-6.542-8.139c0-4.003 2.885-7.468 6.821-8.195.054-.246.111-.492.171-.737a8.34 8.34 0 0 1-3.66-6.9c0-4.571 3.762-8.333 8.334-8.333.472 0 .944.04 1.409.12a8.34 8.34 0 0 1-.572-3.036c0-4.571 3.761-8.333 8.333-8.333 1.809 0 3.569.589 5.014 1.678a9.145 9.145 0 0 1-.011-.438c0-4.571 3.761-8.333 8.333-8.333a8.346 8.346 0 0 1 7.657 5.046l.217-.013a8.352 8.352 0 0 1 7.958-5.861 8.352 8.352 0 0 1 7.95 5.836h.767a8.352 8.352 0 0 1 7.95-5.835 8.352 8.352 0 0 1 7.95 5.835h1.6Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const ExtraLongSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      color={color}
      d="M191.667 116.667c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.238c0-37.97 29.846-68.75 66.666-68.75 36.821 0 66.667 30.78 66.667 68.75v5.242a18.64 18.64 0 0 0-8.333-3.042v-.116ZM200 151.004v27.521c0 30.467-19.217 56.304-45.833 65.329V192a58.52 58.52 0 0 0 35.083-37.842l.333.004A18.664 18.664 0 0 0 200 151.004Zm-86.958 93.029c-26.896-8.854-46.375-34.833-46.375-65.508v-27.517a18.66 18.66 0 0 0 10.75 3.154 58.518 58.518 0 0 0 35.083 37.842v22.767c.213 9.816.396 19.571.542 29.262Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <path
      color={color}
      d="M191.667 116.667c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.238c0-37.97 29.846-68.75 66.666-68.75 36.821 0 66.667 30.78 66.667 68.75v5.242a18.64 18.64 0 0 0-8.333-3.042v-.116Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.26,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const FadeSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      color={color}
      d="M191.667 112.5v8.333c-5.513-14.641-12.75-22.454-15.663-25-4.367-3.82-10.325-7.479-13.958-15.546-2.375-5.283-1.975-12.249-1.638-19.47 19.196 10.056 31.266 30.013 31.259 51.683ZM75 112.5v8.333c5.513-14.641 12.75-22.454 15.663-25 4.366-3.82 10.325-7.479 13.958-15.546 2.375-5.283 1.975-12.249 1.637-19.47C87.063 70.873 74.993 90.83 75 112.5Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <path
      color={color}
      d="M116.571 55.108 166.667 50a28.496 28.496 0 0 1 1.461 9.008c0 15.63-12.861 28.492-28.491 28.492h-25.9c-6.857 0-12.499-5.643-12.499-12.5l-.001-2.917c.002-8.709 6.67-16.09 15.334-16.975Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={1}
        y1={0}
        y2={0}
        gradientTransform="rotate(90 36.258 97.075) scale(60.0167)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#000",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#000",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
    </defs>
  </svg>
);

const MohawkSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      color={color}
      d="M133.475 41.667c11.442 0 17.571 5.987 20.175 8.55 2.346 2.25 4.033 5.471 4.633 8.916l2.763 17.375c1.475 8.092-2.909 15.271-10.525 17.025-6.771 1.534-12.521 2.3-17.188 2.3-4.716 0-10.637-.8-17.683-2.4-7.633-1.762-11.808-9.166-9.896-17.27l3.275-17.5a16.546 16.546 0 0 1 4.313-8.05c2.6-2.675 8.691-8.946 20.133-8.946Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <path
      d="M153.65 50.217c2.346 2.25 4.033 5.471 4.633 8.916l2.763 17.375c1.475 8.092-2.909 15.271-10.525 17.025-6.771 1.534-12.521 2.3-17.188 2.3-4.716 0-10.637-.8-17.683-2.4-7.633-1.762-11.808-9.166-9.896-17.27l3.275-17.5a16.546 16.546 0 0 1 4.313-8.05 32.243 32.243 0 0 1 5.208-4.509c-1.317 2.034-6.05 4.113-6.05 10.146v14.583c-1.342 6.855 3.042 13.142 8.404 14.638 4.946 1.354 9.108 2.029 12.421 2.029 3.279 0 7.321-.65 12.075-1.946 5.354-1.483 9.8-7.875 8.767-14.721v-12.5c0-6.25-4.605-10.6-6.25-12.5a6.24 6.24 0 0 0-.567-.583c3.025 1.75 5.063 3.75 6.3 4.967Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.26,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const PigtailsSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M170.838 57.65c.233-11.167 9.541-20.15 20.995-20.15 11.596 0 21 9.213 21 20.583 0 .33-.012.659-.029.988.075 13.337 2.95 29.5 8.034 40.929-9.4-2.525-18.059-6.75-25.917-12.096A69.46 69.46 0 0 1 200 114.092v5.733a18.64 18.64 0 0 0-8.333-3.042v-.116c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-5.729c0-9.279 1.808-18.125 5.083-26.188C63.892 93.25 55.233 97.475 45.833 100c5.084-11.429 7.959-27.592 8.034-40.929-.017-.33-.025-.661-.025-.992 0-11.366 9.4-20.579 20.991-20.579 11.45 0 20.759 8.983 20.992 20.15 10.688-7.458 23.6-11.817 37.508-11.817 13.909 0 26.821 4.359 37.505 11.817Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
    <path
      d="M170.888 56.592C188.388 68.938 200 90.696 200 115.475v4.35a18.64 18.64 0 0 0-8.333-3.042v-.116c-7.529-8.367-13.042-18.75-16.542-31.142-7.792 9.513-18.942 15.029-33.458 16.558-24.3 2.559-45.071-1.362-62.304-11.758A58.138 58.138 0 0 0 75 112.5v4.279a18.64 18.64 0 0 0-8.333 3.042v-4.346c0-24.779 11.616-46.542 29.112-58.883.025.35.042.704.05 1.058 10.684-7.458 23.596-11.817 37.504-11.817 13.909 0 26.821 4.359 37.505 11.817.008-.354.025-.708.05-1.058Z"
      style={{
        fill: "#fff",
        fillOpacity: 0.26,
        fillRule: "nonzero",
      }}
    />
    <path
      d="M75 66.667v-.001c0-11.429 9.405-20.833 20.833-20.833 4.797 0 9.45 1.656 13.167 4.688-12.942 5.2-23.912 14.417-31.437 26.162A20.742 20.742 0 0 1 75 66.667Zm95.833-20.834h.004c11.429 0 20.833 9.405 20.833 20.834 0 3.501-.882 6.946-2.566 10.016-7.525-11.741-18.5-20.962-31.437-26.162a20.751 20.751 0 0 1 13.166-4.688Z"
      style={{
        fill: color,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const ShortComboverChopsSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="m74.125 114.825-2.967-27.458a37.488 37.488 0 0 1-.217-4.034c0-20.57 16.926-37.498 37.497-37.5h70.729a38.483 38.483 0 0 1-3.084 15.125c13.391 6.013 21.242 20.265 19.167 34.796l-3.583 25.079-.009-.004v17.592c-.07 4.813-.737 9.6-1.983 14.25l-10.513 2.246a4.176 4.176 0 0 1-.871.092c-2.285 0-4.166-1.881-4.166-4.167 0-.286.029-.571.087-.85l7.913-37.975c-6.558-8.721-11.158-21.842-13.808-39.355A38.501 38.501 0 0 1 144.6 84.221c-7.596.796-14.129 1.196-19.6 1.196-12.5 0-23.613-2.084-33.333-6.25 0 10.791-2.775 21.241-8.321 31.345l8.225 39.48c.058.279.088.564.088.85 0 2.286-1.881 4.167-4.167 4.167-.293 0-.585-.031-.871-.092l-10.509-2.242a58.369 58.369 0 0 1-1.987-14.254v-23.596Z"
      style={{
        color: color,
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="m83.346 110.513 8.225 39.479c.058.279.088.564.088.85 0 2.286-1.881 4.167-4.167 4.167-.293 0-.585-.031-.871-.092l-10.508-2.242a58.322 58.322 0 0 1-1.988-14.254v-23.6l-2.967-27.459a37.654 37.654 0 0 1-.217-4.029c0-20.57 16.926-37.498 37.497-37.5h70.729a38.503 38.503 0 0 1-10.85 26.829A38.501 38.501 0 0 1 144.6 84.221c-7.596.796-14.129 1.196-19.6 1.196-12.5 0-23.613-2.084-33.333-6.25 0 10.791-2.775 21.241-8.321 31.345Zm108.312 10.317v17.592c-.07 4.813-.737 9.6-1.983 14.25l-10.512 2.246a4.193 4.193 0 0 1-.872.092c-2.285 0-4.166-1.881-4.166-4.167 0-.286.029-.571.088-.85l7.912-37.975c-4.787-6.367-8.529-15.075-11.233-26.125a38.71 38.71 0 0 0 14.375-18.775 32.983 32.983 0 0 1 9.983 28.637l-3.583 25.079-.009-.004Z"
      style={{
        fill: color,
        fillOpacity: 0.26,
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const SideShaveSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 267 267"
    width={width}
    height={height}
    {...props}
  >
    <path
      fill={color}
      d="M154.167 58c21.929 8.383 37.5 29.625 37.5 54.5v4.167c-3.696-8.625-8.092-15.463-13.188-20.525-7.642-7.596-13.896-2.892-18.858-10.509-3.313-5.079-5.129-14.291-5.454-27.637V58Z"
      style={{
        fillOpacity: 0.3,
        fillRule: "nonzero",
      }}
    />
    <path
      fill={color}
      d="M60.696 196.6a23.51 23.51 0 0 1-12.208 3.4H43.75c11.554-10.567 19.008-24.146 22.363-40.737.195-2.634.379-5.384.554-8.25a18.675 18.675 0 0 0 10.75 3.15 58.519 58.519 0 0 0 35.083 37.841v12.163c.002.178.004.355.004.533 0 21.493-17.686 39.179-39.18 39.179h-.153l-33.588-.129c11.113-22.85 18.054-38.288 20.834-46.304.096-.275.187-.554.279-.846Zm75.358-92.058c-17.446 13.791-69.387 9.025-69.387 35.325v-25.284c0-37.971 29.846-68.75 66.666-68.75 20.167 0 23.68 11.029 22.738 25.959-.784 12.458-2.571 18.941-20.017 32.745v.005Z"
      style={{
        fillRule: "nonzero",
      }}
    />
  </svg>
);

const BeardMustacheSVG = ({
  color,
  width = 100,
  height = 100,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    width={width}
    height={height}
    {...props}
  >
    <defs>
      <path
        id="a"
        fill={color}
        d="m12.473 9.458 2.423-.827A2.504 2.504 0 0 1 18 10.001a2.504 2.504 0 0 1 3.104-1.37l2.423.827c3.466-1.33 6.425-3.817 8.47-6.756C31.999 2.8 32 2.9 32 3v6c0 7.732-6.268 14-14 14S4 16.732 4 9V3c0-.1.001-.2.003-.298 2.045 2.94 5.004 5.425 8.47 6.756z"
      />
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" fill="none" />
      </mask>
    </defs>
    <g fill="none" transform="translate(14 26)">
      <use xlinkHref="#a" fill="#362c47" />
      <path
        fill={color}
        d="m12.473 9.458-2.812.96a1 1 0 0 0 .075 1.915l5.081 1.3A2.717 2.717 0 0 0 18 12.046a2.718 2.718 0 0 0 3.183 1.587l5.081-1.3a1 1 0 0 0 .075-1.916l-2.812-.96c3.466-1.33 6.425-3.816 8.47-6.755C31.999 2.8 32 2.9 32 3v6c0 7.732-6.268 14-14 14S4 16.732 4 9V3c0-.1.001-.2.003-.298 2.045 2.94 5.004 5.425 8.47 6.756z"
        mask="url(#b)"
        opacity={0.26}
      />
      <path
        fill={color}
        d="M22 13.424v.076a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3.076l.817.209A2.717 2.717 0 0 0 18 12.046a2.718 2.718 0 0 0 3.183 1.587z"
        mask="url(#b)"
      />
    </g>
  </svg>
);

const GoateeSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 2,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 10 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill={color}
      d="M28.033 36.527C29.444 36.176 30.766 36 32 36s2.556.176 3.967.527A4 4 0 0 1 39 40.408v4.475a3 3 0 0 1-1.513 2.606C35.72 48.496 33.944 49 32.157 49c-1.807 0-3.666-.514-5.578-1.542A3 3 0 0 1 25 44.816v-4.408a4 4 0 0 1 3.033-3.881zm.019 1.492a2 2 0 0 0-1.462 1.926v2.485a3 3 0 0 0 1.846 2.769c1.282.534 2.504.801 3.668.801 1.15 0 2.338-.26 3.567-.781a3 3 0 0 0 1.829-2.762v-2.5a2 2 0 0 0-1.47-1.93 15.16 15.16 0 0 0-4.03-.565c-1.304 0-2.62.185-3.948.557z"
    />
  </svg>
);

const SoulpatchSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 5,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 12 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path fill={color} d="M30 43.5h4l-.684 2.051a1.387 1.387 0 0 1-2.632 0z" />
  </svg>
);

const WalrusSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 2,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 6 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path fill={color} d="M29 35h6a5 5 0 0 1 5 5H24a5 5 0 0 1 5-5z" />
  </svg>
);

const PyramidSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 2,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 6 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill={color}
      d="M32.016 38.05a2.718 2.718 0 0 1-3.182 1.587l-5.082-1.3a1 1 0 0 1-.075-1.916l5.235-1.786a2.504 2.504 0 0 1 3.104 1.37 2.504 2.504 0 0 1 3.105-1.37l5.235 1.786a1 1 0 0 1-.075 1.915l-5.082 1.3a2.717 2.717 0 0 1-3.183-1.587z"
    />
  </svg>
);

const ShadowSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 1,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 6 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill={color}
      d="M46 29v4c0 7.732-6.268 14-14 14s-14-6.268-14-14v-4c0-.1.001-.2.003-.298C20.048 31.642 22.535 35.669 26 37c2-1.003 4-1.504 6-1.504s4 .501 6 1.504c3.465-1.33 5.952-5.359 7.997-8.298.002.099.003.198.003.298z"
      opacity={0.2}
    />
  </svg>
);

const GlassesSVG = ({
  color,
  width = 100,
  height = 100,
  scale = 1.5,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#1b0640"
        d="M26 30a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
      <path fill="#fff" d="M23 26h6v6h-6zm12 0h6v6h-6z" opacity={0.303} />
      <path
        fill="#1b0640"
        d="M31 25.053h2c1.5 0 2.5-1.053 5-1.053 1.667 0 3.333.35 5 1.053l1 .526v1.579l-1 .526v3.158C43 32.586 41.657 34 40 34h-4c-1.657 0-3-1.414-3-3.158v-3.684h-2v3.684C31 32.586 29.657 34 28 34h-4c-1.657 0-3-1.414-3-3.158v-3.158l-1-.526v-1.58l1-.525C22.667 24.35 24.333 24 26 24c2.5 0 3.5 1.053 5 1.053zm-2.757 1.47c-.844-.296-1.425-.418-2.243-.418-.995 0-1.993.15-3 .45v4.287c0 .581.448 1.053 1 1.053h4c.552 0 1-.472 1-1.053v-4.051c-.209-.07-.447-.155-.757-.267zm7.514 0c-.31.113-.548.198-.757.268v4.051c0 .581.448 1.053 1 1.053h4c.552 0 1-.472 1-1.053v-4.287c-1.007-.3-2.005-.45-3-.45-.818 0-1.399.122-2.243.419z"
      />
    </g>
  </svg>
);

const HappySVG = ({
  color,
  width = 100,
  height = 100,
  scale = 1.8,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M24.712 29.737a.75.75 0 1 1-1.424-.474c.434-1.301 1.383-2.013 2.712-2.013s2.278.712 2.712 2.013a.75.75 0 1 1-1.424.474c-.233-.699-.617-.987-1.288-.987s-1.055.288-1.288.987zm12 0a.75.75 0 0 1-1.424-.474c.434-1.301 1.383-2.013 2.712-2.013s2.278.712 2.712 2.013a.75.75 0 0 1-1.424.474c-.233-.699-.617-.987-1.288-.987s-1.055.288-1.288.987z"
    />
  </svg>
);

const OpenSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 1.7,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M25.5 30a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm13 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
    />
  </svg>
);

const SleepSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 1.7,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M36.004 29.368a1 1 0 1 1 .992-1.736c.438.25.852.368 1.254.368s.816-.118 1.254-.368a1 1 0 1 1 .992 1.736c-.73.417-1.482.632-2.246.632s-1.517-.215-2.246-.632zm-12 0a1 1 0 0 1 .992-1.736c.438.25.852.368 1.254.368s.816-.118 1.254-.368a1 1 0 0 1 .992 1.736c-.73.417-1.482.632-2.246.632s-1.517-.215-2.246-.632z"
    />
  </svg>
);

const WinkSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 1.7,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M25.5 30a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm14.907-2.744a.75.75 0 0 1 .186 1.488l-4 .5a.75.75 0 0 1-.186-1.488z"
    />
  </svg>
);

const SunglassesSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 1.7,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="#1b0640">
      <path d="M26 30a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      <path d="M23 26h6v6h-6zm12 0h6v6h-6z" opacity={0.801} />
      <path d="M33 25.053c1.5 0 2.5-1.053 5-1.053 1.667 0 3.333.35 5 1.053l1 .526v1.579l-1 .526v3.158C43 32.586 41.657 34 40 34h-4c-1.657 0-3-1.414-3-3.158v-3.684h-2v3.684C31 32.586 29.657 34 28 34h-4c-1.657 0-3-1.414-3-3.158v-3.158l-1-.526v-1.58l1-.525C22.667 24.35 24.333 24 26 24c2.5 0 3.5 1.053 5 1.053zm-4.757 1.47c-.844-.296-1.425-.418-2.243-.418-.995 0-1.993.15-3 .45v4.287c0 .581.448 1.053 1 1.053h4c.552 0 1-.472 1-1.053v-4.051c-.209-.07-.447-.155-.757-.267zm7.514 0c-.31.113-.548.198-.757.268v4.051c0 .581.448 1.053 1 1.053h4c.552 0 1-.472 1-1.053v-4.287c-1.007-.3-2.005-.45-3-.45-.818 0-1.399.122-2.243.419z" />
    </g>
  </svg>
);

export { SkinSVG, HairSVG, FacialHairSVG, BodySVG, EyesSVG };
