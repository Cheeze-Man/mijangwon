"use client";
import useSWR from "swr";

const FollowingBar = () => {
  const { data, error, isLoading } = useSWR("/api/me");

  console.log(data);

  return <p>FollowingBar</p>;
};

export default FollowingBar;
