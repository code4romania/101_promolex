import { format } from 'date-fns';

export const getDateString = (date: Date) => format(date, 'yyyy-MM-dd');
