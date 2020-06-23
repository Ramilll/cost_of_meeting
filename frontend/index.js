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
function addUser(id) {
	var user = document.getElementById("1");
	var cln = user.cloneNode(true);
	document.getElementById("currentUsers").appendChild(cln);
}