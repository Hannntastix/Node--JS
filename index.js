import {mobil, geniusBringsGlory} from "./stock.js";
import _ from 'lodash';

console.log("Menyalakan mesin kopi");
console.log("Menggiling biji kopi");
console.log("Memanaskan air");
console.log("Mencampurkan air dan kopi");
console.log("Menuangkan kopi ke dalam gelas");
console.log("Menuangkan susu ke dalam gelas");
console.log("Kopi Anda sudah siap!");

console.log(mobil);
console.log(geniusBringsGlory);

const myArray = [1,2,3,4]
const sum = _.sum(myArray) //implementasi lodash memudahkan

console.log(sum);

// const {coffeeStock, isCoffeMachineReady} = require('./state.js')

// const makeCoffee = (type, miligrams) => {
//     if(coffeeStock[type] >= miligrams) {
//         console.log("Kopi Berhasil dibuat!!")
//     } else {
//         console.log("Kopi Gagal dibuat karena habis!!!")
//     }
// }

// makeCoffee("arabica", 120);
// console.log(coffeeStock);
// console.log(isCoffeMachineReady);