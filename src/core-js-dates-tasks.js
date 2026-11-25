/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times      *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 */
function getTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 */
function getDayName(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
}

/**
 * Returns the date of the next Friday from a given date.
 */
function getNextFriday(date) {
  const result = new Date(date);
  const dayOfWeek = result.getUTCDay();
  let daysToAdd = (5 - dayOfWeek + 7) % 7;
  if (daysToAdd === 0) {
    daysToAdd = 7;
  }
  result.setUTCDate(result.getUTCDate() + daysToAdd);
  return result;
}

/**
 * Returns the number of days in a specified month and year.
 */
function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const diffMs = end - start;
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.round(diffMs / msInDay) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 */
function isDateInPeriod(date, period) {
  const checkDate = new Date(date).getTime();
  const startDate = new Date(period.start).getTime();
  const endDate = new Date(period.end).getTime();
  return checkDate >= startDate && checkDate <= endDate;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 */
function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  });
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  let weekendsCount = 0;
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayOfWeek = new Date(year, month - 1, day).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendsCount += 1;
    }
  }
  return weekendsCount;
}

/**
 * Returns the week number of the year for a given date.
 */
function getWeekNumberByDate(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 */
function getNextFridayThe13th(date) {
  const result = new Date(date);
  for (;;) {
    result.setDate(result.getDate() + 1);
    if (result.getDate() === 13 && result.getDay() === 5) {
      return result;
    }
  }
}

/**
 * Returns the quarter of the year for a given date.
 */
function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const parseDate = (str) => {
    const [day, month, year] = str.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };

  const formatDateToStr = (d) => {
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  const start = parseDate(period.start);
  const end = parseDate(period.end);
  const schedule = [];
  const current = new Date(start);
  let cycleDay = 0;
  const cycleLength = countWorkDays + countOffDays;

  while (current <= end) {
    if (cycleDay < countWorkDays) {
      schedule.push(formatDateToStr(current));
    }
    cycleDay = (cycleDay + 1) % cycleLength;
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
