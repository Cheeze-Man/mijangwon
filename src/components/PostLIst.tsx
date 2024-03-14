"use client";
import { SimplePost } from "@/model/post";
import { log } from "console";
import useSWR from "swr";

const PostLIst = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");
  console.log(posts);

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
  );
};

export default PostLIst;
