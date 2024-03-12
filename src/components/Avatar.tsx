type Props = {
  image?: string | null;
  size?: "small" | "normal";
  highlight?: boolean;
};

const Avatar = ({ image, size = "normal", highlight = false }: Props) => {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white rounded-full ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const getContainerStyle = (size: string, highlight: boolean): string => {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-indigo-800 via-violet-700 to-purple-600"
    : "";
  const sizeStyle = size === "small" ? "w-10 h-10" : "w-[70px] h-[70px]";
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getImageSizeStyle = (size: string): string => {
  return size === "small"
    ? "w-[34px] h-[34px] p-[0.05rem]"
    : "w-16 h-16 p-[0.1rem]";
};

export default Avatar;
