import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import FollowingBar from "@/components/FollowingBar";
import PostLIst from "@/components/PostLIst";
import SideBar from "@/components/SideBar";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex flex-col md:flex-row md:justify-between max-w-full px-8 py-6 md:px-64 transition-all">
      <div className="w-full basis-3/4 min-w-0">
        <FollowingBar />
        <PostLIst />
      </div>
      <div className="basis-1/4 ml-8">
        <SideBar user={user} />
      </div>
    </section>
  );
};
export default Home;
