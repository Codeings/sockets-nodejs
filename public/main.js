socket = io.connect('http://localhost:8080', {'forceNew': true});

/*mandamos el evento messages para hacer la peticion desde el servidor*/
socket.on('messages', function(data){
	console.log(data);
	render(data);
})

function render(data){
	var html = data.map(function(elem, index){
		return(
		`<div>
		<strong>${elem.autor}</strong>: 
		<em>${elem.text}</em>
		</div>`
			);
	}).join(" ") ;

	document.getElementById('messages').innerHTML = html;
    }

    function addMessage(e){
       var playload = {
       	autor: document.getElementById('username').value,
       	text: document.getElementById('texto').value
       };

       //alert()

       socket.emit('new-messages', playload);
       return false;
    }
