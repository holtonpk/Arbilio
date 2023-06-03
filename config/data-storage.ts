type Storage = {
  accountCollections: string;
  accounts: string;
  posts: string;
  products: string;
  updateLogs: string;
  users: string;
  userAccountCollections: string;
  userProductTrack: string;
  postsMedia: string;
};

export const storage: Storage = {
  // fireStore/
  accountCollections: "accountCollections",
  accounts: "tiktok-accounts",
  posts: "tiktok-posts",
  products: "tiktok-products",
  updateLogs: "updateLogs",
  users: "users",

  // fireStore/users/
  userAccountCollections: "accountCollections",
  userProductTrack: "tracked-products",

  // storage/
  postsMedia: "tiktok-posts",
};
