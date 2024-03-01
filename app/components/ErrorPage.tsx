import { TemplateLogo } from './TemplateLogo';

export function ErrorPage({
  message = 'Something went wrong 😰',
}: {
  message: string;
}) {
  function reloadApp() {
    window.location.href = '/';
  }

  return (
    <>
      <style>{`
.error-wrap {
  background-color: #F5C742;
  color: black;
  font-family: sans-serif;
  height: 100%;
  text-align: center;
}
.error-wrap header {
  align-items: center;
  display: grid;
  justify-content: center;
  padding: 1rem;
}
.error-wrap h1 {
  font-family: monospace;
  font-size: 3.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.error-wrap p {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
.error-wrap a {
  color: black;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}
.error-wrap a:hover {
  text-underline-offset: 0.3rem;
}
.error-wrap a:focus {
  box-shadow: 0 0 0 4px #facc15;
  outline: none;
}
      `}</style>

      <section className={`error-wrap`}>
        <header>
          <TemplateLogo
            style={{ cursor: 'pointer' }}
            height={200}
            width={200}
            onClick={reloadApp}
          />
        </header>

        <h1>
          <small aria-hidden={true}>🤖</small> error{' '}
          <small aria-hidden={true}>🤖</small>
        </h1>

        <p>{message}</p>

        <p>
          Let&apos;s get you back <a href="/">home</a>
        </p>
      </section>
    </>
  );
}
