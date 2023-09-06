import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ResponsivePickers({
  handleDate,
  value,
}: {
  handleDate: (date: any) => void;
  value?: any;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
        <label htmlFor="date" className="sr-only">
          Date
        </label>
        <DatePicker
          className="border ring-1 ring-gray-300 w-full lg:w-[7em] rounded-md focus:ring-0 focus:outline-none p-1 bg-gray-50 text-sm"
          onChange={handleDate}
          defaultValue={dayjs(value)}
          views={["year", "month", "day"]}
          slotProps={{ textField: { size: 'small' } }}
        />
      </div>
    </LocalizationProvider>
  );
}
