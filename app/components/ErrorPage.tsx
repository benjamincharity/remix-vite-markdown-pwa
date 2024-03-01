import { Link } from '@remix-run/react';

import { TemplateLogo } from './TemplateLogo';

export function ErrorPage({
  message = 'Something went wrong 😰',
}: {
  message: string;
}) {
  return (
    <section className={`h-full bg-[#F5C742] text-center text-black`}>
      <header className={'align-center grid justify-center p-4'}>
        <TemplateLogo height={200} width={200} />
      </header>

      <h1 className="mb-4 font-mono text-6xl font-semibold">
        <small aria-hidden={true}>🤖</small> error{' '}
        <small aria-hidden={true}>🤖</small>
      </h1>

      <p className="mb-4 text-lg text-opacity-80">{message}</p>

      <p className="mt-4">
        Let&apos;s get you back{' '}
        <Link
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-700 px-2 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800"
          to="/"
        >
          home
        </Link>
      </p>
    </section>
  );
}
