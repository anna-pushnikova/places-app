export default function numberFilter(number) {
  return new Intl.NumberFormat('en-US').format(number)
}