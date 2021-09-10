export const formatPrice = (number) => {
  return new Intl.NumberFormat('kenya', {
    style: 'currency',
    currency: 'ksh',
  }).format(number)
}
