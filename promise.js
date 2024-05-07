function getUsers(isOffline) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = ['keisha', 'glen', 'carissa']

            if (isOffline) {
                reject(new Error("parameter isOffline ke run makanya outputnya ini"));
                return;
            }

            resolve(users);
        }, 2000);
    })
}

getUsers(true)
    .then(users => console.log(users))
    .catch(error => console.log(error.message));


import { promisify } from 'util';

function getUser(adalahOffline, callback) {
    // simulate network delay
    setTimeout(() => {
        const user = ['John', 'Jack', 'Abigail'];
        if (adalahOffline) {
            callback(new Error('cannot retrieve users due offline'), null);
            return;
        }

        callback(null, user);
    }, 5000);
}

// create a Promise version of getUsers
const getUsersPromise = promisify(getUser);

getUsersPromise(false)
    .then(user => console.log(user)) // user itu bebas kita mo diganti apaan jg,semacam variabel
    .catch(error => console.log(error.message));



/* Dalam kasus nyata, Anda bisa gunakan promisify dalam mengubah berbagai fungsi yang disediakan Node.js 
menjadi Promise-based, contohnya fungsi fs.readFile() yang digunakan untuk membaca berkas secara asynchronous. */

// const fs = require('fs');
// const { promisify } = require('util');

// const readFilePromise = promisify(fs.readFile);

// readFilePromise('./data.txt', 'utf8')
//     .then(data => console.log(data))
//     .catch(err => console.log(err.message));



// <!-- Kuis Dicoding Asynchronus dengan Promise -->
/**
 * @TODO
 * Ubahlah fungsi asynchronous callback-based getProvinces menjadi Promise-based.
 *
 * Catatan:
 * - Anda boleh menggunakan util.promisify untuk mengubah fungsi callback-based menjadi Promise-based.
 * - Jika nama fungsinya berubah, sesuaikan nilai yang diekspor tanpa mengubah nama properti di akhir berkas ini.
 */


import util from 'util';

function getProvinces(countryId, callback) {
    setTimeout(() => {
        if (countryId === 'id') {
            callback(null, [
                { id: 'id-jk', name: 'Jakarta' },
                { id: 'id-bt', name: 'Banten' },
                { id: 'id-jr', name: 'Jawa Barat' },
            ]);
            return;
        }

        callback(new Error('Country not found'), null);
    }, 7000);
}

const getProvincesPromise = util.promisify(getProvinces);

// module.exports = { getProvinces: getProvincesPromise };

getProvincesPromise('id')
    .then(arraykosong => {
        console.log('Daftar provinsi:', arraykosong); // arraykosong itu bebas kita mo diganti apaan jg,semacam variabel
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error.message);
    });