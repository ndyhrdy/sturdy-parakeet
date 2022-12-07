import React from "react";
import { Link } from "../renderer/Link";
import xenditLogo from "../assets/xendit-logo.svg";

export { MerchantDetails };

const MerchantDetails = () => {
  return (
    <Link
      href="/"
      className="hidden lg:inline-flex self-start mb-12 items-center px-6 space-x-3 group"
    >
      <div className="bg-teal-500 group-hover:bg-teal-600 w-14 h-14 rounded-xl flex justify-center items-center shadow-lg transition-colors">
        <img src={xenditLogo} alt="Xendit logo" />
      </div>
      <span className="font-semibold text-xl text-teal-400 group-hover:text-teal-500 transition-colors">
        Xendit Checkout Demo
      </span>
    </Link>
  );
};
