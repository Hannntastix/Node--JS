import { getUser, getWeather } from './state.js'

console.log('Selamat datang!');

setTimeout(() => {
    console.log('Terima kasih sudah mampir, silakan datang kembali!');
}, 3000)

console.log('Ada yang bisa dibantu?');

//CATATAN BAHWA PROSES ASYNCHRONUS TIDAK HANYA setTimeout(), tetapi contoh lainnya adalah fetch().


/* Callback */
function getUsers(isOffline, callback) {
    // simulate network delay
    setTimeout(() => {
        const users = ['John', 'Jack', 'Abigail'];

        if (isOffline) {
            callback(new Error("cannot retrieve users due offline"), null);
            return;
        }

        callback(null, users)
    }, 5000);
}

function usersCallback(error, users) {
    if (error) {
        console.log("Proccess Failed :", error.message);
        return;
    }
    console.log("Proses success :", users);
}

getUsers(false, usersCallback);
getUsers(true, usersCallback);


//callback Hell
function getUserWeather(userId, callback) {
    getUser(userId, (error, user) => {
        if (error) {
            callback(error, null);
        }

        getWeather(user.location, (error, weather) => {
            if (error) {
                callback(error, null);
            }

            callback(null, { ...user, ...weather });
        });
    });
}

getUserWeather(1, (error, userWeather) => {
    if (error) {
        console.log(error);
    }

    console.log(userWeather);
});


// <!-- ASYNCHRONUS HANDLING MENGGUNAKAN PROMISE -->
// function getUserWeather(userId) {
//     let user;

//     return getUser(userId)
//         .then((_user) => {
//             user = _user;
//             return getWeather(user.location)
//         })
//         .then((weather) => ({ ...user, ...weather }))
// }

// getUserWeather(1)
//     .then(console.log)
//     .catch(console.log);