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
import Image from "next/image";
import Avatar from "./Avatar";

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
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <Image
          className="text-3xl font-extrabold text-violet-800"
          src="/images/logo.png"
          alt="Mijangwon"
          width={230}
          height={80}
          priority
        />
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(({ path, icon, clickedIcon }) => (
            <li
              key={path}
              className="hover:scale-105 transition-all text-violet-900"
            >
              <Link href={path}>{pathName === path ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
