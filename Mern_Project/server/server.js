const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoutes = require('./routes/userRoute')
const messageRoutes = require('./routes/messageRoute')
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes)
app.use('/api/message',messageRoutes)
require('./routes/post.routes')(app);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log('DB connection established');
}).catch(err => {console.log(err.message);});


const server = app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
 });
const io = socket(server, {
    cors: "http://localhost:3000",
    credentials : true
});
global.onlineUsers = new Map();
io.on('connection',(socket)=>{
    global.projectSocket = socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on('send-msg',(data)=>{
        console.log(data);
        const sendUserSocket= onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg received", data.message)
        }
    });
});