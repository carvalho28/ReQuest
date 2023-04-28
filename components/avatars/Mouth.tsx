import React from "react";

export const BigSmileSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 4,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path fill="#fff" d="M29 38h6v1a3 3 0 0 1-6 0z" />
  </svg>
);

export const FrownSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M28.004 40.132a1 1 0 0 0 .992 1.736C30.016 41.285 31.014 41 32 41s1.983.285 3.004.868a1 1 0 1 0 .992-1.736C34.684 39.382 33.348 39 32 39c-1.348 0-2.684.382-3.996 1.132z"
    />
  </svg>
);

export const LipsSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#dc5c7a"
        d="M28 41h8c-.667 1.667-2 2.5-4 2.5s-3.333-.833-4-2.5z"
      />
      <path
        fill="#f57b98"
        d="M32 40a2.092 2.092 0 0 1 3.612.225L36 41h-8l.388-.775A2.092 2.092 0 0 1 32 40z"
      />
    </g>
  </svg>
);

export const PacifierSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#456dff"
        d="M34.996 42.665a3 3 0 0 1-5.992 0A3.5 3.5 0 0 1 27 39.5a2.035 2.035 0 0 1 2.73-1.912c.756.275 1.513.412 2.27.412s1.514-.137 2.27-.412A2.035 2.035 0 0 1 37 39.5a3.5 3.5 0 0 1-2.004 3.165zM33.415 43h-2.83a1.5 1.5 0 0 0 2.83 0z"
      />
      <g fill="#fff" transform="translate(23 36)">
        <path
          fillOpacity={0.26}
          d="M11.996 6.665a3 3 0 1 0-5.991 0A3.5 3.5 0 0 1 4 3.5a2.035 2.035 0 0 1 2.73-1.912C7.485 1.863 8.242 2 9 2s1.514-.137 2.27-.412A2.035 2.035 0 0 1 14 3.5a3.5 3.5 0 0 1-2.004 3.165zM10.415 7h-2.83a1.5 1.5 0 1 1 2.83 0z"
        />
        <circle cx={9} cy={4.5} r={1.5} />
      </g>
    </g>
  </svg>
);

export const SmileSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M28.004 41.868a1 1 0 0 1 .992-1.736c1.02.583 2.018.868 3.004.868s1.983-.285 3.004-.868a1 1 0 1 1 .992 1.736C34.684 42.618 33.348 43 32 43c-1.348 0-2.684-.382-3.996-1.132z"
    />
  </svg>
);

export const SmirkSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <path
      fill="#1b0640"
      d="M30.318 41.728a.75.75 0 0 1 .364-1.456c2.433.609 4.165.32 5.288-.802a.75.75 0 0 1 1.06 1.06c-1.544 1.545-3.812 1.923-6.712 1.198z"
    />
  </svg>
);

export const SurpriseSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 8 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <ellipse cx={32} cy={41} fill="#1b0640" rx={2} ry={2.5} />
  </svg>
);
