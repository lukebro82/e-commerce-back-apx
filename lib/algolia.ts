import algoliasearch from "algoliasearch";

const appID = process.env.ALGOLIA_APP_ID || "3BGK3ZUZHS";
const apiKey =
  process.env.ALGOLIA_API_KEY || "ab1bcdcdb6982249591f1906f4180a51";

export const client = algoliasearch(appID, apiKey);
export const productsIndex = "products";
