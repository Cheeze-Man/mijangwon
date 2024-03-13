"use client";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PacmanLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

const FollowingBar = () => {
  const { data, error, isLoading } = useSWR<DetailUser>("/api/me");
  const users = data?.following;
  console.log(data);

  return (
    <section>
      {isLoading ? (
        <PacmanLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && (
          <p>{`팔로잉 중인 사람이 없습니다 :)`}</p>
        )
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ username, image }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} highlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FollowingBar;
