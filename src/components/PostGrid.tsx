import usePosts from "@/hooks/posts";
import PostGridCard from "./PostGridCard";
import GridSpinner from "./ui/GridSpinner";

const PostGrid = () => {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      {posts?.length === 0 && (
        <div className="w-full flex justify-center">
          <p className="font-bold text-xl text-gray-500 mt-20">
            아직 게시물이 없어요😅
          </p>
        </div>
      )}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostGrid;
