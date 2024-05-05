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




const jSon = '{ "name": "Yoda", "age": 20 }';
 
try {
  const users = JSON.parse(jSon);
 
  if (!users.name) {
    throw new SyntaxError("'name' is required.");
  }
 
  errorCode;
 
  console.log(users.name); // Yoda
  console.log(users.age);  // 20
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON Error: ${error.message}`);
      } else if (error instanceof ReferenceError) {
        console.log(error.message);
      } else {
        console.log(error.stack);
      }
}