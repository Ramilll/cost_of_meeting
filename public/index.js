var time = '';
var second = 0;
var seconds = 0;
var min = 0;
var hour = 0;
var s = '';
var m = '';
var h = '';
var start = false;

    function test(){
      start = !start;
      timer();
      cost();
      if(start){
        button.value = 'stop';
      }
      else button.value = 'start'
    }

    function timer() {
      if(start){
       second++;
       seconds++;
        if(second>=60){
          min++;
          second = 0;
        }
        if(min>=60){
          hour++;
          min = 0;
        }
        if(second>=10){
          s = '';
        }
        else s ='0';
        if(min>=10){
          m = '';
        }
        else m ='0';
        if(hour>=10){
          h = '';
        }
       else h ='0';

        time = h+hour+':'+m+min+':'+s+second;
        document.getElementById('timer').innerHTML = time;
        setTimeout(timer,1000);
      }
    }

// add user in current user list
function addCurrentUser() {
  var id = document.getElementById("users").value;
  var user = document.getElementById(id);
  var cln = user.cloneNode(true);

  document.getElementById("currentUsers").appendChild(cln); //add
}

function addUser(array,wage) { // add user in selection
  for(var i = 0;i<array.length;i++){
    var user = document.createElement("option");
    var name = array[i].name

    user.wage = wage[0].salary; 
    user.value = array[i].name; // users name
    user.id = array[i].name; // users id 
    user.innerHTML = array[i].name;
    document.getElementById("users").appendChild(user); //add
  }

}

var greed = 60000;
// money counter
function cost(){
  if(start){
    var n = document.getElementById("currentUsers").childNodes.length - 1;
    document.getElementById('cost').innerHTML = n*(greed*1/160*1/3600*seconds);
    setTimeout(cost,1000);
  }
}

const url = 'http://localhost:3000/'; //url place holder /user/all

fetch(url+'all').then(function(response) { //gettingalle data
  response.json().then(function(text) {
    console.log(text);
    addUser(text.users,text.wage);
  })
})

// fetch(url+'user/all').then(function(response) {  //getting user data
//   response.json().then(function(text) {
//     addUser(text);
//   })
// })