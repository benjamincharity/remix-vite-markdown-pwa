import { redirect } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/server-runtime';
import { ActionFunction, json } from '@vercel/remix';

import { isValidEmailAddress } from '~/utils/isValidEmailAddress';

export interface ActionResponse {
  ok?: boolean;
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const referrerOriginal = request.headers.get('Referer') ?? '';
  // NOTE: this is to strip out any existing search params
  const referrer = new URL(referrerOriginal);
  const emailIsValid = isValidEmailAddress(email);

  if (!emailIsValid) {
    return redirect(`${referrer}?subscribe-error=invalid-email`);
  }

  try {
    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env.BUTTONDOWN_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          referrer,
        }),
      }
    );
    const responseJson = await response.json();

    if (responseJson.code === 'email_already_exists') {
      return redirect(`${referrer}?subscribe-error=email-already-subscribed`);
    }

    if (response.status === 401 || response.status === 403) {
      return redirect(`${referrer}?subscribe-error=unauthorized`);
    }
    if (response.status === 302) {
      return redirect(`${referrer}?subscribe-error=already-subscribed`);
    }
    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      return redirect(`${referrer}?subscribe-error=unknown-error`);
    }
    return redirect(`${referrer}?subscribe-success=true`);
  } catch (error) {
    return json({ error });
  }
};

export const loader: LoaderFunction = async () => {
  return new Response(
    'This route is for newsletter subscriptions. Please use the form to subscribe.',
    {
      status: 200,
    }
  );
};
