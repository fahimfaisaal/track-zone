import { millisecondsToHours, millisecondsToMinutes, minutesToMilliseconds } from "date-fns";
import { hoursToMilliseconds } from "date-fns/esm";

const uid = () => Math.random().toString(32).substring(2)
/**
 * @param {Date} date 
 */
const dateToObject = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate(),
  hour: date.getHours(),
  min: date.getMinutes(),
  sec: date.getSeconds()
})

const objectToDate = (obj) => new Date(...Object.values(obj))

/**
 * 
 * @param {Date} baseDate 
 * @param {Date} date 
 * @returns {{hour:number,min:number}} - the difference will return in hour & min
 */
const getDiff = (baseDate, date) => {
  const diff = Math.abs(baseDate.getTime() - date.getTime())
  
  return {
    hour: millisecondsToHours(diff) % 24,
    min: millisecondsToMinutes(diff) % 60
  }
}

/**
 * 
 * @param {Date} baseDate 
 * @param {*} diff 
 */
const generateDateViaDifference = (baseDate, diff) => {
  const { hour, min } = diff;
  const diffInMilliSec = hoursToMilliseconds(hour) + minutesToMilliseconds(min) + 1000

  baseDate.setMilliseconds(baseDate.getMilliseconds() - diffInMilliSec)

  return baseDate
}

const to24Hour = (hour, amOrPm) => {
  if (hour === 12 && amOrPm === "AM") {
    return 0
  }

  if (amOrPm === "PM") {
    return hour + 12
  }

  return hour
}

const getDateByZone = (timeZone) => {
  let [hour, min, sec, amOrPm] = new Date().toLocaleTimeString('en-us', { timeZone }).split(/:|\s/).map((string) => Number.isNaN(+string) ? string : Number(string))
  const [year, date, month] = new Date().toLocaleDateString('en-us', { timeZone }).split('/').reverse().map(Number)

  return new Date(year, month, date, to24Hour(hour, amOrPm), min, sec)
}

const getCountryZones = async () => {
  const res = await fetch("../data/time-zone.json")
  const data = await res.json()

  return data.reduce((acc, cur) => {
    const [region, zone] = cur.timeZone.split('/')
    acc[cur.timeZone] = {
      region,
      zone,
      ...cur
    }
    
    return acc
  }, {})
}


export {
  uid,
  getCountryZones,
  objectToDate,
  dateToObject,
  getDiff,
  generateDateViaDifference,
  getDateByZone
};

