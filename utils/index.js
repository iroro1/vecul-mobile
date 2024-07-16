/**
 * Splits the input value by dots and joins the parts using '?.'
 *
 * @param {string} val - The input value to be processed
 * @return {string} The processed value with dots replaced by '?.'
 */
export const valOrNullFn = (val) => {
  return val.split(".").join("?.");
};

/**
 * Generates an array of years from startYear up to the current year.
 *
 * @param {number} startYear - The starting year for the range (default is 1980)
 * @return {array} An array of years from startYear to the current year
 */
export const yearsFn = function (startYear = 1980) {
  const currentYear = new Date().getFullYear(),
    years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

/**
 * Converts an epoch timestamp to a human-readable date string.
 *
 * @param {number} epoch - The epoch timestamp to convert
 * @return {string} The human-readable date string
 */
export const epochToDate = (epoch) => {
  let date = new Date(epoch * 1000);
  return date.toDateString();
};
/**
 * Converts an epoch timestamp to a full date string.
 *
 * @param {number} epoch - The epoch timestamp to convert.
 * @return {string} The full date string.
 */
export const epochToDateFull = (epoch) => {
  let date = new Date(epoch * 1000);
  return date.toDateString();
};
/**
 * Formats a value as Nigerian Naira currency.
 *
 * @param {number} v - The value to format as currency
 * @return {string} The value formatted as Nigerian Naira currency
 */
export const currencyPipe = (v) =>
  "₦" +
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  })
    .format(v)
    .split("NGN")
    .join("");

/**
 * Delays the execution of a function for a specified amount of time.
 *
 * @param {function} fn - The function to be executed
 * @param {number} timeMs - The amount of time in milliseconds to wait
 */
export const delayFn = (fn, timeMs) => {
  setTimeout(() => {
    fn();
  }, timeMs);
};

/**
 * Calculates the time posted based on the input time in minutes.
 *
 * @param {number|string} timeInMinutes - The time in minutes to calculate the posted time for.
 * @return {string} The formatted time since posting.
 */
export const timePostedFn = (timeInMinutes) => {
  if (typeof timeInMinutes === "string") {
    return timeInMinutes;
  } else if (timeInMinutes >= 60) {
    const hr = timeInMinutes / 60;
    return Math.abs(hr).toFixed(0) < 2
      ? Math.abs(hr).toFixed(0) + " hour ago"
      : Math.abs(hr).toFixed(0) + " hours ago";
  } else if (timeInMinutes < 60) {
    return timeInMinutes + " mins ago";
  }

  return 0;
};

/**
 * Calculates the difference in days and time between two given dates.
 *
 * @param {Date|string} lowerDate - The lower date for the calculation.
 * @param {Date|string} higherDate - The higher date for the calculation.
 * @return {Object} An object containing the difference in days and time.
 */
export const diffBetweenDates = (lowerDate, higherDate) => {
  // 2024-06-01
  const date1 = new Date(lowerDate);
  const date2 = new Date(higherDate);
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    days: diffDays,
    time: diffTime,
  };
};

/**
 * Returns the domain of an email with whole domain like @gmail.com or @yahoo.com
 *
 * @param {string} email - the email address
 * @return {string} the domain of the email
 */
export const emailDomain = (email) => {
  /***
   * Returns the domain of an email with whole domain like @gmail.com or @yahoo.com
   */
  const indexes = email.split("@");
  if (indexes.length > 2) return null;

  return email.split("@")[1] || null;
};
/**
 * Checks if the input event contains only numbers.
 *
 * @param {Event} evt - The input event.
 * @return {boolean} Returns `true` if the input contains only numbers, `false` otherwise.
 */
