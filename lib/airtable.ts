import Airtable from "airtable";

export const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base("apptr9jgI5PnqWwbg");
