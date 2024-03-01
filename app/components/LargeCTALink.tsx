import { Link, LinkProps } from '@remix-run/react';

const commonClasses =
  'flex items-center font-sans justify-center whitespace-nowrap gap-1 rounded ring-gray-200 ring-offset-2 px-5 py-2.5 transition focus-visible:ring-2';

interface LargeCTALinkProps extends LinkProps {
  external?: boolean;
  inverted?: boolean;
}

export function LargeCTALink(props: LargeCTALinkProps) {
  const { children, className = '', external, inverted, ...linkProps } = props;

  const linkClasses = inverted
    ? `${commonClasses} bg-white text-black hover:bg-purple-200`
    : `${commonClasses} border-transparent bg-slate-800 text-white hover:bg-black`;

  return (
    <Link
      className={`${linkClasses} ${className} shadow-lg`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
