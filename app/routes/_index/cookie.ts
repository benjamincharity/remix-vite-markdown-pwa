import { createCookie } from '@remix-run/node';

export const cookieName = 'bc-state';
export const stateCookie = createCookie(cookieName, {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
});
