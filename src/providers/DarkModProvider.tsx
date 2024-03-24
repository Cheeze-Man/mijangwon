"use client";
import { ThemeProvider } from "next-themes";

const DarkModProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default DarkModProvider;
