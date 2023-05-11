import { format } from 'date-fns';

export const formatDate = (date: string) =>
  !date ? '-' : format(new Date(date), 'dd.MM.yyyy');
