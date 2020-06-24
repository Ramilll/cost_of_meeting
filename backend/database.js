let data = {
    meetings: [{id: 141, currentUsers: [1, 3, 8]}, {id: 229, currentUsers: [2, 4, 5, 6]},
        {id: 357, currentUsers: [7, 9, 10]}, {id: 404, currentUsers: [11, 12]}],
    users: [{id: 1, name:'джун1', wageId: 1}, {id: 2, name:'джун2', wageId: 1},
        {id: 3, name:'джун3', wageId: 1}, {id: 4, name:'джун4', wageId: 1},
        {id: 5, name:'джун', wageId: 5}, {id: 6, name:'джун6', wageId: 1},
        {id: 7, name:'джун7', wageId: 1}, {id: 8, name:'мидл1', wageId: 2},
        {id: 9, name:'мидл2', wageId: 2}, {id: 10, name:'сениор1', wageId: 3},
        {id: 11, name:'сениор2', wageId: 3}, {id: 12, name:'тимлид', wageId: 4}],
    wage: [{wageId: 1, salary:100}, {wageId: 2, salary:200},
        {wageId: 3, salary:300}, {wageId: 4, salary:400}],
}

let jsonData = JSON.stringify(data)

let fs = require('fs')
fs.writeFile('jsonData.json', jsonData, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
});
