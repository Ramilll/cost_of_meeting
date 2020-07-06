const url = 'http://localhost:3000/'; //url place holder /user/all

// fetch(url+'all').then(function(response) { //gettingalle data
//   response.json().then(function(text){
//     console.log(text.users[1].name);
//     addUser(text.users,text.wage);
//   })
// })

let res = [];
let wageAr = [];

function fetchGet() {
   const result  = fetch(url+'user/all');
    result.then(function(response) {
    response.json().then(function(text){
      addUser(text);
      console.log(text);
    })
    })
    const result1  = fetch(url+'wage/all');
    result1.then(function(response1) {
        response1.json().then(function(text1){
            console.log(text1);
        })
    })
    console.log(result);
}
function getDirect() {
    const result  = fetch(url+'direct');
    result.then(function(response) {
        response.json().then(function(text){
            addUserDirect(text);
        })
    })
}

// function test1(ar) {
//   res = ar;
// }
// function test2(ar) {
//   console.log(ar);
// }


var time = '';
var second = 0;
var seconds = 0;
var min = 0;
// var hour = 0;
var s = '';
var m = '';
// var h = '';
var start = true;

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
        // if(min>=60){
        //   hour++;
        //   min = 0;
        // }
        if(second>=10){
          s = '';
        }
        else s ='0';
        if(min>=10){
          m = '';
        }
        else m ='0';
       //  if(hour>=10){
       //    h = '';
       //  }
       // else h ='0';

        time = m+min+':'+s+second; //h+hour+':'
        document.getElementById('timer').innerHTML = time;
        setTimeout(timer,1000);
      }
    }

function a(argument) {
    console.log(a);
}
// add user in current user list
function addCurrentUser(id,id1,classI) {
  var value = document.getElementById(id).value;
  var users = document.getElementById('users').childNodes;
  for(var i = 0;i < users.length;i++){
        if(value == users[i].innerHTML){
            var user = users[i];
            var cln = user.cloneNode(true);
        }
  }

  cln.classList.add(classI);
  // var element = document.getElementById(id);

  document.getElementById(id1).appendChild(cln); //add
  user.remove();
	// users.parentNode.removeChild(id);
}

var ar = [];
function addUser(array) { // add user in selection
  for(var i = 0;i<array.length;i++){
    var user = document.createElement("option");
    var name = array[i].name;
    user.setAttribute('onclick', 'removeUser(this.id)')

    user.value = array[i].name; // users name
    user.id = array[i].id; // users id 
    user.innerHTML = array[i].name;
    document.getElementById("users").appendChild(user); //add
  }

}
function removeUser(id) {
    var cln = document.getElementById(id);
    cln.classList.add('re');
    document.getElementById(id).remove();
    document.getElementById("users").appendChild(cln); //add
}

var value = 0; // money
// money counter
function cost(array){
  if(start){
    var greed = 0;
    var wage = [];
    var n = document.getElementById("currentUsers").childNodes.length; // length currentUsers
    var elem = document.getElementById("currentUsers").childNodes; // list currentUsers

    for(var i = 1; i < n;i++){
        var sd = usersData(elem[i].value);
        for(var f = 0; f < res.wage.length; f++) {
            if(sd == res.wage[f].wageId){
                wage.push(res.wage[f].salary);
            }
        }
    }
      	var sd = usersData(elem[i].value);
		for(var f = 0; f < res.wage.length; f++) {
  			if(sd == res.wage[f].wageId){
  				wage.push(res.wage[f].salary);
  			}
  		}
    }
    // wage = unique(wage); 
    // for(var i = 0;i < n;i++){
    //   for(var s = 1; s < res.wage.length;s++){
    //    var sd = (wawgeData(usersData(elem[s].value)));
    //   }
    //     wage.push(sd)
    // }
    // wage = unique(wage);
    console.log(wage);
    for (var d = 0; d < wage.length; d++) {
        greed += wage[d];
    }
    console.log("greed:"+greed);
    value = n*greed*1/160*1/3600*seconds;
    document.getElementById('cost').innerHTML =value.toFixed(2);//n*(greed*1/160*1/3600*seconds)
    setTimeout(cost,1000);
  }
function usersData(element) {
  for(var i = 0;i<res.users.length;i++){
    if(element == res.users[i].name) return res.users[i].wageId;
    }
}
function postMeeting() {
    var users = document.getElementById('currentUsers').childNodes;
    var nameMeeting = document.getElementById('nameMeeting').value;
    var id = [];
    for (var i = 0; i < users.length; i++) {
            if(users[i].innerHTML != null){
                id.push(users[i].id);
            }
    }
    var now = new Date();
    let data = {
        name: nameMeeting,
        userId: id,
        start: now
    };
    const res = fetch(url+'meeting', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
            // 'Content-Type': 'application/json; charset=utf-8'
         },
        body: JSON.stringify(data)
    })
}
function copy() {
    navigator.clipboard.writeText(document.getElementById('ref').value)
}
function complet() {
    // navigator.clipboard.readText() //
    //     .then(text => {
    //         console.log(text);
    //     })
    var now = new Date();

    let data = {
        end: now,
        time: seconds,
        name: 'post'
        // userId: id
    }
    const res = fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
            // 'Content-Type': 'application/json; charset=utf-8'
         },
        body: JSON.stringify(data)
    })
}

function addUserDirect(text) {
    console.log(text);
    var link = document.getElementById('grid-colums');
    // var elem = document.createElement('div');
    for (var i = 0; i < text.length; i++) {
            var elem = document.createElement('div');
            elem.classList.add('colums');
            elem.innerHTML = text[i].name;
            document.getElementById('grid-colums').appendChild(elem);

            var elem1 = document.createElement('div');
            elem1.classList.add('colums');
            elem1.innerHTML = text[i].meetingTime;
            document.getElementById('grid-colums').appendChild(elem1);

            var elem2 = document.createElement('div');
            elem2.classList.add('colums');;
            elem2.innerHTML = text[i].costMeetingTime;
            document.getElementById('grid-colums').appendChild(elem2);
            // elem.innerHTML = text[i].meetingTime;
            // elem.innerHTML = text[i].costMeetingTime;
            // document.getElementById('grid-colums').appendChild(elem);
    }
}

function maxMin(value,id) {
    document.getElementById(id).value = value;
}
function test13() {
    document.getElementById('filter').style.display = 'block';
    document.getElementById('grid-colums').style.display = 'none';
    document.getElementById('box-1').style.display = 'none';
    document.getElementById('box-2').style.display = 'none';
    document.getElementById('box-3').style.display = 'none';
    document.getElementById('enter').style.display = 'none';
}

function test14() {
    document.getElementById('filter').style.display = 'none';
    document.getElementById('grid-colums').style.display = 'grid';
    document.getElementById('box-1').style.display = 'block';
    document.getElementById('box-2').style.display = 'block';
    document.getElementById('box-3').style.display = 'block';
    document.getElementById('enter').style.display = 'block';

    document.getElementById('filter-img').src = 'filter-full.png';
}