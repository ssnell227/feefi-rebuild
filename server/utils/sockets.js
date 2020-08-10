const {addRoom, addUser, removeUser, getUsersInRoom, getRoom, removeRoom, runGame, changeScore } = require('./game')

module.exports = function (io) {
    io.on('connection',  (socket) => {
        console.log('connection')
        socket.on('join', (userObj) => {
            const { username, gameId, spotifyId} = userObj
            socket.join(gameId)
            console.log('joined')
            
            //if room exists, add user to room, else, create room
            if (getRoom(gameId) && getUsersInRoom(gameId).length >=4) {
                io.to(socket.id).emit('tooManyPlayers')
            } else if (getRoom(gameId) && !getRoom(gameId).playing) {
                addUser({gameId, username, socketId: socket.id}, io)
                io.in(gameId).emit('roomData', {room: getRoom(gameId), message: 'joined'})
            } else if(getRoom(gameId) && getRoom(gameId).playing ) {
                io.to(socket.id).emit('gameInProgress')
            } else {
                addRoom(userObj, socket.id, io).then(() => io.in(gameId).emit('roomData', {room: getRoom(gameId), message: 'created'}))
            }

            console.log(gameId, 'line 23')
            console.log(getRoom(gameId, 'room of game id'))

            socket.on('startGame', () => {
                getRoom(gameId).playing = true
                io.in(gameId).emit('begin')
                runGame(io, gameId)
            })
            
            socket.on('changeScore', (scoreObj) => {
                changeScore(scoreObj)
                io.in(gameId).emit('roomData', {room: getRoom(gameId)})
            })

            // remove user from users array and resend room data to other users in room.  If no users in room, remove the room
            socket.on('leaveRoom', (leaveObj) => {
                removeUser(leaveObj)
                io.in(leaveObj.gameId).emit('roomData', {users: getUsersInRoom(leaveObj.gameId)})
                if (!getUsersInRoom(leaveObj.gameId).length) {
                    removeRoom(leaveObj.gameId)
                }
                console.log('left')
            })
            socket.on('disconnect', () => {
                removeUser({gameId, socketId: socket.id})
                io.in(gameId).emit('roomData', {users: getUsersInRoom(gameId)})
                if (!getUsersInRoom(gameId).length) {
                    removeRoom(gameId)
                }
                console.log('left')
            })
        })
    })
} 