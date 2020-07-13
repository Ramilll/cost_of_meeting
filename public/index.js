const url = 'http://localhost:3000/'; //url place holder /user/all

let res = [];
let resWage = [];
let wageAr = [];
let currentUserId = [];

function fetchGet() {
   const result  = fetch(url+'getUsers');
    result.then(function(response) {
    response.json().then(function(text){
      addUser(text);
      res = text;
      console.log(text);
    })
    })
    const result1  = fetch(url+'getWages');
    result1.then(function(response1) {
        response1.json().then(function(text1){
            console.log(text1);
            resWage = text1;
        })
    })
}
function getDirect() {
    const result  = fetch(url+'getUsers');
    result.then(function(response) {
        response.json().then(function(text){
            addUserDirect(text);
        })
    })
}
let time = '';
let second = 0;
let seconds = 0;
let min = 0;
let s = '';
let m = '';
let start = true;

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
        document.querySelector('#timer').innerHTML = time;
        setTimeout(timer,1000);
      }
    }

function addCurrentUser(id,id1,classI) {
    let cln;
    let user;
    const value = document.querySelector('#'+id).value;
    const users = document.querySelector('#users').childNodes;
    for(let i = 0;i < users.length;i++){
        if(value == users[i].innerHTML){
            user = users[i];
            cln = user.cloneNode(true);
        }
    }

  cln.classList.add(classI);

  document.querySelector('#'+id1).appendChild(cln); //add
  user.remove();
}

let ar = [];
function addUser(array) { // add user in selection
  for(let i = 0;i<array.length;i++){
    const user = document.createElement("option");
    const name = array[i].name;
    user.setAttribute('onclick', 'removeUser(this.id)')

    user.value = array[i].name; // users name
    user.id = array[i].id; // users id 
    user.innerHTML = array[i].name;
    document.querySelector("#users").appendChild(user); //add
  }

}
function removeUser(id) {
    const cln = document.getElementById(id);
    cln.classList.add('re');
    document.getElementById(id).remove();
    document.querySelector('#users').appendChild(cln); //add
}

let value = 0; // money
// money counter
function cost(){
  if(start){
    let greed = 0;
    let wages = [];
    // var n = document.getElementById("currentUsers").childNodes.length; // length currentUsers
    // var elem = document.getElementById("currentUsers").childNodes; // list currentUsers

    const n = currentUserId.length;
    let elem = []
    console.log(currentUserId);
    for(let p = 0; p < n; p++) {
        for(let user = 0; user < res.length; user++) {
            if(res[user].id == currentUserId[p]){
                elem.push(res[user].wageId);
            }
        }
    }
    console.log(elem);
    for (let i = 0; i < elem.length; i++) {
        for(let f = 0; f < resWage.length; f++) {
            if(elem[i] == resWage[f].id){
                wages.push(resWage[f].salary);
            }
        }
    }

    }
    console.log(wages);
    for (let d = 0; d < wage.length; d++) {
        greed += wages[d];
    }
    console.log("greed:"+greed);
    value = n*greed*1/160*1/3600*seconds;
    document.getElementById('cost').innerHTML = value.toFixed(2);//n*(greed*1/160*1/3600*seconds)
    setTimeout(cost,1000);
  }
function usersData(element) {
  for(let i = 0;i<res.length;i++){
    if(element == res[i].name) return res[i].wageId;
    }
}
function copy() {
    navigator.clipboard.writeText(document.querySelector('#ref').value)
}
let NameMeeting = '';
let startTime = new Date();

function postMeeting() {
    // debugger;
    const users = document.querySelector('#currentUsers').childNodes;
    const nameMeeting = document.getElementById('nameMeeting').value;
    NameMeeting = nameMeeting;
    let ids = [];
    for (let i = 0; i < users.length; i++) {
            if(users[i].innerHTML != null){
                ids.push(users[i].id);
            }
    }
    const now = new Date();
    startTime = now;
    currentUserId = ids;
    const res = fetch(url+'sendMeetingData/1', {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
         },
        body: 'name='+nameMeeting+'&userId='+ids+'&start='+now
    })
    // .then((res) => {
    //     const template = document.querySelector('#meeting_template').content.children[0].cloneNode(true);
    //     //template.querySelector()
    //     document.querySelector('body').append(template);
    // })
}
function complet() {
    let getMeetingId = 0;
    start = false;
    const now = new Date();

    const result  = fetch(url+'getMeetingId');
    result.then(function(response) {
    response.json().then(function(text){
            getMeetingId = text[0];
            getMeetingId += 1;
            console.log(getMeetingId);
            const res = fetch(url+'sendMeetingData/'+getMeetingId, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'//x-www-form-urlencoded  
                },
                body: 'name='+NameMeeting+'&seconds='+seconds+'&userId='+currentUserId+'&startTime='+startTime+'&endTime='+now+'&cost='+document.getElementById('cost').innerHTML
            })  
        })
    })
}
function login(email, password) {
    return;
}

