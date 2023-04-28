
export const BeardMustacheSVG = ({
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

export const GoateeSVG = ({
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

export const SoulpatchSVG = ({
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

export const WalrusSVG = ({
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

export const PyramidSVG = ({
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

export const ShadowSVG = ({
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
