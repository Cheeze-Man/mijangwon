import Image from "next/image";
import useMe from "@/hooks/me";
import { SimplePost } from "@/model/post";
import useFullPost from "@/hooks/post";
import Avatar from "./Avatar";
import ActionBar from "./ActionBar";
import PostUserAvatar from "./PostUserAvatar";
import DeleteButton from "./ui/DeleteButton";
import PostDeleteButton from "./ui/PostDeleteButton";

type Props = {
  post: SimplePost;
};

const PostDetail = ({ post }: Props) => {
  const { user: loggedInUser, setBookmark } = useMe();
  const { id, userImage, username, image } = post;
  const { post: data, postComment, deletePostedComment } = useFullPost(id);
  const comments = data?.comments;

  const handlePostDelete = () => {
    const confirmDelete = window.confirm("포스트를 삭제하시겠습니까?");
    if (confirmDelete) {
      setBookmark(id, false)
        ?.then(() => {
          fetch(`/api/posts/${id}`, {
            method: "DELETE",
          });
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

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
      <div className="w-full basis-2/5 flex flex-col dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <PostUserAvatar image={userImage} username={username} />
          {username === loggedInUser?.username && (
            <PostDeleteButton onDelete={handlePostDelete} />
          )}
        </div>
        <ul className="border-t border-gray-200 dark:border-slate-900 h-full overflow-y-auto p-4 mb-1">
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
                    onDelete={deletePostedComment}
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
