import React from 'react';

export function Footer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <footer {...props}>
      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        Copyright © {new Date().getFullYear()}{' '}
        <a
          href="https://www.benjamincharity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:underline dark:text-blue-300"
        >
          Benjamin Charity
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
