import { Link, useMatch } from '@remix-run/react';
import React from 'react';

import { TemplateLogo } from '~/components/TemplateLogo';
import { Theme, useTheme } from '~/utils/theme.provider';

interface MenuItemShape {
  badge?: boolean;
  path: string;
  title: string;
}

const menuItems: MenuItemShape[] = [
  {
    path: '/blog',
    title: 'Blog',
  },
];

export function Navbar({ children }: { children?: React.ReactNode }) {
  const [theme] = useTheme();
  const linkClasses =
    'flex items-center px-3 py-2 font-bold whitespace-nowrap text-blue-700 dark:text-blue-200 transition hover:text-blue-900 dark:hover:text-blue-100';
  const isHomePage = useMatch({ path: '/' });

  return (
    <header className="mx-auto my-5 flex max-w-screen-xl flex-row items-center justify-between px-5">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <div className={'flex items-center'}>
          <Link
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                return;
              }
            }}
            to="/"
            className={`max-h-[100px] max-w-[100px] text-lg ${isHomePage ? 'pointer-events-none' : ''}`}
          >
            <TemplateLogo
              color={theme === Theme.DARK ? '#F5C742' : '#000000'}
            />
          </Link>

          <div className="ml-4 block animate-gradient bg-gradient-to-r from-yellow-500 via-teal-500 to-purple-500 bg-clip-text font-black text-transparent">
            remix-vite-markdown-pwa
          </div>
        </div>

        <nav className={'flex'}>
          <ul className="gap-x flex flex-row items-center justify-around">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link to={item.path} className={linkClasses}>
                  <span> {item.title}</span>
                  {item.badge && (
                    <span className="-mt-4 ml-1 animate-pulse rounded-lg bg-indigo-600 px-2 text-[10px] font-semibold uppercase leading-[1.8em] text-white">
                      !
                    </span>
                  )}
                </Link>
              </li>
            ))}
            {!!children && <li className={'px-3'}>{children}</li>}
          </ul>
        </nav>
      </div>
    </header>
  );
}
