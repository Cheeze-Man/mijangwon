import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

const PostUserAvatar = ({ image, username }: Props) => {
  return (
    <Link href={`/user/${username}`} className="flex items-center p-2">
      <Avatar image={image} size="medium" highlight />
      <span className="font-bold ml-2">{username}</span>
    </Link>
  );
};

export default PostUserAvatar;
