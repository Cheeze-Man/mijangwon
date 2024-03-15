import userSWR from "swr";
import { FullPost, SimplePost } from "@/model/post";

type Props = {
  post: SimplePost;
};

const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = userSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return <></>;
};

export default PostDetail;
