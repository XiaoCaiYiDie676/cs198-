require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/cat-chat";

// Message Schema
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Track typing users
const typingUsers = new Set();

// Socket.io connection
io.on('connection', async (socket) => {
  console.log('🐱 New user connected');
  
  // Send message history
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(20);
    socket.emit('message history', messages.reverse());
  } catch (err) {
    console.error('Error fetching message history:', err);
  }

  // Typing indicators
  socket.on('typing', () => {
    typingUsers.add(socket.id);
    if (typingUsers.size === 1) {
      socket.broadcast.emit('typing');
    }
  });

  socket.on('stop typing', () => {
    typingUsers.delete(socket.id);
    if (typingUsers.size === 0) {
      socket.broadcast.emit('stop typing');
    }
  });

  // Handle new messages
  socket.on('chat message', async (msg) => {
    try {
      const message = new Message({ content: msg });
      await message.save();
      io.emit('chat message', { 
        content: msg, 
        createdAt: message.createdAt 
      });
      
      // Random cat sound effect
      const sounds = ['meow', 'purr', 'mew'];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      console.log(`🐱 Message received with ${randomSound}!`);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🐱 User disconnected');
    typingUsers.delete(socket.id);
    if (typingUsers.size === 0) {
      socket.broadcast.emit('stop typing');
    }
  });
});

// Start server
server.listen(3000, async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('🐾 Connected to MongoDB');
    console.log('🐱 Server listening on http://localhost:3000');
  } catch (err) {
    console.error('😿 Could not connect to MongoDB:', err);
  }
});