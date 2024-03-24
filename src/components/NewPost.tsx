"use client";
import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/GridSpinner";

type Props = {
  user: AuthUser;
};

const NewPost = ({ user: { username, image } }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-violet-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full rounded-md bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/**"
          onChange={handleChange}
        />
        <label
          className={`cursor-pointer w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-violet-500 border-dashed rounded-xl"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-violet-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>이미지 업로드 또는 파일 놓기</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                sizes="650px"
                quality={100}
                fill
              />
            </div>
          )}
        </label>
        <textarea
          className="resize-none outline-none text-lg border rounded-md my-2 p-1 border-neutral-300 dark:border-black dark:bg-slate-900"
          required
          name="text"
          id="input-text"
          rows={10}
          placeholder="내용을 입력해주세요 :)"
          ref={textRef}
        />
        <Button text="게시하기" onClick={() => {}} />
      </form>
    </section>
  );
};

export default NewPost;
