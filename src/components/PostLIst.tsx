"use client";
import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

const PostLIst = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridLoader color="#8B5CF6" />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post.id} className="mb-4">
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default PostLIst;
