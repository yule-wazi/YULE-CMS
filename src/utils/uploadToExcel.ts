import * as XLSX from 'xlsx'

export function readerData(rawFile: any) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(rawFile)
    reader.onload = (event) => {
      const data = event.target!.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const results = XLSX.utils.sheet_to_json(worksheet)
      resolve(formatData(results))
    }
  })
}
function formatData(data: any[]) {
  return data.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __rowNum__, ...res } = item
    if (res.menuList) {
      res.menuList = res.menuList.split(/[,，]\s*/).map(Number)
    }
    if (res.password) {
      res.password = res.password.toString()
    }
    return res
  })
}
