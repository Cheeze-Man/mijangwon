type Props = { image?: string | null };

const Avatar = ({ image }: Props) => {
  return (
    <div className="w-10 h-10 rounded-full bg-violet-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="p-[0.15rem] rounded-full"
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Avatar;
