'use strict';
// const: nazwa nie dostanie nowej wartości. let: wartość można zmienić.
const price = 18;
let quantity = 3;
const product = 'Bilet';
const available = true;
const total = price * quantity;
console.log(product, available);
console.log('Razem:', total);
quantity = quantity + 1;
console.log('Po dodaniu biletu:', price * quantity);
