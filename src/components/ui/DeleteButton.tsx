import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import useMe from "@/hooks/me";
import { PulseLoader } from "react-spinners";
import { MdClose } from "react-icons/md";

type Props = {
  postId: string;
  index: number;
  username: string;
  onDelete: (index: number) => Promise<any> | any;
};

const DeleteButton = ({ username, index, onDelete }: Props) => {
  const { user: loggedInUser } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const isUpdating = isPending || isDeleting;

  const showButton =
    index > 0 && loggedInUser && loggedInUser.username === username;

  const handleDelete = () => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
      router.refresh();
      startTransition(() => {
        setIsDeleting(true);
        onDelete(index).finally(() => setIsDeleting(false));
      });
    }
  };

  return (
    <>
      {showButton && (
        <div className="relative ml-auto">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={3} />
            </div>
          )}
          <button
            className={`border-none rounded-md p-1 text-white leading-4 bg-violet-500 ${
              isUpdating && "opacity-60"
            }`}
            onClick={handleDelete}
            disabled={isUpdating}
          >
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
