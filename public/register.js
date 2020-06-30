const url = 'http://localhost:3000'; //url place holder /user/all

// fetch(url+'all').then(function(response) { //gettingalle data
//   response.json().then(function(text){
//     console.log(text.users[1].name);
//     addUser(text.users,text.wage);
//   })
// })
// Пример отправки POST запроса:
// const url =  'http://localhost:3000/registration'; //url place holder /user/all'
// var data = '42131'
// fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     body: data // body data type must match "Content-Type" header
//  });
// const data = { email: 'example', password: '1234567'};

// try {
//   const response = fetch(url, {
//     method: 'POST', // или 'PUT'
//     body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   console.log('Успех:', JSON.stringify(response));
// } catch (error) {
//   console.error('Ошибка:', error);
// }