"use client";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { ProfileUser } from "@/model/user";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

const UserSearch = () => {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setKeyword("");
    // window.location.href = `/search/${keyword}`;
    // return false; // 새로고침 방지
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="사용자 이름을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>{`유저리스트를 불러오기 실패 :(`}</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && (
        <p>검색 결과와 일치하는 유저가 없습니다 😅</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.name}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UserSearch;
