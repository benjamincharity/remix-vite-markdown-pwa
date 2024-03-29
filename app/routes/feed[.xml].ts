import { siteMetadata } from '~/data/siteMetadata';

import { getAllBlogPosts } from '~/utils/blog.server';
import { escapeXml } from '~/utils/escapeXml';

export async function loader() {
  const posts = await getAllBlogPosts();

  const feed = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>${escapeXml(siteMetadata.title)}</title>
        <link>${siteMetadata.url}</link>
        <language>en-us</language>
        <managingEditor>${escapeXml(siteMetadata.email)} (${escapeXml(siteMetadata.author)})</managingEditor>
        <webMaster>${escapeXml(siteMetadata.email)} (${escapeXml(siteMetadata.author)})</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${siteMetadata.url}/feed.xml" rel="self" type="application/rss+xml"/>
        ${posts
          .map(
            (a) =>
              `<item>
                <guid>${siteMetadata.url}/blog/${a.slug}</guid>
                <title>${escapeXml(a.frontmatter.title)}</title>
                <link>${siteMetadata.url}/blog/${a.slug}</link>
                <description>${escapeXml(a.frontmatter.summary)}</description>
                <pubDate>${new Date(
                  a.frontmatter.publishDate ?? new Date()
                ).toUTCString()}</pubDate>
                <author>${escapeXml(siteMetadata.email)} (${escapeXml(siteMetadata.author)})</author>
                ${a.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
            </item>
            `
          )
          .join('')}
    </channel>
  </rss>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml' },
    status: 200,
  });
}
