import { Link } from '@remix-run/react';

import { TagsPayload } from '~/types/blog';

import { RoutePaths } from '~/data/routes.data';

export const BrowseByTags = ({
  tags,
  currentTag,
  heading,
  id,
}: {
  tags: TagsPayload;
  currentTag?: string;
  heading?: string;
  id?: string;
}) => {
  return (
    <aside
      className={'text-center font-sourceSerif4 text-base font-bold'}
      id={id}
    >
      {!!heading && (
        <div className={'mb-2 text-gray-600 dark:text-gray-400'}>{heading}</div>
      )}
      <nav>
        <Tags tags={tags} currentTag={currentTag} />
      </nav>
    </aside>
  );
};

export const Tags = ({
  tags,
  currentTag,
}: {
  tags: TagsPayload;
  currentTag?: string;
}) => {
  return (
    <ul className={'text-center'}>
      {tags
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((t) => {
          const [tag, count] = t;
          const isCurrent = tag === currentTag;
          return (
            <li key={tag + count} className={'mb-2 mr-6 inline-block text-sm'}>
              {isCurrent ? (
                <span className={'relative inline-block dark:text-gray-500'}>
                  {tag}{' '}
                  <sup className={'left-100 absolute top-1/3 pl-[2px]'}>
                    {count}
                  </sup>
                </span>
              ) : (
                <Link
                  className={`link-underline link-underline--small relative`}
                  to={RoutePaths.tag(tag)}
                >
                  {tag}{' '}
                  <sup className={'left-100 absolute top-1/3 pl-[2px]'}>
                    {count}
                  </sup>
                </Link>
              )}
            </li>
          );
        })}
    </ul>
  );
};
