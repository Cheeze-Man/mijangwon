import "./globals.css";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import DarkModProvider from "@/providers/DarkModProvider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ouroom",
    template: "Ouroom | %s",
  },
  description: "아우름 | SNS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto dark:bg-slate-800 dark:text-white transition-all">
        <DarkModProvider>
          <AuthContext>
            <header className="sticky top-0 bg-white z-10 border-b dark:border-b-slate-900 dark:bg-slate-800 dark:text-white transition-all">
              <div className="max-w-screen-xl mx-auto">
                <Navbar />
              </div>
            </header>
            <main className="max-w-screen-xl w-full flex justify-center mx-auto">
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </AuthContext>
        </DarkModProvider>
        <div id="portal" />
      </body>
    </html>
  );
};

export default RootLayout;
