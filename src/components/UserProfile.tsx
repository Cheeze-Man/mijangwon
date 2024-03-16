import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

const UserProfile = ({ user }: Props) => {
  const { name, username, image, following, followers, posts } = user;
  const info = [
    { title: "post", data: posts },
    { title: "following", data: following },
    { title: "followers", data: followers },
  ];

  return (
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span>{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
};

export default UserProfile;
