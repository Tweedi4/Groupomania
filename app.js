const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config/config.json')[env]

// Charge la variable d'environnement
require('dotenv').config();

const helmet = require("helmet");
const xss = require('xss-clean');

const cors = require('cors');
//const errorHandler = require('errorhandler') ;

//Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
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

//app.use(errorHandler({dumpExceptions: true, showStack: true})); 
// Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//helmet
app.use(helmet());
//xss protection
app.use(xss());


//images destination
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/like', likeRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);




module.exports = app; 