import { Outlet } from '@remix-run/react';
import React from 'react';

import { TagsPayload } from '~/types/blog';

import { colors } from '~/data/colors.data';
import { RoutePaths } from '~/data/routes.data';

import { BackToLink } from '~/components/BackToLink';
import { BackToTop } from '~/components/BackToTop';
import { Badge } from '~/components/Badge';
import { Footer } from '~/components/Footer';
import { PrimaryTitle } from '~/features/Blog/PrimaryTitle';

interface BlogTagsPageProps extends React.HTMLProps<HTMLDivElement> {
  tags: TagsPayload;
}

export function BlogTagsPage({ tags, ...divProps }: BlogTagsPageProps) {
  return (
    <main {...divProps}>
      <PrimaryTitle title={'Tags'} className={'text-center'} />
      <BackToLink to={RoutePaths.blog} />

      <nav
        aria-label="Article tags"
        className="flex flex-wrap justify-center gap-8 pt-10 text-base"
      >
        {tags.map(([tag, count], i) => {
          return (
            <Badge
              color={colors[i]}
              count={count}
              key={tag}
              linkTo={tag}
              tag={tag}
            />
          );
        })}
      </nav>
      <BackToTop wrapperProps={{ className: 'mt-8' }} />

      <Outlet />

      <Footer />
    </main>
  );
}
