import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items: posts.map(({author, ...post}) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    // items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')).then(items => items.map(({ author, ...item }) => item)),
    customData: `
      <language>en-us</language>
      <atom10:link
        xmlns:atom10="http://www.w3.org/2005/Atom"
        rel="self"
        type="application/rss+xml"
        href="https://marcosrz-astro-blog.netlify.app/rss.xml"
      />`,
  });
}