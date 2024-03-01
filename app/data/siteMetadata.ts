export const CLOUDINARY_ACCOUNT = 'CHANGE_ME';

export const siteMetadata = {
  title: 'remix-vite-markdown-pwa',
  description:
    'Explore the newest RemixJS starter template with Vite and Tailwind.',
  domain: 'https://remix-vite-markdown-pwa.vercel.app',
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://remix-vite-markdown-pwa.vercel.app'
      : 'http://localhost:3000',
  image: `/images/pwa/apple-splash-2732-2048.jpg`,
  blogPostImagePath: `https://res.cloudinary.com/${CLOUDINARY_ACCOUNT}/image/upload/c_scale/f_auto,q_auto/project-marketing/`,
  websiteImagePath: `https://res.cloudinary.com/${CLOUDINARY_ACCOUNT}/image/upload/c_scale/f_auto,q_auto/website/`,
  twitterImage: `/images/social.Twitter.png`,
  linkedInImage: `/images/social.LinkedIn.png`,
  author: 'Benjamin Charity',
  twitter: 'benjamincharity',
  github: 'benjamincharity',
  linkedin: 'benjamincharity',
  email: 'ben.charity@hey.com',
  name: 'Benjamin Charity',
  logo: '/images/pwa/manifest-icon-512.png',
  logo_dark_mode: '/images/pwa/manifest-icon-512.png',
};
