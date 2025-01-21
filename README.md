# Astro Starter Kit: Minimal

## MarcosRZ Notes

I'm writing this down as a quick reference of the design decisions I made. Not because they're of interest to anyone else, but because I want to keep a record of them.

If you're me (from the future), you're welcome. 🤙 

![Emmet](https://raw.githubusercontent.com/MarcosRZ/astro-blog/refs/heads/master/src/media/images/emmet.png)

### Adding content

Writing flow relies on GitHub and Netlify. Pushes to master will trigger a build and deploy to Netlify. So basically, to publish a new post, just write a .md file in `src/blog/` and push to master.

- Adding `.md` files to the `src/blog/` directory will automatically add them to the routing / rendering.
- Add resources to `@media`. E.g. images (`@media/images`). Use `<Image />` component to have an optimized version. 
- I've configured typescript module aliases for several directories. `tsconfig.json`

### 🔻 Triangles background

Didn't find an easy way to use css vars inside an svg being used as background image, so it's basically a black and white image with opacity. The color is is set using background-color as usual.

As this effect is used in Header, Body and Footer, I've created a `.triangles` class and applied wherever it made sense.

### 🧭 Sitemap and 🤖 Robots

Sitemap and robots files are generated at **build time**. This means they won't be available in dev env. Run a **build preview** to generate and serve them.

Then you should be able to visit them: `/sitemap-index.xml`, `/robots.txt` and `/sitemap-0.xml`

### 🔊 Automatic RSS Feed

Yep. That's it. See `rss.xml.js`.

## Astro default readme


```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
