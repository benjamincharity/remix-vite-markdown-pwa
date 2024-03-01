import { LinksFunction } from '@remix-run/server-runtime';

import { Marketing } from '~/features/Marketing';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'prefetch',
      href: '/images/layout.webm',
      as: 'video',
      type: 'video/webm',
    },
  ];
};

export default function Index() {
  return <Marketing />;
}
