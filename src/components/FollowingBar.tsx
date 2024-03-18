"use client";
import Link from "next/link";
import { SyncLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/me";

const FollowingBar = () => {
  const { user, error, isLoading } = useMe();
  const users = user?.following;

  return (
    <section className="relative z-0 w-full flex justify-center items-center p-4 shadow-md shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <SyncLoader size={15} color="#8B5CF6" />
      ) : (
        (!users || users.length === 0) && (
          <p className="font-bold text-neutral-400">{`팔로잉 중인 사람이 없습니다 :)`}</p>
        )
      )}
      {error && (
        <p className="font-bold text-neutral-400">
          서버 에러 : {error.message}
        </p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-center text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
};

export default FollowingBar;
