import { format } from 'date-fns';

export const getDateString = (date?: Date) =>
  date ? format(date, 'yyyy-MM-dd') : undefined;
