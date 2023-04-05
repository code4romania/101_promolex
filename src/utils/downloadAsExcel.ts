import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { maxBy, zip } from 'lodash';

const MAX_COLUMN_WIDTH = 255;
const MAX_CHARACTERS_PER_CELL = 300;
const DEFAULT_COLUMN_HEIGHT = 15;

export const downloadAsExcel = async (
  headers: string[],
  data: string[][],
  filename = 'tabel',
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const maxColumnWidths = zip(...data).map(
    (row) => (maxBy(row, 'length') ?? []).length,
  );

  worksheet.columns = headers.map((header, index) => ({
    header,
    key: header,
    width: Math.max(
      header.length,
      Math.min(maxColumnWidths[index] ?? 0, MAX_COLUMN_WIDTH),
    ),
  }));

  worksheet.getRow(1).font = { bold: true };

  worksheet.addRows(data);

  worksheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell({ includeEmpty: false }, (cell) => {
      if (
        cell.value &&
        cell.value.toString().length > MAX_CHARACTERS_PER_CELL
      ) {
        // eslint-disable-next-line no-param-reassign
        cell.alignment = { vertical: 'top', wrapText: true, shrinkToFit: true };
        // eslint-disable-next-line no-param-reassign
        row.height =
          Math.ceil(cell.value.toString().length / MAX_CHARACTERS_PER_CELL) *
          DEFAULT_COLUMN_HEIGHT;
      }
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const fileName = `${filename}.xlsx`;
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, fileName);
};
