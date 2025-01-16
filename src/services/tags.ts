import { getAllPosts } from '@services/posts'

export const getTags = () => [...new Set(getAllPosts().map((post: any) => post.frontmatter.tags))].flat();