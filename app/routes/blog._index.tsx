import { type MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';

import { TagsPayload } from '~/types/blog';
import { FixMeLater } from '~/types/shame';

import { RoutePaths } from '~/data/routes.data';
import { siteMetadata } from '~/data/siteMetadata';

import { Badge } from '~/components/Badge';
import { BlogList } from '~/components/Blog/BlogList';
import { BrowseByTags } from '~/components/BrowseByTags';
import { SITE_CONFIG } from '~/config';
import { PaginationEnd } from '~/features/Blog/components/PaginationEnd';
import {
  BlogReference,
  getAllTags,
  getLatestBlogPosts,
} from '~/utils/blog.server';
import { generateMetaCollection } from '~/utils/generateMetaCollection';

interface LoaderData {
  articles: BlogReference[];
  page: number;
  tags: TagsPayload;
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const articles = await getLatestBlogPosts(
    page * SITE_CONFIG.paginationPerPage
  );
  const tags = await getAllTags();

  return json<LoaderData>(
    { articles, tags, page },
    {
      headers: { 'Cache-Control': 'private, max-age=10' },
    }
  );
}

export const meta: MetaFunction = ({ data }: FixMeLater) => {
  return generateMetaCollection({
    title: `Articles on the best new Remix starter, by ${siteMetadata.author}`,
    summary:
      'Explore articles on the newest RemixJS starter template. Learn about the latest features, and how to use them in your own projects.',
    tags: data.tags,
    url: `${siteMetadata.url}/blog`,
  });
};

export default function Index() {
  const { articles, tags, page } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get('q'), [searchParams]);
  const hasNextPage = articles.length >= SITE_CONFIG.paginationPerPage * page;
  const nextPageLink = `${RoutePaths.blog}?page=${page + 1}`;

  return (
    <section className={'pb-6'}>
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
