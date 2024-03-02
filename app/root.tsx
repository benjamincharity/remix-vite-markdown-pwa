import { LiveReload, useSWEffect } from '@remix-pwa/sw';
import { LinksFunction, MetaFunction, json } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  PrefetchPageLinks,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import React, { useEffect } from 'react';
import { ExternalScripts } from 'remix-utils/external-scripts';

import { ErrorPage } from '~/components/ErrorPage';
import { SITE_CONFIG } from '~/config';
import { BlogReference, getLatestBlogPosts } from '~/utils/blog.server';
import { generateMetaCollection } from '~/utils/generateMetaCollection';
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from '~/utils/theme.provider';
import { getThemeSession } from '~/utils/theme.server';

import { Layout } from './Layouts/Layout';
import stylesheet from './styles/shared.css';

const isProd = process.env.NODE_ENV === 'production';

// NOTE: This is a great place to add any preload/prefetch links.
export const links: LinksFunction = () => {
  const links = [];

  // NOTE: To increase development speed, we only inject the css directly when in production.
  // So we need to include the css file here for development.
  if (!isProd) {
    links.push({ rel: 'stylesheet', href: stylesheet });
  }

  return links;
};

interface LoaderData {
  css: string;
  filePath: string;
  latestPosts: BlogReference[];
  theme: Theme;
}

export async function loader({ request }: { request: Request }) {
  const themeSession = await getThemeSession(request);
  let cssContent = '';
  if (typeof window === 'undefined') {
    const cssUrl = new URL('/shared.css', request.url).href;

    const response = await fetch(cssUrl);
    if (response.ok) {
      cssContent = await response.text();
    } else {
      console.error(
        'Failed to load CSS:',
        response.status,
        response.statusText
      );
    }
  }
  const latestPosts = await getLatestBlogPosts(SITE_CONFIG.postPreloadCount);

  return json({
    css: cssContent,
    latestPosts,
    theme: themeSession.getTheme(),
  });
}

export const meta: MetaFunction = () => {
  return [...generateMetaCollection()];
};

const App = React.memo(() => {
  const { css, latestPosts, theme: loaderTheme } = useLoaderData<LoaderData>();
  const [theme, setTheme] = useTheme();

  useSWEffect();

  useEffect(() => {
    setTheme(loaderTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: The title tag and all other elements will be injected.
  // noinspection HtmlRequiredTitleElement
  return (
    <html className={`min-h-full min-w-full ${theme}`} lang="en">
      <head>
        <Meta />
        <style dangerouslySetInnerHTML={{ __html: isProd ? css : '' }} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
        <ThemeHead ssrTheme={Boolean(loaderTheme)} />
      </head>

      <body>
        <div className="h-100v relative text-lg">
          <Layout>
            <Outlet />
          </Layout>
          <ThemeBody ssrTheme={Boolean(loaderTheme)} />
          <ScrollRestoration getKey={(location) => location.pathname} />
        </div>

        <PrefetchPageLinks key={'blog-index'} page={'/blog'} />
        {latestPosts.map((p) => (
          <PrefetchPageLinks key={p.slug} page={'/blog/' + p.slug} />
        ))}

        <Scripts />
        <ExternalScripts />
        <LiveReload />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
});

App.displayName = 'App';

const AppWithProviders = React.memo(() => {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
});

AppWithProviders.displayName = 'AppWithProviders';

export default AppWithProviders;

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en" style={{ height: '100%', width: '100%' }}>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body style={{ height: '100%', width: '100%', margin: 0 }}>
        <ErrorPage
          message={
            isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
                ? error.message
                : 'Unknown Error'
          }
        />
        <Scripts />
        <ExternalScripts />
      </body>
    </html>
  );
}
