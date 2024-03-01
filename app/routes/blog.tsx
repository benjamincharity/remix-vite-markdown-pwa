import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

interface LoaderData {}

export async function loader() {
  return json<LoaderData>(
    {},
    {
      headers: { 'Cache-Control': 'private, max-age=10' },
    }
  );
}

export default function BlogLayout() {
  return (
    <div className={'blog relative'}>
      <Outlet />
    </div>
  );
}
