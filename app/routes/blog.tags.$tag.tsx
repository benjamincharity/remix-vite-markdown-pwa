import { MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';

import { TagsPayload } from '~/types/blog';

import { siteMetadata } from '~/data/siteMetadata';

import { BlogListingByTag } from '~/features/Blog/BlogListingByTag';
import { BlogReference, getAllBlogPosts } from '~/utils/blog.server';
import { generateMetaCollection } from '~/utils/generateMetaCollection';
import { getTagsFromBlogPosts } from '~/utils/getTagsFromBlogPosts';

interface Params {
  tag: string;
}

interface LoaderData {
  posts: BlogReference[];
  query: string | null;
  tags: TagsPayload;
}

export const meta: MetaFunction = ({ params }) => {
  const { tag } = params;
  const title = `${tag} - ${siteMetadata.author}`;
  const summary = `Posts about ${tag} of ${siteMetadata.author}.`;

  return generateMetaCollection({
    summary,
    tags: [tag ?? ''].filter(Boolean),
    title,
    url: `${siteMetadata.url}/blog/tags`,
  });
};

export const loader = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const { tag } = params;
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const posts = await getAllBlogPosts();
  const tags = getTagsFromBlogPosts(posts);

  const filtered = posts.filter((a) => a.frontmatter?.tags?.includes(tag));

  return json<LoaderData>({ posts: filtered, query, tags });
};

export default function Tag() {
  const { tag } = useParams();
  const { posts, tags } = useLoaderData<LoaderData>();

  return <BlogListingByTag tag={tag} posts={posts} tags={tags} />;
}
