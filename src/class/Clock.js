class Clock {
  date;
  #startDate;
  #intervalId;

  constructor() {
    this.date = null;
    this.#startDate = null
    this.#intervalId = null;
  }

  /**
   * @param {Date} currentTime 
   * @param {Function} cb - that pass always update date
   * @see inspired_from -> [Stack Overflow](https://stackoverflow.com/questions/35322669/how-to-create-a-javascript-clock-with-custom-input-time)
   */
  #tick(currentTime, cb) {
    const diff = new Date().getTime() - this.#startDate.getTime();
    const currentDate = new Date(currentTime)
    currentDate.setMilliseconds(currentDate.getMilliseconds() + diff)

    this.date = currentDate
    cb(this.date)
  }

  start(currentTime = new Date(), cb) {
    this.#startDate = new Date()
    this.#intervalId = setInterval(this.#tick.bind(this, currentTime, cb), 1e3)
  }

  stop() {
    this.date = null
    this.#startDate = null
    clearInterval(this.#intervalId)
    this.#intervalId = null
  }
}

export default Clock