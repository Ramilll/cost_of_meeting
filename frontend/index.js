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

function addUser(id) {
	var user = document.getElementById("1");
	var cln = user.cloneNode(true);
	document.getElementById("currentUsers").appendChild(cln);
}

fetch('http://localhost:3000',{mode: 'no-cors'})
  .then((response) => {
    console.log(response);})
  .then((data) => {
    console.log(data);
  });

// const url = 'http://localhost:3000';
// const data = { username: 'example' };

// try {
//   const response = await fetch(url, {
//     method: 'POST', // или 'PUT'
//     body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const json = await response.json();
//   console.log('Успех:', JSON.stringify(json));
// } catch (error) {
//   console.error('Ошибка:', error);
// }