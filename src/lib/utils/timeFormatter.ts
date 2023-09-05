import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

// Set the West Africa timezone (UTC+1)
dayjs.tz.setDefault("Africa/Lagos");

// Use UTC mode with the UTC+1 offset
dayjs.utc().utcOffset(60);

export function formatTimeRange(start_time: string, stop_time: string) {
  const startTime = new Date(start_time);
  const stopTime = new Date(stop_time);

  // Subtract one hour from the times
  startTime.setHours(startTime.getHours() - 1);
  stopTime.setHours(stopTime.getHours() - 1);

  // Set the timezone to Africa/Lagos for Nigeria
  const timeZone = "Africa/Lagos";

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone, // Set the timezone to Africa/Lagos
  };

  const formattedStartTime = startTime.toLocaleTimeString("en-US", options);
  const formattedStopTime = stopTime.toLocaleTimeString("en-US", options);

  return `${formattedStartTime} - ${formattedStopTime}`;
}


export function convertToAMPM(time: string) {
  //Example - 02:30 PM
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour, 10);
  let meridian = "AM";

  if (formattedHour === 0) {
    formattedHour = 12;
  } else if (formattedHour >= 12) {
    formattedHour -= 12;
    meridian = "PM";
  }

  return `${formattedHour}:${minute} ${meridian}`;
}

// time formatter
export function getTimeFromNow(dateTimeString: string) {
  const dateObj = dayjs(dateTimeString);
  const newDateObj = dateObj.add(1, "hour");
  const timeFromNow = newDateObj.fromNow();
  return timeFromNow;
}

export function formatDateRelativeToToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  // Calculate the difference in days
  const timeDiff = date.getTime() - today.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);
  if (daysDiff === 0) {
    return "today";
  } else if (daysDiff === 1) {
    return "tomorrow";
  } else if (daysDiff === -1) {
    return "yesterday";
  } else if (daysDiff >= 2) {
    const dayOfMonth = date.getDate();
    const dayOfMonthString = dayOfMonth + getDaySuffix(dayOfMonth);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${dayOfMonthString}, ${year}`;
  } else if (daysDiff < -1) {
    return `${Math.abs(daysDiff)} days ago`;
  }

  if (daysDiff < 0) {
    return "in the future";
  }
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
