import React, { FC, useCallback, useState } from "react";
import { api } from "../../helpers/api";

export { Page, getDocumentProps };

const Page: FC = () => {
  const [busy, setBusy] = useState(false);
  const handleStart = useCallback(async () => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      const { data: order } = await api.post<PendingOrder>("/orders");
      window.location.href = `/pay/${order.id}`;
    } catch (error) {
      setBusy(false);
    }
  }, [busy]);

  return (
    <>
      <div className="container mx-auto px-4 max-w-screen-md lg:border-l lg:border-r border-dashed dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <section className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="font-bold text-6xl text-center tracking-tight">
            Xendit Checkout Demo
          </h1>
          <hr className="w-20 border-2 border-teal-500 my-6 rounded-full" />
          <p className="text-lg text-center mb-6">
            This is a checkout flow using Xendit to demonstrate usage of React
            on Vite with SSR. Complete stack includes Vite, React,
            vite-plugin-ssr, Pocketbase, Tailwind CSS, Framer Motion.
          </p>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleStart}
              disabled={busy}
              className={`rounded-lg text-white h-12 px-6 text-lg ${
                busy
                  ? "bg-stone-500 cursor-not-allowed"
                  : "transition-colors bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Start Demo &rarr;
            </button>
            <a
              href="https://github.com/ndyhrdy/sturdy-parakeet"
              className="flex items-center rounded-lg border-2 border-teal-500 dark:border-teal-600 hover:bg-teal-500 hover:dark:bg-teal-600 transition-colors text-teal-600 dark:text-teal-500 hover:dark:text-white h-12 px-6 text-lg"
              target="_blank"
              rel="noreferrer"
            >
              Explore Code
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

const getDocumentProps = () => ({
  title: "Xendit Checkout Demo",
  description:
    "Checkout flow using Xendit to demonstrate usage of React on Vite with SSR",
});
