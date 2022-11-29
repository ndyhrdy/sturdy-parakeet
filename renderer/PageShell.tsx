import React from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import "../styles/index.css";

export { PageShell };

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div className="bg-gradient-to-br from-stone-100 via-stone-50 to-stone-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 min-h-screen antialiased text-stone-900 dark:text-stone-100">
          {children}
        </div>
      </PageContextProvider>
    </React.StrictMode>
  );
}
