import SmileIcon from "./ui/icons/SmileIcon";

const CommentForm = () => {
  return (
    <form className="flex items-center px-3 border-t border-neutral-300">
      <SmileIcon />
      <input
        className="w-full mx-2 border-none outline-none p-3"
        type="text"
        placeholder="댓글을 입력해주세요 :)"
      />
      <button className="box-border py-1 font-bold w-16 bg-violet-500 hover:bg-violet-600 text-white border-b-4 border-violet-700 hover:border-violet-500 rounded-md transition-all">
        댓글
      </button>
    </form>
  );
};

export default CommentForm;
