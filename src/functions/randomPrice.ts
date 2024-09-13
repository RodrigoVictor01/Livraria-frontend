import formatPrice from './formatPrice';

const randomPrice = () => {
    const min = 25;
    const max = 100;
    const price = Math.random() * (max - min) + min;
    return formatPrice(price.toFixed(2));
};

export default randomPrice;