export const checkInputOnlyNum = (evt) => {
  /***
   * Used with Input fields and accepts the event on the input and checks that only numbers are entered in the field
   */
  const theEvent = evt || window.event;
  let key = "";
  // Handle paste
  if (theEvent.type === "paste") {
    key = evt.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  const regex = /[0-9]|\./;
  if (!regex.test(key)) {
    if (theEvent.preventDefault) theEvent.preventDefault();
    theEvent.returnValue = false;
    return false;
  }
  return true;
};

/**
 * Takes a text and capitalizes the text.
 *
 * @param {string} txt - The text to be capitalized.
 * @return {string} The capitalized text. If the input text is empty, an empty string is returned.
 */
export const capitalize = (txt) => {
  /***
   * Takes a text and Capitalizes the text.
   */
  if (txt?.length > 0)
    return txt
      .split(" " || "-" || "" || "_")
      .map(
        (d) =>
          `${d.slice(0, 1).toString().toUpperCase()}${d.slice(1, d.length)}`
      )
      .join(" ");
  else return "";
};
/**
 * Takes a text with spaces and a separator we want to introduce, remove the spaces, introduce the separator and return the lowercased formatted text
 *
 * @param {string} txt - text with spaces
 * @param {string} sep - separator to introduce
 * @return {string} lowercased formatted text
 */
export const joinStringsAndLower = (txt, sep) => {
  /***
   * Takes a text with spaces and a separator we want to introduce, remove the spaces,,introduce the separator and return the lowercased formatted text
   */
  return txt?.split(" ").join(sep).toLowerCase();
};

/**
 * Takes a text and strips off spaces
 *
 * @param {string} txt - the text to remove spaces from
 * @param {string} sep - the separator to split the text by
 * @return {string} the text with spaces stripped off
 */
export const removeSeparators = (txt, sep) => {
  /***
   * Takes a text and strips off spaces
   */
  return txt && txt?.split(sep).join(" ");
};
/**
 * Removes all spaces from a given text.
 *
 * @param {string} txt - The text from which spaces will be removed.
 * @return {string} The text with all spaces removed. If the input text is falsy, an empty string is returned.
 */
export const removeSpaces = (txt) => {
  /***
   * Takes a text and strips off spaces
   */

  if (txt) {
    return txt && txt?.split(" ").join("");
  }
  return "";
};

/**
 * Checks if a given value is a valid email address.
 *
 * @param {string} val - The value to be checked.
 * @return {boolean} Returns true if the value is a valid email address, otherwise returns false.
 */
export const isEmailValid = (val) => {
  // check for @
  const atSymbol = val.indexOf("@");
  if (atSymbol < 1) return false;

  const dot = val.lastIndexOf(".");
  if (dot <= atSymbol + 2) return false;

  // check that the dot is not at the end
  if (dot === val.length - 1) return false;

  return true;
};
/**
 * Sorts an array of objects based on a specified column and direction.
 *
 * @param {Array} arr - The array of objects to be sorted.
 * @param {string} col - The column to sort the objects by.
 * @param {string} [dir="asc"] - The direction of the sort. Can be either "asc" for ascending or "desc" for descending.
 * @return {Array} The sorted array of objects.
 */
export const sortArrObjsFn = (arr, col, dir = "asc") => {
  const a = arr.sort(function (a, b) {
    if (dir === "asc") {
      return a[col] - b[col];
    } else return b[col] - a[col];
  });

  return a;
};
/**
 * Returns the current date in the format 'YYYY-MM-DD'.
 *
 * @return {string} The current date in the format 'YYYY-MM-DD'.
 */
export const todaysDateFn = () => {
  const dt = new Date();
  const yr = dt.getFullYear();
  const month = dt.getUTCMonth();
  const dy = dt.getDate();
  return `${yr}-${month + 1}-${dy}`;
};

/**
 * Converts a base64 string to a buffer asynchronously.
 *
 * @param {string} base64 - The base64 string to convert.
 * @return {Promise<Uint8Array>} A promise that resolves to the buffer representation of the base64 string.
 */
export const base64ToBufferAsync = (base64) => {
  const dataUrl = "data:application/octet-binary;base64," + base64;

  fetch(dataUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const bf = new Uint8Array(buffer);
      return bf;
    });
};

/**
 * Converts a buffer to a base64 string asynchronously.
 *
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @return {Promise<string>} A promise that resolves to the base64 string representation of the buffer.
 */
export const bufferToBase64Async = (buffer) => {
  // eslint-disable-next-line no-undef
  const blob = new Blob([buffer], { type: "application/octet-binary" });
  // eslint-disable-next-line no-undef
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const dataUrl = fileReader.result;
    const base64 = dataUrl.substr(dataUrl.indexOf(",") + 1);
    console.log("dataUrl to base64: " + base64);
  };
  return fileReader.readAsDataURL(blob);
};

// PREV

/**
 * Takes a default JavaScript date and returns the useful part.
 *
 * @param {Date} date - The default JavaScript date to format.
 * @return {string} The useful part of the date as a string.
 */
export const formatDateDisplay = (date) => {
  /***
   * Takes a default JS date and returns the useful part
   */
  return date.toString().slice(0, 16);
};
/**
 * Adds ellipses to text if it exceeds maxLength.
 *
 * @param {string} txt - The input text to add ellipses to.
 * @param {number} maxLength - The maximum length of the text before adding ellipses.
 * @param {number} numOfDots - The number of ellipses dots to add (default is 3).
 * @return {string} The text with ellipses added if necessary.
 */
export const addEllipses = (txt, maxLength, numOfDots = 3) => {
  let dots = "";
  for (let i = 0; i < numOfDots; i++) {
    dots += ".";
  }
  return txt?.length < maxLength ? txt : txt?.slice(0, maxLength) + dots;
};

