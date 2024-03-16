"use client";
import { useState } from "react";
import useSWR from "swr";
import { ProfileUser } from "@/model/user";

type Props = {
  user: ProfileUser;
};

const UserPosts = ({ user: { username } }: Props) => {
  const [tab, setTab] = useState("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);

  return <></>;
};

export default UserPosts;
