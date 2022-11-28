import React from "react";

export { Page };

const Page = () => {
  return (
    <>
      <div className="container mx-auto px-4 max-w-screen-md border-l border-r border-dashed dark:border-stone-800 dark:bg-stone-900">
        <section className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="font-bold text-6xl text-center tracking-tight dark:text-stone-100">
            Xendit Checkout Demo
          </h1>
          <hr className="w-20 border-2 border-teal-500 my-6 rounded-full" />
          <p className="dark:text-stone-200 text-lg text-center mb-6">
            This is a checkout flow using Xendit to demonstrate usage of React
            on Vite with SSR. Complete stack includes Vite, React,
            vite-plugin-ssr, Tailwind CSS, Framer Motion.
          </p>
          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-lg bg-teal-500 hover:bg-teal-600 transition-colors text-white h-12 px-6 text-lg"
            >
              Start Demo &rarr;
            </button>
            <a
              href="https://github.com/ndyhrdy/xendit-checkout-demo"
              className="flex items-center rounded-lg border-2 border-teal-600 hover:bg-teal-600 transition-colors text-teal-500 hover:text-white h-12 px-6 text-lg"
            >
              Explore Code
            </a>
          </div>
        </section>
      </div>
    </>
  );
};
