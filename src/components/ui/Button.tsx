type Props = {
  text: string;
  red: boolean;
  onClick: () => void;
};

const Button = ({ text, red, onClick }: Props) => {
  return (
    <button
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-violet-500"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
