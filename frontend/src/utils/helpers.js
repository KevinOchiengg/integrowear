export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-kenya', {
    style: 'currency',
    currency: 'Ksh',
  })
    .format(number)
    .replace(/\D00(?=\D*$)/, '')
}
