# remix-vite-markdown-pwa

![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=remix-vite-markdown-pwa)

![Lighthouse Accessibility Badge](public/images/lighthouse/lighthouse_accessibility.svg)
![Lighthouse Best Practices Badge](public/images/lighthouse/lighthouse_best-practices.svg)
![Lighthouse Performance Badge](public/images/lighthouse/lighthouse_performance.svg)
![Lighthouse PWA Badge](public/images/lighthouse/lighthouse_pwa.svg)
![Lighthouse SEO Badge](public/images/lighthouse/lighthouse_seo.svg)

![remix-vite-markdown-pwa](public/images/social.LinkedIn.png)

Welcome to Remix Vite Markdown PWA, a feature-rich template designed to
streamline your markdown-based blog or web-app experience while ensuring
top-notch performance, accessibility, and user experience. Below is an overview
of the key features and functionalities offered by this template:

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [FAQ](#faq)
  - [I am getting an error when I run `npm run dev`](#i-am-getting-an-error-when-i-run-npm-run-dev)
  - [How can I update the PWA images?](#how-can-i-update-the-pwa-images)
  - [Do I need to use Tailwind CSS?](#do-i-need-to-use-tailwind-css)

## Key Features

### Dynamically Built Posts and Tags List

Say goodbye to manual management of your posts and tags list. Our template
dynamically generates these lists, saving you time and effort.

### Load More Pagination

Choose between infinite scroll or click-to-load-more pagination options to
enhance user experience and navigation on your site.

### Progressive Web App (PWA) Support

Transform your website into a PWA, allowing users to enjoy a native app-like
experience, including offline access and push notifications.

### Perfect Lighthouse Score

Achieve a flawless Lighthouse score across all categories, ensuring optimal
performance, accessibility, best practices, and SEO.

### CSS Injected to Initial Payload

Optimize loading times by injecting CSS into the initial payload, enhancing the
rendering speed of your website.

### Preload Most Recent Articles

Improve user experience by preloading the most recent articles, reducing latency
and ensuring swift access to content.

### Reduced Motion Mode Support

Cater to users with motion sensitivity by providing support for reduced motion
mode, enhancing accessibility and inclusivity.

### Full Control Over Markdown Compilation Pipeline

Enjoy complete control over your markdown compilation pipeline using unified and
re-hype, allowing for semantic table output, responsive image rendering, code
highlighting, GitHub flavor support, Codepen embeds, deep linking, reading time
calculation, and more.

### Tailwind CSS Integration

Integrate Tailwind CSS seamlessly into your project, though you may encounter a
recompilation issue in development mode. Detailed instructions are provided to
address this concern, and removing Tailwind CSS is made easy if needed.

### Bulletproof Color Mode Support

Offer users a customizable color mode preference, with settings stored locally
via cookies, ensuring a personalized browsing experience.

### RSS Feed and Sitemap Support

Enhance discoverability and SEO by providing RSS feed and sitemap support for
your website.

### Local Link Support and Full Meta-Data Support

Facilitate smooth navigation with local link support and ensure optimal sharing
on social platforms with full meta-data support, including custom images per
post.

### Ready-to-Deploy to Vercel or Netlify

Deploy your website effortlessly to Vercel or Netlify, leveraging their robust
hosting solutions for optimal performance and scalability.

### Prettier with Import Sorting

Maintain clean and organized code with Prettier and ESLint integration,
including import sorting for improved readability and maintainability.

## Getting Started

To get started with Remix Vite Markdown PWA, follow these steps:

1. Clone this repository.
2. Install dependencies using `pnpm install`.
3. Customize your content and configurations as needed.
   1. Update the `siteMetadata` object in
      [`app/data/siteMetadata.ts`](app/data/siteMetadata.ts) with your site's
      information.
   2. Update the `config` object in [`app/config.ts`](app/config.ts) to adjust
      site-wide settings. (Number of posts to preload, pagination settings,
      etc.)
   3. Update the
      [`app/routes/manifest[.]webmanifest.ts`](app/routes/manifest[.]webmanifest.ts)
      to customize your PWA settings.
   4. Replace the images in the `public/images/pwa` folder with your own PWA
      images. (See the FAQ for some helpful tools.)
   5. If needed, you can customize the MDX processing pipeline in
      [`app/utils/mdxProcessor.server.tsx`](app/utils/mdxProcessor.server.tsx).
4. Deploy your website to your preferred hosting platform.

---

If you have any questions or need further assistance, please don't hesitate to
reach out or
[open an issue](https://github.com/benjamincharity/remix-vite-markdown-pwa/issues)
on GitHub!

## FAQ

### I am getting an error when I run `npm run dev`

```
can not read a block mapping entry; a multiline key may not be an implicit key at line 2, column 8:
```

Check your yaml file for any syntax errors. This error is usually caused by
unescaped quotes.

### How can I update the PWA images?

Generate the images using
[Real Favicon Generator](https://realfavicongenerator.net/), then replace the
images in the `public/images/pwa` folder.

There is also a CLI tool called
[pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)

### Do I need to use Tailwind CSS?

No, you don't need to use Tailwind CSS. If you don't want to use it, you can
remove it by following these steps:

1. Remove the `tailwind.config.js` file.
2. Remove any `tailwind` related items from `app/styles/shared.css`.
3. Remove any `tailwind` related items from `package.json` scripts.
4. Uninstall `tailwind` items:
   `pnpm remove tailwindcss prettier-plugin-tailwindcss`.

See: https://remix.run/docs/en/main/styling/tailwind
