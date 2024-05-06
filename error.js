
/* Try and catch error */
try {
  consple.log("Hai")
  console.log("Halo dunia")
} catch (error) {
  console.log(error.name)
  console.log(error.message)
  console.log(error.stack)
} finally {
  console.log("tetap dijalankan tanpa peduli hasil dari try and catch")
}



const json = '{ "name": "Yoda", "age": 20 }';

try {
  const user = JSON.parse(json); //JSON.parse mengubah tipe data json dari string menjadi object

  console.log(user.name);
  console.log(user.age);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}



/* throwing errors */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const jSon = '{ "age": 30 }';

try {
  const users = JSON.parse(jSon);

  if (!users.name) {
    throw new SyntaxError("'name' is required.");
  }

  if (!users.age) {
    throw new ValidationError("'age' is required.");
  }

  console.log(users.name); // Yoda
  console.log(users.age);  // 20
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(`JSON Error: ${error.message}`);
  } else if (error instanceof ValidationError) {
    console.log(`Invalid data: ${error.message}`);
  } else if (error instanceof ReferenceError) {
    console.log(error.message);
  } else {
    console.log(error.stack);
  }
}


/* Kuis Dicoding */
// * TODO 1:
//  * - Buatlah class ValidationError yang merupakan custom error dengan spesifikasi berikut:
//  *   - Turunan dari class Error
//  *   - Memiliki constructor(message)
//  *   - this.name harus bernilai "ValidationError"
//  *
//  * TODO 2:
//  * - Buatlah fungsi validateNumberInput yang memvalidasi 3 buah input (argumen) dengan spesifikasi berikut:
//  *   - Menerima 3 argumen
//  *   - Bila argumen pertama bukan number:
//  *     - throw ValidationError dengan pesan 'Argumen pertama harus number'
//  *   - Bila argumen kedua bukan number:
//  *     - throw ValidationError dengan pesan 'Argumen kedua harus number'
//  *   - Bila argumen ketiga bukan number:
//  *     - throw ValidationError dengan pesan 'Argumen ketiga harus number'
//  *
//  * TODO 3:
//  * - Panggil fungsi validateNumberInput di dalam fungsi detectTriangle untuk memvalidasi nilai argumen a, b, dan c.
//  *   - pastikan Anda memanggil validateNumberInput menggunakan try .. catch.
//  *   - bila block catch terpanggil, kembalikan fungsi detectTriangle dengan pesan error yang dibawa fungsi validateNumberInput.
//  */

// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "ValidationError"
//   }
// }

function validateNumberInput(a, b, c) {
  if (typeof a !== 'number') {
    throw new ValidationError('Argumen pertama harus number');
  }
  if (typeof b !== 'number') {
    throw new ValidationError('Argumen kedua harus number');
  }
  if (typeof c !== 'number') {
    throw new ValidationError('Argumen ketiga harus number');
  }
}

const detectTriangle = (a, b, c) => {
  try {
    validateNumberInput(a, b, c);
  } catch (error) {
    return error.message;
  }

  if (a === b && b === c) {
    console.log("Segitiga sama sisi");
  }

  if (a === b || a === c || b === c) {
    console.log("Segitiga sama kaki");
  } else {
    console.log("Segitiga sembarang");
  }
};

detectTriangle(2, 2, 5);