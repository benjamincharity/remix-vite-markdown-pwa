import React from 'react';

export function Footer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <footer {...props}>
      <p className="text-center text-sm text-slate-500">
        Copyright © {new Date().getFullYear()}{' '}
        <a
          href="https://www.benjamincharity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:underline"
        >
          Benjamin Charity
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
