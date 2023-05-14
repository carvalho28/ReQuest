export const GlassesSVG = ({
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

export const HappySVG = ({
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

export const OpenSVG = ({
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

export const SleepSVG = ({
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

export const WinkSVG = ({
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

export const SunglassesSVG = ({
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
