import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserProfile } from "@/service/user";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";

type Props = {
  params: { username: string };
};

/** getUserProfile의 중복된 함수 호출을 캐싱하여 최적화하기 위한 함수입니다. */
const getUser = cache(async (username: string) => getUserProfile(username));

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
};

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · Ouroom Photos`,
    description: `${user?.name}'s all Ouroom posts`,
  };
}

export default UserPage;
