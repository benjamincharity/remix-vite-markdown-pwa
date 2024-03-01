import { json } from '@remix-run/node';

export const loader = async () => {
  return json(
    {
      short_name: 'RVMP',
      lang: 'en-US',
      name: 'remix-vite-markdown-pwa',
      start_url: '/',
      display: 'standalone',
      background_color: '#f7f7f7',
      theme_color: '#F5C742',
      shortcuts: [
        {
          name: 'Homepage',
          url: '/',
          icons: [
            {
              src: '/images/pwa/android-icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
              purpose: 'any monochrome',
            },
          ],
        },
      ],
      icons: [
        {
          src: '/images/pwa/apple-icon-180.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: '/images/pwa/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/images/pwa/apple-splash-1284-2778.jpg',
          sizes: '1284x2778',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1792-828.jpg',
          sizes: '1792x828',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2388-1668.jpg',
          sizes: '2388x1668',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-640-1136.jpg',
          sizes: '640x1136',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1125-2436.jpg',
          sizes: '1125x2436',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1334-750.jpg',
          sizes: '1334x750',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2048-1536.jpg',
          sizes: '2048x1536',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2436-1125.jpg',
          sizes: '2436x1125',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-750-1334.jpg',
          sizes: '750x1334',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1136-640.jpg',
          sizes: '1136x640',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1536-2048.jpg',
          sizes: '1536x2048',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2048-2732.jpg',
          sizes: '2048x2732',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2532-1170.jpg',
          sizes: '2532x1170',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-828-1792.jpg',
          sizes: '828x1792',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1170-2532.jpg',
          sizes: '1170x2532',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1620-2160.jpg',
          sizes: '1620x2160',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2160-1620.jpg',
          sizes: '2160x1620',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2688-1242.jpg',
          sizes: '2688x1242',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/manifest-icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/images/pwa/apple-splash-1242-2208.jpg',
          sizes: '1242x2208',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-1668-2224.jpg',
          sizes: '1668x2224',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2224-1668.jpg',
          sizes: '2224x1668',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/apple-splash-2778-1284.jpg',
          sizes: '2778x1284',
          type: 'image/jpeg',
        },
        {
          src: '/images/pwa/manifest-icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/images/pwa/apple-splash-1242-2688.jpg',
          sizes: '1242x2688',
          type: 'image/jpeg',
        },
      ],
    },
    {
      headers: {
        'Cache-Control': `public, max-age=600`,
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
