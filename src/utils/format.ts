import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export function formatUTC(utcString: string, format: string = "YYYY/MM/DD HH:mm") {
  const result =  dayjs.utc(utcString).utcOffset(8).format(format)
  return result
}