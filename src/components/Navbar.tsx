"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import ColorButton from "./ui/ColorButton";
import Avatar from "./Avatar";
import DarkModeBtn from "./ui/DarkModeButton";
import MenuIcon from "./ui/icons/MenuIcon";
import { useState } from "react";

const menu = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    title: "Search",
    path: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    title: "New",
    path: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];
const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center w-full max-w-screen-xl transition-all">
      <Link className="flex items-center gap-1.5 p-4" href="/">
        <Image
          className="text-3xl font-extrabold text-violet-800"
          src="/images/logo_mini.png"
          alt="O"
          width={45}
          height={45}
          quality={100}
          priority
        />
        <Image
          className="text-3xl font-extrabold text-violet-800 hidden md:inline"
          src="/images/logo_text.png"
          alt="Ouroom"
          width={200}
          height={50}
          quality={100}
          priority
        />
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          <li>
            <DarkModeBtn />
          </li>
          <li
            className="relative cursor-pointer inline md:hidden"
            onClick={toggleDropdown}
          >
            <MenuIcon />
            {isDropdownOpen && (
              <ul className="absolute left-[-100%] mt-2 w-20 rounded-md shadow-lg text-black dark:text-white bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 transition-all">
                {menu.map(({ path, title }) => (
                  <li
                    key={path}
                    className="w-full flex items-center text-center justify-center py-2"
                  >
                    <Link
                      className={`${
                        pathName === path &&
                        "text-violet-700 font-bold scale-105"
                      }`}
                      href={path}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {menu.map(({ path, icon, clickedIcon }) => (
            <li
              key={path}
              className="hover:scale-105 transition-all text-violet-800 hidden md:inline"
            >
              <Link href={path}>{pathName === path ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton
                text="Sign out"
                onClick={() => signOut()}
                className="hidden md:inline transition-all"
              />
            ) : (
              <ColorButton
                text="Sign in"
                onClick={() => signIn()}
                className="hidden md:inline transition-all"
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
