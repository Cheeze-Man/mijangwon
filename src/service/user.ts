import { SearchUser } from "@/model/user";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`,
    { username }, // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
    { cache: "no-store" } // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`,
      { keyword }, // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
      { cache: "no-store" } // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    "following": count(following),
    "followers": count(followers),
    "posts": count(*[type=="post" && author->username == "${username}"]),
  }`,
      { username }, // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
      { cache: "no-store" } // TODO: 나중에 지우기 (오래된 데이터를 불러오는 문제를 해결하기 위해 임시적으로 넣음.)
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
