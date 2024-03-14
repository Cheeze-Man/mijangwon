"use client";
import { SimplePost } from "@/model/post";
import { log } from "console";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

const PostLIst = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div>
          <GridLoader color="#8B5CF6" />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default PostLIst;
