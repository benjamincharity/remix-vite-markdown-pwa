import { LiveReload, useSWEffect } from '@remix-pwa/sw';
import { MetaFunction, json } from '@remix-run/node';
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

import { siteMetadata } from '~/data/siteMetadata';

import { Header } from '~/components/Header';
import { ModernButton } from '~/components/ModernButton';
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

// NOTE: Uncomment for faster dev builds
// import styles from './styles/shared.css';
// NOTE: This is a great place to add any preload/prefetch links.
// export const links: LinksFunction = () => {
//   return [{ rel: 'stylesheet', href: styles }];
// };

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
        <style dangerouslySetInnerHTML={{ __html: css }} />
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
    <html lang="en" className={'min-h-full min-w-full'}>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className="text-center">
          <h2 className={'mb-10 text-5xl text-white'}>error</h2>
          <p className={'quote mb-10 text-xl'}>
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
                ? error.message
                : 'Unknown Error'}
          </p>

          <div>
            <ModernButton
              onClick={() => {
                window.location.href = siteMetadata.url;
              }}
            >
              Reload
            </ModernButton>
          </div>
        </main>
        <Scripts />
        <ExternalScripts />
      </body>
    </html>
  );
}
