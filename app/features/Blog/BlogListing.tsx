import { useSearchParams } from '@remix-run/react';
import React, { useMemo } from 'react';

import { TagsPayload } from '~/types/blog';

import { RoutePaths } from '~/data/routes.data';

import { Badge } from '~/components/Badge';
import { BrowseByTags } from '~/components/BrowseByTags';
import { SITE_CONFIG } from '~/config';
import { BlogList } from '~/features/Blog/BlogList';
import { PaginationEnd } from '~/features/Blog/PaginationEnd';
import { BlogReference } from '~/utils/blog.server';

interface BlogListingProps extends React.HTMLProps<HTMLDivElement> {
  articles: BlogReference[];
  page: number;
  tags: TagsPayload;
}

export function BlogListing({
  articles = [],
  page = 0,
  tags = [],
  ...divProps
}: BlogListingProps) {
  const [searchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get('q'), [searchParams]);
  const hasNextPage = articles.length >= SITE_CONFIG.paginationPerPage * page;
  const nextPageLink = `${RoutePaths.blog}?page=${page + 1}`;

  return (
    <section {...divProps}>
      <BlogList posts={articles} />

      <div className={'text-small mb-6 px-4 py-4 text-center'}>
        {hasNextPage ? (
          <Badge
            color={'#f184a8'}
            count={-1}
            linkTo={nextPageLink}
            tag={'Load More'}
          />
        ) : (
          <PaginationEnd />
        )}
      </div>

      <BrowseByTags
        currentTag={query ?? ''}
        heading={'Browse by tags:'}
        id="tags-section"
        tags={tags}
      />
    </section>
  );
}
