// const url = 'https://cost-of-meeting.herokuapp.com/'; //url place holder /user/all
let res = [];
let resWage = [];
let wageAr = [];
let currentUserId = [];
let month1;
let timeStart = new Date();
let delay;

window.onload = function(){load()} 

function load(){
    const userName = document.querySelector('#userName');
    const userImg = document.querySelector('#userImg');
    if(userName != null && userImg != null){
        const result = fetch('./getUserData');
            result.then(function(response) {
                response.json().then(function(text){
                    userName.innerHTML = text[0];
                    userImg.src = './users/photo/'+text[1];
            })
        })
    }
    if(document.querySelector('.wrapper-createMeeting') != null){
        fetchGet();
    }
    if(document.querySelector('.wrapper-director') != null){
        getDirect();
    }
    if(document.querySelector('.wrapper-meetingAmdin') != null || document.querySelector('.wrapper-meetingUsern') != null){
        document.querySelector('#complete-admin').hidden = true;
        timer();
    }
}


window.onfocus = function(){//пользователь на вкладке сайте
    let timeEnd = new Date();
    if(timeStart != null){
        delay = timeEnd.getTime()-timeStart.getTime();
    }
} 
function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    return yy + '-' + mm + '-' + dd;
}
function fetchGet() {
   const result  = fetch('./getUsers');
    result.then(function(response) {
    response.json().then(function(text){
      addUser(text);
      res = text;
    })
    })
    const result1  = fetch('./getWages');
    result1.then(function(response1) {
        response1.json().then(function(text1){
            resWage = text1;
        })
    })
}
function getDirect() {
    const now = new Date();
    now.setFullYear(now.getFullYear()+10);

    const result  = fetch('./getFilteredData',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({endTime : formatDate(now), startTime: formatDate(new Date(now.getFullYear()))})
        }
    )
    result.then(function(response) {
            response.json().then(function(text){
                console.log(text)
               addUserDirect(text);
            })
        });
}
function getFilter() {
    const months = document.querySelector('#month').value;
    const minTime = document.querySelector('#min').value;
    const maxTime = document.querySelector('#max').value;
    const minCost = document.querySelector('#min1').value;
    const maxCost = document.querySelector('#max1').value;

    const now = new Date()
    const now1 = new Date()

    let end_ = new Date(now.setDate(now.getDate()+1))
    let start_ = new Date(now1.setMonth(now1.getMonth()-months))

    const result  = fetch('./getFilteredData',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({endTime : formatDate(end_), startTime: formatDate(start_)})
        }
    )
    result.then(function(response) {
            response.json().then(function(text){
                let d = [];
                for(let i = 0;i < text.length;i++){
                    if(text[i].meetingTime/60 > minTime && 
                        text[i].meetingTime/60 < maxTime &&
                        text[i].costMeetingTime > minCost &&
                        text[i].costMeetingTime < maxCost){
                        d.push(text[i]);
                    }
                }
                addUserDirect(d);
            })
        });
}
function postMeeting() {
    timeStart = new Date();
    const users = document.querySelector('#currentUsers').childNodes;
    const nameMeeting = document.getElementById('nameMeeting').value;
    NameMeeting = nameMeeting;
    let meetingId = 0;
    let ids = [];
    let costPerSecond = 0;
    const password = generatePassword(16);

    for (let i = 0; i < users.length; i++) {
            if(users[i].innerHTML != null){
                ids.push(users[i].id.replace('User',''));
            }
    }
    const now = new Date();
    let data = {
        answer: 42
    }
    startTime = now;
    currentUserId = ids;
    n = currentUserId.length;
    wait(0);
    cost();
    
    const result  = fetch('./getMeetingId');
    result.then(function(response) {
    response.json().then(function(text){
            meetingId = text[0];
            const inputRef = document.querySelector('#ref');
            const refToMeeting = document.location.href;

            if(inputRef != null){
                inputRef.value = refToMeeting.split('createMeeting', 1)+"meeting/"+(text[0]+1)+'?pwd='+password;
            }
            seconds = 1;
            for(let i = 0;i < currentUserId.length;i++){
                costPerSecond += Number(counter(currentUserId[i]));
            }
            seconds = 0;
            console.log(new Date()+','+costPerSecond+','+password);
            const result1  = fetch('./startMeeting/'+meetingId,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({startTime: new Date(), costPerSecond: costPerSecond, password: password})
                })
        })
    })

    load();
}
function generatePassword(len){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}
function complet() {
    document.querySelector('#start-admin').hidden = true;
    document.querySelector('#complete-admin').hidden = true;

    let getMeetingId = 0;
    start = false;
    const now = new Date();
    console.log(NameMeeting);
    const result  = fetch('./getMeetingId');
    result.then(function(response) {
    response.json().then(function(text){
            getMeetingId = text[0];
            getMeetingId += 1;
            seconds--;
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
let time = '';
let second = 0;
let seconds = 0;
let min = 0;
let s = '';
let m = '';
let start = false;

function timer() {
    if(start){
        if(delay != null && delay > 0){
            if(min > 0){
                second += ((delay/1000).toFixed(0)-second)-min*60;
            }
            else second = (delay/1000).toFixed(0)-min*60;
            seconds = (delay/1000).toFixed(0);
            time = m+min+':'+s+second;
            delay = null;
        }
        else time = m+min+':'+s+second;
        if(second >= 60){
          min++;
          second -= 60;
        }
        if(second >= 10){
          s = '';
        }
        else s = '0';
        if(min >= 10){
          m = '';
        }
        else m = '0';
        document.querySelector('#timer').innerHTML = time;
        // document.querySelector('title').innerHTML = time.toFixed(0);
        second++;
        seconds++;
    }
    setTimeout(timer,1000);
}

function addCurrentUser(id,id1,classI) {
    let user;
    let cln;
    const value = document.querySelector('#'+id).value;
    const users = document.querySelector('#users').childNodes;
    for(let i = 0;i < users.length;i++){
        if(value == users[i].innerHTML){
            user = users[i];
            cln = document.createElement('div');
            cln.innerHTML = user.innerHTML;
            cln.id = user.id;
            cln.value = user.value;
        }
    }
    const div = document.createElement('div');
    div.id = "User"+cln.id;
    div.classList.add(classI);

    const img = document.createElement('img');
    img.src = './users/photo/'+cln.id;

    const cross = document.createElement('b');
    cross.innerHTML = 'Ⓧ';

    div.append(img)
    div.append(cln)
    div.append(cross);

    document.querySelector('#'+id1).appendChild(div); //add
    
    user.setAttribute("disabled", "disabled");
    user.classList.add('selected');

    if(cln != null){
        cross.addEventListener('click', (evt) => {removeUser(cln.id)} )
    }
}

let ar = [];
function addUser(array) { // add user in selection
  for(let i = 0;i<array.length;i++){
    const user = document.createElement("option");
    const name = array[i].name;

    user.value = array[i].name; // users name
    user.id = array[i].id; // users id 
    user.innerHTML = array[i].name;
    document.querySelector("#users").appendChild(user); //add
  }

}
function removeUser(id) {
    const cln = document.createElement('option');
    const user = document.getElementById(id);

    cln.innerHTML = user.innerHTML;
    cln.id = user.id;
    cln.value = user.value;

    document.getElementById('User'+id).remove();
    document.getElementById(id).classList.remove('selected');
    document.getElementById(id).removeAttribute('disabled'); 
    // document.querySelector('#users').appendChild(cln); //add
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
        // console.log("n:"+n+", greed:"+greed+",seconds:"+seconds)
        value = 1.3*greed/160/3600*(seconds);
        document.getElementById('cost').innerHTML = value.toFixed(0);
    }
    setTimeout(cost,1000);
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
    return (1.3*Wages/160/3600*seconds);
}
function addUserDirect(text) {
    const grid = document.querySelector('#grid-colums');
    const colums = document.querySelectorAll('.colums');
    
    for(let s = 0; s < colums.length; s++) {
        colums[s].remove();
    }
    for(let i = 0; i < text.length; i++) {
        const userName = document.createElement('div');
        userName.classList.add('colums');
        userName.innerHTML = text[i].name;
        grid.appendChild(userName);

        const numberOfMeetings = document.createElement('div');
        numberOfMeetings.classList.add('colums');
        numberOfMeetings.innerHTML = text[i].numberOfMeetings;
        grid.appendChild(numberOfMeetings);

        const timeInMeeting = document.createElement('div');
        timeInMeeting.classList.add('colums');
        timeInMeeting.innerHTML = (text[i].meetingTime/60).toFixed(2);
        grid.appendChild(timeInMeeting);

        const payout = document.createElement('div');
        payout.classList.add('colums');;
        payout.innerHTML = text[i].costMeetingTime.toFixed(0);
        grid.appendChild(payout);
    }
}

function maxMin(value,id) {
    document.querySelector('#'+id).value = value;
}
function filterHidden() {
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
function dropping(){
    document.querySelector('#min').value = 1;
    document.querySelector('#max').value = 500;
    document.querySelector('#min1').value = 10;
    document.querySelector('#max1').value = 4000;

    document.querySelector('#input-left').value = 1;
    document.querySelector('#input-rigth').value = 500;
    document.querySelector('#input-left1').value = 10;
    document.querySelector('#input-rigth1').value = 4000;
}
function toggleState(selectorButton, selectorPopup) {
    const button = document.querySelector('#' + selectorButton);
    const popup = document.querySelector('#' + selectorPopup);
    const popup1 = document.querySelector('.enter');

    button.value = button.value === '︿' ? '﹀' : '︿';
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
function changeButtonValue(button) {
    const buttonComplete = document.querySelector('#complete-admin');
    button.value = button.value === 'Cтоп' ? 'Старт' : 'Cтоп';

    if(button.value == 'Cтоп'){
        delay = 0;
        start = true;
        buttonComplete.hidden = false;
    }
    else{
        delay = 0;
        start = false  
        buttonComplete.hidden = true;
    }
}

function AddEventListeners() {
    const buttonRay = document.querySelector('.UserName');
    if(buttonRay != null){
        buttonRay.addEventListener('click', (evt) => {toggleState('buttonRay', 'exit-1')})
    }
    const filterButton = document.querySelector('#filter-button');
    if(filterButton != null){
        filterButton.addEventListener('click', (evt) => {filterHidden()})
    }
    const buttonRise = document.querySelector('#rise');
    if(buttonRise != null){
        buttonRise.addEventListener('click', (evt) => {toggleState('rise', 'enter-2')})
    }
    const buttonСopy = document.querySelector('#copy');
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
    const buttonStartAdmin = document.querySelector('#start-admin');
    if(buttonStartAdmin != null){
        buttonStartAdmin.addEventListener('click', (evt) => {changeButtonValue(buttonStartAdmin)})
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
        buttonApply.addEventListener('click', (evt) => {filterHidden();getFilter()} )
    }
    const buttonDropping = document.querySelector('.dropping');
    if(buttonDropping != null){
        buttonDropping.addEventListener('click', (evt) => {dropping()} )
    }   
}
setTimeout(AddEventListeners, 20);


// document.location.href = "http://google.com";
// var => const
// grid
// flex
// onclick => addEventListener
// getElementById => querySelector