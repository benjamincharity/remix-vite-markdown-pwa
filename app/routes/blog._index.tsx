import { type MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { TagsPayload } from '~/types/blog';
import { FixMeLater } from '~/types/shame';

import { siteMetadata } from '~/data/siteMetadata';

import { SITE_CONFIG } from '~/config';
import { BlogListing } from '~/features/Blog/BlogListing';
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
  const loaderData = useLoaderData<LoaderData>();
  throw new Error('This is a test error from BrokenComponent');

  return <BlogListing className={'pb-6'} {...loaderData} />;
}
