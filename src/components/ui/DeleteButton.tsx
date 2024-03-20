import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import useMe from "@/hooks/me";
import { PulseLoader } from "react-spinners";
import { MdClose } from "react-icons/md";

type Props = {
  postId: string;
  index: number;
  username: string;
};

const DeleteButton = ({ username, postId, index }: Props) => {
  const { user: loggedInUser } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const isUpdating = isPending || isDeleting;

  const showButton =
    index > 0 && loggedInUser && loggedInUser.username === username;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, index }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
      startTransition(() => {
        router.refresh();
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
            className={`border-none rounded-md p-1 text-white  leading-4 bg-violet-500 ${
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
