"use client";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: loggedInUser } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((following) => following.username === username);
  const text = following ? "Unfollow" : "Follow";

  return (
    <>
      {showButton && (
        <Button text={text} red={text === "Unfollow"} onClick={() => {}} />
      )}
    </>
  );
};

export default FollowButton;
