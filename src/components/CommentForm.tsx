import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

const CommentForm = ({ onPostComment }: Props) => {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300"
    >
      <SmileIcon />
      <input
        className="w-full mx-2 border-none outline-none p-3"
        type="text"
        placeholder="댓글을 입력해주세요 :)"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`box-border py-1 font-bold w-16 text-white border-b-4 rounded-md transition-all ${
          buttonDisabled
            ? "bg-violet-300 border-violet-500"
            : "bg-violet-500 hover:bg-violet-600 border-violet-700 hover:border-violet-500"
        }`}
        disabled={buttonDisabled}
      >
        댓글
      </button>
    </form>
  );
};

export default CommentForm;
