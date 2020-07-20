let fetch = require('fetch')

const response = fetch('./giveMeetingsData', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({startTime: 0, endTime: 1})
})
