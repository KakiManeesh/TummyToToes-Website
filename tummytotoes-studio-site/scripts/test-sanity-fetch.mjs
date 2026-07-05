import { createClient } from "next-sanity";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-05-15",
  useCdn: true,
});

const query = `*[_type == "galleryPanel"] | order(order asc) {
  _id,
  title,
  coverImage { secure_url }
}`;

try {
  const result = await client.fetch(query);
  console.log("count:", result.length);
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  console.error("FAIL:", err.message);
}
