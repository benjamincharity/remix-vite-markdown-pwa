export const RoutePaths = {
  home: '/',
  about: '/about',
  blog: '/blog',
  post: (id: string) => `/blog/${id}`,
  notFound: '/404',
  tags: '/blog/tags',
  tag: (id: string) => `/blog/tags/${id}`,
};
