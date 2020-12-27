const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://filipecetta:796425@omnistack.ri7ij.mongodb.net/mongodb?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });

// GET, POST, PUT, DELET

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, dele)
// req. body = Acessar corpo da requisição (para criação e edição de registros)

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads' )));

app.listen(3333);