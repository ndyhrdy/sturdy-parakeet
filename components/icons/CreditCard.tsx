import React, { FC, SVGProps } from "react";

export { CreditCard };

const CreditCard: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 7.5H5A1.5 1.5 0 003.5 9v14A1.5 1.5 0 005 24.5h22a1.5 1.5 0 001.5-1.5V9A1.5 1.5 0 0027 7.5z"
        stroke="currentColor"
      ></path>
      <path d="M29 12H3v4h26v-4z" fill="currentColor"></path>
      <path d="M6 20h8" stroke="currentColor" strokeLinecap="round"></path>
      <path d="M26 17h-5v5h5v-5z" fill="#222"></path>
      <path d="M25.5 17.5h-4v4h4v-4z" stroke="currentColor"></path>
    </svg>
  );
};
