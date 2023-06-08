export const userTiers = {
  base: 0,
  standard: 1,
  premium: 2,
};

export type Plans = "base" | "standard" | "premium";

// total track products
// total product data base searches
// top products
// total account collections
// account database
// daily account views?
// daily product views?

const planPermissions = {
  [userTiers.base]: {
    canView: true,
    canEdit: false,
    canDelete: false,
  },
  [userTiers.standard]: {
    canView: true,
    canEdit: true,
    canDelete: false,
  },
  [userTiers.premium]: {
    canView: true,
    canEdit: true,
    canDelete: true,
  },
};
