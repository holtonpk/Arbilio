export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  monthly_price: Price;
  annual_price: Price;
  features: feature[];
  firebaseRole: string;
}

interface Price {
  id: string;
  unit_amount: number;
}

export interface feature {
  text: string;
  footnote?: string;
  negative?: boolean;
}

export const products: Product[] = [
  {
    id: "prod_NsPgx3fbEtgp1i",
    name: "Pro",
    description:
      "Design for the high volume seller, looking to scale to the moon",
    icon: "gem",
    monthly_price: { id: "price_1N6eqvEewcpAM4Mfq7Ee3orH", unit_amount: 4900 },
    annual_price: { id: "price_1N6ewwEewcpAM4MfHvcbQ0qE", unit_amount: 36000 },
    firebaseRole: "3",
    features: [
      { text: "Access to Top Accounts" },
      { text: "Access to Product Database" },
      { text: "Access to Accounts Database" },
      { text: "Unlimited Account Collections" },
      { text: "Unlimited Product Tracking" },
      { text: "Unlimited Product Searches" },
    ],
  },
  {
    id: "prod_NsPejSOm20kcO8",
    name: "Basic",
    description: "Perfect for a low level seller just getting started",
    icon: "bolt",
    monthly_price: { id: "price_1N6ep6EewcpAM4MfyFL95phK", unit_amount: 2900 },
    annual_price: { id: "price_1N6et6EewcpAM4MfshZRFOwV", unit_amount: 22800 },
    firebaseRole: "2",
    features: [
      { text: "Access to Top Accounts" },
      { text: "Access to Product Database" },
      { text: "Access to Accounts Database" },
      { text: "Unlimited Account Collections", negative: true },
      { text: "Unlimited Product Tracking", negative: true },
      { text: "Unlimited Product Searches", negative: true },
    ],
  },
];

type ToolAccessConfig = {
  totalCredits: number;
  access?: boolean;
  unlimited?: boolean;
};

export interface PlansType {
  tier: number;
  COLLECTION_LIMIT: ToolAccessConfig;
  PRODUCT_TRACK_LIMIT: ToolAccessConfig;
  DAILY_PRODUCT_SEARCH_LIMIT: ToolAccessConfig;
}

export type PlansConfig = {
  [firebaseRole: number]: PlansType;
};

export const Plans: PlansConfig = {
  0: {
    tier: 0,
    COLLECTION_LIMIT: {
      totalCredits: 0,
      access: false,
    },
    PRODUCT_TRACK_LIMIT: {
      totalCredits: 0,
      access: false,
    },
    DAILY_PRODUCT_SEARCH_LIMIT: {
      totalCredits: 0,
      access: false,
    },
  },
  1: {
    tier: 1,
    COLLECTION_LIMIT: {
      totalCredits: 5,
      access: true,
    },
    PRODUCT_TRACK_LIMIT: {
      totalCredits: 5,
      access: true,
    },
    DAILY_PRODUCT_SEARCH_LIMIT: {
      totalCredits: 3,
      access: true,
    },
  },
  2: {
    tier: 2,
    COLLECTION_LIMIT: {
      totalCredits: 20,
      access: true,
      unlimited: true,
    },
    PRODUCT_TRACK_LIMIT: {
      totalCredits: 20,
      access: true,
      unlimited: true,
    },
    DAILY_PRODUCT_SEARCH_LIMIT: {
      totalCredits: 10000,
      access: true,
      unlimited: true,
    },
  },
};
