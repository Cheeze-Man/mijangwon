export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type simpleUser = Pick<User, "username" | "image">;

export type DetailUser = User & {
  following: simpleUser[];
  followers: simpleUser[];
  bookmarks: string[];
};

export type ProfileUser = User & {
  following: number;
  followers: number;
};
