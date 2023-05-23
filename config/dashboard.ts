import {
  DashboardConfig,
  AccountDatabaseConfig,
  AccountCollectionConfig,
} from "@/types";

export const dashboardConfig: DashboardConfig = {
  sideNav: [
    {
      title: "Dashboard",
      iconName: "dashboard",
      href: "/dashboard",
      disabled: false,
    },
    {
      title: "Accounts",
      iconName: "accounts",
      href: "/accounts",
      subPages: [
        {
          title: "Account Database",
          href: "/accounts/account-database",
        },
        {
          title: "Top Accounts",
          href: "/accounts/top-accounts",
        },
        {
          title: "Account Collections",
          href: "/accounts/account-collections",
        },
      ],
      disabled: false,
    },
    {
      title: "Products",
      iconName: "products",
      href: "/products",
      subPages: [
        {
          title: "Product Database",
          href: "/products/product-database",
        },
        {
          title: "Top Products",
          href: "/products/top-products",
        },
      ],
      disabled: false,
    },
    {
      title: "Your Stores",
      iconName: "store",
      href: "/stores",
      subPages: [
        {
          title: "Product Database",
          href: "/products/product-database",
        },
        {
          title: "Top Products",
          href: "/products/top-products",
        },
      ],
      disabled: true,
    },
    {
      title: "Settings",
      iconName: "settings",
      href: "/settings",
      disabled: false,
    },
  ],
};

export const accountDatabaseConfig: AccountDatabaseConfig = {
  tableHeaders: {
    primaryHeaders: [
      {
        title: "Account",
      },
      {
        title: "Product",
      },
      {
        title: "Store",
      },
    ],

    secondaryHeaders: [
      {
        title: "Followers",
        value: "followers",
      },
      {
        title: "Likes",
        value: "likes",
      },
      {
        title: "Posts",
        value: "posts",
      },
    ],
  },

  sortOptions: {
    title: "Sort by",
    items: [
      {
        title: "Popularity",
        value: "likeCount",
        icon: "trendingUp",
      },
      {
        title: "Followers",
        value: "followerCount",
        icon: "followers",
      },
      {
        title: "Likes",
        value: "heartCount",
        icon: "likes",
      },
      {
        title: "Posts",
        value: "videoCount",
        icon: "posts",
      },
    ],
  },

  filterOptions: {
    fields: [
      { value: "", label: "Field" },
      { value: "likes", label: "Likes" },
      { value: "followers", label: "Followers" },
      { value: "following", label: "Following" },
      { value: "posts", label: "Posts" },
    ],
    operators: [
      { value: "", label: "Operator" },
      { value: ">", label: "Greater than" },
      { value: ">=", label: "Greater than or equal" },
      { value: "<", label: "Less than" },
      { value: "<=", label: "Less than or equal" },
      { value: "=", label: "Equals" },
    ],
  },
};

export const accountCollectionsConfig: AccountCollectionConfig = {
  sortOptions: {
    title: "Sort by",
    items: [
      {
        title: "Popularity",
        value: "likes",
        icon: "trendingUp",
      },
      {
        title: "Followers",
        value: "followers",
        icon: "followers",
      },
      {
        title: "Likes",
        value: "likes",
        icon: "likes",
      },
      {
        title: "Posts",
        value: "posts",
        icon: "posts",
      },
    ],
  },
  tableHeaders: {
    primaryHeaders: [
      {
        title: "Account",
      },
      {
        title: "Product",
      },
      {
        title: "Store",
      },
    ],
    secondaryHeaders: [
      {
        title: "Followers",
        value: "followers",
      },
      {
        title: "Likes",
        value: "likes",
      },
      {
        title: "Posts",
        value: "posts",
      },
    ],
  },
};

interface ProductDatabaseConfig {
  tableHeaders: {
    primaryHeaders: {
      title: string;
    }[];
    secondaryHeaders: {
      title: string;
      value: string;
    }[];
  };
  sortOptions: {
    title: string;
    items: {
      title: string;
      value: string;
      icon: string;
    }[];
  };
}

export const productDatabaseConfig: ProductDatabaseConfig = {
  tableHeaders: {
    primaryHeaders: [
      {
        title: "Product",
      },
      {
        title: "Supplier",
      },
    ],
    secondaryHeaders: [
      {
        title: "Accounts",
        value: "accounts",
      },
      {
        title: "revenue",
        value: "revenue",
      },
    ],
  },
  sortOptions: {
    title: "Sort by",
    items: [
      {
        title: "Popularity",
        value: "likes",
        icon: "trendingUp",
      },
      {
        title: "Followers",
        value: "followers",
        icon: "followers",
      },
    ],
  },
};
