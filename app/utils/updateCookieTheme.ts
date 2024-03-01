import { stateCookie } from '~/routes/_index/cookie';
import { Theme } from '~/utils/theme.provider';

interface UpdateCookieResponse {
  cookie: string;
  theme: Theme;
}

export async function updateCookieTheme(
  request: Request
): Promise<UpdateCookieResponse> {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await stateCookie.parse(cookieHeader)) || {};
  const formData = await request.formData();
  const formTheme = formData.get('theme');
  const isLight = formTheme === 'light';
  const theme = isLight ? Theme.DARK : Theme.LIGHT;
  cookie.theme = theme;
  const cookieSerial = await stateCookie.serialize(cookie);
  return { theme, cookie: cookieSerial };
}
