import { useState } from "react"
import { uid } from "../../utils"

const SelectGroup = ({ name, id, values, liftValue }) => {
  const [stateValue, setValue] = useState('')
  
  const changeHandler = (e) => {
    const { value } = e.target
    setValue(value)

    liftValue(value)
  }

  return (
    <select name={name} id={id} onChange={changeHandler}>
      {values.map(value => (
        <option key={uid()} value={value} selected={stateValue === value}>{value}</option>
      ))}
    </select>
  )
}

export default SelectGroup