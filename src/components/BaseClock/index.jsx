import { useEffect, useState } from "react";
import { getCountryZones } from "../../utils";
import SelectGroup from "../SelectGroup";
import style from './BaseClock.module.css';

const BaseClock = ({ baseTimeZone, liftZone }) => {
  const [countryZones, setCountryZones] = useState({})

  useEffect(() => {
    getCountryZones().then(setCountryZones)
  }, [])
  
  const zone = countryZones[baseTimeZone]

  return (
    <div className={style.clock}>
      <h2 className={"title"}>{zone ? zone.country : ""}</h2>
      {/* <h2 className={"time"}>Time: {format(new , "hh:mm:ss a")}</h2>
      <h3 className={"time"}>DATE: {format(new , "dd/MMM/yyyy")}</h3> */}

      <SelectGroup
        name="zone"
        id="zone"
        values={
          Object
            .values(countryZones)
            .map(zone => `${zone.country} ${zone.timeZone} (${zone.GMTOffset})`)
        }
        liftValue={liftZone}
      />
    </div>
  )
}

export default BaseClock