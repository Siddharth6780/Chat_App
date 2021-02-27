const socket=io()
let name;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message__area')
do{
    name=prompt('Please Enter your Name');
}
while(!name)


textarea.addEventListener('keyup',function(e){
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
});


function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    appendMessage(msg,'outgoing')
    scrolltoBottom();
    textarea.value='';
    socket.emit('message',msg)


}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className,'message');
     let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}<p>
     `
     mainDiv.innerHTML=markup;
     messageArea.appendChild(mainDiv);
}


socket.on('message',function(msg){
    appendMessage(msg,'incoming');
    scrolltoBottom();
});

function scrolltoBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}