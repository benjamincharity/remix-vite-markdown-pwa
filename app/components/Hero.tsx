import { LargeCTALink } from '~/components/LargeCTALink';
import { DownloadIcon } from '~/components/icons/Download';
import { GitHubIcon } from '~/components/icons/GitHub';
import { useTheme } from '~/utils/theme.provider';

export function Hero() {
  const [theme] = useTheme();

  return (
    <main className="grid place-items-center pb-8 pt-16 md:grid-cols-2 md:pb-24 md:pt-12">
      <div className="hidden py-6 md:order-1 md:block">
        <video
          autoPlay
          className={'aspect-video max-w-[300px]'}
          loop
          muted
          playsInline
        >
          <source src="images/layout.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={'max-w-full'}>
        <h1 className="text-5xl font-bold lg:text-6xl lg:tracking-tight xl:text-7xl xl:tracking-tighter">
          Unlock the Full Potential of Your Website with Our Remix Template
        </h1>

        <p className="mt-4 max-w-xl text-lg">
          Streamline your next website or blog with dynamic posts, advanced
          markdown, and performance excellence.
          <wbr />
          Built with RemixJS, Vite and TailwindCSS. You can quickly create any
          website with this starter.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <LargeCTALink
            external
            inverted={theme === 'dark'}
            to="https://github.com/benjamincharity/remix-vite-markdown-pwa/archive/refs/heads/main.zip"
          >
            <DownloadIcon className="mr-2 h-5 w-5 fill-white text-white dark:fill-black dark:text-black" />
            Download Now for Free
          </LargeCTALink>

          <LargeCTALink
            external
            inverted={theme !== 'dark'}
            to="https://github.com/benjamincharity/remix-vite-markdown-pwa"
          >
            <GitHubIcon className="h-4 w-4 text-black dark:fill-white dark:text-white" />
            GitHub Repo
          </LargeCTALink>
        </div>
      </div>
    </main>
  );
}
