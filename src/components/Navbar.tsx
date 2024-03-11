"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import ColorButton from "./ui/ColorButton";

const menu = [
  {
    path: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    path: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    path: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];
const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-extrabold text-violet-800">Mijangwon</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(({ path, icon, clickedIcon }) => (
            <li key={path} className="hover:scale-105 transition-all">
              <Link href={path}>{pathName === path ? clickedIcon : icon}</Link>
            </li>
          ))}
          {session ? (
            <ColorButton text="Sign out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="Sign in" onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
