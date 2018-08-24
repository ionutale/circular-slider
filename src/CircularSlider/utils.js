export const pipe = (...args) => args.reduce((prev, curr) => curr(prev))

export const getRelativeAngle = (angle, initialAngle) =>  (360 - angle + initialAngle) % 360

// 
export const getRelativeAngleInSteps = (angle, initialAngle) =>  (360 - angle + initialAngle) % 360

export const toDeg = angle => angle * (180 / Math.PI)

export const toRad = angle => angle * (Math.PI / 180)

/**
 * convert the 0 to 100 percent number 
 * to the total minutes in 12 hours
 * @param {Number} percent 
 */
export const toMin = (percent) => (720 / 100) * percent

/**
 * converts the minutes in readable time 
 * ex: 09:30
 * @param {Number} minutes 
 * return {String}
 */
export const toStringTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const min = Math.floor(minutes % 60)
    
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
    const minStr = min < 10 ? `0${min}` : `${min}`
    
    return `${hoursStr}h ${minStr}m`
  }

  /**
   * 
   * @param {Number} step 
   * @param {Number} minutes 
   */
  export const stepOf = (step, minutes) => Math.round(minutes) % step === 0 ? Math.round(minutes) : 0

  /**
   * it returns the time in a specific range as HH:mm
   * 
   * it checks if the endThumb is after 12:00am then it adds 12h to endMinutes
   * @param {Number} startMinutes 
   * @param {Number} endMinutes 
   */
  export const startEndDiff = (startMinutes, endMinutes) => toStringTime((endMinutes < startMinutes ? endMinutes + 720 : endMinutes ) - startMinutes)
