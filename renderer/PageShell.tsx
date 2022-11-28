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
        <div className="bg-gradient-to-br dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 min-h-screen antialiased">
          {children}
        </div>
      </PageContextProvider>
    </React.StrictMode>
  );
}
