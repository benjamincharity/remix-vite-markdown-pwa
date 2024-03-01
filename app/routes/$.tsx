import { redirect } from '@remix-run/node';

import { RoutePaths } from '~/data/routes.data';

// NOTE: This is a catch-all route that redirects to the home page.
// This is useful for handling 404s.
export function loader() {
  return redirect(RoutePaths.home);
}
