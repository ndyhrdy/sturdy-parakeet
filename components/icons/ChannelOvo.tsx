import React, { FC, SVGProps } from "react";

export { ChannelOvo };

const ChannelOvo: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 24" {...props}>
      <path
        d="M21.19,20.24a12.54,12.54,0,0,1-8.8,3.45,12.59,12.59,0,0,1-8.85-3.45,11.68,11.68,0,0,1,0-16.77A12.55,12.55,0,0,1,12.4,0a12.54,12.54,0,0,1,8.8,3.45,11.67,11.67,0,0,1,0,16.77M12.4,3.86a7.73,7.73,0,0,0-7.8,8,7.78,7.78,0,1,0,15.56,0,7.73,7.73,0,0,0-7.76-8m38-1.07L40.89,24l-.54-.1c-2.72-.49-3.27-1.17-4.54-3.93L28.68,4.44H26V.67H36.13V4.44H33.71l5.73,12.85L45,4.44H42V.67h8.4Zm23,17.45a13,13,0,0,1-17.64,0,11.68,11.68,0,0,1,0-16.77,13,13,0,0,1,17.64,0,11.65,11.65,0,0,1,0,16.77M64.65,3.86a7.74,7.74,0,0,0-7.81,8,7.78,7.78,0,1,0,15.56,0,7.72,7.72,0,0,0-7.75-8"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
