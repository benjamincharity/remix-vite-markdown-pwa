import { json, redirect } from '@remix-run/node';
import { ActionFunctionArgs } from '@vercel/remix';

import { Theme, isTheme } from '~/utils/theme.provider';
import { getThemeSession } from '~/utils/theme.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme') as Theme;

  if (!theme || !isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } }
  );
};

export const loader = async () => redirect('/', { status: 404 });
