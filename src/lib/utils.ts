export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(price);
};