function addUserDirect(text) {
    console.log(text);
    const link = document.getElementById('grid-colums');
    for (let i = 0; i < text.length; i++) {
            const elem = document.createElement('div');
            elem.classList.add('colums');
            elem.innerHTML = text[i].name;
            document.querySelector('#grid-colums').appendChild(elem);

            const elem1 = document.createElement('div');
            elem1.classList.add('colums');
            elem1.innerHTML = text[i].meetingTime;
            document.querySelector('#grid-colums').appendChild(elem1);

            const elem2 = document.createElement('div');
            elem2.classList.add('colums');;
            elem2.innerHTML = text[i].costMeetingTime;
            document.querySelector('#grid-colums').appendChild(elem2);
    }
}

function maxMin(value,id) {
    document.document.querySelector('#'+id).value = value;
}
let booltest = true;
function filter() {
    if(booltest){
        document.getElementById('filter-button').style.display = 'block';
    }   
    else document.getElementById('filter-button').style.display = 'none';
    booltest = !booltest;
}
let booltest20 = true;

function toggleState(selectorButton, selectorPopup) {
    const button = document.querySelector('#' + selectorButton);
    const popup = document.querySelector('#' + selectorPopup);

    button.value = button.value === '∧' ? '∨' : '∧';
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}
function test14() {
    booltest = !booltest;
    document.querySelector('#filter').style.display = 'none';
    document.querySelector('#grid-colums').style.display = 'grid';
    document.querySelector('#box-1').style.display = 'block';
    document.querySelector('#box-2').style.display = 'block';
    document.querySelector('#box-3').style.display = 'block';
    document.querySelector('#enter').style.display = 'block';
}
function toLink(ref) {
    document.location.href=ref;
}
function wait(num){
    // return;
    const body =  document.body.childNodes;
    const n  = body.length;

    const temp = document.getElementsByTagName("template")[num];
    const clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);

    for (let i = 1; i < n; i++) {
            if(body[i].tagName != null && body[i].tagName != 'TEMPLATE'){
                body[i].remove(); 
            }         
    }
}


function AddEventListeners() {
    const buttonRay = document.querySelector('#buttonRay');
    if(buttonRay != null){
        buttonRay.addEventListener('click', (evt) => {toggleState('buttonRay', 'exit')})
    }
    const filterButton = document.querySelector('#filter-button');
    if(filterButton != null){
        filterButton.addEventListener('click', (evt) => {filter()})
    }
    const buttonRise = document.querySelector('#rise');
    if(buttonRise != null){
        buttonRise.addEventListener('click', (evt) => {toggleState('rise', 'text-1')})
    }
    const buttonСopy = document.querySelector('#сopy');
    if(buttonСopy != null){
        buttonСopy.addEventListener('click', (evt) => {copy()})
    }
    const buttonAddCurrentUser = document.querySelector('#users');
    if(buttonAddCurrentUser != null){
        buttonAddCurrentUser.addEventListener('change', (evt) => {addCurrentUser('users','currentUsers','currentUser')})
    }
    const buttonPostMeeting = document.querySelector('#postMeeting');
    if(buttonPostMeeting != null){
        buttonPostMeeting.addEventListener('click', (evt) => {postMeeting()})
    }
    const buttonCompleteAdmin = document.querySelector('#complete-admin');
    if(buttonCompleteAdmin != null){
        buttonCompleteAdmin.addEventListener('click', (evt) => {complet()})
    }
}
setTimeout(AddEventListeners, 20);

// var => const
// grid
// flex
// onclick => addEventListener
// getElementById => querySelector