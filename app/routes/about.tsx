import type { MetaFunction } from '@remix-run/node';

import { siteMetadata } from '~/data/siteMetadata';

export const meta: MetaFunction = () => {
  const title = `About - ${siteMetadata.author}`;
  const summary = `About me - ${siteMetadata.author}`;

  return [
    { name: 'title', content: title },
    { name: 'description', content: summary },
    { property: 'og:title', content: title },
    { property: 'og:description', content: summary },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: summary },
  ];
};

export default function About() {
  return (
    <div className="mb-auto flex flex-col items-center justify-center pt-4">
      <span className="text-slate-500">{siteMetadata.professionalTitle}</span>

      <div className="prose-wrapper">
        <p>{siteMetadata.aboutMe}</p>
      </div>
    </div>
  );
}
