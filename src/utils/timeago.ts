const DATE_UNITS = {
  year: 31536000,
  month: 2629800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}

let unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
})

export const getRelativeTime = (timestamp: string) => {
  const from = new Date(timestamp).getTime()
  const now = Date.now()

  const elapsed = (now - from) / 1000

  for (unit in DATE_UNITS) {
    if (elapsed >= DATE_UNITS[unit] || unit === 'second') {
      const value = Math.floor(elapsed / DATE_UNITS[unit]) * -1

      return rtf.format(value, unit)
    }
  }
}
