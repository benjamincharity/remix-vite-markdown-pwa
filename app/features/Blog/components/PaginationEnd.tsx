export function PaginationEnd(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <p className={'mb-2 text-sm italic text-gray-700 dark:text-gray-200'}>
        You&apos;ve reached the end!
      </p>
      <img
        alt="A person asleep on a couch, illuminated by the glow of a single open laptop in a dimly lit room, conveying a serene late-night session."
        className={
          'mx-auto w-80 max-w-full animate-gentleRotate rounded-full shadow-md'
        }
        src={'/images/pagination-end.webp'}
      />
    </div>
  );
}
