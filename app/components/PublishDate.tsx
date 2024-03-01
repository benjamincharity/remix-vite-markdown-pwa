import { Datetime } from '~/components/Datetime';

interface PublishDateProps {
  publishDate: string;
  updatedDate?: string;
  className?: string;
}

export const PublishDate = (props: PublishDateProps) => {
  const { publishDate, updatedDate, className = '' } = props;

  return (
    !!publishDate && (
      <div
        className={
          'align-center flex gap-x-2 leading-tight text-gray-600 dark:text-gray-400'
        }
      >
        {!!updatedDate && (
          <div className={`font-code text-[10px] italic ${className}`}>
            Updated: <Datetime date={updatedDate} />,
          </div>
        )}

        <div className={`font-code text-[10px] italic ${className}`}>
          Published: <Datetime date={publishDate} />
        </div>
      </div>
    )
  );
};
