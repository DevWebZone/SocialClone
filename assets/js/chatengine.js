class  ChatEngine{
    constructor(chatBoxId, userId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userId = userId;
        this.socket = io.connect('http://localhost:5000');
        
        if(this.userId){
            this.ConnectionHandler();
        }
        
    }
    ConnectionHandler(){
       let self = this;
        this.socket.on('connect', function(){
            console.log("new Connection");
            self.socket.emit('join_room', {
                user_id: self.userId,
                chatroom: 'social-chat'
            });
            self.socket.on('user-joined', function(data){
                console.log('User Joined:', data)
            });
            
        });
        $('#send-chat-btn').click(function(event){
           // event.preventDefault();
           
            let msg = $('#input-box').val();
            $('#input-box').val("");
            console.log(msg);
            if(msg != '')
            {
                self.socket.emit('send-Message', {
                    message: msg,
                    user_id: self.userId,
                    chatroom: 'social-chat'
                })
            }
        });
        self.socket.on('recieve-Message', function(data){
            console.log("recieved")
                let newMessage = $('<li>', {
                    'html': data.message
                })
                let messageType= "sender-message";
                if(data.user_id == self.userId){
                    messageType = "user-message"
                }
                newMessage.addClass(messageType);
                $('#message-window>ul').append(newMessage);
        })

    }
   
}