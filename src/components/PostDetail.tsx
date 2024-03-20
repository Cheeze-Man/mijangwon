import Image from "next/image";
import { SimplePost } from "@/model/post";
import useFullPost from "@/hooks/post";
import Avatar from "./Avatar";
import ActionBar from "./ActionBar";
import PostUserAvatar from "./PostUserAvatar";
import DeleteButton from "./ui/DeleteButton";

type Props = {
  post: SimplePost;
};

const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className="flex flex-col lg:flex-row w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li className="w-full flex items-center mb-1" key={index}>
                  <div>
                    <Avatar
                      image={image}
                      size="small"
                      highlight={commentUsername === username}
                    />
                  </div>
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                  <DeleteButton
                    username={commentUsername}
                    postId={post.id}
                    index={index}
                  />
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
};

export default PostDetail;
