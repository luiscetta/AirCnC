const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};



mongoose.connect('mongodb+srv://filipecetta:796425@omnistack.ri7ij.mongodb.net/mongodb?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });

 io.on('connection', socket => {

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

// GET, POST, PUT, DELET

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, dele)
// req. body = Acessar corpo da requisição (para criação e edição de registros)

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads' )));

server.listen(3333);