import { getCollection } from 'astro:content';

export const getAllPosts = () => getCollection("blog");