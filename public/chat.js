((d, io, $, c) => {
    var io = io()

    $('#chat-form').on('submit', function(e) {
        e.preventDefault()
        io.emit('new message', $('#message-text').val())
        $('#message-text').val(null)
        return false
    })

    io.on('new user', function (newUser) {
        
    })
    
    io.on('user says', function (userSays) {
        $('#chat').append(`<li>${userSays}</li>`)
    })

    io.on('bye user', function (newUser) {
        
    })

})(document, io, jQuery, console.log)
