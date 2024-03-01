import { siteMetadata } from '~/data/siteMetadata';

import { LargeCTALink } from '~/components/LargeCTALink';
import { GitHubIcon } from '~/components/icons/GitHub';
import { PurpleCTA } from '~/features/Marketing/components/PurpleCTA';

export function CTA() {
  return (
    <PurpleCTA>
      <h2 className="text-4xl tracking-tight text-white md:text-6xl">
        Build better. Build <em>faster</em>.
      </h2>

      <p className="mt-4 text-lg text-white text-opacity-70 md:text-xl">
        Accelerate your site with this RemixJS template, designed for rapid
        loading and optimal performance across all devices.
      </p>

      <div className="mt-5 flex">
        <LargeCTALink external inverted={true} to={siteMetadata.githubRepo}>
          <GitHubIcon className="h-4 w-4 text-white " />
          Get Started
        </LargeCTALink>
      </div>
    </PurpleCTA>
  );
}
