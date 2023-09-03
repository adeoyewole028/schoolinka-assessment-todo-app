import { useState, useEffect } from "react";

const DAYS_OF_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

function isSameDay(date1: any, date2: any) {
  return date1.toDateString() === date2.toDateString();
}

function getMonthName(monthNumber: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
}

type DayOfWeek = {
  dayOfMonth: number;
  dayName: string;
  isToday: boolean;
  isCurrentMonth: boolean;
};

export default function SingleCalendar() {
  const [monthYear, setMonthYear] = useState<string>("");
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<DayOfWeek[]>([]);

  function getWeekDays() {
    const daysArray = [];
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      const dayOfMonth = date.getDate();
      const isToday = isSameDay(date, new Date());
      const isCurrentMonth = date.getMonth() + 1 === currentMonth;
      const dayName = DAYS_OF_WEEK[date.getDay()];
      daysArray.push({ dayOfMonth, dayName, isToday, isCurrentMonth });
    }
    setDaysOfTheWeek(daysArray);
  }

  function formattedMonthAndYear() {
    const monthYear = `${getMonthName(currentMonth)} ${currentYear}`;
    setMonthYear(monthYear);
  }

  useEffect(() => {
    formattedMonthAndYear();
    getWeekDays();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">{monthYear}</p>
      <div className="overflow-x-auto">
        <div className="top-0 z-10 grid grid-cols-11 bg-white text-sm w-full gap-12 sm:gap-3 my-3 px-1">
          {daysOfTheWeek.map((day) => (
            <button
              key={day.dayOfMonth}
              type="button"
              className={
                day.isToday
                  ? "flex shadow ring-1 ring-black ring-opacity-5 flex-col items-center px-5 py-1.5  bg-[#3F5BF6] text-white rounded-md"
                  : "flex shadow ring-1 ring-black ring-opacity-5 flex-col items-center px-5 py-1.5 rounded-md"
              }
            >
              <span className="font-semibold">{day.dayName}</span>
              <span className="font-semibold">{day.dayOfMonth}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
