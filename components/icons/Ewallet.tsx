import React, { FC, SVGProps } from "react";

export { Ewallet };

const Ewallet: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 2.5H9A1.5 1.5 0 007.5 4v24A1.5 1.5 0 009 29.5h14a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0023 2.5zM7.5 6.5h17M7.5 23.5h17"
        stroke="currentColor"
      />
      <path d="M12.5 26.5h7" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
};
