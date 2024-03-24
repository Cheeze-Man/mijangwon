"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import ModalPortal from "./ui/ModalPortal";
import ActionBar from "./ActionBar";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200 dark:border-slate-900">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square cursor-pointer"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <Link href={`/user/${username}`} className="font-bold mr-1">
            {username}
          </Link>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-violet-700"
            onClick={() => setOpenModal(true)}
          >{`view all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
};

export default PostListCard;
