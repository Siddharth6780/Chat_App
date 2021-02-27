const express=require('express');
const app=express();
app.use(express.static(__dirname + '/public'));
const http = require('http').createServer(app)
const PORT=process.env.PORT||3000;

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
});

const io=require('socket.io')(http)

io.on('connection',socket=>{
    socket.on('message',function(msg){
        socket.broadcast.emit('message',msg);
    });
});

http.listen(PORT, () => {
    console.log('Listening on port');
})