/**
 * Returns the flag emoji corresponding to the given country code.
 *
 * @param {string} countryCode - The country code for which to get the flag emoji.
 * @return {string} The flag emoji corresponding to the country code.
 */
export function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
/**
 * A function that checks if the input is a boolean and returns an empty string if true, otherwise returns the input.
 *
 * @param {any} dt - The input value to check.
 * @return {string} Returns an empty string if the input is a boolean, otherwise returns the input value.
 */
export const boolCheck = (dt) => {
  if (typeof dt === "boolean") return "";
  else return dt;
};

/**
 * A function that checks for null values in objects and replaces them with an empty string.
 *
 * @param {Object} dt - The input object to check for null values.
 * @return {Object} The object with null values replaced by empty strings.
 */
export const nullCheckObjects = (dt) => {
  const nArr = {};
  Object.entries(dt).forEach((itm) => {
    if (itm[1] === null) nArr[itm[0]] = "";
    else nArr[itm[0]] = itm[1];
  });
  return nArr;
};

/**
 * Copies the input text to the clipboard if supported by the browser.
 *
 * @param {string} txt - The text to copy to the clipboard.
 */
export const copyToClipBoard = (txt) => {
  navigator.clipboard?.writeText(txt);
};

/**
 * Function that allows only numbers to be input based on the provided event.
 *
 * @param {Event} e - The event object containing information about the input.
 * @return {boolean} Returns false if the input is not a number.
 */
export const allowOnlyNumbersFn = (e) => {
  const regex = /^[0-9-!.@#$%*?]/;
  const key = String.fromCharCode(e.charCode ? e.which : e.charCode);
  if (!regex.test(key)) {
    e.preventDefault();
    return false;
  }
};
/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @return {string} The randomly generated string.
 */
export const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};
/**
 * Calculate the percentage difference between a given number of days and the difference between two dates.
 *
 * @param {string} startDateStr - The starting date in 'YYYY/MM/DD' format.
 * @param {string} endDateStr - The ending date in 'YYYY/MM/DD' format.
 * @param {number} daysLeft - The number of days left to calculate the difference from.
 * @return {number} The percentage difference between daysLeft and the actual difference between startDate and endDate.
 */
export const percentageDifference = (startDateStr, endDateStr, daysLeft) => {
  // Convert date strings to Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  // Check if dates are valid
  if (isNaN(startDate) || isNaN(endDate)) {
    throw new Error("Invalid date format. Use 'YYYY/MM/DD'.");
  }

  // Calculate the difference in milliseconds
  const differenceInMs = endDate - startDate;
  // Convert milliseconds to days
  const msInOneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = differenceInMs / msInOneDay;

  // Calculate the total duration in days from the start date to the end date
  // const startDateToEndDateInDays = Math.abs(differenceInDays);

  // Calculate the percentage difference relative to the start date
  const percentageDifference =
    ((differenceInDays - parseInt(daysLeft)) / differenceInDays) * 100;

  console.log(percentageDifference, "dim", daysLeft, differenceInDays);

  return percentageDifference;
};
/**
 * Calculates the difference in days between two given dates.
 *
 * @param {string} d1 - The first date in 'YYYY/MM/DD' format.
 * @param {string} d2 - The second date in 'YYYY/MM/DD' format.
 * @return {number} The difference in days between the two dates.
 */
export const dateSubtracterVecul = (d1, d2) => {
  // Define the date strings
  let date1 = d1;
  let date2 = d2;

  // Convert the date strings to Date objects
  let dateObj1 = new Date(date1);
  let dateObj2 = new Date(date2);

  // Calculate the difference in milliseconds
  let diffInMilliseconds = dateObj1 - dateObj2;

  // Convert milliseconds to days
  let diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return diffInDays; // Output: 7
};

/**
 * Generates a serial number for a table based on the active page, page size, and index.
 *
 * @param {number} [activePage=1] - The current active page. Defaults to 1.
 * @param {number} [pageSize=10] - The number of items per page. Defaults to 10.
 * @param {number} i - The index of the item.
 * @param {string} [type="paginated"] - The type of table. Defaults to "paginated".
 * @return {number} The generated serial number.
 */
export const serialNumberTableGen = (
  activePage = 1,
  pageSize = 10,
  i,
  type = "paginated"
) => {
  if (type === "paginated") {
    if (activePage === 1) return i + 1;
    else return activePage * pageSize - 9 + i;
  } else {
    return i + 1;
  }
};
/**
 * Calculates the difference in days between the input date and the current date.
 *
 * @param {string} date - The date to subtract from the current date.
 * @return {number} The difference in days between the input date and the current date.
 */
export const subtractDateFromToday = (date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const differenceInTime = currentDate.getTime() - inputDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};
