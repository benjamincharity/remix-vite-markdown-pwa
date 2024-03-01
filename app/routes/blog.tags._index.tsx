import { LoaderFunction, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { TagsPayload } from '~/types/blog';

import { siteMetadata } from '~/data/siteMetadata';

import { BlogTagsPage } from '~/features/Blog/BlogTagsPage';
import { getAllBlogPosts } from '~/utils/blog.server';
import { generateMetaCollection } from '~/utils/generateMetaCollection';
import { getTagsFromBlogPosts } from '~/utils/getTagsFromBlogPosts';

interface LoaderData {
  tags: TagsPayload;
}

export const loader: LoaderFunction = async () => {
  const posts = await getAllBlogPosts();
  return json({ tags: getTagsFromBlogPosts(posts) });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { tags } = data as LoaderData;
  const summaryTags = tags
    .slice(0, 3)
    .map(([tag]) => tag)
    .join(', ');
  return generateMetaCollection({
    summary: `Explore our comprehensive list of tags to easily find the topics that interest you. From ${summaryTags[0]}, ${summaryTags[1]}, to ${summaryTags[2]}, and more – dive into a world of insightful articles tailored to your interests.`,
    tags: tags.map(([tag]) => tag),
    title: 'Browse posts by tags.',
    url: `${siteMetadata.url}/blog/tags`,
  });
};

export default function Tags() {
  const { tags } = useLoaderData<LoaderData>();

  return <BlogTagsPage tags={tags} />;
}
