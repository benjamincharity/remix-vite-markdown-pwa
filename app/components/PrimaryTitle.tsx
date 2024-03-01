export const PrimaryTitle = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={`my-1 font-sourceSerif4 text-3xl font-bold leading-tight text-gray-700 dark:text-gray-300 ${className}`}
    >
      {title}
    </h1>
  );
};
