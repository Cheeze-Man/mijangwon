type Props = {
  onDelete: () => void;
};

const PostDeleteButton = ({ onDelete }: Props) => {
  return (
    <button
      className="border-none rounded-md font-bold p-2 mr-2 text-white leading-4 bg-red-500"
      onClick={onDelete}
    >
      삭제
    </button>
  );
};

export default PostDeleteButton;
