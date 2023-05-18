export interface FilterList {
  rowId: number;
  field: string;
  operator: string;
  value: string;
  combine: "and" | "or";
}

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

import { Icons } from "@/components/icons";

export interface SideNavRoute {
  title: string;
  iconName: keyof typeof Icons;
  href: string;
  subPages?: {
    title: string;
    href: string;
  }[];
  disabled: boolean;
}

export interface DashboardConfig {
  sideNav: SideNavRouteProps[];
}

type TableHeader = {
  primaryHeaders: {
    title: string;
  }[];
  secondaryHeaders: {
    title: string;
    value?: string;
  }[];
};

export type ComboBoxType = {
  title: string;
  items: {
    title: string;
    icon?: keyof typeof Icons | string;
    value: string | number;
  }[];
};

type FilterOptions = {
  fields: {
    value: string;
    label: string;
  }[];
  operators: {
    value: string;
    label: string;
  }[];
};

export interface AccountDatabaseConfig {
  tableHeaders: TableHeader;
  filterOptions: FilterOptions;
  sortOptions: ComboBoxType;
}

export interface AccountCollectionConfig {
  tableHeaders: TableHeader;
  sortOptions: ComboBoxType;
}

export type CollectionType = {
  id: string;
  name: string;
  ids: string[];
};

export interface AccountStatsType {
  dataCollectionTime: number;
  followerCount: number;
  followingCount: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
}

export interface ProductType {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  image: string;
  supplierUrl: string;
  accounts: string[];
}

export interface PostType {
  collectionId: string;
  collectionName: string;
  cover: string;
  created: string;
  expand: any;
  id: string;
  postData: any;
  postId: string;
  updated: string;
}

export interface AccountDataType {
  recordId: string;
  id: string;
  uniqueId: string;
  nickname: string;
  accountStats: AccountStatsType[];
  stats: {
    heartCount: number;
    followerCount: number;
    followingCount: number;
    videoCount: number;
  };
  avatar: string;
  secUid: string;
  bio: string;
  bioLink: string;
  posts: any;
  topPosts: PostType[] | undefined;
  product: ProductType | undefined;
}

interface Price {
  id: string;
  unit_amount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  monthly_price: Price;
  annual_price: Price;
  features: string[];
  firebaseRole: string;
}

export type ProductType = {
  accounts: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  expand: any;
  id: string;
  image: string;
  supplierUrl: string;
  title: string;
  updated: string;
};

export interface ProductType {
  accounts: string[];
  expand: Record<string, unknown>; // An empty object that can have any string as key and any value
  collectionId: string;
  image: string;
  created: string;
  collectionName: string;
  updated: string;
  supplierUrl: string;
  id: string;
  title: string;
  productInfo: ProductInfo;
  accountsData: AccountDataType[];
}

export interface ProductInfo {
  title: string;
  categoryId: number;
  productId: number;
  totalAvailableQuantity: number;
  description: string;
  storeInfo: {
    name: string;
    companyId: number;
    storeNumber: number;
    followers: number;
    ratingCount: number;
    rating: string;
  };
  ratings: {
    totalStar: number;
    averageStar: string;
    totalStartCount: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    oneStarCount: number;
  };
  images: string[];
  feedback: {
    name: string;
    displayName: string;
    country: string;
    rating: number;
    info: Record<string, string>;
    date: string;
    content: string;
    photos: string[];
  }[];
  variants: {
    options: {
      id: number;
      name: string;
      values: {
        id: number;
        name: string;
        displayName: string;
        image?: string;
      }[];
    }[];
    prices: {
      skuId: number;
      optionValueIds: string;
      availableQuantity: number;
      originalPrice: number;
      salePrice: number;
    }[];
  };
  specs: {
    attrName: string;
    attrValue: string;
  }[];
  currency: string;
  originalPrice: {
    min: number;
    max: number;
  };
  salePrice: {
    min: number;
    max: number;
  };
}
