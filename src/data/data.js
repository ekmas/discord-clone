export let months = [
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
export let days = []
export let years = []

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = 1900; i <= 2020; i++) {
  years.push(i)
}

years.reverse()

export let emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
