"use client";
import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { ChangeEvent, useState } from "react";

type Props = {
  user: AuthUser;
};

const NewPost = ({ user: { username, image } }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar username={username} image={image ?? ""} />
      <form>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/**"
          onChange={handleChange}
        />
        <label
          className="cursor-pointer"
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>이미지 업로드 또는 파일 놓기</p>
        </label>
        <textarea
          required
          name="text"
          id="input-text"
          rows={10}
          placeholder="내용을 입력해주세요 :)"
        />
        <Button text="게시하기" onClick={() => {}} />
      </form>
    </section>
  );
};

export default NewPost;
