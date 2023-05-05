export const MediumRoundSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 3 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#d78774"
        d="M28.25 34a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75c0 1.664-1.586 3.25-3.75 3.25s-3.75-1.586-3.75-3.25z"
      />
      <path
        fill="#fff"
        d="M35 33.25a.75.75 0 0 0-.75.75c0 .836-.914 1.75-2.25 1.75s-2.25-.914-2.25-1.75a.75.75 0 0 0-.75-.75v-.002h6z"
        opacity={0.8}
      />
    </g>
  </svg>
);

export const SmallRoundSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 4 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#d78774"
        d="M29.288 35.237a.75.75 0 0 1 .475-.949c.195-.065.885-.035 2.237-.035s2.04-.03 2.237.035a.75.75 0 0 1 .475.95c-.434 1.3-1.383 2.012-2.712 2.012s-2.278-.712-2.712-2.013z"
      />
      <path
        fill="#fff"
        d="M30.055 34.252h3.89a.75.75 0 0 0-.657.51c-.233.7-.617.988-1.288.988s-1.055-.288-1.288-.987a.75.75 0 0 0-.657-.511z"
        opacity={0.8}
      />
    </g>
  </svg>
);

export const WrinklesSVG = ({
  color = "#000",
  width = 100,
  height = 100,
  scale = 2.5,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 4 64 64"
    width={width}
    height={height}
    transform={`scale(${scale})`}
    pointerEvents="none"
    {...props}
  >
    <g fill="none">
      <path
        fill="#e7a391"
        d="M29.206 31.779h5.588a.75.75 0 0 1 .794.255c.037.03.084.061.1.104.208.575.284 1.278.228 2.11-.223 1.614-1.589 2.502-3.916 2.502-2.321 0-3.686-.884-3.914-2.488-.057-.841.022-1.55.237-2.124.012-.032.045-.057.071-.08a.75.75 0 0 1 .812-.28z"
      />
      <path
        fill="#fff"
        d="M34.794 31.779a.75.75 0 0 0-.515.927c.523 1.83-.089 2.544-2.279 2.544s-2.802-.713-2.279-2.544A.75.75 0 0 0 29 31.75h6a.75.75 0 0 0-.206.029z"
        opacity={0.8}
      />
      <path
        fill="#000"
        d="M28.394 32.057a.748.748 0 0 0-.115.237c-.212.741-.274 1.4-.193 1.968a20.878 20.878 0 0 0-.875 1.48 20.24 20.24 0 0 0-1.238 2.92.5.5 0 0 1-.946-.324c.394-1.15.827-2.172 1.3-3.065.472-.89 1.137-1.934 1.996-3.135a.502.502 0 0 1 .071-.08zm7.522 2.192c.078-.565.015-1.22-.195-1.955a.748.748 0 0 0-.133-.26.5.5 0 0 1 .1.104c.858 1.201 1.522 2.245 1.994 3.135.474.893.907 1.914 1.301 3.065a.5.5 0 1 1-.946.324 20.24 20.24 0 0 0-1.238-2.92c-.24-.452-.534-.95-.883-1.493z"
        opacity={0.119}
      />
    </g>
  </svg>
);
