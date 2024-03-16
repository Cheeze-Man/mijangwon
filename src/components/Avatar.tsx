type AvatarSize = "small" | "medium" | "large" | "xlarge";

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

const Avatar = ({ image, size = "large", highlight = false }: Props) => {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full ${
          getImageSizeStyle(size).image
        }`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const getContainerStyle = (size: AvatarSize, highlight: boolean): string => {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-indigo-800 via-amber-700 to-violet-600"
    : "";
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${container}`;
};

type ImageSizeStyle = {
  container: string;
  image: string;
};
const getImageSizeStyle = (size: AvatarSize): ImageSizeStyle => {
  switch (size) {
    case "small":
      return { container: "w-9 h-9", image: "w-[34px] h-[34px] p-[0.1rem]" };
    case "medium":
      return { container: "w-11 h-11", image: "w-[42px] h-[42px] p-[0.1rem]" };
    case "large":
      return { container: "w-[68px] h-[68px]", image: "w-16 h-16 p-[0.2rem]" };
    case "xlarge":
      return {
        container: "w-[142px] h-[142px]",
        image: "w-[138px] h-[138px] p-[0.3rem]",
      };
    default:
      throw new Error(`Invalid size: ${size}`);
  }
};

export default Avatar;
