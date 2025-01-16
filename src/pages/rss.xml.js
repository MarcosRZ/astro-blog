import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')).then(items => items.map(({ author, ...item }) => item)),
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