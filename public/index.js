const url = 'http://localhost:3000/'; //url place holder /user/all

let res = [];
let resWage = [];
let wageAr = [];
let currentUserId = [];

function fetchGet() {
   const result  = fetch(url+'getUsers',{mode: 'same-origin'});
    result.then(function(response) {
    response.json().then(function(text){
      addUser(text);
      res = text;
      console.log(text);
    })
    })
    const result1  = fetch(url+'getWages',{mode: 'same-origin'});
    result1.then(function(response1) {
        response1.json().then(function(text1){
            console.log(text1);
            resWage = text1;
        })
    })
}
function getDirect() {
    const result  = fetch(url+'getUsers',{mode: 'same-origin'});
    result.then(function(response) {
        response.json().then(function(text){
            addUserDirect(text);
        })
    })
}
var time = '';
var second = 0;
var seconds = 0;
var min = 0;
var s = '';
var m = '';
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
        if(second>=10){
          s = '';
        }
        else s ='0';
        if(min>=10){
          m = '';
        }
        else m ='0';

        time = m+min+':'+s+second; //h+hour+':'
        document.getElementById('timer').innerHTML = time;
        setTimeout(timer,1000);
      }
    }
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

  document.getElementById(id1).appendChild(cln); //add
  user.remove();
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
function cost(){
  if(start){
    var greed = 0;
    var wage = [];
    // var n = document.getElementById("currentUsers").childNodes.length; // length currentUsers
    // var elem = document.getElementById("currentUsers").childNodes; // list currentUsers

    var n = currentUserId.length;
    var elem = []
    console.log(currentUserId);
    for(var p = 0; p < n; p++) {
        for(var user = 0; user < res.length; user++) {
            if(res[user].id == currentUserId[p]){
                elem.push(res[user].wageId);
            }
        }
    }
    console.log(elem);
    for (var i = 0; i < elem.length; i++) {
        for(var f = 0; f < resWage.length; f++) {
            if(elem[i] == resWage[f].id){
                wage.push(resWage[f].salary);
            }
        }
    }

    }
    console.log(wage);
    for (var d = 0; d < wage.length; d++) {
        greed += wage[d];
    }
    console.log("greed:"+greed);
    value = n*greed*1/160*1/3600*seconds;
    document.getElementById('cost').innerHTML = value.toFixed(2);//n*(greed*1/160*1/3600*seconds)
    setTimeout(cost,1000);
  }
function usersData(element) {
  for(var i = 0;i<res.length;i++){
    if(element == res[i].name) return res[i].wageId;
    }
}
function copy() {
    navigator.clipboard.writeText(document.getElementById('ref').value)
}
var NameMeeting = '';
var startTime = new Date();
function postMeeting() {
    var users = document.getElementById('currentUsers').childNodes;
    var nameMeeting = document.getElementById('nameMeeting').value;
    NameMeeting = nameMeeting;
    var id = [];
    for (var i = 0; i < users.length; i++) {
            if(users[i].innerHTML != null){
                id.push(users[i].id);
            }
    }
    var now = new Date();
    startTime = now;
    currentUserId = id;
    // const res = fetch(url+'meeting', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
    //      },
    //     body: 'name='+nameMeeting+'&userId='+id+'&start='+now
    // })
}
function complet() {
    start = false;
    var now = new Date();
    time = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'-'+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
    const res = fetch(url+'sendMeetingData/'+Math.random() * (299 - 200) + 200, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
         },
        body: 'name='+NameMeeting+'&seconds='+seconds+'&userId='+currentUserId+'&startTime='+startTimea+'&endTime='+now
    })
}
function login(email, password) {
    if(email != '' && password != ''){
            if(email == 'd'){
                wait(7);
                getDirect();
            }
            else wait(1);
        //     console.log(email+password); 
        //     const res = fetch(url, {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
        //     },
        //     body: 'email='+email+'&password='+password
        // })
    }

}

function addUserDirect(text) {
    console.log(text);
    var link = document.getElementById('grid-colums');
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
    }
}

function maxMin(value,id) {
    document.getElementById(id).value = value;
}
var booltest = true;
function test13() {
    if(booltest){
        document.getElementById('filter').style.display = 'block';
    }
    else document.getElementById('filter').style.display = 'none';
    booltest = !booltest;
}
var booltest20 = true;
function test20(id,id1) {
    if(booltest20){
        document.getElementById(id1).style.display = 'block';
        document.getElementById(id).value = '∧';
    }
    else{
        document.getElementById(id1).style.display = 'none';
        document.getElementById(id).value = '∨';
    }
    booltest20 = !booltest20;
}
function test14() {
    booltest = !booltest;
    document.getElementById('filter').style.display = 'none';
    document.getElementById('grid-colums').style.display = 'grid';
    document.getElementById('box-1').style.display = 'block';
    document.getElementById('box-2').style.display = 'block';
    document.getElementById('box-3').style.display = 'block';
    document.getElementById('enter').style.display = 'block';

    // document.getElementById('filter-img').src = 'filter-full.png';
}
function toLink(ref) {
    document.location.href=ref;
}
var clon;
var sss = 0;
function wait(num){
    var body =  document.body.childNodes;
    var n  = body.length;

    var temp = document.getElementsByTagName("template")[num];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);

    for (var i = 1; i < n; i++) {
            if(body[i].tagName != null && body[i].tagName != 'TEMPLATE'){
                body[i].remove(); 
            }         
    }
}