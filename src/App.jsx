import { useState } from 'react'
import './App.css'
import BaseClock from './components/BaseClock'
import ZoneClock from './components/ZoneClock'
import { generateDateViaDifference, getDateByZone } from './utils'

const initialState = {
  baseTimeZone: 'Asia/Kabul',
  zoneTimes: {
    "dfgfdg": {
      id: "gdfg",
      title: "AFG",
      event: "Have a important meet",
      diff: {
        hour: 2,
        min: 1
      },
    }
  }
}

function App() {
  const [state, setState] = useState(initialState)
  const baseDate = getDateByZone(state.baseTimeZone)

  const setBaseTime = (value) => {
    const [, baseTimeZone] =value.split(' ')
    
    setState((prevState) => ({
      ...prevState,
      baseTimeZone
    }))
  }

  return (
    <div className="App">
      <header>
        <h1 className='title'>Track Zone</h1>
        <BaseClock baseTimeZone={state.baseTimeZone} liftZone={setBaseTime}/>
      </header>

      <div className="time-zones">
        {Object.values(state.zoneTimes).map(
          zone => (
            <ZoneClock
              key={zone.id}
              id={zone.id}
              title={zone.title}
              event={zone.event}
              baseDate={baseDate}
              currentDate={generateDateViaDifference(baseDate, zone.diff) }
              zoneDiff={zone.diff}
            />
          )
        )}
      </div>
    </div>
  )
}

export default App
