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
        <div className="dark:bg-stone-900 min-h-screen">{children}</div>
      </PageContextProvider>
    </React.StrictMode>
  );
}
