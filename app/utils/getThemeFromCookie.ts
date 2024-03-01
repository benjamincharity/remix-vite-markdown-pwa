import { Theme } from '~/root';
import { stateCookie } from '~/routes/_index/cookie';

export async function getThemeFromCookie(request: Request): Promise<Theme> {
  const cookieHeader = request.headers.get('Cookie');
  const cookieState = (await stateCookie.parse(cookieHeader)) || {
    theme: 'dark',
  };
  return cookieState.theme;
}
