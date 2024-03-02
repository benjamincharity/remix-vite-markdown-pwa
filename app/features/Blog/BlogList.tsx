import { Link } from '@remix-run/react';
import React from 'react';

import { siteMetadata } from '~/data/siteMetadata';

import { BlogReference } from '~/utils/blog.server';

export function BlogList({
  posts = [],
  className = '',
}: {
  posts: BlogReference[];
  className?: string;
}) {
  const [firstPost, ...rest] = posts;

  return (
    <section className={`body-font ${className}`}>
      <div className="container mx-auto px-5 py-8">
        <SinglePost post={firstPost} />

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {rest?.map((item) => {
            return (
              <SinglePost post={item} key={item.slug} layoutSize={'small'} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface SinglePostProps extends React.HTMLProps<HTMLDivElement> {
  post: BlogReference;
  layoutSize?: 'small' | 'large';
}

function SinglePost({
  post,
  layoutSize = 'large',
  ...divProps
}: SinglePostProps) {
  const url = `/blog/${post.slug}`;
  const { slug, frontmatter } = post;
  const { title, summary, readingTime, images, tags } = frontmatter;
  const CDN_URL_BASE = siteMetadata.blogPostImagePath;

  return (
    <div
      className={`group ${layoutSize === 'small' ? 'p-4' : 'mb-8 w-full'}`}
      key={slug}
      {...divProps}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg">
        <img
          alt={title}
          className="inline-block aspect-video w-full max-w-full bg-gradient-to-r from-indigo-200 to-yellow-100 text-center text-xs italic leading-loose text-gray-600 outline-gray-300"
          src={`${CDN_URL_BASE}${images[0]}`}
        />
        <div className="flex-1 rounded-b-lg border-2 border-t-0 border-gray-500 border-opacity-20 p-6 transition hover:border-opacity-50">
          <TagsDisplay tags={tags} />
          <h1 className={'mb-3'}>
            <Link className={'link-underline text-2xl font-semibold'} to={url}>
              {title}
            </Link>
          </h1>
          <p className="mb-3 text-lg leading-relaxed">{summary}</p>
          <div className="flex flex-wrap items-center justify-between">
            <Link
              className="group inline-flex items-center font-semibold text-indigo-500 underline underline-offset-4 dark:text-indigo-400"
              to={url}
            >
              Read more
              <svg
                className="ml-1 h-4 w-4 transition-all group-hover:ml-2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>

            <span className="inline-block items-center text-sm leading-none before:mr-1 before:inline-block before:opacity-60 before:transition-opacity before:content-['⌚'] group-hover:before:opacity-100">
              {readingTime}min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TagsDisplayProps extends React.HTMLProps<HTMLDivElement> {
  tags: string[];
}

function TagsDisplay({ tags, ...divProps }: TagsDisplayProps) {
  const { className = '', ...rest } = divProps;

  return (
    <div
      className={`mb-1 flex flex-wrap gap-x-4 gap-y-1 font-code text-xs tracking-wide opacity-60 ${className}`}
      {...rest}
    >
      {tags.map((tag) => (
        <span key={tag} className="">
          {tag}
        </span>
      ))}
    </div>
  );
}
