export const getAllPosts = () => Object.values(
  import.meta.glob('@posts/*.md', { eager: true })
);