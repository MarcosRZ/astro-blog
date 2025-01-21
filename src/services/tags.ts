import { getAllPosts } from '@services/posts'

export const getTags = async () => {
  const allPosts = await getAllPosts();
  return [...new Set(allPosts.map((post: any) => post.data.tags).flat())].sort((a, b) => a.localeCompare(b));
}