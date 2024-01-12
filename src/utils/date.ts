import dayjs from 'dayjs';

const dateFormats = 'YYYY-MM-DD HH:mm:ss';

export function formatDate(date: Date) {
  return dayjs(date).format(dateFormats);
}
