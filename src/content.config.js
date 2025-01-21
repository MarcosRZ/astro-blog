// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema:  ({ image }) => z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.object({
        name: z.string(),
        url: z.string().url()
      }),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string())
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };