// Warning: do not use this file, if you don't know how to use it

var models           = require('./app/models');

console.log("Erasing table users_meetings")
models.users_meeting.destroy({
    where: {},
    truncate: true
})
console.log("Zeroing table users")
models.user.update({meetingTime: 0, costMeetingTime: 0}, {where: {}, truncate: true})
console.log('Erasing table meetings')
models.meeting.destroy({
    where: {},
    truncate: true
})

console.log('DB was successfully restarted')