import { LargeCTALink } from '~/components/LargeCTALink';
import { GitHubIcon } from '~/components/icons/GitHub';
import { useTheme } from '~/utils/theme.provider';

export function CTA() {
  const [theme] = useTheme();

  return (
    <div className="mx-auto mt-20 flex max-w-5xl flex-col items-center rounded-lg border-[1px] border-black bg-black bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 p-8 text-center dark:bg-opacity-50 md:px-20 md:py-20">
      <h2 className="text-4xl tracking-tight text-white md:text-6xl">
        Build better. Build faster.
      </h2>

      <p className="mt-4 text-lg text-white text-opacity-70 md:text-xl">
        Accelerate your site with this RemixJS template, designed for rapid
        loading and optimal performance across all devices.
      </p>

      <div className="mt-5 flex">
        <LargeCTALink
          external
          inverted={true}
          to="https://github.com/benjamincharity/remix-vite-markdown-pwa"
        >
          <GitHubIcon className="h-4 w-4 text-white " />
          Get Started
        </LargeCTALink>
      </div>
    </div>
  );
}