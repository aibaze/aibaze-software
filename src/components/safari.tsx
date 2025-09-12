import { SVGProps } from "react";

export interface SafariProps extends SVGProps<SVGSVGElement> {
  url?: string;
  src?: string;
  width?: number;
  height?: number;
}

export default function Safari({
  src,
  url,
  width = 1203,
  height = 753,
  ...props
}: SafariProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
 
        <image
          href={src}
          width="1200"
          height="700"
          x="1"
          y="52"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedBottom)"
        />
     
    </svg>
  );
}
