interface SiteConfig {
  avatarStorage: string;
  postStorage: string;
  productStorage: string;
}

export const firebaseConfig: SiteConfig = {
  avatarStorage: "gs://tikdrop-788d3.appspot.com/accounts/",
  postStorage: "gs://tikdrop-788d3.appspot.com/posts/",
  productStorage: "gs://tikdrop-788d3.appspot.com/products/",
};
