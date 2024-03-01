import { MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import pluralize from 'pluralize';

import { TagsPayload } from '~/types/blog';

import { RoutePaths } from '~/data/routes.data';
import { siteMetadata } from '~/data/siteMetadata';

import { BackToLink } from '~/components/BackToLink';
import { BackToTop } from '~/components/BackToTop';
import { BlogList } from '~/components/Blog/BlogList';
import { BrowseByTags } from '~/components/BrowseByTags';
import { Footer } from '~/components/Footer';
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

  return (
    <section
      aria-labelledby="tagged-posts-header"
      className="prose-wrapper max-w-blogMaxWidth"
    >
      <header>
        <h1
          id="tagged-posts-header"
          className={
            'mb-4 text-center font-sourceSerif4 text-sm italic text-gray-600 dark:text-gray-400'
          }
        >
          Showing <strong>{posts?.length ?? 0}</strong>{' '}
          {pluralize('post', posts?.length)} tagged with &quot;
          <strong className={'highlight'}>{tag}.</strong>&quot;
        </h1>
      </header>

      <BackToLink to={RoutePaths.blog}>Back to all posts</BackToLink>
      <BackToLink className={'mb-4'} to={RoutePaths.tags}>
        Back to all tags
      </BackToLink>

      <BlogList posts={posts} className={'mb-10 pt-4'} />

      <BackToTop />

      <BrowseByTags tags={tags} currentTag={tag} />
      <Footer />
    </section>
  );
}
