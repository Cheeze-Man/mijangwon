import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUserProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </>
  );
};

export default UserPage;
