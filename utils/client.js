import { createClient } from "contentful";

export const client = createClient({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  space: process.env.NEXT_PUBLIC_SPACE_ID,
});
