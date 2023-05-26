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
          description:
            "Browse our collection of over 500 active sellers and 1000+ accounts.",
          href: "/accounts/account-database",
          icon: "database",
        },
        {
          title: "Top Accounts",
          description:
            "Discover the top sellers and analyze their performance over time.",
          href: "/accounts/top-accounts",
          icon: "rank",
        },
        {
          title: "Account Collections",
          href: "/accounts/account-collections",
          description:
            "Leverage the power of collections to organize your accounts and products.",
          icon: "collection",
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
          description:
            "Browse our collection of over 200 high converting products.",
          icon: "database",
        },
        {
          title: "Top Products",
          href: "/products/top-products",
          description:
            "Discover the top selling products and analyze their performance over time.",
          icon: "rank",
        },
      ],
      disabled: false,
    },
    {
      title: "Ai Store Builder",
      iconName: "store",
      href: "/stores",
      disabled: true,
    },
    // {
    //   title: "Settings",
    //   iconName: "settings",
    //   href: "/settings",
    //   disabled: false,
    // },
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
      {
        title: "Days Tracked",
        value: "",
      },
      {
        title: "Most Views ",
        value: "",
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
      { value: "", label: "Field", disabled: true },
      { value: "heartCount", label: "Likes" },
      { value: "followerCount", label: "Followers" },
      { value: "followingCount", label: "Following" },
      { value: "videoCount", label: "Posts" },
    ],
    operators: [
      { value: "", label: "Operator", disabled: true },
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
