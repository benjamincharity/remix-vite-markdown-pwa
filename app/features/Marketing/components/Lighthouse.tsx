import { PurpleCTA } from '~/features/Marketing/components/PurpleCTA';

const scores = [
  { name: 'Performance', score: 98 },
  { name: 'Accessibility', score: 100 },
  { name: 'Best Practices', score: 100 },
  { name: 'SEO', score: 100 },
];

export function Lighthouse() {
  return (
    <PurpleCTA>
      <h2 className="text-3xl font-semibold lg:text-5xl">
        ⚡ Lightning Speed ⚡
      </h2>
      <div className="relative grid grid-cols-2 items-center gap-8 md:grid-cols-4">
        {scores.map(({ name, score }) => {
          return (
            <div className="">
              <h3 className="mb-2 whitespace-nowrap font-mono text-sm font-semibold uppercase text-opacity-70 md:text-base">
                {name}
              </h3>
              <div className="relative">
                <svg
                  className="size-full"
                  height="36"
                  viewBox="0 0 36 36"
                  width="36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="stroke-current text-white text-opacity-80"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="16"
                    strokeWidth="2"
                  />
                  <g className="origin-center -rotate-90 transform">
                    <circle
                      className="stroke-current text-green-600 dark:text-green-500"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      strokeDasharray={score === 100 ? '0' : '100'}
                      strokeDashoffset={100 - score}
                      strokeWidth="2"
                    />
                  </g>
                </svg>
                <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <span className="text-center font-mono text-2xl font-bold text-opacity-70">
                    {score}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PurpleCTA>
  );
}
