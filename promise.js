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



/* Chaining Promise */
function withDrawMoney(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 100) {
                reject(new Error("Not Enough Amount to Withdraw"))
                return;
            } resolve(amount)
        }, 1000)
    })
}

function buyCinemaTicket(money) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (money < 35) {
                reject(new Error("Not Enough Money to Buy A Ticket"))
                return;
            } resolve("1-Ticket")
        }, 1000)
    })
}

function goInsideCinema(ticket) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!ticket) {
                reject(new Error("Cannot go inside cinema!"))
                return;
            } resolve("Enjoy The Movie!")
        }, 1000)
    })
}

function watchMovie() {
    withDrawMoney(50)
        .then((money) => {
            return buyCinemaTicket(money)
        })
        .then((ticket) => {
            return goInsideCinema(ticket)
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error.message)
        })
}

watchMovie();


/* Promise Static Method */

//Promise.All()
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ups')), 2000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

Promise.all([promise1, promise2, promise3])
    .then((values) => console.log(values)) //outputnya yang ada rejected tanpa mengeluarkan yang fulfilled
    .catch((error) => console.log(error.message));


//Promise.Race()
const Janji1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('ups')), 6000));
const Janji2 = new Promise((resolve) => setTimeout(() => resolve(2), 3000));
const Janji3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));

Promise.race([Janji1, Janji2, Janji3])
    .then((value) => console.log(value)) //outputnya yang paling cepet delay timenya
    .catch((error) => console.log(error.message));


//Promise.AllSettled()
const promises1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promises2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error")), 2000));
const promises3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

Promise.allSettled([promises1, promises2, promises3])
    .then((results) => console.log(results)); //ouputnya semua dan dikeluarkan dalam bentuk array of object


//Promise.any()
//Cara kerja method ini mirip seperti Promise.race(), 
//tetapi hanya mengembalikan nilai tercepat yang berstatus fulfilled. Jika seluruh Promise berstatus rejected, 
//method ini akan mengembalikannya dengan pesan “All Promises were rejected”.
// fulfilled sample
const promiseResolve1 = new Promise((resolve, reject) => setTimeout(() => resolve("1"), 1000));
const promiseResolve2 = new Promise((resolve, reject) => setTimeout(() => resolve("2"), 2000));
const promiseResolve3 = new Promise((resolve, reject) => setTimeout(() => resolve("3"), 3000));

Promise.any([promiseResolve1, promiseResolve2, promiseResolve3])
    .then((value) => console.log(value)) // 1
    .catch((error) => console.log(error.message));

// rejected sample
const promiseReject1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 1000));
const promiseReject2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 2000));
const promiseReject3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("3")), 3000));

Promise.any([promiseReject1, promiseReject2, promiseReject3])
    .then((value) => console.log(value))
    .catch((error) => console.log(error.message)); // All Promises were rejected

/*async dan await */
async function nontonFilm(amount) {
    try {
        const money = await withDrawMoney(amount);
        const ticket = await buyCinemaTicket(money);
        const result = await goInsideCinema(ticket);

        return result;
    } catch (error) {
        throw error;
    }
}

nontonFilm(35)
    .then((result) => console.log(result)) // enjoy the movie
    .catch((error) => console.log(error.message));

nontonFilm(20)
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));





/**<!-- KUIS DICODING -->
 * @TODO
 * Lengkapilah kode di bawah ini agar dapat mengakses jalan tol.
 * 1. Beli kartu tol (buyTollRoadCard) -> isi argumen money dengan angka 25 -> mengembalikan objek { tollRoadCard: true, balance: 0 }.
 * 2. Isi saldo kartu tol (topUpBalance) -> isi argumen card dengan objek card yang didapat dari langkah 1 dan isi argumen amount dengan angka 10 -> mengembalikan objek { tollRoadCard: true, balance: 10 }.
 * 3. Gunakan akses jalan toll (useTollRoad) -> isi argumen card dengan objek card yang didapat dari langkah 2.
 *
 * Catatan:
 * - Anda boleh menggunakan async/await atau .then() atau .catch() atau kombinasi keduanya.
 * - Jika ada error, tampilkan error (error.message) tersebut dengan console.log.
 * - Masing-masing langkah di atas harus dijalankan secara berurutan.
 * - Masing-masing langkah akan mencetak pesan ke console.
 * - Anda bisa mengeksplorasi fungsi yang sudah disediakan di utils.js. Namun, Anda tidak boleh mengubah isi dari utils.js.
 */



function buyTollRoadCard(money) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (money >= 25) {
                console.log('buying card');
                resolve({ tollRoadCard: true, balance: 0 });
                return;
            }

            reject(new Error('not enough money to buy card'));
        }, 1000);
    });
}

function topUpBalance(card, amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (card) {
                console.log('topping up balance');
                resolve({ ...card, balance: card.balance + amount });
                return;
            }

            reject(new Error('no card'));
        }, 1000);
    });
}


function useTollRoad(card) {
    const TOLL_PRICE = 10;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (card.balance < TOLL_PRICE) {
                reject(new Error('not enough balance'));
                return;
            }

            card.balance -= TOLL_PRICE;

            console.log('using toll road');
            resolve();
        }, 1000);
    });
}

function getTollAccess() {
    buyTollRoadCard(25)
        .then((card) => {
            return topUpBalance(card, 10);
        })
        .then((card) => {
            return useTollRoad(card);
        })
        .catch((error) => {
            console.log(error.message);
        });
}


// Jangan hapus kode di bawah ini
getTollAccess();