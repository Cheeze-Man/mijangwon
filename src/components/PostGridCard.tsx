import { useState } from "react";
import Image from "next/image";
import { SimplePost } from "@/model/post";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
  post: SimplePost;
  priority: boolean;
};

const PostGridCard = ({ post, priority = false }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { image, username } = post;

  return (
    <div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
};

export default PostGridCard;
