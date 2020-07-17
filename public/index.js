// const url = 'https://cost-of-meeting.herokuapp.com/'; //url place holder /user/all
let res = [];
let resWage = [];
let wageAr = [];
let currentUserId = [];

function fetchGet() {
   const result  = fetch('./getUsers');
    result.then(function(response) {
    response.json().then(function(text){
      addUser(text);
      res = text;
      console.log(text);
    })
    })
    const result1  = fetch('./getWages');
    result1.then(function(response1) {
        response1.json().then(function(text1){
            console.log(text1);
            resWage = text1;
        })
    })
}
function getDirect() {
    const result  = fetch('./getUsers');
    result.then(function(response) {
        response.json().then(function(text){
            console.log(text);
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
    const div = document.createElement('div');
    div.id = "User"+cln.id;
    div.classList.add(classI);

    const img = document.createElement('img');
    img.src = './users/photo/'+cln.id;

    const cross = document.createElement('div');
    cross.innerHTML = 'Ⓧ';

    div.append(img)
    div.append(cln)
    div.append(cross);

    document.querySelector('#'+id1).appendChild(div); //add
    user.remove();
    if(cln != null){
        cross.addEventListener('click', (evt) => {removeUser(cln.id)} )
    }
}

let ar = [];
function addUser(array) { // add user in selection
  for(let i = 0;i<array.length;i++){
    const user = document.createElement("option");
    const name = array[i].name;
    // user.setAttribute('onclick', 'removeUser(this.id)')

    user.value = array[i].name; // users name
    user.id = array[i].id; // users id 
    user.innerHTML = array[i].name;
    document.querySelector("#users").appendChild(user); //add
  }

}
function removeUser(id) {
    const cln = document.getElementById(id);
    document.getElementById('User'+id).remove();
    document.querySelector('#users').appendChild(cln); //add
}

let value = 0; // money
let len = 0;
let n = 0;
// money counter
function cost(){
    let elem = []
    let wages = [];
    let greed = 0;
    if(start){
    for(let p = 0; p < n; p++) {
        for(let user = 0; user < res.length; user++) {
            if(res[user].id == currentUserId[p]){
                elem.push(res[user].wageId);
            }
        }
    }
    for (let i = 0; i < elem.length; i++) {
        for(let f = 0; f < resWage.length; f++) {
            if(elem[i] == resWage[f].id){
                wages.push(resWage[f].salary);
            }
        }
    }
    for (let d = 0; d < wages.length; d++) {
        greed += wages[d];
    }
    value = n*greed*1/160*1/3600*(seconds+1);
    document.getElementById('cost').innerHTML = value.toFixed(2);
    setTimeout(cost,1000);
  }
}
function usersData(element) {
  for(let i = 0;i<res.length;i++){
    if(element == res[i].id) return res[i].wageId;
    }
}
function copy() {
    navigator.clipboard.writeText(document.querySelector('#ref').value)
}
let NameMeeting = '';
let startTime = new Date();
function counter(elem) {
    let Wages = 0;
        for(let f = 0; f < resWage.length; f++) {
            if(elem == resWage[f].id){
                Wages = resWage[f].salary;
            }
        }
    return (currentUserId.length*Wages*1/160*1/3600*seconds).toFixed(2);
}
function postMeeting() {
    const users = document.querySelector('#currentUsers').childNodes;
    const nameMeeting = document.getElementById('nameMeeting').value;
    NameMeeting = nameMeeting;
    let ids = [];
    for (let i = 0; i < users.length; i++) {
            if(users[i].innerHTML != null){
                console.log(users[i].id);
                ids.push(users[i].id.replace('User',''));
            }
    }
    const now = new Date();
    let data = {
        answer: 42
    }
    console.log(ids);
    startTime = now;
    currentUserId = ids;
    n = currentUserId.length;
    wait(0);
    cost();
    
    timer();
}
function complet() {
    if(start){
    let getMeetingId = 0;
    start = false;
    const now = new Date();
    console.log(NameMeeting);
    const result  = fetch('./getMeetingId');
    result.then(function(response) {
    response.json().then(function(text){
            getMeetingId = text[0];
            getMeetingId += 1;
            console.log(getMeetingId);
            let sendMeetingData  = {
                id: getMeetingId,
                time: seconds,
                name: NameMeeting,
                startTime: startTime,
                endTime: now,
                cost: document.getElementById('cost').innerHTML,
                users:[]
            };
            for(let i = 0; i < currentUserId.length; i++) {
                sendMeetingData.users[i] = ({
                        userId: currentUserId[i],
                        startTime: startTime,
                        endTime: now,
                        time: seconds,
                        costTime: counter(usersData(currentUserId[i])) 
                    });
            }

            const response = fetch('./sendMeetingData/'+getMeetingId, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(sendMeetingData)
            })
        })
    })
    }
}

function addUserDirect(text) {
    console.log(text);
    for(let i = 0; i < text.length; i++) {
        const elem = document.createElement('div');
        elem.classList.add('colums');
        elem.innerHTML = text[i].name;
        document.querySelector('#grid-colums').appendChild(elem);

        const elem1 = document.createElement('div');
        elem1.classList.add('colums');
        elem1.innerHTML = (text[i].meetingTime/60).toFixed(2);
        document.querySelector('#grid-colums').appendChild(elem1);

        const elem2 = document.createElement('div');
        elem2.classList.add('colums');;
        elem2.innerHTML = text[i].costMeetingTime.toFixed(2);
        document.querySelector('#grid-colums').appendChild(elem2);
    }
}

function maxMin(value,id) {
    document.querySelector('#'+id).value = value;
}
function filter() {
    const button = document.querySelector('#filter-button');
    const filterSettings = document.querySelector('#filter');
    if(button.style.display == 'block' || button.style.display == ''){
        button.style.display = 'none';
        filterSettings.style.display = 'block';
    }
    else{
        button.style.display = 'block';
        filterSettings.style.display = 'none';
    }
}
let booltest20 = true;

function toggleState(selectorButton, selectorPopup) {
    const button = document.querySelector('#' + selectorButton);
    const popup = document.querySelector('#' + selectorPopup);
    const popup1 = document.querySelector('.enter');

    button.value = button.value === '∧' ? '∨' : '∧';
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    
}
function toLink(ref) {
    document.location.href=ref;
}
function wait(num){
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
    AddEventListeners();
}


function AddEventListeners() {
    const buttonRay = document.querySelector('.UserName');
    if(buttonRay != null){
        buttonRay.addEventListener('click', (evt) => {toggleState('buttonRay', 'exit-1')})
    }
    const filterButton = document.querySelector('#filter-button');
    if(filterButton != null){
        filterButton.addEventListener('click', (evt) => {filter()})
    }
    const buttonRise = document.querySelector('#rise');
    if(buttonRise != null){
        buttonRise.addEventListener('click', (evt) => {toggleState('rise', 'enter-2')})
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
        buttonCompleteAdmin.addEventListener('click', (evt) => {complet(), buttonCompleteAdmin.setAttribute("disabled", "true");})
    }
    const buttonExit = document.querySelector('#exit');
    if(buttonExit != null){
        buttonExit.addEventListener('click', (evt) => {document.location.href = './logout'} )
    }
    const buttonEnter1 = document.querySelector('#enter-1');
    if(buttonEnter1 != null){
        buttonEnter1.addEventListener('click', (evt) => {document.location.href = './createMeeting'} )
    }
    const buttonEnter2 = document.querySelector('#enter-2');
    if(buttonEnter2 != null){
        buttonEnter2.addEventListener('click', (evt) => {document.location.href = './createMeeting'} )
    }
    const buttonDirectorEnter1 = document.querySelector('.enterDirector');
    if(buttonDirectorEnter1 != null){
        buttonDirectorEnter1.addEventListener('click', (evt) => {document.location.href = './directorEnter'} )
    }
    const buttonDirectorEnter = document.querySelector('#hrefDirectorEnter');
    if(buttonDirectorEnter != null){
        buttonDirectorEnter.addEventListener('click', (evt) => {document.location.href = './directorEnter'} )
    }
    const buttonInputleft = document.querySelector('#input-left');
    if(buttonInputleft != null){
        buttonInputleft.addEventListener('change', (evt) => {maxMin(buttonInputleft.value,'min')} )
    }
    const buttonInputRigth = document.querySelector('#input-rigth');
    if(buttonInputRigth != null){
        buttonInputRigth.addEventListener('change', (evt) => {maxMin(buttonInputRigth.value,'max')} )
    }
    const buttonInputleft1 = document.querySelector('#input-left1');
    if(buttonInputleft1 != null){
        buttonInputleft1.addEventListener('change', (evt) => {maxMin(buttonInputleft1.value,'min1')} )
    }
    const buttonInputRigth1 = document.querySelector('#input-rigth1');
    if(buttonInputRigth1 != null){
        buttonInputRigth1.addEventListener('change', (evt) => {maxMin(buttonInputRigth1.value,'max1')} )
    }
    const buttonApply = document.querySelector('#apply');
    if(buttonApply != null){
        buttonApply.addEventListener('click', (evt) => {filter()} )
    }
    

}
setTimeout(AddEventListeners, 20);


// document.location.href = "http://google.com";
// var => const
// grid
// flex
// onclick => addEventListener
// getElementById => querySelector