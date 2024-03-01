interface NewsletterSignUpProps extends React.HTMLProps<HTMLDivElement> {
  heading?: string;
  subheading?: string;
}
export function NewsletterSignUp({
  heading = 'Get the latest updates',
  subheading = 'Sign up to hear about new free resources.',
  ...rest
}: NewsletterSignUpProps) {
  const { className, ...divProps } = rest;
  return (
    <section
      id={'newsletter'}
      className={`max-w-screen-2xl ${className}`}
      {...divProps}
    >
      <div className="p-8">
        <div className="mx-auto max-w-xl">
          <div className={'mb-4 text-center'}>
            <h2 className="text-2xl font-semibold">{heading}</h2>
            {!!subheading && (
              <p className="text-slate-600 dark:text-slate-300">{subheading}</p>
            )}
          </div>

          <div>
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/benjamincharity"
              className="embeddable-buttondown-form mx-auto mb-2 flex max-w-md flex-col justify-center gap-2 md:flex-row"
              method="post"
              onSubmit={(event) => {
                event.preventDefault();
                window.open(
                  'https://buttondown.email/benjamincharity',
                  'popupwindow'
                );
              }}
              target="popupwindow"
            >
              <label htmlFor="bd-email" className="sr-only">
                Email
              </label>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                id="bd-email"
                name="email"
                placeholder="Your email"
                type="email"
              />
              <button
                className={`animate-gradient grid justify-center rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-4 text-center text-sm font-medium text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800`}
                type="submit"
              >
                <span className={'flex gap-2'}>
                  <svg
                    className={'w-[16px] fill-white'}
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                  </svg>
                  Subscribe
                </span>
              </button>
            </form>
            <p className="py-2 text-center text-xs text-gray-400">
              No data sharing. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
