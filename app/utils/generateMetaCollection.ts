import { siteMetadata } from '~/data/siteMetadata';

interface GenerateMetaCollectionProps {
  disableScale?: boolean;
  imageUrl?: string;
  summary: string;
  tags: string[];
  title: string;
  url?: string;
}

export function generateMetaCollection(
  props: GenerateMetaCollectionProps = {} as GenerateMetaCollectionProps
) {
  const {
    disableScale = false,
    imageUrl = siteMetadata.image,
    summary = siteMetadata.description,
    tags = [],
    title = siteMetadata.title,
    url = siteMetadata.url,
  } = props;
  const keywords = tags.join(', ');
  const finalImageUrl = imageUrl ?? siteMetadata.image;
  const viewportContent = `width=device-width,initial-scale=1${disableScale ? ',user-scalable=no' : ''}`;

  return [
    { title: title },
    { charset: 'utf-8' },
    { name: 'viewport', content: viewportContent },
    { name: 'robots', content: 'index, follow' },

    // Basic meta tags
    { name: 'title', content: title },
    { name: 'description', content: summary },
    { name: 'keywords', content: keywords },
    { name: 'author', content: siteMetadata.name },

    // Open Graph / Facebook / LinkedIn
    { property: 'og:title', content: title },
    { property: 'og:description', content: summary },
    { property: 'og:image', content: finalImageUrl },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: finalImageUrl },
    { name: 'twitter:creator', content: siteMetadata.twitter },
    { name: 'twitter:site', content: `@${siteMetadata.twitter}` },

    // Additional tags
    {
      tag: 'link',
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/images/pwa/apple-touch-icon.png',
    },
    {
      tag: 'link',
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/images/pwa/favicon-32x32.png',
    },
    {
      tag: 'link',
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/images/pwa/favicon-16x16.png',
    },
    {
      tag: 'link',
      rel: 'mask-icon',
      href: '/images/pwa/safari-pinned-tab.svg',
      color: '#3874ce',
    },
    { name: 'msapplication-TileColor', content: '#3874ce' },
    { name: 'theme-color', content: '#3874ce' },
    { tag: 'link', rel: 'canonical', href: url },
  ];
}
