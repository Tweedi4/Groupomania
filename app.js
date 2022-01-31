const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');

// Charge la variable d'environnement
require('dotenv').config();

const helmet = require("helmet");
const cors = require('cors');
 

//Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
// const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const app = express();
// Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//tests
app.get('/', function(req, res) {
    res.send('hello world');
  });



app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(helmet());
app.post('/', function (req, res) {
    res.send('POST request to the homepage'+ JSON.stringify(req.body));
  });


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);




module.exports = app; 