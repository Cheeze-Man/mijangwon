type Props = {
  text: string;
  onClick: () => void;
};

const ColorButton = ({ text, onClick }: Props) => {
  return (
    <div className="rounded-md bg-gradient-to-bl from-violet-600 via-fuchsia-500 to-blue-300 p-[0.15rem]">
      <button
        className="bg-white rounded-md text-base p-[0.3rem] hover:opacity-90 transition-all"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
