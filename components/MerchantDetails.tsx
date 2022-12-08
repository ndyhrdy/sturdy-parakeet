import React from "react";
import { Link } from "../renderer/Link";
import xenditLogo from "../assets/xendit-logo.svg";

export { MerchantDetails };

const MerchantDetails = () => {
  return (
    <Link
      href="/"
      className="flex lg:inline-flex lg:self-start mb-12 items-center pl-3 pr-20 lg:px-6 py-3 lg:py-0 shadow-md bg-white dark:bg-stone-900 lg:bg-transparent dark:lg:bg-transparent lg:shadow-none space-x-3 group sticky top-0 lg:static"
    >
      <div className="bg-teal-500 group-hover:bg-teal-600 w-14 h-14 rounded-xl flex-shrink-0 flex justify-center items-center shadow-lg transition-colors">
        <img src={xenditLogo} alt="Xendit logo" />
      </div>
      <span className="font-semibold text-xl text-teal-400 group-hover:text-teal-500 transition-colors line-clamp-1">
        Xendit Checkout Demo
      </span>
    </Link>
  );
};
