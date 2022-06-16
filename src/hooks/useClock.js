import { useEffect, useState } from "react";
import Clock from "../class/Clock";
import { dateToObject, getDiff } from "../utils";

const generateInitialState = (baseDate, currentDate) => ({
  time: dateToObject(currentDate),
  diff: getDiff(baseDate, currentDate)
})

/**
 * @param {Date} baseDate 
 * @param {Date} currentDate 
 */
const useClock = (baseDate, currentDate, zoneDiff) => {
  const [date, setDate] = useState(generateInitialState(baseDate, currentDate))
  const [clock] = useState(new Clock())

  /**
   * @param {Date} updateDate 
   */
  const setUpdateDate = (updateDate) => setDate(
    (prevDate) => ({
      ...prevDate,
      time: {
        ...prevDate.time,
        ...dateToObject(updateDate)
      },
      diff: zoneDiff
    })
  )

  useEffect(() => {
    clock.start(currentDate, setUpdateDate)
    return () => clock.stop()
  }, [])

  /**
   * @param {Date} newCurrentDate 
   */
  const updateCurrentDate = (newCurrentDate) => {
    clock.stop()
    clock.start(newCurrentDate, setUpdateDate)
  }
  
  return {
    date,
    updateCurrentDate
  }
}

export default useClock