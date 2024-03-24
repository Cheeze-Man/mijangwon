"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const DarkModeBtn = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <>
      {loaded && (
        <button
          className="flex items-center hover:rotate-[-20deg] hover:scale-105 transition-all"
          onClick={() => {
            setTheme(currentTheme === "dark" ? "light" : "dark");
          }}
        >
          {currentTheme === "dark" ? (
            <MdLightMode className="text-amber-500 w-7 h-7" />
          ) : (
            <MdDarkMode className="text-black w-7 h-7" />
          )}
        </button>
      )}
    </>
  );
};

export default DarkModeBtn;
