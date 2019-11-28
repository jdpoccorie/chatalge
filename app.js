let express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    PORT = process.env.PORT || 3000,
    publicDir = express.static(`${__dirname}/public`),
    path = require('path')

app
    .use(publicDir)
    .get('/', (req, res) => {
        // res.sendFile(`${publicDir}/chat.html`)
        res.sendFile(path.join(__dirname, '/public', 'chat.html'))
    })

http.listen(PORT, () => {
    console.log('Iniciando express y socket.io en localhost:%d', PORT)
})


io.on('connection', (socket) => {
    socket.broadcast.emit('new user', {message : 'Ha entrado n usuario al chat'})

    socket.on('new message', (message) => {
        io.emit('user says', message)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('bye user', {message: 'Ha salido un usuario al chat'})
    })
})

