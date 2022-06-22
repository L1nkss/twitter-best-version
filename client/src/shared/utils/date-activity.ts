const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getTimeSince = (date: string | Date): string => {
  const currentTime = new Date()
  const propDate = typeof date === 'string' ? new Date(date) : date

  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30

  const time = currentTime.getTime() - propDate.getTime()

  if (time < msPerMinute) {
    return Math.round(time / 1000) + 's'
  } else if (time < msPerHour) {
    return Math.round(time / msPerMinute) + 'm'
  } else if (time < msPerDay) {
    return Math.round(time / msPerHour) + 'h'
  } else if (time < msPerMonth) {
    return `${propDate.getDate()} ${months[propDate.getMonth()].slice(0, 3)}`
  } else {
    return `${months[propDate.getMonth()].slice(
      0,
      3
    )} ${propDate.getDate()}, ${propDate.getFullYear()}`
  }
}

export { getTimeSince }
