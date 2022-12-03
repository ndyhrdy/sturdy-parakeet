import React, { FC, SVGProps } from "react";

export { RetailOutlet };

const RetailOutlet: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28 18.5H4A1.5 1.5 0 002.5 20v4A1.5 1.5 0 004 25.5h24a1.5 1.5 0 001.5-1.5v-4a1.5 1.5 0 00-1.5-1.5z"
        stroke="currentColor"
      />
      <path d="M12 22H6" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M28 18v-1.666a.334.334 0 00-.332-.334H16.334a.334.334 0 00-.334.334V18h12zm1 1H15v-2.666c0-.737.597-1.334 1.334-1.334h11.334c.736 0 1.332.597 1.332 1.334V19z"
        fill="currentColor"
      />
      <path d="M22 10a1 1 0 011 1v4h-2v-4a1 1 0 011-1z" fill="#fff" />
      <path
        d="M22 10.5a.5.5 0 01.5.5v3.333a.167.167 0 01-.167.167h-.666a.167.167 0 01-.167-.167V11a.5.5 0 01.5-.5v0z"
        stroke="currentColor"
      />
      <path
        d="M26 6.5h-8A1.5 1.5 0 0016.5 8v4a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5V8A1.5 1.5 0 0026 6.5z"
        stroke="currentColor"
      />
    </svg>
  );
};
