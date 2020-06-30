const url = 'http://localhost:3000/'; //url place holder /user/all

fetch(url+'all').then(function(response) { //gettingalle data
  response.json().then(function(text){
    console.log(text.users[1].name);
    addUser(text.users,text.wage);
  })
})