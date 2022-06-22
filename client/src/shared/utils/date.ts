const getDate = (date: string | Date): Date => {
  if (typeof date === 'string') return new Date(date)
  return date
}

const sortDate = (first: Date | string, second: Date | string): number => {
  const firstDate = getDate(first)
  const secondDate = getDate(second)

  return secondDate.getTime() - firstDate.getTime()
}

export { getDate, sortDate }
