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
    { title: "followers", data: followers },
    { title: "following", data: following },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image} size="xlarge" highlight />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-4 my-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
};

export default UserProfile;
