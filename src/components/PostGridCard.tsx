import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover cursor-pointer"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        quality={100}
        priority={priority}
        onClick={handleOpenPost}
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
