import { TagsPayload } from '~/types/blog';

import { BlogReference } from '~/utils/blog.server';

export function getTagsFromBlogPosts(posts: BlogReference[]): TagsPayload {
  const tags = new Map<string, number>();

  posts.forEach((a) => {
    a.frontmatter?.tags?.forEach((tag: string) => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });
  return Array.from(tags.entries()).sort((a, b) => a[0].localeCompare(b[0])); // sort alphabetically
}
