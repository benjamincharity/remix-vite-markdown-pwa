import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { RoutePaths } from '~/data/routes.data';

export const Header = ({ children }: { children?: ReactNode }) => {
  return (
    <header>
      <h1 className={`inline-block uppercase leading-[.9em]`}>
        <Link
          className="o-sliding-background-link font-bold"
          to={RoutePaths.home}
        >
          Benjamin
          <br />
          Charity
        </Link>
      </h1>
      {children}
    </header>
  );
};
