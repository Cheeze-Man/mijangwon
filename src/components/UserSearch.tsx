"use client";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { ProfileUser } from "@/model/user";
import GridSpinner from "./ui/GridSpinner";

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
    <>
      <form onSubmit={onSubmit}>
        <input
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
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.name}>
              <p>{user.username}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default UserSearch;
