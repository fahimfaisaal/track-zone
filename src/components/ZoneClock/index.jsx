import { format } from "date-fns"
import useClock from "../../hooks/useClock"
import { objectToDate } from "../../utils"
import style from "./Clock.module.css"

const ZoneClock = ({ baseDate, currentDate, title, event, zoneDiff }) => {
  const { date, updateCurrentDate } = useClock(baseDate, currentDate, zoneDiff)

  const clickHandler = (e) => {
    const name = e.target.className;

    console.log({name})
  }

  return (
    <div className={style.clock}>
      <h2 onClick={clickHandler} className={"title"}>{title}</h2>
      <h2 onClick={clickHandler} className={"time"}>Time: {format(objectToDate(date.time), "hh:mm:ss a")}</h2>
      <h3 onClick={clickHandler} className={"time"}>DATE: {format(objectToDate(date.time), "dd/MMM/yyyy")}</h3>
      <h4>DIFFERENCE: {`${date.diff.hour}hr ${date.diff.min}min`}</h4>
      <h4 onClick={clickHandler} className={"event"}>Event: {event}</h4>
      <p className={style.close}>X</p>
    </div>
  )
}
export default ZoneClock