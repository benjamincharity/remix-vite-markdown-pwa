import { useLocation } from '@remix-run/react';
import { useEffect } from 'react';

import { TagsPayload } from '~/types/blog';

import { BackToLink } from '~/components/BackToLink';
import { BrowseByTags } from '~/components/BrowseByTags';
import { Footer } from '~/components/Footer';
import { NewsletterSignUp } from '~/components/NewsletterSignUp';
import { PrimaryTitle } from '~/features/Blog/PrimaryTitle';
import { PublishDate } from '~/features/Blog/PublishDate';
import { Frontmatter } from '~/utils/blog.server';

interface BlogPostProps {
  allTags: TagsPayload;
  frontmatter: Frontmatter;
  html: string;
}

export function BlogPost({ allTags = [], frontmatter, html }: BlogPostProps) {
  const localTags = getTagsWithCount(frontmatter.tags, allTags);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main
      className={
        'mx-auto max-w-3xl px-4 py-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10'
      }
    >
      <BackToLink id={'top'} className={'mb-4'} />

      <article className={'blog-post'}>
        <PublishDate
          publishDate={frontmatter.publishDate}
          updatedDate={frontmatter.updatedDate}
        />
        <PrimaryTitle title={frontmatter.title} />

        <p className={'reading-time'}>
          Reading time: {frontmatter.readingTime}min
        </p>

        <section className={'rendered-markdown'}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
      </article>

      <hr className={'fancy'} />

      <NewsletterSignUp />

      <hr className={'fancy'} />

      <BrowseByTags heading={'Tags:'} tags={localTags} />

      <Footer />
    </main>
  );
}

function getTagsWithCount(tags: string[], allTags: TagsPayload): TagsPayload {
  return allTags.filter(([tag]) => tags.includes(tag));
}
