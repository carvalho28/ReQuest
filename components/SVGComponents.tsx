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
  }
  return <div className="h-[100px] w-20"></div>
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
      d="M176.083 60.958c13.391 6.013 21.242 20.265 19.167 34.796l-3.583 25.079c-11.779-7.066-19.563-23.125-23.35-48.17A38.505 38.505 0 0 1 144.6 84.221c-7.596.796-14.129 1.196-19.6 1.196-12.5 0-23.613-2.084-33.333-6.25 0 15.279-5.555 29.862-16.667 43.75l-3.842-35.555a37.654 37.654 0 0 1-.217-4.029c0-20.57 16.926-37.498 37.496-37.5h70.73a38.483 38.483 0 0 1-3.084 15.125Z"
      style={{
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

export { SkinSVG, HairSVG };
