import { Link, LinkProps } from '@remix-run/react';

import { RoutePaths } from '~/data/routes.data';

const classes =
  'link-underline inline-block text-base text-purple-700: dark:text-purple-300 font-bold font-sourceSerif4';
const spanClasses =
  'inline-block absolute -left-4 origin-right transition arrow -top-[1px]';

export const BackToLink = (props: Partial<LinkProps>) => {
  const { children = 'Back to all posts', className = '', ...rest } = props;

  return (
    <div className={`text-center ${className} last-of-type:mb-4`}>
      <Link className={`${classes}`} to={RoutePaths.blog} {...rest}>
        <span className={spanClasses}>&#8668;</span> {children}
      </Link>
    </div>
  );
};
