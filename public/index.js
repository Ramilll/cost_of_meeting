// function test(input) {
// 	let file = input.files[0];

//  	let reader = new FileReader();

//  	reader.readAsText(file);

 
// 	reader.onload = function() {
// 		var obj = JSON.parse(reader.result);
//     	console.log(obj["meetings"]);
//     	var r = obj["meetings"];
//     	console.log(r['0']);
//     	var d = r['0'];
//     	var currentUsers = d['currentUsers']
//     	document.getElementById('meetings').innerHTML = d["id"];

//     	for (var i = 0; i < d['currentUsers'].length; i++) {
//     		addUser(currentUsers[i])
//     	}
//   	};

//   	reader.onerror = function() {
//     console.log(reader.error);
//   	};
// }
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
      if(!start){
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

function addUser() { // add user in selection
	var user = document.createElement("option");
  var name = 'Max'

  user.value = name;
  user.id = name;
  user.innerHTML = name;
	document.getElementById("users").appendChild(user); //add
}

var greed = 60000;
// money counter
function cost(){
  if(start){
    var n = 30;
    document.getElementById('cost').innerHTML = n*greed*1/160*1/3600*seconds;
    setTimeout(cost,1000);
  }
}
// fetch('http://localhost:3000/admin', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         user: {
//             name: "John",
//             email: "john@example.com"
//         }
//     })
// });
const url = 'http://localhost:3000/user/all'; //url place holder /user/all
let body = null;
fetch(url) //method: 'GET'
  .then((response) => {
    var res = response.json();
    console.log(res.text);
    console.log(res);})
    // document.getElementById('meeting').innerHTML = JSON.parse(res);
  // })
  // .then((data) => {
  //   console.log(data);
  // });