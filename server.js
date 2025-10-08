const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for media upload
const upload = multer({ dest: 'uploads/' });

// In-memory message storage
let messages = [];

// API route to upload media
app.post('/upload', upload.single('media'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  // For demo, serve files statically from /uploads
  res.json({ url: `/uploads/${req.file.filename}`, originalName: req.file.originalname });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.on('connection', (socket) => {
  // Send chat history to new user
  socket.emit('chat history', messages);

  // Handle text message
  socket.on('chat message', msg => {
    messages.push(msg);
    io.emit('chat message', msg);
  });

  // Handle media message
  socket.on('media message', msg => {
    messages.push(msg);
    io.emit('media message', msg);
  });

    // Handle delete all messages
    socket.on('delete all', () => {
      messages = [];
      io.emit('delete all');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});