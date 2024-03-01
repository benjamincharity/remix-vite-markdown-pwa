import React from 'react';

export function Footer(
  props: React.HTMLProps<HTMLDivElement> & { className?: string }
) {
  const { className, ...footerProps } = props;

  return (
    <footer
      className={`text-center text-sm text-slate-600 dark:text-slate-300 ${className}`}
      {...footerProps}
    >
      <div
        className={
          'mx-auto flex flex-col justify-center gap-0 text-center align-middle md:flex-row md:justify-center md:gap-2'
        }
      >
        <div>Copyright © {new Date().getFullYear()} </div>
        <div>
          <a
            href="https://www.benjamincharity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:underline dark:text-blue-300"
          >
            Benjamin Charity
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
