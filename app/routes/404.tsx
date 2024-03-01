import { useLoaderData, useNavigate } from '@remix-run/react';

import { ModernButton } from '~/components/ModernButton';

interface LoaderData {
  message: string;
}

interface Request {
  url: string;
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const message = searchParams.get('message');

  return { message };
}

// NOTE: This page is never rendered due to the redirect in `routes/$.tsx`
export default function FourOhFour() {
  const { message } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  function reloadApp() {
    navigate('../', { replace: true });
  }

  return (
    <main className="prose-wrapper relative z-20 text-center">
      <h2 className={'font-vt323 text-shadow-title mb-10 text-5xl text-white'}>
        error
      </h2>
      <p className={'quote mb-10 text-xl'}>{message}</p>

      <div>
        <ModernButton onClick={reloadApp}>Return Home</ModernButton>
      </div>
    </main>
  );
}
