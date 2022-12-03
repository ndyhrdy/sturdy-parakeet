import React, { FC, SVGProps } from "react";

export { BankTransfer };

const BankTransfer: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.684 12.5h-3v13h3v-13zM15.684 12.5h-3v13h3v-13zM23.684 12.5h-3v13h3v-13zM3.184 25.5h22a1.5 1.5 0 011.5 1.5v1a.5.5 0 01-.5.5h-24a.5.5 0 01-.5-.5v-1a1.5 1.5 0 011.5-1.5v0zM26.684 9.5h-25v3h25v-3z"
        stroke="currentColor"
      ></path>
      <path
        d="M14.184 2.147L2.002 9h24.365L14.184 2.147zm0-1a1 1 0 01.49.129l12.183 6.852c.897.505.539 1.872-.49 1.872H2.002c-1.03 0-1.388-1.367-.49-1.872l12.182-6.852a1 1 0 01.49-.129z"
        fill="currentColor"
      ></path>
      <circle
        cx="24"
        cy="24"
        r="7.5"
        stroke="currentColor"
        fill="#222"
      ></circle>
      <path
        d="M27.5 25.5h-6.646l1.073-1.073-.354-.354-1.5 1.5a.25.25 0 000 .354l1.5 1.5.354-.354L20.854 26H27.5v-.5 0zM27.927 22.073l-1.5-1.5-.354.354L27.146 22H20.5v.5h6.646l-1.073 1.073.354.354 1.5-1.5a.25.25 0 000-.354z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.2"
        mask="#bank-transfer-mask"
      ></path>
    </svg>
  );
};
