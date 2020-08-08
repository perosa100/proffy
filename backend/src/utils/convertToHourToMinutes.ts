export default function convertToHourToMinutes(time: string): number {
  const [hour, minutes] = time.split(':').map(Number)
  const timeinMinutes = hour * 60 + minutes

  return timeinMinutes
}
