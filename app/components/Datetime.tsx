import { formatDate } from '~/utils/date';

export const Datetime = ({ date }: { date: string }) => {
  if (!date) {
    return null;
  }
  const { short, full } = formatDate(date);

  return (
    <time title={full} dateTime={date}>
      {short}
    </time>
  );
};
