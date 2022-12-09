import React, { FC, SVGProps } from "react";

export { QrCode };

const QrCode: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path d="M10.5 5H5" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 10.5L5 5" stroke="currentColor" strokeLinecap="round" />
      <path d="M21.5 5H27" stroke="currentColor" strokeLinecap="round" />
      <path d="M27 10.5L27 5" stroke="currentColor" strokeLinecap="round" />
      <path d="M10.5 27H5" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 21.5L5 27" stroke="currentColor" strokeLinecap="round" />
      <path d="M21.5 27H27" stroke="currentColor" strokeLinecap="round" />
      <path d="M27 21.5L27 27" stroke="currentColor" strokeLinecap="round" />
      <rect
        x="8.25"
        y="8.25"
        width="6.33333"
        height="6.33333"
        stroke="currentColor"
      />
      <rect
        x="8.25"
        y="17.4167"
        width="6.33333"
        height="6.33333"
        stroke="currentColor"
      />
      <rect
        x="18.3333"
        y="8.25"
        width="6.33333"
        height="6.33333"
        stroke="currentColor"
      />
      <rect
        x="18.3333"
        y="17.4167"
        width="6.33333"
        height="6.33333"
        stroke="currentColor"
      />
    </svg>
  );
};
