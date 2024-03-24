type Props = {
  text: string;
  onClick: () => void;
  className?: string;
  size?: "small" | "big";
};

const ColorButton = ({ text, onClick, className, size = "small" }: Props) => {
  return (
    <button
      className={`bg-violet-500 hover:bg-violet-400 text-white font-bold border-b-4 border-violet-700 hover:border-violet-500 rounded transition-all
      ${
        size === "big"
          ? "py-4 px-8 text-3xl"
          : "py-2 px-4 max-h-[44px] min-w-[96.77px]"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ColorButton;
