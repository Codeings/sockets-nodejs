s = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);  

var messages = [{
id: 1,
text: "hola soy un mensaje2",
autor: "Erick"
}]

/*definir la carpeta estatica y publica que se va a utilizar para las vistas*/
app.use(express.static('public'));

/*imprimir en explorador*/
app.get('/', function(req, res){
res.status(200).send('hola mundo cambiado');
});


/*escuchar el puerto*/
io.on('connection', function(socket){

/*datos par imprimir por consola*/
    console.log('alguien se ha conectado');

    /*datos para imprimir por explorador*/
    socket.emit('messages', messages);

    socket.on('new-messages', function(data){
    messages.push(data);
    io.sockets.emit('messages', messages);

    });

});
 
/*imprimir por consola*/
server.listen(8080, function(data) {  
    //console.log('Servidor corriendo en http://localhost:8080', data);
});
