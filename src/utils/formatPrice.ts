const formatPrice = (price: number, currencyId: string): string => {
  return `${price.toFixed(2)}`;
};

export default formatPrice;
