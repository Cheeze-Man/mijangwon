type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
};

const Button = ({ text, red, onClick }: Props) => {
  return (
    <button
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-violet-500"
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
