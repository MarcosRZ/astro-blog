---
title: 'La Importancia del Diseño Responsivo'
pubDate: 2022-07-01
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula eu tellus non convallis. Donec feugiat ligula iaculis vehicula vulputate. Donec tortor metus, pretium sit amet commodo vel, vestibulum vitae arcu. Phasellus interdum ligula sem, suscipit egestas lacus cursus ac. Suspendisse potenti. Aliquam vel feugiat velit, vel mollis nisi. Vivamus eu maximus massa.'
author: 
  name: 'Marcos R.'
  url: 'https://marcosrgz.com'
image: '@media/images/pic-1.jpg'
imageAlt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "blogging", "learning in public", "A very long tag that should not be truncated"]
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis elit et nulla cursus vestibulum at id leo. Suspendisse vestibulum efficitur dolor, id lacinia sapien hendrerit et. Aliquam pretium luctus nisl, a placerat urna interdum eget. 

**Links:** My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

![alt text](@media/images/example.svg)

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam eu orci ac lorem lacinia gravida eu vitae turpis. Nullam molestie justo non rutrum feugiat. Curabitur accumsan, justo id posuere posuere, felis tellus mollis ipsum, vel hendrerit dui neque ac orci. Phasellus in finibus augue, nec facilisis lectus. In nec pretium libero. Ut sit amet odio sed velit placerat pellentesque. Maecenas venenatis eros arcu, a condimentum augue fermentum a. Proin ut neque vel ligula pulvinar maximus sed ac est. Nam pellentesque imperdiet lacus, in gravida sapien hendrerit ut. Pellentesque id purus vitae dolor elementum fringilla ultrices ut leo.

## Another cool section

Esto es un fragmento de código:

```javascript
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
```

Curabitur nec lectus libero. Mauris in sem efficitur, egestas lectus sed, mattis diam. Sed vitae dignissim lectus. Maecenas consequat, ex sit amet aliquet mattis, arcu ipsum dapibus nulla, id imperdiet tortor enim quis dolor. Nam eu dui maximus, congue massa ac, fringilla urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent nec augue id enim ultricies pulvinar.

## Here comes the third
Nullam ornare commodo libero, sit amet consectetur turpis elementum eu. In tincidunt, mauris vel eleifend cursus, metus elit auctor erat, nec rutrum massa ligula a augue. Mauris non ipsum vitae odio elementum pharetra. Quisque nec magna ultrices, luctus tortor in, posuere mi. Maecenas congue justo a commodo congue. Aliquam malesuada euismod auctor. 

Sed imperdiet diam sit amet convallis volutpat. Pellentesque mollis erat enim, eget lobortis ipsum dictum vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent purus diam, congue id nisi a, maximus tristique ex. Nulla sit amet est nec odio sollicitudin mollis.

## The one before the last
Maecenas sodales, tellus sed lobortis egestas, felis felis pretium metus, quis mattis libero lectus eget lacus. Etiam sit amet leo enim. Donec tincidunt sagittis lacus, ut iaculis enim malesuada vitae. Suspendisse fringilla hendrerit sem. Nunc quis tortor dolor. Sed sodales molestie neque nec semper. Mauris maximus sapien id ex sagittis, vel luctus nunc finibus. 

Praesent fringilla sagittis metus, non porta dui porttitor at. Nunc dictum lobortis magna, quis volutpat felis placerat sit amet. Sed id volutpat ipsum, a vestibulum lectus. Integer ac ultrices velit, vel consequat eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras non nunc a massa malesuada cursus non in odio. Suspendisse potenti. Mauris nec aliquam nisi. 

Quisque turpis purus, condimentum sit amet rutrum eget, sagittis nec diam.

## And finally, some conclussions...
Praesent tellus justo, maximus id augue et, faucibus elementum mauris. Cras ultricies orci aliquam, pharetra odio vitae, volutpat lorem. Aliquam vel mauris dictum, faucibus sapien viverra, porttitor ante. Mauris neque sem, vehicula sed nunc in, vehicula egestas augue. Nulla sit amet mi sodales, accumsan risus interdum, mollis nisl. Proin gravida ac metus sed venenatis. Maecenas pulvinar est leo, semper pulvinar erat rhoncus quis.

