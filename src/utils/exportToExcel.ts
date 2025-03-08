/* eslint-disable */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { formatUTC } from './format';
interface CellRange {
  s: { r: number; c: number };
  e: { r: number; c: number };
}

interface Workbook {
  SheetNames: string[];
  Sheets: { [sheetName: string]: XLSX.WorkSheet };
}

interface ExportJsonToExcelOptions<T = any> {
  multiHeader?: T[][];
  header: T[];
  data: T[][];
  filename?: string;
  merges?: string[];
  autoWidth?: boolean;
  bookType?: XLSX.BookType;
}

function generateArray(table: HTMLTableElement): [any[][], CellRange[]] {
  const out: any[][] = [];
  const ranges: CellRange[] = [];
  const rows = table.querySelectorAll('tr');

  for (let R = 0; R < rows.length; ++R) {
    const outRow: any[] = [];
    const row = rows[R];
    const columns = row.querySelectorAll('td');

    for (let C = 0; C < columns.length; ++C) {
      const cell = columns[C];
      const colspan = cell.getAttribute('colspan');
      const rowspan = cell.getAttribute('rowspan');
      let cellValue: string | number | null = cell.innerText;

      if (cellValue !== "" && !isNaN(Number(cellValue))) {
        cellValue = Number(cellValue);
      }

      // Skip ranges
      ranges.forEach(range => {
        if (
          R >= range.s.r &&
          R <= range.e.r &&
          outRow.length >= range.s.c &&
          outRow.length <= range.e.c
        ) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      // Handle Row Span
      if (rowspan || colspan) {
        const rowspanNum = rowspan ? parseInt(rowspan, 10) : 1;
        const colspanNum = colspan ? parseInt(colspan, 10) : 1;
        ranges.push({
          s: { r: R, c: outRow.length },
          e: { r: R + rowspanNum - 1, c: outRow.length + colspanNum - 1 }
        });
      }

      // Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      // Handle Colspan
      if (colspan) {
        for (let k = 0; k < parseInt(colspan, 10) - 1; ++k) outRow.push(null);
      }
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function datenum(v: Date | string, date1904?: boolean): number {
  if (date1904) (v as Date).setDate((v as Date).getDate() + 1462);
  const epoch = Date.parse(v as string);
  return (epoch - new Date(Date.UTC(1899, 11, 30)).getTime()) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data: any[][], opts?: any): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

  for (let R = 0; R < data.length; ++R) {
    for (let C = 0; C < data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;

      const cell: XLSX.CellObject = {
        v: data[R][C],
        t: 'b'
      };
      if (cell.v == null) continue;

      const cellRef = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') {
        cell.t = 'n';
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF.get_table()[14];
        cell.v = datenum(cell.v);
      } else {
        cell.t = 's';
      }

      ws[cellRef] = cell;
    }
  }

  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function s2ab(s: string): ArrayBuffer {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function formatData(data: any, dataHeader: string[]) {
  const arrayData = data.map((item: any) => dataHeader.map((subItem) => {
    if(subItem === 'createAt' || subItem === 'updateAt') {
      return formatUTC(item[subItem])
    } else {
      return item[subItem]
    }
  }))
  return arrayData
}

export function export_table_to_excel(id: string): void {
  const theTable = document.getElementById(id) as HTMLTableElement;
  const [data, ranges] = generateArray(theTable);
  const wsName = "SheetJS";

  const wb: Workbook = {
    SheetNames: [wsName],
    Sheets: {
      [wsName]: sheet_from_array_of_arrays(data),
    }
  };

  wb.Sheets[wsName]['!merges'] = ranges;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  });

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "test.xlsx"
  );
}

export function export_json_to_excel<T = any>({
  multiHeader = [],
  header,
  data,
  filename = 'excel-list',
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
}: ExportJsonToExcelOptions<T>): void {

  const dataCopy = [...data];
  dataCopy.unshift(header);

  for (let i = multiHeader.length - 1; i >= 0; i--) {
    dataCopy.unshift(multiHeader[i]);
  }

  const wsName = "SheetJS";
  const wb: Workbook = {
    SheetNames: [wsName],
    Sheets: {
      [wsName]: sheet_from_array_of_arrays(dataCopy),
    }
  };

  const ws = wb.Sheets[wsName];
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(merge => {
      if (ws['!merges']) ws['!merges'].push(XLSX.utils.decode_range(merge));
    });
  }

  if (autoWidth) {
    const colWidth = dataCopy.map(row =>
      row.map(val => {
        if (val == null) return { wch: 10 };
        const str = String(val);
        return { wch: str.charCodeAt(0) > 255 ? str.length * 2 : str.length };
      })
    );
    const result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {

        if (j < result.length && result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch;
        }
      }
    }
    ws['!cols'] = result;
  }

  const wbout = XLSX.write(wb, {
    bookType: bookType as XLSX.BookType,
    bookSST: false,
    type: 'binary',
  });

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `${filename}.${bookType}`
  );
}