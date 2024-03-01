import React, { ReactNode, SVGProps, useEffect, useState } from 'react';

import { CodeIcon } from '~/components/icons/Code';
import { CodePageIcon } from '~/components/icons/CodePage';
import { DownloadIcon } from '~/components/icons/Download';
import { DropletIcon } from '~/components/icons/Droplet';
import { GaugeIcon } from '~/components/icons/Gauge';
import { MobileIcon } from '~/components/icons/Mobile';
import { PageIcon } from '~/components/icons/Page';
import { ShareNodesIcon } from '~/components/icons/ShareNodes';
import { SyncAlt } from '~/components/icons/SyncAlt';

const beforeStrings = [
  ['before:from-stone-600', 'before:to-red-600'],
  ['before:from-red-600', 'before:to-orange-600'],
  ['before:from-orange-600', 'before:to-amber-600'],
  ['before:from-amber-600', 'before:to-yellow-600'],
  ['before:from-yellow-600', 'before:to-lime-600'],
  ['before:from-lime-600', 'before:to-green-600'],
  ['before:from-green-600', 'before:to-emerald-600'],
  ['before:from-emerald-600', 'before:to-teal-600'],
  ['before:from-teal-600', 'before:to-cyan-600'],
  ['before:from-cyan-600', 'before:to-sky-600'],
  ['before:from-sky-600', 'before:to-blue-600'],
  ['before:from-blue-600', 'before:to-indigo-600'],
  ['before:from-indigo-600', 'before:to-violet-600'],
  ['before:from-violet-600', 'before:to-purple-600'],
  ['before:from-purple-600', 'before:to-fuchsia-600'],
  ['before:from-fuchsia-600', 'before:to-pink-600'],
  ['before:from-pink-600', 'before:to-rose-600'],
];

const features: Feature[] = [
  {
    heading: 'Dynamic Content',
    description:
      'Automatically generate your posts and tags list, freeing you from manual updates. Focus more on creating content, less on managing it.',
    icon: SyncAlt,
  },
  {
    heading: 'Flexible Pagination',
    description:
      'Improve user engagement with infinite scroll or click-to-load more options, offering a seamless browsing experience.',
    icon: PageIcon,
  },
  {
    heading: 'Progressive Web App (PWA)',
    description:
      'Ensure your blog is fast, reliable, and engaging with PWA support, making it accessible offline and on any device.',
    icon: MobileIcon,
  },
  {
    heading: 'Perfect Performance',
    description:
      'Achieve a flawless 100 Lighthouse score for speed, accessibility, and SEO, ensuring your blog stands out.',
    icon: GaugeIcon,
  },
  {
    heading: 'Optimized Initial Load',
    description:
      'Speed up your site with CSS directly injected into the initial payload and preloaded recent articles for instant access.',
    icon: DownloadIcon,
  },
  {
    heading: 'Enhanced Markdown',
    description:
      'Full markdown control with semantic outputs, responsive images, code highlighting, and more for rich, engaging posts.',
    icon: CodePageIcon,
  },
  {
    heading: 'Tailwind CSS',
    description:
      'Utilize Tailwind CSS for easy design customization and solve the dev mode recompilation issue with our guidance.',
    icon: CodeIcon,
  },
  {
    heading: 'Adaptive Color Mode',
    description:
      'Offer readers a personalized experience with bulletproof color mode support, remembering their preferences via cookies.',
    icon: DropletIcon,
  },
  {
    heading: 'SEO and Sharing Optimized',
    description:
      'Boost your reach with RSS feed, sitemap support, and optimized metadata for social sharing, including custom images per post.',
    icon: ShareNodesIcon,
  },
];

interface Feature {
  description: string;
  heading: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
}

export function Features() {
  return (
    <>
      <div className="mt-16 max-w-7xl md:mt-0">
        <h2 className="text-4xl font-bold lg:text-5xl lg:tracking-tight">
          Everything you need to start your next project
        </h2>
        <p className="mt-4 text-lg">
          Elevate your website with the <em>remix-vite-markdown-pwa</em>{' '}
          template. Perfect for blogs and dynamic sites, it combines{' '}
          <strong>RemixJS</strong>, <strong>Vite</strong>, and{' '}
          <strong>TailwindCSS</strong> for effortless content management and
          stellar performance. Enjoy automated posts, seamless pagination,
          offline access with <strong>PWA</strong>, and a perfect Lighthouse
          score. Get started fast, customize easily with Tailwind, and captivate
          your audience. Download now and transform your web presence today.
        </p>
      </div>

      <div className="grid items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.heading} {...f} />
        ))}
      </div>
    </>
  );
}

interface FeatureCardProps extends Feature, React.HTMLProps<HTMLDivElement> {}

function FeatureCard({
  description,
  icon: Icon,
  heading,
  ...rest
}: FeatureCardProps) {
  const [bgStyle, setBgStyle] = useState('');

  useEffect(() => {
    const bg = beforeStrings[Math.floor(Math.random() * beforeStrings.length)];
    const style = `before:bg-gradient-to-br before:via-transparent ${bg[0]} ${bg[1]}`;
    setBgStyle(style);
  }, []);

  return (
    <div {...rest}>
      <div
        className={`relative ${bgStyle} flex size-12 items-center justify-center rounded-xl bg-white before:absolute before:-inset-px before:-z-[1] before:rounded-xl dark:bg-slate-900`}
      >
        <Icon
          className={`size-6 flex-shrink-0 text-blue-600 dark:fill-white`}
        />
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {heading}
        </h3>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
