import { useReducedMotion } from '@mantine/hooks';
import {
  Form,
  useLocation,
  useNavigate,
  useNavigation,
} from '@remix-run/react';
import React, { useState } from 'react';

import { isValidEmailAddress } from '~/utils/isValidEmailAddress';

interface NewsletterSignUpProps extends React.HTMLProps<HTMLDivElement> {
  heading?: string;
  subheading?: string;
}
export function NewsletterSignUp({
  heading = 'Get the latest updates',
  subheading = 'Sign up to hear about new resources & articles.',
  ...rest
}: NewsletterSignUpProps) {
  const { className, ...divProps } = rest;
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const subscribeError = search.get('subscribe-error');
  const subscribeSuccess = search.get('subscribe-success');
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState<string>('');

  function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    const emailIsValid = isValidEmailAddress(email);
    setEmailError(emailIsValid ? '' : 'Invalid email address');
  }

  function removeSearchParam() {
    const search = new URLSearchParams(location.search);
    search.delete('subscribe-error');
    navigate({ search: search.toString() });
  }

  return (
    <section
      className={`max-w-screen-2xl ${className}`}
      id={'newsletter'}
      {...divProps}
    >
      <div className="p-8">
        {!!subscribeSuccess && (
          <div className="mx-auto max-w-xl">
            <h1
              className={
                'mb-10 text-center font-sourceSerif4 text-2xl text-slate-800 dark:text-white'
              }
            >
              <strong className={'block font-bold italic'}>Boom</strong>
              You&apos;re in the club! 🎉
            </h1>

            <svg
              className={`mx-auto my-4 size-12 lg:size-16 ${reduceMotion ? 'animate-none' : 'animate-bounce'} text-green-500 opacity-50`}
              viewBox="0 0 24 24"
            >
              <path
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                fill="currentColor"
              />
            </svg>

            <p className={'text-center'}>
              Expect a warm welcome in your inbox soon!
            </p>
          </div>
        )}

        {!!subscribeError && (
          <div className="mx-auto max-w-xl text-center">
            <h1
              className={
                'mb-10 text-center font-sourceSerif4 text-2xl text-slate-800 dark:text-white'
              }
            >
              Something went wrong! 😢
            </h1>

            <p className={'text-md mb-2'}>
              {subscribeError[0].toUpperCase() +
                subscribeError.slice(1).toLowerCase()}
            </p>
            <p className={'text-sm font-semibold'}>
              <button
                className={'animated-link-underline'}
                onClick={() => removeSearchParam()}
              >
                [Click to refresh the form]
              </button>
            </p>
          </div>
        )}

        {!subscribeSuccess && !subscribeError && (
          <div className="mx-auto max-w-xl">
            <div className={'mb-4 text-center'}>
              <h2 className="text-2xl font-semibold">{heading}</h2>
              {!!subheading && (
                <p className="text-slate-600 dark:text-slate-300">
                  {subheading}
                </p>
              )}
            </div>

            <div>
              <Form
                action="/subscribe"
                className={`embeddable-buttondown-form`}
                method="post"
              >
                <fieldset disabled={navigation.state === 'submitting'}>
                  <div
                    className={`mx-auto mb-2 flex max-w-md flex-col justify-center gap-2 md:flex-row`}
                  >
                    <label htmlFor="bd-email" className="sr-only">
                      Email
                    </label>
                    <div className={'relative'}>
                      <input
                        aria-describedby="bd-email-helper"
                        className={`block h-full w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-300' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
                        id="bd-email"
                        name="email"
                        onChange={validateEmail}
                        placeholder="Your email"
                        required
                        type="email"
                      />

                      {!!emailError && (
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                          <svg
                            className="size-4 flex-shrink-0 text-red-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <button
                      className={`grid animate-gradient justify-center rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-4 text-center text-sm font-medium text-white focus:ring-4 focus:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-purple-800`}
                      disabled={
                        navigation.state === 'submitting' || !!emailError
                      }
                      type="submit"
                    >
                      <span className={'flex gap-2'}>
                        <svg
                          className={`w-[16px] fill-white ${navigation.state === 'submitting' ? 'animate-wobble' : ''}`}
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                        </svg>
                        {navigation.state === 'submitting'
                          ? 'Subscribing...'
                          : 'Subscribe'}
                      </span>
                    </button>
                  </div>
                  {!!emailError && (
                    <div
                      className={`mx-auto mb-2 flex max-w-md flex-col justify-center gap-2 md:flex-row`}
                    >
                      <p
                        className="mt-2 text-sm text-red-600 dark:text-red-300"
                        id="bd-email-helper"
                      >
                        {emailError}
                      </p>
                    </div>
                  )}
                </fieldset>
              </Form>
              <p className="py-2 text-center text-xs text-slate-500 dark:text-slate-300">
                No data sharing. Unsubscribe at any time.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
