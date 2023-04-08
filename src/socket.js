import { Server } from "socket.io";
import mongoose from "mongoose";
import {Msg} from './models/messages.js';


const socket = {};
let messages = [];

const mongoDB = "mongodb+srv://demparom:aCpa58lQKcs1ucRO@cluster0.ly4xdtm.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose.connect(mongoDB).catch(err => console.log(err))

socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    
      Msg.find().then(result => {
          socket.emit('output-messages', result)
      })
      console.log('a user connected');
      socket.emit('message', 'Hello world');
      socket.on('disconnect', () => {
          console.log('user disconnected');
      });
      socket.on("chatmessage", (user, msg) => {
        const message = new Msg({ user, msg });
        message.save().then(() => {
          io.emit('messageLogs', msg)
      })
      });





    console.log(`${socket.id} connected`);



    socket.on("user-autenticated", (data) => {
      socket.broadcast.emit("user-connected", data);
    });
  });
};

export default socket;
