type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
  disabled?: boolean;
};

const Button = ({ text, red, onClick, disabled = false }: Props) => {
  return (
    <button
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-violet-500"
      } ${disabled && "opacity-60"}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
