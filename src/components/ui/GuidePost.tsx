"use client";
import Image from "next/image";
import PostUserAvatar from "../PostUserAvatar";

const GuidePost = () => {
  return (
    <article className="rounded-lg shadow-md border border-gray-200 dark:border-slate-900">
      <PostUserAvatar image="/images/guide_post.png" username="ouroom_guide" />
      <Image
        className="w-full object-cover aspect-square cursor-pointer"
        src="/images/guide_post.png"
        alt={"photo by ouroom_guide"}
        width={500}
        height={500}
        quality={100}
        priority
      />
      <p className="flex flex-col p-2 ml-2">
        <span className="font-bold mr-1">ouroom_guide</span>
        <span>[📌ouroom가이드입니다📌]</span>
        <span>1. 우측상단의 돋보기(모바일은 메뉴바를열어 search)를 클릭</span>
        <span>2. 유저의 프로필 방문 후 follow</span>
        <span>3. 홈에서 팔로우한 유저들의 포스트를 구경하세요😀</span>
      </p>
    </article>
  );
};

export default GuidePost;
