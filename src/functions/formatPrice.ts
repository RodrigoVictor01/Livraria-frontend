const formatPrice = (price: number | string) => {
    const priceString = typeof price === 'number' ? price.toFixed(2) : price;
    return priceString.replace(/\./g, ',');
};
export default formatPrice;