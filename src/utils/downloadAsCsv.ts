import { saveAs } from 'file-saver';

export const downloadAsCsv = (data: string, filename = 'tabel') => {
  const fileName = `${filename}.csv`;
  const blob = new Blob([data], { type: 'text/csv' });

  saveAs(blob, fileName);
};
