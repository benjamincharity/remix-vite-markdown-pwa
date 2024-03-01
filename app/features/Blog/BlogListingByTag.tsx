import pluralize from 'pluralize';
import React from 'react';

import { TagsPayload } from '~/types/blog';

import { RoutePaths } from '~/data/routes.data';

import { BackToLink } from '~/components/BackToLink';
import { BackToTop } from '~/components/BackToTop';
import { BlogList } from '~/components/Blog/BlogList';
import { BrowseByTags } from '~/components/BrowseByTags';
import { Footer } from '~/components/Footer';
import { BlogReference } from '~/utils/blog.server';

interface BlogListingByTagProps extends React.HTMLProps<HTMLDivElement> {
  posts: BlogReference[];
  tag?: string;
  tags: TagsPayload;
}

export function BlogListingByTag({
  posts = [],
  tag,
  tags = [],
  ...rest
}: BlogListingByTagProps) {
  const { className, ...divProps } = rest;
  return (
    <section
      aria-labelledby="tagged-posts-header"
      className={`prose-wrapper max-w-blogMaxWidth ${className}`}
      {...divProps}
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
