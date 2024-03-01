import parseFrontMatter from 'front-matter';
import matter from 'gray-matter';
import path from 'path';

import { TagsPayload } from '~/types/blog';

import { siteMetadata } from '~/data/siteMetadata';

import { getTagsFromBlogPosts } from '~/utils/getTagsFromBlogPosts';
import { toHTML } from '~/utils/mdxProcessor.server';

import { readFile, readdir } from './fs.server';

export interface Frontmatter {
  draft?: boolean;
  formattedDate: string;
  images: string[];
  meta?: {
    description?: string;
    title?: string;
  };
  publishDate: string;
  readingTime: number;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
  updatedDate: string;
  url?: string;
  urlPath?: string;
}

/**
 * Get the React component, and frontmatter JSON for a given slug
 * @param slug
 * @returns
 */
export async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), 'app', 'articles', slug + '.mdx');
  const source = await readFile(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(source);
  const html = await toHTML(content, slug);

  return {
    code: content,
    frontmatter: {
      ...frontmatter,
    },
    html,
  };
}

export interface BlogReference {
  frontmatter: Frontmatter;
  slug: string;
}

/**
 * Fetches all blog posts
 *
 * @returns A Promise that resolves to an array of ArticleReference objects.
 */
async function fetchBlogPosts(count?: number): Promise<BlogReference[]> {
  const filePath = path.join(process.cwd(), 'app', 'articles');

  const postsPath = await readdir(filePath, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    postsPath
      .filter((dirent) => !dirent.name.startsWith('.'))
      .map(async (dirent) => {
        const fPath = path.join(filePath, dirent.name);
        const [file] = await Promise.all([readFile(fPath)]);
        const frontmatter = parseFrontMatter(file.toString());
        const attributes = frontmatter.attributes as Frontmatter;
        const slug = dirent.name.replace(/\.mdx/, '');
        const urlPath = `/articles/${slug}`;
        const url = `${siteMetadata.url}${urlPath}`;

        return {
          slug,
          frontmatter: {
            url,
            urlPath,
            ...attributes,
          },
        };
      })
  );

  if (process.env.NODE_ENV === 'production') {
    return posts
      .filter((article) => !article.frontmatter.draft)
      .sort(compareBlogPosts)
      .slice(0, count);
  }

  return posts.sort(compareBlogPosts).slice(0, count);
}

/**
 * Gets all blog posts available.
 *
 * @returns A Promise that resolves to an array of all ArticleReference objects.
 */
export async function getAllBlogPosts(): Promise<BlogReference[]> {
  return fetchBlogPosts();
}

/**
 * Gets the latest blog posts.
 *
 * @param [count=10] - The number of latest posts to retrieve.
 * @returns A Promise that resolves to an array of the latest ArticleReference objects.
 */
export async function getLatestBlogPosts(count = 10): Promise<BlogReference[]> {
  const allPosts = await fetchBlogPosts();
  return allPosts.slice(0, count);
}

export async function getAllTags(): Promise<TagsPayload> {
  const allPosts = await fetchBlogPosts();
  return getTagsFromBlogPosts(allPosts);
}

function compareBlogPosts(a: BlogReference, b: BlogReference): number {
  const aDate = new Date(a.frontmatter.publishDate);
  const bDate = new Date(b.frontmatter.publishDate);
  return bDate.getTime() - aDate.getTime();
}
