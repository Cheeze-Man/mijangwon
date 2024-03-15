import { ProfileUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};

const UserCard = ({
  user: { name, username, image, following, followers },
}: Props) => {
  return (
    <Link href={`/user/${username}`}>
      <Avatar image={image} />
      <div>
        <p>{username}</p>
        <p>{name}</p>
        <p>{`${followers} followers ${following} follwing`}</p>
      </div>
    </Link>
  );
};

export default UserCard;
