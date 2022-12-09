import { Moon, Sun } from "@styled-icons/feather";
import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import "../styles/index.css";

export { PageShell, useAppContext };

type AppContextValues = { darkMode: boolean };

const AppContext = createContext<AppContextValues>({
  darkMode: false,
});

const useAppContext = () => useContext(AppContext);

const PageShell = ({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) => {
  const getPrefersDarkMode = () => {
    const storedPreferenceString = window.localStorage.getItem("darkMode");
    if (storedPreferenceString) {
      const storedPreference = JSON.parse(storedPreferenceString);
      if (_.isBoolean(storedPreference)) {
        return storedPreference;
      }
    }

    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(getPrefersDarkMode());
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <AppContext.Provider value={{ darkMode }}>
          <div className={`${darkMode ? "dark" : ""}`}>
            <div className="bg-gradient-to-br from-stone-100 via-stone-50 to-stone-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 min-h-screen antialiased text-stone-900 dark:text-stone-100">
              {children}
            </div>
            <button
              type="button"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="fixed bottom-3 right-3 h-12 w-12 rounded-full shadow-md bg-stone-100 dark:bg-stone-800 hover:bg-white dark:hover:bg-stone-700 text-yellow-500 dark:text-stone-200 transition-colors"
            >
              {darkMode ? (
                <Moon strokeWidth={2} size={24} />
              ) : (
                <Sun strokeWidth={2} size={24} />
              )}
            </button>
          </div>
        </AppContext.Provider>
      </PageContextProvider>
    </React.StrictMode>
  );
};
