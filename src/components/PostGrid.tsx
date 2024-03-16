import useSWR from "swr";
import { SimplePost } from "@/model/post";
import GridSpinner from "./ui/GridSpinner";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};

const PostGrid = ({ username, query }: Props) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div>
      {isLoading && <GridSpinner />}
      <ul>
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
