import { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrNext, GrPrevious } from "react-icons/gr";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const currentDate = new Date();

const Calendar = () => {
  const [currentYearState, setCurrentYear] = useState(
    currentDate.getFullYear()
  );
  const [currentMonthState, setCurrentMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [currentDayState, setCurrentDay] = useState(currentDate.getDate());
  const [switchMonth, setSwitchMonth] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState(null);

  function getMonthDays(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const daysArray = [];

    // Fill the daysArray with empty slots for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push({ date: "", isToday: false, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const date = new Date(dateString);
      const isToday = isSameDay(date, currentDate);
      const isCurrentMonth = month === currentMonthState;
      daysArray.push({ date: dateString, isToday, isCurrentMonth });
    }

    return daysArray;
  }

  function isSameDay(
    date1: {
      toDateString: () => string;
    },
    date2: {
      toDateString: () => string;
    }
  ) {
    return date1.toDateString() === date2.toDateString();
  }

  function getMonthName(month: number) {
    const date = new Date(currentYearState, month - 1, 1);
    return date.toLocaleString("default", { month: "long" });
  }

  const currentMonthDays = getMonthDays(currentYearState, currentMonthState);
  const monthName = getMonthName(currentMonthState);

  const isDateSelected = (date: string) => date === selectedDateString;

  const previousMonth = () => {
    setSwitchMonth(true);
    if (currentMonthState === 1) {
      setCurrentYear(currentYearState - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonthState - 1);
    }
  };

  const nextMonth = () => {
    setSwitchMonth(true);
    if (currentMonthState === 12) {
      setCurrentYear(currentYearState + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonthState + 1);
    }
  };

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const getSelectedMonthName = getMonthName(selectedMonth);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    setSelectedDay(parseInt(day));
    setSelectedMonth(parseInt(month));
    setSelectedYear(year);
    return `${year}/${month}/${day}`;
  };

  const selectDate = (date: any) => {
    formatDate(date);
    setSelectedDateString(date);
  };

  const navigateToToday = () => {
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth() + 1);
    setCurrentDay(currentDate.getDate());
    setSwitchMonth(false);
    selectDate(null);
  };

  return (
    <div>
      <div className="mx-auto max-w-xs shadow-md p-3 rounded">
        <div className="text-center w-full">
          <div className="bg-white">
            <div className="flex items-center text-gray-900 pb-3">
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={previousMonth}
              >
                <span className="sr-only">Previous month</span>
                <GrPrevious />
              </button>
              <div className="flex-auto font-semibold">
                {switchMonth
                  ? `${monthName} ${currentYearState}`
                  : `${monthName} ${currentYearState}`}
              </div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={nextMonth}
              >
                <span className="sr-only">Next month</span>
                <GrNext />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="p-2 font-medium bg-white border rounded-md">
                {selectedDateString
                  ? `${getSelectedMonthName.slice(
                      0,
                      3
                    )} ${selectedDay}, ${selectedYear}`
                  : `${monthName.slice(
                    0,
                    3
                  )} ${currentDayState}, ${currentYearState}`}
              </div>
              <Button
                className="p-1 font-medium bg-white border hover:bg-gray-400 rounded-md"
                onClick={navigateToToday}
              >
                Today
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 bg-white">
              {daysOfWeek.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-white text-sm">
              {currentMonthDays.map((day, dayIdx) => (
                <button
                  key={dayIdx}
                  type="button"
                  className={[
                    "py-1.5 hover:bg-gray-100 hover:rounded-full focus:z-10 hover:text-black",
                    day.isToday && "font-semibold",
                    dayIdx === 0 && "rounded",
                    dayIdx === 6 && "rounded",
                    dayIdx === currentMonthDays.length - 7 && "rounded",
                    dayIdx === currentMonthDays.length - 1 && "rounded",
                    isDateSelected(day.date)
                      ? "bg-[#3F5BF6] rounded-full text-white hover:text-gray-400"
                      : "",
                  ].join(" ")}
                  onClick={() => selectDate(day.date)}
                >
                  <time
                    dateTime={day.date}
                    className={[
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                      day.isToday && "bg-gray-300 rounded-full",
                    ].join(" ")}
                  >
                    {day.date?.split("-").pop()?.replace(/^0/, "") || ""}
                  </time>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
