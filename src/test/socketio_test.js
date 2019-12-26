//引入socketio
import io from 'socket.io-client'

//连接服务器得到socket对象
const socket = io('ws://localhost:4000')

//绑定监听，接收服务器发送的消息
socket.on('receiveMsg', function (data) {
    console.log('接收服务器端发送的消息 ', data)
})

//向服务器端发送消息
socket.emit('sendMsg',{name: 'tom'})
console.log('向服务器端发送请求 ', {name: 'tom'})