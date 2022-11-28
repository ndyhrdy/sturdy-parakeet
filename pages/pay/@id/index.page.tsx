import React, { FC } from "react";

export { Page };

type Props = {
  order: Order;
};

const Page: FC<Props> = ({ order }) => {
  return (
    <>
      <div className="container mx-auto px-4 max-w-screen-xl border-l border-r border-dashed dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col justify-center items-center min-h-screen"></div>
      </div>
    </>
  );
};
