// const coffeeStock = {
//     arabica: 100,
//     robusta: 150,
//     liberica: 200
// }

// const isCoffeMachineReady = true;

// module.exports = {coffeeStock, isCoffeMachineReady};

// console.log(module)




/* Contoh Callback Hell */
function getUser(id, callback) {
    setTimeout(() => {
        if (!id) {
            callback(new Error("User ID is required"), null);
        }

        callback(null, { id, name: 'John Doe', location: "Jakarta" });
    }, 1000);
}

function getWeather(location, callback) {
    setTimeout(() => {
        if (!location) {
            callback(new Error("Location is required"), null);
        }

        callback(null, { weather: "Sunny", temperature: 30 });
    }, 1000);
}

export {getUser, getWeather};
